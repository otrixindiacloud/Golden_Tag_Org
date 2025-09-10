const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Import products data
const products = require('../src/data/products.js').default;

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to generate a placeholder image
async function generateProductImage(product) {
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext('2d');

  // Background gradient based on category
  const gradients = {
    'Electronics': ['#667eea', '#764ba2'],
    'Clothing': ['#f093fb', '#f5576c'],
    'Footwear': ['#4facfe', '#00f2fe'],
    'Home Decor': ['#43e97b', '#38f9d7'],
    'Beauty': ['#fa709a', '#fee140']
  };

  const [color1, color2] = gradients[product.category] || ['#667eea', '#764ba2'];
  const gradient = ctx.createLinearGradient(0, 0, 400, 400);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 400);

  // Add category label
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(product.category.toUpperCase(), 200, 50);

  // Add product name (wrapped if too long)
  ctx.fillStyle = 'white';
  ctx.font = 'bold 20px Arial';
  ctx.textAlign = 'center';
  
  const words = product.name.split(' ');
  let line = '';
  let y = 120;
  const maxWidth = 350;
  
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, 200, y);
      line = words[n] + ' ';
      y += 30;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 200, y);

  // Add price
  ctx.fillStyle = '#FFD700';
  ctx.font = 'bold 24px Arial';
  ctx.fillText(`₹${product.price.toLocaleString()}`, 200, y + 60);

  // Add description (truncated)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = '14px Arial';
  const description = product.description.length > 50 
    ? product.description.substring(0, 50) + '...' 
    : product.description;
  ctx.fillText(description, 200, y + 100);

  // Add product ID
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '12px Arial';
  ctx.fillText(`ID: ${product.id}`, 200, 350);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  const filename = product.image.replace('/images/', '');
  const filepath = path.join(imagesDir, filename);
  
  fs.writeFileSync(filepath, buffer);
  console.log(`Generated: ${filename}`);
}

// Generate images for all products
async function generateAllImages() {
  console.log('Generating product images...');
  
  for (const product of products) {
    try {
      await generateProductImage(product);
    } catch (error) {
      console.error(`Error generating image for product ${product.id}:`, error);
    }
  }
  
  console.log(`\n✅ Generated ${products.length} product images in ${imagesDir}`);
}

// Run the script
generateAllImages().catch(console.error);
