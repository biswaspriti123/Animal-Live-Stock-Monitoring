import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const GlobalControls = () => {
  const [selectedFarm, setSelectedFarm] = useState('main-farm');
  const [dateRange, setDateRange] = useState('today');
  const [connectionStatus, setConnectionStatus] = useState('connected');

  const farmOptions = [
    { value: 'main-farm', label: 'Main Farm - Sector A' },
    { value: 'north-farm', label: 'North Farm - Sector B' },
    { value: 'south-farm', label: 'South Farm - Sector C' },
    { value: 'all-farms', label: 'All Farms Combined' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const getConnectionColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-success';
      case 'connecting': return 'text-warning';
      case 'disconnected': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected': return 'Wifi';
      case 'connecting': return 'Loader';
      case 'disconnected': return 'WifiOff';
      default: return 'Wifi';
    }
  };

  const formatLastUpdate = () => {
    const now = new Date();
    return now?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Farm & Date Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={20} className="text-primary" />
            <Select
              options={farmOptions}
              value={selectedFarm}
              onChange={setSelectedFarm}
              className="min-w-48"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={20} className="text-primary" />
            <Select
              options={dateRangeOptions}
              value={dateRange}
              onChange={setDateRange}
              className="min-w-36"
            />
          </div>
        </div>

        {/* Right Section - Status & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 ${getConnectionColor()}`}>
              <Icon 
                name={getConnectionIcon()} 
                size={16} 
                className={connectionStatus === 'connecting' ? 'animate-spin' : ''} 
              />
              <span className="text-sm font-medium capitalize">{connectionStatus}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Last update: {formatLastUpdate()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              className="flex items-center space-x-1 px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-agricultural"
              title="Refresh all data"
            >
              <Icon name="RefreshCw" size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            
            <button
              className="flex items-center space-x-1 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-agricultural"
              title="Export dashboard data"
            >
              <Icon name="Download" size={16} />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              className="p-2 hover:bg-muted rounded-md transition-agricultural"
              title="Dashboard settings"
            >
              <Icon name="Settings" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Active Sensors</p>
            <p className="text-sm font-semibold text-success">24/25</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Data Points/Min</p>
            <p className="text-sm font-semibold text-primary">1,247</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">System Uptime</p>
            <p className="text-sm font-semibold text-accent">99.8%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Response Time</p>
            <p className="text-sm font-semibold text-warning">0.3s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;