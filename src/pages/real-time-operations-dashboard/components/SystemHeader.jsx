import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemHeader = () => {
  const [systemStats, setSystemStats] = useState({});
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState('connected');

  useEffect(() => {
    const mockStats = {
      totalAnimals: 247,
      onlineDevices: 43,
      totalDevices: 47,
      activeAlerts: 8,
      criticalAlerts: 3,
      systemHealth: 98.5,
      dataLatency: 1.2,
      uptime: '99.8%'
    };
    setSystemStats(mockStats);

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate minor stat changes
      setSystemStats(prev => ({
        ...prev,
        activeAlerts: prev?.activeAlerts + Math.floor(Math.random() * 3) - 1,
        systemHealth: Math.max(95, Math.min(100, prev?.systemHealth + (Math.random() - 0.5) * 2))
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getHealthColor = (health) => {
    if (health >= 98) return 'text-success';
    if (health >= 95) return 'text-warning';
    return 'text-error';
  };

  const getConnectionColor = () => {
    return connectionStatus === 'connected' ? 'text-success' : 'text-error';
  };

  const formatUptime = () => {
    const now = new Date();
    const diff = Math.floor((now - lastUpdate) / 1000);
    if (diff < 60) return `Updated ${diff}s ago`;
    if (diff < 3600) return `Updated ${Math.floor(diff / 60)}m ago`;
    return `Updated ${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Real-Time Operations Center</h1>
            <p className="text-sm text-muted-foreground">
              Mission-critical livestock monitoring and rapid response dashboard
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getConnectionColor()} animate-pulse`} />
            <span className="text-sm text-muted-foreground">
              {connectionStatus === 'connected' ? 'Live Data' : 'Offline'}
            </span>
          </div>
          
          {/* Emergency Button */}
          <Button 
            variant="destructive" 
            size="sm" 
            iconName="AlertTriangle" 
            iconPosition="left"
            className="animate-pulse"
          >
            Emergency
          </Button>
        </div>
      </div>
      {/* System Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {/* Total Animals */}
        <div className="bg-muted/20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <Icon name="Beef" size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
          <div className="text-xl font-bold text-foreground">{systemStats?.totalAnimals}</div>
          <div className="text-xs text-muted-foreground">Animals</div>
        </div>

        {/* Online Devices */}
        <div className="bg-muted/20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <Icon name="Wifi" size={16} className="text-success" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
          <div className="text-xl font-bold text-foreground">
            {systemStats?.onlineDevices}/{systemStats?.totalDevices}
          </div>
          <div className="text-xs text-muted-foreground">Devices</div>
        </div>

        {/* Active Alerts */}
        <div className="bg-muted/20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <Icon name="Bell" size={16} className="text-warning" />
            <span className="text-xs text-muted-foreground">Active</span>
          </div>
          <div className="text-xl font-bold text-foreground">{systemStats?.activeAlerts}</div>
          <div className="text-xs text-muted-foreground">Alerts</div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-muted/20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <Icon name="AlertTriangle" size={16} className="text-error" />
            <span className="text-xs text-muted-foreground">Critical</span>
          </div>
          <div className="text-xl font-bold text-error">{systemStats?.criticalAlerts}</div>
          <div className="text-xs text-muted-foreground">Urgent</div>
        </div>

        {/* System Health */}
        <div className="bg-muted/20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <Icon name="Heart" size={16} className={getHealthColor(systemStats?.systemHealth)} />
            <span className="text-xs text-muted-foreground">Health</span>
          </div>
          <div className={`text-xl font-bold ${getHealthColor(systemStats?.systemHealth)}`}>
            {systemStats?.systemHealth?.toFixed(1)}%
          </div>
          <div className="text-xs text-muted-foreground">System</div>
        </div>

        {/* Data Latency */}
        <div className="bg-muted/20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <Icon name="Zap" size={16} className="text-accent" />
            <span className="text-xs text-muted-foreground">Latency</span>
          </div>
          <div className="text-xl font-bold text-foreground">{systemStats?.dataLatency}s</div>
          <div className="text-xs text-muted-foreground">Response</div>
        </div>

        {/* Uptime */}
        <div className="bg-muted/20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <Icon name="Clock" size={16} className="text-success" />
            <span className="text-xs text-muted-foreground">Uptime</span>
          </div>
          <div className="text-xl font-bold text-success">{systemStats?.uptime}</div>
          <div className="text-xs text-muted-foreground">Reliability</div>
        </div>

        {/* Last Update */}
        <div className="bg-muted/20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <Icon name="RefreshCw" size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">Updated</span>
          </div>
          <div className="text-sm font-bold text-foreground">
            {lastUpdate?.toLocaleTimeString()}
          </div>
          <div className="text-xs text-muted-foreground">
            {formatUptime()}
          </div>
        </div>
      </div>
      {/* Status Bar */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Database" size={14} className="text-success" />
              <span className="text-muted-foreground">Data Stream: Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={14} className="text-success" />
              <span className="text-muted-foreground">Security: Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={14} className="text-primary" />
              <span className="text-muted-foreground">Field Team: 4 Active</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="xs" iconName="Settings">
              Settings
            </Button>
            <Button variant="ghost" size="xs" iconName="Download">
              Export
            </Button>
            <Button variant="ghost" size="xs" iconName="RefreshCw">
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHeader;