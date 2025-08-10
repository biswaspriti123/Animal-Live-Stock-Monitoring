import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../components/ui/Layout';
import HealthMetricsCard from './components/HealthMetricsCard';
import VitalSignsChart from './components/VitalSignsChart';
import HealthScoreDistribution from './components/HealthScoreDistribution';
import AnimalHealthTable from './components/AnimalHealthTable';
import HealthHeatmap from './components/HealthHeatmap';
import HealthControlPanel from './components/HealthControlPanel';
import AddAnimalModal from './components/AddAnimalModal';
import AlertManagementModal from './components/AlertManagementModal';
import NotificationSystem from './components/NotificationSystem';

const AnimalHealthMonitoringDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [realTimeData, setRealTimeData] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    breed: '',
    ageGroup: '',
    healthStatus: '',
    dateRange: '7d'
  });
  const [thresholds, setThresholds] = useState({
    temperature: 39.0,
    heartRate: 90,
    activity: 40
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isLiveMonitoring, setIsLiveMonitoring] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Mock real-time data generation
  const generateRealTimeData = useCallback(() => {
    const now = new Date();
    const baseHealthMetrics = [
      {
        title: 'Animals at Risk',
        baseValue: 16,
        icon: 'AlertTriangle',
        iconColor: 'bg-error',
        description: 'Requiring immediate attention'
      },
      {
        title: 'Temperature Alerts',
        baseValue: 8,
        icon: 'Thermometer',
        iconColor: 'bg-warning',
        description: 'Above normal threshold'
      },
      {
        title: 'Activity Anomalies',
        baseValue: 5,
        icon: 'Activity',
        iconColor: 'bg-primary',
        description: 'Unusual behavior patterns'
      },
      {
        title: 'Health Score Avg',
        baseValue: 84.2,
        icon: 'Heart',
        iconColor: 'bg-success',
        description: 'Overall herd health'
      }
    ];

    return {
      timestamp: now?.toISOString(),
      healthMetrics: baseHealthMetrics?.map((metric) => {
        const variation = (Math.random() - 0.5) * 4; // +/- 2 variation
        const newValue = Math.max(0, metric?.baseValue + variation);
        const change = variation > 0 ? `+${variation?.toFixed(1)}%` : `${variation?.toFixed(1)}%`;
        const changeType = metric?.title === 'Animals at Risk' || metric?.title === 'Temperature Alerts' || metric?.title === 'Activity Anomalies'
          ? variation < 0 ? 'positive' : 'negative'
          : variation > 0 ? 'positive' : 'negative';

        return {
          ...metric,
          value: metric?.title === 'Health Score Avg' ? newValue?.toFixed(1) : Math.round(newValue)?.toString(),
          change,
          changeType
        };
      }),
      vitalSigns: Array.from({ length: 24 }, (_, i) => ({
        time: `${i?.toString()?.padStart(2, '0')}:00`,
        temperature: 37.5 + Math.random() * 2.5,
        heartRate: 65 + Math.random() * 30,
        activity: 30 + Math.random() * 60
      })),
      alerts: [
        {
          id: Date.now() + Math.random(),
          type: 'temperature',
          severity: 'high',
          animalId: 'A003',
          message: 'High temperature detected: 40.2°C',
          timestamp: now?.toISOString(),
          acknowledged: false
        }
      ]
    };
  }, []);

  // Real-time data updates
  useEffect(() => {
    if (isLiveMonitoring) {
      const interval = setInterval(() => {
        setRealTimeData(generateRealTimeData());
      }, 15000); // Update every 15 seconds for demo

      // Initial data load
      setRealTimeData(generateRealTimeData());

      return () => clearInterval(interval);
    }
  }, [isLiveMonitoring, generateRealTimeData, thresholds]);

  // Language setup
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Notification management
  const addNotification = useCallback((notification) => {
    setNotifications(prev => [...prev, { 
      id: Date.now() + Math.random(), 
      timestamp: new Date()?.toISOString(),
      ...notification 
    }]);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev?.filter(n => n?.id !== id));
  }, []);

  // Filter management
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Threshold management
  const updateThresholds = useCallback((newThresholds) => {
    setThresholds(prev => ({ ...prev, ...newThresholds }));
    // Trigger alert check
    addNotification({
      type: 'info',
      message: 'Alert thresholds updated successfully',
      duration: 3000
    });
  }, [addNotification]);

  // Manual refresh
  const handleManualRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
    setRealTimeData(generateRealTimeData());
    addNotification({
      type: 'success',
      message: 'Data refreshed successfully',
      duration: 2000
    });
  }, [generateRealTimeData, addNotification]);

  // Export functionality
  const handleExportReport = useCallback(async () => {
    try {
      const reportData = {
        timestamp: new Date()?.toISOString(),
        filters,
        healthMetrics: realTimeData?.healthMetrics,
        summary: 'Animal Health Monitoring Report'
      };

      const dataStr = JSON.stringify(reportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `health-report-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement?.setAttribute('href', dataUri);
      linkElement?.setAttribute('download', exportFileDefaultName);
      linkElement?.click();
      
      addNotification({
        type: 'success',
        message: 'Health report exported successfully',
        duration: 3000
      });
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to export report',
        duration: 3000
      });
    }
  }, [filters, realTimeData, addNotification]);

  // Toggle live monitoring
  const toggleLiveMonitoring = useCallback(() => {
    setIsLiveMonitoring(prev => {
      const newState = !prev;
      addNotification({
        type: newState ? 'success' : 'warning',
        message: newState ? 'Live monitoring enabled' : 'Live monitoring paused',
        duration: 2000
      });
      return newState;
    });
  }, [addNotification]);

  const healthMetrics = realTimeData?.healthMetrics || [
    {
      title: 'Animals at Risk',
      value: '16',
      change: '+2.3%',
      changeType: 'negative',
      icon: 'AlertTriangle',
      iconColor: 'bg-error',
      description: 'Requiring immediate attention'
    },
    {
      title: 'Temperature Alerts',
      value: '8',
      change: '-12.5%',
      changeType: 'positive',
      icon: 'Thermometer',
      iconColor: 'bg-warning',
      description: 'Above normal threshold'
    },
    {
      title: 'Activity Anomalies',
      value: '5',
      change: '-8.2%',
      changeType: 'positive',
      icon: 'Activity',
      iconColor: 'bg-primary',
      description: 'Unusual behavior patterns'
    },
    {
      title: 'Health Score Avg',
      value: '84.2',
      change: '+1.8%',
      changeType: 'positive',
      icon: 'Heart',
      iconColor: 'bg-success',
      description: 'Overall herd health'
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Animal Health Monitoring Dashboard - Veterinary Analytics</title>
        <meta name="description" content="Specialized veterinary dashboard for detailed health analysis and predictive insights for animal welfare management" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Animal Health Monitoring</h1>
              <p className="text-muted-foreground mt-2">
                Specialized veterinary dashboard for detailed health analysis and predictive insights
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLiveMonitoring}
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className={`w-2 h-2 rounded-full ${isLiveMonitoring ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
                <span>{isLiveMonitoring ? 'Live monitoring active' : 'Live monitoring paused'}</span>
              </button>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                Last update: {realTimeData ? '0 min ago' : '2 min ago'}
              </span>
            </div>
          </div>
        </div>

        {/* Health Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthMetrics?.map((metric, index) => (
            <HealthMetricsCard
              key={index}
              title={metric?.title}
              value={metric?.value}
              change={metric?.change}
              changeType={metric?.changeType}
              icon={metric?.icon}
              iconColor={metric?.iconColor}
              description={metric?.description}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
          {/* Vital Signs Chart - 8 columns */}
          <div className="xl:col-span-8">
            <VitalSignsChart 
              realTimeData={realTimeData}
              filters={filters}
              onFiltersChange={updateFilters}
            />
          </div>

          {/* Health Score Distribution - 4 columns */}
          <div className="xl:col-span-4">
            <HealthScoreDistribution 
              realTimeData={realTimeData}
              filters={filters}
            />
          </div>
        </div>

        {/* Control Panel */}
        <div className="mb-8">
          <HealthControlPanel 
            filters={filters}
            thresholds={thresholds}
            onFiltersChange={updateFilters}
            onThresholdsChange={updateThresholds}
            onRefresh={handleManualRefresh}
            onExport={handleExportReport}
            onAddAnimal={() => setIsAddModalOpen(true)}
            onViewAlerts={() => setIsAlertModalOpen(true)}
            isLiveMonitoring={isLiveMonitoring}
          />
        </div>

        {/* Animal Health Table - Full width */}
        <div className="mb-8">
          <AnimalHealthTable 
            filters={filters}
            onFiltersChange={updateFilters}
            onAnimalSelect={setSelectedAnimal}
            onExport={handleExportReport}
            refreshTrigger={refreshTrigger}
          />
        </div>

        {/* Health Heatmap - Full width */}
        <div className="mb-8">
          <HealthHeatmap 
            filters={filters}
            realTimeData={realTimeData}
            onAreaSelect={(area) => addNotification({
              type: 'info',
              message: `Selected area: ${area?.area}`,
              duration: 2000
            })}
          />
        </div>

        {/* Footer Information */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Data Refresh Rate</h3>
              <p className="text-sm text-muted-foreground">
                Vital signs update every 15 seconds in live mode with manual refresh available
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Export Options</h3>
              <p className="text-sm text-muted-foreground">
                Generate veterinary reports in JSON format with real-time data, charts, and recommendations
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Alert System</h3>
              <p className="text-sm text-muted-foreground">
                Configurable thresholds with real-time notifications for proactive health management
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddAnimalModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(animal) => {
          addNotification({
            type: 'success',
            message: `Animal ${animal?.name} added successfully`,
            duration: 3000
          });
          setRefreshTrigger(prev => prev + 1);
        }}
      />

      <AlertManagementModal 
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        alerts={realTimeData?.alerts || []}
        onAcknowledge={(alertId) => {
          addNotification({
            type: 'success',
            message: 'Alert acknowledged',
            duration: 2000
          });
        }}
      />

      {/* Notification System */}
      <NotificationSystem 
        notifications={notifications}
        onRemove={removeNotification}
      />
    </Layout>
  );
};

export default AnimalHealthMonitoringDashboard;