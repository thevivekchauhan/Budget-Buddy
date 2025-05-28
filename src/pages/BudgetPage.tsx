import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Target,
  Plus,
  Edit,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Wallet,
  PieChart,
  Settings,
  Calendar,
  ArrowUpCircle,
  ArrowDownCircle } from
'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';

const BudgetPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [isSetupDialogOpen, setIsSetupDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Mock budget data
  const [budgetData, setBudgetData] = useState({
    totalBudget: 20000,
    totalSpent: 12500,
    totalRemaining: 7500,
    budgetPeriod: 'January 2024',
    categories: [
    {
      id: 1,
      name: 'Food',
      allocated: 5000,
      spent: 4500,
      remaining: 500,
      percentage: 90,
      icon: '🍽️',
      color: '#ef4444',
      trend: 'over_budget',
      lastMonth: 4200
    },
    {
      id: 2,
      name: 'Transport',
      allocated: 2500,
      spent: 2000,
      remaining: 500,
      percentage: 80,
      icon: '🚗',
      color: '#f59e0b',
      trend: 'on_track',
      lastMonth: 2100
    },
    {
      id: 3,
      name: 'Entertainment',
      allocated: 2000,
      spent: 1500,
      remaining: 500,
      percentage: 75,
      icon: '🎬',
      color: '#10b981',
      trend: 'under_budget',
      lastMonth: 1800
    },
    {
      id: 4,
      name: 'Study Materials',
      allocated: 3000,
      spent: 2500,
      remaining: 500,
      percentage: 83,
      icon: '📚',
      color: '#3b82f6',
      trend: 'on_track',
      lastMonth: 2300
    },
    {
      id: 5,
      name: 'Shopping',
      allocated: 2500,
      spent: 1500,
      remaining: 1000,
      percentage: 60,
      icon: '🛍️',
      color: '#8b5cf6',
      trend: 'under_budget',
      lastMonth: 2000
    },
    {
      id: 6,
      name: 'Health',
      allocated: 1500,
      spent: 500,
      remaining: 1000,
      percentage: 33,
      icon: '🏥',
      color: '#06b6d4',
      trend: 'under_budget',
      lastMonth: 800
    },
    {
      id: 7,
      name: 'Personal Care',
      allocated: 1000,
      spent: 0,
      remaining: 1000,
      percentage: 0,
      icon: '💄',
      color: '#ec4899',
      trend: 'under_budget',
      lastMonth: 400
    },
    {
      id: 8,
      name: 'Others',
      allocated: 2500,
      spent: 0,
      remaining: 2500,
      percentage: 0,
      icon: '📦',
      color: '#6b7280',
      trend: 'under_budget',
      lastMonth: 300
    }]

  });

  const [newBudget, setNewBudget] = useState({
    totalBudget: '',
    categories: budgetData.categories.map((cat) => ({
      name: cat.name,
      allocated: cat.allocated.toString()
    }))
  });

  const getBudgetStatus = (percentage: number) => {
    if (percentage >= 90) return { status: 'danger', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    if (percentage >= 75) return { status: 'warning', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    return { status: 'safe', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
  };

  const getTrendIcon = (trend: string, lastMonth: number, current: number) => {
    const change = (current - lastMonth) / lastMonth * 100;
    if (change > 10) return <ArrowUpCircle className="h-4 w-4 text-red-500" data-id="65rs09cwt" data-path="src/pages/BudgetPage.tsx" />;
    if (change < -10) return <ArrowDownCircle className="h-4 w-4 text-green-500" data-id="lrryiac5f" data-path="src/pages/BudgetPage.tsx" />;
    return <div className="h-4 w-4" data-id="6y9yqj80a" data-path="src/pages/BudgetPage.tsx" />;
  };

  const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899', '#6b7280'];

  const pieChartData = budgetData.categories.map((category, index) => ({
    name: category.name,
    value: category.allocated,
    color: COLORS[index % COLORS.length]
  }));

  const comparisonData = budgetData.categories.map((category) => ({
    name: category.name.length > 8 ? category.name.substring(0, 8) + '...' : category.name,
    allocated: category.allocated,
    spent: category.spent
  }));

  const handleSaveBudget = () => {
    const totalAllocated = newBudget.categories.reduce((sum, cat) => sum + parseFloat(cat.allocated || '0'), 0);
    const totalBudgetNum = parseFloat(newBudget.totalBudget);

    if (totalAllocated > totalBudgetNum) {
      toast({
        title: "Budget Allocation Error",
        description: "Total category allocations exceed your total budget.",
        variant: "destructive"
      });
      return;
    }

    // Update budget data
    setBudgetData((prev) => ({
      ...prev,
      totalBudget: totalBudgetNum,
      categories: prev.categories.map((cat, index) => ({
        ...cat,
        allocated: parseFloat(newBudget.categories[index].allocated || '0'),
        remaining: parseFloat(newBudget.categories[index].allocated || '0') - cat.spent,
        percentage: cat.spent > 0 ? cat.spent / parseFloat(newBudget.categories[index].allocated || '1') * 100 : 0
      }))
    }));

    setIsSetupDialogOpen(false);
    toast({
      title: "Budget Updated",
      description: "Your budget has been successfully updated."
    });
  };

  const BudgetCategoryCard = ({ category }: {category: typeof budgetData.categories[0];}) => {
    const status = getBudgetStatus(category.percentage);

    return (
      <Card className={`hover:shadow-lg transition-all duration-300 ${status.bg} ${status.border}`} data-id="6wghar1wy" data-path="src/pages/BudgetPage.tsx">
        <CardContent className="p-6" data-id="5hghv01n8" data-path="src/pages/BudgetPage.tsx">
          <div className="flex items-center justify-between mb-4" data-id="etkgfj4fo" data-path="src/pages/BudgetPage.tsx">
            <div className="flex items-center space-x-3" data-id="5ddi55upj" data-path="src/pages/BudgetPage.tsx">
              <span className="text-2xl" data-id="rx2m91d78" data-path="src/pages/BudgetPage.tsx">{category.icon}</span>
              <div data-id="kpv3xw12s" data-path="src/pages/BudgetPage.tsx">
                <h3 className="font-semibold text-gray-900" data-id="fxk4ez5at" data-path="src/pages/BudgetPage.tsx">{category.name}</h3>
                <div className="flex items-center gap-2" data-id="9dvclmr0u" data-path="src/pages/BudgetPage.tsx">
                  <Badge variant="outline" className={status.color} data-id="9y49ypexs" data-path="src/pages/BudgetPage.tsx">
                    {category.percentage.toFixed(0)}% used
                  </Badge>
                  {getTrendIcon(category.trend, category.lastMonth, category.spent)}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setEditingCategory(category)} data-id="voa2k3o2a" data-path="src/pages/BudgetPage.tsx">
              <Edit className="h-4 w-4" data-id="7rvv11n53" data-path="src/pages/BudgetPage.tsx" />
            </Button>
          </div>

          <div className="space-y-3" data-id="9osf5ed7x" data-path="src/pages/BudgetPage.tsx">
            <div className="flex justify-between text-sm" data-id="q2sftbj8i" data-path="src/pages/BudgetPage.tsx">
              <span className="text-gray-600" data-id="7ejhd8xad" data-path="src/pages/BudgetPage.tsx">Spent</span>
              <span className={`font-semibold ${status.color}`} data-id="upu5pb0up" data-path="src/pages/BudgetPage.tsx">
                ₹{category.spent.toLocaleString()}
              </span>
            </div>
            
            <Progress
              value={category.percentage}
              className={`h-3 ${status.color.replace('text-', 'text-')}`} data-id="q5arzps17" data-path="src/pages/BudgetPage.tsx" />

            
            <div className="flex justify-between text-sm" data-id="pcqyrcogy" data-path="src/pages/BudgetPage.tsx">
              <span className="text-gray-600" data-id="pkg4zmeve" data-path="src/pages/BudgetPage.tsx">Budget: ₹{category.allocated.toLocaleString()}</span>
              <span className={`font-semibold ${
              category.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`
              } data-id="mpnhb6icq" data-path="src/pages/BudgetPage.tsx">
                ₹{Math.abs(category.remaining).toLocaleString()} {category.remaining >= 0 ? 'left' : 'over'}
              </span>
            </div>

            {category.lastMonth &&
            <div className="text-xs text-gray-500 pt-2 border-t" data-id="jivj4y5wz" data-path="src/pages/BudgetPage.tsx">
                Last month: ₹{category.lastMonth.toLocaleString()}
                <span className={`ml-2 ${
              category.spent > category.lastMonth ? 'text-red-500' : 'text-green-500'}`
              } data-id="1ls838ajc" data-path="src/pages/BudgetPage.tsx">
                  {category.spent > category.lastMonth ? '+' : ''}
                  {((category.spent - category.lastMonth) / category.lastMonth * 100).toFixed(1)}%
                </span>
              </div>
            }
          </div>
        </CardContent>
      </Card>);

  };

  const BudgetSetupForm = () =>
  <div className="space-y-6" data-id="gqw1gcl2j" data-path="src/pages/BudgetPage.tsx">
      <div className="space-y-2" data-id="jbcs7mip6" data-path="src/pages/BudgetPage.tsx">
        <Label htmlFor="totalBudget" data-id="ddfwnvmo5" data-path="src/pages/BudgetPage.tsx">Monthly Budget (₹)</Label>
        <Input
        id="totalBudget"
        type="number"
        placeholder="Enter your total monthly budget"
        value={newBudget.totalBudget}
        onChange={(e) => setNewBudget((prev) => ({ ...prev, totalBudget: e.target.value }))} data-id="t68erxph2" data-path="src/pages/BudgetPage.tsx" />

      </div>

      <div className="space-y-4" data-id="mpff3h48c" data-path="src/pages/BudgetPage.tsx">
        <Label data-id="kf4jcqs4s" data-path="src/pages/BudgetPage.tsx">Category Allocations</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto" data-id="fjbunsomw" data-path="src/pages/BudgetPage.tsx">
          {newBudget.categories.map((category, index) =>
        <div key={category.name} className="flex items-center space-x-2" data-id="bc0jjlsb1" data-path="src/pages/BudgetPage.tsx">
              <span className="text-sm w-20 text-gray-600" data-id="y204uef7v" data-path="src/pages/BudgetPage.tsx">{category.name}:</span>
              <Input
            type="number"
            placeholder="0"
            value={category.allocated}
            onChange={(e) => {
              const updated = [...newBudget.categories];
              updated[index].allocated = e.target.value;
              setNewBudget((prev) => ({ ...prev, categories: updated }));
            }}
            className="flex-1" data-id="s37neagkj" data-path="src/pages/BudgetPage.tsx" />

            </div>
        )}
        </div>
        
        <div className="text-sm text-gray-600" data-id="y915iggyj" data-path="src/pages/BudgetPage.tsx">
          Total Allocated: ₹{newBudget.categories.reduce((sum, cat) => sum + parseFloat(cat.allocated || '0'), 0).toLocaleString()}
          {newBudget.totalBudget &&
        <span className="ml-2" data-id="29345klmc" data-path="src/pages/BudgetPage.tsx">
              / ₹{parseFloat(newBudget.totalBudget).toLocaleString()}
            </span>
        }
        </div>
      </div>

      <div className="flex space-x-2 pt-4" data-id="tycbvwv2t" data-path="src/pages/BudgetPage.tsx">
        <Button onClick={handleSaveBudget} className="flex-1" data-id="7co5gr73q" data-path="src/pages/BudgetPage.tsx">
          Save Budget
        </Button>
        <Button variant="outline" onClick={() => setIsSetupDialogOpen(false)} data-id="beqabanxk" data-path="src/pages/BudgetPage.tsx">
          Cancel
        </Button>
      </div>
    </div>;


  return (
    <DashboardLayout data-id="hdkmfwlpp" data-path="src/pages/BudgetPage.tsx">
      <div className="p-6 space-y-6" data-id="y79bc37nn" data-path="src/pages/BudgetPage.tsx">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" data-id="5gf1g1nca" data-path="src/pages/BudgetPage.tsx">
          <div data-id="s73omkiax" data-path="src/pages/BudgetPage.tsx">
            <h1 className="text-3xl font-bold text-gray-900" data-id="dwcmoq6sd" data-path="src/pages/BudgetPage.tsx">Budget Planning</h1>
            <p className="text-gray-600" data-id="4h1ur6z0e" data-path="src/pages/BudgetPage.tsx">Plan and track your monthly spending</p>
          </div>
          <div className="flex gap-2" data-id="h0z70cxyv" data-path="src/pages/BudgetPage.tsx">
            <Dialog open={isSetupDialogOpen} onOpenChange={setIsSetupDialogOpen} data-id="o0rvfa612" data-path="src/pages/BudgetPage.tsx">
              <DialogTrigger asChild data-id="cmcf8jjox" data-path="src/pages/BudgetPage.tsx">
                <Button variant="outline" data-id="rttoo0h6u" data-path="src/pages/BudgetPage.tsx">
                  <Settings className="h-4 w-4 mr-2" data-id="oq9skj2a4" data-path="src/pages/BudgetPage.tsx" />
                  Setup Budget
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl" data-id="pzrut86en" data-path="src/pages/BudgetPage.tsx">
                <DialogHeader data-id="juzxnj4bj" data-path="src/pages/BudgetPage.tsx">
                  <DialogTitle data-id="nydhvryhc" data-path="src/pages/BudgetPage.tsx">Setup Monthly Budget</DialogTitle>
                  <DialogDescription data-id="8p298el0u" data-path="src/pages/BudgetPage.tsx">
                    Set your total monthly budget and allocate amounts to different categories.
                  </DialogDescription>
                </DialogHeader>
                <BudgetSetupForm data-id="3mwqgqpgq" data-path="src/pages/BudgetPage.tsx" />
              </DialogContent>
            </Dialog>
            <Button data-id="ck04syntd" data-path="src/pages/BudgetPage.tsx">
              <Calendar className="h-4 w-4 mr-2" data-id="o5o077x5c" data-path="src/pages/BudgetPage.tsx" />
              {budgetData.budgetPeriod}
            </Button>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-id="ber4jd474" data-path="src/pages/BudgetPage.tsx">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200" data-id="ofczusbd9" data-path="src/pages/BudgetPage.tsx">
            <CardContent className="p-6" data-id="b98h2uave" data-path="src/pages/BudgetPage.tsx">
              <div className="flex items-center justify-between" data-id="6o0p7hi1x" data-path="src/pages/BudgetPage.tsx">
                <div data-id="9erb7ypex" data-path="src/pages/BudgetPage.tsx">
                  <p className="text-sm font-medium text-blue-700" data-id="sv6r4vs80" data-path="src/pages/BudgetPage.tsx">Total Budget</p>
                  <p className="text-2xl font-bold text-blue-900" data-id="1vz0uymo4" data-path="src/pages/BudgetPage.tsx">₹{budgetData.totalBudget.toLocaleString()}</p>
                </div>
                <Target className="h-8 w-8 text-blue-600" data-id="pc3qje4hn" data-path="src/pages/BudgetPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200" data-id="0ir6red5s" data-path="src/pages/BudgetPage.tsx">
            <CardContent className="p-6" data-id="245h9afhc" data-path="src/pages/BudgetPage.tsx">
              <div className="flex items-center justify-between" data-id="12jexxqkj" data-path="src/pages/BudgetPage.tsx">
                <div data-id="7z312rdo9" data-path="src/pages/BudgetPage.tsx">
                  <p className="text-sm font-medium text-red-700" data-id="7fv6ygk2g" data-path="src/pages/BudgetPage.tsx">Total Spent</p>
                  <p className="text-2xl font-bold text-red-900" data-id="rzjuq4853" data-path="src/pages/BudgetPage.tsx">₹{budgetData.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-red-600" data-id="5l49cgqsn" data-path="src/pages/BudgetPage.tsx">
                    {(budgetData.totalSpent / budgetData.totalBudget * 100).toFixed(1)}% of budget
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-red-600" data-id="vduz75ogx" data-path="src/pages/BudgetPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200" data-id="bgbnmz0s6" data-path="src/pages/BudgetPage.tsx">
            <CardContent className="p-6" data-id="q6p8m3man" data-path="src/pages/BudgetPage.tsx">
              <div className="flex items-center justify-between" data-id="my5vhdoym" data-path="src/pages/BudgetPage.tsx">
                <div data-id="3fpxg2qah" data-path="src/pages/BudgetPage.tsx">
                  <p className="text-sm font-medium text-green-700" data-id="xer9z0wbc" data-path="src/pages/BudgetPage.tsx">Remaining</p>
                  <p className="text-2xl font-bold text-green-900" data-id="073erf0b1" data-path="src/pages/BudgetPage.tsx">₹{budgetData.totalRemaining.toLocaleString()}</p>
                  <p className="text-xs text-green-600" data-id="zjrc2mvf3" data-path="src/pages/BudgetPage.tsx">
                    {(budgetData.totalRemaining / budgetData.totalBudget * 100).toFixed(1)}% left
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" data-id="szj3sr65c" data-path="src/pages/BudgetPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200" data-id="8pr5fo06m" data-path="src/pages/BudgetPage.tsx">
            <CardContent className="p-6" data-id="2avxxpo3t" data-path="src/pages/BudgetPage.tsx">
              <div className="flex items-center justify-between" data-id="83rl3jwpu" data-path="src/pages/BudgetPage.tsx">
                <div data-id="rhgypyzu8" data-path="src/pages/BudgetPage.tsx">
                  <p className="text-sm font-medium text-purple-700" data-id="aeszsv7jk" data-path="src/pages/BudgetPage.tsx">Budget Usage</p>
                  <p className="text-2xl font-bold text-purple-900" data-id="kjzjojt3f" data-path="src/pages/BudgetPage.tsx">
                    {(budgetData.totalSpent / budgetData.totalBudget * 100).toFixed(1)}%
                  </p>
                  <Progress
                    value={budgetData.totalSpent / budgetData.totalBudget * 100}
                    className="h-2 mt-2" data-id="0grg2n9ja" data-path="src/pages/BudgetPage.tsx" />

                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" data-id="464ukdowb" data-path="src/pages/BudgetPage.tsx" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-id="zmnd9g8yl" data-path="src/pages/BudgetPage.tsx">
          {/* Budget Distribution */}
          <Card data-id="s7jxam6ak" data-path="src/pages/BudgetPage.tsx">
            <CardHeader data-id="mxsnlv26j" data-path="src/pages/BudgetPage.tsx">
              <CardTitle data-id="v9jg6ccsf" data-path="src/pages/BudgetPage.tsx">Budget Distribution</CardTitle>
              <CardDescription data-id="35dqm7is8" data-path="src/pages/BudgetPage.tsx">How your budget is allocated across categories</CardDescription>
            </CardHeader>
            <CardContent data-id="gc1swzqnr" data-path="src/pages/BudgetPage.tsx">
              <div className="grid md:grid-cols-2 gap-4" data-id="od0bb6kgr" data-path="src/pages/BudgetPage.tsx">
                <ResponsiveContainer width="100%" height={250} data-id="8wuwzl0x6" data-path="src/pages/BudgetPage.tsx">
                  <RechartsPieChart data-id="hgoxkb0um" data-path="src/pages/BudgetPage.tsx">
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value" data-id="kmjorkjap" data-path="src/pages/BudgetPage.tsx">

                      {pieChartData.map((entry, index) =>
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} data-id="yt2k2hiv6" data-path="src/pages/BudgetPage.tsx" />
                      )}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, '']} data-id="oqjd2zfl8" data-path="src/pages/BudgetPage.tsx" />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="space-y-2" data-id="1g5k3l8vw" data-path="src/pages/BudgetPage.tsx">
                  {pieChartData.map((category, index) =>
                  <div key={category.name} className="flex items-center justify-between" data-id="u6o6pisfd" data-path="src/pages/BudgetPage.tsx">
                      <div className="flex items-center gap-2" data-id="z5og3xvma" data-path="src/pages/BudgetPage.tsx">
                        <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }} data-id="rnyk7cww1" data-path="src/pages/BudgetPage.tsx" />

                        <span className="text-sm font-medium" data-id="cyh65102q" data-path="src/pages/BudgetPage.tsx">{category.name}</span>
                      </div>
                      <div className="text-right" data-id="7anx2t3g9" data-path="src/pages/BudgetPage.tsx">
                        <div className="text-sm font-medium" data-id="zotyzngxz" data-path="src/pages/BudgetPage.tsx">₹{category.value.toLocaleString()}</div>
                        <div className="text-xs text-gray-500" data-id="gutiju8pl" data-path="src/pages/BudgetPage.tsx">
                          {(category.value / budgetData.totalBudget * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Allocated vs Spent */}
          <Card data-id="1u43jnnsy" data-path="src/pages/BudgetPage.tsx">
            <CardHeader data-id="wunuuhcj4" data-path="src/pages/BudgetPage.tsx">
              <CardTitle data-id="rtlowadbq" data-path="src/pages/BudgetPage.tsx">Allocated vs Spent</CardTitle>
              <CardDescription data-id="hjfdtqahv" data-path="src/pages/BudgetPage.tsx">Compare your budget allocation with actual spending</CardDescription>
            </CardHeader>
            <CardContent data-id="kft09q98o" data-path="src/pages/BudgetPage.tsx">
              <ResponsiveContainer width="100%" height={300} data-id="ww3f10p9z" data-path="src/pages/BudgetPage.tsx">
                <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} data-id="aku1ptcjw" data-path="src/pages/BudgetPage.tsx">
                  <CartesianGrid strokeDasharray="3 3" data-id="ev4acvlh4" data-path="src/pages/BudgetPage.tsx" />
                  <XAxis dataKey="name" fontSize={12} data-id="v080m37u6" data-path="src/pages/BudgetPage.tsx" />
                  <YAxis data-id="y0vyb0xf7" data-path="src/pages/BudgetPage.tsx" />
                  <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, '']} data-id="dpl1qvxap" data-path="src/pages/BudgetPage.tsx" />
                  <Bar dataKey="allocated" fill="#3b82f6" name="Allocated" data-id="gvbrxeude" data-path="src/pages/BudgetPage.tsx" />
                  <Bar dataKey="spent" fill="#ef4444" name="Spent" data-id="l9htuidb2" data-path="src/pages/BudgetPage.tsx" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Budget Categories */}
        <Card data-id="4cu71ydo7" data-path="src/pages/BudgetPage.tsx">
          <CardHeader data-id="bczxtaxll" data-path="src/pages/BudgetPage.tsx">
            <CardTitle data-id="4qulmg0x9" data-path="src/pages/BudgetPage.tsx">Budget Categories</CardTitle>
            <CardDescription data-id="43iqpwqy5" data-path="src/pages/BudgetPage.tsx">Detailed view of your spending in each category</CardDescription>
          </CardHeader>
          <CardContent data-id="dorydmtfo" data-path="src/pages/BudgetPage.tsx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-id="c55k8fe0m" data-path="src/pages/BudgetPage.tsx">
              {budgetData.categories.map((category) =>
              <BudgetCategoryCard key={category.id} category={category} data-id="ig95i04dz" data-path="src/pages/BudgetPage.tsx" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Budget Tips */}
        <Card data-id="at1lli7yu" data-path="src/pages/BudgetPage.tsx">
          <CardHeader data-id="1ks9k3ie6" data-path="src/pages/BudgetPage.tsx">
            <CardTitle data-id="9ro7ngr22" data-path="src/pages/BudgetPage.tsx">Budget Tips</CardTitle>
          </CardHeader>
          <CardContent data-id="lsk6s4511" data-path="src/pages/BudgetPage.tsx">
            <div className="grid md:grid-cols-2 gap-4" data-id="3kt7uclca" data-path="src/pages/BudgetPage.tsx">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg" data-id="ht8eb1dwd" data-path="src/pages/BudgetPage.tsx">
                <div className="bg-blue-100 p-2 rounded-full" data-id="tq6eg7uq5" data-path="src/pages/BudgetPage.tsx">
                  <Target className="h-5 w-5 text-blue-600" data-id="jv3t466ih" data-path="src/pages/BudgetPage.tsx" />
                </div>
                <div data-id="gyt8o6iex" data-path="src/pages/BudgetPage.tsx">
                  <h4 className="font-medium text-blue-900" data-id="f2yxzzhjj" data-path="src/pages/BudgetPage.tsx">Follow the 50/30/20 Rule</h4>
                  <p className="text-sm text-blue-700 mt-1" data-id="id2qtsiwh" data-path="src/pages/BudgetPage.tsx">
                    Allocate 50% for needs, 30% for wants, and 20% for savings and debt repayment.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg" data-id="un4kicgzp" data-path="src/pages/BudgetPage.tsx">
                <div className="bg-green-100 p-2 rounded-full" data-id="4gh60zehe" data-path="src/pages/BudgetPage.tsx">
                  <CheckCircle className="h-5 w-5 text-green-600" data-id="g08e8mt99" data-path="src/pages/BudgetPage.tsx" />
                </div>
                <div data-id="cczcvyux6" data-path="src/pages/BudgetPage.tsx">
                  <h4 className="font-medium text-green-900" data-id="fbd9t5fm4" data-path="src/pages/BudgetPage.tsx">Track Daily Expenses</h4>
                  <p className="text-sm text-green-700 mt-1" data-id="0qcfrb3le" data-path="src/pages/BudgetPage.tsx">
                    Record every expense to stay within your budget and identify spending patterns.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg" data-id="n8ra2luzk" data-path="src/pages/BudgetPage.tsx">
                <div className="bg-yellow-100 p-2 rounded-full" data-id="3noufvgc6" data-path="src/pages/BudgetPage.tsx">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" data-id="ws2ast8i8" data-path="src/pages/BudgetPage.tsx" />
                </div>
                <div data-id="80uj6bata" data-path="src/pages/BudgetPage.tsx">
                  <h4 className="font-medium text-yellow-900" data-id="yo4a1h2ay" data-path="src/pages/BudgetPage.tsx">Review Monthly</h4>
                  <p className="text-sm text-yellow-700 mt-1" data-id="9y8kyd03v" data-path="src/pages/BudgetPage.tsx">
                    Review and adjust your budget monthly based on your spending patterns.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg" data-id="o106f8ave" data-path="src/pages/BudgetPage.tsx">
                <div className="bg-purple-100 p-2 rounded-full" data-id="v1rwis6m7" data-path="src/pages/BudgetPage.tsx">
                  <PieChart className="h-5 w-5 text-purple-600" data-id="dl2vx4c34" data-path="src/pages/BudgetPage.tsx" />
                </div>
                <div data-id="4k4zg4hpx" data-path="src/pages/BudgetPage.tsx">
                  <h4 className="font-medium text-purple-900" data-id="2r2326yoa" data-path="src/pages/BudgetPage.tsx">Emergency Fund</h4>
                  <p className="text-sm text-purple-700 mt-1" data-id="p2zdtetn8" data-path="src/pages/BudgetPage.tsx">
                    Keep aside 10-15% of your budget for unexpected expenses.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>);

};

export default BudgetPage;