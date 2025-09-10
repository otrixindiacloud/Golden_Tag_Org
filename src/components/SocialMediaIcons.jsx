import { Facebook, Instagram } from 'lucide-react';

const SocialMediaIcons = () => {
  return (
    <div className="flex space-x-4">
      <a 
        href="https://www.facebook.com/Goldentagbh" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-blue-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-700"
        aria-label="Follow us on Facebook"
      >
        <Facebook size={18} />
      </a>
      <a 
        href="https://www.instagram.com/goldentag_bh/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-pink-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-700"
        aria-label="Follow us on Instagram"
      >
        <Instagram size={18} />
      </a>
    </div>
  );
};

export default SocialMediaIcons;
