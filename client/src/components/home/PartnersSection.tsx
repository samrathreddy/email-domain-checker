import { Building2, Globe, Cpu, Shield, MessageSquare, Cloud, Building, CircuitBoard } from 'lucide-react';

const PartnersSection = () => {
  const partners = [
    { name: 'Microsoft', icon: Building2, category: 'Technology' },
    { name: 'Amazon', icon: Globe, category: 'E-commerce' },
    { name: 'Tesla', icon: CircuitBoard, category: 'Automotive' },
    { name: 'IBM', icon: Cpu, category: 'Enterprise' },
    { name: 'Oracle', icon: Cloud, category: 'Cloud' },
    { name: 'Salesforce', icon: Building, category: 'SaaS' },
    { name: 'Intel', icon: Cpu, category: 'Hardware' },
    { name: 'Samsung', icon: CircuitBoard, category: 'Electronics' },
    { name: 'JPMorgan', icon: Building2, category: 'Finance' },
    { name: 'Siemens', icon: Globe, category: 'Industry' },
    { name: 'Ramp', icon: Building, category: 'Finance' },
    { name: 'Cursor', icon: Shield, category: 'GenAI' },
    { name: 'Cisco', icon: Shield, category: 'Networking' },
    { name: 'Adobe', icon: MessageSquare, category: 'Software' },
    { name: 'Nike', icon: Globe, category: 'Retail' }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">
            Trusted by Industry Leaders
          </h2>
          <p className="text-l text-gray-400">
            Empowering global enterprises with cutting-edge solutions
          </p>
        </div>

        <div className="mt-16 relative overflow">
          {/* First row */}
          <div className="flex animate-scroll-slow">
            <div className="flex space-x-8 min-w-full">
              {partners.slice(0, 8).map((partner) => (
                <div
                  key={partner.name}
                  className="flex-none w-64 transform hover:scale-105 transition-transform duration-200"
                >
                  <div className="h-32 bg-gray-800 rounded-xl border border-gray-700 p-6 flex flex-col items-center justify-center hover:border-blue-500 hover:bg-gray-700/50">
                    <partner.icon className="w-8 h-8 text-blue-400" />
                    <p className="mt-3 font-semibold text-gray-200">{partner.name}</p>
                    <p className="text-sm text-gray-400">{partner.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second row */}
          <div className="flex animate-scroll-slow-reverse mt-8">
            <div className="flex space-x-8 min-w-full">
              {partners.slice(7).map((partner) => (
                <div
                  key={partner.name}
                  className="flex-none w-64 transform hover:scale-105 transition-transform duration-200"
                >
                  <div className="h-32 bg-gray-800 rounded-xl border border-gray-700 p-6 flex flex-col items-center justify-center hover:border-blue-500 hover:bg-gray-700/50">
                    <partner.icon className="w-8 h-8 text-blue-400" />
                    <p className="mt-3 font-semibold text-gray-200">{partner.name}</p>
                    <p className="text-sm text-gray-400">{partner.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;