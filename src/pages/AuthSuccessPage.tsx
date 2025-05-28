import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PiggyBank, CheckCircle } from 'lucide-react';

const AuthSuccessPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4" data-id="hnzmu0jln" data-path="src/pages/AuthSuccessPage.tsx">
      <Card className="w-full max-w-md shadow-2xl" data-id="mnaimm4ha" data-path="src/pages/AuthSuccessPage.tsx">
        <CardHeader className="text-center pb-4" data-id="d7s8d9dtu" data-path="src/pages/AuthSuccessPage.tsx">
          <div className="flex justify-center mb-4" data-id="e552jlx5h" data-path="src/pages/AuthSuccessPage.tsx">
            <div className="relative" data-id="3uhauinxi" data-path="src/pages/AuthSuccessPage.tsx">
              <PiggyBank className="h-16 w-16 text-blue-600" data-id="04dlhxscq" data-path="src/pages/AuthSuccessPage.tsx" />
              <CheckCircle className="h-8 w-8 text-green-600 absolute -top-2 -right-2 bg-white rounded-full" data-id="4s0b9xaz3" data-path="src/pages/AuthSuccessPage.tsx" />
            </div>
          </div>
          <CardTitle className="text-2xl text-green-600" data-id="d0e9ysvv0" data-path="src/pages/AuthSuccessPage.tsx">Email Verified Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6" data-id="8ribua4ig" data-path="src/pages/AuthSuccessPage.tsx">
          <div className="space-y-2" data-id="rx2vhcw24" data-path="src/pages/AuthSuccessPage.tsx">
            <p className="text-gray-600" data-id="gcq6gvyez" data-path="src/pages/AuthSuccessPage.tsx">
              Your account has been successfully verified. Welcome to Budget Buddy!
            </p>
            <p className="text-sm text-gray-500" data-id="sn4p4lcxe" data-path="src/pages/AuthSuccessPage.tsx">
              You can now start managing your finances like a pro.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg" data-id="rbyg6c3b9" data-path="src/pages/AuthSuccessPage.tsx">
            <p className="text-blue-800 font-medium" data-id="syfahtmsl" data-path="src/pages/AuthSuccessPage.tsx">
              Redirecting to login in {countdown} seconds...
            </p>
          </div>

          <div className="space-y-3" data-id="enpa8ky9o" data-path="src/pages/AuthSuccessPage.tsx">
            <Button
              onClick={() => navigate('/')}
              className="w-full"
              size="lg" data-id="rfey7oh3x" data-path="src/pages/AuthSuccessPage.tsx">

              Go to Login Now
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full" data-id="lggr6arcp" data-path="src/pages/AuthSuccessPage.tsx">

              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>);

};

export default AuthSuccessPage;