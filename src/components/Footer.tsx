import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-6 border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {year} Sigma Word Counter by Brainrot Community. All rights reserved.
        </p>
        <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          Built with precision. Engineered for efficiency.
        </div>
      </div>
    </footer>
  );
};

export default Footer;