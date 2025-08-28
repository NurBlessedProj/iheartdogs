import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
      enum: ["user", "admin"],
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
    preferences: {
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
        marketing: { type: Boolean, default: true },
      },
      favoriteBreeds: [{ type: String }],
    },
    // Purchase tracking
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
          enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
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
          enum: ["pending", "paid", "failed", "refunded"],
          default: "pending",
        },
        notes: String,
      },
    ],
    // Wishlist
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ "purchaseHistory.status": 1 });
userSchema.index({ createdAt: -1 });

// Instance method to check password (direct comparison since no hashing)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return candidatePassword === this.password;
};

// Instance method to get full name
userSchema.methods.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

// Instance method to get purchase count
userSchema.methods.getPurchaseCount = function () {
  return this.purchaseHistory.length;
};

// Instance method to get total spent
userSchema.methods.getTotalSpent = function () {
  return this.purchaseHistory
    .filter((purchase) => purchase.paymentStatus === "paid")
    .reduce((total, purchase) => {
      const price = parseInt(purchase.price.replace(/[^0-9]/g, "")) || 0;
      return total + price;
    }, 0);
};

// Static method to find users by role
userSchema.statics.findByRole = function (role) {
  return this.find({ role });
};

// Static method to get user statistics
userSchema.statics.getUserStats = function () {
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
      },
    },
  ]);
};

const PetUsers = mongoose.models.PetUsers || mongoose.model("PetUsers", userSchema);

export default PetUsers;
