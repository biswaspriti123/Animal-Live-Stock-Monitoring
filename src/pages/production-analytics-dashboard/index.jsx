import React, { useState, useEffect } from 'react';
import Layout from '../../components/ui/Layout';
import ProductionKPIHeader from './components/ProductionKPIHeader';
import ProductionChart from './components/ProductionChart';
import ProductionLeaderboard from './components/ProductionLeaderboard';
import QualityDistributionChart from './components/QualityDistributionChart';
import ProductionTable from './components/ProductionTable';
import CorrelationScatterPlot from './components/CorrelationScatterPlot';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductionAnalyticsDashboard = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');
  const [selectedUnit, setSelectedUnit] = useState('individual');

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setLastUpdated(new Date());
    }, 2000);
  };

  const handleExport = (format) => {
    console.log(`Exporting data in ${format} format`);
    // Export functionality would be implemented here
  };

  const timeRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const unitOptions = [
    { value: 'individual', label: 'Individual' },
    { value: 'herd', label: 'Herd' }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Production Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive milk production intelligence and yield optimization insights
            </p>
            <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <span>Last updated: {lastUpdated?.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-warning animate-pulse' : 'bg-success'}`} />
                <span>{isProcessing ? 'Processing...' : 'Live Data'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Time Range Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Period:</span>
              <div className="flex items-center space-x-1">
                {timeRangeOptions?.map((option) => (
                  <Button
                    key={option?.value}
                    variant={selectedTimeRange === option?.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeRange(option?.value)}
                  >
                    {option?.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Unit Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">View:</span>
              <div className="flex items-center space-x-1">
                {unitOptions?.map((option) => (
                  <Button
                    key={option?.value}
                    variant={selectedUnit === option?.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedUnit(option?.value)}
                  >
                    {option?.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                loading={isProcessing}
                iconName="RefreshCw"
              >
                Refresh
              </Button>
              
              <div className="relative group">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                >
                  Export
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-agricultural-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-1">
                    <button 
                      onClick={() => handleExport('excel')}
                      className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-agricultural flex items-center space-x-2"
                    >
                      <Icon name="FileSpreadsheet" size={16} />
                      <span>Excel Report</span>
                    </button>
                    <button 
                      onClick={() => handleExport('pdf')}
                      className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-agricultural flex items-center space-x-2"
                    >
                      <Icon name="FileText" size={16} />
                      <span>PDF Summary</span>
                    </button>
                    <button 
                      onClick={() => handleExport('csv')}
                      className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-agricultural flex items-center space-x-2"
                    >
                      <Icon name="Download" size={16} />
                      <span>CSV Data</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Header */}
        <ProductionKPIHeader />

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
          {/* Production Chart - 3 columns */}
          <div className="xl:col-span-3">
            <ProductionChart />
          </div>

          {/* Side Panel - 1 column */}
          <div className="space-y-6">
            <ProductionLeaderboard />
            <QualityDistributionChart />
          </div>
        </div>

        {/* Production Table */}
        <div className="mb-8">
          <ProductionTable />
        </div>

        {/* Correlation Analysis */}
        <div className="mb-8">
          <CorrelationScatterPlot />
        </div>

        {/* Footer Stats */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Icon name="Database" size={20} className="text-primary" />
                <span className="font-medium text-foreground">Data Points</span>
              </div>
              <div className="text-2xl font-bold text-foreground">2.4M</div>
              <div className="text-sm text-muted-foreground">Collected today</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Icon name="TrendingUp" size={20} className="text-success" />
                <span className="font-medium text-foreground">Accuracy</span>
              </div>
              <div className="text-2xl font-bold text-foreground">99.7%</div>
              <div className="text-sm text-muted-foreground">Sensor reliability</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Icon name="Clock" size={20} className="text-accent" />
                <span className="font-medium text-foreground">Update Frequency</span>
              </div>
              <div className="text-2xl font-bold text-foreground">1hr</div>
              <div className="text-sm text-muted-foreground">Batch processing</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Icon name="Shield" size={20} className="text-warning" />
                <span className="font-medium text-foreground">Data Retention</span>
              </div>
              <div className="text-2xl font-bold text-foreground">2 Years</div>
              <div className="text-sm text-muted-foreground">Historical analysis</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductionAnalyticsDashboard;