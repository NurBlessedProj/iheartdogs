/**
 * Video URL Helper - Utilities for constructing playable video URLs
 * This module can be imported into the main scraper to automatically generate video URLs
 */

/**
 * Construct playable video URLs from extracted video data
 * @param {Object} videoData - The video object extracted from PuppySpot
 * @returns {Object} Object containing different video URL formats
 */
function constructVideoUrl(videoData) {
  if (!videoData || !videoData.filePath) {
    return null;
  }

  // For Cloudflare videos (which PuppySpot uses)
  if (videoData.player === "cloudflare") {
    return {
      hls: `https://videodelivery.net/${videoData.filePath}/manifest/video.m3u8`,
      direct: `https://videodelivery.net/${videoData.filePath}/video`,
      download: `https://videodelivery.net/${videoData.filePath}/downloads/default.mp4`,
      directMp4: `https://videodelivery.net/${videoData.filePath}/downloads/default.mp4`, // This redirects to direct MP4
      cloudflareUid: videoData.filePath,
    };
  }

  // For other video players
  if (videoData.dataUrl) {
    return {
      direct: videoData.dataUrl,
      directMp4: videoData.dataUrl,
      type: "data-url",
    };
  }

  return null;
}

/**
 * Add playable URLs to video data
 * @param {Array} videos - Array of video objects from scraper
 * @returns {Array} Videos with added playable URLs
 */
function addVideoUrls(videos) {
  if (!Array.isArray(videos)) {
    return [];
  }

  return videos.map((video) => {
    const urls = constructVideoUrl(video);
    return {
      ...video,
      playableUrls: urls,
    };
  });
}

/**
 * Generate a simple HTML video player for a video
 * @param {Object} videoData - Video object with playableUrls
 * @returns {string} HTML code for video player
 */
function generateVideoPlayerHtml(videoData) {
  if (!videoData || !videoData.playableUrls) {
    return "<p>No video data available</p>";
  }

  const { directMp4, hls, download } = videoData.playableUrls;

  return `
<div class="video-player">
  <video controls width="100%" style="max-width: 600px;" preload="metadata">
    <source src="${directMp4}" type="video/mp4">
    <source src="${hls}" type="application/x-mpegURL">
    Your browser does not support the video tag.
  </video>
  
  <div style="margin-top: 10px;">
    <p><strong>Video URLs:</strong></p>
    <ul>
      <li><strong>Direct MP4 (for video tags):</strong> <a href="${directMp4}" target="_blank">${directMp4}</a></li>
      <li><strong>HLS Stream:</strong> <a href="${hls}" target="_blank">${hls}</a></li>
      <li><strong>Download:</strong> <a href="${download}" target="_blank">${download}</a></li>
    </ul>
  </div>
  
  <p><small>Video: ${videoData.name || "Unknown"}</small></p>
</div>`;
}

/**
 * Generate a complete HTML page for viewing a puppy's videos
 * @param {Object} puppyData - Puppy data with videos array
 * @returns {string} Complete HTML page
 */
function generatePuppyVideoPage(puppyData) {
  if (!puppyData.videos || puppyData.videos.length === 0) {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>${puppyData.name || "Puppy"} - No Videos</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>${puppyData.name || "Puppy"}</h1>
        <p>No videos available for this puppy.</p>
        <a href="javascript:history.back()">← Go Back</a>
    </div>
</body>
</html>`;
  }

  const videosWithUrls = addVideoUrls(puppyData.videos);
  const videoPlayers = videosWithUrls
    .map((video) => generateVideoPlayerHtml(video))
    .join("\n");

  return `
<!DOCTYPE html>
<html>
<head>
    <title>${puppyData.name || "Puppy"} - Videos</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            background: #f5f5f5; 
        }
        .container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white; 
            padding: 20px; 
            border-radius: 10px; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
        }
        .video-player { 
            margin-bottom: 30px; 
            padding: 15px; 
            border: 1px solid #ddd; 
            border-radius: 8px; 
        }
        .puppy-info { 
            background: #f8f9fa; 
            padding: 15px; 
            border-radius: 8px; 
            margin-bottom: 20px; 
        }
        .back-link { 
            margin-top: 20px; 
        }
        .back-link a { 
            color: #007bff; 
            text-decoration: none; 
        }
        .back-link a:hover { 
            text-decoration: underline; 
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎥 ${puppyData.name || "Puppy"} Videos</h1>
        
        <div class="puppy-info">
            <h3>Puppy Information:</h3>
            <p><strong>Breed:</strong> ${puppyData.breed || "N/A"}</p>
            <p><strong>Age:</strong> ${puppyData.age || "N/A"}</p>
            <p><strong>Gender:</strong> ${puppyData.gender || "N/A"}</p>
            <p><strong>Price:</strong> ${puppyData.price || "N/A"}</p>
            <p><strong>Total Videos:</strong> ${puppyData.videos.length}</p>
        </div>
        
        <h2>Videos (${puppyData.videos.length})</h2>
        ${videoPlayers}
        
        <div class="back-link">
            <a href="javascript:history.back()">← Go Back</a>
        </div>
    </div>
</body>
</html>`;
}

module.exports = {
  constructVideoUrl,
  addVideoUrls,
  generateVideoPlayerHtml,
  generatePuppyVideoPage,
};
