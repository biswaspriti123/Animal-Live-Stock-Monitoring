import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertPanel = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const mockAlerts = [
      {
        id: 1,
        severity: 'critical',
        type: 'health',
        title: 'High Temperature Alert',
        animal: 'Cow #A247',
        location: 'Pasture B',
        description: 'Body temperature 104.2°F detected',
        timestamp: new Date(Date.now() - 300000),
        acknowledged: false,
        actions: ['Contact Vet', 'Isolate Animal', 'Monitor']
      },
      {
        id: 2,
        severity: 'warning',
        type: 'location',
        title: 'Geofence Violation',
        animal: 'Bull #B012',
        location: 'North Boundary',
        description: 'Animal moved outside designated area',
        timestamp: new Date(Date.now() - 600000),
        acknowledged: false,
        actions: ['Guide Back', 'Check Fence', 'Monitor']
      },
      {
        id: 3,
        severity: 'medium',
        type: 'activity',
        title: 'Low Activity Level',
        animal: 'Cow #C156',
        location: 'Barn 2',
        description: 'Activity below normal threshold for 2 hours',
        timestamp: new Date(Date.now() - 900000),
        acknowledged: true,
        actions: ['Health Check', 'Feed Check', 'Monitor']
      },
      {
        id: 4,
        severity: 'critical',
        type: 'device',
        title: 'Sensor Malfunction',
        animal: 'Cow #D089',
        location: 'Pasture A',
        description: 'GPS collar not responding',
        timestamp: new Date(Date.now() - 1200000),
        acknowledged: false,
        actions: ['Replace Device', 'Manual Check', 'Contact Tech']
      },
      {
        id: 5,
        severity: 'warning',
        type: 'health',
        title: 'Heart Rate Anomaly',
        animal: 'Heifer #E234',
        location: 'Barn 1',
        description: 'Elevated heart rate detected',
        timestamp: new Date(Date.now() - 1800000),
        acknowledged: false,
        actions: ['Vet Consultation', 'Stress Check', 'Monitor']
      }
    ];
    setAlerts(mockAlerts);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error border-error bg-error/10';
      case 'warning': return 'text-warning border-warning bg-warning/10';
      case 'medium': return 'text-accent border-accent bg-accent/10';
      default: return 'text-muted-foreground border-border bg-muted/10';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'medium': return 'Info';
      default: return 'Bell';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'health': return 'Heart';
      case 'location': return 'MapPin';
      case 'activity': return 'Activity';
      case 'device': return 'Wifi';
      default: return 'Bell';
    }
  };

  const handleAcknowledge = (alertId) => {
    setAlerts(prev => prev?.map(alert => 
      alert?.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleQuickAction = (alertId, action) => {
    console.log(`Executing ${action} for alert ${alertId}`);
    handleAcknowledge(alertId);
  };

  const filteredAlerts = alerts?.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unacknowledged') return !alert?.acknowledged;
    return alert?.severity === filter;
  });

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-error" />
            <h2 className="text-lg font-semibold text-foreground">Active Alerts</h2>
            <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full">
              {alerts?.filter(a => !a?.acknowledged)?.length}
            </span>
          </div>
          <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {['all', 'critical', 'warning', 'medium', 'unacknowledged']?.map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-agricultural ${
                filter === filterType
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {filterType?.charAt(0)?.toUpperCase() + filterType?.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredAlerts?.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <div className="text-center">
              <Icon name="CheckCircle" size={32} className="mx-auto mb-2 text-success" />
              <p>No alerts matching filter</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 p-4">
            {filteredAlerts?.map((alert) => (
              <div
                key={alert?.id}
                className={`border rounded-lg p-4 transition-agricultural ${
                  alert?.acknowledged 
                    ? 'border-border bg-muted/20 opacity-60' 
                    : getSeverityColor(alert?.severity)
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getSeverityIcon(alert?.severity)} 
                      size={16} 
                      className={alert?.acknowledged ? 'text-muted-foreground' : ''} 
                    />
                    <Icon 
                      name={getTypeIcon(alert?.type)} 
                      size={14} 
                      className="text-muted-foreground" 
                    />
                    <span className="text-sm font-medium text-foreground">
                      {alert?.title}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(alert?.timestamp)}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-1">
                    <span className="flex items-center space-x-1">
                      <Icon name="Tag" size={12} />
                      <span>{alert?.animal}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{alert?.location}</span>
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{alert?.description}</p>
                </div>

                {!alert?.acknowledged && (
                  <div className="flex flex-wrap gap-2">
                    {alert?.actions?.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="xs"
                        onClick={() => handleQuickAction(alert?.id, action)}
                        className="text-xs"
                      >
                        {action}
                      </Button>
                    ))}
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleAcknowledge(alert?.id)}
                      iconName="Check"
                      iconPosition="left"
                      className="text-xs text-success"
                    >
                      Acknowledge
                    </Button>
                  </div>
                )}

                {alert?.acknowledged && (
                  <div className="flex items-center space-x-1 text-xs text-success">
                    <Icon name="CheckCircle" size={12} />
                    <span>Acknowledged</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertPanel;