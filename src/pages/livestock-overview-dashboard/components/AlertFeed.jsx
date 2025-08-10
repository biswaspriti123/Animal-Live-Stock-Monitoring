import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AlertFeed = () => {
  const [filter, setFilter] = useState('all');

  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'High Temperature Alert',
      message: 'Luna (A004) temperature reached 105.2°F',
      timestamp: new Date(Date.now() - 300000),
      animalId: 'A004',
      resolved: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Elevated Heart Rate',
      message: 'Daisy (A002) heart rate at 85 BPM for 15 minutes',
      timestamp: new Date(Date.now() - 900000),
      animalId: 'A002',
      resolved: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Geofence Exit',
      message: 'Bessie (A001) left designated grazing area',
      timestamp: new Date(Date.now() - 1800000),
      animalId: 'A001',
      resolved: true
    },
    {
      id: 4,
      type: 'warning',
      title: 'Low Activity Level',
      message: 'Molly (A003) activity below normal for 2 hours',
      timestamp: new Date(Date.now() - 3600000),
      animalId: 'A003',
      resolved: false
    },
    {
      id: 5,
      type: 'critical',
      title: 'Device Offline',
      message: 'Monitoring device for Charlie (A005) disconnected',
      timestamp: new Date(Date.now() - 7200000),
      animalId: 'A005',
      resolved: false
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getAlertBgColor = (type) => {
    switch (type) {
      case 'critical': return 'bg-error/10 border-error/20';
      case 'warning': return 'bg-warning/10 border-warning/20';
      case 'info': return 'bg-primary/10 border-primary/20';
      default: return 'bg-muted/10 border-border';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const filteredAlerts = alerts?.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unresolved') return !alert?.resolved;
    return alert?.type === filter;
  });

  const unresolvedCount = alerts?.filter(alert => !alert?.resolved)?.length;

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Alert Feed</h3>
            {unresolvedCount > 0 && (
              <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full">
                {unresolvedCount}
              </span>
            )}
          </div>
          <button className="p-2 hover:bg-muted rounded-md transition-agricultural">
            <Icon name="Settings" size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-1">
          {['all', 'critical', 'warning', 'info', 'unresolved']?.map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 text-xs rounded-md transition-agricultural ${
                filter === filterType
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {filterType?.charAt(0)?.toUpperCase() + filterType?.slice(1)}
            </button>
          ))}
        </div>
      </div>
      {/* Alert List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredAlerts?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
            <p className="text-muted-foreground">No alerts matching your filter</p>
          </div>
        ) : (
          <div className="space-y-2 p-4">
            {filteredAlerts?.map((alert) => (
              <div
                key={alert?.id}
                className={`p-3 rounded-lg border ${getAlertBgColor(alert?.type)} ${
                  alert?.resolved ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Icon
                    name={getAlertIcon(alert?.type)}
                    size={16}
                    className={`mt-0.5 ${getAlertColor(alert?.type)}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {alert?.title}
                      </h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {formatTimestamp(alert?.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert?.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        {alert?.animalId}
                      </span>
                      {!alert?.resolved && (
                        <div className="flex space-x-1">
                          <button className="text-xs text-primary hover:text-primary/80 transition-agricultural">
                            View
                          </button>
                          <button className="text-xs text-success hover:text-success/80 transition-agricultural">
                            Resolve
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 transition-agricultural">
          View All Alerts
        </button>
      </div>
    </div>
  );
};

export default AlertFeed;