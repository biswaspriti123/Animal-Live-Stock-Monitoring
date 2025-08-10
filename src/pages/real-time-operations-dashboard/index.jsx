import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../components/ui/Layout';
import SystemHeader from './components/SystemHeader';
import AlertPanel from './components/AlertPanel';
import LiveMap from './components/LiveMap';
import StatusPanel from './components/StatusPanel';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';

const RealTimeOperationsDashboard = () => {
  useEffect(() => {
    // Set up WebSocket connections for real-time data
    const connectWebSocket = () => {
      console.log('Establishing WebSocket connections for real-time monitoring...');
      // In a real implementation, this would connect to actual WebSocket endpoints
    };

    connectWebSocket();

    // Auto-refresh data every 30 seconds
    const refreshInterval = setInterval(() => {
      console.log('Refreshing real-time data...');
    }, 30000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Real-Time Operations Dashboard - Animal Monitor</title>
        <meta name="description" content="Mission-critical operational command center for livestock monitoring and rapid response" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-6 max-w-[1920px]">
        {/* System Status Header */}
        <SystemHeader />

        {/* Main Dashboard Grid - 24 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-24 gap-6 mb-6">
          {/* Alert Panel - 8 columns */}
          <div className="lg:col-span-8 h-[600px]">
            <AlertPanel />
          </div>

          {/* Live Map - 12 columns */}
          <div className="lg:col-span-12 h-[600px]">
            <LiveMap />
          </div>

          {/* Status Panel - 4 columns */}
          <div className="lg:col-span-4 h-[600px]">
            <StatusPanel />
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Feed - 2 columns */}
          <div className="lg:col-span-2 h-[500px]">
            <ActivityFeed />
          </div>

          {/* Quick Actions - 1 column */}
          <div className="lg:col-span-1 h-[500px]">
            <QuickActions />
          </div>
        </div>

        {/* Mobile Optimization Notice */}
        <div className="lg:hidden mt-6 p-4 bg-card rounded-lg border border-border">
          <div className="flex items-center space-x-2 text-warning">
            <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
            <span className="text-sm font-medium">Mobile View Active</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            For optimal field operations, use tablet or desktop view. Essential alerts and GPS tracking remain fully functional.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default RealTimeOperationsDashboard;