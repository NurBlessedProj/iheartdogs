# Puppy Data Setup Guide

This guide explains how to set up and use the new MongoDB-based puppy data system.

## 🗄️ Database Schema

The new system uses a comprehensive MongoDB schema (`src/models/Puppy.js`) that includes:

### Main Fields:

- **name**: Puppy's name
- **breed**: Dog breed (indexed for fast queries)
- **age**: Age in weeks/months
- **gender**: Male/Female
- **price**: Price as string (e.g., "$2549")
- **images**: Array of image URLs
- **location**: State/location
- **url**: Original listing URL
- **description**: Puppy description
- **birthDate**: Birth date
- **readyToGoHome**: When puppy is ready
- **weight**: Weight range
- **color**: Coat color
- **variety**: Breed variety (e.g., "Miniature F1B")

### Nested Objects:

- **parents**: Mom and dad information
- **breeder**: Breeder details
- **videos**: Video information with playable URLs

## 🚀 Setup Instructions

### 1. Import Data into MongoDB

Run the import script to load the JSON data into MongoDB:

```bash
npm run import-puppies
```

This will:

- Connect to your MongoDB database
- Clear existing puppy data
- Import all puppies from the JSON file
- Display statistics about the import

### 2. API Endpoints

The system provides several API endpoints:

#### Get Puppies with Filtering

```
GET /api/puppies?page=1&limit=12&breed=Goldendoodle&gender=Male&location=Ohio&minPrice=2000&maxPrice=4000
```

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 12)
- `breed`: Filter by breed
- `gender`: Filter by gender (Male/Female)
- `location`: Filter by location
- `variety`: Filter by variety
- `color`: Filter by color
- `minPrice`: Minimum price
- `maxPrice`: Maximum price
- `sortBy`: Sort field (createdAt, price, etc.)
- `sortOrder`: asc/desc

#### Get Categories and Filters

```
GET /api/categories
```

Returns:

- Categories (breeds with counts)
- Available filter options
- Price range statistics

#### Import Data (Admin)

```
POST /api/import-puppies
```

Imports data from the JSON file (clears existing data first)

## 🎯 Features

### Category Filtering

The available puppies page now includes:

- **Breed Categories**: Click any breed to filter
- **Advanced Filters**: Gender, location, price range
- **Real-time Search**: Instant filtering
- **Pagination**: Navigate through results

### Data Structure Benefits

- **Fast Queries**: Indexed fields for quick searches
- **Flexible Filtering**: Multiple filter combinations
- **Rich Data**: Complete puppy information
- **Scalable**: Handles large datasets efficiently

## 📊 Available Categories

The system automatically extracts categories from your data:

### Breeds Found:

- Goldendoodle
- Golden Retriever
- Cavapoo
- Bernedoodle
- Poodle
- And more...

### Locations:

- Ohio
- Indiana
- Michigan
- And more...

### Varieties:

- Miniature F1B
- American
- Standard
- And more...

## 🔧 Customization

### Adding New Filters

To add new filter options, update the API routes:

1. **Add to schema**: Update `src/models/Puppy.js`
2. **Update API**: Modify `/api/puppies/route.js`
3. **Update UI**: Modify the available puppies page

### Styling

The system uses Tailwind CSS classes and matches your blue color scheme:

- Primary: `blue-600`
- Hover: `blue-700`
- Background: `blue-50`

## 🐛 Troubleshooting

### Common Issues:

1. **Import Fails**: Check MongoDB connection string
2. **No Data**: Ensure JSON file exists in root directory
3. **API Errors**: Check MongoDB connection and schema

### Debug Commands:

```bash
# Check MongoDB connection
npm run import-puppies

# View API responses
curl http://localhost:3000/api/categories
curl http://localhost:3000/api/puppies
```

## 📈 Performance

The schema includes optimized indexes for:

- Breed queries
- Gender filtering
- Location searches
- Price sorting
- Variety filtering

This ensures fast performance even with thousands of puppies.

## 🔄 Data Updates

To update the puppy data:

1. Replace the JSON file
2. Run `npm run import-puppies`
3. The system will clear and reload all data

The import process is safe and will not affect existing orders or user data.
