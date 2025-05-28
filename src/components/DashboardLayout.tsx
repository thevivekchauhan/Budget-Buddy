import { useState, useEffect } from 'react';
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

  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data, error } = await window.ezsite.apis.getUserInfo();
        if (error) {
          console.error('Error loading user info:', error);
          // If not authenticated, redirect to login
          navigate('/');
          return;
        }

        setUser({
          name: data.Name || data.Email.split('@')[0],
          email: data.Email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.Name || data.Email.split('@')[0])}&background=0066cc&color=fff`,
          initials: (data.Name || data.Email.split('@')[0]).split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2),
          role: "Student",
          id: data.ID
        });
      } catch (error) {
        console.error('Authentication error:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  const navigationItems = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" data-id="1lwh52e0g" data-path="src/components/DashboardLayout.tsx" />,
    href: '/dashboard',
    badge: null
  },
  {
    title: 'Expenses',
    icon: <Wallet className="h-5 w-5" data-id="14n90zwhc" data-path="src/components/DashboardLayout.tsx" />,
    href: '/expenses',
    badge: null
  },
  {
    title: 'Income',
    icon: <TrendingUp className="h-5 w-5" data-id="0bw36kz13" data-path="src/components/DashboardLayout.tsx" />,
    href: '/income',
    badge: null
  },
  {
    title: 'Budget',
    icon: <Target className="h-5 w-5" data-id="ts1jt0azr" data-path="src/components/DashboardLayout.tsx" />,
    href: '/budget',
    badge: null
  },
  {
    title: 'Bills',
    icon: <Bell className="h-5 w-5" data-id="37vojh4fs" data-path="src/components/DashboardLayout.tsx" />,
    href: '/bills',
    badge: <Badge variant="destructive" className="text-xs" data-id="arbegjbsn" data-path="src/components/DashboardLayout.tsx">3</Badge>
  },
  {
    title: 'Savings Goals',
    icon: <PiggyBank className="h-5 w-5" data-id="h97h9gfte" data-path="src/components/DashboardLayout.tsx" />,
    href: '/goals',
    badge: null
  },
  {
    title: 'Financial Tips',
    icon: <BookOpen className="h-5 w-5" data-id="8hp0g8a5r" data-path="src/components/DashboardLayout.tsx" />,
    href: '/tips',
    badge: <Badge variant="secondary" className="text-xs" data-id="pqs63cq3j" data-path="src/components/DashboardLayout.tsx">New</Badge>
  },
  {
    title: 'Offers',
    icon: <Gift className="h-5 w-5" data-id="iyoep7uyq" data-path="src/components/DashboardLayout.tsx" />,
    href: '/offers',
    badge: <Badge variant="default" className="text-xs bg-green-500" data-id="uikvenn7r" data-path="src/components/DashboardLayout.tsx">5</Badge>
  }];


  const handleLogout = async () => {
    try {
      const { error } = await window.ezsite.apis.logout();
      if (error) {
        console.error('Logout error:', error);
      }
      toast({
        title: "Logged out successfully",
        description: "See you soon!"
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/');
    }
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
        }} data-id="wfpxu2dbe" data-path="src/components/DashboardLayout.tsx">

        {item.icon}
        <span className="ml-3 flex-1 text-left" data-id="av162mb6q" data-path="src/components/DashboardLayout.tsx">{item.title}</span>
        {item.badge && <span className="ml-auto" data-id="86mf67c6x" data-path="src/components/DashboardLayout.tsx">{item.badge}</span>}
      </Button>);

  };

  const Sidebar = ({ mobile = false }: {mobile?: boolean;}) =>
  <div className={`flex flex-col h-full ${mobile ? 'px-4 py-6' : 'p-6'}`} data-id="ig0nszlhs" data-path="src/components/DashboardLayout.tsx">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8" data-id="5xkghs0ep" data-path="src/components/DashboardLayout.tsx">
        <PiggyBank className="h-8 w-8 text-blue-600" data-id="030ocfbjc" data-path="src/components/DashboardLayout.tsx" />
        <span className="text-xl font-bold text-gray-800" data-id="8kl2ooc0z" data-path="src/components/DashboardLayout.tsx">Budget Buddy</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2" data-id="0sjmrqu7h" data-path="src/components/DashboardLayout.tsx">
        {navigationItems.map((item) =>
      <NavItem key={item.href} item={item} mobile={mobile} data-id="b49gkfz4m" data-path="src/components/DashboardLayout.tsx" />
      )}
      </nav>

      {/* User Profile Section */}
      <div className="border-t pt-4" data-id="oulxgyc80" data-path="src/components/DashboardLayout.tsx">
        <DropdownMenu data-id="g528nynqz" data-path="src/components/DashboardLayout.tsx">
          <DropdownMenuTrigger asChild data-id="14n15ulsx" data-path="src/components/DashboardLayout.tsx">
            <Button variant="ghost" className="w-full justify-start p-2 h-auto" data-id="rcycogpam" data-path="src/components/DashboardLayout.tsx">
              <Avatar className="h-8 w-8 mr-3" data-id="eqdhl9bpi" data-path="src/components/DashboardLayout.tsx">
                <AvatarImage src={user.avatar} alt={user.name} data-id="yah1j94aq" data-path="src/components/DashboardLayout.tsx" />
                <AvatarFallback data-id="hi1yckcyq" data-path="src/components/DashboardLayout.tsx">{user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left" data-id="1g311cjy4" data-path="src/components/DashboardLayout.tsx">
                <div className="text-sm font-medium" data-id="7m3d3lwxy" data-path="src/components/DashboardLayout.tsx">{user.name}</div>
                <div className="text-xs text-gray-500" data-id="s9ltut7mx" data-path="src/components/DashboardLayout.tsx">{user.role}</div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" data-id="2gyjmd4hw" data-path="src/components/DashboardLayout.tsx" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56" data-id="rylesi4xt" data-path="src/components/DashboardLayout.tsx">
            <DropdownMenuLabel data-id="3epcisqho" data-path="src/components/DashboardLayout.tsx">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator data-id="cjpzypa2s" data-path="src/components/DashboardLayout.tsx" />
            <DropdownMenuItem onClick={() => navigate('/profile')} data-id="t73y4q0a0" data-path="src/components/DashboardLayout.tsx">
              <User className="h-4 w-4 mr-2" data-id="xc1imrda3" data-path="src/components/DashboardLayout.tsx" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')} data-id="zfbqy7t5x" data-path="src/components/DashboardLayout.tsx">
              <Settings className="h-4 w-4 mr-2" data-id="upqu24t9o" data-path="src/components/DashboardLayout.tsx" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/data')} data-id="s7ah27x9n" data-path="src/components/DashboardLayout.tsx">
              <CreditCard className="h-4 w-4 mr-2" data-id="i2nz7lzkt" data-path="src/components/DashboardLayout.tsx" />
              My Data
            </DropdownMenuItem>
            <DropdownMenuSeparator data-id="r63ptts8n" data-path="src/components/DashboardLayout.tsx" />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600" data-id="7b3i2dlbn" data-path="src/components/DashboardLayout.tsx">
              <LogOut className="h-4 w-4 mr-2" data-id="n69e4ojy9" data-path="src/components/DashboardLayout.tsx" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>;


  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center" data-id="d0zo3gpmk" data-path="src/components/DashboardLayout.tsx">
        <div className="text-center" data-id="c6ko7o06x" data-path="src/components/DashboardLayout.tsx">
          <PiggyBank className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" data-id="9owq9sm2n" data-path="src/components/DashboardLayout.tsx" />
          <div className="text-lg font-medium text-gray-600" data-id="s7gdhna64" data-path="src/components/DashboardLayout.tsx">Loading...</div>
        </div>
      </div>);

  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50" data-id="0ygkh9wvh" data-path="src/components/DashboardLayout.tsx">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-white border-r border-gray-200" data-id="gjzgijclt" data-path="src/components/DashboardLayout.tsx">
        <Sidebar data-id="63x8qj881" data-path="src/components/DashboardLayout.tsx" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden" data-id="xb3wpkdym" data-path="src/components/DashboardLayout.tsx">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3" data-id="rdcuxfe88" data-path="src/components/DashboardLayout.tsx">
          <div className="flex items-center justify-between" data-id="vvn1hxgv7" data-path="src/components/DashboardLayout.tsx">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} data-id="n8rgtof0m" data-path="src/components/DashboardLayout.tsx">
              <SheetTrigger asChild data-id="4dzblf176" data-path="src/components/DashboardLayout.tsx">
                <Button variant="ghost" size="sm" data-id="hyg3vv3uf" data-path="src/components/DashboardLayout.tsx">
                  <Menu className="h-5 w-5" data-id="kho6gpe9p" data-path="src/components/DashboardLayout.tsx" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64" data-id="cvhnn052c" data-path="src/components/DashboardLayout.tsx">
                <Sidebar mobile data-id="sffndt6wd" data-path="src/components/DashboardLayout.tsx" />
              </SheetContent>
            </Sheet>
            
            <div className="flex items-center space-x-2" data-id="r4348jaqo" data-path="src/components/DashboardLayout.tsx">
              <PiggyBank className="h-6 w-6 text-blue-600" data-id="yywyky6ji" data-path="src/components/DashboardLayout.tsx" />
              <span className="font-bold text-gray-800" data-id="cjmdmgyn9" data-path="src/components/DashboardLayout.tsx">Budget Buddy</span>
            </div>

            <DropdownMenu data-id="xbbtcp0is" data-path="src/components/DashboardLayout.tsx">
              <DropdownMenuTrigger asChild data-id="wkui1qz12" data-path="src/components/DashboardLayout.tsx">
                <Button variant="ghost" size="sm" className="p-1" data-id="ytr9g7hx8" data-path="src/components/DashboardLayout.tsx">
                  <Avatar className="h-8 w-8" data-id="rsn9u903m" data-path="src/components/DashboardLayout.tsx">
                    <AvatarImage src={user.avatar} alt={user.name} data-id="8enum8yod" data-path="src/components/DashboardLayout.tsx" />
                    <AvatarFallback data-id="ljw6mkf7t" data-path="src/components/DashboardLayout.tsx">{user.initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" data-id="hp1756tvi" data-path="src/components/DashboardLayout.tsx">
                <DropdownMenuLabel data-id="8gqxttrwt" data-path="src/components/DashboardLayout.tsx">
                  <div className="text-sm font-medium" data-id="naow488l3" data-path="src/components/DashboardLayout.tsx">{user.name}</div>
                  <div className="text-xs text-gray-500" data-id="9u3qz59qk" data-path="src/components/DashboardLayout.tsx">{user.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator data-id="q9fv8xxpq" data-path="src/components/DashboardLayout.tsx" />
                <DropdownMenuItem onClick={() => navigate('/profile')} data-id="97wfapsn9" data-path="src/components/DashboardLayout.tsx">
                  <User className="h-4 w-4 mr-2" data-id="z1spluxd3" data-path="src/components/DashboardLayout.tsx" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')} data-id="ab7fe3rh7" data-path="src/components/DashboardLayout.tsx">
                  <Settings className="h-4 w-4 mr-2" data-id="kf56082cp" data-path="src/components/DashboardLayout.tsx" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/data')} data-id="vxhghbmmy" data-path="src/components/DashboardLayout.tsx">
                  <CreditCard className="h-4 w-4 mr-2" data-id="fvu19o5s3" data-path="src/components/DashboardLayout.tsx" />
                  My Data
                </DropdownMenuItem>
                <DropdownMenuSeparator data-id="1ww1tm4rh" data-path="src/components/DashboardLayout.tsx" />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600" data-id="x9o76og2p" data-path="src/components/DashboardLayout.tsx">
                  <LogOut className="h-4 w-4 mr-2" data-id="vrp6s1k5t" data-path="src/components/DashboardLayout.tsx" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto" data-id="x0fg53jtn" data-path="src/components/DashboardLayout.tsx">
          {children}
        </main>
      </div>
    </div>);

};

export default DashboardLayout;