const { PuppySpotScraper } = require("./src/utils/puppyspot-scraper.js");

async function testScraper() {
  const scraper = new PuppySpotScraper();

  try {
    console.log("🐕 Testing PuppySpot Scraper...\n");

    await scraper.initialize();

    // Test scraping puppy listings
    console.log("📋 Testing puppy listings scraping...");
    const puppies = await scraper.scrapeBreedCollections(
      "https://www.puppyspot.com/breed/collections/active-dogs"
    );

    console.log(`✅ Found ${puppies.length} puppies`);

    if (puppies.length > 0) {
      console.log("\n📊 Sample puppy data:");
      console.log(JSON.stringify(puppies.slice(0, 3), null, 2));

      // Test scraping a single puppy detail
      if (puppies[0].url) {
        console.log("\n🔍 Testing puppy details scraping...");
        const puppyDetails = await scraper.scrapePuppyDetails(puppies[0].url);

        if (puppyDetails) {
          console.log("\n📋 Puppy details:");
          console.log(JSON.stringify(puppyDetails, null, 2));
        }
      }
    }
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await scraper.close();
  }
}

testScraper();
