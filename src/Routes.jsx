import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LivestockOverviewDashboard from './pages/livestock-overview-dashboard';
import RealTimeOperationsDashboard from './pages/real-time-operations-dashboard';
import AnimalHealthMonitoringDashboard from './pages/animal-health-monitoring-dashboard';
import ProductionAnalyticsDashboard from './pages/production-analytics-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AnimalHealthMonitoringDashboard />} />
        <Route path="/livestock-overview-dashboard" element={<LivestockOverviewDashboard />} />
        <Route path="/real-time-operations-dashboard" element={<RealTimeOperationsDashboard />} />
        <Route path="/animal-health-monitoring-dashboard" element={<AnimalHealthMonitoringDashboard />} />
        <Route path="/production-analytics-dashboard" element={<ProductionAnalyticsDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
