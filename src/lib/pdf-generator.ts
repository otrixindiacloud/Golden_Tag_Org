import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface Product {
  id: number;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  mrp?: number;
  description: string;
  image?: string;
  rating?: number;
  ratingCount?: number;
  features?: string[];
  warrantyMonths?: number;
  offers?: string[];
}

export interface PDFOptions {
  title: string;
  includeImages: boolean;
  imageSize: 'small' | 'medium' | 'large';
  layout: 'grid' | 'list';
  showPrices: boolean;
  showRatings: boolean;
  showFeatures: boolean;
}

const defaultOptions: PDFOptions = {
  title: 'Product Catalog',
  includeImages: true,
  imageSize: 'medium',
  layout: 'grid',
  showPrices: true,
  showRatings: true,
  showFeatures: true,
};

// Generate a placeholder image for products without images
function generatePlaceholderImage(product: Product): string {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return '';
    
    // Background
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, 200, 200);
    
    // Border
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, 198, 198);
    
    // Icon based on category
    const iconMap: { [key: string]: string } = {
      'Electronics': '📱',
      'Clothing': '👕',
      'Footwear': '👟',
      'Home Decor': '🏠',
      'Beauty': '💄',
    };
    
    const icon = iconMap[product.category] || '📦';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#6b7280';
    ctx.fillText(icon, 100, 120);
    
    // Product name
    ctx.font = '12px Arial';
    ctx.fillStyle = '#374151';
    const words = product.name.split(' ');
    const lines = [];
    let currentLine = '';
    
    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 180) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    
    lines.slice(0, 3).forEach((line, index) => {
      ctx.fillText(line, 100, 150 + index * 15);
    });
    
    return canvas.toDataURL();
  } else {
    // Server-side fallback: return a simple SVG placeholder
    const iconMap: { [key: string]: string } = {
      'Electronics': '📱',
      'Clothing': '👕',
      'Footwear': '👟',
      'Home Decor': '🏠',
      'Beauty': '💄',
    };
    
    const icon = iconMap[product.category] || '📦';
    const productName = product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name;
    
    return `data:image/svg+xml;base64,${Buffer.from(`
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2"/>
        <text x="100" y="120" text-anchor="middle" font-size="48" fill="#6b7280">${icon}</text>
        <text x="100" y="150" text-anchor="middle" font-size="12" fill="#374151">${productName}</text>
      </svg>
    `).toString('base64')}`;
  }
}

// Convert image to base64
async function imageToBase64(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return '';
  }
}

// Generate PDF with images
export async function generatePDFWithImages(
  products: Product[],
  options: Partial<PDFOptions> = {}
): Promise<Blob> {
  // Check if we're in a server environment
  if (typeof window === 'undefined') {
    throw new Error('PDF generation with images is not supported in server environment. Use generateHTMLForPDF instead.');
  }
  
  const opts = { ...defaultOptions, ...options };
  const pdf = new jsPDF();
  
  // Add title
  pdf.setFontSize(24);
  pdf.setTextColor(249, 115, 22); // Amber color
  pdf.text(opts.title, 20, 30);
  
  // Add generation date
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 40);
  
  let yPosition = 50;
  const pageHeight = pdf.internal.pageSize.height;
  const margin = 20;
  const imageWidth = opts.imageSize === 'small' ? 40 : opts.imageSize === 'medium' ? 60 : 80;
  const imageHeight = imageWidth;
  
  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.category || 'Uncategorized';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {} as { [key: string]: Product[] });
  
  for (const [category, categoryProducts] of Object.entries(productsByCategory)) {
    // Add category header
    if (yPosition > pageHeight - 100) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`${category} (${categoryProducts.length} products)`, margin, yPosition);
    yPosition += 15;
    
    // Add line under category
    pdf.setDrawColor(249, 115, 22);
    pdf.setLineWidth(1);
    pdf.line(margin, yPosition, pdf.internal.pageSize.width - margin, yPosition);
    yPosition += 10;
    
    for (const product of categoryProducts) {
      // Check if we need a new page
      if (yPosition > pageHeight - 120) {
        pdf.addPage();
        yPosition = 20;
      }
      
      // Add product image
      if (opts.includeImages) {
        try {
          let imageData = '';
          
          if (product.image && product.image.startsWith('http')) {
            imageData = await imageToBase64(product.image);
          } else if (product.image && product.image.startsWith('/')) {
            // For local images, we'll use placeholder for now
            imageData = generatePlaceholderImage(product);
          } else {
            imageData = generatePlaceholderImage(product);
          }
          
          if (imageData) {
            pdf.addImage(imageData, 'JPEG', margin, yPosition, imageWidth, imageHeight);
          }
        } catch (error) {
          console.error('Error adding image:', error);
          // Add placeholder if image fails
          const placeholderData = generatePlaceholderImage(product);
          if (placeholderData) {
            pdf.addImage(placeholderData, 'JPEG', margin, yPosition, imageWidth, imageHeight);
          }
        }
      }
      
      // Add product details
      const textX = margin + (opts.includeImages ? imageWidth + 10 : 0);
      const textWidth = pdf.internal.pageSize.width - textX - margin;
      
      // Product name
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont('helvetica', 'bold');
      const productName = product.name.length > 50 ? product.name.substring(0, 50) + '...' : product.name;
      pdf.text(productName, textX, yPosition + 10);
      
      // Category and subcategory
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.setFont('helvetica', 'normal');
      const categoryText = product.subcategory ? `${product.category} - ${product.subcategory}` : product.category;
      pdf.text(categoryText, textX, yPosition + 18);
      
      // Price
      if (opts.showPrices) {
        pdf.setFontSize(10);
        pdf.setTextColor(249, 115, 22);
        pdf.setFont('helvetica', 'bold');
        let priceText = `₹${product.price}`;
        if (product.mrp && product.mrp > product.price) {
          priceText += ` (MRP: ₹${product.mrp})`;
        }
        pdf.text(priceText, textX, yPosition + 28);
      }
      
      // Rating
      if (opts.showRatings && product.rating) {
        pdf.setFontSize(8);
        pdf.setTextColor(0, 0, 0);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Rating: ${product.rating}/5 (${product.ratingCount || 0} reviews)`, textX, yPosition + 36);
      }
      
      // Description
      pdf.setFontSize(8);
      pdf.setTextColor(50, 50, 50);
      const description = product.description.length > 80 ? product.description.substring(0, 80) + '...' : product.description;
      pdf.text(description, textX, yPosition + 44);
      
      // Features
      if (opts.showFeatures && product.features && product.features.length > 0) {
        pdf.setFontSize(8);
        pdf.setTextColor(0, 0, 0);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Features:', textX, yPosition + 54);
        
        product.features.slice(0, 3).forEach((feature, index) => {
          pdf.setFont('helvetica', 'normal');
          const featureText = feature.length > 60 ? feature.substring(0, 60) + '...' : feature;
          pdf.text(`• ${featureText}`, textX + 5, yPosition + 64 + (index * 8));
        });
      }
      
      yPosition += opts.includeImages ? Math.max(imageHeight, 80) : 60;
      yPosition += 10; // Spacing between products
    }
    
    yPosition += 20; // Extra spacing between categories
  }
  
  return pdf.output('blob');
}

// Generate HTML for PDF conversion
export function generateHTMLForPDF(products: Product[], options: Partial<PDFOptions> = {}): string {
  const opts = { ...defaultOptions, ...options };
  
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || 'Uncategorized';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {} as { [key: string]: Product[] });
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${opts.title}</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          margin: 0; 
          padding: 20px; 
          background: white;
          color: #333;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 3px solid #f97316;
          padding-bottom: 20px;
        }
        .title {
          color: #f97316;
          font-size: 28px;
          font-weight: bold;
          margin: 0 0 10px 0;
        }
        .subtitle {
          color: #666;
          font-size: 14px;
          margin: 0;
        }
        .category-section {
          margin: 40px 0;
          page-break-inside: avoid;
        }
        .category-title {
          font-size: 20px;
          color: #333;
          border-bottom: 2px solid #f97316;
          padding-bottom: 8px;
          margin-bottom: 20px;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .product-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 15px;
          background: #fafafa;
          page-break-inside: avoid;
        }
        .product-image {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 4px;
          margin-bottom: 10px;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          color: #9ca3af;
        }
        .product-name {
          font-weight: bold;
          font-size: 16px;
          color: #333;
          margin-bottom: 5px;
        }
        .product-category {
          color: #666;
          font-size: 12px;
          margin-bottom: 8px;
        }
        .product-price {
          font-size: 18px;
          color: #f97316;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .product-description {
          font-size: 12px;
          color: #555;
          margin-bottom: 8px;
          line-height: 1.4;
        }
        .product-features {
          font-size: 11px;
          color: #666;
        }
        .product-features ul {
          margin: 5px 0;
          padding-left: 15px;
        }
        .product-rating {
          font-size: 11px;
          color: #666;
          margin-top: 5px;
        }
        .placeholder-image {
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
          border: 2px dashed #d1d5db;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #9ca3af;
        }
        .placeholder-text {
          font-size: 10px;
          margin-top: 5px;
          text-align: center;
        }
        @media print {
          body { margin: 0; }
          .product-card { break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="title">${opts.title}</h1>
        <p class="subtitle">Generated on: ${new Date().toLocaleDateString()} | Total Products: ${products.length}</p>
      </div>
      
      ${Object.entries(groupedProducts).map(([category, categoryProducts]) => `
        <div class="category-section">
          <h2 class="category-title">${category} (${categoryProducts.length} products)</h2>
          <div class="products-grid">
            ${categoryProducts.map(product => `
              <div class="product-card">
                <div class="product-image">
                  ${product.image && product.image.startsWith('http') ? 
                    `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                     <div class="placeholder-image" style="display: none;">
                       <div>${getCategoryIcon(product.category)}</div>
                       <div class="placeholder-text">${product.name}</div>
                     </div>` :
                    `<div class="placeholder-image">
                       <div>${getCategoryIcon(product.category)}</div>
                       <div class="placeholder-text">${product.name}</div>
                     </div>`
                  }
                </div>
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category}${product.subcategory ? ` - ${product.subcategory}` : ''}</div>
                ${opts.showPrices ? `<div class="product-price">₹${product.price}${product.mrp && product.mrp > product.price ? ` (MRP: ₹${product.mrp})` : ''}</div>` : ''}
                <div class="product-description">${product.description}</div>
                ${opts.showRatings && product.rating ? `<div class="product-rating">Rating: ${product.rating}/5 (${product.ratingCount || 0} reviews)</div>` : ''}
                ${opts.showFeatures && product.features && product.features.length > 0 ? `
                  <div class="product-features">
                    <strong>Features:</strong>
                    <ul>
                      ${product.features.slice(0, 3).map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </body>
    </html>
  `;
}

function getCategoryIcon(category: string): string {
  const iconMap: { [key: string]: string } = {
    'Electronics': '📱',
    'Clothing': '👕',
    'Footwear': '👟',
    'Home Decor': '🏠',
    'Beauty': '💄',
  };
  return iconMap[category] || '📦';
}
