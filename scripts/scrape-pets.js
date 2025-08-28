const {
  PetWebsiteScraper,
  commonSelectors,
} = require("../src/utils/scraper.js");

// Configuration for different pet websites
const websiteConfigs = {
  // Example configuration - you'll need to customize these based on actual websites
  "example-pet-site": {
    baseUrl: "https://example-pet-site.com",
    pages: ["/puppies-for-sale", "/available-puppies", "/jack-russell-puppies"],
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
  },

  // Add more website configurations here
  "another-pet-site": {
    baseUrl: "https://another-pet-site.com",
    pages: ["/puppies", "/available"],
    selectors: {
      listingSelector: ".pet-item, .listing",
      titleSelector: ".pet-title, h3",
      priceSelector: ".pet-price, .cost",
      breedSelector: ".pet-breed",
      ageSelector: ".pet-age",
      locationSelector: ".pet-location",
      imageSelector: ".pet-image img",
      descriptionSelector: ".pet-description",
      contactSelector: ".pet-contact",
    },
  },
};

async function scrapeWebsite(websiteName, config) {
  const scraper = new PetWebsiteScraper();

  try {
    console.log(`\n🚀 Starting to scrape: ${websiteName}`);
    console.log(`📍 Base URL: ${config.baseUrl}`);

    await scraper.initialize();

    // Scrape all pages
    const allListings = await scraper.scrapeMultiplePages(
      config.baseUrl,
      config.pages,
      config.selectors
    );

    if (allListings.length > 0) {
      // Save data in multiple formats
      const jsonFile = await scraper.saveToFile(
        allListings,
        `${websiteName}_listings.json`
      );
      const csvFile = await scraper.saveToCSV(
        allListings,
        `${websiteName}_listings.csv`
      );

      console.log(
        `✅ Successfully scraped ${allListings.length} listings from ${websiteName}`
      );
      console.log(`📁 Data saved to:`);
      console.log(`   - JSON: ${jsonFile}`);
      console.log(`   - CSV: ${csvFile}`);

      // Display sample data
      console.log("\n📊 Sample data:");
      console.log(JSON.stringify(allListings.slice(0, 2), null, 2));

      return allListings;
    } else {
      console.log(`⚠️  No listings found on ${websiteName}`);
      return [];
    }
  } catch (error) {
    console.error(`❌ Error scraping ${websiteName}:`, error);
    return [];
  } finally {
    await scraper.close();
  }
}

async function scrapeAllWebsites() {
  console.log("🐕 Pet Website Scraper Starting...\n");

  const allResults = {};

  for (const [websiteName, config] of Object.entries(websiteConfigs)) {
    const results = await scrapeWebsite(websiteName, config);
    allResults[websiteName] = results;

    // Be respectful - add delay between websites
    if (
      Object.keys(websiteConfigs).indexOf(websiteName) <
      Object.keys(websiteConfigs).length - 1
    ) {
      console.log("\n⏳ Waiting 5 seconds before next website...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  // Save combined results
  const combinedResults = Object.values(allResults).flat();
  if (combinedResults.length > 0) {
    const scraper = new PetWebsiteScraper();
    await scraper.saveToFile(combinedResults, "all_pet_listings.json");
    await scraper.saveToCSV(combinedResults, "all_pet_listings.csv");
    console.log(`\n🎉 Total scraped listings: ${combinedResults.length}`);
  }

  return allResults;
}

// Function to scrape a single website
async function scrapeSingleWebsite(websiteName) {
  const config = websiteConfigs[websiteName];
  if (!config) {
    console.error(`❌ Configuration not found for website: ${websiteName}`);
    return;
  }

  return await scrapeWebsite(websiteName, config);
}

// Export functions for use in other scripts
module.exports = {
  scrapeAllWebsites,
  scrapeSingleWebsite,
  websiteConfigs,
};

// Run the scraper if this script is executed directly
if (require.main === module) {
  const websiteName = process.argv[2];

  if (websiteName) {
    scrapeSingleWebsite(websiteName)
      .then(() => {
        console.log("\n✅ Scraping completed!");
        process.exit(0);
      })
      .catch((error) => {
        console.error("\n❌ Scraping failed:", error);
        process.exit(1);
      });
  } else {
    scrapeAllWebsites()
      .then(() => {
        console.log("\n✅ All scraping completed!");
        process.exit(0);
      })
      .catch((error) => {
        console.error("\n❌ Scraping failed:", error);
        process.exit(1);
      });
  }
}
