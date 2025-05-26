import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Search,
  Filter,
  Calendar as CalendarIcon,
  Edit,
  Trash2,
  TrendingDown,
  Receipt,
  Utensils,
  Car,
  GraduationCap,
  Coffee,
  ShoppingBag,
  Home,
  Gamepad2,
  Smartphone } from
'lucide-react';
import { format } from 'date-fns';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([
  {
    id: 1,
    title: 'Lunch at Canteen',
    amount: 150,
    category: 'Food',
    date: '2024-01-15',
    notes: 'Had biryani with friends',
    icon: '🍽️'
  },
  {
    id: 2,
    title: 'Bus Fare',
    amount: 50,
    category: 'Transport',
    date: '2024-01-15',
    notes: 'Daily commute',
    icon: '🚌'
  },
  {
    id: 3,
    title: 'Coffee with Friends',
    amount: 200,
    category: 'Entertainment',
    date: '2024-01-14',
    notes: 'Starbucks coffee date',
    icon: '☕'
  },
  {
    id: 4,
    title: 'Course Books',
    amount: 1500,
    category: 'Study Materials',
    date: '2024-01-14',
    notes: 'Semester textbooks',
    icon: '📚'
  },
  {
    id: 5,
    title: 'Movie Tickets',
    amount: 400,
    category: 'Entertainment',
    date: '2024-01-13',
    notes: 'Weekend movie with friends',
    icon: '🎬'
  },
  {
    id: 6,
    title: 'Groceries',
    amount: 800,
    category: 'Food',
    date: '2024-01-12',
    notes: 'Monthly grocery shopping',
    icon: '🛒'
  },
  {
    id: 7,
    title: 'Internet Recharge',
    amount: 399,
    category: 'Utilities',
    date: '2024-01-11',
    notes: 'Monthly internet plan',
    icon: '📱'
  },
  {
    id: 8,
    title: 'Haircut',
    amount: 200,
    category: 'Personal Care',
    date: '2024-01-10',
    notes: 'Monthly haircut',
    icon: '✂️'
  }]
  );

  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const categories = [
  { name: 'Food', icon: <Utensils className="h-4 w-4" data-id="xyjolr0tk" data-path="src/pages/ExpensesPage.tsx" />, color: 'bg-orange-100 text-orange-800' },
  { name: 'Transport', icon: <Car className="h-4 w-4" data-id="ltxgnqczc" data-path="src/pages/ExpensesPage.tsx" />, color: 'bg-blue-100 text-blue-800' },
  { name: 'Entertainment', icon: <Coffee className="h-4 w-4" data-id="f27bsd26u" data-path="src/pages/ExpensesPage.tsx" />, color: 'bg-purple-100 text-purple-800' },
  { name: 'Study Materials', icon: <GraduationCap className="h-4 w-4" data-id="e4bf3xkmd" data-path="src/pages/ExpensesPage.tsx" />, color: 'bg-green-100 text-green-800' },
  { name: 'Shopping', icon: <ShoppingBag className="h-4 w-4" data-id="cbhrjb8vo" data-path="src/pages/ExpensesPage.tsx" />, color: 'bg-pink-100 text-pink-800' },
  { name: 'Utilities', icon: <Home className="h-4 w-4" data-id="i1rtxk2hp" data-path="src/pages/ExpensesPage.tsx" />, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Personal Care', icon: <Smartphone className="h-4 w-4" data-id="2rmbrrdt5" data-path="src/pages/ExpensesPage.tsx" />, color: 'bg-teal-100 text-teal-800' },
  { name: 'Others', icon: <Receipt className="h-4 w-4" data-id="sh20f8jfc" data-path="src/pages/ExpensesPage.tsx" />, color: 'bg-gray-100 text-gray-800' }];


  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date(),
    notes: ''
  });

  // Filter expenses based on search term, category, and month
  useEffect(() => {
    let filtered = expenses;

    if (searchTerm) {
      filtered = filtered.filter((expense) =>
      expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.notes.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter((expense) => expense.category === selectedCategory);
    }

    if (selectedMonth && selectedMonth !== 'All') {
      filtered = filtered.filter((expense) => {
        const expenseMonth = new Date(expense.date).getMonth();
        const currentMonth = new Date().getMonth();

        if (selectedMonth === 'This Month') {
          return expenseMonth === currentMonth;
        }
        if (selectedMonth === 'Last Month') {
          return expenseMonth === currentMonth - 1;
        }
        return true;
      });
    }

    setFilteredExpenses(filtered);
  }, [searchTerm, selectedCategory, selectedMonth, expenses]);

  const handleAddExpense = () => {
    if (!newExpense.title || !newExpense.amount || !newExpense.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const expense = {
      id: Date.now(),
      ...newExpense,
      amount: parseFloat(newExpense.amount),
      date: format(newExpense.date, 'yyyy-MM-dd'),
      icon: categories.find((cat) => cat.name === newExpense.category)?.name === 'Food' ? '🍽️' : '💰'
    };

    setExpenses((prev) => [expense, ...prev]);
    setNewExpense({
      title: '',
      amount: '',
      category: '',
      date: new Date(),
      notes: ''
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Expense Added",
      description: `₹${expense.amount} expense for ${expense.title} has been recorded.`
    });
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    toast({
      title: "Expense Deleted",
      description: "The expense has been removed from your records."
    });
  };

  const getCategoryStyle = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.color : 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.icon : <Receipt className="h-4 w-4" data-id="nlb2yetl0" data-path="src/pages/ExpensesPage.tsx" />;
  };

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const avgExpensePerDay = totalExpenses / Math.max(filteredExpenses.length, 1);

  const ExpenseCard = ({ expense }: {expense: typeof expenses[0];}) =>
  <Card className="hover:shadow-md transition-all duration-200" data-id="b5cvawnl6" data-path="src/pages/ExpensesPage.tsx">
      <CardContent className="p-4" data-id="j4vx8o2ry" data-path="src/pages/ExpensesPage.tsx">
        <div className="flex items-center justify-between" data-id="daqbw8gd6" data-path="src/pages/ExpensesPage.tsx">
          <div className="flex items-center space-x-3" data-id="0thx2zagl" data-path="src/pages/ExpensesPage.tsx">
            <div className="text-2xl" data-id="tema4ddym" data-path="src/pages/ExpensesPage.tsx">{expense.icon}</div>
            <div data-id="6xx5w9lbr" data-path="src/pages/ExpensesPage.tsx">
              <h3 className="font-semibold text-gray-900" data-id="n14clohda" data-path="src/pages/ExpensesPage.tsx">{expense.title}</h3>
              <div className="flex items-center gap-2 mt-1" data-id="fnt3qe1nj" data-path="src/pages/ExpensesPage.tsx">
                <Badge variant="secondary" className={getCategoryStyle(expense.category)} data-id="d8hr7uq1t" data-path="src/pages/ExpensesPage.tsx">
                  {getCategoryIcon(expense.category)}
                  <span className="ml-1" data-id="wbzpt18he" data-path="src/pages/ExpensesPage.tsx">{expense.category}</span>
                </Badge>
                <span className="text-sm text-gray-500" data-id="d9k0mx3hp" data-path="src/pages/ExpensesPage.tsx">{expense.date}</span>
              </div>
              {expense.notes &&
            <p className="text-sm text-gray-600 mt-1" data-id="zxvl5f8g5" data-path="src/pages/ExpensesPage.tsx">{expense.notes}</p>
            }
            </div>
          </div>
          <div className="flex items-center space-x-2" data-id="l2wuyqscb" data-path="src/pages/ExpensesPage.tsx">
            <span className="text-lg font-bold text-red-600" data-id="l4vi6u1qx" data-path="src/pages/ExpensesPage.tsx">
              -₹{expense.amount.toLocaleString()}
            </span>
            <div className="flex space-x-1" data-id="yumyqb6dh" data-path="src/pages/ExpensesPage.tsx">
              <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditingExpense(expense)} data-id="zzg2iiw7q" data-path="src/pages/ExpensesPage.tsx">

                <Edit className="h-4 w-4" data-id="6xymtkjm3" data-path="src/pages/ExpensesPage.tsx" />
              </Button>
              <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteExpense(expense.id)}
              className="text-red-600 hover:text-red-700" data-id="i6oamahlw" data-path="src/pages/ExpensesPage.tsx">

                <Trash2 className="h-4 w-4" data-id="wyjz3ak4e" data-path="src/pages/ExpensesPage.tsx" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;


  const AddExpenseForm = () =>
  <div className="space-y-4" data-id="jkgki60pf" data-path="src/pages/ExpensesPage.tsx">
      <div className="space-y-2" data-id="29waedy9r" data-path="src/pages/ExpensesPage.tsx">
        <Label htmlFor="title" data-id="pla5wfz72" data-path="src/pages/ExpensesPage.tsx">Expense Title</Label>
        <Input
        id="title"
        placeholder="e.g., Lunch at Canteen"
        value={newExpense.title}
        onChange={(e) => setNewExpense((prev) => ({ ...prev, title: e.target.value }))} data-id="9nhzxcyfi" data-path="src/pages/ExpensesPage.tsx" />

      </div>

      <div className="grid grid-cols-2 gap-4" data-id="jw6fk06la" data-path="src/pages/ExpensesPage.tsx">
        <div className="space-y-2" data-id="f2nucoeef" data-path="src/pages/ExpensesPage.tsx">
          <Label htmlFor="amount" data-id="56prh9lym" data-path="src/pages/ExpensesPage.tsx">Amount (₹)</Label>
          <Input
          id="amount"
          type="number"
          placeholder="0"
          value={newExpense.amount}
          onChange={(e) => setNewExpense((prev) => ({ ...prev, amount: e.target.value }))} data-id="4ky5sphqn" data-path="src/pages/ExpensesPage.tsx" />

        </div>

        <div className="space-y-2" data-id="2lrlvo0f0" data-path="src/pages/ExpensesPage.tsx">
          <Label htmlFor="category" data-id="vu2q7ptbl" data-path="src/pages/ExpensesPage.tsx">Category</Label>
          <Select value={newExpense.category} onValueChange={(value) => setNewExpense((prev) => ({ ...prev, category: value }))} data-id="0jqj8n56t" data-path="src/pages/ExpensesPage.tsx">
            <SelectTrigger data-id="x7ud0bjz3" data-path="src/pages/ExpensesPage.tsx">
              <SelectValue placeholder="Select category" data-id="ugqylbp03" data-path="src/pages/ExpensesPage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="qp2airm1z" data-path="src/pages/ExpensesPage.tsx">
              {categories.map((category) =>
            <SelectItem key={category.name} value={category.name} data-id="wko587tx7" data-path="src/pages/ExpensesPage.tsx">
                  <div className="flex items-center gap-2" data-id="cj8j6ses9" data-path="src/pages/ExpensesPage.tsx">
                    {category.icon}
                    {category.name}
                  </div>
                </SelectItem>
            )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2" data-id="2inc1fwkk" data-path="src/pages/ExpensesPage.tsx">
        <Label data-id="6smk2l4m1" data-path="src/pages/ExpensesPage.tsx">Date</Label>
        <Popover data-id="u1jdwmhla" data-path="src/pages/ExpensesPage.tsx">
          <PopoverTrigger asChild data-id="4sbh1f0tw" data-path="src/pages/ExpensesPage.tsx">
            <Button variant="outline" className="w-full justify-start text-left font-normal" data-id="pj71nzg8f" data-path="src/pages/ExpensesPage.tsx">
              <CalendarIcon className="mr-2 h-4 w-4" data-id="r39hu77ea" data-path="src/pages/ExpensesPage.tsx" />
              {format(newExpense.date, 'PPP')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" data-id="5wgqfs4fa" data-path="src/pages/ExpensesPage.tsx">
            <Calendar
            mode="single"
            selected={newExpense.date}
            onSelect={(date) => date && setNewExpense((prev) => ({ ...prev, date }))}
            initialFocus data-id="hyp90pjur" data-path="src/pages/ExpensesPage.tsx" />

          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2" data-id="fam4p0mjk" data-path="src/pages/ExpensesPage.tsx">
        <Label htmlFor="notes" data-id="j2hmz7qb9" data-path="src/pages/ExpensesPage.tsx">Notes (Optional)</Label>
        <Textarea
        id="notes"
        placeholder="Add any additional details..."
        value={newExpense.notes}
        onChange={(e) => setNewExpense((prev) => ({ ...prev, notes: e.target.value }))} data-id="itgucz26b" data-path="src/pages/ExpensesPage.tsx" />

      </div>

      <div className="flex space-x-2 pt-4" data-id="nu1mk9cqf" data-path="src/pages/ExpensesPage.tsx">
        <Button onClick={handleAddExpense} className="flex-1" data-id="epinny25t" data-path="src/pages/ExpensesPage.tsx">
          Add Expense
        </Button>
        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} data-id="xine14r7x" data-path="src/pages/ExpensesPage.tsx">
          Cancel
        </Button>
      </div>
    </div>;


  return (
    <DashboardLayout data-id="642t12rwx" data-path="src/pages/ExpensesPage.tsx">
      <div className="p-6 space-y-6" data-id="1d0cecfuy" data-path="src/pages/ExpensesPage.tsx">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" data-id="1y0kzbv5a" data-path="src/pages/ExpensesPage.tsx">
          <div data-id="0kmgy3o8n" data-path="src/pages/ExpensesPage.tsx">
            <h1 className="text-3xl font-bold text-gray-900" data-id="1q0sv3s8r" data-path="src/pages/ExpensesPage.tsx">Expenses</h1>
            <p className="text-gray-600" data-id="xdhbtgjj8" data-path="src/pages/ExpensesPage.tsx">Track and manage your spending</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} data-id="rroyib1wt" data-path="src/pages/ExpensesPage.tsx">
            <DialogTrigger asChild data-id="el7edbj06" data-path="src/pages/ExpensesPage.tsx">
              <Button className="bg-blue-600 hover:bg-blue-700" data-id="ea9sc8fi9" data-path="src/pages/ExpensesPage.tsx">
                <Plus className="h-4 w-4 mr-2" data-id="q0e7qosvz" data-path="src/pages/ExpensesPage.tsx" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" data-id="nx41lt0ch" data-path="src/pages/ExpensesPage.tsx">
              <DialogHeader data-id="x7tv6dnim" data-path="src/pages/ExpensesPage.tsx">
                <DialogTitle data-id="r0bn6e8tu" data-path="src/pages/ExpensesPage.tsx">Add New Expense</DialogTitle>
                <DialogDescription data-id="xxdti5rvu" data-path="src/pages/ExpensesPage.tsx">
                  Record a new expense to track your spending.
                </DialogDescription>
              </DialogHeader>
              <AddExpenseForm data-id="dxwqipd8a" data-path="src/pages/ExpensesPage.tsx" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="sbqzv9kuc" data-path="src/pages/ExpensesPage.tsx">
          <Card data-id="bivtfzlkw" data-path="src/pages/ExpensesPage.tsx">
            <CardContent className="p-6" data-id="i3ffmph13" data-path="src/pages/ExpensesPage.tsx">
              <div className="flex items-center justify-between" data-id="oz05kq5dd" data-path="src/pages/ExpensesPage.tsx">
                <div data-id="9q1sro8le" data-path="src/pages/ExpensesPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="z4otucwiq" data-path="src/pages/ExpensesPage.tsx">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600" data-id="0livenbsc" data-path="src/pages/ExpensesPage.tsx">₹{totalExpenses.toLocaleString()}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-600" data-id="cfz0jkz45" data-path="src/pages/ExpensesPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="149txuasn" data-path="src/pages/ExpensesPage.tsx">
            <CardContent className="p-6" data-id="74gw692re" data-path="src/pages/ExpensesPage.tsx">
              <div className="flex items-center justify-between" data-id="cunbr2b80" data-path="src/pages/ExpensesPage.tsx">
                <div data-id="z9cjyhy1g" data-path="src/pages/ExpensesPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="g2091z1bq" data-path="src/pages/ExpensesPage.tsx">Total Transactions</p>
                  <p className="text-2xl font-bold text-gray-900" data-id="fknd3gwul" data-path="src/pages/ExpensesPage.tsx">{filteredExpenses.length}</p>
                </div>
                <Receipt className="h-8 w-8 text-gray-600" data-id="kccztltcs" data-path="src/pages/ExpensesPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="8ehxboelm" data-path="src/pages/ExpensesPage.tsx">
            <CardContent className="p-6" data-id="coymcbley" data-path="src/pages/ExpensesPage.tsx">
              <div className="flex items-center justify-between" data-id="r4gw247y3" data-path="src/pages/ExpensesPage.tsx">
                <div data-id="4wxv6ljct" data-path="src/pages/ExpensesPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="xyzvpcou3" data-path="src/pages/ExpensesPage.tsx">Avg per Transaction</p>
                  <p className="text-2xl font-bold text-purple-600" data-id="fixvyuor4" data-path="src/pages/ExpensesPage.tsx">₹{Math.round(avgExpensePerDay).toLocaleString()}</p>
                </div>
                <Receipt className="h-8 w-8 text-purple-600" data-id="cunits404" data-path="src/pages/ExpensesPage.tsx" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card data-id="uw548i4th" data-path="src/pages/ExpensesPage.tsx">
          <CardContent className="p-6" data-id="bp5nzeekh" data-path="src/pages/ExpensesPage.tsx">
            <div className="flex flex-col md:flex-row gap-4" data-id="44dh77bin" data-path="src/pages/ExpensesPage.tsx">
              <div className="flex-1" data-id="xhdfuqgwr" data-path="src/pages/ExpensesPage.tsx">
                <div className="relative" data-id="n1u92b9hj" data-path="src/pages/ExpensesPage.tsx">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" data-id="iousw0ih1" data-path="src/pages/ExpensesPage.tsx" />
                  <Input
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10" data-id="qtresu4vn" data-path="src/pages/ExpensesPage.tsx" />

                </div>
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory} data-id="0cvautbeh" data-path="src/pages/ExpensesPage.tsx">
                <SelectTrigger className="w-full md:w-48" data-id="01y16v0rd" data-path="src/pages/ExpensesPage.tsx">
                  <SelectValue placeholder="All Categories" data-id="lj8fwjk4r" data-path="src/pages/ExpensesPage.tsx" />
                </SelectTrigger>
                <SelectContent data-id="x2t64pbg3" data-path="src/pages/ExpensesPage.tsx">
                  <SelectItem value="All" data-id="h09hyzpxf" data-path="src/pages/ExpensesPage.tsx">All Categories</SelectItem>
                  {categories.map((category) =>
                  <SelectItem key={category.name} value={category.name} data-id="hitc2esp4" data-path="src/pages/ExpensesPage.tsx">
                      <div className="flex items-center gap-2" data-id="fsz1di2rc" data-path="src/pages/ExpensesPage.tsx">
                        {category.icon}
                        {category.name}
                      </div>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              <Select value={selectedMonth} onValueChange={setSelectedMonth} data-id="083yny3bt" data-path="src/pages/ExpensesPage.tsx">
                <SelectTrigger className="w-full md:w-48" data-id="d2ytglrwz" data-path="src/pages/ExpensesPage.tsx">
                  <SelectValue placeholder="All Time" data-id="npis09ly5" data-path="src/pages/ExpensesPage.tsx" />
                </SelectTrigger>
                <SelectContent data-id="qxklibppe" data-path="src/pages/ExpensesPage.tsx">
                  <SelectItem value="All" data-id="fgtfm1a29" data-path="src/pages/ExpensesPage.tsx">All Time</SelectItem>
                  <SelectItem value="This Month" data-id="vh9hj88h6" data-path="src/pages/ExpensesPage.tsx">This Month</SelectItem>
                  <SelectItem value="Last Month" data-id="lov01djkl" data-path="src/pages/ExpensesPage.tsx">Last Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Category Overview */}
        <Card data-id="pj1edfgrn" data-path="src/pages/ExpensesPage.tsx">
          <CardHeader data-id="e9vp7mhde" data-path="src/pages/ExpensesPage.tsx">
            <CardTitle data-id="a0syx01y6" data-path="src/pages/ExpensesPage.tsx">Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent data-id="2u3d2q73q" data-path="src/pages/ExpensesPage.tsx">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-id="28cix3dbt" data-path="src/pages/ExpensesPage.tsx">
              {categories.map((category) => {
                const categoryExpenses = filteredExpenses.filter((expense) => expense.category === category.name);
                const categoryTotal = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
                const percentage = totalExpenses > 0 ? categoryTotal / totalExpenses * 100 : 0;

                return (
                  <div key={category.name} className="text-center p-4 rounded-lg bg-gray-50" data-id="4xa8dw4u8" data-path="src/pages/ExpensesPage.tsx">
                    <div className="text-2xl mb-2" data-id="01jsp7pry" data-path="src/pages/ExpensesPage.tsx">{category.icon}</div>
                    <div className="font-medium text-sm" data-id="iwsgnrfh0" data-path="src/pages/ExpensesPage.tsx">{category.name}</div>
                    <div className="text-lg font-bold text-gray-900" data-id="wa7hpkqlu" data-path="src/pages/ExpensesPage.tsx">₹{categoryTotal.toLocaleString()}</div>
                    <div className="text-xs text-gray-500" data-id="kyolc1sab" data-path="src/pages/ExpensesPage.tsx">{percentage.toFixed(1)}%</div>
                  </div>);

              })}
            </div>
          </CardContent>
        </Card>

        {/* Expenses List */}
        <Card data-id="cma3gt1k2" data-path="src/pages/ExpensesPage.tsx">
          <CardHeader data-id="mczqjnp5v" data-path="src/pages/ExpensesPage.tsx">
            <CardTitle data-id="8srqfcaz5" data-path="src/pages/ExpensesPage.tsx">Recent Expenses</CardTitle>
            <CardDescription data-id="hxbe1uogc" data-path="src/pages/ExpensesPage.tsx">
              {filteredExpenses.length} {filteredExpenses.length === 1 ? 'expense' : 'expenses'} found
            </CardDescription>
          </CardHeader>
          <CardContent data-id="hky760igk" data-path="src/pages/ExpensesPage.tsx">
            {filteredExpenses.length === 0 ?
            <div className="text-center py-12" data-id="3g9g9yuch" data-path="src/pages/ExpensesPage.tsx">
                <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" data-id="7ayk1kf42" data-path="src/pages/ExpensesPage.tsx" />
                <h3 className="text-lg font-medium text-gray-900 mb-2" data-id="6f7nz4pbo" data-path="src/pages/ExpensesPage.tsx">No expenses found</h3>
                <p className="text-gray-600 mb-4" data-id="3t9fue3tn" data-path="src/pages/ExpensesPage.tsx">
                  {searchTerm || selectedCategory !== 'All' ?
                'Try adjusting your filters or search terms.' :
                'Start tracking your expenses by adding your first expense.'
                }
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)} data-id="ppr5i22f3" data-path="src/pages/ExpensesPage.tsx">
                  <Plus className="h-4 w-4 mr-2" data-id="f3gpr32yo" data-path="src/pages/ExpensesPage.tsx" />
                  Add First Expense
                </Button>
              </div> :

            <div className="space-y-4" data-id="sx9bumho2" data-path="src/pages/ExpensesPage.tsx">
                {filteredExpenses.map((expense) =>
              <ExpenseCard key={expense.id} expense={expense} data-id="tuji6ejge" data-path="src/pages/ExpensesPage.tsx" />
              )}
              </div>
            }
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>);

};

export default ExpensesPage;