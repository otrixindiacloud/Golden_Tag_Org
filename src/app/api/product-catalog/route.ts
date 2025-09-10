import { NextRequest, NextResponse } from "next/server";
import products from '@/data/products';

// Generate CSV content for all products
function generateCSV(products: any[]) {
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

// Generate PDF content for all products
function generatePDF(products: any[]) {
  const title = 'Complete Product Catalog';
  const content = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #f97316; }
        .product { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 5px; }
        .product-name { font-weight: bold; font-size: 18px; color: #333; }
        .product-category { color: #666; font-size: 14px; }
        .product-price { font-size: 16px; color: #f97316; font-weight: bold; }
        .product-description { margin: 10px 0; color: #555; }
        .product-features { margin: 10px 0; }
        .product-features ul { margin: 5px 0; padding-left: 20px; }
        .category-section { margin: 30px 0; }
        .category-title { font-size: 24px; color: #333; border-bottom: 2px solid #f97316; padding-bottom: 10px; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <p>Generated on: ${new Date().toLocaleDateString()}</p>
      <p>Total Products: ${products.length}</p>
      
      ${Object.entries(products.reduce((acc, product) => {
        const category = product.category || 'Uncategorized';
        if (!acc[category]) acc[category] = [];
        acc[category].push(product);
        return acc;
      }, {} as { [key: string]: any[] })).map(([category, categoryProducts]) => `
        <div class="category-section">
          <h2 class="category-title">${category} (${categoryProducts.length} products)</h2>
          ${categoryProducts.map(product => `
            <div class="product">
              <div class="product-name">${product.name || 'N/A'}</div>
              <div class="product-category">${product.category || ''} ${product.subcategory ? `- ${product.subcategory}` : ''}</div>
              <div class="product-price">₹${product.price || 'N/A'} ${product.mrp ? `(MRP: ₹${product.mrp})` : ''}</div>
              <div class="product-description">${product.description || 'No description available'}</div>
              ${product.features && product.features.length > 0 ? `
                <div class="product-features">
                  <strong>Features:</strong>
                  <ul>
                    ${product.features.map((feature: string) => `<li>${feature}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
              ${product.rating ? `<div>Rating: ${product.rating}/5 (${product.ratingCount || 0} reviews)</div>` : ''}
              ${product.warrantyMonths ? `<div>Warranty: ${product.warrantyMonths} months</div>` : ''}
            </div>
          `).join('')}
        </div>
      `).join('')}
    </body>
    </html>
  `;
  return content;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format') || 'csv';

    if (format === 'csv') {
      const csvContent = generateCSV(products);
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="complete-product-catalog.csv"'
        }
      });
    } else {
      const pdfContent = generatePDF(products);
      return new NextResponse(pdfContent, {
        headers: {
          'Content-Type': 'text/html',
          'Content-Disposition': 'attachment; filename="complete-product-catalog.html"'
        }
      });
    }
  } catch (e) {
    return NextResponse.json({ error: "Failed to generate product catalog" }, { status: 500 });
  }
}