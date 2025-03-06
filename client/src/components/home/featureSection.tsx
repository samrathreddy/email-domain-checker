import React from 'react';
import { Card } from '@/components/ui/card';
import {Clock, Shield, Globe } from 'lucide-react';

const FeatureSection: React.FC = () => {
  return (
    <div className="py-20 bg-gray-900" id = "features">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-blue-900/30 bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300">
              <div className="p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-100">99.9% Uptime</h3>
                <p className="text-gray-400">Reliable service with constant monitoring and redundancy.</p>
              </div>
            </Card>
            <Card className="border-blue-900/30 bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300">
              <div className="p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-100">AI Verification</h3>
                <p className="text-gray-400">Along with DNS checks, list checks we use AI to categorize the email domain.</p>
              </div>
            </Card>
            <Card className="border-blue-900/30 bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300">
              <div className="p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-100">Global Scale</h3>
                <p className="text-gray-400">Worldwide infrastructure for fast response times.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
  );
};

export default FeatureSection; 