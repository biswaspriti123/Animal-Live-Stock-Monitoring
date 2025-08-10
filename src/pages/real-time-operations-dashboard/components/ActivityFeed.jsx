import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    const mockActivities = [
      {
        id: 1,
        type: 'alert',
        severity: 'critical',
        title: 'High Temperature Alert',
        description: 'Cow #A247 body temperature reached 104.2°F in Pasture B',
        animal: 'Cow #A247',
        location: 'Pasture B',
        timestamp: new Date(Date.now() - 300000),
        icon: 'Thermometer',
        status: 'active'
      },
      {
        id: 2,
        type: 'location',
        severity: 'warning',
        title: 'Geofence Violation',
        description: 'Bull #B012 moved outside designated North Boundary area',
        animal: 'Bull #B012',
        location: 'North Boundary',
        timestamp: new Date(Date.now() - 600000),
        icon: 'MapPin',
        status: 'acknowledged'
      },
      {
        id: 3,
        type: 'device',
        severity: 'critical',
        title: 'Device Offline',
        description: 'GPS collar GPS-004 stopped responding from Cow #D089',
        animal: 'Cow #D089',
        location: 'Pasture A',
        timestamp: new Date(Date.now() - 900000),
        icon: 'WifiOff',
        status: 'active'
      },
      {
        id: 4,
        type: 'health',
        severity: 'warning',
        title: 'Heart Rate Anomaly',
        description: 'Elevated heart rate detected in Heifer #E234 (78 BPM)',
        animal: 'Heifer #E234',
        location: 'Barn 1',
        timestamp: new Date(Date.now() - 1200000),
        icon: 'Heart',
        status: 'monitoring'
      },
      {
        id: 5,
        type: 'activity',
        severity: 'medium',
        title: 'Low Activity Level',
        description: 'Cow #C156 activity below normal threshold for 2 hours',
        animal: 'Cow #C156',
        location: 'Barn 2',
        timestamp: new Date(Date.now() - 1500000),
        icon: 'Activity',
        status: 'resolved'
      },
      {
        id: 6,
        type: 'system',
        severity: 'info',
        title: 'Data Sync Complete',
        description: 'Successfully synchronized data from 43 active devices',
        animal: null,
        location: 'System',
        timestamp: new Date(Date.now() - 1800000),
        icon: 'RefreshCw',
        status: 'completed'
      },
      {
        id: 7,
        type: 'alert',
        severity: 'warning',
        title: 'Battery Low Warning',
        description: 'GPS collar GPS-002 battery level dropped to 42%',
        animal: 'Bull #B012',
        location: 'North Boundary',
        timestamp: new Date(Date.now() - 2100000),
        icon: 'Battery',
        status: 'active'
      },
      {
        id: 8,
        type: 'location',
        severity: 'info',
        title: 'Movement Pattern Change',
        description: 'Cow #F345 changed grazing pattern in Pasture C',
        animal: 'Cow #F345',
        location: 'Pasture C',
        timestamp: new Date(Date.now() - 2400000),
        icon: 'TrendingUp',
        status: 'normal'
      }
    ];
    setActivities(mockActivities);
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate new activity
      const newActivity = {
        id: Date.now(),
        type: 'system',
        severity: 'info',
        title: 'Status Update',
        description: `System health check completed at ${new Date()?.toLocaleTimeString()}`,
        animal: null,
        location: 'System',
        timestamp: new Date(),
        icon: 'CheckCircle',
        status: 'completed'
      };
      
      setActivities(prev => [newActivity, ...prev?.slice(0, 19)]);
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error border-l-error bg-error/5';
      case 'warning': return 'text-warning border-l-warning bg-warning/5';
      case 'medium': return 'text-accent border-l-accent bg-accent/5';
      case 'info': return 'text-primary border-l-primary bg-primary/5';
      default: return 'text-muted-foreground border-l-border bg-muted/5';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-error/20 text-error';
      case 'acknowledged': return 'bg-warning/20 text-warning';
      case 'monitoring': return 'bg-accent/20 text-accent';
      case 'resolved': return 'bg-success/20 text-success';
      case 'completed': return 'bg-primary/20 text-primary';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const filteredActivities = activities?.filter(activity => {
    if (filter === 'all') return true;
    if (filter === 'alerts') return ['alert', 'health']?.includes(activity?.type);
    if (filter === 'location') return activity?.type === 'location';
    if (filter === 'device') return activity?.type === 'device';
    if (filter === 'system') return activity?.type === 'system';
    return activity?.severity === filter;
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
            <Icon name="Activity" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Live Activity Feed</h2>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`} />
              <span className="text-xs text-muted-foreground">
                {autoRefresh ? 'Live' : 'Paused'}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={autoRefresh ? "default" : "outline"}
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              iconName={autoRefresh ? "Pause" : "Play"}
              iconPosition="left"
            >
              {autoRefresh ? 'Pause' : 'Resume'}
            </Button>
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Export
            </Button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {['all', 'critical', 'warning', 'alerts', 'location', 'device', 'system']?.map((filterType) => (
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
        {filteredActivities?.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <div className="text-center">
              <Icon name="Inbox" size={32} className="mx-auto mb-2" />
              <p>No activities matching filter</p>
            </div>
          </div>
        ) : (
          <div className="space-y-1 p-4">
            {filteredActivities?.map((activity) => (
              <div
                key={activity?.id}
                className={`border-l-4 rounded-r-lg p-4 transition-agricultural hover:bg-muted/10 ${getSeverityColor(activity?.severity)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name={activity?.icon} size={16} />
                    <span className="text-sm font-medium text-foreground">
                      {activity?.title}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(activity?.status)}`}>
                      {activity?.status?.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(activity?.timestamp)}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-2">
                  {activity?.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    {activity?.animal && (
                      <span className="flex items-center space-x-1">
                        <Icon name="Tag" size={12} />
                        <span>{activity?.animal}</span>
                      </span>
                    )}
                    <span className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{activity?.location}</span>
                    </span>
                  </div>
                  
                  {activity?.status === 'active' && (
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="xs" iconName="Eye">
                        View
                      </Button>
                      <Button variant="ghost" size="xs" iconName="Check">
                        Ack
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Activity Summary */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-error">
              {activities?.filter(a => a?.severity === 'critical')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-warning">
              {activities?.filter(a => a?.severity === 'warning')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Warning</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-accent">
              {activities?.filter(a => a?.status === 'active')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-success">
              {activities?.filter(a => a?.status === 'resolved')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Resolved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;