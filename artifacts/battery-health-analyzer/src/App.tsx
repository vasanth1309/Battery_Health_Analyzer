import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { ThemeProvider } from 'next-themes';

import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Features from '@/pages/Features';
import Analyzer from '@/pages/Analyzer';
import Dashboard from '@/pages/Dashboard';
import Insights from '@/pages/Insights';
import Workflow from '@/pages/Workflow';
import Applications from '@/pages/Applications';
import Team from '@/pages/Team';
import Contact from '@/pages/Contact';

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-muted-foreground">Page not found</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/features" component={Features} />
        <Route path="/analyzer" component={Analyzer} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/insights" component={Insights} />
        <Route path="/workflow" component={Workflow} />
        <Route path="/applications" component={Applications} />
        <Route path="/team" component={Team} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;