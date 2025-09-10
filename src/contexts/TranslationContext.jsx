"use client";

import { createContext, useContext, useState, useEffect } from "react";

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};

// Translation files
const translations = {
  en: {
    // Navigation
    home: "HOME",
    about: "ABOUT",
    products: "PRODUCTS",
    eCatalog: "E-CATALOG",
    contact: "CONTACT",
    
    // Language selector
    selectLanguage: "Select Language",
    selectLanguageAr: "اختر اللغة",
    
    // Common
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    confirm: "Confirm",
    close: "Close",
    
    // Product related
    addToCart: "Add to Cart",
    viewDetails: "View Details",
    price: "Price",
    quantity: "Quantity",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    
    // Contact
    getInTouch: "Get in Touch",
    sendMessage: "Send Message",
    name: "Name",
    email: "Email",
    phone: "Phone",
    message: "Message",
    submit: "Submit",
    
    // Footer
    allRightsReserved: "All rights reserved",
    followUs: "Follow Us",
    quickLinks: "Quick Links",
    contactInfo: "Contact Info",
    
    // Hero Section
    store: "STORE",
    heroTitle: "ULTIMATE TRENDY GIFTS & GIVEAWAYS IN BAHRAIN",
    heroDescription: "Premium gifts that make lasting impressions. Serving leading multinational companies in the Kingdom of Bahrain since 2015.",
    browseProducts: "BROWSE PRODUCTS",
    contactUs: "CONTACT US",
    yourDesignHere: "YOUR DESIGN HERE",
    
    // Search
    searchGifts: "Search gifts...",
    
    // Footer
    getToKnowUs: "Get to Know Us",
    aboutGoldenTag: "About Golden Tag",
    careers: "Careers",
    pressReleases: "Press Releases",
    goldenTagScience: "Golden Tag Science",
    connectWithUs: "Connect with Us",
    makeMoneyWithUs: "Make Money with Us",
    sellOnGoldenTag: "Sell on Golden Tag",
    sellUnderAccelerator: "Sell under Golden Tag Accelerator",
    protectAndBuildBrand: "Protect and Build Your Brand",
    globalSelling: "Golden Tag Global Selling",
    supplyToGoldenTag: "Supply to Golden Tag",
    becomeAffiliate: "Become an Affiliate",
    fulfillmentByGoldenTag: "Fulfilment by Golden Tag",
    advertiseProducts: "Advertise Your Products",
    goldenTagPay: "Golden Tag Pay on Merchants",
    letUsHelpYou: "Let Us Help You",
    yourAccount: "Your Account",
    returnsCentre: "Returns Centre",
    recallsAndSafety: "Recalls and Product Safety Alerts",
    purchaseProtection: "100% Purchase Protection",
    appDownload: "Golden Tag App Download",
    help: "Help",
    copyrightText: "Copyright 2025 © Golden Tag Corporate Gifts. All rights reserved.",
    
    // StoreBanner
    requestYourCatalog: "Request Your Catalog",
    getPersonalizedCatalog: "Get a personalized catalog tailored to your corporate gift needs",
    discoverComprehensiveCollection: "Discover our comprehensive collection of premium corporate gifts and promotional items. Request your personalized catalog today and explore our curated selection designed for your business needs.",
    requestCatalog: "Request Catalog",
    premiumCorporateGifts: "Premium Corporate Gifts",
    excellenceSince2015: "Excellence Since 2015",
    servingLeadingCompanies: "Serving leading multinational companies in Bahrain with premium quality gifts that make lasting impressions on your clients and employees.",
    viewProducts: "View Products",
    customBrandingSolutions: "Custom Branding Solutions",
    yourBrandOurExpertise: "Your Brand, Our Expertise",
    professionalLogoEmbossing: "Professional logo embossing, custom color schemes, and personalized messaging for your corporate identity. Get your personalized catalog to see our full range.",
    getCatalog: "Get Catalog",
    luxuryGiftCollections: "Luxury Gift Collections",
    premiumQualityService: "Premium Quality, Exceptional Service",
    exploreExclusiveRange: "Explore our exclusive range of luxury corporate gifts designed to impress your most valued clients and partners. From elegant accessories to sophisticated office essentials.",
    exploreCollection: "Explore Collection",
    seasonalSpecials: "Seasonal Specials",
    limitedTimeOffers: "Limited Time Offers",
    discoverSeasonalCollection: "Discover our seasonal collection of corporate gifts perfect for holidays, celebrations, and special occasions. Limited quantities available.",
    shopNow: "Shop Now",
    corporatePartnerships: "Corporate Partnerships",
    buildingLastingRelationships: "Building Lasting Relationships",
    partnerWithUs: "Partner with us for your corporate gifting needs. We offer customized solutions, bulk discounts, and dedicated account management for your business.",
    partnerWithUsCTA: "Partner With Us",
    smartDeskEssentials: "Smart Desk Essentials",
    curatedWorkspaceKits: "Curated workspace kits",
    thoughtfullyDesignedDeskSets: "Thoughtfully designed desk sets and accessories that elevate everyday productivity.",
    viewKits: "View Kits",
    brandedMerchandise: "Branded Merchandise",
    madeForYourBrand: "Made for your brand",
    highQualityBrandedGoods: "High-quality branded goods for events, onboarding, and client gifting.",
    browse: "Browse"
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    about: "من نحن",
    products: "المنتجات",
    eCatalog: "الكتالوج الإلكتروني",
    contact: "اتصل بنا",
    
    // Language selector
    selectLanguage: "اختر اللغة",
    selectLanguageAr: "Select Language",
    
    // Common
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح",
    cancel: "إلغاء",
    save: "حفظ",
    edit: "تعديل",
    delete: "حذف",
    confirm: "تأكيد",
    close: "إغلاق",
    
    // Product related
    addToCart: "أضف إلى السلة",
    viewDetails: "عرض التفاصيل",
    price: "السعر",
    quantity: "الكمية",
    inStock: "متوفر",
    outOfStock: "غير متوفر",
    
    // Contact
    getInTouch: "تواصل معنا",
    sendMessage: "إرسال رسالة",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    message: "الرسالة",
    submit: "إرسال",
    
    // Footer
    allRightsReserved: "جميع الحقوق محفوظة",
    followUs: "تابعنا",
    quickLinks: "روابط سريعة",
    contactInfo: "معلومات الاتصال",
    
    // Hero Section
    store: "المتجر",
    heroTitle: "أفضل الهدايا والهدايا العصرية في البحرين",
    heroDescription: "هدايا مميزة تترك انطباعاً دائماً. نخدم الشركات متعددة الجنسيات الرائدة في مملكة البحرين منذ عام 2015.",
    browseProducts: "تصفح المنتجات",
    contactUs: "اتصل بنا",
    yourDesignHere: "تصميمك هنا"
  },
  "ar-sa": {
    // Navigation - Saudi Arabic
    home: "الرئيسية",
    about: "من نحن",
    products: "المنتجات",
    eCatalog: "الكتالوج الإلكتروني",
    contact: "اتصل بنا",
    
    // Language selector
    selectLanguage: "اختر اللغة",
    selectLanguageAr: "Select Language",
    
    // Common
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح",
    cancel: "إلغاء",
    save: "حفظ",
    edit: "تعديل",
    delete: "حذف",
    confirm: "تأكيد",
    close: "إغلاق",
    
    // Product related
    addToCart: "أضف إلى السلة",
    viewDetails: "عرض التفاصيل",
    price: "السعر",
    quantity: "الكمية",
    inStock: "متوفر",
    outOfStock: "غير متوفر",
    
    // Contact
    getInTouch: "تواصل معنا",
    sendMessage: "إرسال رسالة",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    message: "الرسالة",
    submit: "إرسال",
    
    // Footer
    allRightsReserved: "جميع الحقوق محفوظة",
    followUs: "تابعنا",
    quickLinks: "روابط سريعة",
    contactInfo: "معلومات الاتصال",
    
    // Hero Section
    store: "المتجر",
    heroTitle: "أفضل الهدايا والهدايا العصرية في البحرين",
    heroDescription: "هدايا مميزة تترك انطباعاً دائماً. نخدم الشركات متعددة الجنسيات الرائدة في مملكة البحرين منذ عام 2015.",
    browseProducts: "تصفح المنتجات",
    contactUs: "اتصل بنا",
    yourDesignHere: "تصميمك هنا",
    
    // Search
    searchGifts: "البحث عن الهدايا...",
    
    // Footer
    getToKnowUs: "تعرف علينا",
    aboutGoldenTag: "حول جولدن تاغ",
    careers: "الوظائف",
    pressReleases: "البيانات الصحفية",
    goldenTagScience: "علوم جولدن تاغ",
    connectWithUs: "تواصل معنا",
    makeMoneyWithUs: "اكسب المال معنا",
    sellOnGoldenTag: "بيع على جولدن تاغ",
    sellUnderAccelerator: "بيع تحت مسرع جولدن تاغ",
    protectAndBuildBrand: "حماية وبناء علامتك التجارية",
    globalSelling: "البيع العالمي لجولدن تاغ",
    supplyToGoldenTag: "التوريد لجولدن تاغ",
    becomeAffiliate: "كن شريكاً",
    fulfillmentByGoldenTag: "الوفاء من جولدن تاغ",
    advertiseProducts: "إعلان منتجاتك",
    goldenTagPay: "دفع جولدن تاغ للتجار",
    letUsHelpYou: "دعنا نساعدك",
    yourAccount: "حسابك",
    returnsCentre: "مركز الإرجاع",
    recallsAndSafety: "استدعاءات وتنبيهات سلامة المنتج",
    purchaseProtection: "حماية الشراء 100%",
    appDownload: "تحميل تطبيق جولدن تاغ",
    help: "المساعدة",
    copyrightText: "حقوق الطبع والنشر 2025 © هدايا جولدن تاغ المؤسسية. جميع الحقوق محفوظة."
  },
  hi: {
    // Navigation
    home: "होम",
    about: "हमारे बारे में",
    products: "उत्पाद",
    eCatalog: "ई-कैटलॉग",
    contact: "संपर्क",
    
    // Language selector
    selectLanguage: "भाषा चुनें",
    selectLanguageAr: "اختر اللغة",
    
    // Common
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफल",
    cancel: "रद्द करें",
    save: "सहेजें",
    edit: "संपादित करें",
    delete: "हटाएं",
    confirm: "पुष्टि करें",
    close: "बंद करें",
    
    // Product related
    addToCart: "कार्ट में जोड़ें",
    viewDetails: "विवरण देखें",
    price: "कीमत",
    quantity: "मात्रा",
    inStock: "उपलब्ध",
    outOfStock: "अनुपलब्ध",
    
    // Contact
    getInTouch: "संपर्क में रहें",
    sendMessage: "संदेश भेजें",
    name: "नाम",
    email: "ईमेल",
    phone: "फोन",
    message: "संदेश",
    submit: "जमा करें",
    
    // Footer
    allRightsReserved: "सभी अधिकार सुरक्षित",
    followUs: "हमें फॉलो करें",
    quickLinks: "त्वरित लिंक",
    contactInfo: "संपर्क जानकारी",
    
    // Hero Section
    store: "स्टोर",
    heroTitle: "बहरीन में अंतिम ट्रेंडी उपहार और उपहार",
    heroDescription: "प्रीमियम उपहार जो स्थायी प्रभाव छोड़ते हैं। 2015 से बहरीन साम्राज्य में अग्रणी बहुराष्ट्रीय कंपनियों की सेवा कर रहे हैं।",
    browseProducts: "उत्पाद ब्राउज़ करें",
    contactUs: "संपर्क करें",
    yourDesignHere: "आपका डिज़ाइन यहाँ",
    
    // Search
    searchGifts: "उपहार खोजें..."
  },
  fr: {
    // Navigation
    home: "ACCUEIL",
    about: "À PROPOS",
    products: "PRODUITS",
    eCatalog: "CATALOGUE ÉLECTRONIQUE",
    contact: "CONTACT",
    
    // Language selector
    selectLanguage: "Sélectionner la langue",
    selectLanguageAr: "اختر اللغة",
    
    // Common
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    cancel: "Annuler",
    save: "Enregistrer",
    edit: "Modifier",
    delete: "Supprimer",
    confirm: "Confirmer",
    close: "Fermer",
    
    // Product related
    addToCart: "Ajouter au panier",
    viewDetails: "Voir les détails",
    price: "Prix",
    quantity: "Quantité",
    inStock: "En stock",
    outOfStock: "Rupture de stock",
    
    // Contact
    getInTouch: "Entrer en contact",
    sendMessage: "Envoyer un message",
    name: "Nom",
    email: "Email",
    phone: "Téléphone",
    message: "Message",
    submit: "Soumettre",
    
    // Footer
    allRightsReserved: "Tous droits réservés",
    followUs: "Suivez-nous",
    quickLinks: "Liens rapides",
    contactInfo: "Informations de contact",
    
    // Hero Section
    store: "MAGASIN",
    heroTitle: "CADEAUX ET OBJETS TENDANCE ULTIMES À BAHREÏN",
    heroDescription: "Cadeaux premium qui font des impressions durables. Servant les principales entreprises multinationales au Royaume de Bahreïn depuis 2015.",
    browseProducts: "PARCOURIR LES PRODUITS",
    contactUs: "NOUS CONTACTER",
    yourDesignHere: "VOTRE DESIGN ICI",
    
    // Search
    searchGifts: "Rechercher des cadeaux..."
  },
  de: {
    // Navigation
    home: "STARTSEITE",
    about: "ÜBER UNS",
    products: "PRODUKTE",
    eCatalog: "E-KATALOG",
    contact: "KONTAKT",
    
    // Language selector
    selectLanguage: "Sprache auswählen",
    selectLanguageAr: "اختر اللغة",
    
    // Common
    loading: "Wird geladen...",
    error: "Fehler",
    success: "Erfolg",
    cancel: "Abbrechen",
    save: "Speichern",
    edit: "Bearbeiten",
    delete: "Löschen",
    confirm: "Bestätigen",
    close: "Schließen",
    
    // Product related
    addToCart: "In den Warenkorb",
    viewDetails: "Details anzeigen",
    price: "Preis",
    quantity: "Menge",
    inStock: "Auf Lager",
    outOfStock: "Nicht auf Lager",
    
    // Contact
    getInTouch: "Kontakt aufnehmen",
    sendMessage: "Nachricht senden",
    name: "Name",
    email: "E-Mail",
    phone: "Telefon",
    message: "Nachricht",
    submit: "Senden",
    
    // Footer
    allRightsReserved: "Alle Rechte vorbehalten",
    followUs: "Folgen Sie uns",
    quickLinks: "Schnelle Links",
    contactInfo: "Kontaktinformationen",
    
    // Hero Section
    store: "GESCHÄFT",
    heroTitle: "ULTIMATIVE TRENDY GESCHENKE & GIVEAWAYS IN BAHRAIN",
    heroDescription: "Premium-Geschenke, die bleibende Eindrücke hinterlassen. Seit 2015 im Dienste führender multinationaler Unternehmen im Königreich Bahrain.",
    browseProducts: "PRODUKTE DURCHSUCHEN",
    contactUs: "KONTAKTIEREN SIE UNS",
    yourDesignHere: "IHR DESIGN HIER",
    
    // Search
    searchGifts: "Geschenke suchen..."
  },
  es: {
    // Navigation
    home: "INICIO",
    about: "ACERCA DE",
    products: "PRODUCTOS",
    eCatalog: "CATÁLOGO ELECTRÓNICO",
    contact: "CONTACTO",
    
    // Language selector
    selectLanguage: "Seleccionar idioma",
    selectLanguageAr: "اختر اللغة",
    
    // Common
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    cancel: "Cancelar",
    save: "Guardar",
    edit: "Editar",
    delete: "Eliminar",
    confirm: "Confirmar",
    close: "Cerrar",
    
    // Product related
    addToCart: "Agregar al carrito",
    viewDetails: "Ver detalles",
    price: "Precio",
    quantity: "Cantidad",
    inStock: "En stock",
    outOfStock: "Agotado",
    
    // Contact
    getInTouch: "Ponerse en contacto",
    sendMessage: "Enviar mensaje",
    name: "Nombre",
    email: "Correo electrónico",
    phone: "Teléfono",
    message: "Mensaje",
    submit: "Enviar",
    
    // Footer
    allRightsReserved: "Todos los derechos reservados",
    followUs: "Síguenos",
    quickLinks: "Enlaces rápidos",
    contactInfo: "Información de contacto",
    
    // Hero Section
    store: "TIENDA",
    heroTitle: "REGALOS Y OBSEQUIOS TRENDY ÚLTIMOS EN BAHREIN",
    heroDescription: "Regalos premium que dejan impresiones duraderas. Sirviendo a las principales empresas multinacionales en el Reino de Bahrein desde 2015.",
    browseProducts: "EXPLORAR PRODUCTOS",
    contactUs: "CONTÁCTANOS",
    yourDesignHere: "TU DISEÑO AQUÍ",
    
    // Search
    searchGifts: "Buscar regalos..."
  },
  ur: {
    // Navigation
    home: "ہوم",
    about: "ہمارے بارے میں",
    products: "مصنوعات",
    eCatalog: "ای-کیٹلاگ",
    contact: "رابطہ",
    
    // Language selector
    selectLanguage: "زبان منتخب کریں",
    selectLanguageAr: "اختر اللغة",
    
    // Common
    loading: "لوڈ ہو رہا ہے...",
    error: "خرابی",
    success: "کامیابی",
    cancel: "منسوخ",
    save: "محفوظ کریں",
    edit: "ترمیم",
    delete: "حذف",
    confirm: "تصدیق",
    close: "بند کریں",
    
    // Product related
    addToCart: "ٹوکری میں شامل کریں",
    viewDetails: "تفصیلات دیکھیں",
    price: "قیمت",
    quantity: "مقدار",
    inStock: "دستیاب",
    outOfStock: "دستیاب نہیں",
    
    // Contact
    getInTouch: "رابطے میں رہیں",
    sendMessage: "پیغام بھیجیں",
    name: "نام",
    email: "ای میل",
    phone: "فون",
    message: "پیغام",
    submit: "جمع کریں",
    
    // Footer
    allRightsReserved: "تمام حقوق محفوظ",
    followUs: "ہمیں فالو کریں",
    quickLinks: "فوری لنکس",
    contactInfo: "رابطے کی معلومات",
    
    // Hero Section
    store: "اسٹور",
    heroTitle: "بحرین میں بہترین ٹرینڈی تحائف اور گفٹس",
    heroDescription: "پریمیم تحائف جو دیرپا تاثر چھوڑتے ہیں۔ 2015 سے بحرین کی بادشاہت میں اہم کثیرالملکی کمپنیوں کی خدمت کر رہے ہیں۔",
    browseProducts: "مصنوعات براؤز کریں",
    contactUs: "ہم سے رابطہ کریں",
    yourDesignHere: "آپ کا ڈیزائن یہاں",
    
    // Search
    searchGifts: "تحائف تلاش کریں...",
    
    // Footer
    getToKnowUs: "ہمیں جانیں",
    aboutGoldenTag: "گولڈن ٹیگ کے بارے میں",
    careers: "کیریئر",
    pressReleases: "پریس ریلیز",
    goldenTagScience: "گولڈن ٹیگ سائنس",
    connectWithUs: "ہم سے جڑیں",
    makeMoneyWithUs: "ہمارے ساتھ پیسے کمائیں",
    sellOnGoldenTag: "گولڈن ٹیگ پر فروخت کریں",
    sellUnderAccelerator: "گولڈن ٹیگ ایکسلریٹر کے تحت فروخت کریں",
    protectAndBuildBrand: "اپنے برانڈ کی حفاظت اور تعمیر کریں",
    globalSelling: "گولڈن ٹیگ گلوبل سیلنگ",
    supplyToGoldenTag: "گولڈن ٹیگ کو سپلائی کریں",
    becomeAffiliate: "ایک ملحق بنیں",
    fulfillmentByGoldenTag: "گولڈن ٹیگ کی طرف سے تکمیل",
    advertiseProducts: "اپنے پروڈکٹس کی تشہیر کریں",
    goldenTagPay: "گولڈن ٹیگ پے آن مرچنٹس",
    letUsHelpYou: "ہمیں آپ کی مدد کرنے دیں",
    yourAccount: "آپ کا اکاؤنٹ",
    returnsCentre: "ریٹرن سینٹر",
    recallsAndSafety: "ریکال اور پروڈکٹ سیفٹی الرٹس",
    purchaseProtection: "100% خریداری کی حفاظت",
    appDownload: "گولڈن ٹیگ ایپ ڈاؤن لوڈ",
    help: "مدد",
    copyrightText: "کاپی رائٹ 2025 © گولڈن ٹیگ کارپوریٹ گفٹس۔ تمام حقوق محفوظ ہیں۔"
  },
  "ar-qa": {
    // Navigation
    home: "الرئيسية",
    about: "حول",
    products: "المنتجات",
    eCatalog: "الكتالوج الإلكتروني",
    contact: "اتصل بنا",
    
    // Language selector
    selectLanguage: "اختر اللغة",
    selectLanguageAr: "اختر اللغة",
    
    // Common
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح",
    cancel: "إلغاء",
    save: "حفظ",
    edit: "تعديل",
    delete: "حذف",
    confirm: "تأكيد",
    close: "إغلاق",
    
    // Product related
    addToCart: "أضف إلى السلة",
    viewDetails: "عرض التفاصيل",
    price: "السعر",
    quantity: "الكمية",
    inStock: "متوفر",
    outOfStock: "غير متوفر",
    
    // Contact
    getInTouch: "تواصل معنا",
    sendMessage: "إرسال رسالة",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    message: "الرسالة",
    submit: "إرسال",
    
    // Footer
    allRightsReserved: "جميع الحقوق محفوظة",
    followUs: "تابعنا",
    quickLinks: "روابط سريعة",
    contactInfo: "معلومات الاتصال",
    
    // Hero Section
    store: "المتجر",
    heroTitle: "أفضل الهدايا والهدايا العصرية في قطر",
    heroDescription: "هدايا مميزة تترك انطباعاً دائماً. نخدم الشركات متعددة الجنسيات الرائدة في دولة قطر منذ 2015.",
    browseProducts: "تصفح المنتجات",
    contactUs: "اتصل بنا",
    yourDesignHere: "تصميمك هنا",
    
    // Search
    searchGifts: "البحث عن الهدايا..."
  },
  "ar-bh": {
    // Navigation
    home: "الرئيسية",
    about: "حول",
    products: "المنتجات",
    eCatalog: "الكتالوج الإلكتروني",
    contact: "اتصل بنا",
    
    // Language selector
    selectLanguage: "اختر اللغة",
    selectLanguageAr: "اختر اللغة",
    
    // Common
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح",
    cancel: "إلغاء",
    save: "حفظ",
    edit: "تعديل",
    delete: "حذف",
    confirm: "تأكيد",
    close: "إغلاق",
    
    // Product related
    addToCart: "أضف إلى السلة",
    viewDetails: "عرض التفاصيل",
    price: "السعر",
    quantity: "الكمية",
    inStock: "متوفر",
    outOfStock: "غير متوفر",
    
    // Contact
    getInTouch: "تواصل معنا",
    sendMessage: "إرسال رسالة",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    message: "الرسالة",
    submit: "إرسال",
    
    // Footer
    allRightsReserved: "جميع الحقوق محفوظة",
    followUs: "تابعنا",
    quickLinks: "روابط سريعة",
    contactInfo: "معلومات الاتصال",
    
    // Hero Section
    store: "المتجر",
    heroTitle: "أفضل الهدايا والهدايا العصرية في البحرين",
    heroDescription: "هدايا مميزة تترك انطباعاً دائماً. نخدم الشركات متعددة الجنسيات الرائدة في مملكة البحرين منذ 2015.",
    browseProducts: "تصفح المنتجات",
    contactUs: "اتصل بنا",
    yourDesignHere: "تصميمك هنا",
    
    // Search
    searchGifts: "البحث عن الهدايا..."
  },
  "ar-sa": {
    // Navigation
    home: "الرئيسية",
    about: "حول",
    products: "المنتجات",
    eCatalog: "الكتالوج الإلكتروني",
    contact: "اتصل بنا",
    
    // Language selector
    selectLanguage: "اختر اللغة",
    selectLanguageAr: "اختر اللغة",
    
    // Common
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح",
    cancel: "إلغاء",
    save: "حفظ",
    edit: "تعديل",
    delete: "حذف",
    confirm: "تأكيد",
    close: "إغلاق",
    
    // Product related
    addToCart: "أضف إلى السلة",
    viewDetails: "عرض التفاصيل",
    price: "السعر",
    quantity: "الكمية",
    inStock: "متوفر",
    outOfStock: "غير متوفر",
    
    // Contact
    getInTouch: "تواصل معنا",
    sendMessage: "إرسال رسالة",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    message: "الرسالة",
    submit: "إرسال",
    
    // Footer
    allRightsReserved: "جميع الحقوق محفوظة",
    followUs: "تابعنا",
    quickLinks: "روابط سريعة",
    contactInfo: "معلومات الاتصال",
    
    // Hero Section
    store: "المتجر",
    heroTitle: "أفضل الهدايا والهدايا العصرية في المملكة العربية السعودية",
    heroDescription: "هدايا مميزة تترك انطباعاً دائماً. نخدم الشركات متعددة الجنسيات الرائدة في المملكة العربية السعودية منذ 2015.",
    browseProducts: "تصفح المنتجات",
    contactUs: "اتصل بنا",
    yourDesignHere: "تصميمك هنا",
    
    // Search
    searchGifts: "البحث عن الهدايا..."
  },
  "ar-ae": {
    // Navigation
    home: "الرئيسية",
    about: "حول",
    products: "المنتجات",
    eCatalog: "الكتالوج الإلكتروني",
    contact: "اتصل بنا",
    
    // Language selector
    selectLanguage: "اختر اللغة",
    selectLanguageAr: "اختر اللغة",
    
    // Common
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح",
    cancel: "إلغاء",
    save: "حفظ",
    edit: "تعديل",
    delete: "حذف",
    confirm: "تأكيد",
    close: "إغلاق",
    
    // Product related
    addToCart: "أضف إلى السلة",
    viewDetails: "عرض التفاصيل",
    price: "السعر",
    quantity: "الكمية",
    inStock: "متوفر",
    outOfStock: "غير متوفر",
    
    // Contact
    getInTouch: "تواصل معنا",
    sendMessage: "إرسال رسالة",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    message: "الرسالة",
    submit: "إرسال",
    
    // Footer
    allRightsReserved: "جميع الحقوق محفوظة",
    followUs: "تابعنا",
    quickLinks: "روابط سريعة",
    contactInfo: "معلومات الاتصال",
    
    // Hero Section
    store: "المتجر",
    heroTitle: "أفضل الهدايا والهدايا العصرية في دولة الإمارات العربية المتحدة",
    heroDescription: "هدايا مميزة تترك انطباعاً دائماً. نخدم الشركات متعددة الجنسيات الرائدة في دولة الإمارات العربية المتحدة منذ 2015.",
    browseProducts: "تصفح المنتجات",
    contactUs: "اتصل بنا",
    yourDesignHere: "تصميمك هنا",
    
    // Search
    searchGifts: "البحث عن الهدايا..."
  }
};

export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isRTL, setIsRTL] = useState(false);

  // RTL languages
  const rtlLanguages = ["ar", "ar-sa", "ar-qa", "ar-bh", "ar-eg", "ar-jo", "ar-lb", "ar-sy", "ar-iq", "ar-kw", "ar-om", "ar-ye", "ar-ma", "ar-tn", "ar-dz", "ar-ly", "ar-sd", "ar-so", "ar-dj", "ar-km", "ar-mr", "ar-td", "ar-er", "ar-il", "ar-ps", "he"];

  useEffect(() => {
    // Load saved language from localStorage
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem("selectedLanguage");
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    }
  }, []);

  useEffect(() => {
    // Update RTL state based on current language
    const baseLanguage = currentLanguage.split("-")[0];
    const isRTLLanguage = rtlLanguages.includes(currentLanguage) || rtlLanguages.includes(baseLanguage);
    setIsRTL(isRTLLanguage);
    
    // Update document direction and language only on client side
    if (typeof window !== 'undefined') {
      document.documentElement.dir = isRTLLanguage ? "rtl" : "ltr";
      document.documentElement.lang = currentLanguage;
      
      // Add RTL class to body for additional styling
      if (isRTLLanguage) {
        document.body.classList.add('rtl');
      } else {
        document.body.classList.remove('rtl');
      }
    }
  }, [currentLanguage]);

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
    if (typeof window !== 'undefined') {
      localStorage.setItem("selectedLanguage", languageCode);
    }
  };

  const t = (key, fallback = key) => {
    // First try the exact language code
    let translation = translations[currentLanguage];
    
    // If not found, try the base language (e.g., 'ar' for 'ar-sa')
    if (!translation) {
      const baseLanguage = currentLanguage.split("-")[0];
      translation = translations[baseLanguage];
      
      if (!translation) {
        console.warn(`Translation not found for language: ${currentLanguage} or base language: ${baseLanguage}`);
        return translations["en"][key] || fallback;
      }
    }
    
    return translation[key] || translations["en"][key] || fallback;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    isRTL,
    availableLanguages: Object.keys(translations)
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
