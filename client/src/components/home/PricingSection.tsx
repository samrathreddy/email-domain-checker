import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const PricingSection: React.FC = () => {
  return (
    <div className="py-20 bg-gray-900" id = "pricing">
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-100">Simple, Transparent Pricing</h2>
            <p className="text-gray-400">Choose the plan that fits your needs</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: 'Starter',
                price: '$9.99 / month',
                features: ['100,000 checks / month', 'As low as 0.0001 USD per check', 'Basic validation', 'Email support'],
              },
              {
                name: 'Pro',
                price: '$69.99 / month',
                features: ['1,000,000 checks / month', 'As low as 0.00007 USD per check', 'Advanced validation', 'Email support'],
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                features: ['Unlimited checks', 'As low as compare to other plans', 'Custom features', '24/7 support'],
              },
            ].map((plan) => (
              <Card key={plan.name} className="border-blue-900/30 bg-gray-900/80 backdrop-blur-sm hover:scale-105 hover:shadow-lg transition-all duration-300">
                <div className="p-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-100">{plan.name}</h3>
                    <div className="text-3xl font-bold text-blue-400">{plan.price}</div>
                    <p className="text-sm text-gray-400">per month</p>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="relative w-full bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 overflow-hidden">
                    <span className="absolute inset-0 bg-white transition-transform duration-300 transform scale-x-0 hover:scale-x-100" />
                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
  );
};

export default PricingSection; 