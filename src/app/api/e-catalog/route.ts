import { NextRequest, NextResponse } from "next/server";
import products from '@/data/products';
import { generatePDFWithImages, generateHTMLForPDF } from '@/lib/pdf-generator';
import collections from '@/data/collections';

type Payload = {
  name: string;
  email: string;
  phone: string;
  selectedCatalog: string;
  selectedCategories: string[];
  selectedSubcategories: string[];
};

function getEnv(name: string) {
  return process.env[name];
}

// Generate CSV content for products
function generateCSV(products: any[], catalogName?: string) {
  const headers = ['ID', 'Name', 'Category', 'Subcategory', 'Price', 'MRP', 'Description', 'Rating', 'Rating Count', 'Features', 'Warranty (Months)', 'Guarantee (Months)'];
  const csvContent = [
    headers.join(','),
    ...products.map(product => [
      product.id,
      `"${product.name || ''}"`,
      `"${product.category || ''}"`,
      `"${product.subcategory || ''}"`,
      product.price || '',
      product.mrp || '',
      `"${(product.description || '').replace(/"/g, '""')}"`,
      product.rating || '',
      product.ratingCount || '',
      `"${(product.features || []).join('; ')}"`,
      product.warrantyMonths || '',
      product.guaranteeMonths || ''
    ].join(','))
  ].join('\n');
  
  return csvContent;
}

// Generate PDF content with images
async function generatePDF(products: any[], catalogName?: string) {
  const title = catalogName ? `${catalogName} Catalog` : 'Complete Product Catalog';
  
  // In server environment, always use HTML generation
  if (typeof window === 'undefined') {
    return generateHTMLForPDF(products, {
      title,
      includeImages: true,
      layout: 'grid',
      showPrices: true,
      showRatings: true,
      showFeatures: true,
    });
  }
  
  try {
    // Try to generate PDF with images (client-side only)
    const pdfBlob = await generatePDFWithImages(products, {
      title,
      includeImages: true,
      imageSize: 'medium',
      layout: 'grid',
      showPrices: true,
      showRatings: true,
      showFeatures: true,
    });
    
    return pdfBlob;
  } catch (error) {
    console.error('Error generating PDF with images, falling back to HTML:', error);
    
    // Fallback to HTML generation
    return generateHTMLForPDF(products, {
      title,
      includeImages: true,
      layout: 'grid',
      showPrices: true,
      showRatings: true,
      showFeatures: true,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const catalog = searchParams.get('catalog');
    const format = searchParams.get('format') || 'pdf';

    let filteredProducts = products;
    let catalogName = 'Complete Product Catalog';

    // Filter products by catalog if specified
    if (catalog) {
      const catalogMap: { [key: string]: string } = {
        'electronics': 'Electronics',
        'clothing': 'Clothing',
        'footwear': 'Footwear',
        'home-decor': 'Home Decor',
        'beauty': 'Beauty',
        'food-&-beverages': 'Food & Beverages',
        'accessories': 'Accessories'
      };
      
      const categoryName = catalogMap[catalog];
      if (categoryName) {
        filteredProducts = products.filter(product => product.category === categoryName);
        catalogName = `${categoryName} Catalog`;
      }
    }

    if (format === 'csv') {
      const csvContent = generateCSV(filteredProducts, catalogName);
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${catalogName.toLowerCase().replace(/\s+/g, '-')}-catalog.csv"`
        }
      });
    } else {
      const pdfContent = await generatePDF(filteredProducts, catalogName);
      
      // Check if it's a Blob (PDF) or string (HTML)
      if (pdfContent instanceof Blob) {
        return new NextResponse(pdfContent, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${catalogName.toLowerCase().replace(/\s+/g, '-')}-catalog.pdf"`
          }
        });
      } else {
        return new NextResponse(pdfContent, {
          headers: {
            'Content-Type': 'text/html',
            'Content-Disposition': `attachment; filename="${catalogName.toLowerCase().replace(/\s+/g, '-')}-catalog.html"`
          }
        });
      }
    }
  } catch (e) {
    return NextResponse.json({ error: "Failed to generate catalog" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Payload>;
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const selectedCatalog = String(body.selectedCatalog || "").trim();
    const selectedCategories = Array.isArray(body.selectedCategories) ? body.selectedCategories.map(String) : [];
    const selectedSubcategories = Array.isArray(body.selectedSubcategories) ? body.selectedSubcategories.map(String) : [];

    if (!name || !email || !phone || !selectedCatalog) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // For backward compatibility, still handle the old form submission
    return NextResponse.json({ 
      message: "Form submission received. Please use the download options above for instant access to catalogs.",
      ok: true 
    });
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}