const {
  PuppySpotScraper,
  puppySpotConfigs,
} = require("../src/utils/puppyspot-scraper.js");

async function scrapePuppySpotBreeds() {
  const scraper = new PuppySpotScraper();

  try {
    console.log("🐕 Starting PuppySpot Breed Collections Scraper...\n");

    await scraper.initialize();

    // Scrape breed collections
    const breeds = await scraper.scrapeBreedCollections(
      puppySpotConfigs.breedCollections.url
    );

    if (breeds.length > 0) {
      // Save breed data
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const jsonFile = await scraper.saveToFile(
        breeds,
        `puppyspot_breeds_${timestamp}.json`
      );
      const csvFile = await scraper.saveToCSV(
        breeds,
        `puppyspot_breeds_${timestamp}.csv`
      );

      console.log(
        `✅ Successfully scraped ${breeds.length} breeds from PuppySpot`
      );
      console.log(`📁 Data saved to:`);
      console.log(`   - JSON: ${jsonFile}`);
      console.log(`   - CSV: ${csvFile}`);

      // Display sample data
      console.log("\n📊 Sample breed data:");
      console.log(JSON.stringify(breeds.slice(0, 3), null, 2));

      return breeds;
    } else {
      console.log("⚠️  No breeds found on PuppySpot");
      return [];
    }
  } catch (error) {
    console.error("❌ Error scraping PuppySpot breeds:", error);
    return [];
  } finally {
    await scraper.close();
  }
}

async function scrapePuppySpotPuppyDetails(puppyUrls) {
  const scraper = new PuppySpotScraper();

  try {
    console.log(`🐕 Starting PuppySpot Puppy Details Scraper...\n`);
    console.log(`📋 Scraping ${puppyUrls.length} puppy details\n`);

    await scraper.initialize();

    // Scrape puppy details
    const puppyDetails = await scraper.scrapeMultiplePuppies(puppyUrls);

    if (puppyDetails.length > 0) {
      // Save puppy data
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const jsonFile = await scraper.saveToFile(
        puppyDetails,
        `puppyspot_puppies_${timestamp}.json`
      );
      const csvFile = await scraper.saveToCSV(
        puppyDetails,
        `puppyspot_puppies_${timestamp}.csv`
      );

      console.log(
        `✅ Successfully scraped ${puppyDetails.length} puppy details from PuppySpot`
      );
      console.log(`📁 Data saved to:`);
      console.log(`   - JSON: ${jsonFile}`);
      console.log(`   - CSV: ${csvFile}`);

      // Display sample data
      console.log("\n📊 Sample puppy data:");
      console.log(JSON.stringify(puppyDetails.slice(0, 1), null, 2));

      return puppyDetails;
    } else {
      console.log("⚠️  No puppy details found");
      return [];
    }
  } catch (error) {
    console.error("❌ Error scraping PuppySpot puppy details:", error);
    return [];
  } finally {
    await scraper.close();
  }
}

async function scrapeSinglePuppy(puppyUrl) {
  const scraper = new PuppySpotScraper();

  try {
    console.log(`🐕 Scraping single puppy from: ${puppyUrl}\n`);

    await scraper.initialize();

    // Scrape single puppy details
    const puppyDetails = await scraper.scrapePuppyDetails(puppyUrl);

    if (puppyDetails) {
      // Save puppy data
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const jsonFile = await scraper.saveToFile(
        [puppyDetails],
        `puppyspot_single_puppy_${timestamp}.json`
      );

      console.log(`✅ Successfully scraped puppy details`);
      console.log(`📁 Data saved to: ${jsonFile}`);

      // Display data
      console.log("\n📊 Puppy details:");
      console.log(JSON.stringify(puppyDetails, null, 2));

      return puppyDetails;
    } else {
      console.log("⚠️  No puppy details found");
      return null;
    }
  } catch (error) {
    console.error("❌ Error scraping puppy details:", error);
    return null;
  } finally {
    await scraper.close();
  }
}

// Example puppy URLs for testing
const examplePuppyUrls = [
  "https://www.puppyspot.com/puppies-for-sale/breed/goldendoodle/puppy/797389",
  // Add more puppy URLs here
];

// Export functions for use in other scripts
module.exports = {
  scrapePuppySpotBreeds,
  scrapePuppySpotPuppyDetails,
  scrapeSinglePuppy,
  examplePuppyUrls,
};

// Run the scraper if this script is executed directly
if (require.main === module) {
  const command = process.argv[2];
  const url = process.argv[3];

  switch (command) {
    case "breeds":
      scrapePuppySpotBreeds()
        .then(() => {
          console.log("\n✅ Breed scraping completed!");
          process.exit(0);
        })
        .catch((error) => {
          console.error("\n❌ Breed scraping failed:", error);
          process.exit(1);
        });
      break;

    case "puppy":
      if (!url) {
        console.error("❌ Please provide a puppy URL");
        console.log(
          "Usage: node scripts/scrape-puppyspot.js puppy <puppy-url>"
        );
        process.exit(1);
      }
      scrapeSinglePuppy(url)
        .then(() => {
          console.log("\n✅ Puppy scraping completed!");
          process.exit(0);
        })
        .catch((error) => {
          console.error("\n❌ Puppy scraping failed:", error);
          process.exit(1);
        });
      break;

    case "puppies":
      scrapePuppySpotPuppyDetails(examplePuppyUrls)
        .then(() => {
          console.log("\n✅ Puppies scraping completed!");
          process.exit(0);
        })
        .catch((error) => {
          console.error("\n❌ Puppies scraping failed:", error);
          process.exit(1);
        });
      break;

    default:
      console.log("🐕 PuppySpot Scraper");
      console.log("\nUsage:");
      console.log(
        "  node scripts/scrape-puppyspot.js breeds                    # Scrape breed collections"
      );
      console.log(
        "  node scripts/scrape-puppyspot.js puppy <puppy-url>         # Scrape single puppy"
      );
      console.log(
        "  node scripts/scrape-puppyspot.js puppies                   # Scrape example puppies"
      );
      console.log("\nExamples:");
      console.log("  node scripts/scrape-puppyspot.js breeds");
      console.log(
        "  node scripts/scrape-puppyspot.js puppy https://www.puppyspot.com/puppies-for-sale/breed/goldendoodle/puppy/797389"
      );
      break;
  }
}
