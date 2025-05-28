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
  <Card className={`hover:shadow-lg transition-all duration-300 ${className}`} data-id="lv03ee63p" data-path="src/pages/Dashboard.tsx">
      <CardContent className="p-4 md:p-6" data-id="7mf81ts6j" data-path="src/pages/Dashboard.tsx">
        <div className="flex items-center justify-between" data-id="3pznsu2iq" data-path="src/pages/Dashboard.tsx">
          <div className="flex-1 min-w-0" data-id="b2ptoyp17" data-path="src/pages/Dashboard.tsx">
            <p className="text-xs md:text-sm font-medium text-gray-600 truncate" data-id="48ivlvbec" data-path="src/pages/Dashboard.tsx">{title}</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900 truncate" data-id="29w6r9t58" data-path="src/pages/Dashboard.tsx">
              {typeof value === 'number' && title.includes('₹') ? `₹${value.toLocaleString()}` : value}
            </p>
            {trend && trendValue &&
          <div className={`flex items-center mt-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`} data-id="ssdy2hg6b" data-path="src/pages/Dashboard.tsx">
                {trend === 'up' ? <TrendingUp className="h-3 w-3 md:h-4 md:w-4 mr-1" data-id="t9587zwjz" data-path="src/pages/Dashboard.tsx" /> : <TrendingDown className="h-3 w-3 md:h-4 md:w-4 mr-1" data-id="me2vz15td" data-path="src/pages/Dashboard.tsx" />}
                <span className="text-xs md:text-sm" data-id="khvt5qwby" data-path="src/pages/Dashboard.tsx">{trendValue}</span>
              </div>
          }
          </div>
          <div className="text-gray-400 ml-2 flex-shrink-0" data-id="t2mh13nnz" data-path="src/pages/Dashboard.tsx">
            <div className="h-6 w-6 md:h-8 md:w-8" data-id="bdhdrjb7p" data-path="src/pages/Dashboard.tsx">{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>;


  const QuickActions = () =>
  <Card data-id="o7d9jk487" data-path="src/pages/Dashboard.tsx">
      <CardHeader data-id="yla9h4evf" data-path="src/pages/Dashboard.tsx">
        <CardTitle className="flex items-center gap-2" data-id="0tmns5ujt" data-path="src/pages/Dashboard.tsx">
          <Plus className="h-5 w-5" data-id="1r8wnbfbq" data-path="src/pages/Dashboard.tsx" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3" data-id="rl7br5op0" data-path="src/pages/Dashboard.tsx">
        <Button
        className="w-full justify-start"
        variant="outline"
        onClick={() => navigate('/expenses')} data-id="m3lwfhc4u" data-path="src/pages/Dashboard.tsx">

          <Receipt className="h-4 w-4 mr-2" data-id="9idfh6kio" data-path="src/pages/Dashboard.tsx" />
          Add Expense
        </Button>
        <Button
        className="w-full justify-start"
        variant="outline"
        onClick={() => navigate('/income')} data-id="mcam3zoof" data-path="src/pages/Dashboard.tsx">

          <TrendingUp className="h-4 w-4 mr-2" data-id="2p9pccazp" data-path="src/pages/Dashboard.tsx" />
          Add Income
        </Button>
        <Button
        className="w-full justify-start"
        variant="outline"
        onClick={() => navigate('/budget')} data-id="ync7rn3s2" data-path="src/pages/Dashboard.tsx">

          <Target className="h-4 w-4 mr-2" data-id="lwffkfs8x" data-path="src/pages/Dashboard.tsx" />
          Set Budget
        </Button>
        <Button
        className="w-full justify-start"
        variant="outline"
        onClick={() => navigate('/goals')} data-id="k4ru75xl7" data-path="src/pages/Dashboard.tsx">

          <PiggyBank className="h-4 w-4 mr-2" data-id="jk1lg2aal" data-path="src/pages/Dashboard.tsx" />
          New Goal
        </Button>
      </CardContent>
    </Card>;


  return (
    <DashboardLayout data-id="vphpj37zk" data-path="src/pages/Dashboard.tsx">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 max-w-7xl mx-auto" data-id="k22aftr3h" data-path="src/pages/Dashboard.tsx">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" data-id="djowoo26u" data-path="src/pages/Dashboard.tsx">
          <div data-id="8c06hqoa3" data-path="src/pages/Dashboard.tsx">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900" data-id="yvn9jhcye" data-path="src/pages/Dashboard.tsx">Dashboard</h1>
            <p className="text-sm md:text-base text-gray-600" data-id="654x0uldc" data-path="src/pages/Dashboard.tsx">Welcome back! Here's your financial overview.</p>
          </div>
          <div className="flex flex-wrap gap-2" data-id="7bgpaknvc" data-path="src/pages/Dashboard.tsx">
            <Button variant="outline" size="sm" className="flex-shrink-0" data-id="j9csx55wu" data-path="src/pages/Dashboard.tsx">
              <Filter className="h-4 w-4 mr-1 md:mr-2" data-id="e153tndl4" data-path="src/pages/Dashboard.tsx" />
              <span className="hidden sm:inline" data-id="h6qf4tya9" data-path="src/pages/Dashboard.tsx">Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="flex-shrink-0" data-id="widxdxae1" data-path="src/pages/Dashboard.tsx">
              <Calendar className="h-4 w-4 mr-1 md:mr-2" data-id="ocihv22x6" data-path="src/pages/Dashboard.tsx" />
              <span className="hidden sm:inline" data-id="qx5w1n7ki" data-path="src/pages/Dashboard.tsx">This Month</span>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" data-id="gly4bd0yi" data-path="src/pages/Dashboard.tsx">
          <StatCard
            title="Total Balance"
            value={`₹${dashboardData.totalBalance.toLocaleString()}`}
            icon={<Wallet className="h-8 w-8" data-id="j6855okoz" data-path="src/pages/Dashboard.tsx" />}
            trend="up"
            trendValue="+12.5%"
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200" data-id="tj8ved15a" data-path="src/pages/Dashboard.tsx" />

          <StatCard
            title="Monthly Income"
            value={`₹${dashboardData.monthlyIncome.toLocaleString()}`}
            icon={<TrendingUp className="h-8 w-8" data-id="zd6ohnpwv" data-path="src/pages/Dashboard.tsx" />}
            trend="up"
            trendValue="+5.2%"
            className="bg-gradient-to-br from-green-50 to-green-100 border-green-200" data-id="9ejvhnilk" data-path="src/pages/Dashboard.tsx" />

          <StatCard
            title="Monthly Expenses"
            value={`₹${dashboardData.monthlyExpenses.toLocaleString()}`}
            icon={<TrendingDown className="h-8 w-8" data-id="oom8bnvs2" data-path="src/pages/Dashboard.tsx" />}
            trend="down"
            trendValue="-3.1%"
            className="bg-gradient-to-br from-red-50 to-red-100 border-red-200" data-id="d14rq1bgc" data-path="src/pages/Dashboard.tsx" />

          <StatCard
            title="Budget Used"
            value={`${dashboardData.budgetUsed}%`}
            icon={<Target className="h-8 w-8" data-id="ppi46rl6n" data-path="src/pages/Dashboard.tsx" />}
            className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200" data-id="v6uv5d9ee" data-path="src/pages/Dashboard.tsx" />

        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6" data-id="th4k0vte8" data-path="src/pages/Dashboard.tsx">
          {/* Charts and Analytics */}
          <div className="xl:col-span-2 space-y-4 md:space-y-6" data-id="j1mrl05ki" data-path="src/pages/Dashboard.tsx">
            {/* Monthly Trend Chart */}
            <Card data-id="hdk48de63" data-path="src/pages/Dashboard.tsx">
              <CardHeader data-id="vgwumyqz2" data-path="src/pages/Dashboard.tsx">
                <CardTitle data-id="f5mix2rdl" data-path="src/pages/Dashboard.tsx">Income vs Expenses Trend</CardTitle>
                <CardDescription data-id="k3m9dnte8" data-path="src/pages/Dashboard.tsx">Your financial performance over the last 5 months</CardDescription>
              </CardHeader>
              <CardContent data-id="7vlqq39vv" data-path="src/pages/Dashboard.tsx">
                <ResponsiveContainer width="100%" height={300} data-id="rhai61clh" data-path="src/pages/Dashboard.tsx">
                  <LineChart data={dashboardData.monthlyTrend} data-id="j3sr2lnm0" data-path="src/pages/Dashboard.tsx">
                    <CartesianGrid strokeDasharray="3 3" data-id="uj5ezdga6" data-path="src/pages/Dashboard.tsx" />
                    <XAxis dataKey="month" data-id="iwlj7vret" data-path="src/pages/Dashboard.tsx" />
                    <YAxis data-id="zbxxyojz7" data-path="src/pages/Dashboard.tsx" />
                    <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, '']} data-id="bl0s7jadh" data-path="src/pages/Dashboard.tsx" />
                    <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} name="Income" data-id="oho7kkkph" data-path="src/pages/Dashboard.tsx" />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} name="Expenses" data-id="9x7ivzo93" data-path="src/pages/Dashboard.tsx" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Expense Distribution */}
            <Card data-id="wsdusx3cg" data-path="src/pages/Dashboard.tsx">
              <CardHeader data-id="hfpvpxq22" data-path="src/pages/Dashboard.tsx">
                <CardTitle data-id="xvddv7miw" data-path="src/pages/Dashboard.tsx">Expense Distribution</CardTitle>
                <CardDescription data-id="fv8tsvnde" data-path="src/pages/Dashboard.tsx">How you're spending your money this month</CardDescription>
              </CardHeader>
              <CardContent data-id="h99qivt2b" data-path="src/pages/Dashboard.tsx">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" data-id="hxu8qghtg" data-path="src/pages/Dashboard.tsx">
                  <ResponsiveContainer width="100%" height={250} data-id="nnp2hf8mk" data-path="src/pages/Dashboard.tsx">
                    <PieChart data-id="30qjhvjhc" data-path="src/pages/Dashboard.tsx">
                      <Pie
                        data={dashboardData.expenseByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value" data-id="x1705bp5k" data-path="src/pages/Dashboard.tsx">

                        {dashboardData.expenseByCategory.map((entry, index) =>
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} data-id="vl57f5cvb" data-path="src/pages/Dashboard.tsx" />
                        )}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, '']} data-id="7gm53azot" data-path="src/pages/Dashboard.tsx" />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2" data-id="dsegy4zx9" data-path="src/pages/Dashboard.tsx">
                    {dashboardData.expenseByCategory.map((category, index) =>
                    <div key={category.name} className="flex items-center justify-between" data-id="84h6t4olw" data-path="src/pages/Dashboard.tsx">
                        <div className="flex items-center gap-2" data-id="012g16mdl" data-path="src/pages/Dashboard.tsx">
                          <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }} data-id="cc71kv5bf" data-path="src/pages/Dashboard.tsx" />

                          <span className="text-sm font-medium" data-id="52gst1tgq" data-path="src/pages/Dashboard.tsx">{category.name}</span>
                        </div>
                        <div className="text-right" data-id="ddgv0e4gd" data-path="src/pages/Dashboard.tsx">
                          <div className="text-sm font-medium" data-id="5zvmtikli" data-path="src/pages/Dashboard.tsx">₹{category.value.toLocaleString()}</div>
                          <div className="text-xs text-gray-500" data-id="0oh59l44q" data-path="src/pages/Dashboard.tsx">{category.percentage}%</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card data-id="cfvsrxnxm" data-path="src/pages/Dashboard.tsx">
              <CardHeader className="flex flex-row items-center justify-between" data-id="bq5poz2n2" data-path="src/pages/Dashboard.tsx">
                <div data-id="w8tssu9kc" data-path="src/pages/Dashboard.tsx">
                  <CardTitle data-id="ycyrcy1y2" data-path="src/pages/Dashboard.tsx">Recent Transactions</CardTitle>
                  <CardDescription data-id="k1p9989ez" data-path="src/pages/Dashboard.tsx">Your latest financial activities</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/expenses')} data-id="4t8mwd8k4" data-path="src/pages/Dashboard.tsx">
                  View All
                </Button>
              </CardHeader>
              <CardContent data-id="moautkz6o" data-path="src/pages/Dashboard.tsx">
                <div className="space-y-3" data-id="h04urs55b" data-path="src/pages/Dashboard.tsx">
                  {dashboardData.recentTransactions.slice(0, 5).map((transaction) =>
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50" data-id="589k6v61e" data-path="src/pages/Dashboard.tsx">
                      <div className="flex items-center gap-3" data-id="g7tb0i21i" data-path="src/pages/Dashboard.tsx">
                        <div className={`p-2 rounded-full ${
                      transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`
                      } data-id="3eqqvm096" data-path="src/pages/Dashboard.tsx">
                          {transaction.type === 'income' ?
                        <TrendingUp className="h-4 w-4" data-id="2yequ9j5w" data-path="src/pages/Dashboard.tsx" /> :
                        <TrendingDown className="h-4 w-4" data-id="7fwiui01o" data-path="src/pages/Dashboard.tsx" />
                        }
                        </div>
                        <div data-id="6azilpk6k" data-path="src/pages/Dashboard.tsx">
                          <div className="font-medium" data-id="4d1ork4vb" data-path="src/pages/Dashboard.tsx">{transaction.title}</div>
                          <div className="text-sm text-gray-500" data-id="fl82efu4v" data-path="src/pages/Dashboard.tsx">{transaction.category} • {transaction.date}</div>
                        </div>
                      </div>
                      <div className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`
                    } data-id="tvxqepq0k" data-path="src/pages/Dashboard.tsx">
                        {transaction.type === 'income' ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 md:space-y-6" data-id="p2o228iq7" data-path="src/pages/Dashboard.tsx">
            {/* Quick Actions */}
            <QuickActions data-id="wcqmmtbwv" data-path="src/pages/Dashboard.tsx" />

            {/* Budget Overview */}
            <Card data-id="kiz3xofxi" data-path="src/pages/Dashboard.tsx">
              <CardHeader data-id="hly49n5kk" data-path="src/pages/Dashboard.tsx">
                <CardTitle className="flex items-center gap-2" data-id="dg3jcyz7j" data-path="src/pages/Dashboard.tsx">
                  <Target className="h-5 w-5" data-id="hsvo9ii2i" data-path="src/pages/Dashboard.tsx" />
                  Budget Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-id="017p004el" data-path="src/pages/Dashboard.tsx">
                {dashboardData.budgetCategories.map((budget) =>
                <div key={budget.category} className="space-y-2" data-id="ihj7mllrt" data-path="src/pages/Dashboard.tsx">
                    <div className="flex justify-between text-sm" data-id="kmf7mtucu" data-path="src/pages/Dashboard.tsx">
                      <span className="font-medium" data-id="50u2yznb3" data-path="src/pages/Dashboard.tsx">{budget.category}</span>
                      <span className="text-gray-500" data-id="tkde3lvd4" data-path="src/pages/Dashboard.tsx">
                        ₹{budget.spent.toLocaleString()} / ₹{budget.allocated.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                    value={budget.percentage}
                    className={`h-2 ${budget.percentage > 90 ? 'text-red-500' : budget.percentage > 75 ? 'text-yellow-500' : 'text-green-500'}`} data-id="8v95mhe6i" data-path="src/pages/Dashboard.tsx" />

                    <div className="flex justify-between text-xs text-gray-500" data-id="tc7mcc4uz" data-path="src/pages/Dashboard.tsx">
                      <span data-id="7uxdqcfcb" data-path="src/pages/Dashboard.tsx">{budget.percentage}% used</span>
                      <span data-id="lcj8ocv8g" data-path="src/pages/Dashboard.tsx">₹{(budget.allocated - budget.spent).toLocaleString()} left</span>
                    </div>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => navigate('/budget')} data-id="282n6lbkb" data-path="src/pages/Dashboard.tsx">

                  Manage Budget
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Bills */}
            <Card data-id="28anaepx4" data-path="src/pages/Dashboard.tsx">
              <CardHeader data-id="zljv2tkkw" data-path="src/pages/Dashboard.tsx">
                <CardTitle className="flex items-center gap-2" data-id="f2tndphqo" data-path="src/pages/Dashboard.tsx">
                  <Bell className="h-5 w-5" data-id="gyava5i0f" data-path="src/pages/Dashboard.tsx" />
                  Upcoming Bills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3" data-id="ge06wp1bf" data-path="src/pages/Dashboard.tsx">
                {dashboardData.upcomingBills.map((bill) =>
                <div key={bill.id} className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border border-orange-200" data-id="kuang4706" data-path="src/pages/Dashboard.tsx">
                    <div data-id="dzs43d30v" data-path="src/pages/Dashboard.tsx">
                      <div className="font-medium" data-id="ngfbzgjw9" data-path="src/pages/Dashboard.tsx">{bill.title}</div>
                      <div className="text-sm text-gray-500" data-id="fko7onvef" data-path="src/pages/Dashboard.tsx">Due: {bill.dueDate}</div>
                    </div>
                    <div className="text-right" data-id="8fslgeai4" data-path="src/pages/Dashboard.tsx">
                      <div className="font-semibold text-orange-600" data-id="hebp5dl21" data-path="src/pages/Dashboard.tsx">₹{bill.amount.toLocaleString()}</div>
                      <Badge variant="outline" className="text-xs" data-id="dpx8m0jka" data-path="src/pages/Dashboard.tsx">
                        {bill.category}
                      </Badge>
                    </div>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate('/bills')} data-id="95wghx0kt" data-path="src/pages/Dashboard.tsx">

                  Manage Bills
                </Button>
              </CardContent>
            </Card>

            {/* Savings Goals */}
            <Card data-id="po5wle1ty" data-path="src/pages/Dashboard.tsx">
              <CardHeader data-id="r270uohad" data-path="src/pages/Dashboard.tsx">
                <CardTitle className="flex items-center gap-2" data-id="wfnwpxt5v" data-path="src/pages/Dashboard.tsx">
                  <PiggyBank className="h-5 w-5" data-id="skuwap74e" data-path="src/pages/Dashboard.tsx" />
                  Savings Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-id="iqxzpt9io" data-path="src/pages/Dashboard.tsx">
                {dashboardData.savingsGoals.map((goal) => {
                  const progress = goal.saved / goal.target * 100;
                  return (
                    <div key={goal.id} className="space-y-2" data-id="132o68yzm" data-path="src/pages/Dashboard.tsx">
                      <div className="flex justify-between text-sm" data-id="pj25uxxta" data-path="src/pages/Dashboard.tsx">
                        <span className="font-medium" data-id="fka5cokhz" data-path="src/pages/Dashboard.tsx">{goal.title}</span>
                        <span className="text-gray-500" data-id="8hjblby3r" data-path="src/pages/Dashboard.tsx">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" data-id="ruqafoljl" data-path="src/pages/Dashboard.tsx" />
                      <div className="flex justify-between text-xs text-gray-500" data-id="s4btli7rq" data-path="src/pages/Dashboard.tsx">
                        <span data-id="8i1isr957" data-path="src/pages/Dashboard.tsx">₹{goal.saved.toLocaleString()} saved</span>
                        <span data-id="6jvq5si6r" data-path="src/pages/Dashboard.tsx">Goal: ₹{goal.target.toLocaleString()}</span>
                      </div>
                    </div>);

                })}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate('/goals')} data-id="6x1o9l6yj" data-path="src/pages/Dashboard.tsx">

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