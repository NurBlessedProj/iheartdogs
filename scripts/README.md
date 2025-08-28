# Database Scripts

This directory contains utility scripts for managing the pet database.

## Scripts

### adjust-prices.js

This script adjusts the prices of all pets in the database to be within a specified range.

**Purpose:**

- Updates pet prices from high values (around $3000) to a more reasonable range ($800-$1200)
- Ensures consistent pricing across all pets
- Provides detailed analysis of price changes

**Features:**

- ✅ Connects to MongoDB using environment variables
- ✅ Analyzes current price distribution
- ✅ Updates all pet prices to random values between $800-$1200
- ✅ Provides detailed progress logging
- ✅ Verifies changes after completion
- ✅ Shows price distribution analysis
- ✅ Displays sample updated pets

**Usage:**

```bash
# Using npm script (recommended)
npm run adjust-prices

# Or directly with node
node scripts/adjust-prices.js
```

**What the script does:**

1. **Connects to Database:** Uses the MONGO environment variable or fallback connection string
2. **Analyzes Current Prices:** Shows current price range and average
3. **Updates Prices:** Sets each pet's price to a random value between $800-$1200
4. **Verifies Changes:** Confirms the new price range and distribution
5. **Provides Report:** Shows sample updated pets and price distribution

**Output Example:**

```
🚀 Starting price adjustment script...
🔌 Connecting to MongoDB...
✅ Connected to MongoDB successfully!
📊 Fetching all puppies from database...
📈 Found 150 puppies in database

📊 Analyzing current prices...
💰 Current price range: $2500 - $3500
💰 Average current price: $2950

🎯 Target price range: $800 - $1200

🔄 Updating prices...
   Updated 10/150 puppies...
   Updated 20/150 puppies...
   ...
✅ Successfully updated 150 puppies
⏭️  Skipped 0 puppies

🔍 Verifying price changes...
💰 New price range: $800 - $1200
💰 New average price: $1005

📋 Sample updated puppies:
   1. Max (Golden Retriever) - $950
   2. Bella (Labrador) - $1,150
   3. Charlie (German Shepherd) - $875
   4. Luna (Husky) - $1,025
   5. Rocky (Bulldog) - $1,100

📊 Price distribution:
   $800-$900: 38 puppies (25.3%)
   $901-$1000: 42 puppies (28.0%)
   $1001-$1100: 35 puppies (23.3%)
   $1101-$1200: 35 puppies (23.3%)

🎉 Price adjustment completed successfully!
🔌 MongoDB connection closed
```

**Environment Variables:**

- `MONGO`: MongoDB connection string (optional, has fallback)

**Safety Features:**

- ✅ Progress logging every 10 updates
- ✅ Error handling with detailed messages
- ✅ Verification of changes after completion
- ✅ Graceful database connection closure

**Note:** This script will permanently update all pet prices in your database. Make sure to backup your data before running if needed.
