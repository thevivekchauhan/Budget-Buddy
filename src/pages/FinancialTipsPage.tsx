import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen,
  Search,
  Filter,
  Clock,
  TrendingUp,
  PiggyBank,
  Target,
  Lightbulb,
  GraduationCap,
  Heart,
  Shield,
  Smartphone,
  Car,
  Home,
  CreditCard,
  Users,
  Star,
  ThumbsUp } from
'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';

const FinancialTipsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('all');

  const categories = [
  { name: 'Budgeting', icon: <Target className="h-4 w-4" data-id="1khm57i0q" data-path="src/pages/FinancialTipsPage.tsx" />, color: 'bg-blue-100 text-blue-800' },
  { name: 'Saving', icon: <PiggyBank className="h-4 w-4" data-id="s5ni7ndgi" data-path="src/pages/FinancialTipsPage.tsx" />, color: 'bg-green-100 text-green-800' },
  { name: 'Student Life', icon: <GraduationCap className="h-4 w-4" data-id="nlxw28syp" data-path="src/pages/FinancialTipsPage.tsx" />, color: 'bg-purple-100 text-purple-800' },
  { name: 'Investment', icon: <TrendingUp className="h-4 w-4" data-id="nh7b0ijqn" data-path="src/pages/FinancialTipsPage.tsx" />, color: 'bg-orange-100 text-orange-800' },
  { name: 'Credit Cards', icon: <CreditCard className="h-4 w-4" data-id="tbn5fdmv7" data-path="src/pages/FinancialTipsPage.tsx" />, color: 'bg-red-100 text-red-800' },
  { name: 'Insurance', icon: <Shield className="h-4 w-4" data-id="vtfqfm0zj" data-path="src/pages/FinancialTipsPage.tsx" />, color: 'bg-indigo-100 text-indigo-800' },
  { name: 'Lifestyle', icon: <Heart className="h-4 w-4" data-id="787y6lhrj" data-path="src/pages/FinancialTipsPage.tsx" />, color: 'bg-pink-100 text-pink-800' }];


  const tips = [
  {
    id: 1,
    title: "The 50/30/20 Rule for Students",
    category: "Budgeting",
    type: "tip",
    readTime: "2 min read",
    content: "Allocate 50% of your income to needs (rent, food, transport), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment. As a student, you might adjust this to 60/25/15 based on your limited income.",
    tags: ["budgeting", "money management", "student life"],
    likes: 45,
    isLiked: false,
    difficulty: "Beginner",
    author: "Finance Team",
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "How to Build an Emergency Fund on ₹5000/Month",
    category: "Saving",
    type: "guide",
    readTime: "5 min read",
    content: "Start small but start now. Even saving ₹500/month (10% of ₹5000) gives you ₹6000 in a year. Tips: Use automatic transfers, save coins in a jar, cut one unnecessary subscription, cook at home twice a week.",
    tags: ["emergency fund", "saving", "low income"],
    likes: 78,
    isLiked: true,
    difficulty: "Beginner",
    author: "Priya Sharma",
    date: "2024-01-12"
  },
  {
    id: 3,
    title: "Student Credit Card: Do's and Don'ts",
    category: "Credit Cards",
    type: "guide",
    readTime: "4 min read",
    content: "DO: Pay the full amount before due date, use for building credit history, track expenses. DON'T: Max out the limit, miss payments, use for cash advances, treat it as free money.",
    tags: ["credit cards", "credit score", "student finance"],
    likes: 63,
    isLiked: false,
    difficulty: "Intermediate",
    author: "Rahul Gupta",
    date: "2024-01-10"
  },
  {
    id: 4,
    title: "Scholarship and Grant Hunting Strategies",
    category: "Student Life",
    type: "tip",
    readTime: "3 min read",
    content: "Apply early and often. Check government portals like NSP, contact your college financial aid office, look for merit-based scholarships in your field, and don't ignore small scholarships - they add up!",
    tags: ["scholarships", "financial aid", "education funding"],
    likes: 92,
    isLiked: true,
    difficulty: "Beginner",
    author: "Education Team",
    date: "2024-01-08"
  },
  {
    id: 5,
    title: "Mutual Funds for Beginners: SIP with ₹500",
    category: "Investment",
    type: "guide",
    readTime: "6 min read",
    content: "Start your investment journey with SIP (Systematic Investment Plan). Choose equity mutual funds for long-term growth. Apps like Zerodha Coin, Groww make it easy. Start with ₹500/month and increase gradually.",
    tags: ["mutual funds", "SIP", "investment", "long-term"],
    likes: 134,
    isLiked: false,
    difficulty: "Intermediate",
    author: "Investment Team",
    date: "2024-01-05"
  },
  {
    id: 6,
    title: "Smart Shopping: Student Discounts You Should Know",
    category: "Lifestyle",
    type: "tip",
    readTime: "3 min read",
    content: "Use student ID for discounts on software (Adobe, Microsoft), streaming services, transportation, restaurants. Apps like UNiDAYS and Student Beans offer exclusive deals. Always ask 'Do you have student discount?'",
    tags: ["discounts", "student benefits", "shopping"],
    likes: 56,
    isLiked: true,
    difficulty: "Beginner",
    author: "Lifestyle Team",
    date: "2024-01-03"
  },
  {
    id: 7,
    title: "Health Insurance for Students: What You Need",
    category: "Insurance",
    type: "guide",
    readTime: "4 min read",
    content: "Don't skip health insurance. Check if you're covered under parents' policy until 25. Consider student health insurance plans. Government schemes like Ayushman Bharat might cover you. Budget ₹3000-5000 annually.",
    tags: ["health insurance", "medical coverage", "student insurance"],
    likes: 71,
    isLiked: false,
    difficulty: "Intermediate",
    author: "Insurance Expert",
    date: "2024-01-01"
  },
  {
    id: 8,
    title: "Part-time Job vs Studies: Finding the Balance",
    category: "Student Life",
    type: "guide",
    readTime: "5 min read",
    content: "Work max 15-20 hours/week to maintain academic performance. Choose flexible jobs like tutoring, content writing, delivery. Online freelancing offers better time control. Remember: grades > money in the long run.",
    tags: ["part-time jobs", "work-life balance", "income generation"],
    likes: 88,
    isLiked: true,
    difficulty: "Beginner",
    author: "Career Team",
    date: "2023-12-28"
  }];


  const featuredTips = [
  {
    title: "Track Every Rupee",
    description: "Use apps like Money Manager or simply maintain a daily expense diary",
    icon: <Smartphone className="h-6 w-6" data-id="5xkzfkelm" data-path="src/pages/FinancialTipsPage.tsx" />,
    color: "bg-blue-500"
  },
  {
    title: "Cook at Home",
    description: "Save ₹3000-5000/month by cooking instead of ordering food",
    icon: <Home className="h-6 w-6" data-id="hb91wfwaw" data-path="src/pages/FinancialTipsPage.tsx" />,
    color: "bg-green-500"
  },
  {
    title: "Use Public Transport",
    description: "Monthly passes are always cheaper than daily tickets",
    icon: <Car className="h-6 w-6" data-id="dcbl41p6h" data-path="src/pages/FinancialTipsPage.tsx" />,
    color: "bg-orange-500"
  },
  {
    title: "Group Study Sessions",
    description: "Share textbook costs and study materials with classmates",
    icon: <Users className="h-6 w-6" data-id="lnra56t3f" data-path="src/pages/FinancialTipsPage.tsx" />,
    color: "bg-purple-500"
  }];


  const filteredTips = tips.filter((tip) => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || tip.category === selectedCategory;

    const matchesType = selectedType === 'all' || tip.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const handleLike = (id: number) => {
    // In a real app, this would update the backend
    toast({
      title: "Thanks for the feedback!",
      description: "Your like helps us improve our content."
    });
  };

  const getCategoryStyle = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.color : 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.icon : <BookOpen className="h-4 w-4" data-id="75yv9stel" data-path="src/pages/FinancialTipsPage.tsx" />;
  };

  const TipCard = ({ tip }: {tip: typeof tips[0];}) =>
  <Card className="hover:shadow-lg transition-all duration-300 h-full" data-id="0aqj87qvg" data-path="src/pages/FinancialTipsPage.tsx">
      <CardContent className="p-6 h-full flex flex-col" data-id="clx1zjm9q" data-path="src/pages/FinancialTipsPage.tsx">
        <div className="flex items-start justify-between mb-3" data-id="ygde0u9xi" data-path="src/pages/FinancialTipsPage.tsx">
          <Badge variant="secondary" className={getCategoryStyle(tip.category)} data-id="7j0cv1um8" data-path="src/pages/FinancialTipsPage.tsx">
            {getCategoryIcon(tip.category)}
            <span className="ml-1" data-id="q058vusa6" data-path="src/pages/FinancialTipsPage.tsx">{tip.category}</span>
          </Badge>
          <Badge variant="outline" className="text-xs" data-id="c68od02yp" data-path="src/pages/FinancialTipsPage.tsx">
            {tip.type}
          </Badge>
        </div>
        
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2" data-id="x3ccto8n4" data-path="src/pages/FinancialTipsPage.tsx">{tip.title}</h3>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3" data-id="7gmbctli7" data-path="src/pages/FinancialTipsPage.tsx">{tip.content}</p>
        
        <div className="flex flex-wrap gap-1 mb-4" data-id="fjqbpob1q" data-path="src/pages/FinancialTipsPage.tsx">
          {tip.tags.slice(0, 3).map((tag) =>
        <Badge key={tag} variant="outline" className="text-xs" data-id="dljimgk5y" data-path="src/pages/FinancialTipsPage.tsx">
              #{tag}
            </Badge>
        )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto" data-id="esspooyxj" data-path="src/pages/FinancialTipsPage.tsx">
          <div className="flex items-center gap-4" data-id="e9q1t5519" data-path="src/pages/FinancialTipsPage.tsx">
            <span className="flex items-center gap-1" data-id="ad94ulyc2" data-path="src/pages/FinancialTipsPage.tsx">
              <Clock className="h-4 w-4" data-id="ijtbp7pbo" data-path="src/pages/FinancialTipsPage.tsx" />
              {tip.readTime}
            </span>
            <span className="flex items-center gap-1" data-id="e4y3a1e2j" data-path="src/pages/FinancialTipsPage.tsx">
              <Star className="h-4 w-4" data-id="4aaujhhhq" data-path="src/pages/FinancialTipsPage.tsx" />
              {tip.difficulty}
            </span>
          </div>
          <Button
          variant="ghost"
          size="sm"
          onClick={() => handleLike(tip.id)}
          className={tip.isLiked ? 'text-red-500' : 'text-gray-500'} data-id="asxe5ctmv" data-path="src/pages/FinancialTipsPage.tsx">

            <ThumbsUp className="h-4 w-4 mr-1" data-id="zxl409gm1" data-path="src/pages/FinancialTipsPage.tsx" />
            {tip.likes}
          </Button>
        </div>
        
        <div className="text-xs text-gray-400 mt-2" data-id="ljtsokie9" data-path="src/pages/FinancialTipsPage.tsx">
          By {tip.author} • {tip.date}
        </div>
      </CardContent>
    </Card>;


  return (
    <DashboardLayout data-id="yzsl00hhv" data-path="src/pages/FinancialTipsPage.tsx">
      <div className="p-6 space-y-6" data-id="yl2y350j0" data-path="src/pages/FinancialTipsPage.tsx">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto" data-id="tg1j2dxy1" data-path="src/pages/FinancialTipsPage.tsx">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-id="n10cw5gu1" data-path="src/pages/FinancialTipsPage.tsx">Financial Tips & Guides</h1>
          <p className="text-xl text-gray-600" data-id="uf4ripf51" data-path="src/pages/FinancialTipsPage.tsx">
            Learn money management skills designed specifically for students
          </p>
        </div>

        {/* Quick Tips */}
        <Card data-id="7j6i1x3xd" data-path="src/pages/FinancialTipsPage.tsx">
          <CardHeader data-id="j8adezsdp" data-path="src/pages/FinancialTipsPage.tsx">
            <CardTitle className="flex items-center gap-2" data-id="8gc35np37" data-path="src/pages/FinancialTipsPage.tsx">
              <Lightbulb className="h-5 w-5 text-yellow-500" data-id="df1u9uszs" data-path="src/pages/FinancialTipsPage.tsx" />
              Quick Money-Saving Tips
            </CardTitle>
          </CardHeader>
          <CardContent data-id="51tff205n" data-path="src/pages/FinancialTipsPage.tsx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-id="vv76m8ige" data-path="src/pages/FinancialTipsPage.tsx">
              {featuredTips.map((tip, index) =>
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg" data-id="j29oslq0i" data-path="src/pages/FinancialTipsPage.tsx">
                  <div className={`${tip.color} text-white p-2 rounded-full`} data-id="f1rh4dp1w" data-path="src/pages/FinancialTipsPage.tsx">
                    {tip.icon}
                  </div>
                  <div data-id="8ehlxb0mb" data-path="src/pages/FinancialTipsPage.tsx">
                    <h4 className="font-semibold text-gray-900" data-id="vwfnn07ro" data-path="src/pages/FinancialTipsPage.tsx">{tip.title}</h4>
                    <p className="text-sm text-gray-600 mt-1" data-id="rmmowhfth" data-path="src/pages/FinancialTipsPage.tsx">{tip.description}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card data-id="9dhhzok46" data-path="src/pages/FinancialTipsPage.tsx">
          <CardContent className="p-6" data-id="5hz5ppy0g" data-path="src/pages/FinancialTipsPage.tsx">
            <div className="flex flex-col md:flex-row gap-4" data-id="if9hw3q9a" data-path="src/pages/FinancialTipsPage.tsx">
              <div className="flex-1" data-id="6756ok80v" data-path="src/pages/FinancialTipsPage.tsx">
                <div className="relative" data-id="jkrbslubc" data-path="src/pages/FinancialTipsPage.tsx">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" data-id="k7evpnb9o" data-path="src/pages/FinancialTipsPage.tsx" />
                  <Input
                    placeholder="Search tips, guides, and articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10" data-id="e2pecaa89" data-path="src/pages/FinancialTipsPage.tsx" />

                </div>
              </div>

              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)} data-id="di6x6uhhr" data-path="src/pages/FinancialTipsPage.tsx">

                <option value="All" data-id="65mmlj65d" data-path="src/pages/FinancialTipsPage.tsx">All Categories</option>
                {categories.map((category) =>
                <option key={category.name} value={category.name} data-id="ze3v4x62g" data-path="src/pages/FinancialTipsPage.tsx">
                    {category.name}
                  </option>
                )}
              </select>

              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)} data-id="4as20946d" data-path="src/pages/FinancialTipsPage.tsx">

                <option value="all" data-id="20sussr9h" data-path="src/pages/FinancialTipsPage.tsx">All Types</option>
                <option value="tip" data-id="3joxgjcsx" data-path="src/pages/FinancialTipsPage.tsx">Quick Tips</option>
                <option value="guide" data-id="99nmdrlkv" data-path="src/pages/FinancialTipsPage.tsx">Detailed Guides</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="all" className="w-full" data-id="54xrtr3mq" data-path="src/pages/FinancialTipsPage.tsx">
          <TabsList className="grid w-full grid-cols-4" data-id="wbp9bdvn5" data-path="src/pages/FinancialTipsPage.tsx">
            <TabsTrigger value="all" data-id="47dr1v4p2" data-path="src/pages/FinancialTipsPage.tsx">All Content</TabsTrigger>
            <TabsTrigger value="beginner" data-id="ercoelrgo" data-path="src/pages/FinancialTipsPage.tsx">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate" data-id="ghizkql6q" data-path="src/pages/FinancialTipsPage.tsx">Intermediate</TabsTrigger>
            <TabsTrigger value="popular" data-id="5ea0mmqrn" data-path="src/pages/FinancialTipsPage.tsx">Most Popular</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6" data-id="jialqfeqm" data-path="src/pages/FinancialTipsPage.tsx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="67d9058hw" data-path="src/pages/FinancialTipsPage.tsx">
              {filteredTips.map((tip) =>
              <TipCard key={tip.id} tip={tip} data-id="gn7pngn9x" data-path="src/pages/FinancialTipsPage.tsx" />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="beginner" className="mt-6" data-id="z5uqywpam" data-path="src/pages/FinancialTipsPage.tsx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="01bcogsl9" data-path="src/pages/FinancialTipsPage.tsx">
              {filteredTips.filter((tip) => tip.difficulty === 'Beginner').map((tip) =>
              <TipCard key={tip.id} tip={tip} data-id="o7pwa8p4l" data-path="src/pages/FinancialTipsPage.tsx" />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="intermediate" className="mt-6" data-id="sued4syhp" data-path="src/pages/FinancialTipsPage.tsx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="85v30pkhq" data-path="src/pages/FinancialTipsPage.tsx">
              {filteredTips.filter((tip) => tip.difficulty === 'Intermediate').map((tip) =>
              <TipCard key={tip.id} tip={tip} data-id="g7bjcxr42" data-path="src/pages/FinancialTipsPage.tsx" />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="popular" className="mt-6" data-id="65fhjpy36" data-path="src/pages/FinancialTipsPage.tsx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="ickhqs48i" data-path="src/pages/FinancialTipsPage.tsx">
              {filteredTips.sort((a, b) => b.likes - a.likes).map((tip) =>
              <TipCard key={tip.id} tip={tip} data-id="f3itmur43" data-path="src/pages/FinancialTipsPage.tsx" />
              )}
            </div>
          </TabsContent>
        </Tabs>

        {filteredTips.length === 0 &&
        <div className="text-center py-12" data-id="hvl6gv875" data-path="src/pages/FinancialTipsPage.tsx">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" data-id="275uxpcnw" data-path="src/pages/FinancialTipsPage.tsx" />
            <h3 className="text-lg font-medium text-gray-900 mb-2" data-id="zpqci1p7r" data-path="src/pages/FinancialTipsPage.tsx">No content found</h3>
            <p className="text-gray-600" data-id="dceqk9n6p" data-path="src/pages/FinancialTipsPage.tsx">
              Try adjusting your search terms or filters to find relevant content.
            </p>
          </div>
        }

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0" data-id="74z2jgdyb" data-path="src/pages/FinancialTipsPage.tsx">
          <CardContent className="p-8 text-center" data-id="fvab366sv" data-path="src/pages/FinancialTipsPage.tsx">
            <h3 className="text-2xl font-bold text-gray-900 mb-2" data-id="hgpv9ill3" data-path="src/pages/FinancialTipsPage.tsx">Stay Updated</h3>
            <p className="text-gray-600 mb-6" data-id="hukfy5lqh" data-path="src/pages/FinancialTipsPage.tsx">
              Get weekly financial tips and student money-saving strategies delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" data-id="dnmu43ic7" data-path="src/pages/FinancialTipsPage.tsx">
              <Input placeholder="Enter your email" className="flex-1" data-id="rgu4zey11" data-path="src/pages/FinancialTipsPage.tsx" />
              <Button className="bg-blue-600 hover:bg-blue-700" data-id="pwejqpvsf" data-path="src/pages/FinancialTipsPage.tsx">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2" data-id="h7eq0b34g" data-path="src/pages/FinancialTipsPage.tsx">
              Free newsletter • No spam • Unsubscribe anytime
            </p>
          </CardContent>
        </Card>

        {/* Categories Overview */}
        <Card data-id="gv3ud7qfq" data-path="src/pages/FinancialTipsPage.tsx">
          <CardHeader data-id="swkozkevp" data-path="src/pages/FinancialTipsPage.tsx">
            <CardTitle data-id="wia8b6frl" data-path="src/pages/FinancialTipsPage.tsx">Browse by Category</CardTitle>
            <CardDescription data-id="rlt4v6a34" data-path="src/pages/FinancialTipsPage.tsx">Explore financial topics that matter to you</CardDescription>
          </CardHeader>
          <CardContent data-id="5o1ogwhso" data-path="src/pages/FinancialTipsPage.tsx">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4" data-id="ws8y7g6cy" data-path="src/pages/FinancialTipsPage.tsx">
              {categories.map((category) => {
                const categoryTips = tips.filter((tip) => tip.category === category.name);
                return (
                  <Button
                    key={category.name}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => setSelectedCategory(category.name)} data-id="6skh2xked" data-path="src/pages/FinancialTipsPage.tsx">

                    <div className={`p-2 rounded-full ${category.color.replace('text-', 'bg-').replace('-800', '-100')}`} data-id="a4wq40kjm" data-path="src/pages/FinancialTipsPage.tsx">
                      {category.icon}
                    </div>
                    <div className="text-center" data-id="mcs1y5ts6" data-path="src/pages/FinancialTipsPage.tsx">
                      <div className="font-medium text-sm" data-id="efo6r8vv3" data-path="src/pages/FinancialTipsPage.tsx">{category.name}</div>
                      <div className="text-xs text-gray-500" data-id="nvbhjzgcm" data-path="src/pages/FinancialTipsPage.tsx">{categoryTips.length} articles</div>
                    </div>
                  </Button>);

              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>);

};

export default FinancialTipsPage;