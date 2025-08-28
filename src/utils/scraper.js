const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs").promises;
const path = require("path");

class PetWebsiteScraper {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    try {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--no-zygote",
          "--disable-gpu",
        ],
      });
      this.page = await this.browser.newPage();

      // Set user agent to avoid detection
      await this.page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      );

      // Set viewport
      await this.page.setViewport({ width: 1920, height: 1080 });

      console.log("Scraper initialized successfully");
    } catch (error) {
      console.error("Failed to initialize scraper:", error);
      throw error;
    }
  }

  async scrapePuppyListings(url, selectors) {
    try {
      console.log(`Scraping puppy listings from: ${url}`);

      await this.page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });

      // Wait for content to load
      await this.page.waitForTimeout(2000);

      const content = await this.page.content();
      const $ = cheerio.load(content);

      const listings = [];

      // Extract data based on selectors
      $(selectors.listingSelector).each((index, element) => {
        const listing = {
          id: index + 1,
          title: $(element).find(selectors.titleSelector).text().trim(),
          price: $(element).find(selectors.priceSelector).text().trim(),
          breed: $(element).find(selectors.breedSelector).text().trim(),
          age: $(element).find(selectors.ageSelector).text().trim(),
          location: $(element).find(selectors.locationSelector).text().trim(),
          imageUrl:
            $(element).find(selectors.imageSelector).attr("src") ||
            $(element).find(selectors.imageSelector).attr("data-src") ||
            "",
          description: $(element)
            .find(selectors.descriptionSelector)
            .text()
            .trim(),
          contactInfo: $(element).find(selectors.contactSelector).text().trim(),
          url: url,
          scrapedAt: new Date().toISOString(),
        };

        // Clean up the data
        Object.keys(listing).forEach((key) => {
          if (typeof listing[key] === "string") {
            listing[key] = listing[key].replace(/\s+/g, " ").trim();
          }
        });

        if (listing.title) {
          listings.push(listing);
        }
      });

      console.log(`Found ${listings.length} listings`);
      return listings;
    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
      return [];
    }
  }

  async scrapeMultiplePages(baseUrl, pageUrls, selectors) {
    const allListings = [];

    for (const pageUrl of pageUrls) {
      const fullUrl = pageUrl.startsWith("http")
        ? pageUrl
        : `${baseUrl}${pageUrl}`;
      const listings = await this.scrapePuppyListings(fullUrl, selectors);
      allListings.push(...listings);

      // Be respectful - add delay between requests
      await this.delay(2000);
    }

    return allListings;
  }

  async saveToFile(data, filename = "scraped_data.json") {
    try {
      const outputPath = path.join(process.cwd(), "data", filename);

      // Ensure data directory exists
      await fs.mkdir(path.dirname(outputPath), { recursive: true });

      await fs.writeFile(outputPath, JSON.stringify(data, null, 2));
      console.log(`Data saved to: ${outputPath}`);

      return outputPath;
    } catch (error) {
      console.error("Error saving data:", error);
      throw error;
    }
  }

  async saveToCSV(data, filename = "scraped_data.csv") {
    try {
      if (data.length === 0) {
        console.log("No data to save");
        return;
      }

      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(","),
        ...data.map((row) =>
          headers
            .map((header) => {
              const value = row[header] || "";
              // Escape commas and quotes in CSV
              return `"${String(value).replace(/"/g, '""')}"`;
            })
            .join(",")
        ),
      ].join("\n");

      const outputPath = path.join(process.cwd(), "data", filename);
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, csvContent);

      console.log(`CSV data saved to: ${outputPath}`);
      return outputPath;
    } catch (error) {
      console.error("Error saving CSV:", error);
      throw error;
    }
  }

  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log("Scraper closed");
    }
  }
}

// Example selectors for common pet websites
const commonSelectors = {
  // Example for a generic pet listing site
  generic: {
    listingSelector: ".puppy-listing, .dog-card, .pet-item",
    titleSelector: ".title, .name, h3",
    priceSelector: ".price, .cost",
    breedSelector: ".breed, .dog-breed",
    ageSelector: ".age, .puppy-age",
    locationSelector: ".location, .city",
    imageSelector: "img",
    descriptionSelector: ".description, .details",
    contactSelector: ".contact, .phone",
  },

  // Add more specific selectors for different websites
  // You can customize these based on the actual websites you want to scrape
};

module.exports = { PetWebsiteScraper, commonSelectors };
