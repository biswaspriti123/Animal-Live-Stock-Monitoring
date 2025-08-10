import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const HealthControlPanel = ({ 
  filters = {}, 
  thresholds = {}, 
  onFiltersChange, 
  onThresholdsChange, 
  onRefresh, 
  onExport, 
  onAddAnimal, 
  onViewAlerts,
  isLiveMonitoring 
}) => {
  const [localFilters, setLocalFilters] = useState({
    searchTerm: '',
    breed: '',
    ageGroup: '',
    healthStatus: '',
    ...filters
  });
  
  const [localThresholds, setLocalThresholds] = useState({
    temperature: 39.0,
    heartRate: 90,
    activity: 40,
    ...thresholds
  });

  // Sync with parent filters
  useEffect(() => {
    setLocalFilters(prev => ({ ...prev, ...filters }));
  }, [filters]);

  useEffect(() => {
    setLocalThresholds(prev => ({ ...prev, ...thresholds }));
  }, [thresholds]);

  const breedOptions = [
    { value: '', label: 'All Breeds' },
    { value: 'holstein', label: 'Holstein' },
    { value: 'jersey', label: 'Jersey' },
    { value: 'angus', label: 'Angus' },
    { value: 'guernsey', label: 'Guernsey' },
    { value: 'hereford', label: 'Hereford' }
  ];

  const ageGroupOptions = [
    { value: '', label: 'All Ages' },
    { value: 'calf', label: 'Calf (0-1 year)' },
    { value: 'young', label: 'Young (1-3 years)' },
    { value: 'adult', label: 'Adult (3-6 years)' },
    { value: 'senior', label: 'Senior (6+ years)' }
  ];

  const healthStatusOptions = [
    { value: '', label: 'All Status' },
    { value: 'healthy', label: 'Healthy' },
    { value: 'warning', label: 'Warning' },
    { value: 'critical', label: 'Critical' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleThresholdChange = (key, value) => {
    const newThresholds = { ...localThresholds, [key]: parseFloat(value) };
    setLocalThresholds(newThresholds);
    onThresholdsChange?.(newThresholds);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      searchTerm: '',
      breed: '',
      ageGroup: '',
      healthStatus: ''
    };
    setLocalFilters(resetFilters);
    onFiltersChange?.(resetFilters);
  };

  const handleResetThresholds = () => {
    const defaultThresholds = {
      temperature: 39.0,
      heartRate: 90,
      activity: 40
    };
    setLocalThresholds(defaultThresholds);
    onThresholdsChange?.(defaultThresholds);
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Health Monitoring Controls</h3>
          <p className="text-sm text-muted-foreground">Configure filters, thresholds, and monitoring settings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-primary" />
          {isLiveMonitoring && (
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Filter" size={16} />
            <span>Animal Filters</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Search Animals"
              type="search"
              placeholder="Search by ID, name, or breed..."
              value={localFilters?.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e?.target?.value)}
            />
            
            <Select
              label="Breed Filter"
              options={breedOptions}
              value={localFilters?.breed}
              onChange={(value) => handleFilterChange('breed', value)}
              placeholder="Select breed"
            />
            
            <Select
              label="Age Group"
              options={ageGroupOptions}
              value={localFilters?.ageGroup}
              onChange={(value) => handleFilterChange('ageGroup', value)}
              placeholder="Select age group"
            />
            
            <Select
              label="Health Status"
              options={healthStatusOptions}
              value={localFilters?.healthStatus}
              onChange={(value) => handleFilterChange('healthStatus', value)}
              placeholder="Select status"
            />
          </div>
          
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={handleResetFilters}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Alert Thresholds */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} />
            <span>Alert Thresholds</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Input
                label="Temperature Alert (°C)"
                type="number"
                step="0.1"
                min="37.0"
                max="42.0"
                value={localThresholds?.temperature}
                onChange={(e) => handleThresholdChange('temperature', e?.target?.value)}
                description="Alert when temperature exceeds this value"
              />
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Thermometer" size={12} className="text-error" />
                <span>Normal range: 37.5-39.0°C</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Input
                label="Heart Rate Alert (BPM)"
                type="number"
                min="60"
                max="120"
                value={localThresholds?.heartRate}
                onChange={(e) => handleThresholdChange('heartRate', e?.target?.value)}
                description="Alert when heart rate exceeds this value"
              />
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Heart" size={12} className="text-success" />
                <span>Normal range: 60-90 BPM</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Input
                label="Activity Alert (%)"
                type="number"
                min="0"
                max="100"
                value={localThresholds?.activity}
                onChange={(e) => handleThresholdChange('activity', e?.target?.value)}
                description="Alert when activity falls below this value"
              />
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Activity" size={12} className="text-warning" />
                <span>Normal range: 50-90%</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={handleResetThresholds}
            >
              Reset Thresholds
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Zap" size={16} />
            <span>Quick Actions</span>
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              fullWidth
              onClick={onRefresh}
            >
              Refresh Data
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              fullWidth
              onClick={onExport}
            >
              Export Report
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Bell"
              iconPosition="left"
              fullWidth
              onClick={onViewAlerts}
            >
              View Alerts
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              fullWidth
              onClick={onAddAnimal}
            >
              Add Animal
            </Button>
          </div>
        </div>

        {/* System Status */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Activity" size={16} />
            <span>System Status</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/20 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Data Connection</span>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${isLiveMonitoring ? 'bg-success' : 'bg-warning'}`}></div>
                  <span className={`text-xs ${isLiveMonitoring ? 'text-success' : 'text-warning'}`}>
                    {isLiveMonitoring ? 'Live' : 'Paused'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {isLiveMonitoring ? 'Real-time updates active' : 'Manual refresh mode'}
              </p>
            </div>
            
            <div className="bg-muted/20 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Active Sensors</span>
                <span className="text-sm font-medium text-foreground">138/141</span>
              </div>
              <p className="text-xs text-muted-foreground">97.9% operational</p>
            </div>
            
            <div className="bg-muted/20 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Active Filters</span>
                <span className="text-sm font-medium text-foreground">
                  {Object?.values(localFilters)?.filter(Boolean)?.length}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Applied to all views</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthControlPanel;