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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Use the ProductAPI to fetch from external APIs
    const response = await productAPI.fetchProductById(productId);

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product from external APIs' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // This could be used for updating products in the future
    // For now, we'll return a not implemented response
    return NextResponse.json(
      { error: 'Product update not implemented yet' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // This could be used for deleting products in the future
    // For now, we'll return a not implemented response
    return NextResponse.json(
      { error: 'Product deletion not implemented yet' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
