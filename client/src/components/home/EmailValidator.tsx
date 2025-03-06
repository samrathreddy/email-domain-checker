import { useState } from 'react';
import { Mail, Shield, AlertCircle, Check, X, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface EmailCheckResult {
  mail: string;
  isValidDomain: boolean;
  isPublicMail: boolean;
  isKnownTemp: boolean;
  isKnownBusinessMail: boolean;
  isAiBusinessMail: boolean;
  isAiTemp: boolean;
}

const EmailValidator = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmailCheckResult | null>(null);
  const { toast } = useToast();

  const handleCheck = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to check.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/check-email?email=${encodeURIComponent(email)}`, {
        method: 'GET',
      });
      if (!response.ok) throw new Error('Failed to check email');
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  const ResultItem = ({ label, value, icon: Icon, tooltip }: { label: string; value: boolean; icon: any; tooltip: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-300 ${value ? 'bg-blue-600/20 hover:bg-blue-600/30' : 'bg-gray-800/50 hover:bg-gray-800'}`}>
            <Icon className={`w-5 h-15 ${value ? 'text-blue-400' : 'text-gray-400'}`} />
            <span className="flex-1 text-sm font-medium text-gray-100">{label}</span>
            {value ? (
              <Check className="w-5 h-5 text-blue-400" />
            ) : (
              <X className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="relative overflow-hidden bg-[#111827] py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent" />
      <div className="relative max-w-5xl mx-auto px-6 space-y-10">
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-3 animate-fade-in">
            <Zap className="w-12 h-12 text-blue-500 animate-pulse" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
              Email Domain Checker
            </h1>
          </div>
          <p className="text-gray-300 text-center max-w-lg mx-auto text-lg animate-fade-in-up">
            Instantly validate and categorise email addresses with our powerful validation service along with AI verification.
          </p>
        </div>
        <Card className="border border-blue-900/30 bg-gray-900/80 backdrop-blur-xl shadow-2xl animate-fade-in-up">
          <div className="p-6 space-y-6">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter email address to validate..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-gray-800/50 border-blue-900/30 focus-visible:ring-blue-500/30 text-gray-100"
              />
              <Button 
                onClick={handleCheck} 
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 animate-pulse" />
                    Validating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Validate
                  </span>
                )}
              </Button>
            </div>

            {result && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 pb-4 border-b border-blue-900/30">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-medium text-gray-100">Results for <span className="text-blue-400">{result.mail}</span></h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <ResultItem
                    label="Valid Domain"
                    value={result.isValidDomain}
                    icon={Shield}
                    tooltip="Checks if the email domain is valid and exists"
                  />
                  <ResultItem
                    label="Public Email Service"
                    value={result.isPublicMail}
                    icon={Mail}
                    tooltip="Indicates if the email is from a public email service (e.g., Gmail, Yahoo)"
                  />
                  <ResultItem
                    label="Temporary Email"
                    value={result.isKnownTemp}
                    icon={AlertCircle}
                    tooltip="Detects if the email is from a known temporary email service"
                  />
                  <ResultItem
                    label="Business Email"
                    value={result.isKnownBusinessMail}
                    icon={Mail}
                    tooltip="Identifies if the email is from a known business domain"
                  />
                  <ResultItem
                    label="AI Business Email"
                    value={result.isAiBusinessMail}
                    icon={Shield}
                    tooltip="AI flags as business email domain"
                  />
                  <ResultItem
                    label="AI Temporary Email"
                    value={result.isAiTemp}
                    icon={AlertCircle}
                    tooltip="AI flags as temp mail domain"
                  />
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmailValidator; 