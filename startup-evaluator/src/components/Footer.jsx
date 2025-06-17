const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-medium text-primary mb-4">PitchPilot</div>
            <p className="text-gray-600 text-sm">
              AI-powered startup validation platform
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-primary mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Features</li>
              <li>Pricing</li>
              <li>Use Cases</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-primary mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>About</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-primary mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Help Center</li>
              <li>Documentation</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-sm text-gray-500">
          © 2025 PitchPilot. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
