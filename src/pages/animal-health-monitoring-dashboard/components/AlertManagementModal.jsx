import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertManagementModal = ({ isOpen, onClose, alerts = [], onAcknowledge }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');

  const mockAlerts = alerts?.length ? alerts : [
    {
      id: 1,
      type: 'temperature',
      severity: 'high',
      animalId: 'A003',
      animalName: 'Luna',
      message: 'High temperature detected: 40.2°C',
      timestamp: new Date(Date.now() - 5 * 60 * 1000)?.toISOString(),
      acknowledged: false,
      location: 'Isolation Unit'
    },
    {
      id: 2,
      type: 'heartRate',
      severity: 'medium',
      animalId: 'A007',
      animalName: 'Mango',
      message: 'Elevated heart rate: 98 BPM',
      timestamp: new Date(Date.now() - 15 * 60 * 1000)?.toISOString(),
      acknowledged: false,
      location: 'Pasture B'
    },
    {
      id: 3,
      type: 'activity',
      severity: 'low',
      animalId: 'A012',
      animalName: 'Cocoa',
      message: 'Low activity detected: 25%',
      timestamp: new Date(Date.now() - 30 * 60 * 1000)?.toISOString(),
      acknowledged: true,
      location: 'Barn 1'
    },
    {
      id: 4,
      type: 'system',
      severity: 'high',
      animalId: null,
      animalName: null,
      message: 'Sensor A-15 connectivity lost',
      timestamp: new Date(Date.now() - 45 * 60 * 1000)?.toISOString(),
      acknowledged: false,
      location: 'Field C-3'
    }
  ];

  const filteredAndSortedAlerts = useMemo(() => {
    let filtered = mockAlerts;

    // Apply filter
    if (filter !== 'all') {
      if (filter === 'unacknowledged') {
        filtered = filtered?.filter(alert => !alert?.acknowledged);
      } else {
        filtered = filtered?.filter(alert => alert?.severity === filter);
      }
    }

    // Apply sorting
    filtered = filtered?.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'timestamp':
          aValue = new Date(a?.timestamp);
          bValue = new Date(b?.timestamp);
          break;
        case 'severity':
          const severityOrder = { high: 3, medium: 2, low: 1 };
          aValue = severityOrder?.[a?.severity];
          bValue = severityOrder?.[b?.severity];
          break;
        case 'animalId':
          aValue = a?.animalId || 'ZZZ';
          bValue = b?.animalId || 'ZZZ';
          break;
        default:
          aValue = a?.[sortBy];
          bValue = b?.[sortBy];
      }

      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : 1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [mockAlerts, filter, sortBy, sortOrder]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error bg-error/20';
      case 'medium': return 'text-warning bg-warning/20';
      case 'low': return 'text-success bg-success/20';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'temperature': return 'Thermometer';
      case 'heartRate': return 'Heart';
      case 'activity': return 'Activity';
      case 'system': return 'AlertTriangle';
      default: return 'Bell';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffMs = now - alertTime;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return alertTime?.toLocaleDateString();
  };

  const handleAcknowledge = (alertId) => {
    onAcknowledge?.(alertId);
  };

  const handleAcknowledgeAll = () => {
    filteredAndSortedAlerts?.forEach(alert => {
      if (!alert?.acknowledged) {
        handleAcknowledge(alert?.id);
      }
    });
  };

  const stats = {
    total: mockAlerts?.length,
    high: mockAlerts?.filter(a => a?.severity === 'high')?.length,
    unacknowledged: mockAlerts?.filter(a => !a?.acknowledged)?.length
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card rounded-lg border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Alert Management</h2>
                <p className="text-sm text-muted-foreground">Monitor and manage system alerts</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={onClose}
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-muted/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Bell" size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">Total</span>
                </div>
                <p className="text-lg font-semibold text-foreground">{stats?.total}</p>
              </div>
              <div className="bg-muted/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-error" />
                  <span className="text-sm text-muted-foreground">High Priority</span>
                </div>
                <p className="text-lg font-semibold text-foreground">{stats?.high}</p>
              </div>
              <div className="bg-muted/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-warning" />
                  <span className="text-sm text-muted-foreground">Unacknowledged</span>
                </div>
                <p className="text-lg font-semibold text-foreground">{stats?.unacknowledged}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  All ({stats?.total})
                </Button>
                <Button
                  variant={filter === 'unacknowledged' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('unacknowledged')}
                >
                  Unacknowledged ({stats?.unacknowledged})
                </Button>
                <Button
                  variant={filter === 'high' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('high')}
                >
                  High Priority ({stats?.high})
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="CheckCheck"
                  onClick={handleAcknowledgeAll}
                  disabled={stats?.unacknowledged === 0}
                >
                  Acknowledge All
                </Button>
              </div>
            </div>
          </div>

          {/* Alert List */}
          <div className="overflow-y-auto max-h-96">
            {filteredAndSortedAlerts?.length > 0 ? (
              <div className="p-6 space-y-4">
                {filteredAndSortedAlerts?.map((alert) => (
                  <div
                    key={alert?.id}
                    className={`border rounded-lg p-4 ${
                      alert?.acknowledged ? 'bg-muted/10 border-muted' : 'bg-card border-border'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getSeverityColor(alert?.severity)}`}>
                          <Icon name={getTypeIcon(alert?.type)} size={16} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert?.severity)}`}>
                              {alert?.severity?.toUpperCase()}
                            </span>
                            {alert?.animalId && (
                              <span className="text-sm text-muted-foreground">
                                {alert?.animalId} - {alert?.animalName}
                              </span>
                            )}
                          </div>
                          
                          <p className="text-sm text-foreground mb-2">{alert?.message}</p>
                          
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Icon name="Clock" size={12} />
                              <span>{formatTimestamp(alert?.timestamp)}</span>
                            </div>
                            {alert?.location && (
                              <div className="flex items-center space-x-1">
                                <Icon name="MapPin" size={12} />
                                <span>{alert?.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {alert?.acknowledged ? (
                          <div className="flex items-center space-x-1 text-success">
                            <Icon name="Check" size={16} />
                            <span className="text-xs">Acknowledged</span>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="Check"
                            onClick={() => handleAcknowledge(alert?.id)}
                          >
                            Acknowledge
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
                <p className="text-muted-foreground">No alerts match the current filter</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Showing {filteredAndSortedAlerts?.length} of {mockAlerts?.length} alerts</span>
              <div className="flex items-center space-x-2">
                <Icon name="RefreshCw" size={14} />
                <span>Auto-refresh every 30 seconds</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AlertManagementModal;