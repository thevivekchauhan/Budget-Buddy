import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Gift,
  Search,
  ExternalLink,
  Clock,
  Star,
  CreditCard,
  Smartphone,
  GraduationCap,
  Coffee,
  ShoppingBag,
  Car,
  Home,
  Zap,
  Percent,
  Tag,
  TrendingUp,
  Users,
  Calendar,
  AlertCircle } from
'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';

const OffersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
  { name: 'Banking', icon: <CreditCard className="h-4 w-4" data-id="fzoxgdoyl" data-path="src/pages/OffersPage.tsx" />, color: 'bg-blue-100 text-blue-800' },
  { name: 'Technology', icon: <Smartphone className="h-4 w-4" data-id="n0pgub1yn" data-path="src/pages/OffersPage.tsx" />, color: 'bg-purple-100 text-purple-800' },
  { name: 'Education', icon: <GraduationCap className="h-4 w-4" data-id="94r92ggef" data-path="src/pages/OffersPage.tsx" />, color: 'bg-green-100 text-green-800' },
  { name: 'Food & Dining', icon: <Coffee className="h-4 w-4" data-id="4b7926onf" data-path="src/pages/OffersPage.tsx" />, color: 'bg-orange-100 text-orange-800' },
  { name: 'Shopping', icon: <ShoppingBag className="h-4 w-4" data-id="azz1th2q2" data-path="src/pages/OffersPage.tsx" />, color: 'bg-pink-100 text-pink-800' },
  { name: 'Transportation', icon: <Car className="h-4 w-4" data-id="qr7i4vwwp" data-path="src/pages/OffersPage.tsx" />, color: 'bg-indigo-100 text-indigo-800' },
  { name: 'Utilities', icon: <Zap className="h-4 w-4" data-id="1ba4pgjuv" data-path="src/pages/OffersPage.tsx" />, color: 'bg-yellow-100 text-yellow-800' }];


  const offers = [
  {
    id: 1,
    title: "HDFC Student Credit Card",
    description: "Get your first credit card with zero annual fee and special student benefits",
    category: "Banking",
    type: "Credit Card",
    discount: "0% Annual Fee",
    originalPrice: "₹500",
    discountedPrice: "Free",
    validTill: "2024-03-31",
    rating: 4.5,
    users: "10K+ students",
    benefits: ["₹10,000 credit limit", "Reward points on every purchase", "EMI options", "Build credit history"],
    link: "https://hdfc.com/student-card",
    isPartnership: true,
    priority: "high",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=120&fit=crop",
    code: "STUDENT2024"
  },
  {
    id: 2,
    title: "Adobe Creative Suite Student Discount",
    description: "Get 60% off on Adobe Creative Cloud for students and teachers",
    category: "Technology",
    type: "Software",
    discount: "60% OFF",
    originalPrice: "₹1,676/month",
    discountedPrice: "₹670/month",
    validTill: "2024-12-31",
    rating: 4.8,
    users: "50K+ students",
    benefits: ["Photoshop, Illustrator, Premiere Pro", "100GB cloud storage", "Portfolio website", "Learning resources"],
    link: "https://adobe.com/student-discount",
    isPartnership: false,
    priority: "high",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=200&h=120&fit=crop",
    code: "STUDENT60"
  },
  {
    id: 3,
    title: "Zomato Pro Student Plan",
    description: "Special student pricing for unlimited free delivery and exclusive discounts",
    category: "Food & Dining",
    type: "Subscription",
    discount: "50% OFF",
    originalPrice: "₹239/month",
    discountedPrice: "₹119/month",
    validTill: "2024-06-30",
    rating: 4.2,
    users: "25K+ students",
    benefits: ["Free delivery on orders above ₹149", "Extra discounts on restaurants", "Priority customer support", "No surge fee"],
    link: "https://zomato.com/pro-student",
    isPartnership: true,
    priority: "medium",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=120&fit=crop",
    code: "STUDPRO50"
  },
  {
    id: 4,
    title: "Microsoft Office 365 Education",
    description: "Free access to Word, Excel, PowerPoint, and 1TB OneDrive storage",
    category: "Education",
    type: "Software",
    discount: "100% FREE",
    originalPrice: "₹420/month",
    discountedPrice: "Free",
    validTill: "2024-12-31",
    rating: 4.7,
    users: "100K+ students",
    benefits: ["All Office apps", "1TB OneDrive storage", "Microsoft Teams", "Real-time collaboration"],
    link: "https://microsoft.com/education",
    isPartnership: false,
    priority: "high",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=200&h=120&fit=crop",
    code: "EDU365FREE"
  },
  {
    id: 5,
    title: "Spotify Premium Student",
    description: "Stream ad-free music with exclusive student pricing and Hulu included",
    category: "Technology",
    type: "Subscription",
    discount: "50% OFF",
    originalPrice: "₹119/month",
    discountedPrice: "₹59/month",
    validTill: "2024-12-31",
    rating: 4.6,
    users: "80K+ students",
    benefits: ["Ad-free music", "Offline downloads", "High-quality audio", "Podcast access"],
    link: "https://spotify.com/student",
    isPartnership: false,
    priority: "medium",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=120&fit=crop",
    code: "SPOT50"
  },
  {
    id: 6,
    title: "Amazon Prime Student",
    description: "Exclusive student membership with faster delivery and entertainment benefits",
    category: "Shopping",
    type: "Membership",
    discount: "50% OFF",
    originalPrice: "₹999/year",
    discountedPrice: "₹499/year",
    validTill: "2024-12-31",
    rating: 4.4,
    users: "200K+ students",
    benefits: ["Free one-day delivery", "Prime Video access", "Prime Music", "Exclusive deals"],
    link: "https://amazon.in/prime-student",
    isPartnership: true,
    priority: "high",
    image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200&h=120&fit=crop",
    code: "PRIMESTUD"
  },
  {
    id: 7,
    title: "Uber Student Discount",
    description: "Save on rides with special student pricing and exclusive promo codes",
    category: "Transportation",
    type: "Rides",
    discount: "15% OFF",
    originalPrice: "Regular fare",
    discountedPrice: "15% discount",
    validTill: "2024-06-30",
    rating: 4.1,
    users: "30K+ students",
    benefits: ["15% off rides", "Monthly promo codes", "Priority booking", "Safety features"],
    link: "https://uber.com/student",
    isPartnership: false,
    priority: "low",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=120&fit=crop",
    code: "UBER15"
  },
  {
    id: 8,
    title: "Coursera Plus Student",
    description: "Access to 7000+ courses and specializations with student discount",
    category: "Education",
    type: "Learning",
    discount: "50% OFF",
    originalPrice: "₹4,167/month",
    discountedPrice: "₹2,083/month",
    validTill: "2024-12-31",
    rating: 4.5,
    users: "15K+ students",
    benefits: ["7000+ courses", "University certificates", "Hands-on projects", "Career support"],
    link: "https://coursera.org/student",
    isPartnership: false,
    priority: "medium",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=120&fit=crop",
    code: "LEARN50"
  }];


  const filteredOffers = offers.filter((offer) => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || offer.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleClaimOffer = (offer: typeof offers[0]) => {
    // Copy code to clipboard
    navigator.clipboard.writeText(offer.code);

    toast({
      title: "Promo Code Copied!",
      description: `Code "${offer.code}" copied to clipboard. Opening offer page...`
    });

    // Open affiliate link
    window.open(offer.link, '_blank');
  };

  const getCategoryStyle = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.color : 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.icon : <Gift className="h-4 w-4" data-id="2q06duw4m" data-path="src/pages/OffersPage.tsx" />;
  };

  const OfferCard = ({ offer }: {offer: typeof offers[0];}) => {
    const isExpiringSoon = new Date(offer.validTill) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    return (
      <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden" data-id="ul8s9t38q" data-path="src/pages/OffersPage.tsx">
        <div className="relative" data-id="1xyvtx877" data-path="src/pages/OffersPage.tsx">
          <img
            src={offer.image}
            alt={offer.title}
            className="w-full h-32 object-cover" data-id="8oe3m4eb3" data-path="src/pages/OffersPage.tsx" />

          <div className="absolute top-2 left-2" data-id="2js26lq0t" data-path="src/pages/OffersPage.tsx">
            <Badge className="bg-red-500 text-white" data-id="anxs3b402" data-path="src/pages/OffersPage.tsx">
              {offer.discount}
            </Badge>
          </div>
          {offer.isPartnership &&
          <div className="absolute top-2 right-2" data-id="v7yxn8s9p" data-path="src/pages/OffersPage.tsx">
              <Badge variant="secondary" className="bg-blue-500 text-white" data-id="xju7mnfsu" data-path="src/pages/OffersPage.tsx">
                Partner
              </Badge>
            </div>
          }
          {isExpiringSoon &&
          <div className="absolute bottom-2 left-2" data-id="p8hmo221p" data-path="src/pages/OffersPage.tsx">
              <Badge variant="destructive" className="text-xs" data-id="dz2hzzvtp" data-path="src/pages/OffersPage.tsx">
                <Clock className="h-3 w-3 mr-1" data-id="uz78bw9sc" data-path="src/pages/OffersPage.tsx" />
                Expiring Soon
              </Badge>
            </div>
          }
        </div>
        
        <CardContent className="p-4" data-id="lnxka0jds" data-path="src/pages/OffersPage.tsx">
          <div className="flex items-center justify-between mb-2" data-id="u7679hhfn" data-path="src/pages/OffersPage.tsx">
            <Badge variant="secondary" className={getCategoryStyle(offer.category)} data-id="cxhj8f0rz" data-path="src/pages/OffersPage.tsx">
              {getCategoryIcon(offer.category)}
              <span className="ml-1" data-id="mnwgglf45" data-path="src/pages/OffersPage.tsx">{offer.category}</span>
            </Badge>
            <div className="flex items-center gap-1 text-sm text-gray-500" data-id="o5jo3qrz2" data-path="src/pages/OffersPage.tsx">
              <Star className="h-4 w-4 text-yellow-500" data-id="d2lhjvid0" data-path="src/pages/OffersPage.tsx" />
              {offer.rating}
            </div>
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 mb-2" data-id="p4wcyy2na" data-path="src/pages/OffersPage.tsx">{offer.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2" data-id="uopltu7j2" data-path="src/pages/OffersPage.tsx">{offer.description}</p>
          
          <div className="flex items-center justify-between mb-3" data-id="svvm5d7qu" data-path="src/pages/OffersPage.tsx">
            <div data-id="psr4pl238" data-path="src/pages/OffersPage.tsx">
              <div className="flex items-center gap-2" data-id="2wfabrr5v" data-path="src/pages/OffersPage.tsx">
                <span className="text-lg font-bold text-green-600" data-id="b3pa8p0sx" data-path="src/pages/OffersPage.tsx">{offer.discountedPrice}</span>
                {offer.originalPrice !== offer.discountedPrice &&
                <span className="text-sm text-gray-500 line-through" data-id="1v3u5qxbn" data-path="src/pages/OffersPage.tsx">{offer.originalPrice}</span>
                }
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1" data-id="6rfqq9hko" data-path="src/pages/OffersPage.tsx">
                <Users className="h-3 w-3" data-id="sr8hcdhi9" data-path="src/pages/OffersPage.tsx" />
                {offer.users}
              </div>
            </div>
            <div className="text-right" data-id="39c2iiday" data-path="src/pages/OffersPage.tsx">
              <div className="text-xs text-gray-500 flex items-center gap-1" data-id="a19zt7y8r" data-path="src/pages/OffersPage.tsx">
                <Calendar className="h-3 w-3" data-id="ghua2aa3u" data-path="src/pages/OffersPage.tsx" />
                Valid till {offer.validTill}
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4" data-id="aroes1fmr" data-path="src/pages/OffersPage.tsx">
            <h4 className="font-semibold text-sm" data-id="xhk4kh07z" data-path="src/pages/OffersPage.tsx">Benefits:</h4>
            <ul className="text-xs text-gray-600 space-y-1" data-id="8hl3eojqu" data-path="src/pages/OffersPage.tsx">
              {offer.benefits.slice(0, 3).map((benefit, index) =>
              <li key={index} className="flex items-center gap-1" data-id="94e2xlggc" data-path="src/pages/OffersPage.tsx">
                  <div className="w-1 h-1 bg-green-500 rounded-full" data-id="gcziqu4dv" data-path="src/pages/OffersPage.tsx"></div>
                  {benefit}
                </li>
              )}
              {offer.benefits.length > 3 &&
              <li className="text-gray-500" data-id="fn55fmb3c" data-path="src/pages/OffersPage.tsx">+{offer.benefits.length - 3} more benefits</li>
              }
            </ul>
          </div>
          
          <div className="space-y-2" data-id="5d0ldvpxo" data-path="src/pages/OffersPage.tsx">
            <Button
              onClick={() => handleClaimOffer(offer)}
              className="w-full bg-blue-600 hover:bg-blue-700" data-id="hbgxdst8i" data-path="src/pages/OffersPage.tsx">

              <Gift className="h-4 w-4 mr-2" data-id="jty15n1vm" data-path="src/pages/OffersPage.tsx" />
              Claim Offer
            </Button>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500" data-id="iaco0szwp" data-path="src/pages/OffersPage.tsx">
              <Tag className="h-3 w-3" data-id="ojs5kq0gk" data-path="src/pages/OffersPage.tsx" />
              Code: {offer.code}
            </div>
          </div>
        </CardContent>
      </Card>);

  };

  const featuredOffers = offers.filter((offer) => offer.priority === 'high').slice(0, 3);
  const expiringOffers = offers.filter((offer) =>
  new Date(offer.validTill) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  return (
    <DashboardLayout data-id="li381sbsz" data-path="src/pages/OffersPage.tsx">
      <div className="p-6 space-y-6" data-id="fsmc81sur" data-path="src/pages/OffersPage.tsx">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto" data-id="2po5kckcc" data-path="src/pages/OffersPage.tsx">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-id="knzew2wjo" data-path="src/pages/OffersPage.tsx">Student Offers & Deals</h1>
          <p className="text-xl text-gray-600" data-id="poucifww1" data-path="src/pages/OffersPage.tsx">
            Exclusive discounts and special offers to help you save money as a student
          </p>
        </div>

        {/* Alert for expiring offers */}
        {expiringOffers.length > 0 &&
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4" data-id="esph4u5lu" data-path="src/pages/OffersPage.tsx">
            <div className="flex items-center gap-2 text-orange-800" data-id="prg45p6tt" data-path="src/pages/OffersPage.tsx">
              <AlertCircle className="h-5 w-5" data-id="725avmzlr" data-path="src/pages/OffersPage.tsx" />
              <span className="font-semibold" data-id="9qm595mkx" data-path="src/pages/OffersPage.tsx">Hurry! {expiringOffers.length} offers expiring soon</span>
            </div>
          </div>
        }

        {/* Featured Offers */}
        <Card data-id="82x63x9ap" data-path="src/pages/OffersPage.tsx">
          <CardHeader data-id="yl7792fma" data-path="src/pages/OffersPage.tsx">
            <CardTitle className="flex items-center gap-2" data-id="mpnvhipnh" data-path="src/pages/OffersPage.tsx">
              <Star className="h-5 w-5 text-yellow-500" data-id="h16cqdxlf" data-path="src/pages/OffersPage.tsx" />
              Featured Offers
            </CardTitle>
            <CardDescription data-id="8mh87qfxl" data-path="src/pages/OffersPage.tsx">Hand-picked deals with maximum savings for students</CardDescription>
          </CardHeader>
          <CardContent data-id="cuch8zd7n" data-path="src/pages/OffersPage.tsx">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="61e9fmtrx" data-path="src/pages/OffersPage.tsx">
              {featuredOffers.map((offer) =>
              <OfferCard key={offer.id} offer={offer} data-id="hploesf1e" data-path="src/pages/OffersPage.tsx" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card data-id="e2psx75gd" data-path="src/pages/OffersPage.tsx">
          <CardContent className="p-6" data-id="ta699uhe2" data-path="src/pages/OffersPage.tsx">
            <div className="flex flex-col md:flex-row gap-4" data-id="50zfgunpb" data-path="src/pages/OffersPage.tsx">
              <div className="flex-1" data-id="ncxphjnlm" data-path="src/pages/OffersPage.tsx">
                <div className="relative" data-id="1or23yfzx" data-path="src/pages/OffersPage.tsx">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" data-id="tv8vtfjf0" data-path="src/pages/OffersPage.tsx" />
                  <Input
                    placeholder="Search offers and deals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10" data-id="oe5l46441" data-path="src/pages/OffersPage.tsx" />

                </div>
              </div>

              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)} data-id="g34kj9ps8" data-path="src/pages/OffersPage.tsx">

                <option value="All" data-id="9e1wnxryb" data-path="src/pages/OffersPage.tsx">All Categories</option>
                {categories.map((category) =>
                <option key={category.name} value={category.name} data-id="f5nuhc84n" data-path="src/pages/OffersPage.tsx">
                    {category.name}
                  </option>
                )}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Offers Tabs */}
        <Tabs defaultValue="all" className="w-full" data-id="e6gi7neo5" data-path="src/pages/OffersPage.tsx">
          <TabsList className="grid w-full grid-cols-4" data-id="n6lmozccq" data-path="src/pages/OffersPage.tsx">
            <TabsTrigger value="all" data-id="m6ma1c47p" data-path="src/pages/OffersPage.tsx">All Offers</TabsTrigger>
            <TabsTrigger value="banking" data-id="99n5znyow" data-path="src/pages/OffersPage.tsx">Banking & Finance</TabsTrigger>
            <TabsTrigger value="tech" data-id="uekiytw11" data-path="src/pages/OffersPage.tsx">Technology</TabsTrigger>
            <TabsTrigger value="lifestyle" data-id="gbgchffo0" data-path="src/pages/OffersPage.tsx">Lifestyle</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6" data-id="kui5odt8w" data-path="src/pages/OffersPage.tsx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="di7w0qlva" data-path="src/pages/OffersPage.tsx">
              {filteredOffers.map((offer) =>
              <OfferCard key={offer.id} offer={offer} data-id="s6vaws979" data-path="src/pages/OffersPage.tsx" />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="banking" className="mt-6" data-id="fm1u4dth8" data-path="src/pages/OffersPage.tsx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="7zlaazgpz" data-path="src/pages/OffersPage.tsx">
              {filteredOffers.filter((offer) => offer.category === 'Banking').map((offer) =>
              <OfferCard key={offer.id} offer={offer} data-id="98b7yt7dl" data-path="src/pages/OffersPage.tsx" />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="tech" className="mt-6" data-id="mb3y3xlvh" data-path="src/pages/OffersPage.tsx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="i0da7ow0o" data-path="src/pages/OffersPage.tsx">
              {filteredOffers.filter((offer) => offer.category === 'Technology').map((offer) =>
              <OfferCard key={offer.id} offer={offer} data-id="yhbjggy0k" data-path="src/pages/OffersPage.tsx" />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="lifestyle" className="mt-6" data-id="2qpe5rwlz" data-path="src/pages/OffersPage.tsx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="jqpbxsin3" data-path="src/pages/OffersPage.tsx">
              {filteredOffers.filter((offer) => ['Food & Dining', 'Shopping', 'Transportation'].includes(offer.category)).map((offer) =>
              <OfferCard key={offer.id} offer={offer} data-id="pwb7m79vy" data-path="src/pages/OffersPage.tsx" />
              )}
            </div>
          </TabsContent>
        </Tabs>

        {filteredOffers.length === 0 &&
        <div className="text-center py-12" data-id="aa7m1od89" data-path="src/pages/OffersPage.tsx">
            <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" data-id="dzkteq3sn" data-path="src/pages/OffersPage.tsx" />
            <h3 className="text-lg font-medium text-gray-900 mb-2" data-id="w6dn7342b" data-path="src/pages/OffersPage.tsx">No offers found</h3>
            <p className="text-gray-600" data-id="74kez0tgp" data-path="src/pages/OffersPage.tsx">
              Try adjusting your search terms or browse different categories.
            </p>
          </div>
        }

        {/* Categories Overview */}
        <Card data-id="mi77hg10x" data-path="src/pages/OffersPage.tsx">
          <CardHeader data-id="x3i5n49np" data-path="src/pages/OffersPage.tsx">
            <CardTitle data-id="c5tlst1fc" data-path="src/pages/OffersPage.tsx">Browse by Category</CardTitle>
            <CardDescription data-id="u3l1e17du" data-path="src/pages/OffersPage.tsx">Find offers in specific categories</CardDescription>
          </CardHeader>
          <CardContent data-id="nwhdf9uw4" data-path="src/pages/OffersPage.tsx">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4" data-id="bsrawyzn7" data-path="src/pages/OffersPage.tsx">
              {categories.map((category) => {
                const categoryOffers = offers.filter((offer) => offer.category === category.name);
                return (
                  <Button
                    key={category.name}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => setSelectedCategory(category.name)} data-id="wqin35m41" data-path="src/pages/OffersPage.tsx">

                    <div className={`p-2 rounded-full ${category.color.replace('text-', 'bg-').replace('-800', '-100')}`} data-id="quyg8cb3w" data-path="src/pages/OffersPage.tsx">
                      {category.icon}
                    </div>
                    <div className="text-center" data-id="x2fnu92nc" data-path="src/pages/OffersPage.tsx">
                      <div className="font-medium text-sm" data-id="pe1uvcewi" data-path="src/pages/OffersPage.tsx">{category.name}</div>
                      <div className="text-xs text-gray-500" data-id="fxyw0uj5a" data-path="src/pages/OffersPage.tsx">{categoryOffers.length} offers</div>
                    </div>
                  </Button>);

              })}
            </div>
          </CardContent>
        </Card>

        {/* Savings Calculator */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0" data-id="tad7m55d6" data-path="src/pages/OffersPage.tsx">
          <CardContent className="p-8 text-center" data-id="vkwrpe53v" data-path="src/pages/OffersPage.tsx">
            <h3 className="text-2xl font-bold text-gray-900 mb-2" data-id="021b7qbc0" data-path="src/pages/OffersPage.tsx">Calculate Your Savings</h3>
            <p className="text-gray-600 mb-6" data-id="goqcmh9s2" data-path="src/pages/OffersPage.tsx">
              Students using our deals save an average of ₹5,000 per month
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto" data-id="36bkdr01g" data-path="src/pages/OffersPage.tsx">
              <div className="text-center" data-id="2rfgtuzzq" data-path="src/pages/OffersPage.tsx">
                <div className="text-3xl font-bold text-green-600 mb-1" data-id="ldo4yztcd" data-path="src/pages/OffersPage.tsx">₹60,000</div>
                <div className="text-sm text-gray-600" data-id="zjivlys2n" data-path="src/pages/OffersPage.tsx">Average Annual Savings</div>
              </div>
              <div className="text-center" data-id="utpbu1yve" data-path="src/pages/OffersPage.tsx">
                <div className="text-3xl font-bold text-blue-600 mb-1" data-id="4kirhp16s" data-path="src/pages/OffersPage.tsx">50+</div>
                <div className="text-sm text-gray-600" data-id="zh0d8xb6h" data-path="src/pages/OffersPage.tsx">Active Offers</div>
              </div>
              <div className="text-center" data-id="wlv9q1vij" data-path="src/pages/OffersPage.tsx">
                <div className="text-3xl font-bold text-purple-600 mb-1" data-id="9wljbmkhv" data-path="src/pages/OffersPage.tsx">100K+</div>
                <div className="text-sm text-gray-600" data-id="fabdz1djr" data-path="src/pages/OffersPage.tsx">Students Benefited</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card data-id="7s808cwmh" data-path="src/pages/OffersPage.tsx">
          <CardHeader data-id="tubl2uhxt" data-path="src/pages/OffersPage.tsx">
            <CardTitle data-id="vx2i117bm" data-path="src/pages/OffersPage.tsx">How to Use Offers</CardTitle>
          </CardHeader>
          <CardContent data-id="4rjtdm8ke" data-path="src/pages/OffersPage.tsx">
            <div className="grid md:grid-cols-3 gap-6" data-id="h3u7xoxua" data-path="src/pages/OffersPage.tsx">
              <div className="text-center p-4" data-id="8bckufdlr" data-path="src/pages/OffersPage.tsx">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center" data-id="xiuc7lzcc" data-path="src/pages/OffersPage.tsx">
                  <Search className="h-8 w-8 text-blue-600" data-id="zbvwdzazu" data-path="src/pages/OffersPage.tsx" />
                </div>
                <h3 className="font-semibold mb-2" data-id="x4qknp4oi" data-path="src/pages/OffersPage.tsx">1. Browse Offers</h3>
                <p className="text-sm text-gray-600" data-id="ap457f5vl" data-path="src/pages/OffersPage.tsx">
                  Find deals that match your needs and interests
                </p>
              </div>
              <div className="text-center p-4" data-id="g7jbjdqvh" data-path="src/pages/OffersPage.tsx">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center" data-id="74m5igmet" data-path="src/pages/OffersPage.tsx">
                  <Tag className="h-8 w-8 text-green-600" data-id="puzdmwgbu" data-path="src/pages/OffersPage.tsx" />
                </div>
                <h3 className="font-semibold mb-2" data-id="cpt45zr9m" data-path="src/pages/OffersPage.tsx">2. Copy Code</h3>
                <p className="text-sm text-gray-600" data-id="dmqx90u0a" data-path="src/pages/OffersPage.tsx">
                  Click claim offer to copy the promo code automatically
                </p>
              </div>
              <div className="text-center p-4" data-id="ev9jh6971" data-path="src/pages/OffersPage.tsx">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center" data-id="6dw79rxc8" data-path="src/pages/OffersPage.tsx">
                  <ExternalLink className="h-8 w-8 text-purple-600" data-id="0x16jbqh0" data-path="src/pages/OffersPage.tsx" />
                </div>
                <h3 className="font-semibold mb-2" data-id="58bv3jcj4" data-path="src/pages/OffersPage.tsx">3. Apply & Save</h3>
                <p className="text-sm text-gray-600" data-id="o0qewvkpm" data-path="src/pages/OffersPage.tsx">
                  Use the code on the partner website and enjoy savings
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>);

};

export default OffersPage;