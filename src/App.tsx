import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ExpensesPage from "./pages/ExpensesPage";
import IncomePage from "./pages/IncomePage";
import BudgetPage from "./pages/BudgetPage";
import BillsPage from "./pages/BillsPage";
import SavingsGoalsPage from "./pages/SavingsGoalsPage";
import FinancialTipsPage from "./pages/FinancialTipsPage";
import OffersPage from "./pages/OffersPage";
import AuthSuccessPage from "./pages/AuthSuccessPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import DataManagementPage from "./pages/DataManagementPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () =>
<QueryClientProvider client={queryClient} data-id="4emdic5ey" data-path="src/App.tsx">
    <TooltipProvider data-id="shmnqsq86" data-path="src/App.tsx">
      <Toaster data-id="dgvmva2ck" data-path="src/App.tsx" />
      <BrowserRouter data-id="n7q8uh6ov" data-path="src/App.tsx">
        <Routes data-id="wtf5l9at0" data-path="src/App.tsx">
          <Route path="/" element={<LandingPage data-id="adrwf4sb0" data-path="src/App.tsx" />} data-id="xvoi922da" data-path="src/App.tsx" />
          <Route path="/dashboard" element={<Dashboard data-id="xai2tu2a4" data-path="src/App.tsx" />} data-id="42wn9l0fj" data-path="src/App.tsx" />
          <Route path="/expenses" element={<ExpensesPage data-id="82kna94xq" data-path="src/App.tsx" />} data-id="f7u4wu6ft" data-path="src/App.tsx" />
          <Route path="/income" element={<IncomePage data-id="v8u9wkkh1" data-path="src/App.tsx" />} data-id="kinovd204" data-path="src/App.tsx" />
          <Route path="/budget" element={<BudgetPage data-id="fgo4dfx85" data-path="src/App.tsx" />} data-id="xk7m03z2k" data-path="src/App.tsx" />
          <Route path="/bills" element={<BillsPage data-id="qwiog4r7z" data-path="src/App.tsx" />} data-id="hhylfivba" data-path="src/App.tsx" />
          <Route path="/goals" element={<SavingsGoalsPage data-id="b8389b4rl" data-path="src/App.tsx" />} data-id="0dpas444z" data-path="src/App.tsx" />
          <Route path="/tips" element={<FinancialTipsPage data-id="bghudqust" data-path="src/App.tsx" />} data-id="8uhou69yq" data-path="src/App.tsx" />
          <Route path="/offers" element={<OffersPage data-id="83rb7tuih" data-path="src/App.tsx" />} data-id="tltpp0o6n" data-path="src/App.tsx" />
          <Route path="/onauthsuccess" element={<AuthSuccessPage data-id="5a1wwpck5" data-path="src/App.tsx" />} data-id="mc4ob7w6x" data-path="src/App.tsx" />
          <Route path="/resetpassword" element={<ResetPasswordPage data-id="d12zzpjwu" data-path="src/App.tsx" />} data-id="vrgdow0k9" data-path="src/App.tsx" />
          <Route path="/profile" element={<ProfilePage data-id="jv7evbacv" data-path="src/App.tsx" />} data-id="ze1t65erm" data-path="src/App.tsx" />
          <Route path="/settings" element={<SettingsPage data-id="7idc13jz3" data-path="src/App.tsx" />} data-id="n58citzqp" data-path="src/App.tsx" />
          <Route path="/data" element={<DataManagementPage data-id="kzr7hnh3y" data-path="src/App.tsx" />} data-id="a007ecdtp" data-path="src/App.tsx" />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound data-id="2izb7keyc" data-path="src/App.tsx" />} data-id="m815aefn5" data-path="src/App.tsx" />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>;


export default App;