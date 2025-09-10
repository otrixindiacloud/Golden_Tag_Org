import { NextRequest, NextResponse } from "next/server";
import { productAPI } from '@/lib/api';

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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minRating = searchParams.get('minRating');
    const inStock = searchParams.get('inStock');
    const sortBy = searchParams.get('sortBy') || 'name';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    // Use the ProductAPI to fetch from external APIs
    const response = await productAPI.fetchAllProducts({
      page,
      limit,
      category: category || undefined,
      subcategory: subcategory || undefined,
      search: search || undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      minRating: minRating ? parseFloat(minRating) : undefined,
      inStock: inStock === 'true' ? true : inStock === 'false' ? false : undefined,
      sortBy,
      sortOrder: sortOrder as 'asc' | 'desc'
    });

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products from external APIs' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // This could be used for creating new products in the future
    // For now, we'll return a not implemented response
    return NextResponse.json(
      { error: 'Product creation not implemented yet' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
