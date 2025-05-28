import { useState, useEffect } from 'react';
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

const BILLS_TABLE_ID = 10242;

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

interface Bill {
  ID: number;
  title: string;
  amount: number;
  category: string;
  due_date: string;
  frequency: string;
  is_paid: boolean;
  reminder_enabled: boolean;
  user_id: number;
}

const BillsPage = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const [filteredBills, setFilteredBills] = useState<Bill[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBill, setEditingBill] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const billCategories = [
  { name: 'Housing', icon: <Home className="h-4 w-4" data-id="maluucm8s" data-path="src/pages/BillsPage.tsx" />, color: 'bg-blue-100 text-blue-800' },
  { name: 'Utilities', icon: <Zap className="h-4 w-4" data-id="84m14vx2d" data-path="src/pages/BillsPage.tsx" />, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Entertainment', icon: <Coffee className="h-4 w-4" data-id="22wjmdv2i" data-path="src/pages/BillsPage.tsx" />, color: 'bg-purple-100 text-purple-800' },
  { name: 'Insurance', icon: <Heart className="h-4 w-4" data-id="e1s0djyvo" data-path="src/pages/BillsPage.tsx" />, color: 'bg-green-100 text-green-800' },
  { name: 'Transportation', icon: <Car className="h-4 w-4" data-id="zqwb0c3s1" data-path="src/pages/BillsPage.tsx" />, color: 'bg-orange-100 text-orange-800' },
  { name: 'Education', icon: <GraduationCap className="h-4 w-4" data-id="oso32pk53" data-path="src/pages/BillsPage.tsx" />, color: 'bg-indigo-100 text-indigo-800' },
  { name: 'Others', icon: <CreditCard className="h-4 w-4" data-id="wtw9qppk1" data-path="src/pages/BillsPage.tsx" />, color: 'bg-gray-100 text-gray-800' }];


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

  // Load user and bills on component mount
  useEffect(() => {
    loadUserAndBills();
  }, []);

  const loadUserAndBills = async () => {
    try {
      const { data: userData, error: userError } = await window.ezsite.apis.getUserInfo();
      if (userError) throw userError;
      setUser(userData);

      if (userData?.ID) {
        await loadBills(userData.ID);
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

  const loadBills = async (userId: number) => {
    try {
      const { data, error } = await window.ezsite.apis.tablePage(BILLS_TABLE_ID, {
        PageNo: 1,
        PageSize: 1000,
        OrderByField: "due_date",
        IsAsc: true,
        Filters: [
        {
          name: "user_id",
          op: "Equal",
          value: userId
        }]

      });

      if (error) throw error;
      setBills(data?.List || []);
    } catch (error) {
      console.error('Error loading bills:', error);
      toast({
        title: "Error",
        description: "Failed to load bills. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getBillStatus = (bill: Bill) => {
    if (bill.is_paid) {
      return { status: 'paid', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: <CheckCircle className="h-4 w-4" data-id="23zhc5itf" data-path="src/pages/BillsPage.tsx" /> };
    }

    const today = new Date();
    const dueDate = new Date(bill.due_date);
    const daysUntilDue = differenceInDays(dueDate, today);

    if (daysUntilDue < 0) {
      return { status: 'overdue', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: <AlertCircle className="h-4 w-4" data-id="1ol9ybash" data-path="src/pages/BillsPage.tsx" /> };
    } else if (daysUntilDue <= 3) {
      return { status: 'due_soon', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', icon: <Clock className="h-4 w-4" data-id="82w6utsxl" data-path="src/pages/BillsPage.tsx" /> };
    }

    return { status: 'pending', color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', icon: <Clock className="h-4 w-4" data-id="2t37la1hn" data-path="src/pages/BillsPage.tsx" /> };
  };

  const getCategoryStyle = (categoryName: string) => {
    const category = billCategories.find((cat) => cat.name === categoryName);
    return category ? category.color : 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = billCategories.find((cat) => cat.name === categoryName);
    return category ? category.icon : <CreditCard className="h-4 w-4" data-id="416zvkmi2" data-path="src/pages/BillsPage.tsx" />;
  };

  const handleAddBill = async () => {
    if (!newBill.title || !newBill.amount || !newBill.category) {
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
      const billData = {
        user_id: user.ID,
        title: newBill.title,
        amount: parseFloat(newBill.amount),
        category: newBill.category,
        due_date: format(newBill.dueDate, 'yyyy-MM-dd'),
        frequency: newBill.frequency,
        is_paid: false,
        reminder_enabled: newBill.reminder
      };

      const { error } = await window.ezsite.apis.tableCreate(BILLS_TABLE_ID, billData);
      if (error) throw error;

      await loadBills(user.ID);
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
        description: `${billData.title} has been added to your bills.`
      });
    } catch (error) {
      console.error('Error adding bill:', error);
      toast({
        title: "Error",
        description: "Failed to add bill. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleMarkPaid = async (id: number) => {
    try {
      const bill = bills.find((b) => b.ID === id);
      if (!bill) return;

      const { error } = await window.ezsite.apis.tableUpdate(BILLS_TABLE_ID, {
        ID: id,
        user_id: bill.user_id,
        title: bill.title,
        amount: bill.amount,
        category: bill.category,
        due_date: bill.due_date,
        frequency: bill.frequency,
        is_paid: true,
        reminder_enabled: bill.reminder_enabled
      });

      if (error) throw error;

      if (user?.ID) {
        await loadBills(user.ID);
      }

      toast({
        title: "Bill Marked as Paid",
        description: `${bill.title} has been marked as paid.`
      });
    } catch (error) {
      console.error('Error marking bill as paid:', error);
      toast({
        title: "Error",
        description: "Failed to mark bill as paid. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteBill = async (id: number) => {
    try {
      const { error } = await window.ezsite.apis.tableDelete(BILLS_TABLE_ID, { ID: id });
      if (error) throw error;

      if (user?.ID) {
        await loadBills(user.ID);
      }

      toast({
        title: "Bill Deleted",
        description: "The bill has been removed from your list."
      });
    } catch (error) {
      console.error('Error deleting bill:', error);
      toast({
        title: "Error",
        description: "Failed to delete bill. Please try again.",
        variant: "destructive"
      });
    }
  };

  const toggleReminder = async (id: number) => {
    try {
      const bill = bills.find((b) => b.ID === id);
      if (!bill) return;

      const { error } = await window.ezsite.apis.tableUpdate(BILLS_TABLE_ID, {
        ID: id,
        user_id: bill.user_id,
        title: bill.title,
        amount: bill.amount,
        category: bill.category,
        due_date: bill.due_date,
        frequency: bill.frequency,
        is_paid: bill.is_paid,
        reminder_enabled: !bill.reminder_enabled
      });

      if (error) throw error;

      if (user?.ID) {
        await loadBills(user.ID);
      }
    } catch (error) {
      console.error('Error toggling reminder:', error);
      toast({
        title: "Error",
        description: "Failed to update reminder. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const filtered = bills.filter((bill) => {
      switch (selectedFilter) {
        case 'paid':
          return bill.is_paid;
        case 'pending':
          return !bill.is_paid;
        case 'overdue':
          return !bill.is_paid && new Date(bill.due_date) < new Date();
        case 'due_soon':
          return !bill.is_paid && differenceInDays(new Date(bill.due_date), new Date()) <= 3;
        default:
          return true;
      }
    });
    setFilteredBills(filtered);
  }, [bills, selectedFilter]);

  const totalMonthlyBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const unpaidBills = bills.filter((bill) => !bill.is_paid);
  const overdueBills = bills.filter((bill) => !bill.is_paid && new Date(bill.due_date) < new Date());

  const BillCard = ({ bill }: {bill: Bill;}) => {
    const status = getBillStatus(bill);
    const daysUntilDue = differenceInDays(new Date(bill.due_date), new Date());

    const getIcon = (category: string) => {
      switch (category) {
        case 'Housing':return '🏠';
        case 'Utilities':return '⚡';
        case 'Entertainment':return '📺';
        case 'Insurance':return '🏥';
        case 'Transportation':return '🚗';
        case 'Education':return '🎓';
        default:return '💳';
      }
    };

    return (
      <Card className={`hover:shadow-lg transition-all duration-300 ${status.bg} ${status.border}`} data-id="h38de8wyi" data-path="src/pages/BillsPage.tsx">
        <CardContent className="p-4" data-id="g6j1pstuz" data-path="src/pages/BillsPage.tsx">
          <div className="flex items-center justify-between" data-id="r95wjy6pm" data-path="src/pages/BillsPage.tsx">
            <div className="flex items-center space-x-3" data-id="3thzipsev" data-path="src/pages/BillsPage.tsx">
              <span className="text-2xl" data-id="vfncytyu9" data-path="src/pages/BillsPage.tsx">{getIcon(bill.category)}</span>
              <div data-id="9945104oe" data-path="src/pages/BillsPage.tsx">
                <div className="flex items-center gap-2 mb-1" data-id="tew6wpqaj" data-path="src/pages/BillsPage.tsx">
                  <h3 className="font-semibold text-gray-900" data-id="eczoawxdm" data-path="src/pages/BillsPage.tsx">{bill.title}</h3>
                  {status.icon}
                </div>
                <div className="flex items-center gap-2" data-id="zraixg9ax" data-path="src/pages/BillsPage.tsx">
                  <Badge variant="secondary" className={getCategoryStyle(bill.category)} data-id="psoiwzxpx" data-path="src/pages/BillsPage.tsx">
                    {getCategoryIcon(bill.category)}
                    <span className="ml-1" data-id="rg07i57vp" data-path="src/pages/BillsPage.tsx">{bill.category}</span>
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${status.color}`} data-id="rhi7j59wu" data-path="src/pages/BillsPage.tsx">
                    {bill.is_paid ? 'Paid' :
                    daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` :
                    daysUntilDue === 0 ? 'Due today' :
                    `Due in ${daysUntilDue} days`}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600" data-id="qm1vcy7rc" data-path="src/pages/BillsPage.tsx">
                  <span data-id="gh14nr0ht" data-path="src/pages/BillsPage.tsx">Due: {bill.due_date}</span>
                  <span data-id="df2gtzzho" data-path="src/pages/BillsPage.tsx">• {bill.frequency}</span>
                  {bill.reminder_enabled && <span data-id="pjag9zv10" data-path="src/pages/BillsPage.tsx">• 🔔 Reminder on</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2" data-id="zs5nr2n58" data-path="src/pages/BillsPage.tsx">
              <div className="text-right" data-id="xxkrcxfi2" data-path="src/pages/BillsPage.tsx">
                <span className="text-lg font-bold text-gray-900" data-id="z215qo5jw" data-path="src/pages/BillsPage.tsx">
                  ₹{bill.amount.toLocaleString()}
                </span>
                {!bill.is_paid &&
                <div className="flex gap-1 mt-2" data-id="jlvybgwp1" data-path="src/pages/BillsPage.tsx">
                    <Button
                    size="sm"
                    onClick={() => handleMarkPaid(bill.ID)}
                    className="bg-green-600 hover:bg-green-700 text-white" data-id="ljnhkrm2p" data-path="src/pages/BillsPage.tsx">
                      Mark Paid
                    </Button>
                  </div>
                }
              </div>
              <div className="flex flex-col space-y-1" data-id="njynmrx4s" data-path="src/pages/BillsPage.tsx">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleReminder(bill.ID)}
                  className={bill.reminder_enabled ? 'text-blue-600' : 'text-gray-400'} data-id="kswitugfb" data-path="src/pages/BillsPage.tsx">
                  <Bell className="h-4 w-4" data-id="02twktmyg" data-path="src/pages/BillsPage.tsx" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingBill(bill)} data-id="i4vly1ls6" data-path="src/pages/BillsPage.tsx">
                  <Edit className="h-4 w-4" data-id="cpj7yl30i" data-path="src/pages/BillsPage.tsx" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteBill(bill.ID)}
                  className="text-red-600 hover:text-red-700" data-id="pae30ywuk" data-path="src/pages/BillsPage.tsx">
                  <Trash2 className="h-4 w-4" data-id="zvbhkpvd6" data-path="src/pages/BillsPage.tsx" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>);

  };

  const AddBillForm = () =>
  <div className="space-y-4" data-id="fwa9dg3gd" data-path="src/pages/BillsPage.tsx">
      <div className="space-y-2" data-id="b0nbqpc2b" data-path="src/pages/BillsPage.tsx">
        <Label htmlFor="title" data-id="c69n4021n" data-path="src/pages/BillsPage.tsx">Bill Name</Label>
        <Input
        id="title"
        placeholder="e.g., Electricity Bill"
        value={newBill.title}
        onChange={(e) => setNewBill((prev) => ({ ...prev, title: e.target.value }))} data-id="9n2fzofzx" data-path="src/pages/BillsPage.tsx" />

      </div>

      <div className="grid grid-cols-2 gap-4" data-id="981kmfcrm" data-path="src/pages/BillsPage.tsx">
        <div className="space-y-2" data-id="49tjv63tq" data-path="src/pages/BillsPage.tsx">
          <Label htmlFor="amount" data-id="qqude4fjx" data-path="src/pages/BillsPage.tsx">Amount (₹)</Label>
          <Input
          id="amount"
          type="number"
          placeholder="0"
          value={newBill.amount}
          onChange={(e) => setNewBill((prev) => ({ ...prev, amount: e.target.value }))} data-id="loa6t2jz8" data-path="src/pages/BillsPage.tsx" />

        </div>

        <div className="space-y-2" data-id="8o4x2uhl5" data-path="src/pages/BillsPage.tsx">
          <Label htmlFor="category" data-id="haxp4vr45" data-path="src/pages/BillsPage.tsx">Category</Label>
          <Select value={newBill.category} onValueChange={(value) => setNewBill((prev) => ({ ...prev, category: value }))} data-id="6792m7wg0" data-path="src/pages/BillsPage.tsx">
            <SelectTrigger data-id="oa626ylwu" data-path="src/pages/BillsPage.tsx">
              <SelectValue placeholder="Select category" data-id="et6z60rld" data-path="src/pages/BillsPage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="ikcq7az6j" data-path="src/pages/BillsPage.tsx">
              {billCategories.map((category) =>
            <SelectItem key={category.name} value={category.name} data-id="zm6371hcz" data-path="src/pages/BillsPage.tsx">
                  <div className="flex items-center gap-2" data-id="kbr6t5va9" data-path="src/pages/BillsPage.tsx">
                    {category.icon}
                    {category.name}
                  </div>
                </SelectItem>
            )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4" data-id="t73ncnjhz" data-path="src/pages/BillsPage.tsx">
        <div className="space-y-2" data-id="0j1xbnc44" data-path="src/pages/BillsPage.tsx">
          <Label data-id="b052jvdpf" data-path="src/pages/BillsPage.tsx">Due Date</Label>
          <Popover data-id="mdlbbkhcw" data-path="src/pages/BillsPage.tsx">
            <PopoverTrigger asChild data-id="mdhu9z3sb" data-path="src/pages/BillsPage.tsx">
              <Button variant="outline" className="w-full justify-start text-left font-normal" data-id="55x0dzoaf" data-path="src/pages/BillsPage.tsx">
                <CalendarIcon className="mr-2 h-4 w-4" data-id="vvgdc4eyw" data-path="src/pages/BillsPage.tsx" />
                {format(newBill.dueDate, 'PPP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" data-id="79o7aaa7p" data-path="src/pages/BillsPage.tsx">
              <Calendar
              mode="single"
              selected={newBill.dueDate}
              onSelect={(date) => date && setNewBill((prev) => ({ ...prev, dueDate: date }))}
              initialFocus data-id="pvs53do18" data-path="src/pages/BillsPage.tsx" />

            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2" data-id="m8yxf1ep5" data-path="src/pages/BillsPage.tsx">
          <Label htmlFor="frequency" data-id="bq4ibo34w" data-path="src/pages/BillsPage.tsx">Frequency</Label>
          <Select value={newBill.frequency} onValueChange={(value) => setNewBill((prev) => ({ ...prev, frequency: value }))} data-id="3naevijuy" data-path="src/pages/BillsPage.tsx">
            <SelectTrigger data-id="7dhl6640x" data-path="src/pages/BillsPage.tsx">
              <SelectValue placeholder="Select frequency" data-id="juzqumvqd" data-path="src/pages/BillsPage.tsx" />
            </SelectTrigger>
            <SelectContent data-id="gpkuph56w" data-path="src/pages/BillsPage.tsx">
              {frequencies.map((freq) =>
            <SelectItem key={freq.value} value={freq.value} data-id="apau5dchf" data-path="src/pages/BillsPage.tsx">
                  {freq.label}
                </SelectItem>
            )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2" data-id="vcloos4rd" data-path="src/pages/BillsPage.tsx">
        <Switch
        id="reminder"
        checked={newBill.reminder}
        onCheckedChange={(checked) => setNewBill((prev) => ({ ...prev, reminder: checked }))} data-id="zcai0zjgm" data-path="src/pages/BillsPage.tsx" />

        <Label htmlFor="reminder" className="text-sm" data-id="tw689eehn" data-path="src/pages/BillsPage.tsx">Enable reminder notifications</Label>
      </div>

      <div className="flex space-x-2 pt-4" data-id="lkkwoxyj8" data-path="src/pages/BillsPage.tsx">
        <Button onClick={handleAddBill} className="flex-1" data-id="6f2i8i80g" data-path="src/pages/BillsPage.tsx">
          Add Bill
        </Button>
        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} data-id="er6mma4n3" data-path="src/pages/BillsPage.tsx">
          Cancel
        </Button>
      </div>
    </div>;

  if (loading) {
    return (
      <DashboardLayout data-id="ud02dwsxd" data-path="src/pages/BillsPage.tsx">
        <div className="p-6 space-y-6" data-id="6j60gpazk" data-path="src/pages/BillsPage.tsx">
          <div className="flex items-center justify-center h-64" data-id="ax4460mu5" data-path="src/pages/BillsPage.tsx">
            <div className="text-lg" data-id="fz9two0i9" data-path="src/pages/BillsPage.tsx">Loading bills...</div>
          </div>
        </div>
      </DashboardLayout>);

  }

  return (
    <DashboardLayout data-id="kn51o4z0l" data-path="src/pages/BillsPage.tsx">
      <div className="p-6 space-y-6" data-id="ch658yp0d" data-path="src/pages/BillsPage.tsx">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" data-id="qx66cup26" data-path="src/pages/BillsPage.tsx">
          <div data-id="igkob06t6" data-path="src/pages/BillsPage.tsx">
            <h1 className="text-3xl font-bold text-gray-900" data-id="8tcrvznvp" data-path="src/pages/BillsPage.tsx">Bills & Reminders</h1>
            <p className="text-gray-600" data-id="dbahdcxb7" data-path="src/pages/BillsPage.tsx">Keep track of your recurring payments</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} data-id="7j3i4y7je" data-path="src/pages/BillsPage.tsx">
            <DialogTrigger asChild data-id="e7lo185pr" data-path="src/pages/BillsPage.tsx">
              <Button className="bg-blue-600 hover:bg-blue-700" data-id="5ymimbqvy" data-path="src/pages/BillsPage.tsx">
                <Plus className="h-4 w-4 mr-2" data-id="sojl7aov0" data-path="src/pages/BillsPage.tsx" />
                Add Bill
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" data-id="zogxd9n1y" data-path="src/pages/BillsPage.tsx">
              <DialogHeader data-id="wfiacc5if" data-path="src/pages/BillsPage.tsx">
                <DialogTitle data-id="vkfjr1i9e" data-path="src/pages/BillsPage.tsx">Add New Bill</DialogTitle>
                <DialogDescription data-id="ldt0dd3f2" data-path="src/pages/BillsPage.tsx">
                  Add a recurring bill to track and get reminders.
                </DialogDescription>
              </DialogHeader>
              <AddBillForm data-id="e3zr64f8n" data-path="src/pages/BillsPage.tsx" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-id="ibfjepd1g" data-path="src/pages/BillsPage.tsx">
          <Card data-id="l8xsf5aul" data-path="src/pages/BillsPage.tsx">
            <CardContent className="p-6" data-id="ll6vr36iz" data-path="src/pages/BillsPage.tsx">
              <div className="flex items-center justify-between" data-id="pd3084vvm" data-path="src/pages/BillsPage.tsx">
                <div data-id="ljo6rgr7z" data-path="src/pages/BillsPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="w6whyi8rp" data-path="src/pages/BillsPage.tsx">Total Monthly Bills</p>
                  <p className="text-2xl font-bold text-gray-900" data-id="7eylhche4" data-path="src/pages/BillsPage.tsx">₹{totalMonthlyBills.toLocaleString()}</p>
                </div>
                <CreditCard className="h-8 w-8 text-gray-600" data-id="k29g84osh" data-path="src/pages/BillsPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="z1xlnmrle" data-path="src/pages/BillsPage.tsx">
            <CardContent className="p-6" data-id="wqyeu5hqk" data-path="src/pages/BillsPage.tsx">
              <div className="flex items-center justify-between" data-id="8fubkjdl5" data-path="src/pages/BillsPage.tsx">
                <div data-id="1pdb2pkif" data-path="src/pages/BillsPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="r2544a7e7" data-path="src/pages/BillsPage.tsx">Unpaid Bills</p>
                  <p className="text-2xl font-bold text-orange-600" data-id="qu5hqpy3w" data-path="src/pages/BillsPage.tsx">{unpaidBills.length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" data-id="ytsjt8et9" data-path="src/pages/BillsPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="mt512evdg" data-path="src/pages/BillsPage.tsx">
            <CardContent className="p-6" data-id="fzwhn3asd" data-path="src/pages/BillsPage.tsx">
              <div className="flex items-center justify-between" data-id="7e6j9kkz2" data-path="src/pages/BillsPage.tsx">
                <div data-id="xp9he85nl" data-path="src/pages/BillsPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="jxc20l92v" data-path="src/pages/BillsPage.tsx">Overdue Bills</p>
                  <p className="text-2xl font-bold text-red-600" data-id="r5yb8983k" data-path="src/pages/BillsPage.tsx">{overdueBills.length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" data-id="izowqbasb" data-path="src/pages/BillsPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="nrf86kq6u" data-path="src/pages/BillsPage.tsx">
            <CardContent className="p-6" data-id="po9qco8is" data-path="src/pages/BillsPage.tsx">
              <div className="flex items-center justify-between" data-id="t0zzv9m5f" data-path="src/pages/BillsPage.tsx">
                <div data-id="x2r1gxeam" data-path="src/pages/BillsPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="5pxlmnvh1" data-path="src/pages/BillsPage.tsx">Active Reminders</p>
                  <p className="text-2xl font-bold text-blue-600" data-id="xmre1drte" data-path="src/pages/BillsPage.tsx">{bills.filter((b) => b.reminder_enabled).length}</p>
                </div>
                <Bell className="h-8 w-8 text-blue-600" data-id="0ynx0r5or" data-path="src/pages/BillsPage.tsx" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card data-id="2pjd6445x" data-path="src/pages/BillsPage.tsx">
          <CardContent className="p-6" data-id="1bawke5ip" data-path="src/pages/BillsPage.tsx">
            <div className="flex flex-wrap gap-2" data-id="dvrferwkp" data-path="src/pages/BillsPage.tsx">
              {[
              { value: 'all', label: 'All Bills', count: bills.length },
              { value: 'pending', label: 'Pending', count: unpaidBills.length },
              { value: 'paid', label: 'Paid', count: bills.filter((b) => b.is_paid).length },
              { value: 'overdue', label: 'Overdue', count: overdueBills.length },
              { value: 'due_soon', label: 'Due Soon', count: bills.filter((b) => !b.is_paid && differenceInDays(new Date(b.due_date), new Date()) <= 3).length }].
              map((filter) =>
              <Button
                key={filter.value}
                variant={selectedFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.value)}
                className="relative" data-id="v8z3y7o5f" data-path="src/pages/BillsPage.tsx">

                  {filter.label}
                  {filter.count > 0 &&
                <Badge variant="secondary" className="ml-2 text-xs" data-id="xizcce6ad" data-path="src/pages/BillsPage.tsx">
                      {filter.count}
                    </Badge>
                }
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bills List */}
        <Card data-id="q1h58r0bu" data-path="src/pages/BillsPage.tsx">
          <CardHeader data-id="qle38940q" data-path="src/pages/BillsPage.tsx">
            <CardTitle data-id="njagfpbmn" data-path="src/pages/BillsPage.tsx">
              {selectedFilter === 'all' ? 'All Bills' :
              selectedFilter === 'pending' ? 'Pending Bills' :
              selectedFilter === 'paid' ? 'Paid Bills' :
              selectedFilter === 'overdue' ? 'Overdue Bills' :
              'Bills Due Soon'}
            </CardTitle>
            <CardDescription data-id="ptp73rlry" data-path="src/pages/BillsPage.tsx">
              {filteredBills.length} {filteredBills.length === 1 ? 'bill' : 'bills'} found
            </CardDescription>
          </CardHeader>
          <CardContent data-id="ksq64yp8o" data-path="src/pages/BillsPage.tsx">
            {filteredBills.length === 0 ?
            <div className="text-center py-12" data-id="6052r1gjb" data-path="src/pages/BillsPage.tsx">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" data-id="avt3wpefx" data-path="src/pages/BillsPage.tsx" />
                <h3 className="text-lg font-medium text-gray-900 mb-2" data-id="4ciool8t3" data-path="src/pages/BillsPage.tsx">No bills found</h3>
                <p className="text-gray-600 mb-4" data-id="bnxp17fm6" data-path="src/pages/BillsPage.tsx">
                  {selectedFilter !== 'all' ?
                'No bills match the selected filter.' :
                'Start tracking your bills by adding your first bill.'
                }
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)} data-id="pugrvva8p" data-path="src/pages/BillsPage.tsx">
                  <Plus className="h-4 w-4 mr-2" data-id="eg6j9mbh9" data-path="src/pages/BillsPage.tsx" />
                  Add First Bill
                </Button>
              </div> :

            <div className="space-y-4" data-id="4hv861kas" data-path="src/pages/BillsPage.tsx">
                {filteredBills.map((bill) =>
              <BillCard key={bill.ID} bill={bill} data-id="7fk6k8369" data-path="src/pages/BillsPage.tsx" />
              )}
              </div>
            }
          </CardContent>
        </Card>

        {/* Upcoming Bills Summary */}
        {unpaidBills.length > 0 &&
        <Card data-id="2lq1n5qn3" data-path="src/pages/BillsPage.tsx">
            <CardHeader data-id="pefvz9p7p" data-path="src/pages/BillsPage.tsx">
              <CardTitle data-id="5d2nfz6pk" data-path="src/pages/BillsPage.tsx">Upcoming Bills Summary</CardTitle>
            </CardHeader>
            <CardContent data-id="ploh9o9wo" data-path="src/pages/BillsPage.tsx">
              <div className="grid md:grid-cols-3 gap-4" data-id="jj48dyp0i" data-path="src/pages/BillsPage.tsx">
                <div className="text-center p-4 bg-yellow-50 rounded-lg" data-id="3uxbwi1il" data-path="src/pages/BillsPage.tsx">
                  <div className="text-2xl font-bold text-yellow-600 mb-1" data-id="esx5docid" data-path="src/pages/BillsPage.tsx">
                    ₹{unpaidBills.reduce((sum, bill) => sum + bill.amount, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-yellow-700" data-id="pz8r89uhn" data-path="src/pages/BillsPage.tsx">Total Amount Due</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg" data-id="xlu9phgd9" data-path="src/pages/BillsPage.tsx">
                  <div className="text-2xl font-bold text-red-600 mb-1" data-id="f3vo9328y" data-path="src/pages/BillsPage.tsx">
                    {overdueBills.length}
                  </div>
                  <div className="text-sm text-red-700" data-id="i59zbfi6e" data-path="src/pages/BillsPage.tsx">Overdue Bills</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg" data-id="knfddry2t" data-path="src/pages/BillsPage.tsx">
                  <div className="text-2xl font-bold text-blue-600 mb-1" data-id="63z5sgdkm" data-path="src/pages/BillsPage.tsx">
                    {bills.filter((b) => b.reminder_enabled && !b.is_paid).length}
                  </div>
                  <div className="text-sm text-blue-700" data-id="5h6x5z5ki" data-path="src/pages/BillsPage.tsx">Reminders Set</div>
                </div>
              </div>
            </CardContent>
          </Card>
        }
      </div>
    </DashboardLayout>);

};

export default BillsPage;