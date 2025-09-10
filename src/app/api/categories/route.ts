import { NextRequest, NextResponse } from "next/server";
import { productAPI } from '@/lib/api';

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

export async function GET(req: NextRequest) {
  try {
    // Use the ProductAPI to fetch categories from external APIs
    const response = await productAPI.fetchCategories();

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
      }
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories from external APIs' },
      { status: 500 }
    );
  }
}
