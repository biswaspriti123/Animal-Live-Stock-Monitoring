import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StatusPanel = () => {
  const [systemStatus, setSystemStatus] = useState({});
  const [devices, setDevices] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const mockSystemStatus = {
      totalDevices: 47,
      onlineDevices: 43,
      offlineDevices: 4,
      batteryLow: 6,
      signalWeak: 2,
      dataLatency: 1.2,
      lastSync: new Date(Date.now() - 45000),
      serverHealth: 'excellent',
      networkStatus: 'stable'
    };

    const mockDevices = [
      {
        id: 'GPS-001',
        animal: 'Cow #A247',
        type: 'GPS Collar',
        status: 'online',
        battery: 85,
        signal: 'strong',
        lastPing: new Date(Date.now() - 30000),
        location: 'Pasture B'
      },
      {
        id: 'GPS-002',
        animal: 'Bull #B012',
        type: 'GPS Collar',
        status: 'online',
        battery: 42,
        signal: 'medium',
        lastPing: new Date(Date.now() - 60000),
        location: 'North Boundary'
      },
      {
        id: 'HEALTH-003',
        animal: 'Cow #C156',
        type: 'Health Monitor',
        status: 'online',
        battery: 67,
        signal: 'strong',
        lastPing: new Date(Date.now() - 45000),
        location: 'Barn 2'
      },
      {
        id: 'GPS-004',
        animal: 'Cow #D089',
        type: 'GPS Collar',
        status: 'offline',
        battery: 12,
        signal: 'none',
        lastPing: new Date(Date.now() - 1200000),
        location: 'Pasture A'
      },
      {
        id: 'HEALTH-005',
        animal: 'Heifer #E234',
        type: 'Health Monitor',
        status: 'online',
        battery: 78,
        signal: 'weak',
        lastPing: new Date(Date.now() - 90000),
        location: 'Barn 1'
      },
      {
        id: 'GPS-006',
        animal: 'Cow #F345',
        type: 'GPS Collar',
        status: 'maintenance',
        battery: 0,
        signal: 'none',
        lastPing: new Date(Date.now() - 3600000),
        location: 'Workshop'
      }
    ];

    setSystemStatus(mockSystemStatus);
    setDevices(mockDevices);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-success';
      case 'offline': return 'text-error';
      case 'maintenance': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return 'CheckCircle';
      case 'offline': return 'XCircle';
      case 'maintenance': return 'Tool';
      default: return 'Circle';
    }
  };

  const getBatteryColor = (battery) => {
    if (battery > 50) return 'text-success';
    if (battery > 20) return 'text-warning';
    return 'text-error';
  };

  const getSignalIcon = (signal) => {
    switch (signal) {
      case 'strong': return 'Wifi';
      case 'medium': return 'Wifi';
      case 'weak': return 'WifiOff';
      case 'none': return 'WifiOff';
      default: return 'WifiOff';
    }
  };

  const getSignalColor = (signal) => {
    switch (signal) {
      case 'strong': return 'text-success';
      case 'medium': return 'text-warning';
      case 'weak': return 'text-error';
      case 'none': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
      setSystemStatus(prev => ({
        ...prev,
        lastSync: new Date()
      }));
    }, 1000);
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">System Status</h2>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            iconName="RefreshCw" 
            iconPosition="left"
            loading={refreshing}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-muted/20 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Online</span>
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
            <div className="text-xl font-semibold text-foreground">
              {systemStatus?.onlineDevices}
            </div>
            <div className="text-xs text-muted-foreground">
              of {systemStatus?.totalDevices} devices
            </div>
          </div>

          <div className="bg-muted/20 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Offline</span>
              <Icon name="XCircle" size={16} className="text-error" />
            </div>
            <div className="text-xl font-semibold text-foreground">
              {systemStatus?.offlineDevices}
            </div>
            <div className="text-xs text-muted-foreground">
              need attention
            </div>
          </div>

          <div className="bg-muted/20 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Low Battery</span>
              <Icon name="Battery" size={16} className="text-warning" />
            </div>
            <div className="text-xl font-semibold text-foreground">
              {systemStatus?.batteryLow}
            </div>
            <div className="text-xs text-muted-foreground">
              &lt;20% charge
            </div>
          </div>

          <div className="bg-muted/20 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Weak Signal</span>
              <Icon name="WifiOff" size={16} className="text-error" />
            </div>
            <div className="text-xl font-semibold text-foreground">
              {systemStatus?.signalWeak}
            </div>
            <div className="text-xs text-muted-foreground">
              poor connectivity
            </div>
          </div>
        </div>

        {/* Network Status */}
        <div className="bg-muted/10 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Network Health</span>
            <span className="text-xs text-success">Excellent</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Latency: {systemStatus?.dataLatency}s</span>
            <span>Last sync: {formatTimestamp(systemStatus?.lastSync)}</span>
          </div>
        </div>
      </div>
      {/* Device List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Device Status</h3>
          <div className="space-y-2">
            {devices?.map((device) => (
              <div
                key={device?.id}
                className="bg-muted/10 rounded-lg p-3 border border-border/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getStatusIcon(device?.status)} 
                      size={14} 
                      className={getStatusColor(device?.status)} 
                    />
                    <span className="text-sm font-medium text-foreground">
                      {device?.id}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(device?.lastPing)}
                  </span>
                </div>

                <div className="text-xs text-muted-foreground mb-2">
                  {device?.animal} • {device?.location}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Battery" size={12} className={getBatteryColor(device?.battery)} />
                      <span className="text-xs">{device?.battery}%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon 
                        name={getSignalIcon(device?.signal)} 
                        size={12} 
                        className={getSignalColor(device?.signal)} 
                      />
                      <span className="text-xs capitalize">{device?.signal}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    device?.status === 'online' ? 'bg-success/20 text-success' :
                    device?.status === 'offline'? 'bg-error/20 text-error' : 'bg-warning/20 text-warning'
                  }`}>
                    {device?.status?.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
            Configure
          </Button>
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;