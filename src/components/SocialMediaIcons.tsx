const SocialMediaIcons = () => {
  return (
    <div className="flex space-x-4">
      <a 
        href="https://www.facebook.com/Goldentagbh" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors duration-200"
        aria-label="Follow us on Facebook"
      >
        📘
      </a>
      <a 
        href="https://www.instagram.com/goldentag_bh/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors duration-200"
        aria-label="Follow us on Instagram"
      >
        📷
      </a>
      <a 
        href="https://twitter.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors duration-200"
        aria-label="Follow us on Twitter"
      >
        🐦
      </a>
      <a 
        href="https://linkedin.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors duration-200"
        aria-label="Follow us on LinkedIn"
      >
        💼
      </a>
    </div>
  );
};

export default SocialMediaIcons;
