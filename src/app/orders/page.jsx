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
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only include address in the mailto link if delivery is "Yes"
    const addressText =
      formData.delivery === "Yes" ? `%0AAddress:%20${formData.address}` : "";
    const mailtoLink = `mailto:contact@iheartdogs.com?subject=Order%20Submission%20-%20${selected.name}&body=Item:%20${selected.name}%0AName:%20${formData.firstName}%20${formData.lastName}%0APhone%20Number:%20${formData.phoneNumber}%0AEmail:%20${formData.email}%0APaymentMethod:%20${formData.paymentMethod}${addressText}%0ADelivery:%20${formData.delivery}%0AComment:%20${formData.message}`;
    window.location.href = mailtoLink;
    setFormSubmitted(true);

    // Clear the selected puppy from localStorage after successful submission
    localStorage.removeItem("selectedPuppy");
  };

  const nextStep = () => {
    setFormStep(2);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setFormStep(1);
  };

  const paymentMethods = [
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "Zelle", label: "Zelle" },
    { value: "Apple Pay", label: "Apple Pay" },
    { value: "Cash App", label: "Cash App" },
    { value: "Credit Card", label: "Credit Card" },
    { value: "Debit Card", label: "Debit Card" },
    { value: "PayPal", label: "PayPal" },
    { value: "Venmo", label: "Venmo" },
    { value: "Google Pay", label: "Google Pay" },
    { value: "E Transfer", label: "E Transfer" },
    { value: "Gift Card", label: "Gift Card" },
    { value: "Bitcoin", label: "Bitcoin" },
    { value: "Ethereum", label: "Ethereum" },
  ];

  // Don't render anything if not authenticated or no puppy selected
  if (!isAuthenticated || !selected) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
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
                Thank you for your order. We've received your information and
                will contact you shortly.
              </p>
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
                    <CheckCircle className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>You'll receive payment instructions via email</span>
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
                You're just a few steps away from welcoming your Jack Russell
                Terrier home
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
                            Jack Russell Terrier
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

                    <div className="bg-amber-50 rounded-lg p-4 flex items-start">
                      <Info className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        All our Jack Russell puppies come with health
                        guarantees, vaccinations, and registration papers.
                      </p>
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

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Payment Method
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          >
                            <option value="">Select Payment Method</option>
                            {paymentMethods.map((method) => (
                              <option key={method.value} value={method.value}>
                                {method.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 flex items-start border border-gray-200">
                          <Clock className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-gray-700">
                            <p className="font-medium mb-1">
                              What happens next?
                            </p>
                            <p>
                              After submitting your order, we'll contact you
                              within 24 hours to confirm details and provide
                              payment instructions.
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
                            className="flex-grow py-3 px-6 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                          >
                            <CreditCard className="w-5 h-5 inline mr-2" />
                            Complete Order
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
