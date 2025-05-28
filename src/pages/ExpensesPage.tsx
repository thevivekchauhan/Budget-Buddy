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

const EXPENSES_TABLE_ID = 10239;

declare global {
  interface Window {
    ezsite: {
      apis: {
        tablePage: (tableId: number, params: any) => Promise<{data: any;error: string;}>;
        tableCreate: (tableId: number, data: any) => Promise<{error: string;}>;
        tableUpdate: (tableId: number, data: any) => Promise<{error: string;}>;
        tableDelete: (tableId: number, params: any) => Promise<{error: string;}>;
        getUserInfo: () => Promise<{data: any;error: string;}>;
      };
    };
  }
}

interface Expense {
  ID: number;
  title: string;
  amount: number;
  category: string;
  expense_date: string;
  notes: string;
  user_id: number;
}

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const categories = [
  { name: 'Food', icon: <Utensils className="h-4 w-4" data-id="ra9jz821u" data-path="src/pages/ExpensesPage.tsx" />, color: 'bg-orange-100 text-orange-800' },
  { name: 'Transport', icon: <Car className="h-4 w-4" data-id="3aup3wx66" data-path="src/pages/ExpensesPage.tsx" />, color: 'bg-blue-100 text-blue-800' },
  { name: 'Entertainment', icon: <Coffee className="h-4 w-4" data-id="p6zk1saoe" data-path="src/pages/ExpensesPage.tsx" />, color: 'bg-purple-100 text-purple-800' },
  { name: 'Study Materials', icon: <GraduationCap className="h-4 w-4" data-id="q9hsvojkl" data-path="src/pages/ExpensesPage.tsx" />, color: 'bg-green-100 text-green-800' },
  { name: 'Shopping', icon: <ShoppingBag className="h-4 w-4" data-id="3nacbh8zh" data-path="src/pages/ExpensesPage.tsx" />, color: 'bg-pink-100 text-pink-800' },
  { name: 'Utilities', icon: <Home className="h-4 w-4" data-id="j27dvgy1x" data-path="src/pages/ExpensesPage.tsx" />, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Personal Care', icon: <Smartphone className="h-4 w-4" data-id="r5cnwb0gf" data-path="src/pages/ExpensesPage.tsx" />, color: 'bg-teal-100 text-teal-800' },
  { name: 'Others', icon: <Receipt className="h-4 w-4" data-id="50tfl2hmm" data-path="src/pages/ExpensesPage.tsx" />, color: 'bg-gray-100 text-gray-800' }];


  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date(),
    notes: ''
  });

  // Load user and expenses on component mount
  useEffect(() => {
    loadUserAndExpenses();
  }, []);

  const loadUserAndExpenses = async () => {
    try {
      const { data: userData, error: userError } = await window.ezsite.apis.getUserInfo();
      if (userError) throw userError;
      setUser(userData);

      if (userData?.ID) {
        await loadExpenses(userData.ID);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: "Error",
        description: "Failed to load user data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadExpenses = async (userId: number) => {
    try {
      const { data, error } = await window.ezsite.apis.tablePage(EXPENSES_TABLE_ID, {
        PageNo: 1,
        PageSize: 1000,
        OrderByField: "expense_date",
        IsAsc: false,
        Filters: [
        {
          name: "user_id",
          op: "Equal",
          value: userId
        }]

      });

      if (error) throw error;
      setExpenses(data?.List || []);
    } catch (error) {
      console.error('Error loading expenses:', error);
      toast({
        title: "Error",
        description: "Failed to load expenses. Please try again.",
        variant: "destructive"
      });
    }
  };

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
        const expenseMonth = new Date(expense.expense_date).getMonth();
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

  const handleAddExpense = async () => {
    if (!newExpense.title || !newExpense.amount || !newExpense.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!user?.ID) {
      toast({
        title: "Error",
        description: "User not found. Please refresh and try again.",
        variant: "destructive"
      });
      return;
    }

    try {
      const expenseData = {
        user_id: user.ID,
        title: newExpense.title,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        expense_date: format(newExpense.date, 'yyyy-MM-dd'),
        notes: newExpense.notes
      };

      const { error } = await window.ezsite.apis.tableCreate(EXPENSES_TABLE_ID, expenseData);
      if (error) throw error;

      await loadExpenses(user.ID);
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
        description: `₹${expenseData.amount} expense for ${expenseData.title} has been recorded.`
      });
    } catch (error) {
      console.error('Error adding expense:', error);
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      const { error } = await window.ezsite.apis.tableDelete(EXPENSES_TABLE_ID, { ID: id });
      if (error) throw error;

      if (user?.ID) {
        await loadExpenses(user.ID);
      }

      toast({
        title: "Expense Deleted",
        description: "The expense has been removed from your records."
      });
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast({
        title: "Error",
        description: "Failed to delete expense. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getCategoryStyle = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.color : 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.icon : <Receipt className="h-4 w-4" data-id="5497abzwo" data-path="src/pages/ExpensesPage.tsx" />;
  };

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const avgExpensePerDay = totalExpenses / Math.max(filteredExpenses.length, 1);

  const ExpenseCard = ({ expense }: {expense: Expense;}) => {
    const getIcon = (category: string) => {
      switch (category) {
        case 'Food':return '🍽️';
        case 'Transport':return '🚌';
        case 'Entertainment':return '🎬';
        case 'Study Materials':return '📚';
        case 'Shopping':return '🛒';
        case 'Utilities':return '📱';
        case 'Personal Care':return '✂️';
        default:return '💰';
      }
    };

    return (
      <Card className="hover:shadow-md transition-all duration-200" data-id="x1739nphr" data-path="src/pages/ExpensesPage.tsx">
        <CardContent className="p-4" data-id="514qr1105" data-path="src/pages/ExpensesPage.tsx">
          <div className="flex items-center justify-between" data-id="hmy92fcz6" data-path="src/pages/ExpensesPage.tsx">
            <div className="flex items-center space-x-3" data-id="nrp9zwxt0" data-path="src/pages/ExpensesPage.tsx">
              <div className="text-2xl" data-id="kj082wnkb" data-path="src/pages/ExpensesPage.tsx">{getIcon(expense.category)}</div>
              <div data-id="mxfvw51pg" data-path="src/pages/ExpensesPage.tsx">
                <h3 className="font-semibold text-gray-900" data-id="s6ibxkqmd" data-path="src/pages/ExpensesPage.tsx">{expense.title}</h3>
                <div className="flex items-center gap-2 mt-1" data-id="bqrutp38f" data-path="src/pages/ExpensesPage.tsx">
                  <Badge variant="secondary" className={getCategoryStyle(expense.category)} data-id="aabbnwhdm" data-path="src/pages/ExpensesPage.tsx">
                    {getCategoryIcon(expense.category)}
                    <span className="ml-1" data-id="v123sgvhj" data-path="src/pages/ExpensesPage.tsx">{expense.category}</span>
                  </Badge>
                  <span className="text-sm text-gray-500" data-id="16bzn5495" data-path="src/pages/ExpensesPage.tsx">{expense.expense_date}</span>
                </div>
                {expense.notes &&
                <p className="text-sm text-gray-600 mt-1" data-id="khlgfw7ws" data-path="src/pages/ExpensesPage.tsx">{expense.notes}</p>
                }
              </div>
            </div>
            <div className="flex items-center space-x-2" data-id="yi7p9ieca" data-path="src/pages/ExpensesPage.tsx">
              <span className="text-lg font-bold text-red-600" data-id="nu6ckx889" data-path="src/pages/ExpensesPage.tsx">
                -₹{expense.amount.toLocaleString()}
              </span>
              <div className="flex space-x-1" data-id="6n2p5iix8" data-path="src/pages/ExpensesPage.tsx">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingExpense(expense)} data-id="sw19phyot" data-path="src/pages/ExpensesPage.tsx">
                  <Edit className="h-4 w-4" data-id="fphhap7sw" data-path="src/pages/ExpensesPage.tsx" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteExpense(expense.ID)}
                  className="text-red-600 hover:text-red-700" data-id="sp88sbnx0" data-path="src/pages/ExpensesPage.tsx">
                  <Trash2 className="h-4 w-4" data-id="1w9ebd4k1" data-path="src/pages/ExpensesPage.tsx" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>);

  };


  const AddExpenseForm = () =>
  <div className="space-y-4" data-id="pr338n56c" data-path="src/pages/ExpensesPage.tsx">
      <div className="space-y-2" data-id="2u3vznna1" data-path="src/pages/ExpensesPage.tsx">
        <Label htmlFor="title" data-id="iru6q087b" data-path="src/pages/ExpensesPage.tsx">Expense Title</Label>
        <Input
        id="title"
        placeholder="e.g., Lunch at Canteen"
        value={newExpense.title}
        onChange={(e) => setNewExpense((prev) => ({ ...prev, title: e.target.value }))} data-id="784mkawuq" data-path="src/pages/ExpensesPage.tsx" />

      </div>

      <div className="grid grid-cols-2 gap-4" data-id="r5ys0hzed" data-path="src/pages/ExpensesPage.tsx">
        <div className="space-y-2" data-id="1cft79fpc" data-path="src/pages/ExpensesPage.tsx">
          <Label htmlFor="amount" data-id="hwszvguf8" data-path="src/pages/ExpensesPage.tsx">Amount (₹)</Label>
          <Input
          id="amount"
          type="number"
          placeholder="0"
          value={newExpense.amount}
          onChange={(e) => setNewExpense((prev) => ({ ...prev, amount: e.target.value }))} data-id="edq36osav" data-path="src/pages/ExpensesPage.tsx" />

        </div>

        <div className="space-y-2" data-id="a6sp0rn77" data-path="src/pages/ExpensesPage.tsx">
          <Label htmlFor="category" data-id="067bi5lj2" data-path="src/pages/ExpensesPage.tsx">Category</Label>
          <Select value={newExpense.category} onValueChange={(value) => setNewExpense((prev) => ({ ...prev, category: value }))} data-id="hom4ecj2u" data-path="src/pages/ExpensesPage.tsx">
            <SelectTrigger data-id="2hm4oedsu" data-path="src/pages/ExpensesPage.tsx">
              <SelectValue placeholder="Select category" data-id="q1zqggcjx" data-path="src/pages/ExpensesPage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="lrdg49r37" data-path="src/pages/ExpensesPage.tsx">
              {categories.map((category) =>
            <SelectItem key={category.name} value={category.name} data-id="o35ugnp28" data-path="src/pages/ExpensesPage.tsx">
                  <div className="flex items-center gap-2" data-id="0n613tt6m" data-path="src/pages/ExpensesPage.tsx">
                    {category.icon}
                    {category.name}
                  </div>
                </SelectItem>
            )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2" data-id="rclpia5vr" data-path="src/pages/ExpensesPage.tsx">
        <Label data-id="uffrgflxl" data-path="src/pages/ExpensesPage.tsx">Date</Label>
        <Popover data-id="3cokm68a2" data-path="src/pages/ExpensesPage.tsx">
          <PopoverTrigger asChild data-id="jdo7gnlez" data-path="src/pages/ExpensesPage.tsx">
            <Button variant="outline" className="w-full justify-start text-left font-normal" data-id="dx821tu40" data-path="src/pages/ExpensesPage.tsx">
              <CalendarIcon className="mr-2 h-4 w-4" data-id="1vx427er5" data-path="src/pages/ExpensesPage.tsx" />
              {format(newExpense.date, 'PPP')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" data-id="my50r2j7x" data-path="src/pages/ExpensesPage.tsx">
            <Calendar
            mode="single"
            selected={newExpense.date}
            onSelect={(date) => date && setNewExpense((prev) => ({ ...prev, date }))}
            initialFocus data-id="llv82okzz" data-path="src/pages/ExpensesPage.tsx" />

          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2" data-id="c2sjfp32l" data-path="src/pages/ExpensesPage.tsx">
        <Label htmlFor="notes" data-id="1r5cuu56t" data-path="src/pages/ExpensesPage.tsx">Notes (Optional)</Label>
        <Textarea
        id="notes"
        placeholder="Add any additional details..."
        value={newExpense.notes}
        onChange={(e) => setNewExpense((prev) => ({ ...prev, notes: e.target.value }))} data-id="wf67mzkq4" data-path="src/pages/ExpensesPage.tsx" />

      </div>

      <div className="flex space-x-2 pt-4" data-id="1xgdaysjl" data-path="src/pages/ExpensesPage.tsx">
        <Button onClick={handleAddExpense} className="flex-1" data-id="rmmux8duw" data-path="src/pages/ExpensesPage.tsx">
          Add Expense
        </Button>
        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} data-id="djrwxe8z0" data-path="src/pages/ExpensesPage.tsx">
          Cancel
        </Button>
      </div>
    </div>;


  if (loading) {
    return (
      <DashboardLayout data-id="9vz1ww90l" data-path="src/pages/ExpensesPage.tsx">
        <div className="p-6 space-y-6" data-id="nyn9gpj9c" data-path="src/pages/ExpensesPage.tsx">
          <div className="flex items-center justify-center h-64" data-id="cuqt5eukl" data-path="src/pages/ExpensesPage.tsx">
            <div className="text-lg" data-id="jjuibulxd" data-path="src/pages/ExpensesPage.tsx">Loading expenses...</div>
          </div>
        </div>
      </DashboardLayout>);

  }

  return (
    <DashboardLayout data-id="q8exymm99" data-path="src/pages/ExpensesPage.tsx">
      <div className="p-6 space-y-6" data-id="4semmjz0n" data-path="src/pages/ExpensesPage.tsx">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" data-id="rgynnzy9r" data-path="src/pages/ExpensesPage.tsx">
          <div data-id="o17zdmd69" data-path="src/pages/ExpensesPage.tsx">
            <h1 className="text-3xl font-bold text-gray-900" data-id="7uzeio3wz" data-path="src/pages/ExpensesPage.tsx">Expenses</h1>
            <p className="text-gray-600" data-id="nljj8vg5n" data-path="src/pages/ExpensesPage.tsx">Track and manage your spending</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} data-id="en8ev6o1w" data-path="src/pages/ExpensesPage.tsx">
            <DialogTrigger asChild data-id="tepqdlabf" data-path="src/pages/ExpensesPage.tsx">
              <Button className="bg-blue-600 hover:bg-blue-700" data-id="1y44fgvuo" data-path="src/pages/ExpensesPage.tsx">
                <Plus className="h-4 w-4 mr-2" data-id="nkzwp77vl" data-path="src/pages/ExpensesPage.tsx" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" data-id="9xlyihok5" data-path="src/pages/ExpensesPage.tsx">
              <DialogHeader data-id="k6otwqnbs" data-path="src/pages/ExpensesPage.tsx">
                <DialogTitle data-id="ml77rdr55" data-path="src/pages/ExpensesPage.tsx">Add New Expense</DialogTitle>
                <DialogDescription data-id="xwx7mp9nu" data-path="src/pages/ExpensesPage.tsx">
                  Record a new expense to track your spending.
                </DialogDescription>
              </DialogHeader>
              <AddExpenseForm data-id="7jky222dd" data-path="src/pages/ExpensesPage.tsx" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="47m6laq9f" data-path="src/pages/ExpensesPage.tsx">
          <Card data-id="6tz0kbo4n" data-path="src/pages/ExpensesPage.tsx">
            <CardContent className="p-6" data-id="rmqb0aolz" data-path="src/pages/ExpensesPage.tsx">
              <div className="flex items-center justify-between" data-id="49z51ylpa" data-path="src/pages/ExpensesPage.tsx">
                <div data-id="jjupaze57" data-path="src/pages/ExpensesPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="v7hmhrbk7" data-path="src/pages/ExpensesPage.tsx">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600" data-id="34mnppiwd" data-path="src/pages/ExpensesPage.tsx">₹{totalExpenses.toLocaleString()}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-600" data-id="37xpjrbbz" data-path="src/pages/ExpensesPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="m1owvtve1" data-path="src/pages/ExpensesPage.tsx">
            <CardContent className="p-6" data-id="ry8wx5cek" data-path="src/pages/ExpensesPage.tsx">
              <div className="flex items-center justify-between" data-id="m7mn72uzv" data-path="src/pages/ExpensesPage.tsx">
                <div data-id="gqpmu3bud" data-path="src/pages/ExpensesPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="s97yizpsb" data-path="src/pages/ExpensesPage.tsx">Total Transactions</p>
                  <p className="text-2xl font-bold text-gray-900" data-id="entqwnp20" data-path="src/pages/ExpensesPage.tsx">{filteredExpenses.length}</p>
                </div>
                <Receipt className="h-8 w-8 text-gray-600" data-id="uglf7ulut" data-path="src/pages/ExpensesPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="bo6wdtske" data-path="src/pages/ExpensesPage.tsx">
            <CardContent className="p-6" data-id="rwysujta6" data-path="src/pages/ExpensesPage.tsx">
              <div className="flex items-center justify-between" data-id="9et10eg9w" data-path="src/pages/ExpensesPage.tsx">
                <div data-id="ukk7e723x" data-path="src/pages/ExpensesPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="uprm6kquv" data-path="src/pages/ExpensesPage.tsx">Avg per Transaction</p>
                  <p className="text-2xl font-bold text-purple-600" data-id="gd9s1qq6x" data-path="src/pages/ExpensesPage.tsx">₹{Math.round(avgExpensePerDay).toLocaleString()}</p>
                </div>
                <Receipt className="h-8 w-8 text-purple-600" data-id="lf57g2mfl" data-path="src/pages/ExpensesPage.tsx" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card data-id="y4x0keoo5" data-path="src/pages/ExpensesPage.tsx">
          <CardContent className="p-6" data-id="e9ktbnx6o" data-path="src/pages/ExpensesPage.tsx">
            <div className="flex flex-col md:flex-row gap-4" data-id="52mrhz7a4" data-path="src/pages/ExpensesPage.tsx">
              <div className="flex-1" data-id="0vsxcdexf" data-path="src/pages/ExpensesPage.tsx">
                <div className="relative" data-id="sijpprbzc" data-path="src/pages/ExpensesPage.tsx">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" data-id="kj4u35enn" data-path="src/pages/ExpensesPage.tsx" />
                  <Input
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10" data-id="g8p7i975c" data-path="src/pages/ExpensesPage.tsx" />

                </div>
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory} data-id="kmrw0wu7n" data-path="src/pages/ExpensesPage.tsx">
                <SelectTrigger className="w-full md:w-48" data-id="5vxixx88f" data-path="src/pages/ExpensesPage.tsx">
                  <SelectValue placeholder="All Categories" data-id="8caffx06h" data-path="src/pages/ExpensesPage.tsx" />
                </SelectTrigger>
                <SelectContent data-id="pkl1rx37u" data-path="src/pages/ExpensesPage.tsx">
                  <SelectItem value="All" data-id="rzwvr40gq" data-path="src/pages/ExpensesPage.tsx">All Categories</SelectItem>
                  {categories.map((category) =>
                  <SelectItem key={category.name} value={category.name} data-id="5ivorxb31" data-path="src/pages/ExpensesPage.tsx">
                      <div className="flex items-center gap-2" data-id="csch8wyes" data-path="src/pages/ExpensesPage.tsx">
                        {category.icon}
                        {category.name}
                      </div>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              <Select value={selectedMonth} onValueChange={setSelectedMonth} data-id="3gepj3pah" data-path="src/pages/ExpensesPage.tsx">
                <SelectTrigger className="w-full md:w-48" data-id="wzzvnrt4k" data-path="src/pages/ExpensesPage.tsx">
                  <SelectValue placeholder="All Time" data-id="wguurn5r7" data-path="src/pages/ExpensesPage.tsx" />
                </SelectTrigger>
                <SelectContent data-id="ro4hmc3g1" data-path="src/pages/ExpensesPage.tsx">
                  <SelectItem value="All" data-id="i1uemfra5" data-path="src/pages/ExpensesPage.tsx">All Time</SelectItem>
                  <SelectItem value="This Month" data-id="ojmk06caa" data-path="src/pages/ExpensesPage.tsx">This Month</SelectItem>
                  <SelectItem value="Last Month" data-id="o20763iyu" data-path="src/pages/ExpensesPage.tsx">Last Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Category Overview */}
        <Card data-id="jso41bwxe" data-path="src/pages/ExpensesPage.tsx">
          <CardHeader data-id="e8nrme38b" data-path="src/pages/ExpensesPage.tsx">
            <CardTitle data-id="wfkxp5tgf" data-path="src/pages/ExpensesPage.tsx">Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent data-id="gjlmecqhg" data-path="src/pages/ExpensesPage.tsx">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-id="qaoqtz2ap" data-path="src/pages/ExpensesPage.tsx">
              {categories.map((category) => {
                const categoryExpenses = filteredExpenses.filter((expense) => expense.category === category.name);
                const categoryTotal = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
                const percentage = totalExpenses > 0 ? categoryTotal / totalExpenses * 100 : 0;

                return (
                  <div key={category.name} className="text-center p-4 rounded-lg bg-gray-50" data-id="thiagl1no" data-path="src/pages/ExpensesPage.tsx">
                    <div className="text-2xl mb-2" data-id="4fnz2v3br" data-path="src/pages/ExpensesPage.tsx">{category.icon}</div>
                    <div className="font-medium text-sm" data-id="4my60r0bk" data-path="src/pages/ExpensesPage.tsx">{category.name}</div>
                    <div className="text-lg font-bold text-gray-900" data-id="hz0blo40e" data-path="src/pages/ExpensesPage.tsx">₹{categoryTotal.toLocaleString()}</div>
                    <div className="text-xs text-gray-500" data-id="1ci8rrqqm" data-path="src/pages/ExpensesPage.tsx">{percentage.toFixed(1)}%</div>
                  </div>);

              })}
            </div>
          </CardContent>
        </Card>

        {/* Expenses List */}
        <Card data-id="qlkp2n4ya" data-path="src/pages/ExpensesPage.tsx">
          <CardHeader data-id="0y2ec2gh4" data-path="src/pages/ExpensesPage.tsx">
            <CardTitle data-id="0bmt5eu1s" data-path="src/pages/ExpensesPage.tsx">Recent Expenses</CardTitle>
            <CardDescription data-id="3zife7hyk" data-path="src/pages/ExpensesPage.tsx">
              {filteredExpenses.length} {filteredExpenses.length === 1 ? 'expense' : 'expenses'} found
            </CardDescription>
          </CardHeader>
          <CardContent data-id="cvmxd5mph" data-path="src/pages/ExpensesPage.tsx">
            {filteredExpenses.length === 0 ?
            <div className="text-center py-12" data-id="os89la1je" data-path="src/pages/ExpensesPage.tsx">
                <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" data-id="vrgw1s6yy" data-path="src/pages/ExpensesPage.tsx" />
                <h3 className="text-lg font-medium text-gray-900 mb-2" data-id="v52uf81jt" data-path="src/pages/ExpensesPage.tsx">No expenses found</h3>
                <p className="text-gray-600 mb-4" data-id="m5wguaxlg" data-path="src/pages/ExpensesPage.tsx">
                  {searchTerm || selectedCategory !== 'All' ?
                'Try adjusting your filters or search terms.' :
                'Start tracking your expenses by adding your first expense.'
                }
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)} data-id="qvpyy1mb7" data-path="src/pages/ExpensesPage.tsx">
                  <Plus className="h-4 w-4 mr-2" data-id="woy4c3z9r" data-path="src/pages/ExpensesPage.tsx" />
                  Add First Expense
                </Button>
              </div> :

            <div className="space-y-4" data-id="rg266wl8f" data-path="src/pages/ExpensesPage.tsx">
                {filteredExpenses.map((expense) =>
              <ExpenseCard key={expense.ID} expense={expense} data-id="0yiwi2eh2" data-path="src/pages/ExpensesPage.tsx" />
              )}
              </div>
            }
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>);

};

export default ExpensesPage;