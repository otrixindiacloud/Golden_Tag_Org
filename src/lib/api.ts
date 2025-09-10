// src/lib/api.ts

export interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  mrp?: number;
  description: string;
  image: string;
  rating?: number;
  ratingCount?: number;
  inStock?: boolean;
  offers?: string[];
  features?: string[];
  warrantyMonths?: number;
  guaranteeMonths?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  categories: string[];
  subcategories: string[];
}

export interface ProductResponse {
  product: Product;
  relatedProducts: Product[];
}

export interface Category {
  name: string;
  subcategories: string[];
  productCount: number;
}

export interface CategoriesResponse {
  categories: Category[];
  totalCategories: number;
  totalSubcategories: number;
}

// API service class for external products APIs
export class ProductAPI {
  private baseUrl = '/api';
  private dummyJsonUrl = 'https://dummyjson.com/products';
  private fakeStoreUrl = 'https://fakestoreapi.com/products';

  // Transform DummyJSON product to our format
  private transformDummyJsonProduct(product: any): Product {
    return {
      id: product.id,
      name: product.title,
      category: product.category,
      subcategory: product.category, // DummyJSON doesn't have subcategories
      price: Math.round(product.price),
      mrp: product.price ? Math.round(product.price * 1.2) : undefined,
      description: product.description,
      image: product.thumbnail,
      rating: product.rating,
      ratingCount: Math.floor(Math.random() * 1000) + 100, // Generate random rating count
      inStock: product.stock > 0,
      offers: product.discountPercentage ? [`${Math.round(product.discountPercentage)}% off`] : [],
      features: product.images ? [`${product.images.length} images available`] : [],
      warrantyMonths: 12,
      guaranteeMonths: 0
    };
  }

  // Transform Fake Store product to our format
  private transformFakeStoreProduct(product: any): Product {
    return {
      id: product.id + 1000, // Offset to avoid ID conflicts
      name: product.title,
      category: product.category,
      subcategory: product.category, // Fake Store doesn't have subcategories
      price: Math.round(product.price),
      mrp: product.price ? Math.round(product.price * 1.15) : undefined,
      description: product.description,
      image: product.image,
      rating: product.rating?.rate || 0,
      ratingCount: product.rating?.count || 0,
      inStock: true, // Assume all are in stock
      offers: ['Free Shipping'],
      features: ['High Quality'],
      warrantyMonths: 12,
      guaranteeMonths: 0
    };
  }

  async fetchAllProducts(options: {
    page?: number;
    limit?: number;
    category?: string;
    subcategory?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    inStock?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<ProductsResponse> {
    try {
      // Fetch from both APIs in parallel
      const [dummyJsonResponse, fakeStoreResponse] = await Promise.all([
        fetch(this.dummyJsonUrl).then(res => res.json()),
        fetch(this.fakeStoreUrl).then(res => res.json())
      ]);

      // Transform products from both APIs
      const dummyJsonProducts = dummyJsonResponse.products?.map((product: any) => 
        this.transformDummyJsonProduct(product)
      ) || [];
      
      const fakeStoreProducts = Array.isArray(fakeStoreResponse) ? 
        fakeStoreResponse.map((product: any) => this.transformFakeStoreProduct(product)) : [];

      // Combine all products
      let allProducts = [...dummyJsonProducts, ...fakeStoreProducts];

      // Apply filters
      if (options.category && options.category !== 'all') {
        allProducts = allProducts.filter(product => 
          product.category.toLowerCase() === options.category!.toLowerCase()
        );
      }

      if (options.subcategory) {
        allProducts = allProducts.filter(product => 
          product.subcategory.toLowerCase() === options.subcategory!.toLowerCase()
        );
      }

      if (options.search) {
        const searchLower = options.search.toLowerCase();
        allProducts = allProducts.filter(product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
        );
      }

      if (options.minPrice) {
        allProducts = allProducts.filter(product => product.price >= options.minPrice!);
      }

      if (options.maxPrice) {
        allProducts = allProducts.filter(product => product.price <= options.maxPrice!);
      }

      if (options.minRating) {
        allProducts = allProducts.filter(product => 
          (product.rating || 0) >= options.minRating!
        );
      }

      if (options.inStock !== undefined) {
        allProducts = allProducts.filter(product => product.inStock === options.inStock);
      }

      // Apply sorting
      allProducts.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (options.sortBy) {
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'rating':
            aValue = a.rating || 0;
            bValue = b.rating || 0;
            break;
          case 'name':
          default:
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
        }

        if (options.sortOrder === 'desc') {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        } else {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        }
      });

      // Calculate pagination
      const total = allProducts.length;
      const page = options.page || 1;
      const limit = options.limit || 12;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = allProducts.slice(startIndex, endIndex);

      // Get unique categories and subcategories
      const categories = [...new Set(allProducts.map(p => p.category))].sort();
      const subcategories = [...new Set(allProducts.map(p => p.subcategory))].sort();

      return {
        products: paginatedProducts,
        total,
        page,
        limit,
        totalPages,
        categories,
        subcategories
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products from external APIs');
    }
  }

  async fetchProductById(id: number): Promise<ProductResponse> {
    try {
      // Determine which API to fetch from based on ID
      let product: Product;
      
      if (id > 1000) {
        // Fetch from Fake Store API
        const response = await fetch(`${this.fakeStoreUrl}/${id - 1000}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fakeStoreProduct = await response.json();
        product = this.transformFakeStoreProduct(fakeStoreProduct);
      } else {
        // Fetch from DummyJSON API
        const response = await fetch(`${this.dummyJsonUrl}/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dummyJsonProduct = await response.json();
        product = this.transformDummyJsonProduct(dummyJsonProduct);
      }

      // Get related products (products from the same category)
      const allProductsResponse = await this.fetchAllProducts({
        category: product.category,
        limit: 1000 // Get all products to find related ones
      });
      
      const relatedProducts = allProductsResponse.products
        .filter(p => p.id !== product.id)
        .slice(0, 4); // Limit to 4 related products

      return {
        product,
        relatedProducts
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product from external APIs');
    }
  }

  async fetchProductsByCategory(category: string, options: {
    page?: number;
    limit?: number;
    subcategory?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    inStock?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<ProductsResponse> {
    return this.fetchAllProducts({
      ...options,
      category
    });
  }

  async fetchCategories(): Promise<CategoriesResponse> {
    try {
      // Fetch all products to get categories
      const allProductsResponse = await this.fetchAllProducts({ limit: 1000 });
      const products = allProductsResponse.products;

      // Group products by category
      const categoryMap = new Map<string, { subcategories: Set<string>, productCount: number }>();
      
      products.forEach(product => {
        if (!categoryMap.has(product.category)) {
          categoryMap.set(product.category, { subcategories: new Set(), productCount: 0 });
        }
        const categoryData = categoryMap.get(product.category)!;
        categoryData.subcategories.add(product.subcategory);
        categoryData.productCount++;
      });

      // Convert to the expected format
      const categories = Array.from(categoryMap.entries()).map(([name, data]) => ({
        name,
        subcategories: Array.from(data.subcategories).sort(),
        productCount: data.productCount
      })).sort((a, b) => a.name.localeCompare(b.name));

      const totalSubcategories = categories.reduce((sum, cat) => sum + cat.subcategories.length, 0);

      return {
        categories,
        totalCategories: categories.length,
        totalSubcategories
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories from external APIs');
    }
  }

  // Legacy methods for backward compatibility
  async fetchAllProductsLegacy(): Promise<Product[]> {
    const response = await this.fetchAllProducts();
    return response.products;
  }

  async fetchProductByIdLegacy(id: number): Promise<Product> {
    const response = await this.fetchProductById(id);
    return response.product;
  }

  async fetchProductsByCategoryLegacy(category: string): Promise<Product[]> {
    const response = await this.fetchProductsByCategory(category);
    return response.products;
  }

  async fetchCategoriesLegacy(): Promise<string[]> {
    const response = await this.fetchCategories();
    return response.categories.map(cat => cat.name);
  }
}

// Create a singleton instance
export const productAPI = new ProductAPI();
