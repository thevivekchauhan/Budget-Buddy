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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authentication success
      localStorage.setItem('user', JSON.stringify({
        email,
        name: name || email.split('@')[0],
        id: Math.random().toString(36).substr(2, 9)
      }));

      toast({
        title: isLogin ? "Welcome back!" : "Account created successfully!",
        description: isLogin ? "You've been logged in." : "Welcome to Student Budget Buddy!"
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
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

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleAuth(isLogin, formData.email, formData.password, formData.name);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4" data-id="ko5gqfvh9" data-path="src/pages/LandingPage.tsx">
        {!isLogin &&
        <div className="space-y-2" data-id="3qut3haxo" data-path="src/pages/LandingPage.tsx">
            <Label htmlFor="name" data-id="zq0tiayre" data-path="src/pages/LandingPage.tsx">Full Name</Label>
            <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            required={!isLogin} data-id="gbphkyysc" data-path="src/pages/LandingPage.tsx" />

          </div>
        }
        <div className="space-y-2" data-id="77kccwk6r" data-path="src/pages/LandingPage.tsx">
          <Label htmlFor="email" data-id="80vxru3fi" data-path="src/pages/LandingPage.tsx">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            required data-id="xzldyix8q" data-path="src/pages/LandingPage.tsx" />

        </div>
        <div className="space-y-2" data-id="rc73my74b" data-path="src/pages/LandingPage.tsx">
          <Label htmlFor="password" data-id="edv4fzmd9" data-path="src/pages/LandingPage.tsx">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            required data-id="zrf1xciam" data-path="src/pages/LandingPage.tsx" />

        </div>
        <Button type="submit" className="w-full" disabled={isLoading} data-id="30kfluhof" data-path="src/pages/LandingPage.tsx">
          {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
        </Button>
      </form>);

  };

  const features = [
  {
    icon: <Wallet className="h-8 w-8 text-blue-600" data-id="ca4q0tp1s" data-path="src/pages/LandingPage.tsx" />,
    title: "Expense Tracking",
    description: "Track every rupee you spend with smart categorization and insights"
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-green-600" data-id="3h17fot0u" data-path="src/pages/LandingPage.tsx" />,
    title: "Income Management",
    description: "Monitor pocket money, stipends, and part-time income in one place"
  },
  {
    icon: <Target className="h-8 w-8 text-purple-600" data-id="ztlcruieh" data-path="src/pages/LandingPage.tsx" />,
    title: "Budget Planning",
    description: "Set monthly budgets and track spending against your limits"
  },
  {
    icon: <Bell className="h-8 w-8 text-orange-600" data-id="eupdpejpb" data-path="src/pages/LandingPage.tsx" />,
    title: "Bill Reminders",
    description: "Never miss rent, subscriptions, or other recurring payments"
  },
  {
    icon: <PiggyBank className="h-8 w-8 text-pink-600" data-id="hihoshf2j" data-path="src/pages/LandingPage.tsx" />,
    title: "Savings Goals",
    description: "Set and track progress towards your financial goals"
  },
  {
    icon: <BookOpen className="h-8 w-8 text-indigo-600" data-id="ihrywhvzr" data-path="src/pages/LandingPage.tsx" />,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" data-id="80280velf" data-path="src/pages/LandingPage.tsx">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60" data-id="w8x6tqp3x" data-path="src/pages/LandingPage.tsx">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center" data-id="i7izobp8p" data-path="src/pages/LandingPage.tsx">
          <div className="flex items-center space-x-2" data-id="3dl8ff3mg" data-path="src/pages/LandingPage.tsx">
            <PiggyBank className="h-8 w-8 text-blue-600" data-id="w491tmxyw" data-path="src/pages/LandingPage.tsx" />
            <span className="text-xl font-bold text-gray-800" data-id="vayyrzpn4" data-path="src/pages/LandingPage.tsx">Student Budget Buddy</span>
          </div>
          <div className="flex items-center space-x-4" data-id="jskqpc2da" data-path="src/pages/LandingPage.tsx">
            <Button variant="ghost" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} data-id="4955poj3s" data-path="src/pages/LandingPage.tsx">
              Features
            </Button>
            <Button variant="ghost" onClick={() => document.getElementById('auth')?.scrollIntoView({ behavior: 'smooth' })} data-id="dxtbaz7iz" data-path="src/pages/LandingPage.tsx">
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4" data-id="kgdhkba8c" data-path="src/pages/LandingPage.tsx">
        <div className="container mx-auto text-center max-w-4xl" data-id="2vq1lfh08" data-path="src/pages/LandingPage.tsx">
          <Badge variant="secondary" className="mb-6" data-id="8mzrqd0xm" data-path="src/pages/LandingPage.tsx">
            Made for Students, by Students
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight" data-id="95zqn323q" data-path="src/pages/LandingPage.tsx">
            Master Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-id="l5ysrs3td" data-path="src/pages/LandingPage.tsx"> Money</span>
            <br data-id="x36ou5pef" data-path="src/pages/LandingPage.tsx" />
            As a Student
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed" data-id="q74gch6tx" data-path="src/pages/LandingPage.tsx">
            Track expenses, plan budgets, and achieve your financial goals with the most comprehensive 
            budget management app designed specifically for students in India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-id="c2miwpfvo" data-path="src/pages/LandingPage.tsx">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => document.getElementById('auth')?.scrollIntoView({ behavior: 'smooth' })} data-id="pmhoi1z5k" data-path="src/pages/LandingPage.tsx">

              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} data-id="anx6x5r8o" data-path="src/pages/LandingPage.tsx">

              Learn More
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t" data-id="vfzea1j8b" data-path="src/pages/LandingPage.tsx">
            <div className="text-center" data-id="9czj5g4bu" data-path="src/pages/LandingPage.tsx">
              <div className="text-3xl font-bold text-blue-600" data-id="v55mocr0b" data-path="src/pages/LandingPage.tsx">10K+</div>
              <div className="text-gray-600" data-id="1x4tyws3t" data-path="src/pages/LandingPage.tsx">Students</div>
            </div>
            <div className="text-center" data-id="b1ewu2lri" data-path="src/pages/LandingPage.tsx">
              <div className="text-3xl font-bold text-green-600" data-id="enxdpxd81" data-path="src/pages/LandingPage.tsx">₹50L+</div>
              <div className="text-gray-600" data-id="zvlrjmrnd" data-path="src/pages/LandingPage.tsx">Money Saved</div>
            </div>
            <div className="text-center" data-id="wzqzgrk84" data-path="src/pages/LandingPage.tsx">
              <div className="text-3xl font-bold text-purple-600" data-id="zpjoi221b" data-path="src/pages/LandingPage.tsx">4.9★</div>
              <div className="text-gray-600" data-id="yxwy47ta3" data-path="src/pages/LandingPage.tsx">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white" data-id="n02z5tjln" data-path="src/pages/LandingPage.tsx">
        <div className="container mx-auto max-w-6xl" data-id="77avb6ww3" data-path="src/pages/LandingPage.tsx">
          <div className="text-center mb-16" data-id="928j8e5qc" data-path="src/pages/LandingPage.tsx">
            <h2 className="text-4xl font-bold text-gray-800 mb-4" data-id="i4aggmhxf" data-path="src/pages/LandingPage.tsx">Everything You Need to Manage Money</h2>
            <p className="text-xl text-gray-600" data-id="emor07jmd" data-path="src/pages/LandingPage.tsx">Powerful features designed specifically for student life</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-id="jqv2rmxae" data-path="src/pages/LandingPage.tsx">
            {features.map((feature, index) =>
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-id="0ac538zz1" data-path="src/pages/LandingPage.tsx">
                <CardHeader data-id="o1yofkd68" data-path="src/pages/LandingPage.tsx">
                  <div className="mb-4" data-id="xiwpfeyd1" data-path="src/pages/LandingPage.tsx">{feature.icon}</div>
                  <CardTitle className="text-xl" data-id="j3dnwwy9e" data-path="src/pages/LandingPage.tsx">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent data-id="jy9lae81w" data-path="src/pages/LandingPage.tsx">
                  <CardDescription className="text-base" data-id="e401n9he7" data-path="src/pages/LandingPage.tsx">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gray-50" data-id="2vpult8gg" data-path="src/pages/LandingPage.tsx">
        <div className="container mx-auto max-w-6xl" data-id="yyxj4eqbc" data-path="src/pages/LandingPage.tsx">
          <div className="text-center mb-16" data-id="e19zhn6v6" data-path="src/pages/LandingPage.tsx">
            <h2 className="text-4xl font-bold text-gray-800 mb-4" data-id="bl972ka6j" data-path="src/pages/LandingPage.tsx">Why Students Love Us</h2>
            <p className="text-xl text-gray-600" data-id="5hgcubnof" data-path="src/pages/LandingPage.tsx">Built with student needs in mind</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8" data-id="3k6u2a1x9" data-path="src/pages/LandingPage.tsx">
            <div className="text-center" data-id="w9uxp0363" data-path="src/pages/LandingPage.tsx">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center" data-id="uog189mf0" data-path="src/pages/LandingPage.tsx">
                <Shield className="h-8 w-8 text-blue-600" data-id="h1l3r21ay" data-path="src/pages/LandingPage.tsx" />
              </div>
              <h3 className="text-xl font-semibold mb-2" data-id="t2tafy5cy" data-path="src/pages/LandingPage.tsx">Secure & Private</h3>
              <p className="text-gray-600" data-id="pug5v3knq" data-path="src/pages/LandingPage.tsx">Your financial data is encrypted and secure. We never share your information.</p>
            </div>
            <div className="text-center" data-id="xul55g1ex" data-path="src/pages/LandingPage.tsx">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center" data-id="45opgzfok" data-path="src/pages/LandingPage.tsx">
                <Smartphone className="h-8 w-8 text-green-600" data-id="i9laaz1ku" data-path="src/pages/LandingPage.tsx" />
              </div>
              <h3 className="text-xl font-semibold mb-2" data-id="novqisct7" data-path="src/pages/LandingPage.tsx">Mobile First</h3>
              <p className="text-gray-600" data-id="pytak24dp" data-path="src/pages/LandingPage.tsx">Optimized for mobile devices so you can track expenses on the go.</p>
            </div>
            <div className="text-center" data-id="9mj4su685" data-path="src/pages/LandingPage.tsx">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center" data-id="jd5e4vf7q" data-path="src/pages/LandingPage.tsx">
                <Users className="h-8 w-8 text-purple-600" data-id="w8i3664jm" data-path="src/pages/LandingPage.tsx" />
              </div>
              <h3 className="text-xl font-semibold mb-2" data-id="yq6fxxun0" data-path="src/pages/LandingPage.tsx">Student Community</h3>
              <p className="text-gray-600" data-id="ydx02u0r4" data-path="src/pages/LandingPage.tsx">Join thousands of students who are mastering their finances together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white" data-id="jerj3zoun" data-path="src/pages/LandingPage.tsx">
        <div className="container mx-auto max-w-6xl" data-id="zsdydg547" data-path="src/pages/LandingPage.tsx">
          <div className="text-center mb-16" data-id="yudogrn97" data-path="src/pages/LandingPage.tsx">
            <h2 className="text-4xl font-bold text-gray-800 mb-4" data-id="l041r4p8w" data-path="src/pages/LandingPage.tsx">What Students Say</h2>
            <p className="text-xl text-gray-600" data-id="9pni4mgfr" data-path="src/pages/LandingPage.tsx">Real feedback from real users</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8" data-id="4pa98j60g" data-path="src/pages/LandingPage.tsx">
            {testimonials.map((testimonial, index) =>
            <Card key={index} className="border-0 shadow-lg" data-id="v5gelx4kv" data-path="src/pages/LandingPage.tsx">
                <CardContent className="pt-6" data-id="7lrog80xj" data-path="src/pages/LandingPage.tsx">
                  <div className="flex mb-4" data-id="k9mr3wle4" data-path="src/pages/LandingPage.tsx">
                    {[...Array(testimonial.rating)].map((_, i) =>
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" data-id="jbm58jr9h" data-path="src/pages/LandingPage.tsx" />
                  )}
                  </div>
                  <p className="text-gray-600 mb-4 italic" data-id="25z2e6vgy" data-path="src/pages/LandingPage.tsx">"{testimonial.content}"</p>
                  <div data-id="cqo4819cp" data-path="src/pages/LandingPage.tsx">
                    <div className="font-semibold" data-id="1c3erupq6" data-path="src/pages/LandingPage.tsx">{testimonial.name}</div>
                    <div className="text-sm text-gray-500" data-id="owusja775" data-path="src/pages/LandingPage.tsx">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Auth Section */}
      <section id="auth" className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600" data-id="mhnhitaf3" data-path="src/pages/LandingPage.tsx">
        <div className="container mx-auto max-w-md" data-id="ads7g7vj9" data-path="src/pages/LandingPage.tsx">
          <Card className="shadow-2xl" data-id="gfwvccz6a" data-path="src/pages/LandingPage.tsx">
            <CardHeader className="text-center" data-id="7hzxgxmlw" data-path="src/pages/LandingPage.tsx">
              <CardTitle className="text-2xl" data-id="9i2nf4w1p" data-path="src/pages/LandingPage.tsx">Join Student Budget Buddy</CardTitle>
              <CardDescription data-id="eyqz4ldal" data-path="src/pages/LandingPage.tsx">Start managing your money like a pro</CardDescription>
            </CardHeader>
            <CardContent data-id="p60a9b6jm" data-path="src/pages/LandingPage.tsx">
              <Tabs defaultValue="signup" className="w-full" data-id="58n6qt7ot" data-path="src/pages/LandingPage.tsx">
                <TabsList className="grid w-full grid-cols-2" data-id="8es4x38yo" data-path="src/pages/LandingPage.tsx">
                  <TabsTrigger value="signup" data-id="ilzogrwl5" data-path="src/pages/LandingPage.tsx">Sign Up</TabsTrigger>
                  <TabsTrigger value="login" data-id="hv7s5oiqy" data-path="src/pages/LandingPage.tsx">Log In</TabsTrigger>
                </TabsList>
                <TabsContent value="signup" className="mt-6" data-id="dstqcebtg" data-path="src/pages/LandingPage.tsx">
                  <AuthForm isLogin={false} data-id="pn23e70pt" data-path="src/pages/LandingPage.tsx" />
                </TabsContent>
                <TabsContent value="login" className="mt-6" data-id="rpcr2opph" data-path="src/pages/LandingPage.tsx">
                  <AuthForm isLogin={true} data-id="ify43k715" data-path="src/pages/LandingPage.tsx" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4" data-id="g1h9cx4c4" data-path="src/pages/LandingPage.tsx">
        <div className="container mx-auto max-w-6xl" data-id="ipxmlks09" data-path="src/pages/LandingPage.tsx">
          <div className="grid md:grid-cols-4 gap-8" data-id="yhfm8o2zp" data-path="src/pages/LandingPage.tsx">
            <div data-id="e083ut063" data-path="src/pages/LandingPage.tsx">
              <div className="flex items-center space-x-2 mb-4" data-id="ey3cccsfq" data-path="src/pages/LandingPage.tsx">
                <PiggyBank className="h-6 w-6" data-id="iuioq0yub" data-path="src/pages/LandingPage.tsx" />
                <span className="font-bold" data-id="g5fmf7h0m" data-path="src/pages/LandingPage.tsx">Student Budget Buddy</span>
              </div>
              <p className="text-gray-400" data-id="bo7fk49ip" data-path="src/pages/LandingPage.tsx">Empowering students to take control of their financial future.</p>
            </div>
            <div data-id="1n4fnl5qe" data-path="src/pages/LandingPage.tsx">
              <h3 className="font-semibold mb-4" data-id="8dn9lot60" data-path="src/pages/LandingPage.tsx">Features</h3>
              <ul className="space-y-2 text-gray-400" data-id="8f0fj3j9e" data-path="src/pages/LandingPage.tsx">
                <li data-id="1bu9jccvb" data-path="src/pages/LandingPage.tsx">Expense Tracking</li>
                <li data-id="i2ycggmp5" data-path="src/pages/LandingPage.tsx">Budget Planning</li>
                <li data-id="ivozc8tva" data-path="src/pages/LandingPage.tsx">Savings Goals</li>
                <li data-id="t9mmvxer1" data-path="src/pages/LandingPage.tsx">Bill Reminders</li>
              </ul>
            </div>
            <div data-id="n7v5zydh9" data-path="src/pages/LandingPage.tsx">
              <h3 className="font-semibold mb-4" data-id="z41d6ubxv" data-path="src/pages/LandingPage.tsx">Resources</h3>
              <ul className="space-y-2 text-gray-400" data-id="sn1itl51i" data-path="src/pages/LandingPage.tsx">
                <li data-id="2ywzwvzp5" data-path="src/pages/LandingPage.tsx">Financial Tips</li>
                <li data-id="nea3h9nqi" data-path="src/pages/LandingPage.tsx">Student Guides</li>
                <li data-id="dy1stnagy" data-path="src/pages/LandingPage.tsx">Help Center</li>
                <li data-id="acn87s3el" data-path="src/pages/LandingPage.tsx">Community</li>
              </ul>
            </div>
            <div data-id="ptghqklvs" data-path="src/pages/LandingPage.tsx">
              <h3 className="font-semibold mb-4" data-id="e6yw7wbdh" data-path="src/pages/LandingPage.tsx">Contact</h3>
              <ul className="space-y-2 text-gray-400" data-id="m9qi6ih4k" data-path="src/pages/LandingPage.tsx">
                <li data-id="y1fluvqnj" data-path="src/pages/LandingPage.tsx">support@studentbudgetbuddy.com</li>
                <li data-id="l8mkvgabi" data-path="src/pages/LandingPage.tsx">+91 9876543210</li>
                <li data-id="at73qemzh" data-path="src/pages/LandingPage.tsx">Mumbai, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400" data-id="uulxeqfv2" data-path="src/pages/LandingPage.tsx">
            <p data-id="pl95nf5se" data-path="src/pages/LandingPage.tsx">© {new Date().getFullYear()} Student Budget Buddy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>);

};

export default LandingPage;