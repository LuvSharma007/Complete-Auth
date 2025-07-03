import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 mt-10 border-t">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center flex-wrap">
        <p className="text-sm">&copy; {new Date().getFullYear()} AuthFlow. All rights reserved.</p>
        <div className="flex gap-4 text-sm">
          <a href="/" className="hover:text-blue-600">Home</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer