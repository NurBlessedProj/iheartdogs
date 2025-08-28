"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function PuppySpotAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [puppyUrl, setPuppyUrl] = useState("");
  const [puppyUrls, setPuppyUrls] = useState("");

  const handleScrapeBreeds = async () => {
    setIsLoading(true);
    setResults(null);

    try {
      const response = await fetch("/api/scrape-puppyspot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "breeds",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data);
        toast.success(
          `Successfully scraped ${data.count} breeds from PuppySpot!`
        );
      } else {
        toast.error(data.error || "Scraping failed");
      }
    } catch (error) {
      console.error("Scraping error:", error);
      toast.error("Failed to run scraper");
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrapePuppy = async () => {
    if (!puppyUrl.trim()) {
      toast.error("Please enter a puppy URL");
      return;
    }

    setIsLoading(true);
    setResults(null);

    try {
      const response = await fetch("/api/scrape-puppyspot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "puppy",
          url: puppyUrl.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data);
        toast.success(`Successfully scraped puppy details!`);
      } else {
        toast.error(data.error || "Scraping failed");
      }
    } catch (error) {
      console.error("Scraping error:", error);
      toast.error("Failed to run scraper");
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrapePuppies = async () => {
    if (!puppyUrls.trim()) {
      toast.error("Please enter puppy URLs");
      return;
    }

    const urls = puppyUrls
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url);

    if (urls.length === 0) {
      toast.error("Please enter valid puppy URLs");
      return;
    }

    setIsLoading(true);
    setResults(null);

    try {
      const response = await fetch("/api/scrape-puppyspot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "puppies",
          puppyUrls: urls,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data);
        toast.success(`Successfully scraped ${data.count} puppy details!`);
      } else {
        toast.error(data.error || "Scraping failed");
      }
    } catch (error) {
      console.error("Scraping error:", error);
      toast.error("Failed to run scraper");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🐕 PuppySpot Scraper
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Breed Collections */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                🏷️ Breed Collections
              </h2>
              <p className="text-gray-600">
                Scrape all available breeds from PuppySpot.
              </p>

              <button
                onClick={handleScrapeBreeds}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {isLoading ? "🔄 Scraping..." : "🚀 Scrape Breeds"}
              </button>
            </div>

            {/* Single Puppy */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                🐾 Single Puppy
              </h2>
              <p className="text-gray-600">
                Scrape details for a specific puppy.
              </p>

              <input
                type="url"
                placeholder="Puppy URL (e.g., https://www.puppyspot.com/puppies-for-sale/breed/goldendoodle/puppy/797389)"
                value={puppyUrl}
                onChange={(e) => setPuppyUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <button
                onClick={handleScrapePuppy}
                disabled={isLoading || !puppyUrl.trim()}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {isLoading ? "🔄 Scraping..." : "🎯 Scrape Puppy"}
              </button>
            </div>

            {/* Multiple Puppies */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                🐕 Multiple Puppies
              </h2>
              <p className="text-gray-600">
                Scrape details for multiple puppies.
              </p>

              <textarea
                placeholder="Puppy URLs (one per line)"
                value={puppyUrls}
                onChange={(e) => setPuppyUrls(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <button
                onClick={handleScrapePuppies}
                disabled={isLoading || !puppyUrls.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {isLoading ? "🔄 Scraping..." : "📋 Scrape Puppies"}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📊 Scraping Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {results.count}
                </div>
                <div className="text-sm text-blue-800">Total Items</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {results.action}
                </div>
                <div className="text-sm text-green-800">Action Type</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {results.data?.filter(
                    (item) => item.images && item.images.length > 0
                  ).length || 0}
                </div>
                <div className="text-sm text-purple-800">With Images</div>
              </div>
            </div>

            {/* Sample Data */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Sample Data</h3>
              <div className="max-h-96 overflow-y-auto">
                {results.data?.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 mb-3"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {item.name || item.title || "No Name"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.breed || "No Breed"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.age || "No Age"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.location || "No Location"}
                        </p>
                        {item.puppyCount && (
                          <p className="text-sm text-gray-600">
                            Puppies: {item.puppyCount}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {item.price || "No Price"}
                        </div>
                        {item.images && item.images.length > 0 && (
                          <img
                            src={item.images[0]}
                            alt={item.name || item.title}
                            className="w-16 h-16 object-cover rounded-lg mt-2 ml-auto"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        )}
                      </div>
                    </div>

                    {/* Show breeder info if available */}
                    {item.breeder && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <h5 className="text-sm font-medium text-gray-700">
                          Breeder Info:
                        </h5>
                        <p className="text-sm text-gray-600">
                          {item.breeder.name} - {item.breeder.location}
                        </p>
                        {item.breeder.phone && (
                          <p className="text-sm text-gray-600">
                            Phone: {item.breeder.phone}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Download Links */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Download Data
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const blob = new Blob(
                      [JSON.stringify(results.data, null, 2)],
                      { type: "application/json" }
                    );
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `puppyspot_${results.action}_${new Date()
                      .toISOString()
                      .slice(0, 19)}.json`;
                    a.click();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  📄 Download JSON
                </button>
                <button
                  onClick={() => {
                    const headers = Object.keys(results.data[0] || {});
                    const csvContent = [
                      headers.join(","),
                      ...results.data.map((row) =>
                        headers
                          .map((header) => {
                            const value = row[header] || "";
                            return `"${String(value).replace(/"/g, '""')}"`;
                          })
                          .join(",")
                      ),
                    ].join("\n");

                    const blob = new Blob([csvContent], { type: "text/csv" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `puppyspot_${results.action}_${new Date()
                      .toISOString()
                      .slice(0, 19)}.csv`;
                    a.click();
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  📊 Download CSV
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
