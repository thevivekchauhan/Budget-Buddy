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

const IncomePage = () => {
  const [incomes, setIncomes] = useState([
  {
    id: 1,
    title: 'Part-time Job',
    amount: 5000,
    source: 'Part-time Work',
    date: '2024-01-15',
    notes: 'Weekend tutoring job',
    recurring: true,
    icon: '💼'
  },
  {
    id: 2,
    title: 'Monthly Stipend',
    amount: 8000,
    source: 'Scholarship',
    date: '2024-01-01',
    notes: 'Merit scholarship from college',
    recurring: true,
    icon: '🎓'
  },
  {
    id: 3,
    title: 'Freelance Project',
    amount: 3500,
    source: 'Freelancing',
    date: '2024-01-10',
    notes: 'Website design project',
    recurring: false,
    icon: '💻'
  },
  {
    id: 4,
    title: 'Pocket Money',
    amount: 2000,
    source: 'Family',
    date: '2024-01-05',
    notes: 'Monthly allowance from parents',
    recurring: true,
    icon: '💰'
  },
  {
    id: 5,
    title: 'Birthday Gift',
    amount: 1500,
    source: 'Gift',
    date: '2024-01-08',
    notes: 'Birthday money from relatives',
    recurring: false,
    icon: '🎁'
  },
  {
    id: 6,
    title: 'Internship Stipend',
    amount: 12000,
    source: 'Internship',
    date: '2024-01-12',
    notes: 'Monthly internship allowance',
    recurring: true,
    icon: '📋'
  }]
  );

  const [filteredIncomes, setFilteredIncomes] = useState(incomes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);

  const incomeSources = [
  { name: 'Part-time Work', icon: <Briefcase className="h-4 w-4" data-id="za7l2w8q5" data-path="src/pages/IncomePage.tsx" />, color: 'bg-blue-100 text-blue-800' },
  { name: 'Scholarship', icon: <GraduationCap className="h-4 w-4" data-id="13pgvgkx8" data-path="src/pages/IncomePage.tsx" />, color: 'bg-green-100 text-green-800' },
  { name: 'Freelancing', icon: <DollarSign className="h-4 w-4" data-id="ytn7wa5o2" data-path="src/pages/IncomePage.tsx" />, color: 'bg-purple-100 text-purple-800' },
  { name: 'Family', icon: <Gift className="h-4 w-4" data-id="fb26f8gqu" data-path="src/pages/IncomePage.tsx" />, color: 'bg-pink-100 text-pink-800' },
  { name: 'Internship', icon: <CreditCard className="h-4 w-4" data-id="68fj78gyx" data-path="src/pages/IncomePage.tsx" />, color: 'bg-orange-100 text-orange-800' },
  { name: 'Investment', icon: <TrendingUp className="h-4 w-4" data-id="85y6dbeta" data-path="src/pages/IncomePage.tsx" />, color: 'bg-emerald-100 text-emerald-800' },
  { name: 'Gift', icon: <Gift className="h-4 w-4" data-id="axzlryca8" data-path="src/pages/IncomePage.tsx" />, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Others', icon: <Wallet className="h-4 w-4" data-id="wupzqpqpz" data-path="src/pages/IncomePage.tsx" />, color: 'bg-gray-100 text-gray-800' }];


  const [newIncome, setNewIncome] = useState({
    title: '',
    amount: '',
    source: '',
    date: new Date(),
    notes: '',
    recurring: false
  });

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
        const incomeMonth = new Date(income.date).getMonth();
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

  const handleAddIncome = () => {
    if (!newIncome.title || !newIncome.amount || !newIncome.source) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const income = {
      id: Date.now(),
      ...newIncome,
      amount: parseFloat(newIncome.amount),
      date: format(newIncome.date, 'yyyy-MM-dd'),
      icon: incomeSources.find((src) => src.name === newIncome.source)?.name === 'Scholarship' ? '🎓' : '💰'
    };

    setIncomes((prev) => [income, ...prev]);
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
      description: `₹${income.amount} income from ${income.title} has been recorded.`
    });
  };

  const handleDeleteIncome = (id: number) => {
    setIncomes((prev) => prev.filter((income) => income.id !== id));
    toast({
      title: "Income Deleted",
      description: "The income record has been removed."
    });
  };

  const getSourceStyle = (sourceName: string) => {
    const source = incomeSources.find((src) => src.name === sourceName);
    return source ? source.color : 'bg-gray-100 text-gray-800';
  };

  const getSourceIcon = (sourceName: string) => {
    const source = incomeSources.find((src) => src.name === sourceName);
    return source ? source.icon : <Wallet className="h-4 w-4" data-id="k0afi11s2" data-path="src/pages/IncomePage.tsx" />;
  };

  const totalIncome = filteredIncomes.reduce((sum, income) => sum + income.amount, 0);
  const recurringIncome = filteredIncomes.filter((income) => income.recurring).reduce((sum, income) => sum + income.amount, 0);
  const oneTimeIncome = filteredIncomes.filter((income) => !income.recurring).reduce((sum, income) => sum + income.amount, 0);

  const IncomeCard = ({ income }: {income: typeof incomes[0];}) =>
  <Card className="hover:shadow-md transition-all duration-200" data-id="u7uuaf6qc" data-path="src/pages/IncomePage.tsx">
      <CardContent className="p-4" data-id="t0iwxhs9d" data-path="src/pages/IncomePage.tsx">
        <div className="flex items-center justify-between" data-id="3hk5xo0gc" data-path="src/pages/IncomePage.tsx">
          <div className="flex items-center space-x-3" data-id="a9cft1dcr" data-path="src/pages/IncomePage.tsx">
            <div className="text-2xl" data-id="95zrdgp2d" data-path="src/pages/IncomePage.tsx">{income.icon}</div>
            <div data-id="ja7in8lo5" data-path="src/pages/IncomePage.tsx">
              <div className="flex items-center gap-2" data-id="jyehypqz1" data-path="src/pages/IncomePage.tsx">
                <h3 className="font-semibold text-gray-900" data-id="48mjbh6vv" data-path="src/pages/IncomePage.tsx">{income.title}</h3>
                {income.recurring &&
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200" data-id="asyujfokl" data-path="src/pages/IncomePage.tsx">
                    Recurring
                  </Badge>
              }
              </div>
              <div className="flex items-center gap-2 mt-1" data-id="13f4os2tf" data-path="src/pages/IncomePage.tsx">
                <Badge variant="secondary" className={getSourceStyle(income.source)} data-id="b4qtzfgr5" data-path="src/pages/IncomePage.tsx">
                  {getSourceIcon(income.source)}
                  <span className="ml-1" data-id="s4bi1q3sb" data-path="src/pages/IncomePage.tsx">{income.source}</span>
                </Badge>
                <span className="text-sm text-gray-500" data-id="enscuvnak" data-path="src/pages/IncomePage.tsx">{income.date}</span>
              </div>
              {income.notes &&
            <p className="text-sm text-gray-600 mt-1" data-id="k33seqsnc" data-path="src/pages/IncomePage.tsx">{income.notes}</p>
            }
            </div>
          </div>
          <div className="flex items-center space-x-2" data-id="m1l7b20jw" data-path="src/pages/IncomePage.tsx">
            <span className="text-lg font-bold text-green-600" data-id="5dsx4mvko" data-path="src/pages/IncomePage.tsx">
              +₹{income.amount.toLocaleString()}
            </span>
            <div className="flex space-x-1" data-id="35fnjnlhc" data-path="src/pages/IncomePage.tsx">
              <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditingIncome(income)} data-id="37z2cpa9w" data-path="src/pages/IncomePage.tsx">

                <Edit className="h-4 w-4" data-id="f163bpx55" data-path="src/pages/IncomePage.tsx" />
              </Button>
              <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteIncome(income.id)}
              className="text-red-600 hover:text-red-700" data-id="b8r5ojcml" data-path="src/pages/IncomePage.tsx">

                <Trash2 className="h-4 w-4" data-id="pzj7f3b1b" data-path="src/pages/IncomePage.tsx" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;


  const AddIncomeForm = () =>
  <div className="space-y-4" data-id="rt58ucg7b" data-path="src/pages/IncomePage.tsx">
      <div className="space-y-2" data-id="e8ud21j8z" data-path="src/pages/IncomePage.tsx">
        <Label htmlFor="title" data-id="w8cfd3puq" data-path="src/pages/IncomePage.tsx">Income Title</Label>
        <Input
        id="title"
        placeholder="e.g., Part-time Job"
        value={newIncome.title}
        onChange={(e) => setNewIncome((prev) => ({ ...prev, title: e.target.value }))} data-id="8n802iug8" data-path="src/pages/IncomePage.tsx" />

      </div>

      <div className="grid grid-cols-2 gap-4" data-id="8gh91lgq7" data-path="src/pages/IncomePage.tsx">
        <div className="space-y-2" data-id="gisfb7s4g" data-path="src/pages/IncomePage.tsx">
          <Label htmlFor="amount" data-id="z0adqklew" data-path="src/pages/IncomePage.tsx">Amount (₹)</Label>
          <Input
          id="amount"
          type="number"
          placeholder="0"
          value={newIncome.amount}
          onChange={(e) => setNewIncome((prev) => ({ ...prev, amount: e.target.value }))} data-id="bfszx4q7z" data-path="src/pages/IncomePage.tsx" />

        </div>

        <div className="space-y-2" data-id="yb6vzgcuo" data-path="src/pages/IncomePage.tsx">
          <Label htmlFor="source" data-id="9aa9t5nb0" data-path="src/pages/IncomePage.tsx">Income Source</Label>
          <Select value={newIncome.source} onValueChange={(value) => setNewIncome((prev) => ({ ...prev, source: value }))} data-id="qufn9ymg5" data-path="src/pages/IncomePage.tsx">
            <SelectTrigger data-id="yzgddtqcc" data-path="src/pages/IncomePage.tsx">
              <SelectValue placeholder="Select source" data-id="07me73rg3" data-path="src/pages/IncomePage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="mdz802017" data-path="src/pages/IncomePage.tsx">
              {incomeSources.map((source) =>
            <SelectItem key={source.name} value={source.name} data-id="cb1ccv7qz" data-path="src/pages/IncomePage.tsx">
                  <div className="flex items-center gap-2" data-id="1yv2c41yv" data-path="src/pages/IncomePage.tsx">
                    {source.icon}
                    {source.name}
                  </div>
                </SelectItem>
            )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2" data-id="cg7ik82wu" data-path="src/pages/IncomePage.tsx">
        <Label data-id="wsk67ejhn" data-path="src/pages/IncomePage.tsx">Date</Label>
        <Popover data-id="vai64plf7" data-path="src/pages/IncomePage.tsx">
          <PopoverTrigger asChild data-id="gakxocj82" data-path="src/pages/IncomePage.tsx">
            <Button variant="outline" className="w-full justify-start text-left font-normal" data-id="ubhi5hecp" data-path="src/pages/IncomePage.tsx">
              <CalendarIcon className="mr-2 h-4 w-4" data-id="0kgbf7czd" data-path="src/pages/IncomePage.tsx" />
              {format(newIncome.date, 'PPP')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" data-id="iwao9xiu9" data-path="src/pages/IncomePage.tsx">
            <Calendar
            mode="single"
            selected={newIncome.date}
            onSelect={(date) => date && setNewIncome((prev) => ({ ...prev, date }))}
            initialFocus data-id="a2ic1m0pm" data-path="src/pages/IncomePage.tsx" />

          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center space-x-2" data-id="7b1r3ewxv" data-path="src/pages/IncomePage.tsx">
        <input
        type="checkbox"
        id="recurring"
        checked={newIncome.recurring}
        onChange={(e) => setNewIncome((prev) => ({ ...prev, recurring: e.target.checked }))}
        className="rounded border-gray-300" data-id="5tjrjp8o1" data-path="src/pages/IncomePage.tsx" />

        <Label htmlFor="recurring" className="text-sm" data-id="awp56qpds" data-path="src/pages/IncomePage.tsx">This is a recurring income</Label>
      </div>

      <div className="space-y-2" data-id="zj8h0hmeg" data-path="src/pages/IncomePage.tsx">
        <Label htmlFor="notes" data-id="3rvuyluye" data-path="src/pages/IncomePage.tsx">Notes (Optional)</Label>
        <Textarea
        id="notes"
        placeholder="Add any additional details..."
        value={newIncome.notes}
        onChange={(e) => setNewIncome((prev) => ({ ...prev, notes: e.target.value }))} data-id="avju9wlud" data-path="src/pages/IncomePage.tsx" />

      </div>

      <div className="flex space-x-2 pt-4" data-id="w4fcis7up" data-path="src/pages/IncomePage.tsx">
        <Button onClick={handleAddIncome} className="flex-1" data-id="vs57acbs6" data-path="src/pages/IncomePage.tsx">
          Add Income
        </Button>
        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} data-id="4oxid0nhm" data-path="src/pages/IncomePage.tsx">
          Cancel
        </Button>
      </div>
    </div>;


  return (
    <DashboardLayout data-id="elgelocbv" data-path="src/pages/IncomePage.tsx">
      <div className="p-6 space-y-6" data-id="q8rw01609" data-path="src/pages/IncomePage.tsx">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" data-id="wl4ctw400" data-path="src/pages/IncomePage.tsx">
          <div data-id="nslj3rb78" data-path="src/pages/IncomePage.tsx">
            <h1 className="text-3xl font-bold text-gray-900" data-id="q94yxc1jd" data-path="src/pages/IncomePage.tsx">Income</h1>
            <p className="text-gray-600" data-id="teczsdjxl" data-path="src/pages/IncomePage.tsx">Track and manage your income sources</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} data-id="n99pmewev" data-path="src/pages/IncomePage.tsx">
            <DialogTrigger asChild data-id="7eptbgs3o" data-path="src/pages/IncomePage.tsx">
              <Button className="bg-green-600 hover:bg-green-700" data-id="xteplhuoj" data-path="src/pages/IncomePage.tsx">
                <Plus className="h-4 w-4 mr-2" data-id="ezc5au63j" data-path="src/pages/IncomePage.tsx" />
                Add Income
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" data-id="x37lbd2q4" data-path="src/pages/IncomePage.tsx">
              <DialogHeader data-id="y7a131sme" data-path="src/pages/IncomePage.tsx">
                <DialogTitle data-id="y7n641dxa" data-path="src/pages/IncomePage.tsx">Add New Income</DialogTitle>
                <DialogDescription data-id="oidqql5d5" data-path="src/pages/IncomePage.tsx">
                  Record a new income source to track your earnings.
                </DialogDescription>
              </DialogHeader>
              <AddIncomeForm data-id="xgy08p65i" data-path="src/pages/IncomePage.tsx" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="c2l52cqen" data-path="src/pages/IncomePage.tsx">
          <Card data-id="bji44vjvi" data-path="src/pages/IncomePage.tsx">
            <CardContent className="p-6" data-id="hxwwn7we5" data-path="src/pages/IncomePage.tsx">
              <div className="flex items-center justify-between" data-id="kox9fbbkc" data-path="src/pages/IncomePage.tsx">
                <div data-id="w5s4yv6uh" data-path="src/pages/IncomePage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="3zw3m4xfo" data-path="src/pages/IncomePage.tsx">Total Income</p>
                  <p className="text-2xl font-bold text-green-600" data-id="980v2nfjt" data-path="src/pages/IncomePage.tsx">₹{totalIncome.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" data-id="48whcrilc" data-path="src/pages/IncomePage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="dbk66rew0" data-path="src/pages/IncomePage.tsx">
            <CardContent className="p-6" data-id="rs5i206v1" data-path="src/pages/IncomePage.tsx">
              <div className="flex items-center justify-between" data-id="btdtcv6xd" data-path="src/pages/IncomePage.tsx">
                <div data-id="9t7o9ms1p" data-path="src/pages/IncomePage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="6jmn9wl38" data-path="src/pages/IncomePage.tsx">Recurring Income</p>
                  <p className="text-2xl font-bold text-blue-600" data-id="x072x7fjo" data-path="src/pages/IncomePage.tsx">₹{recurringIncome.toLocaleString()}</p>
                </div>
                <PiggyBank className="h-8 w-8 text-blue-600" data-id="cp5r60uk2" data-path="src/pages/IncomePage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="dvltupm9z" data-path="src/pages/IncomePage.tsx">
            <CardContent className="p-6" data-id="yfzia6bn5" data-path="src/pages/IncomePage.tsx">
              <div className="flex items-center justify-between" data-id="maqadp2lu" data-path="src/pages/IncomePage.tsx">
                <div data-id="2iz82ynwz" data-path="src/pages/IncomePage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="6wcgka25c" data-path="src/pages/IncomePage.tsx">One-time Income</p>
                  <p className="text-2xl font-bold text-purple-600" data-id="2jc5jtloc" data-path="src/pages/IncomePage.tsx">₹{oneTimeIncome.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" data-id="aws9146fj" data-path="src/pages/IncomePage.tsx" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card data-id="ft25g4yo3" data-path="src/pages/IncomePage.tsx">
          <CardContent className="p-6" data-id="1e7atnb4m" data-path="src/pages/IncomePage.tsx">
            <div className="flex flex-col md:flex-row gap-4" data-id="dn1qzzhyw" data-path="src/pages/IncomePage.tsx">
              <div className="flex-1" data-id="nu96hi3t6" data-path="src/pages/IncomePage.tsx">
                <div className="relative" data-id="myuqpvl4n" data-path="src/pages/IncomePage.tsx">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" data-id="dv42g62fe" data-path="src/pages/IncomePage.tsx" />
                  <Input
                    placeholder="Search income..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10" data-id="333y6eo6x" data-path="src/pages/IncomePage.tsx" />

                </div>
              </div>

              <Select value={selectedSource} onValueChange={setSelectedSource} data-id="f3288bcpw" data-path="src/pages/IncomePage.tsx">
                <SelectTrigger className="w-full md:w-48" data-id="wncqys6ci" data-path="src/pages/IncomePage.tsx">
                  <SelectValue placeholder="All Sources" data-id="cjxzl8nh0" data-path="src/pages/IncomePage.tsx" />
                </SelectTrigger>
                <SelectContent data-id="2mrtnrn45" data-path="src/pages/IncomePage.tsx">
                  <SelectItem value="All" data-id="mm1w3vacj" data-path="src/pages/IncomePage.tsx">All Sources</SelectItem>
                  {incomeSources.map((source) =>
                  <SelectItem key={source.name} value={source.name} data-id="1w61zqg5n" data-path="src/pages/IncomePage.tsx">
                      <div className="flex items-center gap-2" data-id="odb9zssxr" data-path="src/pages/IncomePage.tsx">
                        {source.icon}
                        {source.name}
                      </div>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              <Select value={selectedMonth} onValueChange={setSelectedMonth} data-id="cy6qfow6z" data-path="src/pages/IncomePage.tsx">
                <SelectTrigger className="w-full md:w-48" data-id="mu5e83dm9" data-path="src/pages/IncomePage.tsx">
                  <SelectValue placeholder="All Time" data-id="xihdrgmkl" data-path="src/pages/IncomePage.tsx" />
                </SelectTrigger>
                <SelectContent data-id="zoe76a4is" data-path="src/pages/IncomePage.tsx">
                  <SelectItem value="All" data-id="bu4bq7ifr" data-path="src/pages/IncomePage.tsx">All Time</SelectItem>
                  <SelectItem value="This Month" data-id="paob1jn4d" data-path="src/pages/IncomePage.tsx">This Month</SelectItem>
                  <SelectItem value="Last Month" data-id="4v55cydaj" data-path="src/pages/IncomePage.tsx">Last Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Income Sources Overview */}
        <Card data-id="1nunt2uxi" data-path="src/pages/IncomePage.tsx">
          <CardHeader data-id="yjg7k4lgk" data-path="src/pages/IncomePage.tsx">
            <CardTitle data-id="ruv8yq872" data-path="src/pages/IncomePage.tsx">Income by Source</CardTitle>
          </CardHeader>
          <CardContent data-id="wk5vr08dm" data-path="src/pages/IncomePage.tsx">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-id="sxe9tmynp" data-path="src/pages/IncomePage.tsx">
              {incomeSources.map((source) => {
                const sourceIncomes = filteredIncomes.filter((income) => income.source === source.name);
                const sourceTotal = sourceIncomes.reduce((sum, income) => sum + income.amount, 0);
                const percentage = totalIncome > 0 ? sourceTotal / totalIncome * 100 : 0;

                return (
                  <div key={source.name} className="text-center p-4 rounded-lg bg-gray-50" data-id="4meg1idp8" data-path="src/pages/IncomePage.tsx">
                    <div className="text-2xl mb-2" data-id="iav4rnr9z" data-path="src/pages/IncomePage.tsx">{source.icon}</div>
                    <div className="font-medium text-sm" data-id="cbx7vwf73" data-path="src/pages/IncomePage.tsx">{source.name}</div>
                    <div className="text-lg font-bold text-gray-900" data-id="gyjwsq6qn" data-path="src/pages/IncomePage.tsx">₹{sourceTotal.toLocaleString()}</div>
                    <div className="text-xs text-gray-500" data-id="kcxi3fpga" data-path="src/pages/IncomePage.tsx">{percentage.toFixed(1)}%</div>
                  </div>);

              })}
            </div>
          </CardContent>
        </Card>

        {/* Income List */}
        <Card data-id="97dewpyad" data-path="src/pages/IncomePage.tsx">
          <CardHeader data-id="pql5hzi05" data-path="src/pages/IncomePage.tsx">
            <CardTitle data-id="3mbvw7gt4" data-path="src/pages/IncomePage.tsx">Recent Income</CardTitle>
            <CardDescription data-id="fi8ur64ob" data-path="src/pages/IncomePage.tsx">
              {filteredIncomes.length} {filteredIncomes.length === 1 ? 'income record' : 'income records'} found
            </CardDescription>
          </CardHeader>
          <CardContent data-id="v79t1vhug" data-path="src/pages/IncomePage.tsx">
            {filteredIncomes.length === 0 ?
            <div className="text-center py-12" data-id="tju5x21dm" data-path="src/pages/IncomePage.tsx">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" data-id="9k3a0z9ub" data-path="src/pages/IncomePage.tsx" />
                <h3 className="text-lg font-medium text-gray-900 mb-2" data-id="gc1x5jjg5" data-path="src/pages/IncomePage.tsx">No income records found</h3>
                <p className="text-gray-600 mb-4" data-id="ekl7gwfsp" data-path="src/pages/IncomePage.tsx">
                  {searchTerm || selectedSource !== 'All' ?
                'Try adjusting your filters or search terms.' :
                'Start tracking your income by adding your first income source.'
                }
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)} data-id="7u77q851l" data-path="src/pages/IncomePage.tsx">
                  <Plus className="h-4 w-4 mr-2" data-id="dth70lgk1" data-path="src/pages/IncomePage.tsx" />
                  Add First Income
                </Button>
              </div> :

            <div className="space-y-4" data-id="9wjjs8kua" data-path="src/pages/IncomePage.tsx">
                {filteredIncomes.map((income) =>
              <IncomeCard key={income.id} income={income} data-id="s4ixf75xj" data-path="src/pages/IncomePage.tsx" />
              )}
              </div>
            }
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>);

};

export default IncomePage;