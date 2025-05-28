import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  PiggyBank,
  Plus,
  Target,
  TrendingUp,
  Calendar as CalendarIcon,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  Smartphone,
  Car,
  GraduationCap,
  Plane,
  Home,
  Heart,
  Gift,
  Briefcase } from
'lucide-react';
import { format, differenceInDays, differenceInMonths } from 'date-fns';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';

const SAVINGS_GOALS_TABLE_ID = 10243;

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

interface SavingsGoal {
  ID: number;
  title: string;
  target_amount: number;
  saved_amount: number;
  target_date: string;
  category: string;
  description: string;
  priority: string;
  user_id: number;
}

const SavingsGoalsPage = () => {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const goalCategories = [
  { name: 'Technology', icon: <Smartphone className="h-4 w-4" data-id="ik565lywv" data-path="src/pages/SavingsGoalsPage.tsx" />, color: 'bg-blue-100 text-blue-800' },
  { name: 'Travel', icon: <Plane className="h-4 w-4" data-id="5oi0muioz" data-path="src/pages/SavingsGoalsPage.tsx" />, color: 'bg-green-100 text-green-800' },
  { name: 'Emergency', icon: <Heart className="h-4 w-4" data-id="4jdi4akq3" data-path="src/pages/SavingsGoalsPage.tsx" />, color: 'bg-red-100 text-red-800' },
  { name: 'Transportation', icon: <Car className="h-4 w-4" data-id="kliu859h0" data-path="src/pages/SavingsGoalsPage.tsx" />, color: 'bg-orange-100 text-orange-800' },
  { name: 'Education', icon: <GraduationCap className="h-4 w-4" data-id="jussw53gn" data-path="src/pages/SavingsGoalsPage.tsx" />, color: 'bg-indigo-100 text-indigo-800' },
  { name: 'Housing', icon: <Home className="h-4 w-4" data-id="wz3zfapxu" data-path="src/pages/SavingsGoalsPage.tsx" />, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Investment', icon: <TrendingUp className="h-4 w-4" data-id="a18ag1jbq" data-path="src/pages/SavingsGoalsPage.tsx" />, color: 'bg-emerald-100 text-emerald-800' },
  { name: 'Others', icon: <Gift className="h-4 w-4" data-id="1r5on8x86" data-path="src/pages/SavingsGoalsPage.tsx" />, color: 'bg-gray-100 text-gray-800' }];

  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    deadline: new Date(),
    category: '',
    description: '',
    priority: 'medium'
  });

  // Load user and goals on component mount
  useEffect(() => {
    loadUserAndGoals();
  }, []);

  const loadUserAndGoals = async () => {
    try {
      const { data: userData, error: userError } = await window.ezsite.apis.getUserInfo();
      if (userError) throw userError;
      setUser(userData);

      if (userData?.ID) {
        await loadGoals(userData.ID);
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

  const loadGoals = async (userId: number) => {
    try {
      const { data, error } = await window.ezsite.apis.tablePage(SAVINGS_GOALS_TABLE_ID, {
        PageNo: 1,
        PageSize: 1000,
        OrderByField: "target_date",
        IsAsc: true,
        Filters: [
        {
          name: "user_id",
          op: "Equal",
          value: userId
        }]

      });

      if (error) throw error;
      setGoals(data?.List || []);
    } catch (error) {
      console.error('Error loading goals:', error);
      toast({
        title: "Error",
        description: "Failed to load savings goals. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getGoalStatus = (goal: SavingsGoal) => {
    const progress = goal.saved_amount / goal.target_amount * 100;
    const daysUntilDeadline = differenceInDays(new Date(goal.target_date), new Date());

    if (progress >= 100) {
      return { status: 'completed', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    } else if (daysUntilDeadline < 0) {
      return { status: 'overdue', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    } else if (daysUntilDeadline <= 30) {
      return { status: 'urgent', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
    } else {
      return { status: 'on_track', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    }
  };

  const getCategoryStyle = (categoryName: string) => {
    const category = goalCategories.find((cat) => cat.name === categoryName);
    return category ? category.color : 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = goalCategories.find((cat) => cat.name === categoryName);
    return category ? category.icon : <Gift className="h-4 w-4" data-id="4xms4riuf" data-path="src/pages/SavingsGoalsPage.tsx" />;
  };

  const handleAddGoal = async () => {
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.category) {
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
      const goalData = {
        user_id: user.ID,
        title: newGoal.title,
        target_amount: parseFloat(newGoal.targetAmount),
        saved_amount: 0,
        target_date: format(newGoal.deadline, 'yyyy-MM-dd'),
        category: newGoal.category,
        description: newGoal.description,
        priority: newGoal.priority
      };

      const { error } = await window.ezsite.apis.tableCreate(SAVINGS_GOALS_TABLE_ID, goalData);
      if (error) throw error;

      await loadGoals(user.ID);
      setNewGoal({
        title: '',
        targetAmount: '',
        deadline: new Date(),
        category: '',
        description: '',
        priority: 'medium'
      });
      setIsAddDialogOpen(false);

      toast({
        title: "Goal Added",
        description: `${goalData.title} goal has been created.`
      });
    } catch (error) {
      console.error('Error adding goal:', error);
      toast({
        title: "Error",
        description: "Failed to add savings goal. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAddMoney = async (id: number, amount: number) => {
    try {
      const goal = goals.find((g) => g.ID === id);
      if (!goal) return;

      const newSavedAmount = goal.saved_amount + amount;

      const { error } = await window.ezsite.apis.tableUpdate(SAVINGS_GOALS_TABLE_ID, {
        ID: id,
        user_id: goal.user_id,
        title: goal.title,
        target_amount: goal.target_amount,
        saved_amount: newSavedAmount,
        target_date: goal.target_date,
        category: goal.category,
        description: goal.description,
        priority: goal.priority
      });

      if (error) throw error;

      if (user?.ID) {
        await loadGoals(user.ID);
      }

      toast({
        title: "Money Added",
        description: `₹${amount} added to ${goal.title}`
      });
    } catch (error) {
      console.error('Error adding money:', error);
      toast({
        title: "Error",
        description: "Failed to add money. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteGoal = async (id: number) => {
    try {
      const { error } = await window.ezsite.apis.tableDelete(SAVINGS_GOALS_TABLE_ID, { ID: id });
      if (error) throw error;

      if (user?.ID) {
        await loadGoals(user.ID);
      }

      toast({
        title: "Goal Deleted",
        description: "The savings goal has been removed."
      });
    } catch (error) {
      console.error('Error deleting goal:', error);
      toast({
        title: "Error",
        description: "Failed to delete savings goal. Please try again.",
        variant: "destructive"
      });
    }
  };

  const filteredGoals = goals.filter((goal) => {
    const progress = goal.saved_amount / goal.target_amount * 100;
    const daysUntilDeadline = differenceInDays(new Date(goal.target_date), new Date());

    switch (selectedFilter) {
      case 'completed':
        return progress >= 100;
      case 'on_track':
        return progress < 100 && daysUntilDeadline > 30;
      case 'urgent':
        return progress < 100 && daysUntilDeadline <= 30 && daysUntilDeadline >= 0;
      case 'overdue':
        return progress < 100 && daysUntilDeadline < 0;
      default:
        return true;
    }
  });

  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.target_amount, 0);
  const totalSavedAmount = goals.reduce((sum, goal) => sum + goal.saved_amount, 0);
  const completedGoals = goals.filter((goal) => goal.saved_amount / goal.target_amount * 100 >= 100);

  const GoalCard = ({ goal }: {goal: SavingsGoal;}) => {
    const progress = goal.saved_amount / goal.target_amount * 100;
    const status = getGoalStatus(goal);
    const daysUntilDeadline = differenceInDays(new Date(goal.target_date), new Date());
    const remaining = goal.target_amount - goal.saved_amount;
    const monthsUntilDeadline = differenceInMonths(new Date(goal.target_date), new Date()) || 1;
    const monthlyTarget = remaining / monthsUntilDeadline;

    const [addAmount, setAddAmount] = useState('');

    const getIcon = (category: string) => {
      switch (category) {
        case 'Technology':return '💻';
        case 'Travel':return '🏖️';
        case 'Emergency':return '🛡️';
        case 'Transportation':return '🏍️';
        case 'Education':return '🎓';
        case 'Housing':return '🏠';
        case 'Investment':return '📈';
        default:return '🎯';
      }
    };

    const getColor = (priority: string) => {
      switch (priority) {
        case 'high':return 'from-red-400 to-red-600';
        case 'medium':return 'from-yellow-400 to-yellow-600';
        case 'low':return 'from-green-400 to-green-600';
        default:return 'from-blue-400 to-blue-600';
      }
    };

    return (
      <Card className={`hover:shadow-lg transition-all duration-300 overflow-hidden`} data-id="u70cphy14" data-path="src/pages/SavingsGoalsPage.tsx">
        <div className={`h-2 bg-gradient-to-r ${getColor(goal.priority)}`} data-id="utal4fmqc" data-path="src/pages/SavingsGoalsPage.tsx"></div>
        <CardContent className="p-6" data-id="uw5m1c0sn" data-path="src/pages/SavingsGoalsPage.tsx">
          <div className="flex items-center justify-between mb-4" data-id="nl3pw013n" data-path="src/pages/SavingsGoalsPage.tsx">
            <div className="flex items-center space-x-3" data-id="xhjkahj0q" data-path="src/pages/SavingsGoalsPage.tsx">
              <span className="text-3xl" data-id="z6wxfbo1v" data-path="src/pages/SavingsGoalsPage.tsx">{getIcon(goal.category)}</span>
              <div data-id="xdoqj9a1d" data-path="src/pages/SavingsGoalsPage.tsx">
                <h3 className="font-bold text-lg text-gray-900" data-id="7mt0imykq" data-path="src/pages/SavingsGoalsPage.tsx">{goal.title}</h3>
                <div className="flex items-center gap-2 mt-1" data-id="ogcxqm0qs" data-path="src/pages/SavingsGoalsPage.tsx">
                  <Badge variant="secondary" className={getCategoryStyle(goal.category)} data-id="h4kpfx9lx" data-path="src/pages/SavingsGoalsPage.tsx">
                    {getCategoryIcon(goal.category)}
                    <span className="ml-1" data-id="vz1gyacdi" data-path="src/pages/SavingsGoalsPage.tsx">{goal.category}</span>
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                    goal.priority === 'high' ? 'border-red-300 text-red-700' :
                    goal.priority === 'medium' ? 'border-yellow-300 text-yellow-700' :
                    'border-green-300 text-green-700'}`
                    } data-id="p42axdqbe" data-path="src/pages/SavingsGoalsPage.tsx">
                    {goal.priority} priority
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-1" data-id="ybfqei5fo" data-path="src/pages/SavingsGoalsPage.tsx">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingGoal(goal)} data-id="os73549ex" data-path="src/pages/SavingsGoalsPage.tsx">
                <Edit className="h-4 w-4" data-id="afy2cc0x2" data-path="src/pages/SavingsGoalsPage.tsx" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteGoal(goal.ID)}
                className="text-red-600 hover:text-red-700" data-id="kv07nhwxs" data-path="src/pages/SavingsGoalsPage.tsx">
                <Trash2 className="h-4 w-4" data-id="t9wwchkpg" data-path="src/pages/SavingsGoalsPage.tsx" />
              </Button>
            </div>
          </div>

          {goal.description &&
          <p className="text-sm text-gray-600 mb-4" data-id="bazkpzl8q" data-path="src/pages/SavingsGoalsPage.tsx">{goal.description}</p>
          }

          <div className="space-y-4" data-id="1trmue9m5" data-path="src/pages/SavingsGoalsPage.tsx">
            <div data-id="fupxvfd66" data-path="src/pages/SavingsGoalsPage.tsx">
              <div className="flex justify-between text-sm mb-2" data-id="4o8t017rs" data-path="src/pages/SavingsGoalsPage.tsx">
                <span className="font-medium" data-id="hjo25v495" data-path="src/pages/SavingsGoalsPage.tsx">Progress</span>
                <span className="font-bold text-lg" data-id="ypdhkvxyv" data-path="src/pages/SavingsGoalsPage.tsx">
                  ₹{goal.saved_amount.toLocaleString()} / ₹{goal.target_amount.toLocaleString()}
                </span>
              </div>
              <Progress value={progress} className="h-3" data-id="zvqs2j0me" data-path="src/pages/SavingsGoalsPage.tsx" />
              <div className="flex justify-between text-xs text-gray-500 mt-1" data-id="b3ak43r7n" data-path="src/pages/SavingsGoalsPage.tsx">
                <span data-id="4jq9fwmk2" data-path="src/pages/SavingsGoalsPage.tsx">{progress.toFixed(1)}% completed</span>
                <span data-id="9efqqkhq3" data-path="src/pages/SavingsGoalsPage.tsx">₹{remaining.toLocaleString()} remaining</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm" data-id="9saulkxxe" data-path="src/pages/SavingsGoalsPage.tsx">
              <div className="bg-gray-50 p-3 rounded-lg" data-id="tsn2vjg1d" data-path="src/pages/SavingsGoalsPage.tsx">
                <div className="text-gray-600" data-id="lq0ypxd0j" data-path="src/pages/SavingsGoalsPage.tsx">Target per month</div>
                <div className="font-semibold" data-id="n70vyqav7" data-path="src/pages/SavingsGoalsPage.tsx">₹{Math.round(monthlyTarget).toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg" data-id="p9wijhzcu" data-path="src/pages/SavingsGoalsPage.tsx">
                <div className="text-gray-600" data-id="cqxaa829a" data-path="src/pages/SavingsGoalsPage.tsx">Deadline</div>
                <div className={`font-semibold ${
                daysUntilDeadline < 0 ? 'text-red-600' :
                daysUntilDeadline <= 30 ? 'text-orange-600' : 'text-green-600'}`
                } data-id="sda199x3x" data-path="src/pages/SavingsGoalsPage.tsx">
                  {daysUntilDeadline < 0 ?
                  `${Math.abs(daysUntilDeadline)} days overdue` :
                  daysUntilDeadline === 0 ? 'Due today' :
                  `${daysUntilDeadline} days left`
                  }
                </div>
              </div>
            </div>

            {progress < 100 &&
            <div className="flex gap-2" data-id="eusmpywt0" data-path="src/pages/SavingsGoalsPage.tsx">
                <Input
                type="number"
                placeholder="Amount to add"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                className="flex-1" data-id="at11u8mgc" data-path="src/pages/SavingsGoalsPage.tsx" />
                <Button
                onClick={() => {
                  const amount = parseFloat(addAmount);
                  if (amount > 0) {
                    handleAddMoney(goal.ID, amount);
                    setAddAmount('');
                  }
                }}
                disabled={!addAmount || parseFloat(addAmount) <= 0}
                size="sm" data-id="e4a5tkntz" data-path="src/pages/SavingsGoalsPage.tsx">
                  Add
                </Button>
              </div>
            }

            {progress >= 100 &&
            <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg" data-id="fb2e5v727" data-path="src/pages/SavingsGoalsPage.tsx">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" data-id="ho5b5zkpp" data-path="src/pages/SavingsGoalsPage.tsx" />
                <span className="font-semibold text-green-700" data-id="86uj0rx6k" data-path="src/pages/SavingsGoalsPage.tsx">Goal Completed! 🎉</span>
              </div>
            }
          </div>
        </CardContent>
      </Card>);

  };

  const AddGoalForm = () =>
  <div className="space-y-4" data-id="gt88x1wrw" data-path="src/pages/SavingsGoalsPage.tsx">
      <div className="space-y-2" data-id="79rgivqub" data-path="src/pages/SavingsGoalsPage.tsx">
        <Label htmlFor="title" data-id="mljudat79" data-path="src/pages/SavingsGoalsPage.tsx">Goal Title</Label>
        <Input
        id="title"
        placeholder="e.g., New Laptop"
        value={newGoal.title}
        onChange={(e) => setNewGoal((prev) => ({ ...prev, title: e.target.value }))} data-id="f5r17j4e4" data-path="src/pages/SavingsGoalsPage.tsx" />

      </div>

      <div className="grid grid-cols-2 gap-4" data-id="v0wna42j5" data-path="src/pages/SavingsGoalsPage.tsx">
        <div className="space-y-2" data-id="top4f9yxv" data-path="src/pages/SavingsGoalsPage.tsx">
          <Label htmlFor="targetAmount" data-id="td6qw8dgo" data-path="src/pages/SavingsGoalsPage.tsx">Target Amount (₹)</Label>
          <Input
          id="targetAmount"
          type="number"
          placeholder="50000"
          value={newGoal.targetAmount}
          onChange={(e) => setNewGoal((prev) => ({ ...prev, targetAmount: e.target.value }))} data-id="zvi0mc3q1" data-path="src/pages/SavingsGoalsPage.tsx" />

        </div>

        <div className="space-y-2" data-id="r2ycwlkdv" data-path="src/pages/SavingsGoalsPage.tsx">
          <Label htmlFor="category" data-id="g874eco5t" data-path="src/pages/SavingsGoalsPage.tsx">Category</Label>
          <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={newGoal.category}
          onChange={(e) => setNewGoal((prev) => ({ ...prev, category: e.target.value }))} data-id="kgvxr7jzf" data-path="src/pages/SavingsGoalsPage.tsx">

            <option value="" data-id="207lqkjpp" data-path="src/pages/SavingsGoalsPage.tsx">Select category</option>
            {goalCategories.map((category) =>
          <option key={category.name} value={category.name} data-id="xsx7p41xh" data-path="src/pages/SavingsGoalsPage.tsx">
                {category.name}
              </option>
          )}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4" data-id="frd1u9y32" data-path="src/pages/SavingsGoalsPage.tsx">
        <div className="space-y-2" data-id="8zychdcp4" data-path="src/pages/SavingsGoalsPage.tsx">
          <Label data-id="xo1sev2w7" data-path="src/pages/SavingsGoalsPage.tsx">Target Date</Label>
          <Popover data-id="x3j04xcxd" data-path="src/pages/SavingsGoalsPage.tsx">
            <PopoverTrigger asChild data-id="1xiif26xh" data-path="src/pages/SavingsGoalsPage.tsx">
              <Button variant="outline" className="w-full justify-start text-left font-normal" data-id="eyca0nrbt" data-path="src/pages/SavingsGoalsPage.tsx">
                <CalendarIcon className="mr-2 h-4 w-4" data-id="4ibtqief2" data-path="src/pages/SavingsGoalsPage.tsx" />
                {format(newGoal.deadline, 'PPP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" data-id="cpeytvxrg" data-path="src/pages/SavingsGoalsPage.tsx">
              <Calendar
              mode="single"
              selected={newGoal.deadline}
              onSelect={(date) => date && setNewGoal((prev) => ({ ...prev, deadline: date }))}
              initialFocus data-id="n2r43xiek" data-path="src/pages/SavingsGoalsPage.tsx" />

            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2" data-id="h6mqdhjfr" data-path="src/pages/SavingsGoalsPage.tsx">
          <Label htmlFor="priority" data-id="ev3nbduah" data-path="src/pages/SavingsGoalsPage.tsx">Priority</Label>
          <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={newGoal.priority}
          onChange={(e) => setNewGoal((prev) => ({ ...prev, priority: e.target.value }))} data-id="x4adlflxl" data-path="src/pages/SavingsGoalsPage.tsx">

            <option value="low" data-id="ioxpgealq" data-path="src/pages/SavingsGoalsPage.tsx">Low</option>
            <option value="medium" data-id="dkvb0966e" data-path="src/pages/SavingsGoalsPage.tsx">Medium</option>
            <option value="high" data-id="a97pmiy5f" data-path="src/pages/SavingsGoalsPage.tsx">High</option>
          </select>
        </div>
      </div>

      <div className="space-y-2" data-id="b06jzno6y" data-path="src/pages/SavingsGoalsPage.tsx">
        <Label htmlFor="description" data-id="ll2vek66z" data-path="src/pages/SavingsGoalsPage.tsx">Description (Optional)</Label>
        <Textarea
        id="description"
        placeholder="Brief description of your goal..."
        value={newGoal.description}
        onChange={(e) => setNewGoal((prev) => ({ ...prev, description: e.target.value }))} data-id="0xf57rmq5" data-path="src/pages/SavingsGoalsPage.tsx" />

      </div>

      <div className="flex space-x-2 pt-4" data-id="wmtzdotjf" data-path="src/pages/SavingsGoalsPage.tsx">
        <Button onClick={handleAddGoal} className="flex-1" data-id="y8w0ddtqe" data-path="src/pages/SavingsGoalsPage.tsx">
          Create Goal
        </Button>
        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} data-id="1mg0n5kky" data-path="src/pages/SavingsGoalsPage.tsx">
          Cancel
        </Button>
      </div>
    </div>;

  if (loading) {
    return (
      <DashboardLayout data-id="bhxkl83ob" data-path="src/pages/SavingsGoalsPage.tsx">
        <div className="p-6 space-y-6" data-id="44nd51hhd" data-path="src/pages/SavingsGoalsPage.tsx">
          <div className="flex items-center justify-center h-64" data-id="0ullzjx18" data-path="src/pages/SavingsGoalsPage.tsx">
            <div className="text-lg" data-id="a1q9meqj9" data-path="src/pages/SavingsGoalsPage.tsx">Loading savings goals...</div>
          </div>
        </div>
      </DashboardLayout>);

  }

  return (
    <DashboardLayout data-id="kqh5pke7j" data-path="src/pages/SavingsGoalsPage.tsx">
      <div className="p-6 space-y-6" data-id="bbo4lu92m" data-path="src/pages/SavingsGoalsPage.tsx">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" data-id="yhkmooa69" data-path="src/pages/SavingsGoalsPage.tsx">
          <div data-id="q73szm6p2" data-path="src/pages/SavingsGoalsPage.tsx">
            <h1 className="text-3xl font-bold text-gray-900" data-id="6j8lbws5i" data-path="src/pages/SavingsGoalsPage.tsx">Savings Goals</h1>
            <p className="text-gray-600" data-id="szo7fp0gg" data-path="src/pages/SavingsGoalsPage.tsx">Set targets and track your progress toward financial goals</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} data-id="40kf45pvx" data-path="src/pages/SavingsGoalsPage.tsx">
            <DialogTrigger asChild data-id="ccf4xcfpg" data-path="src/pages/SavingsGoalsPage.tsx">
              <Button className="bg-green-600 hover:bg-green-700" data-id="lu02302dw" data-path="src/pages/SavingsGoalsPage.tsx">
                <Plus className="h-4 w-4 mr-2" data-id="d8z4x9jp4" data-path="src/pages/SavingsGoalsPage.tsx" />
                New Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" data-id="ij3ydzpx7" data-path="src/pages/SavingsGoalsPage.tsx">
              <DialogHeader data-id="axj8ybter" data-path="src/pages/SavingsGoalsPage.tsx">
                <DialogTitle data-id="3057nds6n" data-path="src/pages/SavingsGoalsPage.tsx">Create New Savings Goal</DialogTitle>
                <DialogDescription data-id="lwu5ma42g" data-path="src/pages/SavingsGoalsPage.tsx">
                  Set a financial target and track your progress.
                </DialogDescription>
              </DialogHeader>
              <AddGoalForm data-id="v9i4udri7" data-path="src/pages/SavingsGoalsPage.tsx" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-id="49m77u1my" data-path="src/pages/SavingsGoalsPage.tsx">
          <Card data-id="8eopubls2" data-path="src/pages/SavingsGoalsPage.tsx">
            <CardContent className="p-6" data-id="r3lju7op2" data-path="src/pages/SavingsGoalsPage.tsx">
              <div className="flex items-center justify-between" data-id="6h3o3jm6u" data-path="src/pages/SavingsGoalsPage.tsx">
                <div data-id="b6b1sfo2r" data-path="src/pages/SavingsGoalsPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="zpuha3zo7" data-path="src/pages/SavingsGoalsPage.tsx">Total Goals</p>
                  <p className="text-2xl font-bold text-gray-900" data-id="j4x1uul9f" data-path="src/pages/SavingsGoalsPage.tsx">{goals.length}</p>
                </div>
                <Target className="h-8 w-8 text-gray-600" data-id="ill1c7pds" data-path="src/pages/SavingsGoalsPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="bc6iblfuj" data-path="src/pages/SavingsGoalsPage.tsx">
            <CardContent className="p-6" data-id="i2138excv" data-path="src/pages/SavingsGoalsPage.tsx">
              <div className="flex items-center justify-between" data-id="gc0qusles" data-path="src/pages/SavingsGoalsPage.tsx">
                <div data-id="g5ezs0hmu" data-path="src/pages/SavingsGoalsPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="ptz945th8" data-path="src/pages/SavingsGoalsPage.tsx">Total Saved</p>
                  <p className="text-2xl font-bold text-green-600" data-id="jw7ik4gkf" data-path="src/pages/SavingsGoalsPage.tsx">₹{totalSavedAmount.toLocaleString()}</p>
                </div>
                <PiggyBank className="h-8 w-8 text-green-600" data-id="ggr4vr21n" data-path="src/pages/SavingsGoalsPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="3cx461y51" data-path="src/pages/SavingsGoalsPage.tsx">
            <CardContent className="p-6" data-id="mbzh7eb78" data-path="src/pages/SavingsGoalsPage.tsx">
              <div className="flex items-center justify-between" data-id="s5wcw8zyv" data-path="src/pages/SavingsGoalsPage.tsx">
                <div data-id="koowowcru" data-path="src/pages/SavingsGoalsPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="ej250mzb1" data-path="src/pages/SavingsGoalsPage.tsx">Target Amount</p>
                  <p className="text-2xl font-bold text-blue-600" data-id="17e6fe482" data-path="src/pages/SavingsGoalsPage.tsx">₹{totalTargetAmount.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" data-id="2aw0ntaq9" data-path="src/pages/SavingsGoalsPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="v9euehc0r" data-path="src/pages/SavingsGoalsPage.tsx">
            <CardContent className="p-6" data-id="lsdotf3xq" data-path="src/pages/SavingsGoalsPage.tsx">
              <div className="flex items-center justify-between" data-id="3def4b4p8" data-path="src/pages/SavingsGoalsPage.tsx">
                <div data-id="7hg708aso" data-path="src/pages/SavingsGoalsPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="16jzmyaga" data-path="src/pages/SavingsGoalsPage.tsx">Completed</p>
                  <p className="text-2xl font-bold text-purple-600" data-id="l15bvk758" data-path="src/pages/SavingsGoalsPage.tsx">{completedGoals.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" data-id="w44bff871" data-path="src/pages/SavingsGoalsPage.tsx" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card data-id="qt0j5gall" data-path="src/pages/SavingsGoalsPage.tsx">
          <CardHeader data-id="qc8811336" data-path="src/pages/SavingsGoalsPage.tsx">
            <CardTitle data-id="61a3fwnvq" data-path="src/pages/SavingsGoalsPage.tsx">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent data-id="kke8gk880" data-path="src/pages/SavingsGoalsPage.tsx">
            <div className="space-y-4" data-id="lp1wiio8g" data-path="src/pages/SavingsGoalsPage.tsx">
              <div data-id="yzeuwo3q7" data-path="src/pages/SavingsGoalsPage.tsx">
                <div className="flex justify-between text-lg font-semibold mb-2" data-id="twame5pjx" data-path="src/pages/SavingsGoalsPage.tsx">
                  <span data-id="3hp067e9b" data-path="src/pages/SavingsGoalsPage.tsx">Total Savings Progress</span>
                  <span data-id="iupyypyb6" data-path="src/pages/SavingsGoalsPage.tsx">₹{totalSavedAmount.toLocaleString()} / ₹{totalTargetAmount.toLocaleString()}</span>
                </div>
                <Progress value={totalSavedAmount / totalTargetAmount * 100} className="h-4" data-id="gsf1vlfih" data-path="src/pages/SavingsGoalsPage.tsx" />
                <div className="flex justify-between text-sm text-gray-500 mt-1" data-id="jnf6cqxw4" data-path="src/pages/SavingsGoalsPage.tsx">
                  <span data-id="tx0xr1fuk" data-path="src/pages/SavingsGoalsPage.tsx">{(totalSavedAmount / totalTargetAmount * 100).toFixed(1)}% of total goals</span>
                  <span data-id="shoez9w83" data-path="src/pages/SavingsGoalsPage.tsx">₹{(totalTargetAmount - totalSavedAmount).toLocaleString()} remaining</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card data-id="idqalbshw" data-path="src/pages/SavingsGoalsPage.tsx">
          <CardContent className="p-6" data-id="ga2rxkbxn" data-path="src/pages/SavingsGoalsPage.tsx">
            <div className="flex flex-wrap gap-2" data-id="y1thtfg5h" data-path="src/pages/SavingsGoalsPage.tsx">
              {[
              { value: 'all', label: 'All Goals', count: goals.length },
              { value: 'on_track', label: 'On Track', count: goals.filter((g) => {
                  const progress = g.saved_amount / g.target_amount * 100;
                  const days = differenceInDays(new Date(g.target_date), new Date());
                  return progress < 100 && days > 30;
                }).length },
              { value: 'urgent', label: 'Urgent', count: goals.filter((g) => {
                  const progress = g.saved_amount / g.target_amount * 100;
                  const days = differenceInDays(new Date(g.target_date), new Date());
                  return progress < 100 && days <= 30 && days >= 0;
                }).length },
              { value: 'completed', label: 'Completed', count: completedGoals.length },
              { value: 'overdue', label: 'Overdue', count: goals.filter((g) => {
                  const progress = g.saved_amount / g.target_amount * 100;
                  const days = differenceInDays(new Date(g.target_date), new Date());
                  return progress < 100 && days < 0;
                }).length }].
              map((filter) =>
              <Button
                key={filter.value}
                variant={selectedFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.value)}
                className="relative" data-id="01ntbvph6" data-path="src/pages/SavingsGoalsPage.tsx">

                  {filter.label}
                  {filter.count > 0 &&
                <Badge variant="secondary" className="ml-2 text-xs" data-id="cir0t4f6p" data-path="src/pages/SavingsGoalsPage.tsx">
                      {filter.count}
                    </Badge>
                }
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-id="tisimbuge" data-path="src/pages/SavingsGoalsPage.tsx">
          {filteredGoals.length === 0 ?
          <div className="col-span-full text-center py-12" data-id="dozym2f35" data-path="src/pages/SavingsGoalsPage.tsx">
              <PiggyBank className="h-12 w-12 text-gray-400 mx-auto mb-4" data-id="zbb0d2aev" data-path="src/pages/SavingsGoalsPage.tsx" />
              <h3 className="text-lg font-medium text-gray-900 mb-2" data-id="oic6kvjkt" data-path="src/pages/SavingsGoalsPage.tsx">No goals found</h3>
              <p className="text-gray-600 mb-4" data-id="p558noogq" data-path="src/pages/SavingsGoalsPage.tsx">
                {selectedFilter !== 'all' ?
              'No goals match the selected filter.' :
              'Start planning your financial future by creating your first savings goal.'
              }
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)} data-id="mzk2m488g" data-path="src/pages/SavingsGoalsPage.tsx">
                <Plus className="h-4 w-4 mr-2" data-id="xqlmexr22" data-path="src/pages/SavingsGoalsPage.tsx" />
                Create First Goal
              </Button>
            </div> :

          filteredGoals.map((goal) =>
          <GoalCard key={goal.ID} goal={goal} data-id="qbgibjk7z" data-path="src/pages/SavingsGoalsPage.tsx" />
          )
          }
        </div>

        {/* Tips */}
        <Card data-id="isephlwk6" data-path="src/pages/SavingsGoalsPage.tsx">
          <CardHeader data-id="41ofki7kn" data-path="src/pages/SavingsGoalsPage.tsx">
            <CardTitle data-id="c833uk6yq" data-path="src/pages/SavingsGoalsPage.tsx">Savings Tips</CardTitle>
          </CardHeader>
          <CardContent data-id="e0wa1yavj" data-path="src/pages/SavingsGoalsPage.tsx">
            <div className="grid md:grid-cols-2 gap-4" data-id="fcediyo2o" data-path="src/pages/SavingsGoalsPage.tsx">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg" data-id="szi6o6hjo" data-path="src/pages/SavingsGoalsPage.tsx">
                <div className="bg-blue-100 p-2 rounded-full" data-id="ncxzfopr8" data-path="src/pages/SavingsGoalsPage.tsx">
                  <Target className="h-5 w-5 text-blue-600" data-id="vyb8jwbjp" data-path="src/pages/SavingsGoalsPage.tsx" />
                </div>
                <div data-id="msa3eofkx" data-path="src/pages/SavingsGoalsPage.tsx">
                  <h4 className="font-medium text-blue-900" data-id="a8jzxotk0" data-path="src/pages/SavingsGoalsPage.tsx">Set SMART Goals</h4>
                  <p className="text-sm text-blue-700 mt-1" data-id="n84cue59q" data-path="src/pages/SavingsGoalsPage.tsx">
                    Make your goals Specific, Measurable, Achievable, Relevant, and Time-bound.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg" data-id="8s5tia2ov" data-path="src/pages/SavingsGoalsPage.tsx">
                <div className="bg-green-100 p-2 rounded-full" data-id="fw0eb4b7k" data-path="src/pages/SavingsGoalsPage.tsx">
                  <PiggyBank className="h-5 w-5 text-green-600" data-id="qlyxvsmuk" data-path="src/pages/SavingsGoalsPage.tsx" />
                </div>
                <div data-id="3g2appn8v" data-path="src/pages/SavingsGoalsPage.tsx">
                  <h4 className="font-medium text-green-900" data-id="plkkavnx9" data-path="src/pages/SavingsGoalsPage.tsx">Automate Savings</h4>
                  <p className="text-sm text-green-700 mt-1" data-id="drfc51sv0" data-path="src/pages/SavingsGoalsPage.tsx">
                    Set up automatic transfers to reach your goals consistently.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>);

};

export default SavingsGoalsPage;