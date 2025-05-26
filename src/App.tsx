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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () =>
<QueryClientProvider client={queryClient} data-id="gyjwriku4" data-path="src/App.tsx">
    <TooltipProvider data-id="amnaanfnk" data-path="src/App.tsx">
      <Toaster data-id="34q8lw4eg" data-path="src/App.tsx" />
      <BrowserRouter data-id="xeekq6c41" data-path="src/App.tsx">
        <Routes data-id="4olfesv7e" data-path="src/App.tsx">
          <Route path="/" element={<LandingPage data-id="xcvwogczg" data-path="src/App.tsx" />} data-id="90ompkex7" data-path="src/App.tsx" />
          <Route path="/dashboard" element={<Dashboard data-id="w48p07pab" data-path="src/App.tsx" />} data-id="frrphx8dq" data-path="src/App.tsx" />
          <Route path="/expenses" element={<ExpensesPage data-id="4ybiwmbtd" data-path="src/App.tsx" />} data-id="j4go5t96f" data-path="src/App.tsx" />
          <Route path="/income" element={<IncomePage data-id="yvq4od5ay" data-path="src/App.tsx" />} data-id="dmyutcvxh" data-path="src/App.tsx" />
          <Route path="/budget" element={<BudgetPage data-id="kujb4rnl2" data-path="src/App.tsx" />} data-id="6lp4siunc" data-path="src/App.tsx" />
          <Route path="/bills" element={<BillsPage data-id="91lgstadf" data-path="src/App.tsx" />} data-id="i9e8zask5" data-path="src/App.tsx" />
          <Route path="/goals" element={<SavingsGoalsPage data-id="1vcupdzt3" data-path="src/App.tsx" />} data-id="g12anca3n" data-path="src/App.tsx" />
          <Route path="/tips" element={<FinancialTipsPage data-id="mojuukuh1" data-path="src/App.tsx" />} data-id="2imr5xp59" data-path="src/App.tsx" />
          <Route path="/offers" element={<OffersPage data-id="6z8zfhuly" data-path="src/App.tsx" />} data-id="ajsd5olnu" data-path="src/App.tsx" />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound data-id="bpg2vbukz" data-path="src/App.tsx" />} data-id="9nbkqkzf0" data-path="src/App.tsx" />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>;


export default App;