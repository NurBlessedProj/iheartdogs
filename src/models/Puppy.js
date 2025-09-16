import mongoose from "mongoose";

const parentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  weight: { type: String },
  color: { type: String },
  registration: { type: String },
  image: { type: String },
});

const breederSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usdaNumber: { type: String },
  startingYear: { type: Number },
  description: { type: String },
});

const videoSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  filePath: { type: String },
  player: { type: String },
  thumbnail: { type: String },
  cloudflareUid: { type: String },
  duration: { type: String },
  size: { type: String },
  playableUrls: {
    hls: { type: String },
    direct: { type: String },
    download: { type: String },
    directMp4: { type: String },
    cloudflareUid: { type: String },
  },
});

const puppySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    breed: { type: String, required: true, index: true },
    age: { type: String, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female"] },
    price: { type: String, required: true },
    images: [{ type: String }],
    location: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    scrapedAt: { type: Date, default: Date.now },
    description: { type: String },
    birthDate: { type: String },
    readyToGoHome: { type: String },
    weight: { type: String },
    color: { type: String },
    variety: { type: String },
    parents: {
      mom: parentSchema,
      dad: parentSchema,
    },
    breeder: breederSchema,
    videos: [videoSchema],
    hasVideos: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
puppySchema.index({ breed: 1, gender: 1 });
puppySchema.index({ location: 1 });
puppySchema.index({ price: 1 });
puppySchema.index({ variety: 1 });
puppySchema.index({ color: 1 });

// Virtual for price as number (for sorting)
puppySchema.virtual("priceNumber").get(function () {
  if (!this.price) return 0;
  return parseInt(this.price.replace(/[^0-9]/g, ""));
});

// Static method to get all unique breeds
puppySchema.statics.getBreeds = function () {
  return this.distinct("breed").sort();
};

// Static method to get all unique varieties
puppySchema.statics.getVarieties = function () {
  return this.distinct("variety").sort();
};

// Static method to get all unique colors
puppySchema.statics.getColors = function () {
  return this.distinct("color").sort();
};

// Static method to get all unique locations
puppySchema.statics.getLocations = function () {
  return this.distinct("location").sort();
};

// Static method to get categories (breeds with counts)
puppySchema.statics.getCategories = async function () {
  // Get all puppies and process in JavaScript to avoid MongoDB aggregation issues
  const puppies = await this.find({}).select("breed price").lean();

  // Group by breed
  const breedGroups = {};
  puppies.forEach((puppy) => {
    if (!breedGroups[puppy.breed]) {
      breedGroups[puppy.breed] = {
        breed: puppy.breed,
        count: 0,
        prices: [],
      };
    }
    breedGroups[puppy.breed].count++;
    breedGroups[puppy.breed].prices.push(puppy.price);
  });

  // Convert to array and sort by count
  return Object.values(breedGroups).sort((a, b) => b.count - a.count);
};

const Puppy =
  mongoose.models.Puppy ||
  mongoose.model("Puppy", puppySchema, "secondpuppies");

export default Puppy;
