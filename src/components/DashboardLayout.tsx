import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Target,
  Bell,
  PiggyBank,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  User,
  ChevronDown,
  CreditCard,
  Gift } from
'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from
'@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock user data
  const user = {
    name: "Priya Sharma",
    email: "priya.sharma@student.com",
    avatar: "https://images.unsplash.com/photo-1517498327491-f903e1e281cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTg3MTl8MHwxfHNlYXJjaHwxfHxBJTIwY3JvcHBlZCUyMGltYWdlJTIwb2YlMjBhJTIwcGVyc29uJTI3cyUyMGZhY2UlMkMlMjBsaWtlbHklMjBhJTIwcG9ydHJhaXQlMkMlMjB3aXRoJTIwYSUyMGZvY3VzJTIwb24lMjB0aGUlMjBmYWNpYWwlMjBmZWF0dXJlcy58ZW58MHx8fHwxNzQ4MjU4MjY0fDA&ixlib=rb-4.1.0&q=80&w=200$w=150",
    initials: "PS",
    role: "Engineering Student"
  };

  const navigationItems = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" data-id="6wdnajq72" data-path="src/components/DashboardLayout.tsx" />,
    href: '/dashboard',
    badge: null
  },
  {
    title: 'Expenses',
    icon: <Wallet className="h-5 w-5" data-id="t2iuv9gvo" data-path="src/components/DashboardLayout.tsx" />,
    href: '/expenses',
    badge: null
  },
  {
    title: 'Income',
    icon: <TrendingUp className="h-5 w-5" data-id="8la51d61i" data-path="src/components/DashboardLayout.tsx" />,
    href: '/income',
    badge: null
  },
  {
    title: 'Budget',
    icon: <Target className="h-5 w-5" data-id="warfgj9yy" data-path="src/components/DashboardLayout.tsx" />,
    href: '/budget',
    badge: null
  },
  {
    title: 'Bills',
    icon: <Bell className="h-5 w-5" data-id="eynlphjs9" data-path="src/components/DashboardLayout.tsx" />,
    href: '/bills',
    badge: <Badge variant="destructive" className="text-xs" data-id="1z7sstxf5" data-path="src/components/DashboardLayout.tsx">3</Badge>
  },
  {
    title: 'Savings Goals',
    icon: <PiggyBank className="h-5 w-5" data-id="h1lxr416d" data-path="src/components/DashboardLayout.tsx" />,
    href: '/goals',
    badge: null
  },
  {
    title: 'Financial Tips',
    icon: <BookOpen className="h-5 w-5" data-id="fz7oesg98" data-path="src/components/DashboardLayout.tsx" />,
    href: '/tips',
    badge: <Badge variant="secondary" className="text-xs" data-id="ti3ev3oqe" data-path="src/components/DashboardLayout.tsx">New</Badge>
  },
  {
    title: 'Offers',
    icon: <Gift className="h-5 w-5" data-id="j0u8a34n3" data-path="src/components/DashboardLayout.tsx" />,
    href: '/offers',
    badge: <Badge variant="default" className="text-xs bg-green-500" data-id="z9xxg1imw" data-path="src/components/DashboardLayout.tsx">5</Badge>
  }];


  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out successfully",
      description: "See you soon!"
    });
    navigate('/');
  };

  const NavItem = ({ item, mobile = false }: {item: typeof navigationItems[0];mobile?: boolean;}) => {
    const isActive = location.pathname === item.href;

    return (
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={`justify-start w-full ${mobile ? 'h-12' : 'h-10'} ${isActive ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
        onClick={() => {
          navigate(item.href);
          if (mobile) setIsMobileMenuOpen(false);
        }} data-id="dvqt45hv7" data-path="src/components/DashboardLayout.tsx">

        {item.icon}
        <span className="ml-3 flex-1 text-left" data-id="jcuc0b0yc" data-path="src/components/DashboardLayout.tsx">{item.title}</span>
        {item.badge && <span className="ml-auto" data-id="btbt9hh4j" data-path="src/components/DashboardLayout.tsx">{item.badge}</span>}
      </Button>);

  };

  const Sidebar = ({ mobile = false }: {mobile?: boolean;}) =>
  <div className={`flex flex-col h-full ${mobile ? 'px-4 py-6' : 'p-6'}`} data-id="ikc16yd3r" data-path="src/components/DashboardLayout.tsx">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8" data-id="1wwahceus" data-path="src/components/DashboardLayout.tsx">
        <PiggyBank className="h-8 w-8 text-blue-600" data-id="tn2kn1i2e" data-path="src/components/DashboardLayout.tsx" />
        <span className="text-xl font-bold text-gray-800" data-id="x4u7g4kqr" data-path="src/components/DashboardLayout.tsx">Budget Buddy</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2" data-id="1h2of4psi" data-path="src/components/DashboardLayout.tsx">
        {navigationItems.map((item) =>
      <NavItem key={item.href} item={item} mobile={mobile} data-id="tuyo597ut" data-path="src/components/DashboardLayout.tsx" />
      )}
      </nav>

      {/* User Profile Section */}
      <div className="border-t pt-4" data-id="rtba2im6g" data-path="src/components/DashboardLayout.tsx">
        <DropdownMenu data-id="xx5m69ehk" data-path="src/components/DashboardLayout.tsx">
          <DropdownMenuTrigger asChild data-id="wageyi88c" data-path="src/components/DashboardLayout.tsx">
            <Button variant="ghost" className="w-full justify-start p-2 h-auto" data-id="7lhjlabji" data-path="src/components/DashboardLayout.tsx">
              <Avatar className="h-8 w-8 mr-3" data-id="z5u8qvxw4" data-path="src/components/DashboardLayout.tsx">
                <AvatarImage src={user.avatar} alt={user.name} data-id="6an82hpnc" data-path="src/components/DashboardLayout.tsx" />
                <AvatarFallback data-id="t80zebggb" data-path="src/components/DashboardLayout.tsx">{user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left" data-id="z7l3vx9zy" data-path="src/components/DashboardLayout.tsx">
                <div className="text-sm font-medium" data-id="woo9ju7sk" data-path="src/components/DashboardLayout.tsx">{user.name}</div>
                <div className="text-xs text-gray-500" data-id="n3psvwq68" data-path="src/components/DashboardLayout.tsx">{user.role}</div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" data-id="ge4juk4hl" data-path="src/components/DashboardLayout.tsx" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56" data-id="5musihuiy" data-path="src/components/DashboardLayout.tsx">
            <DropdownMenuLabel data-id="krn4t8pqw" data-path="src/components/DashboardLayout.tsx">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator data-id="z3azv02u1" data-path="src/components/DashboardLayout.tsx" />
            <DropdownMenuItem onClick={() => navigate('/profile')} data-id="blsoy78k1" data-path="src/components/DashboardLayout.tsx">
              <User className="h-4 w-4 mr-2" data-id="q6fvltovc" data-path="src/components/DashboardLayout.tsx" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')} data-id="f9q899bl0" data-path="src/components/DashboardLayout.tsx">
              <Settings className="h-4 w-4 mr-2" data-id="z5r37ysk6" data-path="src/components/DashboardLayout.tsx" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/subscription')} data-id="tafb4zqwb" data-path="src/components/DashboardLayout.tsx">
              <CreditCard className="h-4 w-4 mr-2" data-id="bn4sr455t" data-path="src/components/DashboardLayout.tsx" />
              Subscription
            </DropdownMenuItem>
            <DropdownMenuSeparator data-id="yvxciok1a" data-path="src/components/DashboardLayout.tsx" />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600" data-id="5r7jl37d8" data-path="src/components/DashboardLayout.tsx">
              <LogOut className="h-4 w-4 mr-2" data-id="gudm39pfn" data-path="src/components/DashboardLayout.tsx" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>;


  return (
    <div className="flex h-screen bg-gray-50" data-id="t669zd9vg" data-path="src/components/DashboardLayout.tsx">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-white border-r border-gray-200" data-id="qtpxfbr0n" data-path="src/components/DashboardLayout.tsx">
        <Sidebar data-id="i3omdfooc" data-path="src/components/DashboardLayout.tsx" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden" data-id="lgvd23a74" data-path="src/components/DashboardLayout.tsx">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3" data-id="8z8mx4d62" data-path="src/components/DashboardLayout.tsx">
          <div className="flex items-center justify-between" data-id="rdf3am1zd" data-path="src/components/DashboardLayout.tsx">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} data-id="jalk7eqyq" data-path="src/components/DashboardLayout.tsx">
              <SheetTrigger asChild data-id="f9z458bkj" data-path="src/components/DashboardLayout.tsx">
                <Button variant="ghost" size="sm" data-id="0fmwfow0g" data-path="src/components/DashboardLayout.tsx">
                  <Menu className="h-5 w-5" data-id="jxusaax57" data-path="src/components/DashboardLayout.tsx" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64" data-id="3opjp9jem" data-path="src/components/DashboardLayout.tsx">
                <Sidebar mobile data-id="obbuxuboa" data-path="src/components/DashboardLayout.tsx" />
              </SheetContent>
            </Sheet>
            
            <div className="flex items-center space-x-2" data-id="km48ehwdg" data-path="src/components/DashboardLayout.tsx">
              <PiggyBank className="h-6 w-6 text-blue-600" data-id="8r1jwof6i" data-path="src/components/DashboardLayout.tsx" />
              <span className="font-bold text-gray-800" data-id="1sqyrr09j" data-path="src/components/DashboardLayout.tsx">Budget Buddy</span>
            </div>

            <DropdownMenu data-id="zjxn2sktx" data-path="src/components/DashboardLayout.tsx">
              <DropdownMenuTrigger asChild data-id="nenwteqjk" data-path="src/components/DashboardLayout.tsx">
                <Button variant="ghost" size="sm" className="p-1" data-id="kqed0ifwa" data-path="src/components/DashboardLayout.tsx">
                  <Avatar className="h-8 w-8" data-id="w9axvgewg" data-path="src/components/DashboardLayout.tsx">
                    <AvatarImage src={user.avatar} alt={user.name} data-id="ln6kxvmmr" data-path="src/components/DashboardLayout.tsx" />
                    <AvatarFallback data-id="snt9knao6" data-path="src/components/DashboardLayout.tsx">{user.initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" data-id="cr7guctwa" data-path="src/components/DashboardLayout.tsx">
                <DropdownMenuLabel data-id="zgi5dyi87" data-path="src/components/DashboardLayout.tsx">
                  <div className="text-sm font-medium" data-id="phncro8lg" data-path="src/components/DashboardLayout.tsx">{user.name}</div>
                  <div className="text-xs text-gray-500" data-id="90srrx1ka" data-path="src/components/DashboardLayout.tsx">{user.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator data-id="yrrvyfamb" data-path="src/components/DashboardLayout.tsx" />
                <DropdownMenuItem onClick={() => navigate('/profile')} data-id="795s8zuxj" data-path="src/components/DashboardLayout.tsx">
                  <User className="h-4 w-4 mr-2" data-id="ksbzbs6r5" data-path="src/components/DashboardLayout.tsx" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')} data-id="5x1mq0aee" data-path="src/components/DashboardLayout.tsx">
                  <Settings className="h-4 w-4 mr-2" data-id="yd5r1vnyh" data-path="src/components/DashboardLayout.tsx" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator data-id="14rgr2fue" data-path="src/components/DashboardLayout.tsx" />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600" data-id="v1po7v7n2" data-path="src/components/DashboardLayout.tsx">
                  <LogOut className="h-4 w-4 mr-2" data-id="q6il6to0w" data-path="src/components/DashboardLayout.tsx" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto" data-id="ohg0e17n3" data-path="src/components/DashboardLayout.tsx">
          {children}
        </main>
      </div>
    </div>);

};

export default DashboardLayout;