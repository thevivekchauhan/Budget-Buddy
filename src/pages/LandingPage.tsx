import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Wallet, TrendingUp, Target, Bell, PiggyBank, BookOpen, Star, Shield, Smartphone, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (isLogin: boolean, email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      if (isLogin) {
        const { error } = await window.ezsite.apis.login({ email, password });
        if (error) {
          throw new Error(error);
        }
        toast({
          title: "Welcome back!",
          description: "You've been logged in successfully."
        });
      } else {
        const { error } = await window.ezsite.apis.register({ email, password });
        if (error) {
          throw new Error(error);
        }
        toast({
          title: "Account created successfully!",
          description: "Please check your email for verification."
        });
        // Don't navigate immediately for signup, wait for email verification
        return;
      }

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const AuthForm = ({ isLogin }: {isLogin: boolean;}) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
    });
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');

    const handleForgotPassword = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const { error } = await window.ezsite.apis.sendResetPwdEmail({ email: forgotEmail });
        if (error) {
          throw new Error(error);
        }
        toast({
          title: "Reset Email Sent",
          description: "Check your email for password reset instructions."
        });
        setShowForgotPassword(false);
        setForgotEmail('');
      } catch (error: any) {
        console.error('Forgot password error:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to send reset email. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleAuth(isLogin, formData.email, formData.password, formData.name);
    };

    return (
      <div data-id="k7tbbh5o6" data-path="src/pages/LandingPage.tsx">
        <form onSubmit={handleSubmit} className="space-y-4" data-id="cauug8x0l" data-path="src/pages/LandingPage.tsx">
          {!isLogin &&
          <div className="space-y-2" data-id="q76cjm8uo" data-path="src/pages/LandingPage.tsx">
              <Label htmlFor="name" data-id="lwnyia12c" data-path="src/pages/LandingPage.tsx">Full Name</Label>
              <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required={!isLogin}
              className="transition-all duration-200 focus:scale-105" data-id="62bgbvud7" data-path="src/pages/LandingPage.tsx" />

            </div>
          }
          <div className="space-y-2" data-id="555jre46s" data-path="src/pages/LandingPage.tsx">
            <Label htmlFor="email" data-id="6w0tlaos5" data-path="src/pages/LandingPage.tsx">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
              className="transition-all duration-200 focus:scale-105" data-id="e192183qx" data-path="src/pages/LandingPage.tsx" />

          </div>
          <div className="space-y-2" data-id="d7jlq88oa" data-path="src/pages/LandingPage.tsx">
            <Label htmlFor="password" data-id="qyvdnh5qn" data-path="src/pages/LandingPage.tsx">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              required
              className="transition-all duration-200 focus:scale-105" data-id="owddx0mdf" data-path="src/pages/LandingPage.tsx" />

          </div>
          <Button type="submit" className="w-full" disabled={isLoading} data-id="nbp6cgg7q" data-path="src/pages/LandingPage.tsx">
            {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </Button>
          
          {isLogin &&
          <div className="mt-4 text-center" data-id="02gaefp63" data-path="src/pages/LandingPage.tsx">
              <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowForgotPassword(true)}
              className="text-blue-600 hover:text-blue-700" data-id="twef3dfnq" data-path="src/pages/LandingPage.tsx">

                Forgot password?
              </Button>
            </div>
          }
        </form>
        
        {showForgotPassword &&
        <div className="mt-4 p-4 border rounded-lg bg-blue-50" data-id="0m838z8jk" data-path="src/pages/LandingPage.tsx">
            <h4 className="font-medium mb-2" data-id="a3wdn1nhp" data-path="src/pages/LandingPage.tsx">Reset Password</h4>
            <form onSubmit={handleForgotPassword} className="space-y-3" data-id="m3dg6zk63" data-path="src/pages/LandingPage.tsx">
              <Input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required data-id="xcclfg6ur" data-path="src/pages/LandingPage.tsx" />

              <div className="flex gap-2" data-id="mucjm4fmg" data-path="src/pages/LandingPage.tsx">
                <Button type="submit" size="sm" disabled={isLoading} data-id="nyif4xe6w" data-path="src/pages/LandingPage.tsx">
                  {isLoading ? 'Sending...' : 'Send Reset Email'}
                </Button>
                <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotEmail('');
                }} data-id="rzatk7nks" data-path="src/pages/LandingPage.tsx">

                  Cancel
                </Button>
              </div>
            </form>
          </div>
        }
      </div>);

  };

  const features = [
  {
    icon: <Wallet className="h-8 w-8 text-blue-600" data-id="swpokdvx5" data-path="src/pages/LandingPage.tsx" />,
    title: "Expense Tracking",
    description: "Track every rupee you spend with smart categorization and insights"
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-green-600" data-id="r5xff9gil" data-path="src/pages/LandingPage.tsx" />,
    title: "Income Management",
    description: "Monitor pocket money, stipends, and part-time income in one place"
  },
  {
    icon: <Target className="h-8 w-8 text-purple-600" data-id="gma7to66b" data-path="src/pages/LandingPage.tsx" />,
    title: "Budget Planning",
    description: "Set monthly budgets and track spending against your limits"
  },
  {
    icon: <Bell className="h-8 w-8 text-orange-600" data-id="55jjbtjrd" data-path="src/pages/LandingPage.tsx" />,
    title: "Bill Reminders",
    description: "Never miss rent, subscriptions, or other recurring payments"
  },
  {
    icon: <PiggyBank className="h-8 w-8 text-pink-600" data-id="3mx8u04oy" data-path="src/pages/LandingPage.tsx" />,
    title: "Savings Goals",
    description: "Set and track progress towards your financial goals"
  },
  {
    icon: <BookOpen className="h-8 w-8 text-indigo-600" data-id="f6b4mfnt5" data-path="src/pages/LandingPage.tsx" />,
    title: "Financial Tips",
    description: "Learn money management with student-friendly financial advice"
  }];


  const testimonials = [
  {
    name: "Priya Sharma",
    role: "Engineering Student",
    content: "This app helped me save ₹5000 in just 2 months by tracking my daily expenses!",
    rating: 5
  },
  {
    name: "Rahul Gupta",
    role: "MBA Student",
    content: "Finally, an app that understands student finances. Love the budget planning feature!",
    rating: 5
  },
  {
    name: "Anita Verma",
    role: "Medical Student",
    content: "The bill reminders saved me from late fees multiple times. Highly recommended!",
    rating: 5
  }];


  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
      data-id="1ova9ta4x"
      data-path="src/pages/LandingPage.tsx"
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
        data-id="h9xwbyyx3"
        data-path="src/pages/LandingPage.tsx"
      >
        <div
          className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center"
          data-id="tjqt8g4ry"
          data-path="src/pages/LandingPage.tsx"
        >
          <div
            className="flex items-center space-x-2"
            data-id="a0oflnx5y"
            data-path="src/pages/LandingPage.tsx"
          >
            <PiggyBank
              className="h-6 w-6 md:h-8 md:w-8 text-blue-600"
              data-id="anvspglk5"
              data-path="src/pages/LandingPage.tsx"
            />
            <span
              className="text-lg md:text-xl font-bold text-gray-800"
              data-id="oiur7xg1p"
              data-path="src/pages/LandingPage.tsx"
            >
              Budget Buddy
            </span>
          </div>
          <div
            className="flex items-center space-x-2 md:space-x-4"
            data-id="j6a2vyj64"
            data-path="src/pages/LandingPage.tsx"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-id="wwf3ntvn2"
              data-path="src/pages/LandingPage.tsx"
            >
              <span
                className="hidden sm:inline"
                data-id="s269j2orf"
                data-path="src/pages/LandingPage.tsx"
              >
                Features
              </span>
              <span
                className="sm:hidden"
                data-id="i8kmgvahm"
                data-path="src/pages/LandingPage.tsx"
              >
                Info
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                document
                  .getElementById("auth")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-id="3zp0wwdck"
              data-path="src/pages/LandingPage.tsx"
            >
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="py-20 px-4"
        data-id="wldpnqsy7"
        data-path="src/pages/LandingPage.tsx"
      >
        <div
          className="container mx-auto text-center max-w-4xl"
          data-id="xdv1tbdx8"
          data-path="src/pages/LandingPage.tsx"
        >
          <Badge
            variant="secondary"
            className="mb-6"
            data-id="3epm6ofkt"
            data-path="src/pages/LandingPage.tsx"
          >
            Made for Track expenses, by Vivek Chauhan
          </Badge>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight"
            data-id="kgkzk90yz"
            data-path="src/pages/LandingPage.tsx"
          >
            Master Your
            <span
              className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
              data-id="1vuoa8rf8"
              data-path="src/pages/LandingPage.tsx"
            >
              {" "}
              Money
            </span>
            <br data-id="53pb2fyeh" data-path="src/pages/LandingPage.tsx" />
            As a
            <span
              className="bg-gradient-to-r from-green-600 to-violet-600 bg-clip-text text-transparent"
              data-id="1vuoa8rf8"
              data-path="src/pages/LandingPage.tsx"
            >
              {" "}
              Vivek's User
            </span>
          </h1>
          <p
            className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
            data-id="z1mtq8n2k"
            data-path="src/pages/LandingPage.tsx"
          >
            Track expenses, plan budgets, and achieve your financial goals with
            the most comprehensive budget management app designed specifically
            for students in India.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-id="uteo22b92"
            data-path="src/pages/LandingPage.tsx"
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() =>
                document
                  .getElementById("auth")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-id="1gjruea0p"
              data-path="src/pages/LandingPage.tsx"
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-id="j7zvkxfav"
              data-path="src/pages/LandingPage.tsx"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 pt-6 md:pt-8 border-t"
            data-id="4wdhxqqiz"
            data-path="src/pages/LandingPage.tsx"
          >
            <div
              className="text-center"
              data-id="0sljqnvbn"
              data-path="src/pages/LandingPage.tsx"
            >
              <div
                className="text-2xl md:text-3xl font-bold text-blue-600"
                data-id="6mse9146x"
                data-path="src/pages/LandingPage.tsx"
              >
                10K+
              </div>
              <div
                className="text-sm md:text-base text-gray-600"
                data-id="ppab1ezwm"
                data-path="src/pages/LandingPage.tsx"
              >
                Students
              </div>
            </div>
            <div
              className="text-center"
              data-id="xm99cyyps"
              data-path="src/pages/LandingPage.tsx"
            >
              <div
                className="text-2xl md:text-3xl font-bold text-green-600"
                data-id="xhnhvp3ej"
                data-path="src/pages/LandingPage.tsx"
              >
                ₹50L+
              </div>
              <div
                className="text-sm md:text-base text-gray-600"
                data-id="sdokznjwq"
                data-path="src/pages/LandingPage.tsx"
              >
                Money Saved
              </div>
            </div>
            <div
              className="text-center"
              data-id="yzacqnwqq"
              data-path="src/pages/LandingPage.tsx"
            >
              <div
                className="text-2xl md:text-3xl font-bold text-purple-600"
                data-id="pp0rfoue3"
                data-path="src/pages/LandingPage.tsx"
              >
                4.9★
              </div>
              <div
                className="text-sm md:text-base text-gray-600"
                data-id="ebxdza8zd"
                data-path="src/pages/LandingPage.tsx"
              >
                Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 bg-white"
        data-id="chjeev1st"
        data-path="src/pages/LandingPage.tsx"
      >
        <div
          className="container mx-auto max-w-6xl"
          data-id="9aj8apj9t"
          data-path="src/pages/LandingPage.tsx"
        >
          <div
            className="text-center mb-16"
            data-id="k03ipbyok"
            data-path="src/pages/LandingPage.tsx"
          >
            <h2
              className="text-4xl font-bold text-gray-800 mb-4"
              data-id="81tcmf1o1"
              data-path="src/pages/LandingPage.tsx"
            >
              Everything You Need to Manage Money
            </h2>
            <p
              className="text-xl text-gray-600"
              data-id="st7zflkre"
              data-path="src/pages/LandingPage.tsx"
            >
              Powerful features designed specifically for student life
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            data-id="s8h626vnb"
            data-path="src/pages/LandingPage.tsx"
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                data-id="qujrz88dx"
                data-path="src/pages/LandingPage.tsx"
              >
                <CardHeader
                  className="pb-4"
                  data-id="zt74d3e67"
                  data-path="src/pages/LandingPage.tsx"
                >
                  <div
                    className="mb-3 md:mb-4"
                    data-id="brlj78hky"
                    data-path="src/pages/LandingPage.tsx"
                  >
                    {feature.icon}
                  </div>
                  <CardTitle
                    className="text-lg md:text-xl"
                    data-id="a1ocnm0r8"
                    data-path="src/pages/LandingPage.tsx"
                  >
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent
                  data-id="71sm0c9nj"
                  data-path="src/pages/LandingPage.tsx"
                >
                  <CardDescription
                    className="text-sm md:text-base"
                    data-id="f4r6wpa2m"
                    data-path="src/pages/LandingPage.tsx"
                  >
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="py-20 px-4 bg-gray-50"
        data-id="qn640vohn"
        data-path="src/pages/LandingPage.tsx"
      >
        <div
          className="container mx-auto max-w-6xl"
          data-id="6ioe11ny6"
          data-path="src/pages/LandingPage.tsx"
        >
          <div
            className="text-center mb-16"
            data-id="nd8ybgt13"
            data-path="src/pages/LandingPage.tsx"
          >
            <h2
              className="text-4xl font-bold text-gray-800 mb-4"
              data-id="sma11gjor"
              data-path="src/pages/LandingPage.tsx"
            >
              Why Students Love Us
            </h2>
            <p
              className="text-xl text-gray-600"
              data-id="fz2479k62"
              data-path="src/pages/LandingPage.tsx"
            >
              Built with student needs in mind
            </p>
          </div>

          <div
            className="grid md:grid-cols-3 gap-8"
            data-id="i04c0rnrj"
            data-path="src/pages/LandingPage.tsx"
          >
            <div
              className="text-center"
              data-id="nda4e5h4h"
              data-path="src/pages/LandingPage.tsx"
            >
              <div
                className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                data-id="yahing2a"
                data-path="src/pages/LandingPage.tsx"
              >
                <Shield
                  className="h-8 w-8 text-blue-600"
                  data-id="jbq8jeexl"
                  data-path="src/pages/LandingPage.tsx"
                />
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                data-id="767jhmobu"
                data-path="src/pages/LandingPage.tsx"
              >
                Secure & Private
              </h3>
              <p
                className="text-gray-600"
                data-id="nc7ez71vs"
                data-path="src/pages/LandingPage.tsx"
              >
                Your financial data is encrypted and secure. We never share your
                information.
              </p>
            </div>
            <div
              className="text-center"
              data-id="10822a1b3"
              data-path="src/pages/LandingPage.tsx"
            >
              <div
                className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                data-id="goiydet41"
                data-path="src/pages/LandingPage.tsx"
              >
                <Smartphone
                  className="h-8 w-8 text-green-600"
                  data-id="c9yeg6inq"
                  data-path="src/pages/LandingPage.tsx"
                />
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                data-id="5rbqv0z7i"
                data-path="src/pages/LandingPage.tsx"
              >
                Mobile First
              </h3>
              <p
                className="text-gray-600"
                data-id="vk3s79pkn"
                data-path="src/pages/LandingPage.tsx"
              >
                Optimized for mobile devices so you can track expenses on the
                go.
              </p>
            </div>
            <div
              className="text-center"
              data-id="u98xt5pkp"
              data-path="src/pages/LandingPage.tsx"
            >
              <div
                className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                data-id="089pxj2jx"
                data-path="src/pages/LandingPage.tsx"
              >
                <Users
                  className="h-8 w-8 text-purple-600"
                  data-id="cg2fv490i"
                  data-path="src/pages/LandingPage.tsx"
                />
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                data-id="j6lw8tpb0"
                data-path="src/pages/LandingPage.tsx"
              >
                Student Community
              </h3>
              <p
                className="text-gray-600"
                data-id="2cm6u41xe"
                data-path="src/pages/LandingPage.tsx"
              >
                Join thousands of students who are mastering their finances
                together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="py-20 px-4 bg-white"
        data-id="upbax5djd"
        data-path="src/pages/LandingPage.tsx"
      >
        <div
          className="container mx-auto max-w-6xl"
          data-id="x2dh135r7"
          data-path="src/pages/LandingPage.tsx"
        >
          <div
            className="text-center mb-16"
            data-id="5hfxtpivr"
            data-path="src/pages/LandingPage.tsx"
          >
            <h2
              className="text-4xl font-bold text-gray-800 mb-4"
              data-id="hgfuy365p"
              data-path="src/pages/LandingPage.tsx"
            >
              What Students Say
            </h2>
            <p
              className="text-xl text-gray-600"
              data-id="eh1qoglmo"
              data-path="src/pages/LandingPage.tsx"
            >
              Real feedback from real users
            </p>
          </div>

          <div
            className="grid md:grid-cols-3 gap-8"
            data-id="gr88n4vw4"
            data-path="src/pages/LandingPage.tsx"
          >
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg"
                data-id="iypcg1ygg"
                data-path="src/pages/LandingPage.tsx"
              >
                <CardContent
                  className="pt-6"
                  data-id="p913lvm6u"
                  data-path="src/pages/LandingPage.tsx"
                >
                  <div
                    className="flex mb-4"
                    data-id="2btwd7oiy"
                    data-path="src/pages/LandingPage.tsx"
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                        data-id="4zro2mwiv"
                        data-path="src/pages/LandingPage.tsx"
                      />
                    ))}
                  </div>
                  <p
                    className="text-gray-600 mb-4 italic"
                    data-id="0vgt8k6qo"
                    data-path="src/pages/LandingPage.tsx"
                  >
                    "{testimonial.content}"
                  </p>
                  <div
                    data-id="1ozxzuik4"
                    data-path="src/pages/LandingPage.tsx"
                  >
                    <div
                      className="font-semibold"
                      data-id="r25aantww"
                      data-path="src/pages/LandingPage.tsx"
                    >
                      {testimonial.name}
                    </div>
                    <div
                      className="text-sm text-gray-500"
                      data-id="i8r7nqtnq"
                      data-path="src/pages/LandingPage.tsx"
                    >
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Auth Section */}
      <section
        id="auth"
        className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600"
        data-id="l2m697y31"
        data-path="src/pages/LandingPage.tsx"
      >
        <div
          className="container mx-auto max-w-md"
          data-id="66os5qwws"
          data-path="src/pages/LandingPage.tsx"
        >
          <Card
            className="shadow-2xl"
            data-id="jwdn6wofs"
            data-path="src/pages/LandingPage.tsx"
          >
            <CardHeader
              className="text-center"
              data-id="xpgw7xdy4"
              data-path="src/pages/LandingPage.tsx"
            >
              <CardTitle
                className="text-2xl"
                data-id="azgjhlktw"
                data-path="src/pages/LandingPage.tsx"
              >
                Join Budget Buddy
              </CardTitle>
              <CardDescription
                data-id="p88levapv"
                data-path="src/pages/LandingPage.tsx"
              >
                Start managing your money like a pro
              </CardDescription>
            </CardHeader>
            <CardContent
              data-id="hna4b3qv2"
              data-path="src/pages/LandingPage.tsx"
            >
              <Tabs
                defaultValue="signup"
                className="w-full"
                data-id="k0s0fk533"
                data-path="src/pages/LandingPage.tsx"
              >
                <TabsList
                  className="grid w-full grid-cols-2"
                  data-id="584y68ixu"
                  data-path="src/pages/LandingPage.tsx"
                >
                  <TabsTrigger
                    value="signup"
                    data-id="6dajgv607"
                    data-path="src/pages/LandingPage.tsx"
                  >
                    Sign Up
                  </TabsTrigger>
                  <TabsTrigger
                    value="login"
                    data-id="muy3npywr"
                    data-path="src/pages/LandingPage.tsx"
                  >
                    Log In
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="signup"
                  className="mt-6"
                  data-id="hwuzss905"
                  data-path="src/pages/LandingPage.tsx"
                >
                  <AuthForm
                    isLogin={false}
                    data-id="ihs29gc0l"
                    data-path="src/pages/LandingPage.tsx"
                  />
                </TabsContent>
                <TabsContent
                  value="login"
                  className="mt-6"
                  data-id="0chu3qfzn"
                  data-path="src/pages/LandingPage.tsx"
                >
                  <AuthForm
                    isLogin={true}
                    data-id="yjpk5byth"
                    data-path="src/pages/LandingPage.tsx"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-gray-800 text-white py-12 px-4"
        data-id="dko8mj6v0"
        data-path="src/pages/LandingPage.tsx"
      >
        <div
          className="container mx-auto max-w-6xl"
          data-id="bv62cshun"
          data-path="src/pages/LandingPage.tsx"
        >
          <div
            className="grid md:grid-cols-4 gap-8"
            data-id="g3k37m8hn"
            data-path="src/pages/LandingPage.tsx"
          >
            <div data-id="qozrfl7mb" data-path="src/pages/LandingPage.tsx">
              <div
                className="flex items-center space-x-2 mb-4"
                data-id="tcca3w16w"
                data-path="src/pages/LandingPage.tsx"
              >
                <PiggyBank
                  className="h-6 w-6"
                  data-id="a5e9qmcqy"
                  data-path="src/pages/LandingPage.tsx"
                />
                <span
                  className="font-bold"
                  data-id="mb42xs7k9"
                  data-path="src/pages/LandingPage.tsx"
                >
                  Budget Buddy
                </span>
              </div>
              <p
                className="text-gray-400"
                data-id="bn2shb7qm"
                data-path="src/pages/LandingPage.tsx"
              >
                Empowering students to take control of their financial future.
              </p>
            </div>
            <div data-id="w6ilv9z6f" data-path="src/pages/LandingPage.tsx">
              <h3
                className="font-semibold mb-4"
                data-id="gjiku2zvj"
                data-path="src/pages/LandingPage.tsx"
              >
                Features
              </h3>
              <ul
                className="space-y-2 text-gray-400"
                data-id="l2ae0kbdw"
                data-path="src/pages/LandingPage.tsx"
              >
                <li data-id="i17mg2per" data-path="src/pages/LandingPage.tsx">
                  Expense Tracking
                </li>
                <li data-id="46y2g5s6l" data-path="src/pages/LandingPage.tsx">
                  Budget Planning
                </li>
                <li data-id="ouigrqg2v" data-path="src/pages/LandingPage.tsx">
                  Savings Goals
                </li>
                <li data-id="f6ex9j6gn" data-path="src/pages/LandingPage.tsx">
                  Bill Reminders
                </li>
              </ul>
            </div>
            <div data-id="n8c1lc7am" data-path="src/pages/LandingPage.tsx">
              <h3
                className="font-semibold mb-4"
                data-id="0u3acdwji"
                data-path="src/pages/LandingPage.tsx"
              >
                Resources
              </h3>
              <ul
                className="space-y-2 text-gray-400"
                data-id="lnj1pd1xk"
                data-path="src/pages/LandingPage.tsx"
              >
                <li data-id="km9ce5odl" data-path="src/pages/LandingPage.tsx">
                  Financial Tips
                </li>
                <li data-id="mwgr9zam3" data-path="src/pages/LandingPage.tsx">
                  Student Guides
                </li>
                <li data-id="hmhyq45ye" data-path="src/pages/LandingPage.tsx">
                  Help Center
                </li>
                <li data-id="r0hzjzc1v" data-path="src/pages/LandingPage.tsx">
                  Community
                </li>
              </ul>
            </div>
            <div data-id="hbr7pt1e9" data-path="src/pages/LandingPage.tsx">
              <h3
                className="font-semibold mb-4"
                data-id="9qmbb5fd7"
                data-path="src/pages/LandingPage.tsx"
              >
                Contact
              </h3>
              <ul
                className="space-y-2 text-gray-400"
                data-id="hw4nsk5zy"
                data-path="src/pages/LandingPage.tsx"
              >
                <li data-id="nedb8k65b" data-path="src/pages/LandingPage.tsx">
                  thechauhanvivek@gmail.com
                </li>
                <li data-id="0a81pr6q5" data-path="src/pages/LandingPage.tsx">
                  +91 9876543210
                </li>
                <li data-id="fxmqgk7qv" data-path="src/pages/LandingPage.tsx">
                  Ahmedabad, India
                </li>
              </ul>
            </div>
          </div>
          <div
            className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400"
            data-id="q7va8jlju"
            data-path="src/pages/LandingPage.tsx"
          >
            <p data-id="7gzb6bev3" data-path="src/pages/LandingPage.tsx">
              © {new Date().getFullYear()} Vivek Chauhan All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );

};

export default LandingPage;