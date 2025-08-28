/**
 * Video Extraction Module for PuppySpot
 * This module handles the extraction of video data from PuppySpot puppy detail pages
 */

class VideoExtractor {
  constructor() {
    this.debugMode = true;
  }

  /**
   * Extract video data from a PuppySpot puppy detail page
   * @param {Object} page - Puppeteer page object
   * @param {string} puppyId - The puppy ID for debugging
   * @returns {Array} Array of video objects with complete data
   */
  async extractVideos(page, puppyId = "unknown") {
    try {
      console.log(
        `[VideoExtractor] Starting video extraction for puppy ${puppyId}...`
      );

      const videoData = await page.evaluate((puppyId) => {
        console.log(`[VideoExtractor] Evaluating page for puppy ${puppyId}...`);

        // Method 1: Try to get videos from preact_PhotoGallery
        try {
          if (window.preact_PhotoGallery && window.preact_PhotoGallery.videos) {
            console.log(
              `[VideoExtractor] Found videos in preact_PhotoGallery:`,
              window.preact_PhotoGallery.videos
            );
            return window.preact_PhotoGallery.videos;
          }
        } catch (error) {
          console.log(
            `[VideoExtractor] Error accessing preact_PhotoGallery:`,
            error.message
          );
        }

        // Method 2: Scan all scripts for video data
        const scripts = document.querySelectorAll("script");
        for (let script of scripts) {
          const scriptContent = script.textContent || script.innerHTML;
          if (scriptContent.includes('"videos":')) {
            console.log(`[VideoExtractor] Found script with videos data`);

            // Try to extract video array using regex
            const videoMatch = scriptContent.match(/"videos":\s*\[(.*?)\]/s);
            if (videoMatch) {
              try {
                const videoArrayContent = videoMatch[1];
                console.log(
                  `[VideoExtractor] Found video array content:`,
                  videoArrayContent.substring(0, 200) + "..."
                );

                // Parse the video array
                const videos = JSON.parse(`[${videoArrayContent}]`);
                console.log(
                  `[VideoExtractor] Successfully parsed ${videos.length} videos`
                );
                return videos;
              } catch (parseError) {
                console.log(
                  `[VideoExtractor] Failed to parse video array:`,
                  parseError.message
                );
              }
            }
          }
        }

        // Method 3: Look for individual video objects
        for (let script of scripts) {
          const scriptContent = script.textContent || script.innerHTML;
          if (scriptContent.includes('"videos":')) {
            console.log(
              `[VideoExtractor] Found script with videos, trying individual extraction`
            );

            // Find all video objects in the script
            const videoObjects = [];
            let startIndex = 0;

            while (true) {
              const videoStart = scriptContent.indexOf(
                '"videos":[',
                startIndex
              );
              if (videoStart === -1) break;

              // Find the start of the first video object
              const objectStart = scriptContent.indexOf("{", videoStart);
              if (objectStart === -1) break;

              // Use brace counting to find the complete video object
              let braceCount = 0;
              let videoEnd = objectStart;
              let inString = false;
              let escapeNext = false;

              for (let i = objectStart; i < scriptContent.length; i++) {
                const char = scriptContent[i];
                if (escapeNext) {
                  escapeNext = false;
                  continue;
                }
                if (char === "\\") {
                  escapeNext = true;
                  continue;
                }
                if (char === '"' && !escapeNext) {
                  inString = !inString;
                  continue;
                }
                if (!inString) {
                  if (char === "{") {
                    braceCount++;
                  } else if (char === "}") {
                    braceCount--;
                    if (braceCount === 0) {
                      videoEnd = i + 1;
                      break;
                    }
                  }
                }
              }

              if (videoEnd > objectStart) {
                const videoObjectContent = scriptContent.substring(
                  objectStart,
                  videoEnd
                );
                try {
                  const video = JSON.parse(videoObjectContent);
                  videoObjects.push(video);
                  console.log(
                    `[VideoExtractor] Successfully parsed video object:`,
                    video.name || video.id
                  );
                } catch (parseError) {
                  console.log(
                    `[VideoExtractor] Failed to parse video object:`,
                    parseError.message
                  );
                }
              }

              startIndex = videoEnd;
            }

            if (videoObjects.length > 0) {
              console.log(
                `[VideoExtractor] Successfully extracted ${videoObjects.length} video objects`
              );
              return videoObjects;
            }
          }
        }

        console.log(`[VideoExtractor] No videos found using any method`);
        return [];
      }, puppyId);

      if (videoData && videoData.length > 0) {
        console.log(
          `[VideoExtractor] Successfully extracted ${videoData.length} videos`
        );
        return videoData;
      } else {
        console.log(`[VideoExtractor] No videos found`);
        return [];
      }
    } catch (error) {
      console.error(`[VideoExtractor] Error extracting videos:`, error.message);
      return [];
    }
  }

  /**
   * Validate video data to ensure it's usable
   * @param {Array} videos - Array of video objects
   * @returns {Array} Filtered array of valid videos
   */
  validateVideos(videos) {
    if (!Array.isArray(videos)) {
      console.log(`[VideoExtractor] Videos is not an array:`, typeof videos);
      return [];
    }

    const validVideos = videos.filter((video) => {
      if (!video || typeof video !== "object") {
        console.log(`[VideoExtractor] Invalid video object:`, video);
        return false;
      }

      // Check for required fields
      const hasValidUrl =
        video.filePath || video.dataUrl || video.url || video.player;
      const hasValidId = video.id || video.name;

      if (!hasValidUrl) {
        console.log(`[VideoExtractor] Video missing valid URL:`, video);
        return false;
      }

      if (!hasValidId) {
        console.log(`[VideoExtractor] Video missing ID:`, video);
        return false;
      }

      return true;
    });

    console.log(
      `[VideoExtractor] Validated ${validVideos.length} out of ${videos.length} videos`
    );
    return validVideos;
  }

  /**
   * Format video data for consistent output
   * @param {Array} videos - Array of video objects
   * @returns {Array} Formatted video objects
   */
  formatVideos(videos) {
    return videos.map((video) => ({
      id: video.id || null,
      name: video.name || null,
      filePath: video.filePath || video.dataUrl || video.url || null,
      player: video.player || null,
      thumbnail: video.thumbnail || null,
      cloudflareUid: video.cloudflareUid || null,
      duration: video.duration || null,
      size: video.size || null,
    }));
  }

  /**
   * Main method to extract, validate, and format videos
   * @param {Object} page - Puppeteer page object
   * @param {string} puppyId - The puppy ID for debugging
   * @returns {Array} Formatted array of valid video objects
   */
  async extractVideosComplete(page, puppyId = "unknown") {
    console.log(
      `[VideoExtractor] Starting complete video extraction for puppy ${puppyId}...`
    );

    const rawVideos = await this.extractVideos(page, puppyId);
    const validVideos = this.validateVideos(rawVideos);
    const formattedVideos = this.formatVideos(validVideos);

    console.log(`[VideoExtractor] Complete extraction result:`, {
      rawCount: rawVideos.length,
      validCount: validVideos.length,
      formattedCount: formattedVideos.length,
    });

    return formattedVideos;
  }
}

module.exports = VideoExtractor;
