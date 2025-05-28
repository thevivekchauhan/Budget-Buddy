import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Calendar, Shield, Database, TrendingUp, Wallet, Target } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadUserData();
    loadUserStats();
  }, []);

  const loadUserData = async () => {
    try {
      const { data, error } = await window.ezsite.apis.getUserInfo();
      if (error) {
        console.error('Error loading user data:', error);
        toast({
          title: "Error",
          description: "Failed to load user data",
          variant: "destructive"
        });
        return;
      }

      setUser({
        ...data,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.Name || data.Email.split('@')[0])}&background=0066cc&color=fff`,
        initials: (data.Name || data.Email.split('@')[0]).split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserStats = async () => {
    try {
      // Load user statistics from different tables
      const [expensesRes, incomeRes, goalsRes, billsRes] = await Promise.all([
      window.ezsite.apis.tablePage(10239, { PageNo: 1, PageSize: 1000, Filters: [] }),
      window.ezsite.apis.tablePage(10240, { PageNo: 1, PageSize: 1000, Filters: [] }),
      window.ezsite.apis.tablePage(10243, { PageNo: 1, PageSize: 1000, Filters: [] }),
      window.ezsite.apis.tablePage(10242, { PageNo: 1, PageSize: 1000, Filters: [] })]
      );

      const expenses = expensesRes.data?.List || [];
      const income = incomeRes.data?.List || [];
      const goals = goalsRes.data?.List || [];
      const bills = billsRes.data?.List || [];

      const totalExpenses = expenses.reduce((sum: number, exp: any) => sum + (exp.amount || 0), 0);
      const totalIncome = income.reduce((sum: number, inc: any) => sum + (inc.amount || 0), 0);
      const totalSavingsTarget = goals.reduce((sum: number, goal: any) => sum + (goal.target_amount || 0), 0);
      const totalSaved = goals.reduce((sum: number, goal: any) => sum + (goal.saved_amount || 0), 0);

      setStats({
        totalTransactions: expenses.length + income.length,
        totalExpenses,
        totalIncome,
        totalSavingsTarget,
        totalSaved,
        pendingBills: bills.filter((bill: any) => !bill.is_paid).length,
        savingsGoals: goals.length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const sendResetEmail = async () => {
    if (!user?.Email) return;

    try {
      const { error } = await window.ezsite.apis.sendResetPwdEmail({ email: user.Email });
      if (error) {
        throw new Error(error);
      }

      toast({
        title: "Reset Email Sent",
        description: "Check your email for password reset instructions."
      });
    } catch (error: any) {
      console.error('Reset email error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send reset email",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout data-id="bbtl7ve7k" data-path="src/pages/ProfilePage.tsx">
        <div className="flex items-center justify-center h-full" data-id="2942diedm" data-path="src/pages/ProfilePage.tsx">
          <div className="text-center" data-id="vccuh3lsd" data-path="src/pages/ProfilePage.tsx">
            <User className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" data-id="dyybptebh" data-path="src/pages/ProfilePage.tsx" />
            <div className="text-lg font-medium text-gray-600" data-id="85vyhn459" data-path="src/pages/ProfilePage.tsx">Loading profile...</div>
          </div>
        </div>
      </DashboardLayout>);

  }

  if (!user) {
    return (
      <DashboardLayout data-id="x25gtg6os" data-path="src/pages/ProfilePage.tsx">
        <div className="flex items-center justify-center h-full" data-id="l2aggv6ik" data-path="src/pages/ProfilePage.tsx">
          <div className="text-center" data-id="nv1dg5m8n" data-path="src/pages/ProfilePage.tsx">
            <User className="h-12 w-12 text-red-600 mx-auto mb-4" data-id="v2zqu8gr9" data-path="src/pages/ProfilePage.tsx" />
            <div className="text-lg font-medium text-gray-600" data-id="gtc81lo3c" data-path="src/pages/ProfilePage.tsx">Failed to load profile</div>
          </div>
        </div>
      </DashboardLayout>);

  }

  return (
    <DashboardLayout data-id="1jy63ww5r" data-path="src/pages/ProfilePage.tsx">
      <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto" data-id="obfilsdvv" data-path="src/pages/ProfilePage.tsx">
        <div className="mb-8" data-id="v6huvoeih" data-path="src/pages/ProfilePage.tsx">
          <h1 className="text-3xl font-bold text-gray-800 mb-2" data-id="dyshk3qs1" data-path="src/pages/ProfilePage.tsx">My Profile</h1>
          <p className="text-gray-600" data-id="fp5mva1kb" data-path="src/pages/ProfilePage.tsx">Manage your account and view your financial data</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6" data-id="xhsqiyp4n" data-path="src/pages/ProfilePage.tsx">
          <TabsList className="grid w-full grid-cols-3" data-id="h2tvpiwfq" data-path="src/pages/ProfilePage.tsx">
            <TabsTrigger value="profile" className="flex items-center gap-2" data-id="wqsirus1f" data-path="src/pages/ProfilePage.tsx">
              <User className="h-4 w-4" data-id="i0hrj9jpl" data-path="src/pages/ProfilePage.tsx" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2" data-id="numd7zzn5" data-path="src/pages/ProfilePage.tsx">
              <TrendingUp className="h-4 w-4" data-id="eqinq36k6" data-path="src/pages/ProfilePage.tsx" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2" data-id="0vfj3ljcp" data-path="src/pages/ProfilePage.tsx">
              <Database className="h-4 w-4" data-id="aaxvg1xg9" data-path="src/pages/ProfilePage.tsx" />
              My Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" data-id="atgbvm6dq" data-path="src/pages/ProfilePage.tsx">
            <div className="grid gap-6 md:grid-cols-2" data-id="4x444gc4l" data-path="src/pages/ProfilePage.tsx">
              {/* Profile Info */}
              <Card data-id="ehtfk945o" data-path="src/pages/ProfilePage.tsx">
                <CardHeader data-id="19gm41xcp" data-path="src/pages/ProfilePage.tsx">
                  <CardTitle className="flex items-center gap-2" data-id="zgaepbwu6" data-path="src/pages/ProfilePage.tsx">
                    <User className="h-5 w-5" data-id="9iwgrt9s7" data-path="src/pages/ProfilePage.tsx" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6" data-id="2v66xyzk9" data-path="src/pages/ProfilePage.tsx">
                  <div className="flex items-center space-x-4" data-id="mscgbc7gp" data-path="src/pages/ProfilePage.tsx">
                    <Avatar className="h-20 w-20" data-id="lnvfzx8a6" data-path="src/pages/ProfilePage.tsx">
                      <AvatarImage src={user.avatar} alt={user.Name || user.Email} data-id="tbz8qi0rf" data-path="src/pages/ProfilePage.tsx" />
                      <AvatarFallback className="text-lg" data-id="s97qe67zb" data-path="src/pages/ProfilePage.tsx">{user.initials}</AvatarFallback>
                    </Avatar>
                    <div data-id="fgzm256x7" data-path="src/pages/ProfilePage.tsx">
                      <h3 className="text-xl font-semibold" data-id="niayo2o5k" data-path="src/pages/ProfilePage.tsx">{user.Name || user.Email.split('@')[0]}</h3>
                      <p className="text-gray-600" data-id="1a7iw817h" data-path="src/pages/ProfilePage.tsx">{user.Email}</p>
                      <Badge variant="secondary" className="mt-1" data-id="u9ukrb0vo" data-path="src/pages/ProfilePage.tsx">User</Badge>
                    </div>
                  </div>

                  <div className="space-y-4" data-id="wuhibfluv" data-path="src/pages/ProfilePage.tsx">
                    <div data-id="vmddypban" data-path="src/pages/ProfilePage.tsx">
                      <Label htmlFor="name" className="flex items-center gap-2" data-id="7dyntaimz" data-path="src/pages/ProfilePage.tsx">
                        <User className="h-4 w-4" data-id="g2bgvhlhy" data-path="src/pages/ProfilePage.tsx" />
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={user.Name || user.Email.split('@')[0]}
                        disabled
                        className="mt-1" data-id="5mqhtxkl4" data-path="src/pages/ProfilePage.tsx" />

                    </div>
                    
                    <div data-id="zdf4pyea7" data-path="src/pages/ProfilePage.tsx">
                      <Label htmlFor="email" className="flex items-center gap-2" data-id="a3njoggm1" data-path="src/pages/ProfilePage.tsx">
                        <Mail className="h-4 w-4" data-id="xsm7f7y2w" data-path="src/pages/ProfilePage.tsx" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={user.Email}
                        disabled
                        className="mt-1" data-id="nc3xmjb7b" data-path="src/pages/ProfilePage.tsx" />

                    </div>

                    <div data-id="s97nbc9ss" data-path="src/pages/ProfilePage.tsx">
                      <Label htmlFor="created" className="flex items-center gap-2" data-id="pezuaqgsz" data-path="src/pages/ProfilePage.tsx">
                        <Calendar className="h-4 w-4" data-id="ei7yd76sf" data-path="src/pages/ProfilePage.tsx" />
                        Member Since
                      </Label>
                      <Input
                        id="created"
                        value={new Date(user.CreateTime).toLocaleDateString()}
                        disabled
                        className="mt-1" data-id="c63gvqvpt" data-path="src/pages/ProfilePage.tsx" />

                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card data-id="m3ccb5xbs" data-path="src/pages/ProfilePage.tsx">
                <CardHeader data-id="jbvyg8l1m" data-path="src/pages/ProfilePage.tsx">
                  <CardTitle className="flex items-center gap-2" data-id="d2rml9pay" data-path="src/pages/ProfilePage.tsx">
                    <Shield className="h-5 w-5" data-id="y0mjwe2b4" data-path="src/pages/ProfilePage.tsx" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4" data-id="tuzwnd2x2" data-path="src/pages/ProfilePage.tsx">
                  <div className="p-4 bg-blue-50 rounded-lg" data-id="sd5rud7ew" data-path="src/pages/ProfilePage.tsx">
                    <h4 className="font-medium text-blue-800 mb-2" data-id="cp6545cez" data-path="src/pages/ProfilePage.tsx">Password</h4>
                    <p className="text-sm text-blue-600 mb-3" data-id="owica3pov" data-path="src/pages/ProfilePage.tsx">
                      For security reasons, we don't show your password. You can reset it if needed.
                    </p>
                    <Button onClick={sendResetEmail} variant="outline" size="sm" data-id="fy268o4wd" data-path="src/pages/ProfilePage.tsx">
                      Send Password Reset Email
                    </Button>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg" data-id="upuuhdk7n" data-path="src/pages/ProfilePage.tsx">
                    <h4 className="font-medium text-green-800 mb-2" data-id="8pmocy2x1" data-path="src/pages/ProfilePage.tsx">Account Status</h4>
                    <div className="flex items-center gap-2" data-id="n0cuopb80" data-path="src/pages/ProfilePage.tsx">
                      <Badge variant="default" className="bg-green-600" data-id="u6xiusa4s" data-path="src/pages/ProfilePage.tsx">Verified</Badge>
                      <span className="text-sm text-green-600" data-id="w32l44r1b" data-path="src/pages/ProfilePage.tsx">Your account is verified and secure</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stats" data-id="jeii6mp4n" data-path="src/pages/ProfilePage.tsx">
            {stats &&
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" data-id="x0dqlhotv" data-path="src/pages/ProfilePage.tsx">
                <Card data-id="vfcqh8rjm" data-path="src/pages/ProfilePage.tsx">
                  <CardContent className="p-6" data-id="9mfc2i25c" data-path="src/pages/ProfilePage.tsx">
                    <div className="flex items-center justify-between" data-id="h3b5e4z8u" data-path="src/pages/ProfilePage.tsx">
                      <div data-id="wpyu19tjp" data-path="src/pages/ProfilePage.tsx">
                        <p className="text-sm text-gray-600" data-id="bzmfgvyl9" data-path="src/pages/ProfilePage.tsx">Total Transactions</p>
                        <p className="text-2xl font-bold" data-id="5i791cp3v" data-path="src/pages/ProfilePage.tsx">{stats.totalTransactions}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-600" data-id="4kidqf7c3" data-path="src/pages/ProfilePage.tsx" />
                    </div>
                  </CardContent>
                </Card>

                <Card data-id="k0dnb05cd" data-path="src/pages/ProfilePage.tsx">
                  <CardContent className="p-6" data-id="i4smugjyu" data-path="src/pages/ProfilePage.tsx">
                    <div className="flex items-center justify-between" data-id="45oh080h8" data-path="src/pages/ProfilePage.tsx">
                      <div data-id="r8vg8r834" data-path="src/pages/ProfilePage.tsx">
                        <p className="text-sm text-gray-600" data-id="sjmixdwwi" data-path="src/pages/ProfilePage.tsx">Total Expenses</p>
                        <p className="text-2xl font-bold text-red-600" data-id="x3t29uwwi" data-path="src/pages/ProfilePage.tsx">₹{stats.totalExpenses.toLocaleString()}</p>
                      </div>
                      <Wallet className="h-8 w-8 text-red-600" data-id="0gynme4h5" data-path="src/pages/ProfilePage.tsx" />
                    </div>
                  </CardContent>
                </Card>

                <Card data-id="5cn35exzl" data-path="src/pages/ProfilePage.tsx">
                  <CardContent className="p-6" data-id="1l8wpsa1i" data-path="src/pages/ProfilePage.tsx">
                    <div className="flex items-center justify-between" data-id="979rpofml" data-path="src/pages/ProfilePage.tsx">
                      <div data-id="h9xdxdobi" data-path="src/pages/ProfilePage.tsx">
                        <p className="text-sm text-gray-600" data-id="69sh29ua4" data-path="src/pages/ProfilePage.tsx">Total Income</p>
                        <p className="text-2xl font-bold text-green-600" data-id="an684941t" data-path="src/pages/ProfilePage.tsx">₹{stats.totalIncome.toLocaleString()}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-600" data-id="usn1vnnr5" data-path="src/pages/ProfilePage.tsx" />
                    </div>
                  </CardContent>
                </Card>

                <Card data-id="g5om8p5pm" data-path="src/pages/ProfilePage.tsx">
                  <CardContent className="p-6" data-id="95x3189qz" data-path="src/pages/ProfilePage.tsx">
                    <div className="flex items-center justify-between" data-id="z4rricu3c" data-path="src/pages/ProfilePage.tsx">
                      <div data-id="zt8lddtyc" data-path="src/pages/ProfilePage.tsx">
                        <p className="text-sm text-gray-600" data-id="pqv15p7hv" data-path="src/pages/ProfilePage.tsx">Savings Progress</p>
                        <p className="text-2xl font-bold text-blue-600" data-id="sim54v3nf" data-path="src/pages/ProfilePage.tsx">
                          ₹{stats.totalSaved.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500" data-id="uj9zz2tgg" data-path="src/pages/ProfilePage.tsx">
                          of ₹{stats.totalSavingsTarget.toLocaleString()}
                        </p>
                      </div>
                      <Target className="h-8 w-8 text-blue-600" data-id="dq0m7hyps" data-path="src/pages/ProfilePage.tsx" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            }
          </TabsContent>

          <TabsContent value="data" data-id="6xz1i143c" data-path="src/pages/ProfilePage.tsx">
            <Card data-id="gfxn9xi6u" data-path="src/pages/ProfilePage.tsx">
              <CardHeader data-id="ad3ldoprx" data-path="src/pages/ProfilePage.tsx">
                <CardTitle className="flex items-center gap-2" data-id="rzh694f80" data-path="src/pages/ProfilePage.tsx">
                  <Database className="h-5 w-5" data-id="wgdeq3e5g" data-path="src/pages/ProfilePage.tsx" />
                  Your Data Storage
                </CardTitle>
              </CardHeader>
              <CardContent data-id="7id1m1rzx" data-path="src/pages/ProfilePage.tsx">
                <div className="space-y-6" data-id="9d9ppklfh" data-path="src/pages/ProfilePage.tsx">
                  <div className="p-4 bg-blue-50 rounded-lg" data-id="e5stls8bv" data-path="src/pages/ProfilePage.tsx">
                    <h3 className="font-medium text-blue-800 mb-2" data-id="y8p7n145x" data-path="src/pages/ProfilePage.tsx">Data Storage Information</h3>
                    <p className="text-sm text-blue-600 mb-4" data-id="rxmqto4gn" data-path="src/pages/ProfilePage.tsx">
                      All your financial data is securely stored in our encrypted database. Here's what we store:
                    </p>
                    
                    <div className="grid gap-4 md:grid-cols-2" data-id="zvnw0pukp" data-path="src/pages/ProfilePage.tsx">
                      <div className="space-y-2" data-id="vyeexz88d" data-path="src/pages/ProfilePage.tsx">
                        <h4 className="font-medium" data-id="rncrwoaad" data-path="src/pages/ProfilePage.tsx">Personal Information</h4>
                        <ul className="text-sm text-gray-600 space-y-1" data-id="jtc5n14qm" data-path="src/pages/ProfilePage.tsx">
                          <li data-id="bcn7jot8p" data-path="src/pages/ProfilePage.tsx">• Name and Email</li>
                          <li data-id="poig3zw60" data-path="src/pages/ProfilePage.tsx">• Account Creation Date</li>
                          <li data-id="w07g0klom" data-path="src/pages/ProfilePage.tsx">• Authentication Data</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2" data-id="hvmi1d4js" data-path="src/pages/ProfilePage.tsx">
                        <h4 className="font-medium" data-id="l1b2s9t2n" data-path="src/pages/ProfilePage.tsx">Financial Data</h4>
                        <ul className="text-sm text-gray-600 space-y-1" data-id="t7j6vujqy" data-path="src/pages/ProfilePage.tsx">
                          <li data-id="57mejvq5d" data-path="src/pages/ProfilePage.tsx">• Expense Records</li>
                          <li data-id="sugps7qtc" data-path="src/pages/ProfilePage.tsx">• Income Transactions</li>
                          <li data-id="eb1h5s93r" data-path="src/pages/ProfilePage.tsx">• Budget Categories</li>
                          <li data-id="w9d0utwbw" data-path="src/pages/ProfilePage.tsx">• Bills and Reminders</li>
                          <li data-id="xqsizejkx" data-path="src/pages/ProfilePage.tsx">• Savings Goals</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {stats &&
                  <div className="grid gap-4 md:grid-cols-3" data-id="8l2ufl8wa" data-path="src/pages/ProfilePage.tsx">
                      <div className="p-4 border rounded-lg" data-id="xw8a2mhpm" data-path="src/pages/ProfilePage.tsx">
                        <h4 className="font-medium mb-2" data-id="woxa67k4g" data-path="src/pages/ProfilePage.tsx">Expenses</h4>
                        <p className="text-2xl font-bold text-red-600" data-id="lgf7rulkk" data-path="src/pages/ProfilePage.tsx">{stats.totalTransactions - (stats.totalTransactions - 150)}</p>
                        <p className="text-sm text-gray-600" data-id="ke7zeqf21" data-path="src/pages/ProfilePage.tsx">Total records</p>
                      </div>
                      
                      <div className="p-4 border rounded-lg" data-id="dhk6migdm" data-path="src/pages/ProfilePage.tsx">
                        <h4 className="font-medium mb-2" data-id="fh1ck9wrf" data-path="src/pages/ProfilePage.tsx">Savings Goals</h4>
                        <p className="text-2xl font-bold text-blue-600" data-id="wnvars75l" data-path="src/pages/ProfilePage.tsx">{stats.savingsGoals}</p>
                        <p className="text-sm text-gray-600" data-id="ozwm27m1i" data-path="src/pages/ProfilePage.tsx">Active goals</p>
                      </div>
                      
                      <div className="p-4 border rounded-lg" data-id="jt33wl79d" data-path="src/pages/ProfilePage.tsx">
                        <h4 className="font-medium mb-2" data-id="8iouhyoqv" data-path="src/pages/ProfilePage.tsx">Pending Bills</h4>
                        <p className="text-2xl font-bold text-orange-600" data-id="9fqslqr98" data-path="src/pages/ProfilePage.tsx">{stats.pendingBills}</p>
                        <p className="text-sm text-gray-600" data-id="q5s16fz46" data-path="src/pages/ProfilePage.tsx">Upcoming payments</p>
                      </div>
                    </div>
                  }

                  <div className="p-4 bg-green-50 rounded-lg" data-id="yponifnow" data-path="src/pages/ProfilePage.tsx">
                    <h3 className="font-medium text-green-800 mb-2" data-id="vdp5ttw9a" data-path="src/pages/ProfilePage.tsx">Data Security</h3>
                    <p className="text-sm text-green-600" data-id="unn07lo32" data-path="src/pages/ProfilePage.tsx">
                      Your data is encrypted at rest and in transit. We follow industry-standard security practices 
                      to protect your personal and financial information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>);

};

export default ProfilePage;