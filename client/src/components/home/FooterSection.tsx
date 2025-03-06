import { Zap } from 'lucide-react';

const scrollToFeatures = () => {
  const featuresSection = document.getElementById('features');
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const scrollToPricing = () => {
  const pricingSection = document.getElementById('pricing');
  if (pricingSection) {
    pricingSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const FooterSection: React.FC = () => {
  return (
    <footer className="py-20 bg-gray-900 border-t border-blue-900/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-blue-400" />
                <span className="font-bold text-gray-100">Email Domain Checker</span>
              </div>
              <p className="text-sm text-gray-400">
                Enterprise-grade email validation service.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-100">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
              <li 
                  role="button" 
                  tabIndex={0} 
                  onClick={() => scrollToFeatures()} 
                  onKeyDown={(e) => e.key === 'Enter' && scrollToFeatures()}
                >
                  Features
                </li>
                <li 
                  role="button" 
                  tabIndex={0} 
                  onClick={() => scrollToPricing()} 
                  onKeyDown={(e) => e.key === 'Enter' && scrollToPricing()}
                >
                  Pricing
                </li>
                <li>API</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-100">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-100">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-blue-900/30 text-center text-sm text-gray-400">
            <p>© 2025 Email Domain Checker by{' '}
              <a 
                href="https://www.linkedin.com/in/samrath-reddy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Samrath
              </a>
            </p>
          </div>
        </div>
      </footer>
  );
};

export default FooterSection; 