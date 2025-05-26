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
    if (change > 10) return <ArrowUpCircle className="h-4 w-4 text-red-500" data-id="y87q9e57d" data-path="src/pages/BudgetPage.tsx" />;
    if (change < -10) return <ArrowDownCircle className="h-4 w-4 text-green-500" data-id="4y7hb6aii" data-path="src/pages/BudgetPage.tsx" />;
    return <div className="h-4 w-4" data-id="fswrx1byt" data-path="src/pages/BudgetPage.tsx" />;
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
      <Card className={`hover:shadow-lg transition-all duration-300 ${status.bg} ${status.border}`} data-id="po60265tz" data-path="src/pages/BudgetPage.tsx">
        <CardContent className="p-6" data-id="tm9gehhdd" data-path="src/pages/BudgetPage.tsx">
          <div className="flex items-center justify-between mb-4" data-id="l58cwjkox" data-path="src/pages/BudgetPage.tsx">
            <div className="flex items-center space-x-3" data-id="ydoahd6vz" data-path="src/pages/BudgetPage.tsx">
              <span className="text-2xl" data-id="dt6axnsfv" data-path="src/pages/BudgetPage.tsx">{category.icon}</span>
              <div data-id="hzw5trghh" data-path="src/pages/BudgetPage.tsx">
                <h3 className="font-semibold text-gray-900" data-id="a83txs67x" data-path="src/pages/BudgetPage.tsx">{category.name}</h3>
                <div className="flex items-center gap-2" data-id="0uv15ex0m" data-path="src/pages/BudgetPage.tsx">
                  <Badge variant="outline" className={status.color} data-id="rx87h5ur9" data-path="src/pages/BudgetPage.tsx">
                    {category.percentage.toFixed(0)}% used
                  </Badge>
                  {getTrendIcon(category.trend, category.lastMonth, category.spent)}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setEditingCategory(category)} data-id="w5hpd7h8s" data-path="src/pages/BudgetPage.tsx">
              <Edit className="h-4 w-4" data-id="090xtl2l2" data-path="src/pages/BudgetPage.tsx" />
            </Button>
          </div>

          <div className="space-y-3" data-id="moz2uiu2t" data-path="src/pages/BudgetPage.tsx">
            <div className="flex justify-between text-sm" data-id="etxf0kh6y" data-path="src/pages/BudgetPage.tsx">
              <span className="text-gray-600" data-id="kz0u40saa" data-path="src/pages/BudgetPage.tsx">Spent</span>
              <span className={`font-semibold ${status.color}`} data-id="zneakuu46" data-path="src/pages/BudgetPage.tsx">
                ₹{category.spent.toLocaleString()}
              </span>
            </div>
            
            <Progress
              value={category.percentage}
              className={`h-3 ${status.color.replace('text-', 'text-')}`} data-id="o1a15jtsj" data-path="src/pages/BudgetPage.tsx" />

            
            <div className="flex justify-between text-sm" data-id="ge4o1cg0a" data-path="src/pages/BudgetPage.tsx">
              <span className="text-gray-600" data-id="opodcs221" data-path="src/pages/BudgetPage.tsx">Budget: ₹{category.allocated.toLocaleString()}</span>
              <span className={`font-semibold ${
              category.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`
              } data-id="sfw5gtjmz" data-path="src/pages/BudgetPage.tsx">
                ₹{Math.abs(category.remaining).toLocaleString()} {category.remaining >= 0 ? 'left' : 'over'}
              </span>
            </div>

            {category.lastMonth &&
            <div className="text-xs text-gray-500 pt-2 border-t" data-id="bxn196osj" data-path="src/pages/BudgetPage.tsx">
                Last month: ₹{category.lastMonth.toLocaleString()}
                <span className={`ml-2 ${
              category.spent > category.lastMonth ? 'text-red-500' : 'text-green-500'}`
              } data-id="2s2pe5h5z" data-path="src/pages/BudgetPage.tsx">
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
  <div className="space-y-6" data-id="fdnoxicih" data-path="src/pages/BudgetPage.tsx">
      <div className="space-y-2" data-id="cb54l3e80" data-path="src/pages/BudgetPage.tsx">
        <Label htmlFor="totalBudget" data-id="9twd7bzxt" data-path="src/pages/BudgetPage.tsx">Monthly Budget (₹)</Label>
        <Input
        id="totalBudget"
        type="number"
        placeholder="Enter your total monthly budget"
        value={newBudget.totalBudget}
        onChange={(e) => setNewBudget((prev) => ({ ...prev, totalBudget: e.target.value }))} data-id="jo649sneo" data-path="src/pages/BudgetPage.tsx" />

      </div>

      <div className="space-y-4" data-id="7mz9xu50u" data-path="src/pages/BudgetPage.tsx">
        <Label data-id="vuzigga8h" data-path="src/pages/BudgetPage.tsx">Category Allocations</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto" data-id="gzhnkf7j6" data-path="src/pages/BudgetPage.tsx">
          {newBudget.categories.map((category, index) =>
        <div key={category.name} className="flex items-center space-x-2" data-id="jdiedxp0i" data-path="src/pages/BudgetPage.tsx">
              <span className="text-sm w-20 text-gray-600" data-id="si1mg1tas" data-path="src/pages/BudgetPage.tsx">{category.name}:</span>
              <Input
            type="number"
            placeholder="0"
            value={category.allocated}
            onChange={(e) => {
              const updated = [...newBudget.categories];
              updated[index].allocated = e.target.value;
              setNewBudget((prev) => ({ ...prev, categories: updated }));
            }}
            className="flex-1" data-id="sv5r2w9a0" data-path="src/pages/BudgetPage.tsx" />

            </div>
        )}
        </div>
        
        <div className="text-sm text-gray-600" data-id="gsijiw1xb" data-path="src/pages/BudgetPage.tsx">
          Total Allocated: ₹{newBudget.categories.reduce((sum, cat) => sum + parseFloat(cat.allocated || '0'), 0).toLocaleString()}
          {newBudget.totalBudget &&
        <span className="ml-2" data-id="o6df9gdkj" data-path="src/pages/BudgetPage.tsx">
              / ₹{parseFloat(newBudget.totalBudget).toLocaleString()}
            </span>
        }
        </div>
      </div>

      <div className="flex space-x-2 pt-4" data-id="fryvcmndw" data-path="src/pages/BudgetPage.tsx">
        <Button onClick={handleSaveBudget} className="flex-1" data-id="msw17oe0a" data-path="src/pages/BudgetPage.tsx">
          Save Budget
        </Button>
        <Button variant="outline" onClick={() => setIsSetupDialogOpen(false)} data-id="qka53zmnk" data-path="src/pages/BudgetPage.tsx">
          Cancel
        </Button>
      </div>
    </div>;


  return (
    <DashboardLayout data-id="2zz8uxbv9" data-path="src/pages/BudgetPage.tsx">
      <div className="p-6 space-y-6" data-id="fpd9muax4" data-path="src/pages/BudgetPage.tsx">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" data-id="f7vso9u8p" data-path="src/pages/BudgetPage.tsx">
          <div data-id="07vcwnhic" data-path="src/pages/BudgetPage.tsx">
            <h1 className="text-3xl font-bold text-gray-900" data-id="hnjuez4fx" data-path="src/pages/BudgetPage.tsx">Budget Planning</h1>
            <p className="text-gray-600" data-id="6knc6hh7e" data-path="src/pages/BudgetPage.tsx">Plan and track your monthly spending</p>
          </div>
          <div className="flex gap-2" data-id="jct7x4ip3" data-path="src/pages/BudgetPage.tsx">
            <Dialog open={isSetupDialogOpen} onOpenChange={setIsSetupDialogOpen} data-id="ub4if08bl" data-path="src/pages/BudgetPage.tsx">
              <DialogTrigger asChild data-id="os7zddyd1" data-path="src/pages/BudgetPage.tsx">
                <Button variant="outline" data-id="0s8cjl3qm" data-path="src/pages/BudgetPage.tsx">
                  <Settings className="h-4 w-4 mr-2" data-id="b18s9chgv" data-path="src/pages/BudgetPage.tsx" />
                  Setup Budget
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl" data-id="sz36m756y" data-path="src/pages/BudgetPage.tsx">
                <DialogHeader data-id="kivnurxon" data-path="src/pages/BudgetPage.tsx">
                  <DialogTitle data-id="r2nj04don" data-path="src/pages/BudgetPage.tsx">Setup Monthly Budget</DialogTitle>
                  <DialogDescription data-id="0ue0otgws" data-path="src/pages/BudgetPage.tsx">
                    Set your total monthly budget and allocate amounts to different categories.
                  </DialogDescription>
                </DialogHeader>
                <BudgetSetupForm data-id="4z86cztxl" data-path="src/pages/BudgetPage.tsx" />
              </DialogContent>
            </Dialog>
            <Button data-id="4ik1f1o2q" data-path="src/pages/BudgetPage.tsx">
              <Calendar className="h-4 w-4 mr-2" data-id="nsweos4p4" data-path="src/pages/BudgetPage.tsx" />
              {budgetData.budgetPeriod}
            </Button>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-id="6cgl9y0ak" data-path="src/pages/BudgetPage.tsx">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200" data-id="2ak3zsbbq" data-path="src/pages/BudgetPage.tsx">
            <CardContent className="p-6" data-id="zs7xkwkqv" data-path="src/pages/BudgetPage.tsx">
              <div className="flex items-center justify-between" data-id="4kgrkcp0f" data-path="src/pages/BudgetPage.tsx">
                <div data-id="zuz6vu33z" data-path="src/pages/BudgetPage.tsx">
                  <p className="text-sm font-medium text-blue-700" data-id="xygty9525" data-path="src/pages/BudgetPage.tsx">Total Budget</p>
                  <p className="text-2xl font-bold text-blue-900" data-id="8rlwyzmy7" data-path="src/pages/BudgetPage.tsx">₹{budgetData.totalBudget.toLocaleString()}</p>
                </div>
                <Target className="h-8 w-8 text-blue-600" data-id="yyexaxttc" data-path="src/pages/BudgetPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200" data-id="h45v7ndk1" data-path="src/pages/BudgetPage.tsx">
            <CardContent className="p-6" data-id="0uhuok94o" data-path="src/pages/BudgetPage.tsx">
              <div className="flex items-center justify-between" data-id="0ju2ovplp" data-path="src/pages/BudgetPage.tsx">
                <div data-id="zci61zjsd" data-path="src/pages/BudgetPage.tsx">
                  <p className="text-sm font-medium text-red-700" data-id="s5fmlq06a" data-path="src/pages/BudgetPage.tsx">Total Spent</p>
                  <p className="text-2xl font-bold text-red-900" data-id="j4hzjgj1p" data-path="src/pages/BudgetPage.tsx">₹{budgetData.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-red-600" data-id="knu9v6p5c" data-path="src/pages/BudgetPage.tsx">
                    {(budgetData.totalSpent / budgetData.totalBudget * 100).toFixed(1)}% of budget
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-red-600" data-id="bdbwdug62" data-path="src/pages/BudgetPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200" data-id="5hxz4ab65" data-path="src/pages/BudgetPage.tsx">
            <CardContent className="p-6" data-id="1n2vutrvf" data-path="src/pages/BudgetPage.tsx">
              <div className="flex items-center justify-between" data-id="jea282i2a" data-path="src/pages/BudgetPage.tsx">
                <div data-id="r06uxho9t" data-path="src/pages/BudgetPage.tsx">
                  <p className="text-sm font-medium text-green-700" data-id="cmefmfw7x" data-path="src/pages/BudgetPage.tsx">Remaining</p>
                  <p className="text-2xl font-bold text-green-900" data-id="goq1ojevz" data-path="src/pages/BudgetPage.tsx">₹{budgetData.totalRemaining.toLocaleString()}</p>
                  <p className="text-xs text-green-600" data-id="q9a3uzkbt" data-path="src/pages/BudgetPage.tsx">
                    {(budgetData.totalRemaining / budgetData.totalBudget * 100).toFixed(1)}% left
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" data-id="eysqb18o3" data-path="src/pages/BudgetPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200" data-id="g7adc4g9t" data-path="src/pages/BudgetPage.tsx">
            <CardContent className="p-6" data-id="1w1zhs4ic" data-path="src/pages/BudgetPage.tsx">
              <div className="flex items-center justify-between" data-id="stngpd95x" data-path="src/pages/BudgetPage.tsx">
                <div data-id="litd1er0h" data-path="src/pages/BudgetPage.tsx">
                  <p className="text-sm font-medium text-purple-700" data-id="zwm5dvzd0" data-path="src/pages/BudgetPage.tsx">Budget Usage</p>
                  <p className="text-2xl font-bold text-purple-900" data-id="75ha8cpfp" data-path="src/pages/BudgetPage.tsx">
                    {(budgetData.totalSpent / budgetData.totalBudget * 100).toFixed(1)}%
                  </p>
                  <Progress
                    value={budgetData.totalSpent / budgetData.totalBudget * 100}
                    className="h-2 mt-2" data-id="f62fj5yor" data-path="src/pages/BudgetPage.tsx" />

                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" data-id="v4k927ox3" data-path="src/pages/BudgetPage.tsx" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-id="w8g5xd00g" data-path="src/pages/BudgetPage.tsx">
          {/* Budget Distribution */}
          <Card data-id="bd09xu3wn" data-path="src/pages/BudgetPage.tsx">
            <CardHeader data-id="humhau4on" data-path="src/pages/BudgetPage.tsx">
              <CardTitle data-id="8fxa2hobk" data-path="src/pages/BudgetPage.tsx">Budget Distribution</CardTitle>
              <CardDescription data-id="lb2umm67r" data-path="src/pages/BudgetPage.tsx">How your budget is allocated across categories</CardDescription>
            </CardHeader>
            <CardContent data-id="zfzi0hj2f" data-path="src/pages/BudgetPage.tsx">
              <div className="grid md:grid-cols-2 gap-4" data-id="fufoud4l1" data-path="src/pages/BudgetPage.tsx">
                <ResponsiveContainer width="100%" height={250} data-id="st8z86cfk" data-path="src/pages/BudgetPage.tsx">
                  <RechartsPieChart data-id="kqfgii3yc" data-path="src/pages/BudgetPage.tsx">
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value" data-id="40zi6l6sw" data-path="src/pages/BudgetPage.tsx">

                      {pieChartData.map((entry, index) =>
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} data-id="2zasriowv" data-path="src/pages/BudgetPage.tsx" />
                      )}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, '']} data-id="el7ut8y6k" data-path="src/pages/BudgetPage.tsx" />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="space-y-2" data-id="yh8jgh52j" data-path="src/pages/BudgetPage.tsx">
                  {pieChartData.map((category, index) =>
                  <div key={category.name} className="flex items-center justify-between" data-id="69zfocgrh" data-path="src/pages/BudgetPage.tsx">
                      <div className="flex items-center gap-2" data-id="omnlvnz9j" data-path="src/pages/BudgetPage.tsx">
                        <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }} data-id="87nsjmdkx" data-path="src/pages/BudgetPage.tsx" />

                        <span className="text-sm font-medium" data-id="gab0eehfn" data-path="src/pages/BudgetPage.tsx">{category.name}</span>
                      </div>
                      <div className="text-right" data-id="tq35wcv23" data-path="src/pages/BudgetPage.tsx">
                        <div className="text-sm font-medium" data-id="hefv99m57" data-path="src/pages/BudgetPage.tsx">₹{category.value.toLocaleString()}</div>
                        <div className="text-xs text-gray-500" data-id="b8p6qp2r5" data-path="src/pages/BudgetPage.tsx">
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
          <Card data-id="a31kyn3ek" data-path="src/pages/BudgetPage.tsx">
            <CardHeader data-id="r6xxi6q00" data-path="src/pages/BudgetPage.tsx">
              <CardTitle data-id="pcanrogv9" data-path="src/pages/BudgetPage.tsx">Allocated vs Spent</CardTitle>
              <CardDescription data-id="5d0k792d8" data-path="src/pages/BudgetPage.tsx">Compare your budget allocation with actual spending</CardDescription>
            </CardHeader>
            <CardContent data-id="xk0uarzr4" data-path="src/pages/BudgetPage.tsx">
              <ResponsiveContainer width="100%" height={300} data-id="kzut4nk8w" data-path="src/pages/BudgetPage.tsx">
                <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} data-id="6pr28oe9x" data-path="src/pages/BudgetPage.tsx">
                  <CartesianGrid strokeDasharray="3 3" data-id="4ood2xh32" data-path="src/pages/BudgetPage.tsx" />
                  <XAxis dataKey="name" fontSize={12} data-id="804wf3fti" data-path="src/pages/BudgetPage.tsx" />
                  <YAxis data-id="n7wh7j9u2" data-path="src/pages/BudgetPage.tsx" />
                  <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, '']} data-id="nunkk71hy" data-path="src/pages/BudgetPage.tsx" />
                  <Bar dataKey="allocated" fill="#3b82f6" name="Allocated" data-id="mfportgiy" data-path="src/pages/BudgetPage.tsx" />
                  <Bar dataKey="spent" fill="#ef4444" name="Spent" data-id="sfbpmcg4g" data-path="src/pages/BudgetPage.tsx" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Budget Categories */}
        <Card data-id="cjn5e0jnn" data-path="src/pages/BudgetPage.tsx">
          <CardHeader data-id="ji27fy5ya" data-path="src/pages/BudgetPage.tsx">
            <CardTitle data-id="ww4wbwyq8" data-path="src/pages/BudgetPage.tsx">Budget Categories</CardTitle>
            <CardDescription data-id="0e4kxcll1" data-path="src/pages/BudgetPage.tsx">Detailed view of your spending in each category</CardDescription>
          </CardHeader>
          <CardContent data-id="8stfgunfx" data-path="src/pages/BudgetPage.tsx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-id="ze8ijkwtn" data-path="src/pages/BudgetPage.tsx">
              {budgetData.categories.map((category) =>
              <BudgetCategoryCard key={category.id} category={category} data-id="wzcet9e97" data-path="src/pages/BudgetPage.tsx" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Budget Tips */}
        <Card data-id="sqxvrxh5o" data-path="src/pages/BudgetPage.tsx">
          <CardHeader data-id="1j7vcke0c" data-path="src/pages/BudgetPage.tsx">
            <CardTitle data-id="9q95voav3" data-path="src/pages/BudgetPage.tsx">Budget Tips</CardTitle>
          </CardHeader>
          <CardContent data-id="85h6vkcs4" data-path="src/pages/BudgetPage.tsx">
            <div className="grid md:grid-cols-2 gap-4" data-id="8is7hfvf1" data-path="src/pages/BudgetPage.tsx">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg" data-id="rrnz6un21" data-path="src/pages/BudgetPage.tsx">
                <div className="bg-blue-100 p-2 rounded-full" data-id="t9ztvy8yr" data-path="src/pages/BudgetPage.tsx">
                  <Target className="h-5 w-5 text-blue-600" data-id="7r8osvahp" data-path="src/pages/BudgetPage.tsx" />
                </div>
                <div data-id="zyw5eg508" data-path="src/pages/BudgetPage.tsx">
                  <h4 className="font-medium text-blue-900" data-id="py26131mn" data-path="src/pages/BudgetPage.tsx">Follow the 50/30/20 Rule</h4>
                  <p className="text-sm text-blue-700 mt-1" data-id="a1ogh6fui" data-path="src/pages/BudgetPage.tsx">
                    Allocate 50% for needs, 30% for wants, and 20% for savings and debt repayment.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg" data-id="g6ownaxgv" data-path="src/pages/BudgetPage.tsx">
                <div className="bg-green-100 p-2 rounded-full" data-id="7w1um5z9h" data-path="src/pages/BudgetPage.tsx">
                  <CheckCircle className="h-5 w-5 text-green-600" data-id="g788kdm6q" data-path="src/pages/BudgetPage.tsx" />
                </div>
                <div data-id="nnknjostj" data-path="src/pages/BudgetPage.tsx">
                  <h4 className="font-medium text-green-900" data-id="nfbs7ouit" data-path="src/pages/BudgetPage.tsx">Track Daily Expenses</h4>
                  <p className="text-sm text-green-700 mt-1" data-id="9pg522qpj" data-path="src/pages/BudgetPage.tsx">
                    Record every expense to stay within your budget and identify spending patterns.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg" data-id="babqofwln" data-path="src/pages/BudgetPage.tsx">
                <div className="bg-yellow-100 p-2 rounded-full" data-id="ibuv1t0h8" data-path="src/pages/BudgetPage.tsx">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" data-id="r54qbd333" data-path="src/pages/BudgetPage.tsx" />
                </div>
                <div data-id="3wd11gg3o" data-path="src/pages/BudgetPage.tsx">
                  <h4 className="font-medium text-yellow-900" data-id="wyak2rig1" data-path="src/pages/BudgetPage.tsx">Review Monthly</h4>
                  <p className="text-sm text-yellow-700 mt-1" data-id="g1fnyfhel" data-path="src/pages/BudgetPage.tsx">
                    Review and adjust your budget monthly based on your spending patterns.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg" data-id="fs508vk5e" data-path="src/pages/BudgetPage.tsx">
                <div className="bg-purple-100 p-2 rounded-full" data-id="qde5p7ie0" data-path="src/pages/BudgetPage.tsx">
                  <PieChart className="h-5 w-5 text-purple-600" data-id="znsuesp7p" data-path="src/pages/BudgetPage.tsx" />
                </div>
                <div data-id="axxk8bnwr" data-path="src/pages/BudgetPage.tsx">
                  <h4 className="font-medium text-purple-900" data-id="73ejfky42" data-path="src/pages/BudgetPage.tsx">Emergency Fund</h4>
                  <p className="text-sm text-purple-700 mt-1" data-id="o2htqvnsq" data-path="src/pages/BudgetPage.tsx">
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