import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Database,
  Download,
  Trash2,
  Wallet,
  TrendingUp,
  Target,
  Bell,
  PiggyBank,
  Calendar,
  DollarSign,
  FileText,
  Eye,
  EyeOff } from
'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from '@/hooks/use-toast';

const DataManagementPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>({
    expenses: [],
    income: [],
    budgetCategories: [],
    bills: [],
    savingsGoals: []
  });
  const [showSensitiveData, setShowSensitiveData] = useState(false);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [expensesRes, incomeRes, budgetRes, billsRes, goalsRes] = await Promise.all([
      window.ezsite.apis.tablePage(10239, { PageNo: 1, PageSize: 1000, Filters: [] }),
      window.ezsite.apis.tablePage(10240, { PageNo: 1, PageSize: 1000, Filters: [] }),
      window.ezsite.apis.tablePage(10241, { PageNo: 1, PageSize: 1000, Filters: [] }),
      window.ezsite.apis.tablePage(10242, { PageNo: 1, PageSize: 1000, Filters: [] }),
      window.ezsite.apis.tablePage(10243, { PageNo: 1, PageSize: 1000, Filters: [] })]
      );

      setData({
        expenses: expensesRes.data?.List || [],
        income: incomeRes.data?.List || [],
        budgetCategories: budgetRes.data?.List || [],
        bills: billsRes.data?.List || [],
        savingsGoals: goalsRes.data?.List || []
      });
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = async () => {
    try {
      const exportData = {
        expenses: data.expenses,
        income: data.income,
        budgetCategories: data.budgetCategories,
        bills: data.bills,
        savingsGoals: data.savingsGoals,
        exportDate: new Date().toISOString()
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `budget-buddy-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Data Exported",
        description: "Your data has been successfully exported."
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const DataTable = ({ title, data, icon, columns




  }: {title: string;data: any[];icon: React.ReactNode;columns: {key: string;label: string;format?: (value: any) => string;}[];}) =>
  <Card data-id="jhoizql14" data-path="src/pages/DataManagementPage.tsx">
      <CardHeader data-id="4dyocfopw" data-path="src/pages/DataManagementPage.tsx">
        <CardTitle className="flex items-center gap-2" data-id="dkye40hff" data-path="src/pages/DataManagementPage.tsx">
          {icon}
          {title}
          <Badge variant="secondary" className="ml-auto" data-id="5x5lfx9ec" data-path="src/pages/DataManagementPage.tsx">
            {data.length} records
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent data-id="l9sb57vq5" data-path="src/pages/DataManagementPage.tsx">
        {data.length === 0 ?
      <div className="text-center py-8 text-gray-500" data-id="rbn2pqxsy" data-path="src/pages/DataManagementPage.tsx">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-30" data-id="e6zo62tyr" data-path="src/pages/DataManagementPage.tsx" />
            <p data-id="ddftbtuok" data-path="src/pages/DataManagementPage.tsx">No {title.toLowerCase()} found</p>
          </div> :

      <div className="overflow-x-auto" data-id="mmqxgm1y6" data-path="src/pages/DataManagementPage.tsx">
            <table className="w-full border-collapse" data-id="fddut9m33" data-path="src/pages/DataManagementPage.tsx">
              <thead data-id="to09k7934" data-path="src/pages/DataManagementPage.tsx">
                <tr className="border-b" data-id="kbql1fit2" data-path="src/pages/DataManagementPage.tsx">
                  {columns.map((col) =>
              <th key={col.key} className="text-left p-2 font-medium text-gray-600" data-id="5uproyvhc" data-path="src/pages/DataManagementPage.tsx">
                      {col.label}
                    </th>
              )}
                </tr>
              </thead>
              <tbody data-id="d4bv721sy" data-path="src/pages/DataManagementPage.tsx">
                {data.slice(0, 10).map((item, index) =>
            <tr key={index} className="border-b hover:bg-gray-50" data-id="pixaki55l" data-path="src/pages/DataManagementPage.tsx">
                    {columns.map((col) =>
              <td key={col.key} className="p-2 text-sm" data-id="ibdsblshs" data-path="src/pages/DataManagementPage.tsx">
                        {col.format ? col.format(item[col.key]) : item[col.key] || '-'}
                      </td>
              )}
                  </tr>
            )}
              </tbody>
            </table>
            {data.length > 10 &&
        <div className="mt-4 text-center text-sm text-gray-500" data-id="ygxeuo4as" data-path="src/pages/DataManagementPage.tsx">
                Showing first 10 of {data.length} records
              </div>
        }
          </div>
      }
      </CardContent>
    </Card>;


  if (isLoading) {
    return (
      <DashboardLayout data-id="cj00h534v" data-path="src/pages/DataManagementPage.tsx">
        <div className="flex items-center justify-center h-full" data-id="p32f9gr5w" data-path="src/pages/DataManagementPage.tsx">
          <div className="text-center" data-id="z6dsx73p9" data-path="src/pages/DataManagementPage.tsx">
            <Database className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" data-id="mr6kekgh0" data-path="src/pages/DataManagementPage.tsx" />
            <div className="text-lg font-medium text-gray-600" data-id="a5mr9qepe" data-path="src/pages/DataManagementPage.tsx">Loading your data...</div>
          </div>
        </div>
      </DashboardLayout>);

  }

  const formatCurrency = (amount: number) => `₹${amount?.toLocaleString() || 0}`;
  const formatDate = (date: string) => date ? new Date(date).toLocaleDateString() : '-';

  return (
    <DashboardLayout data-id="sdohuefzf" data-path="src/pages/DataManagementPage.tsx">
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto" data-id="m8tfswilr" data-path="src/pages/DataManagementPage.tsx">
        <div className="mb-8" data-id="bweb7bpg9" data-path="src/pages/DataManagementPage.tsx">
          <h1 className="text-3xl font-bold text-gray-800 mb-2" data-id="sqxk710bv" data-path="src/pages/DataManagementPage.tsx">Data Management</h1>
          <p className="text-gray-600" data-id="f1y1rnkpe" data-path="src/pages/DataManagementPage.tsx">View, manage, and export all your financial data</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8" data-id="7nci72hab" data-path="src/pages/DataManagementPage.tsx">
          <Card data-id="7r56wz90r" data-path="src/pages/DataManagementPage.tsx">
            <CardContent className="p-4 text-center" data-id="xowvqiivt" data-path="src/pages/DataManagementPage.tsx">
              <Wallet className="h-8 w-8 text-blue-600 mx-auto mb-2" data-id="rzyw79wnm" data-path="src/pages/DataManagementPage.tsx" />
              <div className="text-2xl font-bold" data-id="es7l6udto" data-path="src/pages/DataManagementPage.tsx">{data.expenses.length}</div>
              <div className="text-sm text-gray-600" data-id="xveegpy37" data-path="src/pages/DataManagementPage.tsx">Expenses</div>
            </CardContent>
          </Card>
          
          <Card data-id="dwh75ppps" data-path="src/pages/DataManagementPage.tsx">
            <CardContent className="p-4 text-center" data-id="7ppwvo4k4" data-path="src/pages/DataManagementPage.tsx">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" data-id="3czrwvb5p" data-path="src/pages/DataManagementPage.tsx" />
              <div className="text-2xl font-bold" data-id="om9xt0kfm" data-path="src/pages/DataManagementPage.tsx">{data.income.length}</div>
              <div className="text-sm text-gray-600" data-id="x1iq7wjxg" data-path="src/pages/DataManagementPage.tsx">Income</div>
            </CardContent>
          </Card>
          
          <Card data-id="yabh6iujy" data-path="src/pages/DataManagementPage.tsx">
            <CardContent className="p-4 text-center" data-id="dlk7wfw0s" data-path="src/pages/DataManagementPage.tsx">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" data-id="9riw78l7q" data-path="src/pages/DataManagementPage.tsx" />
              <div className="text-2xl font-bold" data-id="gwxhri1mo" data-path="src/pages/DataManagementPage.tsx">{data.budgetCategories.length}</div>
              <div className="text-sm text-gray-600" data-id="nchuwc0ge" data-path="src/pages/DataManagementPage.tsx">Budgets</div>
            </CardContent>
          </Card>
          
          <Card data-id="s5elxw951" data-path="src/pages/DataManagementPage.tsx">
            <CardContent className="p-4 text-center" data-id="8fs0wlxtv" data-path="src/pages/DataManagementPage.tsx">
              <Bell className="h-8 w-8 text-orange-600 mx-auto mb-2" data-id="kqqdefxpe" data-path="src/pages/DataManagementPage.tsx" />
              <div className="text-2xl font-bold" data-id="rj0v3bv6f" data-path="src/pages/DataManagementPage.tsx">{data.bills.length}</div>
              <div className="text-sm text-gray-600" data-id="34gznpf44" data-path="src/pages/DataManagementPage.tsx">Bills</div>
            </CardContent>
          </Card>
          
          <Card data-id="jk5qypsqj" data-path="src/pages/DataManagementPage.tsx">
            <CardContent className="p-4 text-center" data-id="wssaa17mh" data-path="src/pages/DataManagementPage.tsx">
              <PiggyBank className="h-8 w-8 text-pink-600 mx-auto mb-2" data-id="3myiq1873" data-path="src/pages/DataManagementPage.tsx" />
              <div className="text-2xl font-bold" data-id="77h68k6dg" data-path="src/pages/DataManagementPage.tsx">{data.savingsGoals.length}</div>
              <div className="text-sm text-gray-600" data-id="4urwvp29m" data-path="src/pages/DataManagementPage.tsx">Goals</div>
            </CardContent>
          </Card>
        </div>

        {/* Data Export Controls */}
        <Card className="mb-8" data-id="ms2f94dcl" data-path="src/pages/DataManagementPage.tsx">
          <CardHeader data-id="1fwn6iccl" data-path="src/pages/DataManagementPage.tsx">
            <CardTitle className="flex items-center gap-2" data-id="bp2ah3fku" data-path="src/pages/DataManagementPage.tsx">
              <Download className="h-5 w-5" data-id="afbkfl2ar" data-path="src/pages/DataManagementPage.tsx" />
              Data Export & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent data-id="lcfmr4qyh" data-path="src/pages/DataManagementPage.tsx">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between" data-id="syetc274u" data-path="src/pages/DataManagementPage.tsx">
              <div data-id="etaxl2mya" data-path="src/pages/DataManagementPage.tsx">
                <p className="text-sm text-gray-600 mb-2" data-id="4r27js88e" data-path="src/pages/DataManagementPage.tsx">
                  Export all your financial data in JSON format for backup or analysis.
                </p>
                <div className="flex items-center gap-2" data-id="q8aywmcte" data-path="src/pages/DataManagementPage.tsx">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSensitiveData(!showSensitiveData)} data-id="0ssilz3eo" data-path="src/pages/DataManagementPage.tsx">

                    {showSensitiveData ? <EyeOff className="h-4 w-4 mr-2" data-id="kh50j7z6s" data-path="src/pages/DataManagementPage.tsx" /> : <Eye className="h-4 w-4 mr-2" data-id="4ry9osya8" data-path="src/pages/DataManagementPage.tsx" />}
                    {showSensitiveData ? 'Hide' : 'Show'} sensitive data
                  </Button>
                </div>
              </div>
              <Button onClick={exportData} className="flex-shrink-0" data-id="ar2tstnkw" data-path="src/pages/DataManagementPage.tsx">
                <Download className="h-4 w-4 mr-2" data-id="xixdwiefr" data-path="src/pages/DataManagementPage.tsx" />
                Export All Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Tables */}
        <Tabs defaultValue="expenses" className="space-y-6" data-id="mrrrhht8i" data-path="src/pages/DataManagementPage.tsx">
          <TabsList className="grid w-full grid-cols-5" data-id="5wh0uvk0z" data-path="src/pages/DataManagementPage.tsx">
            <TabsTrigger value="expenses" data-id="q22turnl6" data-path="src/pages/DataManagementPage.tsx">Expenses</TabsTrigger>
            <TabsTrigger value="income" data-id="c1da7zh43" data-path="src/pages/DataManagementPage.tsx">Income</TabsTrigger>
            <TabsTrigger value="budgets" data-id="ysz7j99q2" data-path="src/pages/DataManagementPage.tsx">Budgets</TabsTrigger>
            <TabsTrigger value="bills" data-id="l9l84iqio" data-path="src/pages/DataManagementPage.tsx">Bills</TabsTrigger>
            <TabsTrigger value="goals" data-id="ga73ocm2k" data-path="src/pages/DataManagementPage.tsx">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" data-id="ru6exrt4b" data-path="src/pages/DataManagementPage.tsx">
            <DataTable
              title="Expenses"
              data={data.expenses}
              icon={<Wallet className="h-5 w-5" data-id="168r7q67v" data-path="src/pages/DataManagementPage.tsx" />}
              columns={[
              { key: 'title', label: 'Title' },
              {
                key: 'amount',
                label: 'Amount',
                format: showSensitiveData ? formatCurrency : () => '₹***'
              },
              { key: 'category', label: 'Category' },
              { key: 'expense_date', label: 'Date', format: formatDate },
              { key: 'notes', label: 'Notes' }]
              } data-id="lg75dpwtl" data-path="src/pages/DataManagementPage.tsx" />

          </TabsContent>

          <TabsContent value="income" data-id="k0fope1s2" data-path="src/pages/DataManagementPage.tsx">
            <DataTable
              title="Income"
              data={data.income}
              icon={<TrendingUp className="h-5 w-5" data-id="d1rpvdnn9" data-path="src/pages/DataManagementPage.tsx" />}
              columns={[
              { key: 'title', label: 'Title' },
              {
                key: 'amount',
                label: 'Amount',
                format: showSensitiveData ? formatCurrency : () => '₹***'
              },
              { key: 'source', label: 'Source' },
              { key: 'income_date', label: 'Date', format: formatDate },
              { key: 'is_recurring', label: 'Recurring', format: (val) => val ? 'Yes' : 'No' }]
              } data-id="5qi5l8f3y" data-path="src/pages/DataManagementPage.tsx" />

          </TabsContent>

          <TabsContent value="budgets" data-id="3ltouqzre" data-path="src/pages/DataManagementPage.tsx">
            <DataTable
              title="Budget Categories"
              data={data.budgetCategories}
              icon={<Target className="h-5 w-5" data-id="sn6ljh1wi" data-path="src/pages/DataManagementPage.tsx" />}
              columns={[
              { key: 'category_name', label: 'Category' },
              {
                key: 'allocated_amount',
                label: 'Allocated',
                format: showSensitiveData ? formatCurrency : () => '₹***'
              },
              {
                key: 'spent_amount',
                label: 'Spent',
                format: showSensitiveData ? formatCurrency : () => '₹***'
              },
              { key: 'budget_month', label: 'Month' }]
              } data-id="yjmx73lq1" data-path="src/pages/DataManagementPage.tsx" />

          </TabsContent>

          <TabsContent value="bills" data-id="rpmo25fh8" data-path="src/pages/DataManagementPage.tsx">
            <DataTable
              title="Bills"
              data={data.bills}
              icon={<Bell className="h-5 w-5" data-id="qkdfh6q87" data-path="src/pages/DataManagementPage.tsx" />}
              columns={[
              { key: 'title', label: 'Title' },
              {
                key: 'amount',
                label: 'Amount',
                format: showSensitiveData ? formatCurrency : () => '₹***'
              },
              { key: 'category', label: 'Category' },
              { key: 'due_date', label: 'Due Date', format: formatDate },
              { key: 'frequency', label: 'Frequency' },
              { key: 'is_paid', label: 'Paid', format: (val) => val ? 'Yes' : 'No' }]
              } data-id="vll5fh9im" data-path="src/pages/DataManagementPage.tsx" />

          </TabsContent>

          <TabsContent value="goals" data-id="urdtst0pp" data-path="src/pages/DataManagementPage.tsx">
            <DataTable
              title="Savings Goals"
              data={data.savingsGoals}
              icon={<PiggyBank className="h-5 w-5" data-id="m8b3cbc1o" data-path="src/pages/DataManagementPage.tsx" />}
              columns={[
              { key: 'title', label: 'Title' },
              {
                key: 'target_amount',
                label: 'Target',
                format: showSensitiveData ? formatCurrency : () => '₹***'
              },
              {
                key: 'saved_amount',
                label: 'Saved',
                format: showSensitiveData ? formatCurrency : () => '₹***'
              },
              { key: 'target_date', label: 'Target Date', format: formatDate },
              { key: 'priority', label: 'Priority' }]
              } data-id="t8bncdfbg" data-path="src/pages/DataManagementPage.tsx" />

          </TabsContent>
        </Tabs>

        {/* Data Security Notice */}
        <Card className="mt-8" data-id="g0ke0b3e5" data-path="src/pages/DataManagementPage.tsx">
          <CardContent className="p-6" data-id="16llnf7x4" data-path="src/pages/DataManagementPage.tsx">
            <div className="flex items-start gap-4" data-id="6p58yg93d" data-path="src/pages/DataManagementPage.tsx">
              <Database className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" data-id="guuzbt00c" data-path="src/pages/DataManagementPage.tsx" />
              <div data-id="x2hxxbc8t" data-path="src/pages/DataManagementPage.tsx">
                <h3 className="font-medium text-gray-800 mb-2" data-id="409croswu" data-path="src/pages/DataManagementPage.tsx">Data Security & Privacy</h3>
                <p className="text-sm text-gray-600 mb-4" data-id="yu86tjc8g" data-path="src/pages/DataManagementPage.tsx">
                  Your financial data is securely stored with end-to-end encryption. We follow industry 
                  best practices to protect your personal information and never share it with third parties.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm" data-id="hynpuggr1" data-path="src/pages/DataManagementPage.tsx">
                  <div className="flex items-center gap-2" data-id="71hs31mgc" data-path="src/pages/DataManagementPage.tsx">
                    <div className="w-2 h-2 bg-green-500 rounded-full" data-id="afjiy3443" data-path="src/pages/DataManagementPage.tsx"></div>
                    <span data-id="heet1nij8" data-path="src/pages/DataManagementPage.tsx">Encrypted Storage</span>
                  </div>
                  <div className="flex items-center gap-2" data-id="4l4msbgfz" data-path="src/pages/DataManagementPage.tsx">
                    <div className="w-2 h-2 bg-green-500 rounded-full" data-id="mxjy4o7cb" data-path="src/pages/DataManagementPage.tsx"></div>
                    <span data-id="rc6innchb" data-path="src/pages/DataManagementPage.tsx">Regular Backups</span>
                  </div>
                  <div className="flex items-center gap-2" data-id="d7fdlc63t" data-path="src/pages/DataManagementPage.tsx">
                    <div className="w-2 h-2 bg-green-500 rounded-full" data-id="flcmbwjtl" data-path="src/pages/DataManagementPage.tsx"></div>
                    <span data-id="6yz92cuui" data-path="src/pages/DataManagementPage.tsx">GDPR Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>);

};

export default DataManagementPage;