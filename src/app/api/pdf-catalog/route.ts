import { NextRequest, NextResponse } from 'next/server';
import { generatePDFWithImages, generateHTMLForPDF } from '@/lib/pdf-generator';
import products from '@/data/products';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const catalog = searchParams.get('catalog');
    const format = searchParams.get('format') || 'pdf';
    const includeImages = searchParams.get('images') === 'true';
    const layout = searchParams.get('layout') || 'grid';
    
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

    if (format === 'html') {
      // Return HTML version for preview
      const htmlContent = generateHTMLForPDF(filteredProducts, {
        title: catalogName,
        includeImages,
        layout: layout as 'grid' | 'list',
        showPrices: true,
        showRatings: true,
        showFeatures: true,
      });
      
      return new NextResponse(htmlContent, {
        headers: {
          'Content-Type': 'text/html',
        }
      });
    } else {
      // Generate PDF with images
      const pdfBlob = await generatePDFWithImages(filteredProducts, {
        title: catalogName,
        includeImages,
        imageSize: 'medium',
        layout: layout as 'grid' | 'list',
        showPrices: true,
        showRatings: true,
        showFeatures: true,
      });

      return new NextResponse(pdfBlob, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${catalogName.toLowerCase().replace(/\s+/g, '-')}-catalog.pdf"`
        }
      });
    }
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: "Failed to generate PDF catalog" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      products: selectedProducts, 
      title = 'Custom Product Catalog',
      includeImages = true,
      layout = 'grid',
      showPrices = true,
      showRatings = true,
      showFeatures = true
    } = body;

    if (!selectedProducts || !Array.isArray(selectedProducts)) {
      return NextResponse.json({ error: "Invalid products data" }, { status: 400 });
    }

    const pdfBlob = await generatePDFWithImages(selectedProducts, {
      title,
      includeImages,
      imageSize: 'medium',
      layout,
      showPrices,
      showRatings,
      showFeatures,
    });

    return new NextResponse(pdfBlob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${title.toLowerCase().replace(/\s+/g, '-')}-catalog.pdf"`
      }
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: "Failed to generate custom PDF catalog" }, { status: 500 });
  }
}
