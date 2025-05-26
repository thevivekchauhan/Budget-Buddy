import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import {
  Plus,
  Bell,
  Calendar as CalendarIcon,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  CreditCard,
  Home,
  Wifi,
  Smartphone,
  Car,
  GraduationCap,
  Heart,
  Coffee,
  Zap } from
'lucide-react';
import { format, addDays, isAfter, isBefore, differenceInDays } from 'date-fns';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';

const BillsPage = () => {
  const [bills, setBills] = useState([
  {
    id: 1,
    title: 'Hostel Rent',
    amount: 8000,
    category: 'Housing',
    dueDate: '2024-01-20',
    frequency: 'monthly',
    isPaid: false,
    reminder: true,
    icon: '🏠',
    nextDue: '2024-02-20'
  },
  {
    id: 2,
    title: 'Netflix Subscription',
    amount: 199,
    category: 'Entertainment',
    dueDate: '2024-01-22',
    frequency: 'monthly',
    isPaid: false,
    reminder: true,
    icon: '📺',
    nextDue: '2024-02-22'
  },
  {
    id: 3,
    title: 'Internet Bill',
    amount: 500,
    category: 'Utilities',
    dueDate: '2024-01-25',
    frequency: 'monthly',
    isPaid: false,
    reminder: true,
    icon: '📶',
    nextDue: '2024-02-25'
  },
  {
    id: 4,
    title: 'Mobile Recharge',
    amount: 299,
    category: 'Utilities',
    dueDate: '2024-01-18',
    frequency: 'monthly',
    isPaid: true,
    reminder: true,
    icon: '📱',
    nextDue: '2024-02-18'
  },
  {
    id: 5,
    title: 'Electricity Bill',
    amount: 800,
    category: 'Utilities',
    dueDate: '2024-01-30',
    frequency: 'monthly',
    isPaid: false,
    reminder: true,
    icon: '⚡',
    nextDue: '2024-02-28'
  },
  {
    id: 6,
    title: 'Health Insurance',
    amount: 1200,
    category: 'Insurance',
    dueDate: '2024-01-15',
    frequency: 'monthly',
    isPaid: true,
    reminder: true,
    icon: '🏥',
    nextDue: '2024-02-15'
  },
  {
    id: 7,
    title: 'Spotify Premium',
    amount: 119,
    category: 'Entertainment',
    dueDate: '2024-01-28',
    frequency: 'monthly',
    isPaid: false,
    reminder: false,
    icon: '🎵',
    nextDue: '2024-02-28'
  }]
  );

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBill, setEditingBill] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const billCategories = [
  { name: 'Housing', icon: <Home className="h-4 w-4" data-id="ojdnpc661" data-path="src/pages/BillsPage.tsx" />, color: 'bg-blue-100 text-blue-800' },
  { name: 'Utilities', icon: <Zap className="h-4 w-4" data-id="k3p05jknn" data-path="src/pages/BillsPage.tsx" />, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Entertainment', icon: <Coffee className="h-4 w-4" data-id="bk5ultlvd" data-path="src/pages/BillsPage.tsx" />, color: 'bg-purple-100 text-purple-800' },
  { name: 'Insurance', icon: <Heart className="h-4 w-4" data-id="17ut9rqlq" data-path="src/pages/BillsPage.tsx" />, color: 'bg-green-100 text-green-800' },
  { name: 'Transportation', icon: <Car className="h-4 w-4" data-id="n6705xbv5" data-path="src/pages/BillsPage.tsx" />, color: 'bg-orange-100 text-orange-800' },
  { name: 'Education', icon: <GraduationCap className="h-4 w-4" data-id="d188vg43h" data-path="src/pages/BillsPage.tsx" />, color: 'bg-indigo-100 text-indigo-800' },
  { name: 'Others', icon: <CreditCard className="h-4 w-4" data-id="vfn2kz9ee" data-path="src/pages/BillsPage.tsx" />, color: 'bg-gray-100 text-gray-800' }];


  const frequencies = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' }];


  const [newBill, setNewBill] = useState({
    title: '',
    amount: '',
    category: '',
    dueDate: new Date(),
    frequency: 'monthly',
    reminder: true
  });

  const getBillStatus = (bill: typeof bills[0]) => {
    if (bill.isPaid) {
      return { status: 'paid', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: <CheckCircle className="h-4 w-4" data-id="eygsvhcw5" data-path="src/pages/BillsPage.tsx" /> };
    }

    const today = new Date();
    const dueDate = new Date(bill.dueDate);
    const daysUntilDue = differenceInDays(dueDate, today);

    if (daysUntilDue < 0) {
      return { status: 'overdue', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: <AlertCircle className="h-4 w-4" data-id="du5dbs6tx" data-path="src/pages/BillsPage.tsx" /> };
    } else if (daysUntilDue <= 3) {
      return { status: 'due_soon', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', icon: <Clock className="h-4 w-4" data-id="0jkbgw01u" data-path="src/pages/BillsPage.tsx" /> };
    }

    return { status: 'pending', color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', icon: <Clock className="h-4 w-4" data-id="a6n2kly6w" data-path="src/pages/BillsPage.tsx" /> };
  };

  const getCategoryStyle = (categoryName: string) => {
    const category = billCategories.find((cat) => cat.name === categoryName);
    return category ? category.color : 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = billCategories.find((cat) => cat.name === categoryName);
    return category ? category.icon : <CreditCard className="h-4 w-4" data-id="cwpca7sld" data-path="src/pages/BillsPage.tsx" />;
  };

  const handleAddBill = () => {
    if (!newBill.title || !newBill.amount || !newBill.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const bill = {
      id: Date.now(),
      ...newBill,
      amount: parseFloat(newBill.amount),
      dueDate: format(newBill.dueDate, 'yyyy-MM-dd'),
      isPaid: false,
      icon: billCategories.find((cat) => cat.name === newBill.category)?.name === 'Housing' ? '🏠' : '💳',
      nextDue: format(addDays(newBill.dueDate, 30), 'yyyy-MM-dd') // Simple next due calculation
    };

    setBills((prev) => [bill, ...prev]);
    setNewBill({
      title: '',
      amount: '',
      category: '',
      dueDate: new Date(),
      frequency: 'monthly',
      reminder: true
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Bill Added",
      description: `${bill.title} has been added to your bills.`
    });
  };

  const handleMarkPaid = (id: number) => {
    setBills((prev) => prev.map((bill) =>
    bill.id === id ? { ...bill, isPaid: true } : bill
    ));

    const bill = bills.find((b) => b.id === id);
    toast({
      title: "Bill Marked as Paid",
      description: `${bill?.title} has been marked as paid.`
    });
  };

  const handleDeleteBill = (id: number) => {
    setBills((prev) => prev.filter((bill) => bill.id !== id));
    toast({
      title: "Bill Deleted",
      description: "The bill has been removed from your list."
    });
  };

  const toggleReminder = (id: number) => {
    setBills((prev) => prev.map((bill) =>
    bill.id === id ? { ...bill, reminder: !bill.reminder } : bill
    ));
  };

  const filteredBills = bills.filter((bill) => {
    switch (selectedFilter) {
      case 'paid':
        return bill.isPaid;
      case 'pending':
        return !bill.isPaid;
      case 'overdue':
        return !bill.isPaid && new Date(bill.dueDate) < new Date();
      case 'due_soon':
        return !bill.isPaid && differenceInDays(new Date(bill.dueDate), new Date()) <= 3;
      default:
        return true;
    }
  });

  const totalMonthlyBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const unpaidBills = bills.filter((bill) => !bill.isPaid);
  const overdueBills = bills.filter((bill) => !bill.isPaid && new Date(bill.dueDate) < new Date());

  const BillCard = ({ bill }: {bill: typeof bills[0];}) => {
    const status = getBillStatus(bill);
    const daysUntilDue = differenceInDays(new Date(bill.dueDate), new Date());

    return (
      <Card className={`hover:shadow-lg transition-all duration-300 ${status.bg} ${status.border}`} data-id="ztmr2rqhv" data-path="src/pages/BillsPage.tsx">
        <CardContent className="p-4" data-id="tbjclna3z" data-path="src/pages/BillsPage.tsx">
          <div className="flex items-center justify-between" data-id="o5u1yt4yj" data-path="src/pages/BillsPage.tsx">
            <div className="flex items-center space-x-3" data-id="v3bhgxjip" data-path="src/pages/BillsPage.tsx">
              <span className="text-2xl" data-id="pqpn5ie7e" data-path="src/pages/BillsPage.tsx">{bill.icon}</span>
              <div data-id="0pr2j1ozh" data-path="src/pages/BillsPage.tsx">
                <div className="flex items-center gap-2 mb-1" data-id="wgi6i45ro" data-path="src/pages/BillsPage.tsx">
                  <h3 className="font-semibold text-gray-900" data-id="ygkcl54a5" data-path="src/pages/BillsPage.tsx">{bill.title}</h3>
                  {status.icon}
                </div>
                <div className="flex items-center gap-2" data-id="fmn8xl4ox" data-path="src/pages/BillsPage.tsx">
                  <Badge variant="secondary" className={getCategoryStyle(bill.category)} data-id="fpk22zcqv" data-path="src/pages/BillsPage.tsx">
                    {getCategoryIcon(bill.category)}
                    <span className="ml-1" data-id="lg9u67pal" data-path="src/pages/BillsPage.tsx">{bill.category}</span>
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${status.color}`} data-id="n6orcomal" data-path="src/pages/BillsPage.tsx">
                    {bill.isPaid ? 'Paid' :
                    daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` :
                    daysUntilDue === 0 ? 'Due today' :
                    `Due in ${daysUntilDue} days`}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600" data-id="qbs0i002t" data-path="src/pages/BillsPage.tsx">
                  <span data-id="gc1mg2s41" data-path="src/pages/BillsPage.tsx">Due: {bill.dueDate}</span>
                  <span data-id="rvn7v3amd" data-path="src/pages/BillsPage.tsx">• {bill.frequency}</span>
                  {bill.reminder && <span data-id="qkynty0r3" data-path="src/pages/BillsPage.tsx">• 🔔 Reminder on</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2" data-id="rmxv2zdjw" data-path="src/pages/BillsPage.tsx">
              <div className="text-right" data-id="515wa6i5v" data-path="src/pages/BillsPage.tsx">
                <span className="text-lg font-bold text-gray-900" data-id="h2jftb1sk" data-path="src/pages/BillsPage.tsx">
                  ₹{bill.amount.toLocaleString()}
                </span>
                {!bill.isPaid &&
                <div className="flex gap-1 mt-2" data-id="j7kg8ym9c" data-path="src/pages/BillsPage.tsx">
                    <Button
                    size="sm"
                    onClick={() => handleMarkPaid(bill.id)}
                    className="bg-green-600 hover:bg-green-700 text-white" data-id="dcr9h1hot" data-path="src/pages/BillsPage.tsx">

                      Mark Paid
                    </Button>
                  </div>
                }
              </div>
              <div className="flex flex-col space-y-1" data-id="bqanzidh0" data-path="src/pages/BillsPage.tsx">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleReminder(bill.id)}
                  className={bill.reminder ? 'text-blue-600' : 'text-gray-400'} data-id="9hz4jbg7g" data-path="src/pages/BillsPage.tsx">

                  <Bell className="h-4 w-4" data-id="vci3bphfp" data-path="src/pages/BillsPage.tsx" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingBill(bill)} data-id="vipfxih7a" data-path="src/pages/BillsPage.tsx">

                  <Edit className="h-4 w-4" data-id="6ludh4d5q" data-path="src/pages/BillsPage.tsx" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteBill(bill.id)}
                  className="text-red-600 hover:text-red-700" data-id="51ej5bx0d" data-path="src/pages/BillsPage.tsx">

                  <Trash2 className="h-4 w-4" data-id="1ipikpvv6" data-path="src/pages/BillsPage.tsx" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>);

  };

  const AddBillForm = () =>
  <div className="space-y-4" data-id="giohqefk6" data-path="src/pages/BillsPage.tsx">
      <div className="space-y-2" data-id="ks9lqwt6p" data-path="src/pages/BillsPage.tsx">
        <Label htmlFor="title" data-id="6x5nkgm3s" data-path="src/pages/BillsPage.tsx">Bill Name</Label>
        <Input
        id="title"
        placeholder="e.g., Electricity Bill"
        value={newBill.title}
        onChange={(e) => setNewBill((prev) => ({ ...prev, title: e.target.value }))} data-id="tu7baaq33" data-path="src/pages/BillsPage.tsx" />

      </div>

      <div className="grid grid-cols-2 gap-4" data-id="mcgcl8zge" data-path="src/pages/BillsPage.tsx">
        <div className="space-y-2" data-id="qtv70wq76" data-path="src/pages/BillsPage.tsx">
          <Label htmlFor="amount" data-id="zswce5xa2" data-path="src/pages/BillsPage.tsx">Amount (₹)</Label>
          <Input
          id="amount"
          type="number"
          placeholder="0"
          value={newBill.amount}
          onChange={(e) => setNewBill((prev) => ({ ...prev, amount: e.target.value }))} data-id="0zp68kxcj" data-path="src/pages/BillsPage.tsx" />

        </div>

        <div className="space-y-2" data-id="zsmfmexpn" data-path="src/pages/BillsPage.tsx">
          <Label htmlFor="category" data-id="9pixnqida" data-path="src/pages/BillsPage.tsx">Category</Label>
          <Select value={newBill.category} onValueChange={(value) => setNewBill((prev) => ({ ...prev, category: value }))} data-id="x9c8gbx62" data-path="src/pages/BillsPage.tsx">
            <SelectTrigger data-id="tcz5pgw46" data-path="src/pages/BillsPage.tsx">
              <SelectValue placeholder="Select category" data-id="7lc0cht1f" data-path="src/pages/BillsPage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="a3gztoxgt" data-path="src/pages/BillsPage.tsx">
              {billCategories.map((category) =>
            <SelectItem key={category.name} value={category.name} data-id="b7e8i3j4i" data-path="src/pages/BillsPage.tsx">
                  <div className="flex items-center gap-2" data-id="9hnqo6ymn" data-path="src/pages/BillsPage.tsx">
                    {category.icon}
                    {category.name}
                  </div>
                </SelectItem>
            )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4" data-id="4bjxzpr3t" data-path="src/pages/BillsPage.tsx">
        <div className="space-y-2" data-id="krypvr8to" data-path="src/pages/BillsPage.tsx">
          <Label data-id="pbd6m49wh" data-path="src/pages/BillsPage.tsx">Due Date</Label>
          <Popover data-id="p1l1l6xkg" data-path="src/pages/BillsPage.tsx">
            <PopoverTrigger asChild data-id="b9pzx85l2" data-path="src/pages/BillsPage.tsx">
              <Button variant="outline" className="w-full justify-start text-left font-normal" data-id="9lyt8mrrb" data-path="src/pages/BillsPage.tsx">
                <CalendarIcon className="mr-2 h-4 w-4" data-id="cynps9a2x" data-path="src/pages/BillsPage.tsx" />
                {format(newBill.dueDate, 'PPP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" data-id="7xfnuqb2f" data-path="src/pages/BillsPage.tsx">
              <Calendar
              mode="single"
              selected={newBill.dueDate}
              onSelect={(date) => date && setNewBill((prev) => ({ ...prev, dueDate: date }))}
              initialFocus data-id="ui361xpqb" data-path="src/pages/BillsPage.tsx" />

            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2" data-id="8bap9gopi" data-path="src/pages/BillsPage.tsx">
          <Label htmlFor="frequency" data-id="wavmf0soj" data-path="src/pages/BillsPage.tsx">Frequency</Label>
          <Select value={newBill.frequency} onValueChange={(value) => setNewBill((prev) => ({ ...prev, frequency: value }))} data-id="iurafga1u" data-path="src/pages/BillsPage.tsx">
            <SelectTrigger data-id="h5p04dp3u" data-path="src/pages/BillsPage.tsx">
              <SelectValue placeholder="Select frequency" data-id="w9mczsshz" data-path="src/pages/BillsPage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="8i9i7a2rz" data-path="src/pages/BillsPage.tsx">
              {frequencies.map((freq) =>
            <SelectItem key={freq.value} value={freq.value} data-id="rkhak4z5m" data-path="src/pages/BillsPage.tsx">
                  {freq.label}
                </SelectItem>
            )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2" data-id="aupingu4a" data-path="src/pages/BillsPage.tsx">
        <Switch
        id="reminder"
        checked={newBill.reminder}
        onCheckedChange={(checked) => setNewBill((prev) => ({ ...prev, reminder: checked }))} data-id="5joec6zwb" data-path="src/pages/BillsPage.tsx" />

        <Label htmlFor="reminder" className="text-sm" data-id="nsi2jkr7z" data-path="src/pages/BillsPage.tsx">Enable reminder notifications</Label>
      </div>

      <div className="flex space-x-2 pt-4" data-id="9uz089o3p" data-path="src/pages/BillsPage.tsx">
        <Button onClick={handleAddBill} className="flex-1" data-id="vtj89qcbq" data-path="src/pages/BillsPage.tsx">
          Add Bill
        </Button>
        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} data-id="maaxlfsov" data-path="src/pages/BillsPage.tsx">
          Cancel
        </Button>
      </div>
    </div>;


  return (
    <DashboardLayout data-id="ialtwhatw" data-path="src/pages/BillsPage.tsx">
      <div className="p-6 space-y-6" data-id="pn55pu8b3" data-path="src/pages/BillsPage.tsx">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" data-id="s31b1u6jn" data-path="src/pages/BillsPage.tsx">
          <div data-id="ppj5fjwb6" data-path="src/pages/BillsPage.tsx">
            <h1 className="text-3xl font-bold text-gray-900" data-id="yhp4bt9lf" data-path="src/pages/BillsPage.tsx">Bills & Reminders</h1>
            <p className="text-gray-600" data-id="0qjnuwn9g" data-path="src/pages/BillsPage.tsx">Keep track of your recurring payments</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} data-id="2549bprwl" data-path="src/pages/BillsPage.tsx">
            <DialogTrigger asChild data-id="xo1u9odam" data-path="src/pages/BillsPage.tsx">
              <Button className="bg-blue-600 hover:bg-blue-700" data-id="y29vp06dj" data-path="src/pages/BillsPage.tsx">
                <Plus className="h-4 w-4 mr-2" data-id="50ohydn31" data-path="src/pages/BillsPage.tsx" />
                Add Bill
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" data-id="oov96keov" data-path="src/pages/BillsPage.tsx">
              <DialogHeader data-id="9wl9lhjzp" data-path="src/pages/BillsPage.tsx">
                <DialogTitle data-id="bnbq343qh" data-path="src/pages/BillsPage.tsx">Add New Bill</DialogTitle>
                <DialogDescription data-id="k9jjp3tj7" data-path="src/pages/BillsPage.tsx">
                  Add a recurring bill to track and get reminders.
                </DialogDescription>
              </DialogHeader>
              <AddBillForm data-id="6v598zdme" data-path="src/pages/BillsPage.tsx" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-id="mkuk5xasu" data-path="src/pages/BillsPage.tsx">
          <Card data-id="ra6uk5aig" data-path="src/pages/BillsPage.tsx">
            <CardContent className="p-6" data-id="03qlqprmz" data-path="src/pages/BillsPage.tsx">
              <div className="flex items-center justify-between" data-id="n6pfzszju" data-path="src/pages/BillsPage.tsx">
                <div data-id="r48n2qwn3" data-path="src/pages/BillsPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="ngn5la74q" data-path="src/pages/BillsPage.tsx">Total Monthly Bills</p>
                  <p className="text-2xl font-bold text-gray-900" data-id="23nggpfcl" data-path="src/pages/BillsPage.tsx">₹{totalMonthlyBills.toLocaleString()}</p>
                </div>
                <CreditCard className="h-8 w-8 text-gray-600" data-id="qe9f8mw71" data-path="src/pages/BillsPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="tl99spzsa" data-path="src/pages/BillsPage.tsx">
            <CardContent className="p-6" data-id="qr3e5fjbh" data-path="src/pages/BillsPage.tsx">
              <div className="flex items-center justify-between" data-id="l3yz2ffc9" data-path="src/pages/BillsPage.tsx">
                <div data-id="w7c6sqpcm" data-path="src/pages/BillsPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="731j95hfp" data-path="src/pages/BillsPage.tsx">Unpaid Bills</p>
                  <p className="text-2xl font-bold text-orange-600" data-id="rd3nrnne7" data-path="src/pages/BillsPage.tsx">{unpaidBills.length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" data-id="dd1wb0e9v" data-path="src/pages/BillsPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="oakh0qgkt" data-path="src/pages/BillsPage.tsx">
            <CardContent className="p-6" data-id="kalttqajl" data-path="src/pages/BillsPage.tsx">
              <div className="flex items-center justify-between" data-id="82amqjpke" data-path="src/pages/BillsPage.tsx">
                <div data-id="rg2lry62a" data-path="src/pages/BillsPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="i8eve763o" data-path="src/pages/BillsPage.tsx">Overdue Bills</p>
                  <p className="text-2xl font-bold text-red-600" data-id="z2pzi43y1" data-path="src/pages/BillsPage.tsx">{overdueBills.length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" data-id="jmfj0121k" data-path="src/pages/BillsPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="e2atahtiv" data-path="src/pages/BillsPage.tsx">
            <CardContent className="p-6" data-id="0h0kuvvlr" data-path="src/pages/BillsPage.tsx">
              <div className="flex items-center justify-between" data-id="cyw6inzfx" data-path="src/pages/BillsPage.tsx">
                <div data-id="h1q5bx80k" data-path="src/pages/BillsPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="barh2hdav" data-path="src/pages/BillsPage.tsx">Active Reminders</p>
                  <p className="text-2xl font-bold text-blue-600" data-id="veasdsxuu" data-path="src/pages/BillsPage.tsx">{bills.filter((b) => b.reminder).length}</p>
                </div>
                <Bell className="h-8 w-8 text-blue-600" data-id="w2787o73c" data-path="src/pages/BillsPage.tsx" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card data-id="9pay2xtjv" data-path="src/pages/BillsPage.tsx">
          <CardContent className="p-6" data-id="m4xy5r7k7" data-path="src/pages/BillsPage.tsx">
            <div className="flex flex-wrap gap-2" data-id="7ygsb7yis" data-path="src/pages/BillsPage.tsx">
              {[
              { value: 'all', label: 'All Bills', count: bills.length },
              { value: 'pending', label: 'Pending', count: unpaidBills.length },
              { value: 'paid', label: 'Paid', count: bills.filter((b) => b.isPaid).length },
              { value: 'overdue', label: 'Overdue', count: overdueBills.length },
              { value: 'due_soon', label: 'Due Soon', count: bills.filter((b) => !b.isPaid && differenceInDays(new Date(b.dueDate), new Date()) <= 3).length }].
              map((filter) =>
              <Button
                key={filter.value}
                variant={selectedFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.value)}
                className="relative" data-id="7pnz6qqix" data-path="src/pages/BillsPage.tsx">

                  {filter.label}
                  {filter.count > 0 &&
                <Badge variant="secondary" className="ml-2 text-xs" data-id="6yxa172aj" data-path="src/pages/BillsPage.tsx">
                      {filter.count}
                    </Badge>
                }
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bills List */}
        <Card data-id="5h2khognv" data-path="src/pages/BillsPage.tsx">
          <CardHeader data-id="vt2v6qef6" data-path="src/pages/BillsPage.tsx">
            <CardTitle data-id="y3kof8a08" data-path="src/pages/BillsPage.tsx">
              {selectedFilter === 'all' ? 'All Bills' :
              selectedFilter === 'pending' ? 'Pending Bills' :
              selectedFilter === 'paid' ? 'Paid Bills' :
              selectedFilter === 'overdue' ? 'Overdue Bills' :
              'Bills Due Soon'}
            </CardTitle>
            <CardDescription data-id="6rlppg6gu" data-path="src/pages/BillsPage.tsx">
              {filteredBills.length} {filteredBills.length === 1 ? 'bill' : 'bills'} found
            </CardDescription>
          </CardHeader>
          <CardContent data-id="0w6zt96h5" data-path="src/pages/BillsPage.tsx">
            {filteredBills.length === 0 ?
            <div className="text-center py-12" data-id="elfvikdnf" data-path="src/pages/BillsPage.tsx">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" data-id="l63mz78kd" data-path="src/pages/BillsPage.tsx" />
                <h3 className="text-lg font-medium text-gray-900 mb-2" data-id="jef4zu21v" data-path="src/pages/BillsPage.tsx">No bills found</h3>
                <p className="text-gray-600 mb-4" data-id="52t99oidi" data-path="src/pages/BillsPage.tsx">
                  {selectedFilter !== 'all' ?
                'No bills match the selected filter.' :
                'Start tracking your bills by adding your first bill.'
                }
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)} data-id="hib4wkfvl" data-path="src/pages/BillsPage.tsx">
                  <Plus className="h-4 w-4 mr-2" data-id="bkbknqij2" data-path="src/pages/BillsPage.tsx" />
                  Add First Bill
                </Button>
              </div> :

            <div className="space-y-4" data-id="mgoi5vm4b" data-path="src/pages/BillsPage.tsx">
                {filteredBills.map((bill) =>
              <BillCard key={bill.id} bill={bill} data-id="ftapwnmif" data-path="src/pages/BillsPage.tsx" />
              )}
              </div>
            }
          </CardContent>
        </Card>

        {/* Upcoming Bills Summary */}
        {unpaidBills.length > 0 &&
        <Card data-id="0yv4ceinl" data-path="src/pages/BillsPage.tsx">
            <CardHeader data-id="98xywzl6q" data-path="src/pages/BillsPage.tsx">
              <CardTitle data-id="ifk7as6c2" data-path="src/pages/BillsPage.tsx">Upcoming Bills Summary</CardTitle>
            </CardHeader>
            <CardContent data-id="hiplodhej" data-path="src/pages/BillsPage.tsx">
              <div className="grid md:grid-cols-3 gap-4" data-id="ilzqn6xzg" data-path="src/pages/BillsPage.tsx">
                <div className="text-center p-4 bg-yellow-50 rounded-lg" data-id="juffsjpq4" data-path="src/pages/BillsPage.tsx">
                  <div className="text-2xl font-bold text-yellow-600 mb-1" data-id="22lc8nu83" data-path="src/pages/BillsPage.tsx">
                    ₹{unpaidBills.reduce((sum, bill) => sum + bill.amount, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-yellow-700" data-id="1lxtsrf9g" data-path="src/pages/BillsPage.tsx">Total Amount Due</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg" data-id="v05s3defk" data-path="src/pages/BillsPage.tsx">
                  <div className="text-2xl font-bold text-red-600 mb-1" data-id="246wc8xa8" data-path="src/pages/BillsPage.tsx">
                    {overdueBills.length}
                  </div>
                  <div className="text-sm text-red-700" data-id="mikvc5i0h" data-path="src/pages/BillsPage.tsx">Overdue Bills</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg" data-id="vwe93qd4a" data-path="src/pages/BillsPage.tsx">
                  <div className="text-2xl font-bold text-blue-600 mb-1" data-id="u4dvzs3bq" data-path="src/pages/BillsPage.tsx">
                    {bills.filter((b) => b.reminder && !b.isPaid).length}
                  </div>
                  <div className="text-sm text-blue-700" data-id="mecizum9a" data-path="src/pages/BillsPage.tsx">Reminders Set</div>
                </div>
              </div>
            </CardContent>
          </Card>
        }
      </div>
    </DashboardLayout>);

};

export default BillsPage;