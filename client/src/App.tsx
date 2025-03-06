import HeaderSection from './components/home/HeaderSection';
import FeatureSection from './components/home/featureSection';
import PartnersSection from './components/home/PartnersSection';
import PricingSection from './components/home/PricingSection';
import FooterSection from './components/home/FooterSection';
import EmailValidator from './components/home/EmailValidator';

function App() {
  return (
    <div className="min-h-screen text-gray-100">
      <HeaderSection />
      <EmailValidator />
      <FeatureSection />
      <PartnersSection />
      <PricingSection />
      <FooterSection />
    </div>
  );
}

export default App;