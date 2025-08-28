import mongoose from "mongoose";

const newUserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Don't include password in queries by default
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"],
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zipCode: { type: String, trim: true },
      country: { type: String, trim: true, default: "United States" },
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"], // Added moderator role
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    lastLogin: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
    // Enhanced preferences for new site
    preferences: {
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
        marketing: { type: Boolean, default: true },
        push: { type: Boolean, default: false }, // Added push notifications
      },
      favoriteBreeds: [{ type: String }],
      preferredContactMethod: {
        type: String,
        enum: ["email", "phone", "sms"],
        default: "email",
      },
      timezone: { type: String, default: "America/New_York" },
    },
    // Enhanced profile information
    profile: {
      bio: {
        type: String,
        maxlength: [500, "Bio cannot exceed 500 characters"],
      },
      avatar: { type: String },
      dateOfBirth: { type: Date },
      occupation: { type: String },
      interests: [{ type: String }],
    },
    // Enhanced purchase tracking
    purchaseHistory: [
      {
        puppyId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Puppy",
        },
        puppyName: String,
        breed: String,
        price: String,
        purchaseDate: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: [
            "pending",
            "confirmed",
            "shipped",
            "delivered",
            "cancelled",
            "returned",
          ],
          default: "pending",
        },
        trackingNumber: String,
        shippingAddress: {
          street: String,
          city: String,
          state: String,
          zipCode: String,
          country: String,
        },
        paymentMethod: String,
        paymentStatus: {
          type: String,
          enum: ["pending", "paid", "failed", "refunded", "partial"],
          default: "pending",
        },
        notes: String,
        // Added new fields
        estimatedDelivery: Date,
        actualDelivery: Date,
        satisfactionRating: {
          type: Number,
          min: 1,
          max: 5,
        },
        review: String,
      },
    ],
    // Enhanced wishlist with more features
    wishlist: [
      {
        puppyId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Puppy",
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
        priority: {
          type: String,
          enum: ["low", "medium", "high"],
          default: "medium",
        },
        notes: String,
      },
    ],
    // New features for enhanced user experience
    savedSearches: [
      {
        name: String,
        filters: {
          breed: [String],
          priceRange: {
            min: Number,
            max: Number,
          },
          location: String,
          gender: String,
          age: String,
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    // User activity tracking
    activity: {
      lastActive: { type: Date, default: Date.now },
      loginCount: { type: Number, default: 0 },
      pageViews: { type: Number, default: 0 },
      favoriteActions: [{ type: String }],
    },
    // Social features
    social: {
      followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "NewUser" }],
      following: [{ type: mongoose.Schema.Types.ObjectId, ref: "NewUser" }],
      reviews: [
        {
          puppyId: { type: mongoose.Schema.Types.ObjectId, ref: "Puppy" },
          rating: { type: Number, min: 1, max: 5 },
          comment: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
newUserSchema.index({ email: 1 });
newUserSchema.index({ role: 1 });
newUserSchema.index({ "purchaseHistory.status": 1 });
newUserSchema.index({ createdAt: -1 });
newUserSchema.index({ "activity.lastActive": -1 });
newUserSchema.index({ "preferences.favoriteBreeds": 1 });

// Instance method to check password (direct comparison since no hashing)
newUserSchema.methods.comparePassword = async function (candidatePassword) {
  return candidatePassword === this.password;
};

// Instance method to get full name
newUserSchema.methods.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

// Instance method to get purchase count
newUserSchema.methods.getPurchaseCount = function () {
  return this.purchaseHistory.length;
};

// Instance method to get total spent
newUserSchema.methods.getTotalSpent = function () {
  return this.purchaseHistory
    .filter((purchase) => purchase.paymentStatus === "paid")
    .reduce((total, purchase) => {
      const price = parseInt(purchase.price.replace(/[^0-9]/g, "")) || 0;
      return total + price;
    }, 0);
};

// New instance method to get average rating
newUserSchema.methods.getAverageRating = function () {
  const reviews = this.social.reviews;
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

// New instance method to get activity score
newUserSchema.methods.getActivityScore = function () {
  const activity = this.activity;
  return (
    activity.loginCount * 0.3 +
    activity.pageViews * 0.1 +
    this.purchaseHistory.length * 2
  );
};

// Static method to find users by role
newUserSchema.statics.findByRole = function (role) {
  return this.find({ role });
};

// Static method to get user statistics
newUserSchema.statics.getUserStats = function () {
  return this.aggregate([
    {
      $group: {
        _id: null,
        totalUsers: { $sum: 1 },
        activeUsers: {
          $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] },
        },
        verifiedUsers: {
          $sum: { $cond: [{ $eq: ["$isEmailVerified", true] }, 1, 0] },
        },
        totalPurchases: {
          $sum: { $size: "$purchaseHistory" },
        },
        averageRating: {
          $avg: {
            $avg: "$social.reviews.rating",
          },
        },
      },
    },
  ]);
};

// Static method to get top users by activity
newUserSchema.statics.getTopUsers = function (limit = 10) {
  return this.find({ isActive: true })
    .sort({ "activity.loginCount": -1, "activity.pageViews": -1 })
    .limit(limit)
    .select("firstName lastName email activity purchaseHistory");
};

// Use a different collection name to separate from old project
const NewUser =
  mongoose.models.NewUser ||
  mongoose.model("NewUser", newUserSchema, "new_users");

export default NewUser;
