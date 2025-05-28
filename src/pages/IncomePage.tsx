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
import {
  Plus,
  Search,
  Calendar as CalendarIcon,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
  Briefcase,
  GraduationCap,
  Gift,
  CreditCard,
  PiggyBank,
  Wallet } from
'lucide-react';
import { format } from 'date-fns';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';

const INCOME_TABLE_ID = 10240;

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

interface Income {
  ID: number;
  title: string;
  amount: number;
  source: string;
  income_date: string;
  notes: string;
  is_recurring: boolean;
  user_id: number;
}

const IncomePage = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const [filteredIncomes, setFilteredIncomes] = useState(incomes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);

  const incomeSources = [
  { name: 'Part-time Work', icon: <Briefcase className="h-4 w-4" data-id="i59k5fa9g" data-path="src/pages/IncomePage.tsx" />, color: 'bg-blue-100 text-blue-800' },
  { name: 'Scholarship', icon: <GraduationCap className="h-4 w-4" data-id="l0i07n946" data-path="src/pages/IncomePage.tsx" />, color: 'bg-green-100 text-green-800' },
  { name: 'Freelancing', icon: <DollarSign className="h-4 w-4" data-id="4pkzq4u5p" data-path="src/pages/IncomePage.tsx" />, color: 'bg-purple-100 text-purple-800' },
  { name: 'Family', icon: <Gift className="h-4 w-4" data-id="yvpvs29hz" data-path="src/pages/IncomePage.tsx" />, color: 'bg-pink-100 text-pink-800' },
  { name: 'Internship', icon: <CreditCard className="h-4 w-4" data-id="3vznalfdn" data-path="src/pages/IncomePage.tsx" />, color: 'bg-orange-100 text-orange-800' },
  { name: 'Investment', icon: <TrendingUp className="h-4 w-4" data-id="sszk1oj5x" data-path="src/pages/IncomePage.tsx" />, color: 'bg-emerald-100 text-emerald-800' },
  { name: 'Gift', icon: <Gift className="h-4 w-4" data-id="7xn6iqqum" data-path="src/pages/IncomePage.tsx" />, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Others', icon: <Wallet className="h-4 w-4" data-id="0bxnmzgd8" data-path="src/pages/IncomePage.tsx" />, color: 'bg-gray-100 text-gray-800' }];


  const [newIncome, setNewIncome] = useState({
    title: '',
    amount: '',
    source: '',
    date: new Date(),
    notes: '',
    recurring: false
  });

  // Load user and incomes on component mount
  useEffect(() => {
    loadUserAndIncomes();
  }, []);

  const loadUserAndIncomes = async () => {
    try {
      const { data: userData, error: userError } = await window.ezsite.apis.getUserInfo();
      if (userError) throw userError;
      setUser(userData);

      if (userData?.ID) {
        await loadIncomes(userData.ID);
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

  const loadIncomes = async (userId: number) => {
    try {
      const { data, error } = await window.ezsite.apis.tablePage(INCOME_TABLE_ID, {
        PageNo: 1,
        PageSize: 1000,
        OrderByField: "income_date",
        IsAsc: false,
        Filters: [
        {
          name: "user_id",
          op: "Equal",
          value: userId
        }]

      });

      if (error) throw error;
      setIncomes(data?.List || []);
    } catch (error) {
      console.error('Error loading incomes:', error);
      toast({
        title: "Error",
        description: "Failed to load incomes. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Filter incomes based on search term, source, and month
  useEffect(() => {
    let filtered = incomes;

    if (searchTerm) {
      filtered = filtered.filter((income) =>
      income.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      income.notes.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSource && selectedSource !== 'All') {
      filtered = filtered.filter((income) => income.source === selectedSource);
    }

    if (selectedMonth && selectedMonth !== 'All') {
      filtered = filtered.filter((income) => {
        const incomeMonth = new Date(income.income_date).getMonth();
        const currentMonth = new Date().getMonth();

        if (selectedMonth === 'This Month') {
          return incomeMonth === currentMonth;
        }
        if (selectedMonth === 'Last Month') {
          return incomeMonth === currentMonth - 1;
        }
        return true;
      });
    }

    setFilteredIncomes(filtered);
  }, [searchTerm, selectedSource, selectedMonth, incomes]);

  const handleAddIncome = async () => {
    if (!newIncome.title || !newIncome.amount || !newIncome.source) {
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
      const incomeData = {
        user_id: user.ID,
        title: newIncome.title,
        amount: parseFloat(newIncome.amount),
        source: newIncome.source,
        income_date: format(newIncome.date, 'yyyy-MM-dd'),
        notes: newIncome.notes,
        is_recurring: newIncome.recurring
      };

      const { error } = await window.ezsite.apis.tableCreate(INCOME_TABLE_ID, incomeData);
      if (error) throw error;

      await loadIncomes(user.ID);
      setNewIncome({
        title: '',
        amount: '',
        source: '',
        date: new Date(),
        notes: '',
        recurring: false
      });
      setIsAddDialogOpen(false);

      toast({
        title: "Income Added",
        description: `₹${incomeData.amount} income from ${incomeData.title} has been recorded.`
      });
    } catch (error) {
      console.error('Error adding income:', error);
      toast({
        title: "Error",
        description: "Failed to add income. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteIncome = async (id: number) => {
    try {
      const { error } = await window.ezsite.apis.tableDelete(INCOME_TABLE_ID, { ID: id });
      if (error) throw error;

      if (user?.ID) {
        await loadIncomes(user.ID);
      }

      toast({
        title: "Income Deleted",
        description: "The income record has been removed."
      });
    } catch (error) {
      console.error('Error deleting income:', error);
      toast({
        title: "Error",
        description: "Failed to delete income. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getSourceStyle = (sourceName: string) => {
    const source = incomeSources.find((src) => src.name === sourceName);
    return source ? source.color : 'bg-gray-100 text-gray-800';
  };

  const getSourceIcon = (sourceName: string) => {
    const source = incomeSources.find((src) => src.name === sourceName);
    return source ? source.icon : <Wallet className="h-4 w-4" data-id="off2sfm0p" data-path="src/pages/IncomePage.tsx" />;
  };

  const totalIncome = filteredIncomes.reduce((sum, income) => sum + income.amount, 0);
  const recurringIncome = filteredIncomes.filter((income) => income.is_recurring).reduce((sum, income) => sum + income.amount, 0);
  const oneTimeIncome = filteredIncomes.filter((income) => !income.is_recurring).reduce((sum, income) => sum + income.amount, 0);

  const IncomeCard = ({ income }: {income: Income;}) => {
    const getIcon = (source: string) => {
      switch (source) {
        case 'Part-time Work':return '💼';
        case 'Scholarship':return '🎓';
        case 'Freelancing':return '💻';
        case 'Family':return '💰';
        case 'Gift':return '🎁';
        case 'Internship':return '📋';
        default:return '💰';
      }
    };

    return (
      <Card className="hover:shadow-md transition-all duration-200" data-id="fnp94n7q1" data-path="src/pages/IncomePage.tsx">
        <CardContent className="p-4" data-id="2auy2zetl" data-path="src/pages/IncomePage.tsx">
          <div className="flex items-center justify-between" data-id="8fl6tg19h" data-path="src/pages/IncomePage.tsx">
            <div className="flex items-center space-x-3" data-id="awm8dok0h" data-path="src/pages/IncomePage.tsx">
              <div className="text-2xl" data-id="qkzjewy4p" data-path="src/pages/IncomePage.tsx">{getIcon(income.source)}</div>
              <div data-id="qb8dget92" data-path="src/pages/IncomePage.tsx">
                <div className="flex items-center gap-2" data-id="e891ne353" data-path="src/pages/IncomePage.tsx">
                  <h3 className="font-semibold text-gray-900" data-id="2m74uoakh" data-path="src/pages/IncomePage.tsx">{income.title}</h3>
                  {income.is_recurring &&
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200" data-id="etlq7gzga" data-path="src/pages/IncomePage.tsx">
                      Recurring
                    </Badge>
                  }
                </div>
                <div className="flex items-center gap-2 mt-1" data-id="2fbkiujki" data-path="src/pages/IncomePage.tsx">
                  <Badge variant="secondary" className={getSourceStyle(income.source)} data-id="iwgx9ece7" data-path="src/pages/IncomePage.tsx">
                    {getSourceIcon(income.source)}
                    <span className="ml-1" data-id="dypstqg60" data-path="src/pages/IncomePage.tsx">{income.source}</span>
                  </Badge>
                  <span className="text-sm text-gray-500" data-id="g4sf9wgll" data-path="src/pages/IncomePage.tsx">{income.income_date}</span>
                </div>
                {income.notes &&
                <p className="text-sm text-gray-600 mt-1" data-id="qdzkyhnz7" data-path="src/pages/IncomePage.tsx">{income.notes}</p>
                }
              </div>
            </div>
            <div className="flex items-center space-x-2" data-id="4pxbythph" data-path="src/pages/IncomePage.tsx">
              <span className="text-lg font-bold text-green-600" data-id="1zw9lwmn7" data-path="src/pages/IncomePage.tsx">
                +₹{income.amount.toLocaleString()}
              </span>
              <div className="flex space-x-1" data-id="c72zwxyc8" data-path="src/pages/IncomePage.tsx">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingIncome(income)} data-id="2sbaw2927" data-path="src/pages/IncomePage.tsx">
                  <Edit className="h-4 w-4" data-id="crco2m3du" data-path="src/pages/IncomePage.tsx" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteIncome(income.ID)}
                  className="text-red-600 hover:text-red-700" data-id="x8k96fjiz" data-path="src/pages/IncomePage.tsx">
                  <Trash2 className="h-4 w-4" data-id="ahsn8cexn" data-path="src/pages/IncomePage.tsx" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>);

  };


  const AddIncomeForm = () =>
  <div className="space-y-4" data-id="wjyqy22vi" data-path="src/pages/IncomePage.tsx">
      <div className="space-y-2" data-id="nq9qprp6c" data-path="src/pages/IncomePage.tsx">
        <Label htmlFor="title" data-id="8b7vgu9rf" data-path="src/pages/IncomePage.tsx">Income Title</Label>
        <Input
        id="title"
        placeholder="e.g., Part-time Job"
        value={newIncome.title}
        onChange={(e) => setNewIncome((prev) => ({ ...prev, title: e.target.value }))} data-id="70ahb373v" data-path="src/pages/IncomePage.tsx" />

      </div>

      <div className="grid grid-cols-2 gap-4" data-id="09vjufo9a" data-path="src/pages/IncomePage.tsx">
        <div className="space-y-2" data-id="2m9x15uep" data-path="src/pages/IncomePage.tsx">
          <Label htmlFor="amount" data-id="8ay5evjvb" data-path="src/pages/IncomePage.tsx">Amount (₹)</Label>
          <Input
          id="amount"
          type="number"
          placeholder="0"
          value={newIncome.amount}
          onChange={(e) => setNewIncome((prev) => ({ ...prev, amount: e.target.value }))} data-id="34k36fy6r" data-path="src/pages/IncomePage.tsx" />

        </div>

        <div className="space-y-2" data-id="xupi6z9sl" data-path="src/pages/IncomePage.tsx">
          <Label htmlFor="source" data-id="3yx4pfoef" data-path="src/pages/IncomePage.tsx">Income Source</Label>
          <Select value={newIncome.source} onValueChange={(value) => setNewIncome((prev) => ({ ...prev, source: value }))} data-id="7idued5k9" data-path="src/pages/IncomePage.tsx">
            <SelectTrigger data-id="3i689pe3v" data-path="src/pages/IncomePage.tsx">
              <SelectValue placeholder="Select source" data-id="a1ssxqerc" data-path="src/pages/IncomePage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="mbjdazm9g" data-path="src/pages/IncomePage.tsx">
              {incomeSources.map((source) =>
            <SelectItem key={source.name} value={source.name} data-id="v7ud5nqmv" data-path="src/pages/IncomePage.tsx">
                  <div className="flex items-center gap-2" data-id="o1otzgcfu" data-path="src/pages/IncomePage.tsx">
                    {source.icon}
                    {source.name}
                  </div>
                </SelectItem>
            )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2" data-id="e6kxcfk44" data-path="src/pages/IncomePage.tsx">
        <Label data-id="3c8fbgv7l" data-path="src/pages/IncomePage.tsx">Date</Label>
        <Popover data-id="7f3gh7asf" data-path="src/pages/IncomePage.tsx">
          <PopoverTrigger asChild data-id="o7ei9ld5k" data-path="src/pages/IncomePage.tsx">
            <Button variant="outline" className="w-full justify-start text-left font-normal" data-id="vdpq6wwlw" data-path="src/pages/IncomePage.tsx">
              <CalendarIcon className="mr-2 h-4 w-4" data-id="h5scueyt6" data-path="src/pages/IncomePage.tsx" />
              {format(newIncome.date, 'PPP')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" data-id="5j7par13s" data-path="src/pages/IncomePage.tsx">
            <Calendar
            mode="single"
            selected={newIncome.date}
            onSelect={(date) => date && setNewIncome((prev) => ({ ...prev, date }))}
            initialFocus data-id="qp6vz512z" data-path="src/pages/IncomePage.tsx" />

          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center space-x-2" data-id="8stj176gv" data-path="src/pages/IncomePage.tsx">
        <input
        type="checkbox"
        id="recurring"
        checked={newIncome.recurring}
        onChange={(e) => setNewIncome((prev) => ({ ...prev, recurring: e.target.checked }))}
        className="rounded border-gray-300" data-id="vto4c141q" data-path="src/pages/IncomePage.tsx" />

        <Label htmlFor="recurring" className="text-sm" data-id="9e54zv9bd" data-path="src/pages/IncomePage.tsx">This is a recurring income</Label>
      </div>

      <div className="space-y-2" data-id="rf2ahupeh" data-path="src/pages/IncomePage.tsx">
        <Label htmlFor="notes" data-id="92x60qrsz" data-path="src/pages/IncomePage.tsx">Notes (Optional)</Label>
        <Textarea
        id="notes"
        placeholder="Add any additional details..."
        value={newIncome.notes}
        onChange={(e) => setNewIncome((prev) => ({ ...prev, notes: e.target.value }))} data-id="mre2r6h2q" data-path="src/pages/IncomePage.tsx" />

      </div>

      <div className="flex space-x-2 pt-4" data-id="0hug9gvt4" data-path="src/pages/IncomePage.tsx">
        <Button onClick={handleAddIncome} className="flex-1" data-id="y2yyczl5p" data-path="src/pages/IncomePage.tsx">
          Add Income
        </Button>
        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} data-id="gjdg6eg1i" data-path="src/pages/IncomePage.tsx">
          Cancel
        </Button>
      </div>
    </div>;


  if (loading) {
    return (
      <DashboardLayout data-id="isw6mxowk" data-path="src/pages/IncomePage.tsx">
        <div className="p-6 space-y-6" data-id="i9kla3kh4" data-path="src/pages/IncomePage.tsx">
          <div className="flex items-center justify-center h-64" data-id="s6n3380ph" data-path="src/pages/IncomePage.tsx">
            <div className="text-lg" data-id="3mpjq3ccv" data-path="src/pages/IncomePage.tsx">Loading income records...</div>
          </div>
        </div>
      </DashboardLayout>);

  }

  return (
    <DashboardLayout data-id="erh4f1fag" data-path="src/pages/IncomePage.tsx">
      <div className="p-6 space-y-6" data-id="se7m8ox63" data-path="src/pages/IncomePage.tsx">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" data-id="k91i27d2n" data-path="src/pages/IncomePage.tsx">
          <div data-id="hperjr19e" data-path="src/pages/IncomePage.tsx">
            <h1 className="text-3xl font-bold text-gray-900" data-id="sdq23zxqa" data-path="src/pages/IncomePage.tsx">Income</h1>
            <p className="text-gray-600" data-id="ml1jnwnvd" data-path="src/pages/IncomePage.tsx">Track and manage your income sources</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} data-id="y2klfpiy4" data-path="src/pages/IncomePage.tsx">
            <DialogTrigger asChild data-id="8s7a34ax0" data-path="src/pages/IncomePage.tsx">
              <Button className="bg-green-600 hover:bg-green-700" data-id="olkd4tapb" data-path="src/pages/IncomePage.tsx">
                <Plus className="h-4 w-4 mr-2" data-id="74bytce4u" data-path="src/pages/IncomePage.tsx" />
                Add Income
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" data-id="0llti1c3l" data-path="src/pages/IncomePage.tsx">
              <DialogHeader data-id="ki2tef367" data-path="src/pages/IncomePage.tsx">
                <DialogTitle data-id="45s78ymcl" data-path="src/pages/IncomePage.tsx">Add New Income</DialogTitle>
                <DialogDescription data-id="2p2wtw9jl" data-path="src/pages/IncomePage.tsx">
                  Record a new income source to track your earnings.
                </DialogDescription>
              </DialogHeader>
              <AddIncomeForm data-id="ypmglrw7t" data-path="src/pages/IncomePage.tsx" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="g7pgc78lb" data-path="src/pages/IncomePage.tsx">
          <Card data-id="o42kpz070" data-path="src/pages/IncomePage.tsx">
            <CardContent className="p-6" data-id="5txyva7su" data-path="src/pages/IncomePage.tsx">
              <div className="flex items-center justify-between" data-id="gkkqtqlfs" data-path="src/pages/IncomePage.tsx">
                <div data-id="s8g93b3ug" data-path="src/pages/IncomePage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="4yo5ai7c3" data-path="src/pages/IncomePage.tsx">Total Income</p>
                  <p className="text-2xl font-bold text-green-600" data-id="dbcwflkrz" data-path="src/pages/IncomePage.tsx">₹{totalIncome.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" data-id="2amno0x0g" data-path="src/pages/IncomePage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="jkyleyyo2" data-path="src/pages/IncomePage.tsx">
            <CardContent className="p-6" data-id="c4mw7bpcs" data-path="src/pages/IncomePage.tsx">
              <div className="flex items-center justify-between" data-id="r2u15zhh9" data-path="src/pages/IncomePage.tsx">
                <div data-id="4hp7gvu7f" data-path="src/pages/IncomePage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="ecvb2fziq" data-path="src/pages/IncomePage.tsx">Recurring Income</p>
                  <p className="text-2xl font-bold text-blue-600" data-id="pa7o1ik5a" data-path="src/pages/IncomePage.tsx">₹{recurringIncome.toLocaleString()}</p>
                </div>
                <PiggyBank className="h-8 w-8 text-blue-600" data-id="4oytkpqrq" data-path="src/pages/IncomePage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="e0ki4qyo8" data-path="src/pages/IncomePage.tsx">
            <CardContent className="p-6" data-id="w7sgmogcj" data-path="src/pages/IncomePage.tsx">
              <div className="flex items-center justify-between" data-id="e26r35wml" data-path="src/pages/IncomePage.tsx">
                <div data-id="vrrocybxr" data-path="src/pages/IncomePage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="b6iqxpx5s" data-path="src/pages/IncomePage.tsx">One-time Income</p>
                  <p className="text-2xl font-bold text-purple-600" data-id="vshvswwv1" data-path="src/pages/IncomePage.tsx">₹{oneTimeIncome.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" data-id="c5ln91a20" data-path="src/pages/IncomePage.tsx" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card data-id="6av74x4im" data-path="src/pages/IncomePage.tsx">
          <CardContent className="p-6" data-id="ia7fww621" data-path="src/pages/IncomePage.tsx">
            <div className="flex flex-col md:flex-row gap-4" data-id="6qu9gugjx" data-path="src/pages/IncomePage.tsx">
              <div className="flex-1" data-id="wu1qabnpt" data-path="src/pages/IncomePage.tsx">
                <div className="relative" data-id="7p7edxhfk" data-path="src/pages/IncomePage.tsx">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" data-id="77o75lbkh" data-path="src/pages/IncomePage.tsx" />
                  <Input
                    placeholder="Search income..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10" data-id="e57hedq38" data-path="src/pages/IncomePage.tsx" />

                </div>
              </div>

              <Select value={selectedSource} onValueChange={setSelectedSource} data-id="2hj4xby3z" data-path="src/pages/IncomePage.tsx">
                <SelectTrigger className="w-full md:w-48" data-id="0r14llz2w" data-path="src/pages/IncomePage.tsx">
                  <SelectValue placeholder="All Sources" data-id="o6zjah8gi" data-path="src/pages/IncomePage.tsx" />
                </SelectTrigger>
                <SelectContent data-id="sqg5k8drm" data-path="src/pages/IncomePage.tsx">
                  <SelectItem value="All" data-id="htroprwy0" data-path="src/pages/IncomePage.tsx">All Sources</SelectItem>
                  {incomeSources.map((source) =>
                  <SelectItem key={source.name} value={source.name} data-id="w5e121e49" data-path="src/pages/IncomePage.tsx">
                      <div className="flex items-center gap-2" data-id="zum7lys4n" data-path="src/pages/IncomePage.tsx">
                        {source.icon}
                        {source.name}
                      </div>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              <Select value={selectedMonth} onValueChange={setSelectedMonth} data-id="fi30223n6" data-path="src/pages/IncomePage.tsx">
                <SelectTrigger className="w-full md:w-48" data-id="2lp4v2lvh" data-path="src/pages/IncomePage.tsx">
                  <SelectValue placeholder="All Time" data-id="ukbaaenvg" data-path="src/pages/IncomePage.tsx" />
                </SelectTrigger>
                <SelectContent data-id="wrh6pb57r" data-path="src/pages/IncomePage.tsx">
                  <SelectItem value="All" data-id="pkdg8mppb" data-path="src/pages/IncomePage.tsx">All Time</SelectItem>
                  <SelectItem value="This Month" data-id="zr0qeghmc" data-path="src/pages/IncomePage.tsx">This Month</SelectItem>
                  <SelectItem value="Last Month" data-id="g3qd9850c" data-path="src/pages/IncomePage.tsx">Last Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Income Sources Overview */}
        <Card data-id="mhlwfxo1c" data-path="src/pages/IncomePage.tsx">
          <CardHeader data-id="gpxvlg762" data-path="src/pages/IncomePage.tsx">
            <CardTitle data-id="0ljjviqj5" data-path="src/pages/IncomePage.tsx">Income by Source</CardTitle>
          </CardHeader>
          <CardContent data-id="nuv5srwmh" data-path="src/pages/IncomePage.tsx">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-id="47tk9bkdn" data-path="src/pages/IncomePage.tsx">
              {incomeSources.map((source) => {
                const sourceIncomes = filteredIncomes.filter((income) => income.source === source.name);
                const sourceTotal = sourceIncomes.reduce((sum, income) => sum + income.amount, 0);
                const percentage = totalIncome > 0 ? sourceTotal / totalIncome * 100 : 0;

                return (
                  <div key={source.name} className="text-center p-4 rounded-lg bg-gray-50" data-id="uq5zefwb9" data-path="src/pages/IncomePage.tsx">
                    <div className="text-2xl mb-2" data-id="kvikrz9nn" data-path="src/pages/IncomePage.tsx">{source.icon}</div>
                    <div className="font-medium text-sm" data-id="ewuvlf8oi" data-path="src/pages/IncomePage.tsx">{source.name}</div>
                    <div className="text-lg font-bold text-gray-900" data-id="6qveb9zb0" data-path="src/pages/IncomePage.tsx">₹{sourceTotal.toLocaleString()}</div>
                    <div className="text-xs text-gray-500" data-id="addi6km7t" data-path="src/pages/IncomePage.tsx">{percentage.toFixed(1)}%</div>
                  </div>);

              })}
            </div>
          </CardContent>
        </Card>

        {/* Income List */}
        <Card data-id="v8vwme443" data-path="src/pages/IncomePage.tsx">
          <CardHeader data-id="7my07y1de" data-path="src/pages/IncomePage.tsx">
            <CardTitle data-id="9dtuciimr" data-path="src/pages/IncomePage.tsx">Recent Income</CardTitle>
            <CardDescription data-id="azoyfwvmf" data-path="src/pages/IncomePage.tsx">
              {filteredIncomes.length} {filteredIncomes.length === 1 ? 'income record' : 'income records'} found
            </CardDescription>
          </CardHeader>
          <CardContent data-id="ax0mxp4nz" data-path="src/pages/IncomePage.tsx">
            {filteredIncomes.length === 0 ?
            <div className="text-center py-12" data-id="0dg4ghmht" data-path="src/pages/IncomePage.tsx">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" data-id="kj7v3xnct" data-path="src/pages/IncomePage.tsx" />
                <h3 className="text-lg font-medium text-gray-900 mb-2" data-id="gg6pzsx1j" data-path="src/pages/IncomePage.tsx">No income records found</h3>
                <p className="text-gray-600 mb-4" data-id="64a0jphge" data-path="src/pages/IncomePage.tsx">
                  {searchTerm || selectedSource !== 'All' ?
                'Try adjusting your filters or search terms.' :
                'Start tracking your income by adding your first income source.'
                }
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)} data-id="b2p073eca" data-path="src/pages/IncomePage.tsx">
                  <Plus className="h-4 w-4 mr-2" data-id="9c6hu28nz" data-path="src/pages/IncomePage.tsx" />
                  Add First Income
                </Button>
              </div> :

            <div className="space-y-4" data-id="j1qzhlmdz" data-path="src/pages/IncomePage.tsx">
                {filteredIncomes.map((income) =>
              <IncomeCard key={income.ID} income={income} data-id="ih8t28f6z" data-path="src/pages/IncomePage.tsx" />
              )}
              </div>
            }
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>);

};

export default IncomePage;