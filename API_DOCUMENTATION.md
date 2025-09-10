# E-commerce Products API Documentation

This document describes the API endpoints for loading e-commerce products in the Golden Tag Organization application.

## Base URL
All API endpoints are prefixed with `/api`

## Endpoints

### 1. Get All Products
**GET** `/api/products`

Retrieves a paginated list of products with optional filtering and sorting.

#### Query Parameters
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 12)
- `category` (string, optional): Filter by category
- `subcategory` (string, optional): Filter by subcategory
- `search` (string, optional): Search in product name and description
- `minPrice` (number, optional): Minimum price filter
- `maxPrice` (number, optional): Maximum price filter
- `minRating` (number, optional): Minimum rating filter
- `inStock` (boolean, optional): Filter by stock availability
- `sortBy` (string, optional): Sort field (name, price, rating) (default: name)
- `sortOrder` (string, optional): Sort order (asc, desc) (default: asc)

#### Example Request
```
GET /api/products?page=1&limit=12&category=Electronics&minPrice=1000&maxPrice=50000&sortBy=price&sortOrder=asc
```

#### Response
```json
{
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "category": "Electronics",
      "subcategory": "Mobile",
      "price": 25000,
      "mrp": 30000,
      "description": "Product description",
      "image": "/images/product.jpg",
      "rating": 4.5,
      "ratingCount": 120,
      "inStock": true,
      "offers": ["Free Shipping"],
      "features": ["Feature 1", "Feature 2"],
      "warrantyMonths": 12,
      "guaranteeMonths": 0
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 12,
  "totalPages": 9,
  "categories": ["Electronics", "Clothing", "Footwear"],
  "subcategories": ["Mobile", "Audio", "Tops", "Shoes"]
}
```

### 2. Get Product by ID
**GET** `/api/products/[id]`

Retrieves a specific product by its ID along with related products.

#### Path Parameters
- `id` (number): Product ID

#### Example Request
```
GET /api/products/1
```

#### Response
```json
{
  "product": {
    "id": 1,
    "name": "Product Name",
    "category": "Electronics",
    "subcategory": "Mobile",
    "price": 25000,
    "mrp": 30000,
    "description": "Product description",
    "image": "/images/product.jpg",
    "rating": 4.5,
    "ratingCount": 120,
    "inStock": true,
    "offers": ["Free Shipping"],
    "features": ["Feature 1", "Feature 2"],
    "warrantyMonths": 12,
    "guaranteeMonths": 0
  },
  "relatedProducts": [
    {
      "id": 2,
      "name": "Related Product",
      "price": 20000,
      "image": "/images/related.jpg",
      "rating": 4.2
    }
  ]
}
```

### 3. Get Categories
**GET** `/api/categories`

Retrieves all available categories and subcategories with product counts.

#### Example Request
```
GET /api/categories
```

#### Response
```json
{
  "categories": [
    {
      "name": "Electronics",
      "subcategories": ["Mobile", "Audio", "Computers"],
      "productCount": 25
    },
    {
      "name": "Clothing",
      "subcategories": ["Men's Tops", "Women's Tops"],
      "productCount": 15
    }
  ],
  "totalCategories": 2,
  "totalSubcategories": 5
}
```

## Usage in Frontend

### Using the ProductAPI Service

```typescript
import { productAPI } from '@/lib/api';

// Get all products with pagination
const response = await productAPI.fetchAllProducts({
  page: 1,
  limit: 12,
  category: 'Electronics',
  search: 'phone',
  sortBy: 'price',
  sortOrder: 'asc'
});

// Get specific product
const productResponse = await productAPI.fetchProductById(1);
const product = productResponse.product;
const relatedProducts = productResponse.relatedProducts;

// Get categories
const categoriesResponse = await productAPI.fetchCategories();
const categories = categoriesResponse.categories;
```

### Direct API Calls

```typescript
// Using fetch directly
const response = await fetch('/api/products?category=Electronics&page=1&limit=12');
const data = await response.json();
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200`: Success
- `400`: Bad Request (invalid parameters)
- `404`: Not Found (product not found)
- `500`: Internal Server Error

Error responses include a message:
```json
{
  "error": "Error message describing what went wrong"
}
```

## Caching

API responses include cache headers for optimal performance:
- Products API: 5 minutes cache with stale-while-revalidate
- Categories API: 1 hour cache with stale-while-revalidate

## Demo Page

Visit `/api-demo` to see a live demonstration of the API functionality with filtering, pagination, and search capabilities.

## Data Source

The API currently serves data from the local `src/data/products.js` file, which contains a comprehensive catalog of products across multiple categories including Electronics, Clothing, Footwear, Home Decor, and Beauty products.
