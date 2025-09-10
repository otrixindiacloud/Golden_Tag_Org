// Category and subcategory icons/logos
export const categoryIcons = {
  // Main Categories
  "Electronics": "📱",
  "Clothing": "👕",
  "Footwear": "👟",
  "Home Decor": "🏠",
  "Beauty": "💄",
  "Food & Beverages": "🥫",
  "Accessories": "🧢",
};

export const subcategoryIcons = {
  // Electronics subcategories
  "Mobile": "📱",
  "Mobile Accessories": "🔌",
  "Audio": "🎧",
  "Computers": "💻",
  "TV": "📺",
  "Refrigerator": "❄️",
  "AC": "❄️",
  "Washing Machine": "🧺",
  "Kitchen Appliances": "🍳",
  "Laptop": "💻",
  "Tablet": "📱",
  "Gaming Console": "🎮",
  "Camera": "📷",
  "Smart Watch": "⌚",
  "Headphones": "🎧",
  "Speaker": "🔊",
  "Charger": "🔌",
  "Cable": "🔌",
  "Power Bank": "🔋",
  
  // Clothing subcategories
  "Men's Tops": "👔",
  "Men's Bottoms": "👖",
  "Women's Tops": "👚",
  "Women's Bottoms": "👗",
  "Women's Ethnic": "👘",
  "Women's Dresses": "👗",
  
  // Footwear subcategories
  "Men's Sports": "👟",
  "Men's Formal": "👞",
  "Men's Casual": "🩴",
  "Women's Sports": "👟",
  "Women's Formal": "👠",
  "Women's Casual": "👡",
  "Kids": "👶",
  "Unisex": "👟",
  
  // Home Decor subcategories
  "Lighting": "💡",
  "Wall Decor": "🖼️",
  "Decorative Items": "🎨",
  
  // Beauty subcategories
  "Skincare": "🧴",
  "Makeup": "💄",
  "Hair Care": "💇",
};

// Get icon for category or subcategory
export const getCategoryIcon = (category, subcategory = null) => {
  if (subcategory && subcategoryIcons[subcategory]) {
    return subcategoryIcons[subcategory];
  }
  return categoryIcons[category] || "🧩";
};

// Get all subcategories for a main category
export const getSubcategories = (category) => {
  const subcategoryMap = {
    "Electronics": ["Mobile", "Mobile Accessories", "Audio", "Computers", "Laptop", "Tablet", "TV", "Refrigerator", "AC", "Washing Machine", "Kitchen Appliances", "Gaming Console", "Camera", "Smart Watch", "Headphones", "Speaker", "Charger", "Cable", "Power Bank"],
    "Clothing": ["Men's Tops", "Men's Bottoms", "Women's Tops", "Women's Bottoms", "Women's Ethnic", "Women's Dresses"],
    "Footwear": ["Men's Sports", "Men's Formal", "Men's Casual", "Women's Sports", "Women's Formal", "Women's Casual", "Kids", "Unisex"],
    "Home Decor": ["Lighting", "Wall Decor", "Decorative Items"],
    "Beauty": ["Skincare", "Makeup", "Hair Care"],
  };
  return subcategoryMap[category] || [];
};

// Get all categories with their subcategories
export const getAllCategoriesWithSubcategories = () => {
  return Object.keys(categoryIcons).map(category => ({
    name: category,
    icon: categoryIcons[category],
    subcategories: getSubcategories(category).map(sub => ({
      name: sub,
      icon: subcategoryIcons[sub]
    }))
  }));
};
