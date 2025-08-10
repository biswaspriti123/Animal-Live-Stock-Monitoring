import React, { useState, useEffect } from 'react';
import Layout from '../../components/ui/Layout';
import KPICard from './components/KPICard';
import LivestockMap from './components/LivestockMap';
import AlertFeed from './components/AlertFeed';
import HealthDataGrid from './components/HealthDataGrid';
import HealthTrendChart from './components/HealthTrendChart';
import ProductionChart from './components/ProductionChart';
import GlobalControls from './components/GlobalControls';

const LivestockOverviewDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const kpiData = [
    {
      title: 'Total Animals',
      value: '247',
      unit: 'Active',
      trend: 'up',
      trendValue: '+3',
      icon: 'Users',
      color: 'bg-primary',
      bgColor: 'bg-card'
    },
    {
      title: 'Active Alerts',
      value: '12',
      unit: 'Pending',
      trend: 'down',
      trendValue: '-5',
      icon: 'AlertTriangle',
      color: 'bg-warning',
      bgColor: 'bg-card'
    },
    {
      title: 'Average Health Score',
      value: '89.2',
      unit: '/100',
      trend: 'up',
      trendValue: '+2.1',
      icon: 'Heart',
      color: 'bg-success',
      bgColor: 'bg-card'
    },
    {
      title: 'Daily Milk Production',
      value: '1,847',
      unit: 'Liters',
      trend: 'up',
      trendValue: '+4.2%',
      icon: 'Droplets',
      color: 'bg-accent',
      bgColor: 'bg-card'
    }
  ];

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Global Controls */}
        <GlobalControls />

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {kpiData?.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi?.title}
              value={kpi?.value}
              unit={kpi?.unit}
              trend={kpi?.trend}
              trendValue={kpi?.trendValue}
              icon={kpi?.icon}
              color={kpi?.color}
              bgColor={kpi?.bgColor}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Map Section - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <LivestockMap />
          </div>

          {/* Alert Feed - Takes 1 column */}
          <div className="lg:col-span-1">
            <AlertFeed />
          </div>
        </div>

        {/* Health Data Grid */}
        <div className="mb-6">
          <HealthDataGrid />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HealthTrendChart />
          <ProductionChart />
        </div>
      </div>
    </Layout>
  );
};

export default LivestockOverviewDashboard;