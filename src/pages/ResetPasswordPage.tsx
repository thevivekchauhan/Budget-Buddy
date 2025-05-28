import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PiggyBank, KeyRound } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      toast({
        title: "Invalid Reset Link",
        description: "The password reset link is invalid or expired.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await window.ezsite.apis.resetPassword({
        token: token!,
        password: password
      });

      if (error) {
        throw new Error(error);
      }

      toast({
        title: "Password Reset Successful",
        description: "Your password has been reset. You can now log in with your new password."
      });

      navigate('/');
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast({
        title: "Reset Failed",
        description: error.message || "Failed to reset password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4" data-id="lecs03cqi" data-path="src/pages/ResetPasswordPage.tsx">
      <Card className="w-full max-w-md shadow-2xl" data-id="ujlzi2trc" data-path="src/pages/ResetPasswordPage.tsx">
        <CardHeader className="text-center" data-id="7jnp2n1tq" data-path="src/pages/ResetPasswordPage.tsx">
          <div className="flex justify-center mb-4" data-id="zlj9kpj4y" data-path="src/pages/ResetPasswordPage.tsx">
            <div className="bg-blue-100 rounded-full p-3" data-id="4d3permik" data-path="src/pages/ResetPasswordPage.tsx">
              <KeyRound className="h-8 w-8 text-blue-600" data-id="ke0i0o6v5" data-path="src/pages/ResetPasswordPage.tsx" />
            </div>
          </div>
          <CardTitle className="text-2xl" data-id="t671y9cev" data-path="src/pages/ResetPasswordPage.tsx">Reset Your Password</CardTitle>
          <p className="text-gray-600" data-id="gv12qsqrz" data-path="src/pages/ResetPasswordPage.tsx">Enter your new password below</p>
        </CardHeader>
        <CardContent data-id="l2viazavv" data-path="src/pages/ResetPasswordPage.tsx">
          <form onSubmit={handleSubmit} className="space-y-4" data-id="cg3kjmdsg" data-path="src/pages/ResetPasswordPage.tsx">
            <div className="space-y-2" data-id="vg6vyy96u" data-path="src/pages/ResetPasswordPage.tsx">
              <Label htmlFor="password" data-id="743lag5i6" data-path="src/pages/ResetPasswordPage.tsx">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="transition-all duration-200 focus:scale-105" data-id="on4j6smbo" data-path="src/pages/ResetPasswordPage.tsx" />

            </div>
            <div className="space-y-2" data-id="s8p3lo6jd" data-path="src/pages/ResetPasswordPage.tsx">
              <Label htmlFor="confirmPassword" data-id="2d710wza4" data-path="src/pages/ResetPasswordPage.tsx">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="transition-all duration-200 focus:scale-105" data-id="z0wrqfj8b" data-path="src/pages/ResetPasswordPage.tsx" />

            </div>
            <Button type="submit" className="w-full" disabled={isLoading} data-id="5mjelwkbl" data-path="src/pages/ResetPasswordPage.tsx">
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
          </form>
          
          <div className="mt-6 pt-4 border-t text-center" data-id="e7wrewot7" data-path="src/pages/ResetPasswordPage.tsx">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-700" data-id="awtmsub6s" data-path="src/pages/ResetPasswordPage.tsx">

              ← Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>);

};

export default ResetPasswordPage;