"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ScraperAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [customConfig, setCustomConfig] = useState({
    baseUrl: "",
    pages: ["/"],
    selectors: {
      listingSelector: ".puppy-card, .dog-listing",
      titleSelector: ".puppy-name, .title",
      priceSelector: ".price, .cost",
      breedSelector: ".breed, .dog-breed",
      ageSelector: ".age, .puppy-age",
      locationSelector: ".location, .city",
      imageSelector: ".puppy-image img",
      descriptionSelector: ".description, .details",
      contactSelector: ".contact-info, .phone",
    },
  });

  const handleScrape = async (websiteName = null) => {
    setIsLoading(true);
    setResults(null);

    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          websiteName,
          customConfig: websiteName ? null : customConfig,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data);
        toast.success(`Successfully scraped ${data.count} listings!`);
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

  const updateSelector = (key, value) => {
    setCustomConfig((prev) => ({
      ...prev,
      selectors: {
        ...prev.selectors,
        [key]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🐕 Pet Website Scraper
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Scrape Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Quick Scrape
              </h2>
              <p className="text-gray-600">
                Use predefined configurations for common pet websites.
              </p>

              <button
                onClick={() => handleScrape("example-pet-site")}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {isLoading ? "🔄 Scraping..." : "🚀 Scrape Example Site"}
              </button>
            </div>

            {/* Custom Configuration Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Custom Configuration
              </h2>
              <p className="text-gray-600">
                Configure scraping for any website.
              </p>

              <div className="space-y-3">
                <input
                  type="url"
                  placeholder="Base URL (e.g., https://example.com)"
                  value={customConfig.baseUrl}
                  onChange={(e) =>
                    setCustomConfig((prev) => ({
                      ...prev,
                      baseUrl: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                  type="text"
                  placeholder="Pages (comma-separated, e.g., /puppies, /available)"
                  value={customConfig.pages.join(", ")}
                  onChange={(e) =>
                    setCustomConfig((prev) => ({
                      ...prev,
                      pages: e.target.value
                        .split(",")
                        .map((p) => p.trim())
                        .filter((p) => p),
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={() => handleScrape()}
                disabled={isLoading || !customConfig.baseUrl}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {isLoading ? "🔄 Scraping..." : "🎯 Scrape Custom Site"}
              </button>
            </div>
          </div>
        </div>

        {/* Selectors Configuration */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            CSS Selectors Configuration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(customConfig.selectors).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updateSelector(key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder={`e.g., .${key
                    .replace(/([A-Z])/g, "-$1")
                    .toLowerCase()}`}
                />
              </div>
            ))}
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
                <div className="text-sm text-blue-800">Total Listings</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {results.data?.filter((item) => item.price).length || 0}
                </div>
                <div className="text-sm text-green-800">With Prices</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {results.data?.filter((item) => item.imageUrl).length || 0}
                </div>
                <div className="text-sm text-purple-800">With Images</div>
              </div>
            </div>

            {/* Sample Data */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Sample Data</h3>
              <div className="max-h-96 overflow-y-auto">
                {results.data?.slice(0, 5).map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 mb-3"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {item.title || "No Title"}
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
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {item.price || "No Price"}
                        </div>
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-lg mt-2 ml-auto"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        )}
                      </div>
                    </div>
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
                    a.download = `scraped_data_${new Date()
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
                    a.download = `scraped_data_${new Date()
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
