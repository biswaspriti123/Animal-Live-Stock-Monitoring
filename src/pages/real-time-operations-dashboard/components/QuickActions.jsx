import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [emergencyMode, setEmergencyMode] = useState(false);

  const quickActions = [
    {
      id: 'acknowledge-all',
      title: 'Acknowledge All Alerts',
      description: 'Mark all active alerts as acknowledged',
      icon: 'CheckCircle',
      color: 'success',
      count: 8,
      action: () => console.log('Acknowledging all alerts')
    },
    {
      id: 'emergency-protocol',
      title: 'Emergency Protocol',
      description: 'Activate emergency response procedures',
      icon: 'AlertTriangle',
      color: 'error',
      critical: true,
      action: () => setEmergencyMode(true)
    },
    {
      id: 'vet-contact',
      title: 'Contact Veterinarian',
      description: 'Direct line to on-call veterinary services',
      icon: 'Phone',
      color: 'primary',
      action: () => console.log('Contacting veterinarian')
    },
    {
      id: 'field-team',
      title: 'Alert Field Team',
      description: 'Send notifications to field workers',
      icon: 'Users',
      color: 'accent',
      action: () => console.log('Alerting field team')
    },
    {
      id: 'bulk-location',
      title: 'Track All Animals',
      description: 'View real-time location of all livestock',
      icon: 'MapPin',
      color: 'primary',
      action: () => console.log('Tracking all animals')
    },
    {
      id: 'health-report',
      title: 'Generate Health Report',
      description: 'Create comprehensive health status report',
      icon: 'FileText',
      color: 'accent',
      action: () => console.log('Generating health report')
    }
  ];

  const emergencyActions = [
    {
      id: 'lockdown',
      title: 'Farm Lockdown',
      description: 'Secure all areas and restrict animal movement',
      icon: 'Lock',
      action: () => console.log('Initiating farm lockdown')
    },
    {
      id: 'evacuation',
      title: 'Emergency Evacuation',
      description: 'Begin emergency evacuation procedures',
      icon: 'AlertTriangle',
      action: () => console.log('Starting evacuation')
    },
    {
      id: 'authorities',
      title: 'Contact Authorities',
      description: 'Alert local emergency services',
      icon: 'Phone',
      action: () => console.log('Contacting authorities')
    }
  ];

  const getActionColor = (color) => {
    switch (color) {
      case 'success': return 'border-success text-success hover:bg-success/10';
      case 'error': return 'border-error text-error hover:bg-error/10';
      case 'warning': return 'border-warning text-warning hover:bg-warning/10';
      case 'accent': return 'border-accent text-accent hover:bg-accent/10';
      case 'primary': return 'border-primary text-primary hover:bg-primary/10';
      default: return 'border-border text-foreground hover:bg-muted/10';
    }
  };

  const handleEmergencyCancel = () => {
    setEmergencyMode(false);
  };

  if (emergencyMode) {
    return (
      <div className="bg-card rounded-lg border border-error h-full flex flex-col">
        <div className="p-4 border-b border-error bg-error/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={20} className="text-error animate-pulse" />
              <h2 className="text-lg font-semibold text-error">Emergency Protocol</h2>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleEmergencyCancel}
              iconName="X"
              iconPosition="left"
            >
              Cancel
            </Button>
          </div>
          <p className="text-sm text-error/80">
            Emergency mode activated. Select appropriate response action.
          </p>
        </div>
        <div className="flex-1 p-4">
          <div className="grid gap-4">
            {emergencyActions?.map((action) => (
              <button
                key={action?.id}
                onClick={action?.action}
                className="w-full p-4 border-2 border-error rounded-lg text-left transition-agricultural hover:bg-error/5 focus:outline-none focus:ring-2 focus:ring-error"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-error/20 rounded-lg flex items-center justify-center">
                    <Icon name={action?.icon} size={20} className="text-error" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{action?.title}</h3>
                    <p className="text-sm text-muted-foreground">{action?.description}</p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-error" />
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-error bg-error/5">
          <div className="text-center text-sm text-error">
            <Icon name="Clock" size={16} className="inline mr-1" />
            Emergency protocol activated at {new Date()?.toLocaleTimeString()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
          </div>
          <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
            Configure
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Rapid response tools for immediate livestock management
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-3">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className={`w-full p-4 border-2 rounded-lg text-left transition-agricultural focus:outline-none focus:ring-2 focus:ring-primary ${
                action?.critical 
                  ? 'border-error text-error hover:bg-error/5 animate-pulse' 
                  : getActionColor(action?.color)
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  action?.critical 
                    ? 'bg-error/20' 
                    : action?.color === 'success' ? 'bg-success/20' :
                      action?.color === 'error' ? 'bg-error/20' :
                      action?.color === 'warning' ? 'bg-warning/20' :
                      action?.color === 'accent'? 'bg-accent/20' : 'bg-primary/20'
                }`}>
                  <Icon 
                    name={action?.icon} 
                    size={20} 
                    className={action?.critical ? 'text-error' : ''} 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-foreground">{action?.title}</h3>
                    {action?.count && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        action?.color === 'success' ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary'
                      }`}>
                        {action?.count}
                      </span>
                    )}
                    {action?.critical && (
                      <span className="text-xs px-2 py-1 rounded-full bg-error/20 text-error">
                        CRITICAL
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{action?.description}</p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Status Bar */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-muted-foreground">System Ready</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                Last update: {new Date()?.toLocaleTimeString()}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="xs" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;