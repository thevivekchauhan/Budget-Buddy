import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Target,
  PiggyBank,
  Receipt,
  Bell,
  Plus,
  Filter,
  Calendar,
  DollarSign,
  AlertCircle } from
'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');

  // Mock data - in real app, this would come from API
  const [dashboardData, setDashboardData] = useState({
    totalBalance: 15750,
    monthlyIncome: 20000,
    monthlyExpenses: 12500,
    budgetUsed: 62.5,
    savingsGoalProgress: 45,
    recentTransactions: [
    { id: 1, title: 'Lunch at Canteen', amount: -150, category: 'Food', date: '2024-01-15', type: 'expense' },
    { id: 2, title: 'Part-time Job', amount: 5000, category: 'Income', date: '2024-01-15', type: 'income' },
    { id: 3, title: 'Bus Fare', amount: -50, category: 'Transport', date: '2024-01-14', type: 'expense' },
    { id: 4, title: 'Coffee with Friends', amount: -200, category: 'Entertainment', date: '2024-01-14', type: 'expense' },
    { id: 5, title: 'Stipend', amount: 8000, category: 'Income', date: '2024-01-13', type: 'income' }],

    expenseByCategory: [
    { name: 'Food', value: 4500, percentage: 36 },
    { name: 'Transport', value: 2000, percentage: 16 },
    { name: 'Entertainment', value: 1500, percentage: 12 },
    { name: 'Study Materials', value: 2500, percentage: 20 },
    { name: 'Others', value: 2000, percentage: 16 }],

    monthlyTrend: [
    { month: 'Sep', income: 18000, expenses: 14000 },
    { month: 'Oct', income: 19000, expenses: 13500 },
    { month: 'Nov', income: 20500, expenses: 15000 },
    { month: 'Dec', income: 21000, expenses: 12000 },
    { month: 'Jan', income: 20000, expenses: 12500 }],

    upcomingBills: [
    { id: 1, title: 'Hostel Rent', amount: 8000, dueDate: '2024-01-20', category: 'Rent' },
    { id: 2, title: 'Netflix Subscription', amount: 199, dueDate: '2024-01-22', category: 'Entertainment' },
    { id: 3, title: 'Internet Bill', amount: 500, dueDate: '2024-01-25', category: 'Utilities' }],

    savingsGoals: [
    { id: 1, title: 'New Laptop', target: 50000, saved: 22500, deadline: '2024-06-30' },
    { id: 2, title: 'Summer Trip', target: 15000, saved: 6750, deadline: '2024-04-30' }],

    budgetCategories: [
    { category: 'Food', allocated: 5000, spent: 4500, percentage: 90 },
    { category: 'Transport', allocated: 2500, spent: 2000, percentage: 80 },
    { category: 'Entertainment', allocated: 2000, spent: 1500, percentage: 75 },
    { category: 'Study Materials', allocated: 3000, spent: 2500, percentage: 83 }]

  });

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const StatCard = ({ title, value, icon, trend, trendValue, className = ""






  }: {title: string;value: string | number;icon: React.ReactNode;trend?: 'up' | 'down';trendValue?: string;className?: string;}) =>
  <Card className={`hover:shadow-lg transition-all duration-300 ${className}`} data-id="u025wfywu" data-path="src/pages/Dashboard.tsx">
      <CardContent className="p-6" data-id="82judkpto" data-path="src/pages/Dashboard.tsx">
        <div className="flex items-center justify-between" data-id="cck3yy4fc" data-path="src/pages/Dashboard.tsx">
          <div data-id="nkwzfwxrc" data-path="src/pages/Dashboard.tsx">
            <p className="text-sm font-medium text-gray-600" data-id="p3m134iel" data-path="src/pages/Dashboard.tsx">{title}</p>
            <p className="text-2xl font-bold text-gray-900" data-id="2y9lqfdbh" data-path="src/pages/Dashboard.tsx">
              {typeof value === 'number' && title.includes('₹') ? `₹${value.toLocaleString()}` : value}
            </p>
            {trend && trendValue &&
          <div className={`flex items-center mt-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`} data-id="z8dtayipw" data-path="src/pages/Dashboard.tsx">
                {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" data-id="l5rksecg2" data-path="src/pages/Dashboard.tsx" /> : <TrendingDown className="h-4 w-4 mr-1" data-id="gfdzo29ek" data-path="src/pages/Dashboard.tsx" />}
                <span className="text-sm" data-id="4i4jqiuwp" data-path="src/pages/Dashboard.tsx">{trendValue}</span>
              </div>
          }
          </div>
          <div className="text-gray-400" data-id="94bgbsm3l" data-path="src/pages/Dashboard.tsx">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>;


  const QuickActions = () =>
  <Card data-id="uzmjhmn7t" data-path="src/pages/Dashboard.tsx">
      <CardHeader data-id="8w50817d8" data-path="src/pages/Dashboard.tsx">
        <CardTitle className="flex items-center gap-2" data-id="5ouvyflc2" data-path="src/pages/Dashboard.tsx">
          <Plus className="h-5 w-5" data-id="mzy3z4dlk" data-path="src/pages/Dashboard.tsx" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3" data-id="vvg2jcc53" data-path="src/pages/Dashboard.tsx">
        <Button
        className="w-full justify-start"
        variant="outline"
        onClick={() => navigate('/expenses')} data-id="70wv6exyr" data-path="src/pages/Dashboard.tsx">

          <Receipt className="h-4 w-4 mr-2" data-id="ydko87i2x" data-path="src/pages/Dashboard.tsx" />
          Add Expense
        </Button>
        <Button
        className="w-full justify-start"
        variant="outline"
        onClick={() => navigate('/income')} data-id="5r38ht25y" data-path="src/pages/Dashboard.tsx">

          <TrendingUp className="h-4 w-4 mr-2" data-id="jg1pjp3p3" data-path="src/pages/Dashboard.tsx" />
          Add Income
        </Button>
        <Button
        className="w-full justify-start"
        variant="outline"
        onClick={() => navigate('/budget')} data-id="gs4ftxhew" data-path="src/pages/Dashboard.tsx">

          <Target className="h-4 w-4 mr-2" data-id="zixd1m48z" data-path="src/pages/Dashboard.tsx" />
          Set Budget
        </Button>
        <Button
        className="w-full justify-start"
        variant="outline"
        onClick={() => navigate('/goals')} data-id="amn0gqkmf" data-path="src/pages/Dashboard.tsx">

          <PiggyBank className="h-4 w-4 mr-2" data-id="s03s29yv8" data-path="src/pages/Dashboard.tsx" />
          New Goal
        </Button>
      </CardContent>
    </Card>;


  return (
    <DashboardLayout data-id="x8ooaywid" data-path="src/pages/Dashboard.tsx">
      <div className="p-6 space-y-6" data-id="uk9taebqm" data-path="src/pages/Dashboard.tsx">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" data-id="n6zu90v3l" data-path="src/pages/Dashboard.tsx">
          <div data-id="rfzxc092g" data-path="src/pages/Dashboard.tsx">
            <h1 className="text-3xl font-bold text-gray-900" data-id="d0sba989x" data-path="src/pages/Dashboard.tsx">Dashboard</h1>
            <p className="text-gray-600" data-id="w49fu64pg" data-path="src/pages/Dashboard.tsx">Welcome back! Here's your financial overview.</p>
          </div>
          <div className="flex gap-2" data-id="xskocw251" data-path="src/pages/Dashboard.tsx">
            <Button variant="outline" size="sm" data-id="7noz7sesu" data-path="src/pages/Dashboard.tsx">
              <Filter className="h-4 w-4 mr-2" data-id="jxh4evvx6" data-path="src/pages/Dashboard.tsx" />
              Filter
            </Button>
            <Button variant="outline" size="sm" data-id="jx4wp8k65" data-path="src/pages/Dashboard.tsx">
              <Calendar className="h-4 w-4 mr-2" data-id="8kfhadygf" data-path="src/pages/Dashboard.tsx" />
              This Month
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-id="jq5npd4z8" data-path="src/pages/Dashboard.tsx">
          <StatCard
            title="Total Balance"
            value={`₹${dashboardData.totalBalance.toLocaleString()}`}
            icon={<Wallet className="h-8 w-8" data-id="osm8oygw7" data-path="src/pages/Dashboard.tsx" />}
            trend="up"
            trendValue="+12.5%"
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200" data-id="lfzn9scbe" data-path="src/pages/Dashboard.tsx" />

          <StatCard
            title="Monthly Income"
            value={`₹${dashboardData.monthlyIncome.toLocaleString()}`}
            icon={<TrendingUp className="h-8 w-8" data-id="jcl0ce8ol" data-path="src/pages/Dashboard.tsx" />}
            trend="up"
            trendValue="+5.2%"
            className="bg-gradient-to-br from-green-50 to-green-100 border-green-200" data-id="m7ur40sje" data-path="src/pages/Dashboard.tsx" />

          <StatCard
            title="Monthly Expenses"
            value={`₹${dashboardData.monthlyExpenses.toLocaleString()}`}
            icon={<TrendingDown className="h-8 w-8" data-id="nkabirlhi" data-path="src/pages/Dashboard.tsx" />}
            trend="down"
            trendValue="-3.1%"
            className="bg-gradient-to-br from-red-50 to-red-100 border-red-200" data-id="wedlbdvwo" data-path="src/pages/Dashboard.tsx" />

          <StatCard
            title="Budget Used"
            value={`${dashboardData.budgetUsed}%`}
            icon={<Target className="h-8 w-8" data-id="xd9gbpuqv" data-path="src/pages/Dashboard.tsx" />}
            className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200" data-id="ax3g0bci0" data-path="src/pages/Dashboard.tsx" />

        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-id="io4patoxo" data-path="src/pages/Dashboard.tsx">
          {/* Charts and Analytics */}
          <div className="lg:col-span-2 space-y-6" data-id="l0pjwgrh4" data-path="src/pages/Dashboard.tsx">
            {/* Monthly Trend Chart */}
            <Card data-id="refso5acy" data-path="src/pages/Dashboard.tsx">
              <CardHeader data-id="nw5n43yy9" data-path="src/pages/Dashboard.tsx">
                <CardTitle data-id="ys05eucvj" data-path="src/pages/Dashboard.tsx">Income vs Expenses Trend</CardTitle>
                <CardDescription data-id="2jghcgzjn" data-path="src/pages/Dashboard.tsx">Your financial performance over the last 5 months</CardDescription>
              </CardHeader>
              <CardContent data-id="ig4i90vz3" data-path="src/pages/Dashboard.tsx">
                <ResponsiveContainer width="100%" height={300} data-id="eb7ca2cjl" data-path="src/pages/Dashboard.tsx">
                  <LineChart data={dashboardData.monthlyTrend} data-id="xn1nttei3" data-path="src/pages/Dashboard.tsx">
                    <CartesianGrid strokeDasharray="3 3" data-id="ibl6jnggc" data-path="src/pages/Dashboard.tsx" />
                    <XAxis dataKey="month" data-id="75nlwb3rw" data-path="src/pages/Dashboard.tsx" />
                    <YAxis data-id="xoupxpsyo" data-path="src/pages/Dashboard.tsx" />
                    <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, '']} data-id="pu4phco69" data-path="src/pages/Dashboard.tsx" />
                    <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} name="Income" data-id="1ndz9w9om" data-path="src/pages/Dashboard.tsx" />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} name="Expenses" data-id="k4bz0mjfx" data-path="src/pages/Dashboard.tsx" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Expense Distribution */}
            <Card data-id="ujvdsc4rr" data-path="src/pages/Dashboard.tsx">
              <CardHeader data-id="lwnajqp8i" data-path="src/pages/Dashboard.tsx">
                <CardTitle data-id="otit9z6wj" data-path="src/pages/Dashboard.tsx">Expense Distribution</CardTitle>
                <CardDescription data-id="striid8k5" data-path="src/pages/Dashboard.tsx">How you're spending your money this month</CardDescription>
              </CardHeader>
              <CardContent data-id="gtic3k4fp" data-path="src/pages/Dashboard.tsx">
                <div className="grid md:grid-cols-2 gap-4" data-id="58ksdf1o6" data-path="src/pages/Dashboard.tsx">
                  <ResponsiveContainer width="100%" height={250} data-id="nxsaagzno" data-path="src/pages/Dashboard.tsx">
                    <PieChart data-id="yubh61eiu" data-path="src/pages/Dashboard.tsx">
                      <Pie
                        data={dashboardData.expenseByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value" data-id="qphclm9ql" data-path="src/pages/Dashboard.tsx">

                        {dashboardData.expenseByCategory.map((entry, index) =>
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} data-id="53dxjq638" data-path="src/pages/Dashboard.tsx" />
                        )}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, '']} data-id="2l041yf09" data-path="src/pages/Dashboard.tsx" />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2" data-id="amee9h2ea" data-path="src/pages/Dashboard.tsx">
                    {dashboardData.expenseByCategory.map((category, index) =>
                    <div key={category.name} className="flex items-center justify-between" data-id="kigadfnon" data-path="src/pages/Dashboard.tsx">
                        <div className="flex items-center gap-2" data-id="st24x02cm" data-path="src/pages/Dashboard.tsx">
                          <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }} data-id="lwu4tju1k" data-path="src/pages/Dashboard.tsx" />

                          <span className="text-sm font-medium" data-id="50nqkdnm9" data-path="src/pages/Dashboard.tsx">{category.name}</span>
                        </div>
                        <div className="text-right" data-id="agidjmk0p" data-path="src/pages/Dashboard.tsx">
                          <div className="text-sm font-medium" data-id="ghe1jkt2i" data-path="src/pages/Dashboard.tsx">₹{category.value.toLocaleString()}</div>
                          <div className="text-xs text-gray-500" data-id="d9dduiupq" data-path="src/pages/Dashboard.tsx">{category.percentage}%</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card data-id="yrdxrdamj" data-path="src/pages/Dashboard.tsx">
              <CardHeader className="flex flex-row items-center justify-between" data-id="xf2sfcj07" data-path="src/pages/Dashboard.tsx">
                <div data-id="jule277pd" data-path="src/pages/Dashboard.tsx">
                  <CardTitle data-id="alysyrznk" data-path="src/pages/Dashboard.tsx">Recent Transactions</CardTitle>
                  <CardDescription data-id="qh9x4ig27" data-path="src/pages/Dashboard.tsx">Your latest financial activities</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/expenses')} data-id="uwbly4tky" data-path="src/pages/Dashboard.tsx">
                  View All
                </Button>
              </CardHeader>
              <CardContent data-id="zdnh97iv8" data-path="src/pages/Dashboard.tsx">
                <div className="space-y-3" data-id="h1xtvsc3q" data-path="src/pages/Dashboard.tsx">
                  {dashboardData.recentTransactions.slice(0, 5).map((transaction) =>
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50" data-id="xj66ubqfn" data-path="src/pages/Dashboard.tsx">
                      <div className="flex items-center gap-3" data-id="xgkpnomyq" data-path="src/pages/Dashboard.tsx">
                        <div className={`p-2 rounded-full ${
                      transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`
                      } data-id="bp7vrqw85" data-path="src/pages/Dashboard.tsx">
                          {transaction.type === 'income' ?
                        <TrendingUp className="h-4 w-4" data-id="szn0el73y" data-path="src/pages/Dashboard.tsx" /> :
                        <TrendingDown className="h-4 w-4" data-id="qg1tnybdg" data-path="src/pages/Dashboard.tsx" />
                        }
                        </div>
                        <div data-id="9enenhxx1" data-path="src/pages/Dashboard.tsx">
                          <div className="font-medium" data-id="dptncz5p5" data-path="src/pages/Dashboard.tsx">{transaction.title}</div>
                          <div className="text-sm text-gray-500" data-id="h998z8w8l" data-path="src/pages/Dashboard.tsx">{transaction.category} • {transaction.date}</div>
                        </div>
                      </div>
                      <div className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`
                    } data-id="782jzg5c4" data-path="src/pages/Dashboard.tsx">
                        {transaction.type === 'income' ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6" data-id="texusw8j3" data-path="src/pages/Dashboard.tsx">
            {/* Quick Actions */}
            <QuickActions data-id="ok8arjbsc" data-path="src/pages/Dashboard.tsx" />

            {/* Budget Overview */}
            <Card data-id="geedm1g9b" data-path="src/pages/Dashboard.tsx">
              <CardHeader data-id="blh758ksi" data-path="src/pages/Dashboard.tsx">
                <CardTitle className="flex items-center gap-2" data-id="8fsvaotof" data-path="src/pages/Dashboard.tsx">
                  <Target className="h-5 w-5" data-id="1p7lcmdqa" data-path="src/pages/Dashboard.tsx" />
                  Budget Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-id="zqz1d6vwz" data-path="src/pages/Dashboard.tsx">
                {dashboardData.budgetCategories.map((budget) =>
                <div key={budget.category} className="space-y-2" data-id="dtiq5h8c5" data-path="src/pages/Dashboard.tsx">
                    <div className="flex justify-between text-sm" data-id="jzy2s3q79" data-path="src/pages/Dashboard.tsx">
                      <span className="font-medium" data-id="dz8spv1i5" data-path="src/pages/Dashboard.tsx">{budget.category}</span>
                      <span className="text-gray-500" data-id="xi3ozw82d" data-path="src/pages/Dashboard.tsx">
                        ₹{budget.spent.toLocaleString()} / ₹{budget.allocated.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                    value={budget.percentage}
                    className={`h-2 ${budget.percentage > 90 ? 'text-red-500' : budget.percentage > 75 ? 'text-yellow-500' : 'text-green-500'}`} data-id="ryiei6h4g" data-path="src/pages/Dashboard.tsx" />

                    <div className="flex justify-between text-xs text-gray-500" data-id="hose2ttc4" data-path="src/pages/Dashboard.tsx">
                      <span data-id="3b0yip7w6" data-path="src/pages/Dashboard.tsx">{budget.percentage}% used</span>
                      <span data-id="zit1dvz14" data-path="src/pages/Dashboard.tsx">₹{(budget.allocated - budget.spent).toLocaleString()} left</span>
                    </div>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => navigate('/budget')} data-id="eo3amn4l1" data-path="src/pages/Dashboard.tsx">

                  Manage Budget
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Bills */}
            <Card data-id="4gan7u39u" data-path="src/pages/Dashboard.tsx">
              <CardHeader data-id="8i2p99uso" data-path="src/pages/Dashboard.tsx">
                <CardTitle className="flex items-center gap-2" data-id="7zxupmlqo" data-path="src/pages/Dashboard.tsx">
                  <Bell className="h-5 w-5" data-id="zalua3qqe" data-path="src/pages/Dashboard.tsx" />
                  Upcoming Bills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3" data-id="pjptgxg0n" data-path="src/pages/Dashboard.tsx">
                {dashboardData.upcomingBills.map((bill) =>
                <div key={bill.id} className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border border-orange-200" data-id="jci8giet6" data-path="src/pages/Dashboard.tsx">
                    <div data-id="g4fw3xh1p" data-path="src/pages/Dashboard.tsx">
                      <div className="font-medium" data-id="5lnnqnvhz" data-path="src/pages/Dashboard.tsx">{bill.title}</div>
                      <div className="text-sm text-gray-500" data-id="hkuxp79t4" data-path="src/pages/Dashboard.tsx">Due: {bill.dueDate}</div>
                    </div>
                    <div className="text-right" data-id="84eh38evk" data-path="src/pages/Dashboard.tsx">
                      <div className="font-semibold text-orange-600" data-id="etz2k70n6" data-path="src/pages/Dashboard.tsx">₹{bill.amount.toLocaleString()}</div>
                      <Badge variant="outline" className="text-xs" data-id="cwhwdlj3h" data-path="src/pages/Dashboard.tsx">
                        {bill.category}
                      </Badge>
                    </div>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate('/bills')} data-id="46odhhx0a" data-path="src/pages/Dashboard.tsx">

                  Manage Bills
                </Button>
              </CardContent>
            </Card>

            {/* Savings Goals */}
            <Card data-id="8uipvtuv2" data-path="src/pages/Dashboard.tsx">
              <CardHeader data-id="fnej03fk9" data-path="src/pages/Dashboard.tsx">
                <CardTitle className="flex items-center gap-2" data-id="gpvlm1u1f" data-path="src/pages/Dashboard.tsx">
                  <PiggyBank className="h-5 w-5" data-id="gdg8awfvg" data-path="src/pages/Dashboard.tsx" />
                  Savings Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-id="khv8vlem5" data-path="src/pages/Dashboard.tsx">
                {dashboardData.savingsGoals.map((goal) => {
                  const progress = goal.saved / goal.target * 100;
                  return (
                    <div key={goal.id} className="space-y-2" data-id="dexq2gka1" data-path="src/pages/Dashboard.tsx">
                      <div className="flex justify-between text-sm" data-id="bbqqbytyv" data-path="src/pages/Dashboard.tsx">
                        <span className="font-medium" data-id="a2v32bbxd" data-path="src/pages/Dashboard.tsx">{goal.title}</span>
                        <span className="text-gray-500" data-id="qso2te1ds" data-path="src/pages/Dashboard.tsx">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" data-id="mfo32mkms" data-path="src/pages/Dashboard.tsx" />
                      <div className="flex justify-between text-xs text-gray-500" data-id="m62di3zay" data-path="src/pages/Dashboard.tsx">
                        <span data-id="f51s732ps" data-path="src/pages/Dashboard.tsx">₹{goal.saved.toLocaleString()} saved</span>
                        <span data-id="fymzo69wf" data-path="src/pages/Dashboard.tsx">Goal: ₹{goal.target.toLocaleString()}</span>
                      </div>
                    </div>);

                })}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate('/goals')} data-id="d6ib9bbor" data-path="src/pages/Dashboard.tsx">

                  Manage Goals
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>);

};

export default Dashboard;