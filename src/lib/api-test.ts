// src/lib/api-test.ts
// Simple test to verify API integration

import { productAPI } from './api';

export async function testAPI() {
  try {
    console.log('Testing FakeStore API integration...');
    
    // Test fetching all products
    const products = await productAPI.fetchAllProducts();
    console.log(`✅ Successfully fetched ${products.length} products`);
    console.log('Sample product:', products[0]);
    
    // Test fetching a specific product
    const product = await productAPI.fetchProductById(1);
    console.log('✅ Successfully fetched product by ID:', product.name);
    
    // Test fetching categories
    const categories = await productAPI.fetchCategories();
    console.log('✅ Successfully fetched categories:', categories);
    
    return true;
  } catch (error) {
    console.error('❌ API test failed:', error);
    return false;
  }
}

// Run test if this file is executed directly
if (typeof window !== 'undefined') {
  testAPI();
}
