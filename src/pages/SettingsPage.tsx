import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Settings,
  Bell,
  Palette,
  Shield,
  Download,
  Trash2,
  Mail,
  Smartphone,
  DollarSign,
  Calendar } from
'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    billReminders: true,
    budgetAlerts: true,
    goalUpdates: false,
    emailDigest: true,
    pushNotifications: true
  });

  const [preferences, setPreferences] = useState({
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY',
    weekStart: 'Monday',
    theme: 'light'
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
    toast({
      title: "Settings Updated",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${value ? 'enabled' : 'disabled'}`
    });
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
    toast({
      title: "Preferences Updated",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} changed to ${value}`
    });
  };

  const exportData = () => {
    toast({
      title: "Export Started",
      description: "Your data export will be ready shortly. Check your email."
    });
  };

  const deleteAccount = () => {
    toast({
      title: "Account Deletion",
      description: "Please contact support to delete your account.",
      variant: "destructive"
    });
  };

  return (
    <DashboardLayout data-id="mj04719y5" data-path="src/pages/SettingsPage.tsx">
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto" data-id="0no2hus9s" data-path="src/pages/SettingsPage.tsx">
        <div className="mb-8" data-id="pds340nvx" data-path="src/pages/SettingsPage.tsx">
          <h1 className="text-3xl font-bold text-gray-800 mb-2" data-id="j9x968f2h" data-path="src/pages/SettingsPage.tsx">Settings</h1>
          <p className="text-gray-600" data-id="cq6ftb9t7" data-path="src/pages/SettingsPage.tsx">Manage your account preferences and app settings</p>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6" data-id="6sgcpc0yj" data-path="src/pages/SettingsPage.tsx">
          <TabsList className="grid w-full grid-cols-4" data-id="l3fmomfwd" data-path="src/pages/SettingsPage.tsx">
            <TabsTrigger value="notifications" className="flex items-center gap-2" data-id="qqiicpyal" data-path="src/pages/SettingsPage.tsx">
              <Bell className="h-4 w-4" data-id="adaixf4ma" data-path="src/pages/SettingsPage.tsx" />
              <span className="hidden sm:inline" data-id="ah9ptaslk" data-path="src/pages/SettingsPage.tsx">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2" data-id="pxgzfffs1" data-path="src/pages/SettingsPage.tsx">
              <Settings className="h-4 w-4" data-id="p9encujbw" data-path="src/pages/SettingsPage.tsx" />
              <span className="hidden sm:inline" data-id="lwtq5tcla" data-path="src/pages/SettingsPage.tsx">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2" data-id="2opvf81hb" data-path="src/pages/SettingsPage.tsx">
              <Shield className="h-4 w-4" data-id="9z8lo5h4g" data-path="src/pages/SettingsPage.tsx" />
              <span className="hidden sm:inline" data-id="no80461co" data-path="src/pages/SettingsPage.tsx">Security</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2" data-id="qd27jbzld" data-path="src/pages/SettingsPage.tsx">
              <Download className="h-4 w-4" data-id="df7jkwp5r" data-path="src/pages/SettingsPage.tsx" />
              <span className="hidden sm:inline" data-id="ff4lr4vuh" data-path="src/pages/SettingsPage.tsx">Data</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" data-id="uvxrc01ok" data-path="src/pages/SettingsPage.tsx">
            <Card data-id="6d2ecrekk" data-path="src/pages/SettingsPage.tsx">
              <CardHeader data-id="6lgo9xe9b" data-path="src/pages/SettingsPage.tsx">
                <CardTitle className="flex items-center gap-2" data-id="6tv0mfbk8" data-path="src/pages/SettingsPage.tsx">
                  <Bell className="h-5 w-5" data-id="dk9p7roaw" data-path="src/pages/SettingsPage.tsx" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6" data-id="zuicidoz3" data-path="src/pages/SettingsPage.tsx">
                <div className="space-y-4" data-id="idk98w4cj" data-path="src/pages/SettingsPage.tsx">
                  <div className="flex items-center justify-between p-4 border rounded-lg" data-id="xn6njdurw" data-path="src/pages/SettingsPage.tsx">
                    <div className="flex items-center space-x-3" data-id="h2l2kmug8" data-path="src/pages/SettingsPage.tsx">
                      <Calendar className="h-5 w-5 text-blue-600" data-id="bewpsjk4f" data-path="src/pages/SettingsPage.tsx" />
                      <div data-id="r2o4vvdo0" data-path="src/pages/SettingsPage.tsx">
                        <Label className="text-sm font-medium" data-id="ljc0j83fe" data-path="src/pages/SettingsPage.tsx">Bill Reminders</Label>
                        <p className="text-xs text-gray-500" data-id="flxatp7zb" data-path="src/pages/SettingsPage.tsx">Get notified before bills are due</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.billReminders}
                      onCheckedChange={(checked) => handleNotificationChange('billReminders', checked)} data-id="6exmxm9ai" data-path="src/pages/SettingsPage.tsx" />

                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg" data-id="3ophgapnx" data-path="src/pages/SettingsPage.tsx">
                    <div className="flex items-center space-x-3" data-id="n5ald4w2n" data-path="src/pages/SettingsPage.tsx">
                      <DollarSign className="h-5 w-5 text-green-600" data-id="0dnqww4aw" data-path="src/pages/SettingsPage.tsx" />
                      <div data-id="jkiguazoe" data-path="src/pages/SettingsPage.tsx">
                        <Label className="text-sm font-medium" data-id="drv7lrbm0" data-path="src/pages/SettingsPage.tsx">Budget Alerts</Label>
                        <p className="text-xs text-gray-500" data-id="wienkv45a" data-path="src/pages/SettingsPage.tsx">Alerts when approaching budget limits</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.budgetAlerts}
                      onCheckedChange={(checked) => handleNotificationChange('budgetAlerts', checked)} data-id="p8o2538r1" data-path="src/pages/SettingsPage.tsx" />

                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg" data-id="1kl6shyv7" data-path="src/pages/SettingsPage.tsx">
                    <div className="flex items-center space-x-3" data-id="ed7csap7a" data-path="src/pages/SettingsPage.tsx">
                      <Palette className="h-5 w-5 text-purple-600" data-id="emkchz06q" data-path="src/pages/SettingsPage.tsx" />
                      <div data-id="et93cnai3" data-path="src/pages/SettingsPage.tsx">
                        <Label className="text-sm font-medium" data-id="2kbar3ti8" data-path="src/pages/SettingsPage.tsx">Goal Updates</Label>
                        <p className="text-xs text-gray-500" data-id="5gltnoxdv" data-path="src/pages/SettingsPage.tsx">Progress updates on savings goals</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.goalUpdates}
                      onCheckedChange={(checked) => handleNotificationChange('goalUpdates', checked)} data-id="x1rkaerq9" data-path="src/pages/SettingsPage.tsx" />

                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg" data-id="wsh7d7kss" data-path="src/pages/SettingsPage.tsx">
                    <div className="flex items-center space-x-3" data-id="zhdidhfdk" data-path="src/pages/SettingsPage.tsx">
                      <Mail className="h-5 w-5 text-red-600" data-id="no8wauwe0" data-path="src/pages/SettingsPage.tsx" />
                      <div data-id="2m8clh9hz" data-path="src/pages/SettingsPage.tsx">
                        <Label className="text-sm font-medium" data-id="5ekzr04jx" data-path="src/pages/SettingsPage.tsx">Email Digest</Label>
                        <p className="text-xs text-gray-500" data-id="31fml7elt" data-path="src/pages/SettingsPage.tsx">Weekly summary via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.emailDigest}
                      onCheckedChange={(checked) => handleNotificationChange('emailDigest', checked)} data-id="7wouy6iyp" data-path="src/pages/SettingsPage.tsx" />

                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg" data-id="tub2c9d61" data-path="src/pages/SettingsPage.tsx">
                    <div className="flex items-center space-x-3" data-id="5u86g6fo4" data-path="src/pages/SettingsPage.tsx">
                      <Smartphone className="h-5 w-5 text-orange-600" data-id="p1alb5arm" data-path="src/pages/SettingsPage.tsx" />
                      <div data-id="rbupe95r5" data-path="src/pages/SettingsPage.tsx">
                        <Label className="text-sm font-medium" data-id="5uunoeryw" data-path="src/pages/SettingsPage.tsx">Push Notifications</Label>
                        <p className="text-xs text-gray-500" data-id="23rgiufv9" data-path="src/pages/SettingsPage.tsx">Real-time mobile notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)} data-id="t9p5ex7jd" data-path="src/pages/SettingsPage.tsx" />

                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" data-id="ibz7kwybo" data-path="src/pages/SettingsPage.tsx">
            <Card data-id="9ezrj1yk3" data-path="src/pages/SettingsPage.tsx">
              <CardHeader data-id="tcsw65vga" data-path="src/pages/SettingsPage.tsx">
                <CardTitle className="flex items-center gap-2" data-id="6vpj0dtnc" data-path="src/pages/SettingsPage.tsx">
                  <Settings className="h-5 w-5" data-id="sf2v3i90m" data-path="src/pages/SettingsPage.tsx" />
                  App Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6" data-id="bj852vi8p" data-path="src/pages/SettingsPage.tsx">
                <div className="grid gap-4 md:grid-cols-2" data-id="s7vfldey7" data-path="src/pages/SettingsPage.tsx">
                  <div className="space-y-2" data-id="1e394t5hl" data-path="src/pages/SettingsPage.tsx">
                    <Label htmlFor="currency" data-id="gegku27hm" data-path="src/pages/SettingsPage.tsx">Currency</Label>
                    <select
                      id="currency"
                      value={preferences.currency}
                      onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-id="1j3m19m5y" data-path="src/pages/SettingsPage.tsx">

                      <option value="INR" data-id="6jgfmwzcc" data-path="src/pages/SettingsPage.tsx">Indian Rupee (₹)</option>
                      <option value="USD" data-id="3nh9mvtsz" data-path="src/pages/SettingsPage.tsx">US Dollar ($)</option>
                      <option value="EUR" data-id="vcbsovpiz" data-path="src/pages/SettingsPage.tsx">Euro (€)</option>
                      <option value="GBP" data-id="e741u355u" data-path="src/pages/SettingsPage.tsx">British Pound (£)</option>
                    </select>
                  </div>

                  <div className="space-y-2" data-id="awlph070x" data-path="src/pages/SettingsPage.tsx">
                    <Label htmlFor="dateFormat" data-id="yjhwmlvs3" data-path="src/pages/SettingsPage.tsx">Date Format</Label>
                    <select
                      id="dateFormat"
                      value={preferences.dateFormat}
                      onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-id="26wsafaax" data-path="src/pages/SettingsPage.tsx">

                      <option value="DD/MM/YYYY" data-id="1kpihbeep" data-path="src/pages/SettingsPage.tsx">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY" data-id="dv3dtici8" data-path="src/pages/SettingsPage.tsx">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD" data-id="64qt4c7vs" data-path="src/pages/SettingsPage.tsx">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div className="space-y-2" data-id="jxdykvewt" data-path="src/pages/SettingsPage.tsx">
                    <Label htmlFor="weekStart" data-id="7yr8omtfj" data-path="src/pages/SettingsPage.tsx">Week Starts On</Label>
                    <select
                      id="weekStart"
                      value={preferences.weekStart}
                      onChange={(e) => handlePreferenceChange('weekStart', e.target.value)}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-id="6xjwhciha" data-path="src/pages/SettingsPage.tsx">

                      <option value="Monday" data-id="dk5vfzwij" data-path="src/pages/SettingsPage.tsx">Monday</option>
                      <option value="Sunday" data-id="bsblugza9" data-path="src/pages/SettingsPage.tsx">Sunday</option>
                    </select>
                  </div>

                  <div className="space-y-2" data-id="3xywrayar" data-path="src/pages/SettingsPage.tsx">
                    <Label htmlFor="theme" data-id="ak8xtn94p" data-path="src/pages/SettingsPage.tsx">Theme</Label>
                    <select
                      id="theme"
                      value={preferences.theme}
                      onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-id="zx9zjv928" data-path="src/pages/SettingsPage.tsx">

                      <option value="light" data-id="ss427jz9w" data-path="src/pages/SettingsPage.tsx">Light</option>
                      <option value="dark" data-id="tzhy43u1z" data-path="src/pages/SettingsPage.tsx">Dark</option>
                      <option value="auto" data-id="bsfuvho3e" data-path="src/pages/SettingsPage.tsx">Auto</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" data-id="lzomuj7rj" data-path="src/pages/SettingsPage.tsx">
            <Card data-id="gcvsxn0ub" data-path="src/pages/SettingsPage.tsx">
              <CardHeader data-id="0pefwxr76" data-path="src/pages/SettingsPage.tsx">
                <CardTitle className="flex items-center gap-2" data-id="e9pvbze5u" data-path="src/pages/SettingsPage.tsx">
                  <Shield className="h-5 w-5" data-id="muknxj2pc" data-path="src/pages/SettingsPage.tsx" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6" data-id="88gl55kzx" data-path="src/pages/SettingsPage.tsx">
                <div className="p-4 bg-green-50 rounded-lg" data-id="f89wf4rwc" data-path="src/pages/SettingsPage.tsx">
                  <h3 className="font-medium text-green-800 mb-2" data-id="7wjp7tu0n" data-path="src/pages/SettingsPage.tsx">Account Security</h3>
                  <p className="text-sm text-green-600 mb-4" data-id="hwqs2o378" data-path="src/pages/SettingsPage.tsx">Your account is protected with the following security measures:</p>
                  <ul className="text-sm text-green-600 space-y-1" data-id="c4eqq4jwc" data-path="src/pages/SettingsPage.tsx">
                    <li data-id="5qvwdw5v9" data-path="src/pages/SettingsPage.tsx">✓ Email verification</li>
                    <li data-id="6yh8c3vu2" data-path="src/pages/SettingsPage.tsx">✓ Encrypted data storage</li>
                    <li data-id="dj84ab5y2" data-path="src/pages/SettingsPage.tsx">✓ Secure authentication</li>
                    <li data-id="5x2xkad25" data-path="src/pages/SettingsPage.tsx">✓ Regular security updates</li>
                  </ul>
                </div>

                <div className="space-y-4" data-id="b9j3snvwz" data-path="src/pages/SettingsPage.tsx">
                  <Button variant="outline" className="w-full justify-start" data-id="8dvai2qji" data-path="src/pages/SettingsPage.tsx">
                    <Mail className="h-4 w-4 mr-2" data-id="7ig5lhcvs" data-path="src/pages/SettingsPage.tsx" />
                    Change Email Address
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" data-id="6w6a7ouh5" data-path="src/pages/SettingsPage.tsx">
                    <Shield className="h-4 w-4 mr-2" data-id="y2nz1lye8" data-path="src/pages/SettingsPage.tsx" />
                    Reset Password
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" data-id="1vmmm5sto" data-path="src/pages/SettingsPage.tsx">
                    <Settings className="h-4 w-4 mr-2" data-id="3jq8311o4" data-path="src/pages/SettingsPage.tsx" />
                    Two-Factor Authentication (Coming Soon)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" data-id="htujhor5e" data-path="src/pages/SettingsPage.tsx">
            <div className="space-y-6" data-id="dxsmhponw" data-path="src/pages/SettingsPage.tsx">
              <Card data-id="e2qo7np6o" data-path="src/pages/SettingsPage.tsx">
                <CardHeader data-id="iisgkj6vl" data-path="src/pages/SettingsPage.tsx">
                  <CardTitle className="flex items-center gap-2" data-id="4jclq9n90" data-path="src/pages/SettingsPage.tsx">
                    <Download className="h-5 w-5" data-id="9jxlpn6sv" data-path="src/pages/SettingsPage.tsx" />
                    Data Export
                  </CardTitle>
                </CardHeader>
                <CardContent data-id="q7maoo8nl" data-path="src/pages/SettingsPage.tsx">
                  <div className="p-4 bg-blue-50 rounded-lg mb-4" data-id="hdo0uv4ok" data-path="src/pages/SettingsPage.tsx">
                    <h3 className="font-medium text-blue-800 mb-2" data-id="rar8iy1hs" data-path="src/pages/SettingsPage.tsx">Export Your Data</h3>
                    <p className="text-sm text-blue-600 mb-4" data-id="cuk9491ud" data-path="src/pages/SettingsPage.tsx">
                      Download a complete copy of your financial data including expenses, income, budgets, and goals.
                    </p>
                    <Button onClick={exportData} className="bg-blue-600 hover:bg-blue-700" data-id="k5jhymtg1" data-path="src/pages/SettingsPage.tsx">
                      <Download className="h-4 w-4 mr-2" data-id="ttgvx4ms6" data-path="src/pages/SettingsPage.tsx" />
                      Export Data
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card data-id="1rkx7gbb9" data-path="src/pages/SettingsPage.tsx">
                <CardHeader data-id="qb8gof0ym" data-path="src/pages/SettingsPage.tsx">
                  <CardTitle className="flex items-center gap-2 text-red-600" data-id="dup7qbeqt" data-path="src/pages/SettingsPage.tsx">
                    <Trash2 className="h-5 w-5" data-id="kbagt0trv" data-path="src/pages/SettingsPage.tsx" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent data-id="jjgwrwzhj" data-path="src/pages/SettingsPage.tsx">
                  <div className="p-4 bg-red-50 rounded-lg" data-id="tz2ko6hi2" data-path="src/pages/SettingsPage.tsx">
                    <h3 className="font-medium text-red-800 mb-2" data-id="fv67c2uel" data-path="src/pages/SettingsPage.tsx">Delete Account</h3>
                    <p className="text-sm text-red-600 mb-4" data-id="5vnb2whli" data-path="src/pages/SettingsPage.tsx">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button onClick={deleteAccount} variant="destructive" data-id="imoj4kns3" data-path="src/pages/SettingsPage.tsx">
                      <Trash2 className="h-4 w-4 mr-2" data-id="ok7i2p4kl" data-path="src/pages/SettingsPage.tsx" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>);

};

export default SettingsPage;