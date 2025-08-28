"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Trash2,
  Eye,
  ShoppingCart,
  ArrowRight,
  Package,
} from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer.jsx/page";

export default function WishlistPage() {
  const { user, removeFromWishlist, isAuthenticated } = useAuth();
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    fetchWishlistItems();
  }, [isAuthenticated, router]);

  const fetchWishlistItems = async () => {
    try {
      setLoading(true);
      // In a real app, you'd fetch the actual puppy data for wishlist items
      // For now, we'll use the wishlist data from the user object
      if (user?.wishlist) {
        // This would typically involve fetching puppy details for each wishlist item
        // For demonstration, we'll create placeholder data
        const items = user.wishlist.map((item, index) => ({
          id: item.puppyId || `puppy-${index}`,
          name: `Puppy ${index + 1}`,
          breed: "Golden Retriever",
          price: "$1,200",
          image: "/images/pexels-pixabay-208821.jpg",
          age: "8 weeks",
          gender: "Male",
          location: "New York, NY",
        }));
        setWishlistItems(items);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setMessage({ type: "error", text: "Failed to load wishlist" });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (puppyId) => {
    try {
      const result = await removeFromWishlist(puppyId);
      if (result.success) {
        setWishlistItems(items => items.filter(item => item.id !== puppyId));
        setMessage({ type: "success", text: "Removed from wishlist" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to remove from wishlist" });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Heart className="h-8 w-8 text-red-500 mr-3" />
            My Wishlist
          </h1>
          <p className="text-gray-600">
            Your saved puppies and favorite companions
          </p>
        </div>

        {/* Message Display */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Wishlist Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Start exploring our available puppies and add your favorites to your wishlist.
            </p>
            <Link
              href="/available-puppies"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Browse Puppies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{item.breed}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-blue-600">
                      {item.price}
                    </span>
                    <span className="text-sm text-gray-500">{item.age}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="mr-4">{item.gender}</span>
                    <span>{item.location}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Link
                      href={`/puppy/${item.id}`}
                      className="flex-1 flex items-center justify-center py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                    <button className="flex-1 flex items-center justify-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue Shopping */}
        {wishlistItems.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              href="/available-puppies"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Continue browsing puppies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
} 