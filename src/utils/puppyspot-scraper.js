const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs").promises;
const path = require("path");
const VideoExtractor = require("./video-extractor");
const VideoUrlHelper = require("./video-url-helper");

class PuppySpotScraper {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    try {
      this.browser = await puppeteer.launch({
        headless: "new", // Use new headless mode
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

      console.log("PuppySpot Scraper initialized successfully");
    } catch (error) {
      console.error("Failed to initialize PuppySpot scraper:", error);
      throw error;
    }
  }

  async scrapeBreedCollections(url) {
    try {
      console.log(`Scraping breed collections from: ${url}`);

      await this.page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });

      // Wait for content to load
      await this.page.waitForTimeout(3000);

      // Get debug HTML
      const debugHtml = await this.page.content();
      await this.saveDebugHtml(debugHtml, "breed-collections-debug.html");

      const $ = cheerio.load(debugHtml);
      const puppies = [];

      // PuppySpot puppy listing selectors based on actual HTML structure
      $(".puppy-card-plp").each((index, element) => {
        const puppy = {
          id: index + 1,
          name: $(element).find(".name").text().trim(),
          breed: $(element).find(".breed").text().trim(),
          age: $(element).find(".age").text().trim().replace("old", "").trim(),
          imageUrl:
            $(element).find(".card__image").attr("src") ||
            $(element).find(".card__image").attr("data-src") ||
            "",
          url: $(element).attr("href") || "",
          hasVideo: $(element).find(".card__video-icon").length > 0,
          scrapedAt: new Date().toISOString(),
        };

        // Clean up the data
        Object.keys(puppy).forEach((key) => {
          if (typeof puppy[key] === "string") {
            puppy[key] = puppy[key].replace(/\s+/g, " ").trim();
          }
        });

        if (puppy.name && puppy.breed) {
          puppies.push(puppy);
        }
      });

      console.log(`Found ${puppies.length} puppies`);
      return puppies;
    } catch (error) {
      console.error(`Error scraping breed collections from ${url}:`, error);
      return [];
    }
  }

  async scrapePuppyDetails(url) {
    try {
      console.log(`Scraping puppy details from: ${url}`);

      await this.page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 60000, // Increased timeout
      });

      // Wait for content to load
      await this.page.waitForTimeout(5000);

      // Get debug HTML
      const debugHtml = await this.page.content();
      await this.saveDebugHtml(debugHtml, "puppy-details-debug.html");

      // Extract data from JavaScript variables in the page
      const puppyData = await this.page.evaluate(async () => {
        try {
          // 1. EXTRACT DYNAMIC PUPPY DATA FROM preact_PhotoGallery (PRIORITY)
          let dynamicPuppyData = null;
          let puppyBioData = null;
          let puppyProfileData = null;
          let parentsData = null;
          let siblingsData = null;
          let videoData = null;

          // Look for preact_PhotoGallery in script content
          const scripts = document.querySelectorAll("script");
          for (const script of scripts) {
            const content = script.textContent || script.innerHTML;

            // Extract dynamic puppy data from preact_PhotoGallery
            if (content.includes("preact_PhotoGallery")) {
              const startIndex = content.indexOf("preact_PhotoGallery");
              const match = content
                .substring(startIndex)
                .match(/preact_PhotoGallery\('.*?',\s*({.*?})\)/);

              if (match) {
                try {
                  const data = JSON.parse(match[1]);
                  dynamicPuppyData = data.puppy;
                  console.log(
                    "✅ Successfully extracted dynamic puppy data from preact_PhotoGallery"
                  );
                  console.log("Puppy ID:", dynamicPuppyData.id);
                  console.log("Age:", dynamicPuppyData.ageInWeeks, "weeks");
                  console.log("Gender:", dynamicPuppyData.gender?.name);
                  console.log("Breed:", dynamicPuppyData.litter?.breed?.name);

                  // Also check for videos in the dynamic data
                  if (
                    dynamicPuppyData.videos &&
                    dynamicPuppyData.videos.length > 0 &&
                    !videoData
                  ) {
                    videoData = dynamicPuppyData.videos;
                    console.log(
                      "✅ Found videos in dynamic puppy data:",
                      videoData.length,
                      "videos"
                    );
                  }
                } catch (e) {
                  console.log(
                    "❌ Failed to parse preact_PhotoGallery data:",
                    e.message
                  );
                }
              }
            }

            // Extract video data - IMPROVED VERSION with complete data extraction
            if (content.includes('"videos":[')) {
              console.log("Found videos array in script content");

              // Use bracket counting to find the complete video array
              const startIndex = content.indexOf('"videos":[');
              let bracketCount = 0;
              let endIndex = startIndex + 9; // Start after "videos":[

              for (let i = endIndex; i < content.length; i++) {
                if (content[i] === "[") bracketCount++;
                if (content[i] === "]") {
                  if (bracketCount === 0) {
                    endIndex = i;
                    break;
                  }
                  bracketCount--;
                }
              }

              if (endIndex > startIndex + 9) {
                const videoArrayContent = content.substring(
                  startIndex + 9,
                  endIndex
                );
                console.log(
                  "✅ Found complete video array with bracket counting"
                );

                try {
                  // Clean up the content before parsing
                  let cleanContent = videoArrayContent
                    .replace(/\n/g, " ")
                    .replace(/\r/g, " ")
                    .replace(/\t/g, " ")
                    .replace(/\s+/g, " ")
                    .trim();

                  videoData = JSON.parse(`[${cleanContent}]`);
                  console.log(
                    "✅ Successfully extracted complete video data:",
                    videoData.length,
                    "videos"
                  );
                  videoData.forEach((video, index) => {
                    console.log(
                      `   Video ${index + 1}: ${video.name} (ID: ${video.id})`
                    );
                    console.log(`      FilePath: ${video.filePath || "N/A"}`);
                    console.log(`      DataUrl: ${video.dataUrl || "N/A"}`);
                    console.log(`      Player: ${video.player || "N/A"}`);
                    const cloudflareAttr = video.attributes?.find(
                      (attr) => attr.slug === "cloudflare-uid"
                    );
                    if (cloudflareAttr) {
                      console.log(
                        `      CloudflareUID: ${cloudflareAttr.value}`
                      );
                    }
                  });
                } catch (e) {
                  console.log("❌ Failed to parse video data:", e.message);
                  console.log(
                    "Raw video content:",
                    videoArrayContent.substring(0, 500)
                  );

                  // Try to extract individual video objects manually
                  try {
                    const videoObjects = videoArrayContent.match(/\{[^}]+\}/g);
                    if (videoObjects) {
                      videoData = [];
                      for (const videoObj of videoObjects) {
                        try {
                          const video = JSON.parse(videoObj);
                          if (video.id && video.name) {
                            videoData.push(video);
                            console.log(
                              `✅ Extracted video: ${video.name} (ID: ${video.id})`
                            );
                          }
                        } catch (parseError) {
                          console.log(
                            "Failed to parse individual video object:",
                            parseError.message
                          );
                        }
                      }
                    }
                  } catch (manualError) {
                    console.log(
                      "Failed manual video extraction:",
                      manualError.message
                    );

                    // Try to extract just the basic video info if all else fails
                    try {
                      const basicVideoMatch = videoArrayContent.match(
                        /"id":(\d+),"name":"([^"]+)"/
                      );
                      if (basicVideoMatch) {
                        videoData = [
                          {
                            id: parseInt(basicVideoMatch[1]),
                            name: basicVideoMatch[2],
                            filePath: "",
                            url: "",
                          },
                        ];
                        console.log(
                          "✅ Extracted basic video info:",
                          videoData[0].name
                        );
                      }
                    } catch (basicError) {
                      console.log(
                        "❌ Failed to extract basic video info:",
                        basicError.message
                      );
                    }
                  }
                }
              }
            }

            // Also try to extract videos from puppy bio data if available
            if (content.includes("preact_PuppyBio")) {
              const match = content.match(/preact_PuppyBio\s*=\s*({.*?});/);
              if (match) {
                try {
                  const bioData = JSON.parse(match[1]);
                  if (
                    bioData.videos &&
                    bioData.videos.length > 0 &&
                    !videoData
                  ) {
                    videoData = bioData.videos;
                    console.log(
                      "✅ Found videos in preact_PuppyBio:",
                      videoData.length,
                      "videos"
                    );
                  }
                } catch (e) {
                  console.log("Failed to parse preact_PuppyBio data");
                }
              }
            }

            // Also try to extract videos from puppy profile data if available
            if (content.includes("preact_PuppyProfile")) {
              const match = content.match(/preact_PuppyProfile\s*=\s*({.*?});/);
              if (match) {
                try {
                  const profileData = JSON.parse(match[1]);
                  if (
                    profileData.videos &&
                    profileData.videos.length > 0 &&
                    !videoData
                  ) {
                    videoData = profileData.videos;
                    console.log(
                      "✅ Found videos in preact_PuppyProfile:",
                      videoData.length,
                      "videos"
                    );
                  }
                } catch (e) {
                  console.log("Failed to parse preact_PuppyProfile data");
                }
              }
            }

            // Extract other data from existing variables
            if (content.includes("preact_PuppyBio")) {
              const match = content.match(/preact_PuppyBio\s*=\s*({.*?});/);
              if (match) {
                try {
                  puppyBioData = JSON.parse(match[1]);
                } catch (e) {
                  console.log("Failed to parse preact_PuppyBio data");
                }
              }
            }

            if (content.includes("preact_PuppyProfile")) {
              const match = content.match(/preact_PuppyProfile\s*=\s*({.*?});/);
              if (match) {
                try {
                  puppyProfileData = JSON.parse(match[1]);
                } catch (e) {
                  console.log("Failed to parse preact_PuppyProfile data");
                }
              }
            }

            if (content.includes("preact_PuppyProfileParents")) {
              const match = content.match(
                /preact_PuppyProfileParents\s*=\s*({.*?});/
              );
              if (match) {
                try {
                  parentsData = JSON.parse(match[1]);
                } catch (e) {
                  console.log(
                    "Failed to parse preact_PuppyProfileParents data"
                  );
                }
              }
            }

            if (content.includes("preact_PuppyProfileLittermates")) {
              const match = content.match(
                /preact_PuppyProfileLittermates\s*=\s*({.*?});/
              );
              if (match) {
                try {
                  siblingsData = JSON.parse(match[1]);
                } catch (e) {
                  console.log(
                    "Failed to parse preact_PuppyProfileLittermates data"
                  );
                }
              }
            }

            // Extract location from bringPuppyHomeProps
            if (content.includes("bringPuppyHomeProps")) {
              const match = content.match(/bringPuppyHomeProps\s*=\s*({.*?});/);
              if (match) {
                try {
                  const bringHomeData = JSON.parse(match[1]);
                  if (bringHomeData.location) {
                    window.puppyLocation = bringHomeData.location;
                  }
                } catch (e) {
                  console.log("Failed to parse bringPuppyHomeProps data");
                }
              }
            }

            // Extract parent photos from JavaScript variables
            if (content.includes("damPhoto") || content.includes("sirePhoto")) {
              const photoMatch = content.match(
                /"damPhoto":"([^"]+)","sirePhoto":"([^"]+)"/
              );
              if (photoMatch) {
                window.damPhoto = photoMatch[1].replace(/\\/g, "");
                window.sirePhoto = photoMatch[2].replace(/\\/g, "");
              }
            }
          }

          // 2. USE DYNAMIC DATA AS PRIMARY SOURCE
          let name = "";
          let breed = "";
          let age = "";
          let gender = "";
          let price = "";

          // Use dynamic data from preact_PhotoGallery (PRIORITY)
          if (dynamicPuppyData) {
            name = dynamicPuppyData.displayName || dynamicPuppyData.name || "";
            breed = dynamicPuppyData.litter?.breed?.name || "";
            age = dynamicPuppyData.ageInWeeks
              ? `${dynamicPuppyData.ageInWeeks} weeks`
              : "";
            gender = dynamicPuppyData.gender?.name || "";
          }

          // Fallback to other sources if dynamic data is missing
          if (!name) {
            name = document.querySelector("h1")?.textContent?.trim() || "";
          }
          if (!breed) {
            breed = document.querySelector(".breed")?.textContent?.trim() || "";
          }
          if (!age) {
            age = document.querySelector(".age")?.textContent?.trim() || "";
          }
          if (!gender) {
            gender =
              document.querySelector(".gender")?.textContent?.trim() || "";
          }

          // Extract price from various possible locations
          const priceSelectors = [
            ".price",
            '[data-cy="price"]',
            ".puppy-price",
            ".cost",
            ".amount",
            '[class*="price"]',
            '[class*="cost"]',
            '[class*="Price"]',
            '[class*="Cost"]',
          ];

          for (const selector of priceSelectors) {
            const priceElement = document.querySelector(selector);
            if (priceElement) {
              price = priceElement.textContent?.trim();
              if (price) break;
            }
          }

          // If no price found in elements, try to extract from page text
          if (!price) {
            const pageText = document.body.textContent || "";
            const priceMatch = pageText.match(
              /\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?/
            );
            if (priceMatch) {
              price = priceMatch[0];
            }
          }

          // Clean up price if it has extra text
          if (price && price.includes("Explore")) {
            price = price.split("Explore")[0].trim();
          }

          // Get only actual puppy photos (filter out icons, buttons, etc.)
          const allImages = Array.from(document.querySelectorAll("img"))
            .map((img) => {
              const src = img.src || img.getAttribute("data-src");
              if (!src) return null;

              // Only include actual puppy photos
              const isPuppyPhoto =
                src.includes("photos.puppyspot.com") &&
                (src.includes("listing") || src.includes("puppyparent")) &&
                !src.includes("generic.png") &&
                !src.includes("placeholder") &&
                !src.includes("icon") &&
                !src.includes("button") &&
                !src.includes("logo") &&
                !src.includes("svg") &&
                !src.includes("tracking") &&
                !src.includes("analytics");

              return isPuppyPhoto ? src : null;
            })
            .filter(Boolean);

          // Get the current puppy ID for filtering
          const currentPuppyId = dynamicPuppyData?.id;

          // Filter images to only include the current puppy's images and parent images
          const filteredImages = allImages.filter((img) => {
            // Always include parent images
            if (img.includes("puppyparent")) {
              return true;
            }

            // For listing images, only include the current puppy's images
            if (img.includes("listing") && currentPuppyId) {
              return img.includes(`/listing/${currentPuppyId}/`);
            }

            return false;
          });

          // Separate puppy images from parent images
          const images = filteredImages.filter((img) =>
            img.includes("listing")
          );
          const domParentImages = filteredImages.filter((img) =>
            img.includes("puppyparent")
          );

          // Extract parent images specifically
          let momImage = "";
          let dadImage = "";

          // Use the parent images found in DOM if available
          if (domParentImages.length >= 2) {
            momImage = domParentImages[0] || "";
            dadImage = domParentImages[1] || "";
          } else if (domParentImages.length === 1) {
            momImage = domParentImages[0] || "";
          }

          return {
            name,
            breed,
            age,
            gender,
            price,
            images,
            puppyBioData,
            puppyProfileData,
            parentsData,
            siblingsData,
            videoData,
            dynamicPuppyData,
            location: window.puppyLocation || "",
            momImage: window.damPhoto || momImage,
            dadImage: window.sirePhoto || dadImage,
          };
        } catch (error) {
          console.error("Error extracting data from page:", error);
          return null;
        }
      });

      if (!puppyData) {
        console.log("Failed to extract data from page");
        return null;
      }

      // Build the puppy details object
      const puppyDetails = {
        name: puppyData.name,
        breed: puppyData.breed,
        age: puppyData.age,
        gender: puppyData.gender,
        price: puppyData.price,
        images: puppyData.images,
        location: puppyData.location,
        url: url,
        scrapedAt: new Date().toISOString(),
      };

      // Use dynamic data from preact_PhotoGallery as PRIMARY source
      if (puppyData.dynamicPuppyData) {
        // Override with dynamic data (highest priority)
        if (
          puppyData.dynamicPuppyData.displayName ||
          puppyData.dynamicPuppyData.name
        ) {
          puppyDetails.name =
            puppyData.dynamicPuppyData.displayName ||
            puppyData.dynamicPuppyData.name;
        }
        if (puppyData.dynamicPuppyData.litter?.breed?.name) {
          puppyDetails.breed = puppyData.dynamicPuppyData.litter.breed.name;
        }
        if (puppyData.dynamicPuppyData.ageInWeeks) {
          puppyDetails.age = `${puppyData.dynamicPuppyData.ageInWeeks} weeks`;
        }
        if (puppyData.dynamicPuppyData.gender?.name) {
          puppyDetails.gender = puppyData.dynamicPuppyData.gender.name;
        }
        if (puppyData.dynamicPuppyData.description) {
          puppyDetails.description = puppyData.dynamicPuppyData.description;
        }
        if (puppyData.dynamicPuppyData.litter?.birthDate) {
          puppyDetails.birthDate = puppyData.dynamicPuppyData.litter.birthDate;
        }
        if (puppyData.dynamicPuppyData.dateAvailable) {
          puppyDetails.readyToGoHome = puppyData.dynamicPuppyData.dateAvailable;
        }
        if (puppyData.dynamicPuppyData.weightRange?.name) {
          puppyDetails.weight = puppyData.dynamicPuppyData.weightRange.name;
        }
        if (puppyData.dynamicPuppyData.color?.name) {
          puppyDetails.color = puppyData.dynamicPuppyData.color.name;
        }
        if (puppyData.dynamicPuppyData.variety?.name) {
          puppyDetails.variety = puppyData.dynamicPuppyData.variety.name;
        }

        // Add dynamic parent data
        if (
          puppyData.dynamicPuppyData.litter?.dam &&
          puppyData.dynamicPuppyData.litter?.sire
        ) {
          puppyDetails.parents = {
            mom: {
              name: puppyData.dynamicPuppyData.litter.dam.name || "Mom",
              breed: puppyData.dynamicPuppyData.litter.dam.breed?.name || "",
              weight:
                puppyData.dynamicPuppyData.litter.dam.weightRange?.name || "",
              color: puppyData.dynamicPuppyData.litter.dam.color?.name || "",
              registration:
                puppyData.dynamicPuppyData.litter.dam.registry?.name || "",
              image:
                puppyData.dynamicPuppyData.litter.dam.defaultPhotoUrl || "",
            },
            dad: {
              name: puppyData.dynamicPuppyData.litter.sire.name || "Dad",
              breed: puppyData.dynamicPuppyData.litter.sire.breed?.name || "",
              weight:
                puppyData.dynamicPuppyData.litter.sire.weightRange?.name || "",
              color: puppyData.dynamicPuppyData.litter.sire.color?.name || "",
              registration:
                puppyData.dynamicPuppyData.litter.sire.registry?.name || "",
              image:
                puppyData.dynamicPuppyData.litter.sire.defaultPhotoUrl || "",
            },
          };
        }

        // Add dynamic breeder information
        if (puppyData.dynamicPuppyData.litter?.breeder) {
          puppyDetails.breeder = {
            name: puppyData.dynamicPuppyData.litter.breeder.firstName || "",
            usdaNumber:
              puppyData.dynamicPuppyData.litter.breeder.usdaNumber || "",
            startingYear:
              puppyData.dynamicPuppyData.litter.breeder.breederStartingYear ||
              "",
            description:
              puppyData.dynamicPuppyData.litter.breeder
                .breedingPracticesDescription || "",
          };
        }
      }

      // Extract data from puppy bio as fallback
      if (puppyData.puppyBioData && !puppyDetails.description) {
        puppyDetails.description = puppyData.puppyBioData.description || "";
        if (!puppyDetails.age && puppyData.puppyBioData.ageInWeeks) {
          puppyDetails.age = `${puppyData.puppyBioData.ageInWeeks} weeks`;
        }
        if (!puppyDetails.gender && puppyData.puppyBioData.gender) {
          puppyDetails.gender = puppyData.puppyBioData.gender;
        }
        if (!puppyDetails.location && puppyData.puppyBioData.location) {
          puppyDetails.location = puppyData.puppyBioData.location;
        }
        if (
          !puppyDetails.readyToGoHome &&
          puppyData.puppyBioData.dateAvailable
        ) {
          puppyDetails.readyToGoHome = puppyData.puppyBioData.dateAvailable;
        }
      }

      // Extract age and gender from description if still not found
      if (!puppyDetails.age || !puppyDetails.gender) {
        const description = puppyDetails.description || "";
        const ageMatch = description.match(/(\d+)-week-old/);
        const genderMatch = description.match(/(male|female)/i);

        if (ageMatch && !puppyDetails.age) {
          puppyDetails.age = `${ageMatch[1]} weeks`;
        }
        if (genderMatch && !puppyDetails.gender) {
          puppyDetails.gender =
            genderMatch[1].charAt(0).toUpperCase() + genderMatch[1].slice(1);
        }
      }

      // Extract breed from description if not found or messy
      if (
        !puppyDetails.breed ||
        puppyDetails.breed.includes("Breeds All puppies")
      ) {
        const description = puppyDetails.description || "";
        const breedMatch = description.match(/(\w+(?:\s+\w+)*)\s+with/);
        if (breedMatch) {
          puppyDetails.breed = breedMatch[1];
        }
      }

      // Extract data from puppy profile for additional details as fallback
      if (puppyData.puppyProfileData) {
        // Override basic info if not found from dynamic data
        if (!puppyDetails.breed && puppyData.puppyProfileData.breedName) {
          puppyDetails.breed = puppyData.puppyProfileData.breedName;
        }
        if (!puppyDetails.age && puppyData.puppyProfileData.ageInWeeks) {
          puppyDetails.age = `${puppyData.puppyProfileData.ageInWeeks} weeks`;
        }
        if (!puppyDetails.gender && puppyData.puppyProfileData.gender) {
          puppyDetails.gender = puppyData.puppyProfileData.gender;
        }
        if (!puppyDetails.location && puppyData.puppyProfileData.location) {
          puppyDetails.location = puppyData.puppyProfileData.location;
        }

        // Add additional details if not already set
        if (
          !puppyDetails.weight &&
          puppyData.puppyProfileData.weightRange?.name
        ) {
          puppyDetails.weight = puppyData.puppyProfileData.weightRange.name;
        }
        if (!puppyDetails.color && puppyData.puppyProfileData.color) {
          puppyDetails.color = puppyData.puppyProfileData.color;
        }
        if (!puppyDetails.variety && puppyData.puppyProfileData.variety) {
          puppyDetails.variety = puppyData.puppyProfileData.variety;
        }
        if (!puppyDetails.birthDate && puppyData.puppyProfileData.birthDate) {
          puppyDetails.birthDate = puppyData.puppyProfileData.birthDate;
        }
        if (
          !puppyDetails.readyToGoHome &&
          puppyData.puppyProfileData.dateAvailable
        ) {
          puppyDetails.readyToGoHome = puppyData.puppyProfileData.dateAvailable;
        }

        puppyDetails.details = {
          birthday:
            puppyDetails.birthDate ||
            puppyData.puppyProfileData.birthDate ||
            "",
          weight:
            puppyDetails.weight ||
            puppyData.puppyProfileData.weightRange?.name ||
            "",
          color: puppyDetails.color || puppyData.puppyProfileData.color || "",
          variety:
            puppyDetails.variety || puppyData.puppyProfileData.variety || "",
          microchipped: puppyData.puppyProfileData.microchipRfid || "",
          breederName: puppyData.puppyProfileData.breederName || "",
          price: puppyData.puppyProfileData.price || "",
          availableDate:
            puppyDetails.readyToGoHome ||
            puppyData.puppyProfileData.dateAvailable ||
            "",
        };
      }

      // Extract parents data as fallback if not already set
      if (puppyData.parentsData && !puppyDetails.parents) {
        puppyDetails.parents = {
          mom: {
            name: puppyData.parentsData.dam?.name || "",
            breed: puppyData.parentsData.dam?.breed || "",
            weight: puppyData.parentsData.dam?.weight || "",
            color: puppyData.parentsData.dam?.color || "",
            registration: puppyData.parentsData.dam?.registry?.name || "",
            image: puppyData.momImage || puppyData.parentsData.dam?.image || "",
          },
          dad: {
            name: puppyData.parentsData.sire?.name || "",
            breed: puppyData.parentsData.sire?.breed || "",
            weight: puppyData.parentsData.sire?.weight || "",
            color: puppyData.parentsData.sire?.color || "",
            registration: puppyData.parentsData.sire?.registry?.name || "",
            image:
              puppyData.dadImage || puppyData.parentsData.sire?.image || "",
          },
        };
      }

      // Extract siblings data
      if (puppyData.siblingsData) {
        puppyDetails.siblings =
          puppyData.siblingsData.list?.map((sibling) => ({
            name: sibling.name || "",
            gender: sibling.gender || "",
            breed: sibling.breed || "",
            color: sibling.color || "",
          })) || [];
      }

      // Extract video data using the VideoExtractor module
      const videoExtractor = new VideoExtractor();
      const extractedVideos = await videoExtractor.extractVideosComplete(
        this.page,
        puppyDetails.name || "unknown"
      );

      if (extractedVideos && extractedVideos.length > 0) {
        // Add playable video URLs to the extracted videos
        const videosWithUrls = VideoUrlHelper.addVideoUrls(extractedVideos);
        puppyDetails.videos = videosWithUrls;
        puppyDetails.hasVideos = true;
        console.log(
          `✅ Successfully extracted ${extractedVideos.length} videos with playable URLs`
        );
      } else {
        puppyDetails.hasVideos = false;
        puppyDetails.videos = [];
        console.log(`❌ No videos found using VideoExtractor`);
      }

      // Clean up the data
      Object.keys(puppyDetails).forEach((key) => {
        if (typeof puppyDetails[key] === "string") {
          puppyDetails[key] = puppyDetails[key].replace(/\s+/g, " ").trim();
        }
      });

      console.log(`Scraped puppy details for: ${puppyDetails.name}`);
      return puppyDetails;
    } catch (error) {
      console.error(`Error scraping puppy details from ${url}:`, error);
      return null;
    }
  }

  async scrapeMultiplePuppies(puppyUrls) {
    const allPuppyDetails = [];

    for (const url of puppyUrls) {
      const details = await this.scrapePuppyDetails(url);
      if (details) {
        allPuppyDetails.push(details);
      }

      // Be respectful - add delay between requests
      await this.delay(3000);
    }

    return allPuppyDetails;
  }

  // New method: Complete workflow - get listings then details
  async scrapeAllPuppiesWithDetails(url, limit = 5) {
    try {
      console.log(`🐕 Starting complete PuppySpot scraping workflow...`);
      console.log(`📋 Step 1: Getting puppy listings from: ${url}`);
      console.log(`🎯 Limit: ${limit} puppies`);

      // Step 1: Get all puppy listings and URLs
      const puppyListings = await this.scrapeBreedCollections(url);

      if (puppyListings.length === 0) {
        console.log("❌ No puppy listings found");
        return [];
      }

      console.log(`✅ Found ${puppyListings.length} total puppy listings`);
      console.log(
        `🔍 Step 2: Extracting detailed information for each puppy...`
      );

      // Step 2: Extract URLs from listings and apply limit
      const puppyUrls = puppyListings
        .map((puppy) => puppy.url)
        .filter((url) => url && url.includes("puppyspot.com"))
        .slice(0, limit); // Apply limit here

      console.log(
        `📋 Step 3: Scraping details for ${puppyUrls.length} puppies (limited to ${limit})...`
      );

      // Step 3: Get detailed information for each puppy
      const allPuppyDetails = [];

      for (let i = 0; i < puppyUrls.length; i++) {
        const puppyUrl = puppyUrls[i];
        console.log(
          `\n🔍 Scraping puppy ${i + 1}/${puppyUrls.length}: ${puppyUrl}`
        );

        const details = await this.scrapePuppyDetails(puppyUrl);
        if (details) {
          // Add the listing data to the details
          const listingData = puppyListings.find(
            (listing) => listing.url === puppyUrl
          );
          if (listingData) {
            details.listingData = {
              id: listingData.id,
              hasVideo: listingData.hasVideo,
              scrapedAt: listingData.scrapedAt,
            };
          }
          allPuppyDetails.push(details);
          console.log(`✅ Successfully scraped: ${details.name}`);
        } else {
          console.log(`❌ Failed to scrape: ${puppyUrl}`);
        }

        // Be respectful - add delay between requests
        if (i < puppyUrls.length - 1) {
          console.log(`⏳ Waiting 3 seconds before next request...`);
          await this.delay(3000);
        }
      }

      console.log(
        `\n🎉 Complete! Successfully scraped ${allPuppyDetails.length} puppies with full details`
      );
      return allPuppyDetails;
    } catch (error) {
      console.error("❌ Error in complete scraping workflow:", error);
      return [];
    }
  }

  async saveDebugHtml(html, filename) {
    try {
      const outputPath = path.join(process.cwd(), "debug", filename);
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, html);
      console.log(`Debug HTML saved to: ${outputPath}`);
      return outputPath;
    } catch (error) {
      console.error("Error saving debug HTML:", error);
    }
  }

  async saveToFile(data, filename = "puppyspot_data.json") {
    try {
      const outputPath = path.join(process.cwd(), "data", filename);
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, JSON.stringify(data, null, 2));
      console.log(`Data saved to: ${outputPath}`);
      return outputPath;
    } catch (error) {
      console.error("Error saving data:", error);
      throw error;
    }
  }

  async saveToCSV(data, filename = "puppyspot_data.csv") {
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
      console.log("PuppySpot Scraper closed");
    }
  }
}

// PuppySpot specific configurations
const puppySpotConfigs = {
  breedCollections: {
    url: "https://www.puppyspot.com/breed/collections/active-dogs",
    selectors: {
      breedCard: '[data-testid="breed-card"], .breed-card, .breed-item',
      breedName: '[data-testid="breed-name"], .breed-name, h3, h4',
      breedImage: "img",
      breedDescription:
        '[data-testid="breed-description"], .breed-description, p',
      puppyCount: '[data-testid="puppy-count"], .puppy-count, .count',
      breedLink: "a",
    },
  },
  puppyDetails: {
    selectors: {
      name: '[data-testid="puppy-name"], .puppy-name, h1',
      breed: '[data-testid="puppy-breed"], .puppy-breed, .breed',
      price: '[data-testid="puppy-price"], .puppy-price, .price',
      age: '[data-testid="puppy-age"], .puppy-age, .age',
      gender: '[data-testid="puppy-gender"], .puppy-gender, .gender',
      location: '[data-testid="puppy-location"], .puppy-location, .location',
      description:
        '[data-testid="puppy-description"], .puppy-description, .description',
      images:
        '[data-testid="puppy-images"] img, .puppy-images img, .gallery img',
      breederName: '[data-testid="breeder-name"], .breeder-name',
      breederLocation: '[data-testid="breeder-location"], .breeder-location',
      breederPhone: '[data-testid="breeder-phone"], .breeder-phone',
      breederEmail: '[data-testid="breeder-email"], .breeder-email',
      vaccinations: '[data-testid="vaccinations"], .vaccinations',
      healthGuarantee: '[data-testid="health-guarantee"], .health-guarantee',
      vetChecked: '[data-testid="vet-checked"], .vet-checked',
      weight: '[data-testid="weight"], .weight',
      color: '[data-testid="color"], .color',
      coat: '[data-testid="coat"], .coat',
      microchipped: '[data-testid="microchipped"], .microchipped',
      dewclaws: '[data-testid="dewclaws"], .dewclaws',
      tail: '[data-testid="tail"], .tail',
    },
  },
};

module.exports = { PuppySpotScraper, puppySpotConfigs };
