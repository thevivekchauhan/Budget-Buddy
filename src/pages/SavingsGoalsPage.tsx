import { useState } from 'react';
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

const SavingsGoalsPage = () => {
  const [goals, setGoals] = useState([
  {
    id: 1,
    title: 'New Laptop',
    targetAmount: 50000,
    savedAmount: 22500,
    deadline: '2024-06-30',
    category: 'Technology',
    description: 'Gaming laptop for college projects',
    monthlyTarget: 4583,
    icon: '💻',
    color: 'from-blue-400 to-blue-600',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Summer Trip to Goa',
    targetAmount: 15000,
    savedAmount: 6750,
    deadline: '2024-04-30',
    category: 'Travel',
    description: 'Beach vacation with friends',
    monthlyTarget: 2750,
    icon: '🏖️',
    color: 'from-green-400 to-green-600',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Emergency Fund',
    targetAmount: 25000,
    savedAmount: 8000,
    deadline: '2024-12-31',
    category: 'Emergency',
    description: '6 months of expenses as emergency fund',
    monthlyTarget: 1417,
    icon: '🛡️',
    color: 'from-red-400 to-red-600',
    priority: 'high'
  },
  {
    id: 4,
    title: 'New Phone',
    targetAmount: 30000,
    savedAmount: 12000,
    deadline: '2024-08-15',
    category: 'Technology',
    description: 'Upgrade to latest smartphone',
    monthlyTarget: 3000,
    icon: '📱',
    color: 'from-purple-400 to-purple-600',
    priority: 'low'
  },
  {
    id: 5,
    title: 'Motorcycle',
    targetAmount: 80000,
    savedAmount: 15000,
    deadline: '2025-02-28',
    category: 'Transportation',
    description: 'Second-hand bike for daily commute',
    monthlyTarget: 5200,
    icon: '🏍️',
    color: 'from-orange-400 to-orange-600',
    priority: 'medium'
  }]
  );

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const goalCategories = [
  { name: 'Technology', icon: <Smartphone className="h-4 w-4" data-id="73i3yzzpi" data-path="src/pages/SavingsGoalsPage.tsx" />, color: 'bg-blue-100 text-blue-800' },
  { name: 'Travel', icon: <Plane className="h-4 w-4" data-id="6b58q5rpc" data-path="src/pages/SavingsGoalsPage.tsx" />, color: 'bg-green-100 text-green-800' },
  { name: 'Emergency', icon: <Heart className="h-4 w-4" data-id="l98la0ygv" data-path="src/pages/SavingsGoalsPage.tsx" />, color: 'bg-red-100 text-red-800' },
  { name: 'Transportation', icon: <Car className="h-4 w-4" data-id="dpibch2h7" data-path="src/pages/SavingsGoalsPage.tsx" />, color: 'bg-orange-100 text-orange-800' },
  { name: 'Education', icon: <GraduationCap className="h-4 w-4" data-id="3w36k1zwq" data-path="src/pages/SavingsGoalsPage.tsx" />, color: 'bg-indigo-100 text-indigo-800' },
  { name: 'Housing', icon: <Home className="h-4 w-4" data-id="hdsdxmazu" data-path="src/pages/SavingsGoalsPage.tsx" />, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Investment', icon: <TrendingUp className="h-4 w-4" data-id="nsmyq8rrx" data-path="src/pages/SavingsGoalsPage.tsx" />, color: 'bg-emerald-100 text-emerald-800' },
  { name: 'Others', icon: <Gift className="h-4 w-4" data-id="xdc0vgn3y" data-path="src/pages/SavingsGoalsPage.tsx" />, color: 'bg-gray-100 text-gray-800' }];


  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    deadline: new Date(),
    category: '',
    description: '',
    priority: 'medium'
  });

  const getGoalStatus = (goal: typeof goals[0]) => {
    const progress = goal.savedAmount / goal.targetAmount * 100;
    const daysUntilDeadline = differenceInDays(new Date(goal.deadline), new Date());

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
    return category ? category.icon : <Gift className="h-4 w-4" data-id="mr8b2lovt" data-path="src/pages/SavingsGoalsPage.tsx" />;
  };

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const monthsUntilDeadline = differenceInMonths(newGoal.deadline, new Date()) || 1;
    const monthlyTarget = parseFloat(newGoal.targetAmount) / monthsUntilDeadline;

    const goal = {
      id: Date.now(),
      ...newGoal,
      targetAmount: parseFloat(newGoal.targetAmount),
      savedAmount: 0,
      deadline: format(newGoal.deadline, 'yyyy-MM-dd'),
      monthlyTarget: monthlyTarget,
      icon: goalCategories.find((cat) => cat.name === newGoal.category)?.name === 'Technology' ? '💻' : '🎯',
      color: 'from-purple-400 to-purple-600'
    };

    setGoals((prev) => [goal, ...prev]);
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
      description: `${goal.title} goal has been created.`
    });
  };

  const handleAddMoney = (id: number, amount: number) => {
    setGoals((prev) => prev.map((goal) =>
    goal.id === id ? { ...goal, savedAmount: goal.savedAmount + amount } : goal
    ));

    const goal = goals.find((g) => g.id === id);
    toast({
      title: "Money Added",
      description: `₹${amount} added to ${goal?.title}`
    });
  };

  const handleDeleteGoal = (id: number) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
    toast({
      title: "Goal Deleted",
      description: "The savings goal has been removed."
    });
  };

  const filteredGoals = goals.filter((goal) => {
    const progress = goal.savedAmount / goal.targetAmount * 100;
    const daysUntilDeadline = differenceInDays(new Date(goal.deadline), new Date());

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

  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSavedAmount = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter((goal) => goal.savedAmount / goal.targetAmount * 100 >= 100);

  const GoalCard = ({ goal }: {goal: typeof goals[0];}) => {
    const progress = goal.savedAmount / goal.targetAmount * 100;
    const status = getGoalStatus(goal);
    const daysUntilDeadline = differenceInDays(new Date(goal.deadline), new Date());
    const remaining = goal.targetAmount - goal.savedAmount;

    const [addAmount, setAddAmount] = useState('');

    return (
      <Card className={`hover:shadow-lg transition-all duration-300 overflow-hidden`} data-id="zoewswty0" data-path="src/pages/SavingsGoalsPage.tsx">
        <div className={`h-2 bg-gradient-to-r ${goal.color}`} data-id="tj2gfe882" data-path="src/pages/SavingsGoalsPage.tsx"></div>
        <CardContent className="p-6" data-id="ly1tdkfkw" data-path="src/pages/SavingsGoalsPage.tsx">
          <div className="flex items-center justify-between mb-4" data-id="wgoo8fo1k" data-path="src/pages/SavingsGoalsPage.tsx">
            <div className="flex items-center space-x-3" data-id="9e62jyo75" data-path="src/pages/SavingsGoalsPage.tsx">
              <span className="text-3xl" data-id="es9fkzcta" data-path="src/pages/SavingsGoalsPage.tsx">{goal.icon}</span>
              <div data-id="z40dlr63p" data-path="src/pages/SavingsGoalsPage.tsx">
                <h3 className="font-bold text-lg text-gray-900" data-id="b4zap6c8x" data-path="src/pages/SavingsGoalsPage.tsx">{goal.title}</h3>
                <div className="flex items-center gap-2 mt-1" data-id="b25rsnvq7" data-path="src/pages/SavingsGoalsPage.tsx">
                  <Badge variant="secondary" className={getCategoryStyle(goal.category)} data-id="b8h6hwbjm" data-path="src/pages/SavingsGoalsPage.tsx">
                    {getCategoryIcon(goal.category)}
                    <span className="ml-1" data-id="fm8j4gly3" data-path="src/pages/SavingsGoalsPage.tsx">{goal.category}</span>
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                    goal.priority === 'high' ? 'border-red-300 text-red-700' :
                    goal.priority === 'medium' ? 'border-yellow-300 text-yellow-700' :
                    'border-green-300 text-green-700'}`
                    } data-id="4xqdllncw" data-path="src/pages/SavingsGoalsPage.tsx">

                    {goal.priority} priority
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-1" data-id="o5eqtkvdm" data-path="src/pages/SavingsGoalsPage.tsx">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingGoal(goal)} data-id="iydk26f5h" data-path="src/pages/SavingsGoalsPage.tsx">

                <Edit className="h-4 w-4" data-id="c0k86jj8x" data-path="src/pages/SavingsGoalsPage.tsx" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteGoal(goal.id)}
                className="text-red-600 hover:text-red-700" data-id="6drl96pbs" data-path="src/pages/SavingsGoalsPage.tsx">

                <Trash2 className="h-4 w-4" data-id="gx6wvg2d8" data-path="src/pages/SavingsGoalsPage.tsx" />
              </Button>
            </div>
          </div>

          {goal.description &&
          <p className="text-sm text-gray-600 mb-4" data-id="2ame0wgbn" data-path="src/pages/SavingsGoalsPage.tsx">{goal.description}</p>
          }

          <div className="space-y-4" data-id="nqoiv1qvu" data-path="src/pages/SavingsGoalsPage.tsx">
            <div data-id="ppbirzy17" data-path="src/pages/SavingsGoalsPage.tsx">
              <div className="flex justify-between text-sm mb-2" data-id="sb96uby5e" data-path="src/pages/SavingsGoalsPage.tsx">
                <span className="font-medium" data-id="tr5va7t38" data-path="src/pages/SavingsGoalsPage.tsx">Progress</span>
                <span className="font-bold text-lg" data-id="t8aoc6dvj" data-path="src/pages/SavingsGoalsPage.tsx">
                  ₹{goal.savedAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}
                </span>
              </div>
              <Progress value={progress} className="h-3" data-id="mqclycnku" data-path="src/pages/SavingsGoalsPage.tsx" />
              <div className="flex justify-between text-xs text-gray-500 mt-1" data-id="r3bel20jn" data-path="src/pages/SavingsGoalsPage.tsx">
                <span data-id="wt6e9mltx" data-path="src/pages/SavingsGoalsPage.tsx">{progress.toFixed(1)}% completed</span>
                <span data-id="pz2jqdyq0" data-path="src/pages/SavingsGoalsPage.tsx">₹{remaining.toLocaleString()} remaining</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm" data-id="xunwojv00" data-path="src/pages/SavingsGoalsPage.tsx">
              <div className="bg-gray-50 p-3 rounded-lg" data-id="oeqnnqfko" data-path="src/pages/SavingsGoalsPage.tsx">
                <div className="text-gray-600" data-id="6h2gz11bo" data-path="src/pages/SavingsGoalsPage.tsx">Target per month</div>
                <div className="font-semibold" data-id="zwn7sk24a" data-path="src/pages/SavingsGoalsPage.tsx">₹{goal.monthlyTarget.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg" data-id="egbh3w559" data-path="src/pages/SavingsGoalsPage.tsx">
                <div className="text-gray-600" data-id="vq7mhwea0" data-path="src/pages/SavingsGoalsPage.tsx">Deadline</div>
                <div className={`font-semibold ${
                daysUntilDeadline < 0 ? 'text-red-600' :
                daysUntilDeadline <= 30 ? 'text-orange-600' : 'text-green-600'}`
                } data-id="se9sy2095" data-path="src/pages/SavingsGoalsPage.tsx">
                  {daysUntilDeadline < 0 ?
                  `${Math.abs(daysUntilDeadline)} days overdue` :
                  daysUntilDeadline === 0 ? 'Due today' :
                  `${daysUntilDeadline} days left`
                  }
                </div>
              </div>
            </div>

            {progress < 100 &&
            <div className="flex gap-2" data-id="tu0gifmtl" data-path="src/pages/SavingsGoalsPage.tsx">
                <Input
                type="number"
                placeholder="Amount to add"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                className="flex-1" data-id="t1lu5onel" data-path="src/pages/SavingsGoalsPage.tsx" />

                <Button
                onClick={() => {
                  const amount = parseFloat(addAmount);
                  if (amount > 0) {
                    handleAddMoney(goal.id, amount);
                    setAddAmount('');
                  }
                }}
                disabled={!addAmount || parseFloat(addAmount) <= 0}
                size="sm" data-id="4pd80kec6" data-path="src/pages/SavingsGoalsPage.tsx">

                  Add
                </Button>
              </div>
            }

            {progress >= 100 &&
            <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg" data-id="btlqv47vj" data-path="src/pages/SavingsGoalsPage.tsx">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" data-id="tfqslwrws" data-path="src/pages/SavingsGoalsPage.tsx" />
                <span className="font-semibold text-green-700" data-id="uffgksltb" data-path="src/pages/SavingsGoalsPage.tsx">Goal Completed! 🎉</span>
              </div>
            }
          </div>
        </CardContent>
      </Card>);

  };

  const AddGoalForm = () =>
  <div className="space-y-4" data-id="yq9pydp50" data-path="src/pages/SavingsGoalsPage.tsx">
      <div className="space-y-2" data-id="tvuoss4ku" data-path="src/pages/SavingsGoalsPage.tsx">
        <Label htmlFor="title" data-id="h0kf2thck" data-path="src/pages/SavingsGoalsPage.tsx">Goal Title</Label>
        <Input
        id="title"
        placeholder="e.g., New Laptop"
        value={newGoal.title}
        onChange={(e) => setNewGoal((prev) => ({ ...prev, title: e.target.value }))} data-id="nw6a57u1y" data-path="src/pages/SavingsGoalsPage.tsx" />

      </div>

      <div className="grid grid-cols-2 gap-4" data-id="6fognesxn" data-path="src/pages/SavingsGoalsPage.tsx">
        <div className="space-y-2" data-id="3u3pskznv" data-path="src/pages/SavingsGoalsPage.tsx">
          <Label htmlFor="targetAmount" data-id="ezn4hdbqx" data-path="src/pages/SavingsGoalsPage.tsx">Target Amount (₹)</Label>
          <Input
          id="targetAmount"
          type="number"
          placeholder="50000"
          value={newGoal.targetAmount}
          onChange={(e) => setNewGoal((prev) => ({ ...prev, targetAmount: e.target.value }))} data-id="1x2pv7hkr" data-path="src/pages/SavingsGoalsPage.tsx" />

        </div>

        <div className="space-y-2" data-id="fxp87n2q0" data-path="src/pages/SavingsGoalsPage.tsx">
          <Label htmlFor="category" data-id="x225nvbdx" data-path="src/pages/SavingsGoalsPage.tsx">Category</Label>
          <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={newGoal.category}
          onChange={(e) => setNewGoal((prev) => ({ ...prev, category: e.target.value }))} data-id="ssduzbtuu" data-path="src/pages/SavingsGoalsPage.tsx">

            <option value="" data-id="z01zfkv9z" data-path="src/pages/SavingsGoalsPage.tsx">Select category</option>
            {goalCategories.map((category) =>
          <option key={category.name} value={category.name} data-id="sfik3m8z3" data-path="src/pages/SavingsGoalsPage.tsx">
                {category.name}
              </option>
          )}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4" data-id="zxtudxktp" data-path="src/pages/SavingsGoalsPage.tsx">
        <div className="space-y-2" data-id="y6evhgpze" data-path="src/pages/SavingsGoalsPage.tsx">
          <Label data-id="kq2yp04q0" data-path="src/pages/SavingsGoalsPage.tsx">Target Date</Label>
          <Popover data-id="jj5lelmlk" data-path="src/pages/SavingsGoalsPage.tsx">
            <PopoverTrigger asChild data-id="tcha8scj8" data-path="src/pages/SavingsGoalsPage.tsx">
              <Button variant="outline" className="w-full justify-start text-left font-normal" data-id="zvv1oisyh" data-path="src/pages/SavingsGoalsPage.tsx">
                <CalendarIcon className="mr-2 h-4 w-4" data-id="tmnyz1skt" data-path="src/pages/SavingsGoalsPage.tsx" />
                {format(newGoal.deadline, 'PPP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" data-id="wxlf69f1k" data-path="src/pages/SavingsGoalsPage.tsx">
              <Calendar
              mode="single"
              selected={newGoal.deadline}
              onSelect={(date) => date && setNewGoal((prev) => ({ ...prev, deadline: date }))}
              initialFocus data-id="qkdyvscb6" data-path="src/pages/SavingsGoalsPage.tsx" />

            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2" data-id="wv2n2xl9g" data-path="src/pages/SavingsGoalsPage.tsx">
          <Label htmlFor="priority" data-id="bp05srsyv" data-path="src/pages/SavingsGoalsPage.tsx">Priority</Label>
          <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={newGoal.priority}
          onChange={(e) => setNewGoal((prev) => ({ ...prev, priority: e.target.value }))} data-id="tph6kg5h4" data-path="src/pages/SavingsGoalsPage.tsx">

            <option value="low" data-id="ls6y3iv57" data-path="src/pages/SavingsGoalsPage.tsx">Low</option>
            <option value="medium" data-id="u3lqnqi6c" data-path="src/pages/SavingsGoalsPage.tsx">Medium</option>
            <option value="high" data-id="2y02m51c9" data-path="src/pages/SavingsGoalsPage.tsx">High</option>
          </select>
        </div>
      </div>

      <div className="space-y-2" data-id="wrguw81jh" data-path="src/pages/SavingsGoalsPage.tsx">
        <Label htmlFor="description" data-id="jd3r9ox0y" data-path="src/pages/SavingsGoalsPage.tsx">Description (Optional)</Label>
        <Textarea
        id="description"
        placeholder="Brief description of your goal..."
        value={newGoal.description}
        onChange={(e) => setNewGoal((prev) => ({ ...prev, description: e.target.value }))} data-id="pvw0c6vqb" data-path="src/pages/SavingsGoalsPage.tsx" />

      </div>

      <div className="flex space-x-2 pt-4" data-id="35d4jezk0" data-path="src/pages/SavingsGoalsPage.tsx">
        <Button onClick={handleAddGoal} className="flex-1" data-id="cfqnv85xn" data-path="src/pages/SavingsGoalsPage.tsx">
          Create Goal
        </Button>
        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} data-id="92kayj84k" data-path="src/pages/SavingsGoalsPage.tsx">
          Cancel
        </Button>
      </div>
    </div>;


  return (
    <DashboardLayout data-id="qlyxtlno6" data-path="src/pages/SavingsGoalsPage.tsx">
      <div className="p-6 space-y-6" data-id="eq6ub63w5" data-path="src/pages/SavingsGoalsPage.tsx">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" data-id="9lpm1szvs" data-path="src/pages/SavingsGoalsPage.tsx">
          <div data-id="rik0plf9q" data-path="src/pages/SavingsGoalsPage.tsx">
            <h1 className="text-3xl font-bold text-gray-900" data-id="xyxvwf39g" data-path="src/pages/SavingsGoalsPage.tsx">Savings Goals</h1>
            <p className="text-gray-600" data-id="cjdeo1547" data-path="src/pages/SavingsGoalsPage.tsx">Set targets and track your progress toward financial goals</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} data-id="c0ob1v9lj" data-path="src/pages/SavingsGoalsPage.tsx">
            <DialogTrigger asChild data-id="ctagy7cd2" data-path="src/pages/SavingsGoalsPage.tsx">
              <Button className="bg-green-600 hover:bg-green-700" data-id="vwp9viayd" data-path="src/pages/SavingsGoalsPage.tsx">
                <Plus className="h-4 w-4 mr-2" data-id="5oblz78jd" data-path="src/pages/SavingsGoalsPage.tsx" />
                New Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" data-id="o1ju9xjeh" data-path="src/pages/SavingsGoalsPage.tsx">
              <DialogHeader data-id="w5qw6w6yx" data-path="src/pages/SavingsGoalsPage.tsx">
                <DialogTitle data-id="3m9ivon8t" data-path="src/pages/SavingsGoalsPage.tsx">Create New Savings Goal</DialogTitle>
                <DialogDescription data-id="8tfg5bwil" data-path="src/pages/SavingsGoalsPage.tsx">
                  Set a financial target and track your progress.
                </DialogDescription>
              </DialogHeader>
              <AddGoalForm data-id="xarv1haal" data-path="src/pages/SavingsGoalsPage.tsx" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-id="8bfmo95oy" data-path="src/pages/SavingsGoalsPage.tsx">
          <Card data-id="hzp63aofq" data-path="src/pages/SavingsGoalsPage.tsx">
            <CardContent className="p-6" data-id="9fjjxc0iu" data-path="src/pages/SavingsGoalsPage.tsx">
              <div className="flex items-center justify-between" data-id="kyggy0cjb" data-path="src/pages/SavingsGoalsPage.tsx">
                <div data-id="qifwf1h0m" data-path="src/pages/SavingsGoalsPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="z52o5odqf" data-path="src/pages/SavingsGoalsPage.tsx">Total Goals</p>
                  <p className="text-2xl font-bold text-gray-900" data-id="efjlnsj3c" data-path="src/pages/SavingsGoalsPage.tsx">{goals.length}</p>
                </div>
                <Target className="h-8 w-8 text-gray-600" data-id="xwmyiz33g" data-path="src/pages/SavingsGoalsPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="wkn9dljji" data-path="src/pages/SavingsGoalsPage.tsx">
            <CardContent className="p-6" data-id="djfj6o8a3" data-path="src/pages/SavingsGoalsPage.tsx">
              <div className="flex items-center justify-between" data-id="bbb2qp617" data-path="src/pages/SavingsGoalsPage.tsx">
                <div data-id="ek324zeue" data-path="src/pages/SavingsGoalsPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="q0dzno821" data-path="src/pages/SavingsGoalsPage.tsx">Total Saved</p>
                  <p className="text-2xl font-bold text-green-600" data-id="p2cjnv9dg" data-path="src/pages/SavingsGoalsPage.tsx">₹{totalSavedAmount.toLocaleString()}</p>
                </div>
                <PiggyBank className="h-8 w-8 text-green-600" data-id="dm5sdhkdl" data-path="src/pages/SavingsGoalsPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="zjs2xd7ux" data-path="src/pages/SavingsGoalsPage.tsx">
            <CardContent className="p-6" data-id="u2whd7d6k" data-path="src/pages/SavingsGoalsPage.tsx">
              <div className="flex items-center justify-between" data-id="alb4g3f6f" data-path="src/pages/SavingsGoalsPage.tsx">
                <div data-id="i9w0a2exl" data-path="src/pages/SavingsGoalsPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="y08ejk1na" data-path="src/pages/SavingsGoalsPage.tsx">Target Amount</p>
                  <p className="text-2xl font-bold text-blue-600" data-id="e2czs05jp" data-path="src/pages/SavingsGoalsPage.tsx">₹{totalTargetAmount.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" data-id="ddpevqsge" data-path="src/pages/SavingsGoalsPage.tsx" />
              </div>
            </CardContent>
          </Card>

          <Card data-id="d269cionu" data-path="src/pages/SavingsGoalsPage.tsx">
            <CardContent className="p-6" data-id="rc7f6yjpe" data-path="src/pages/SavingsGoalsPage.tsx">
              <div className="flex items-center justify-between" data-id="bkq83qour" data-path="src/pages/SavingsGoalsPage.tsx">
                <div data-id="t7s239nl7" data-path="src/pages/SavingsGoalsPage.tsx">
                  <p className="text-sm font-medium text-gray-600" data-id="3k8aji0wh" data-path="src/pages/SavingsGoalsPage.tsx">Completed</p>
                  <p className="text-2xl font-bold text-purple-600" data-id="itz6hezmg" data-path="src/pages/SavingsGoalsPage.tsx">{completedGoals.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" data-id="54fxqze5c" data-path="src/pages/SavingsGoalsPage.tsx" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card data-id="uu9qeqz0j" data-path="src/pages/SavingsGoalsPage.tsx">
          <CardHeader data-id="bduuu4xks" data-path="src/pages/SavingsGoalsPage.tsx">
            <CardTitle data-id="pyh2zkdy2" data-path="src/pages/SavingsGoalsPage.tsx">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent data-id="n1qaarp81" data-path="src/pages/SavingsGoalsPage.tsx">
            <div className="space-y-4" data-id="2cfu1cgev" data-path="src/pages/SavingsGoalsPage.tsx">
              <div data-id="g9nbt4hhm" data-path="src/pages/SavingsGoalsPage.tsx">
                <div className="flex justify-between text-lg font-semibold mb-2" data-id="7imzo1day" data-path="src/pages/SavingsGoalsPage.tsx">
                  <span data-id="tj0oyopls" data-path="src/pages/SavingsGoalsPage.tsx">Total Savings Progress</span>
                  <span data-id="mqkidpf4z" data-path="src/pages/SavingsGoalsPage.tsx">₹{totalSavedAmount.toLocaleString()} / ₹{totalTargetAmount.toLocaleString()}</span>
                </div>
                <Progress value={totalSavedAmount / totalTargetAmount * 100} className="h-4" data-id="7n0dg111l" data-path="src/pages/SavingsGoalsPage.tsx" />
                <div className="flex justify-between text-sm text-gray-500 mt-1" data-id="67544bf6m" data-path="src/pages/SavingsGoalsPage.tsx">
                  <span data-id="m3mjhtoob" data-path="src/pages/SavingsGoalsPage.tsx">{(totalSavedAmount / totalTargetAmount * 100).toFixed(1)}% of total goals</span>
                  <span data-id="aq639t6bc" data-path="src/pages/SavingsGoalsPage.tsx">₹{(totalTargetAmount - totalSavedAmount).toLocaleString()} remaining</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card data-id="qa0x471ha" data-path="src/pages/SavingsGoalsPage.tsx">
          <CardContent className="p-6" data-id="kytttyenl" data-path="src/pages/SavingsGoalsPage.tsx">
            <div className="flex flex-wrap gap-2" data-id="myuycr7bf" data-path="src/pages/SavingsGoalsPage.tsx">
              {[
              { value: 'all', label: 'All Goals', count: goals.length },
              { value: 'on_track', label: 'On Track', count: goals.filter((g) => {
                  const progress = g.savedAmount / g.targetAmount * 100;
                  const days = differenceInDays(new Date(g.deadline), new Date());
                  return progress < 100 && days > 30;
                }).length },
              { value: 'urgent', label: 'Urgent', count: goals.filter((g) => {
                  const progress = g.savedAmount / g.targetAmount * 100;
                  const days = differenceInDays(new Date(g.deadline), new Date());
                  return progress < 100 && days <= 30 && days >= 0;
                }).length },
              { value: 'completed', label: 'Completed', count: completedGoals.length },
              { value: 'overdue', label: 'Overdue', count: goals.filter((g) => {
                  const progress = g.savedAmount / g.targetAmount * 100;
                  const days = differenceInDays(new Date(g.deadline), new Date());
                  return progress < 100 && days < 0;
                }).length }].
              map((filter) =>
              <Button
                key={filter.value}
                variant={selectedFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.value)}
                className="relative" data-id="ctxzisv7o" data-path="src/pages/SavingsGoalsPage.tsx">

                  {filter.label}
                  {filter.count > 0 &&
                <Badge variant="secondary" className="ml-2 text-xs" data-id="td8h8102a" data-path="src/pages/SavingsGoalsPage.tsx">
                      {filter.count}
                    </Badge>
                }
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-id="hoa4gnp6h" data-path="src/pages/SavingsGoalsPage.tsx">
          {filteredGoals.length === 0 ?
          <div className="col-span-full text-center py-12" data-id="32bxma6va" data-path="src/pages/SavingsGoalsPage.tsx">
              <PiggyBank className="h-12 w-12 text-gray-400 mx-auto mb-4" data-id="qdhi98mka" data-path="src/pages/SavingsGoalsPage.tsx" />
              <h3 className="text-lg font-medium text-gray-900 mb-2" data-id="x9k0r56ad" data-path="src/pages/SavingsGoalsPage.tsx">No goals found</h3>
              <p className="text-gray-600 mb-4" data-id="g33apc61b" data-path="src/pages/SavingsGoalsPage.tsx">
                {selectedFilter !== 'all' ?
              'No goals match the selected filter.' :
              'Start planning your financial future by creating your first savings goal.'
              }
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)} data-id="86dhmhi6f" data-path="src/pages/SavingsGoalsPage.tsx">
                <Plus className="h-4 w-4 mr-2" data-id="ikqmobg36" data-path="src/pages/SavingsGoalsPage.tsx" />
                Create First Goal
              </Button>
            </div> :

          filteredGoals.map((goal) =>
          <GoalCard key={goal.id} goal={goal} data-id="k7gpsl1dh" data-path="src/pages/SavingsGoalsPage.tsx" />
          )
          }
        </div>

        {/* Tips */}
        <Card data-id="ppw6yc5am" data-path="src/pages/SavingsGoalsPage.tsx">
          <CardHeader data-id="38lg2fi3n" data-path="src/pages/SavingsGoalsPage.tsx">
            <CardTitle data-id="nbjksdoo5" data-path="src/pages/SavingsGoalsPage.tsx">Savings Tips</CardTitle>
          </CardHeader>
          <CardContent data-id="ultouosf2" data-path="src/pages/SavingsGoalsPage.tsx">
            <div className="grid md:grid-cols-2 gap-4" data-id="hbdrf5zek" data-path="src/pages/SavingsGoalsPage.tsx">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg" data-id="eh7xmwfb6" data-path="src/pages/SavingsGoalsPage.tsx">
                <div className="bg-blue-100 p-2 rounded-full" data-id="1m94yvhhi" data-path="src/pages/SavingsGoalsPage.tsx">
                  <Target className="h-5 w-5 text-blue-600" data-id="owykhfsvy" data-path="src/pages/SavingsGoalsPage.tsx" />
                </div>
                <div data-id="oczo52juq" data-path="src/pages/SavingsGoalsPage.tsx">
                  <h4 className="font-medium text-blue-900" data-id="dt9id3el8" data-path="src/pages/SavingsGoalsPage.tsx">Set SMART Goals</h4>
                  <p className="text-sm text-blue-700 mt-1" data-id="clshfqmfm" data-path="src/pages/SavingsGoalsPage.tsx">
                    Make your goals Specific, Measurable, Achievable, Relevant, and Time-bound.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg" data-id="pzneywbrq" data-path="src/pages/SavingsGoalsPage.tsx">
                <div className="bg-green-100 p-2 rounded-full" data-id="jms0lndbj" data-path="src/pages/SavingsGoalsPage.tsx">
                  <PiggyBank className="h-5 w-5 text-green-600" data-id="ww5toz3d2" data-path="src/pages/SavingsGoalsPage.tsx" />
                </div>
                <div data-id="qzslvf9ol" data-path="src/pages/SavingsGoalsPage.tsx">
                  <h4 className="font-medium text-green-900" data-id="vsa1kd9mm" data-path="src/pages/SavingsGoalsPage.tsx">Automate Savings</h4>
                  <p className="text-sm text-green-700 mt-1" data-id="d2zx2kpnm" data-path="src/pages/SavingsGoalsPage.tsx">
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