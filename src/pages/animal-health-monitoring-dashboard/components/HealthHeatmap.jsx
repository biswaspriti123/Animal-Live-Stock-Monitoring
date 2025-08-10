import React, { useState, useEffect, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HealthHeatmap = ({ filters, realTimeData, onAreaSelect }) => {
  const [selectedView, setSelectedView] = useState('health');
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isInteractive, setIsInteractive] = useState(true);

  // Generate dynamic heatmap data
  const heatmapData = useMemo(() => {
    if (realTimeData?.heatmapData) {
      return realTimeData?.heatmapData;
    }

    // Base heatmap data with slight variations for real-time effect
    const baseData = [
      { id: 'A1', x: 1, y: 1, value: 92, animals: 8, area: 'Pasture A-1', type: 'pasture' },
      { id: 'A2', x: 2, y: 1, value: 88, animals: 6, area: 'Pasture A-2', type: 'pasture' },
      { id: 'A3', x: 3, y: 1, value: 85, animals: 7, area: 'Pasture A-3', type: 'pasture' },
      { id: 'A4', x: 4, y: 1, value: 78, animals: 5, area: 'Pasture A-4', type: 'pasture' },
      { id: 'B1', x: 1, y: 2, value: 95, animals: 9, area: 'Barn B-1', type: 'barn' },
      { id: 'B2', x: 2, y: 2, value: 82, animals: 12, area: 'Barn B-2', type: 'barn' },
      { id: 'B3', x: 3, y: 2, value: 76, animals: 8, area: 'Barn B-3', type: 'barn' },
      { id: 'B4', x: 4, y: 2, value: 89, animals: 10, area: 'Barn B-4', type: 'barn' },
      { id: 'C1', x: 1, y: 3, value: 87, animals: 6, area: 'Field C-1', type: 'field' },
      { id: 'C2', x: 2, y: 3, value: 91, animals: 7, area: 'Field C-2', type: 'field' },
      { id: 'C3', x: 3, y: 3, value: 73, animals: 4, area: 'Field C-3', type: 'field' },
      { id: 'C4', x: 4, y: 3, value: 84, animals: 8, area: 'Field C-4', type: 'field' },
      { id: 'D1', x: 1, y: 4, value: 79, animals: 5, area: 'Grazing D-1', type: 'grazing' },
      { id: 'D2', x: 2, y: 4, value: 86, animals: 9, area: 'Grazing D-2', type: 'grazing' },
      { id: 'D3', x: 3, y: 4, value: 92, animals: 11, area: 'Grazing D-3', type: 'grazing' },
      { id: 'D4', x: 4, y: 4, value: 88, animals: 7, area: 'Grazing D-4', type: 'grazing' }
    ];

    // Add random variations for real-time effect
    return baseData?.map(cell => ({
      ...cell,
      value: Math.max(60, Math.min(100, cell?.value + (Math.random() - 0.5) * 6)),
      animals: Math.max(3, cell?.animals + Math.floor((Math.random() - 0.5) * 4))
    }));
  }, [realTimeData]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalAnimals = heatmapData?.reduce((sum, cell) => sum + cell?.animals, 0);
    const averageHealth = heatmapData?.reduce((sum, cell) => sum + cell?.value, 0) / heatmapData?.length;
    const highRiskAreas = heatmapData?.filter(cell => cell?.value < 70)?.length;
    const mediumRiskAreas = heatmapData?.filter(cell => cell?.value >= 70 && cell?.value < 85)?.length;
    const healthyAreas = heatmapData?.filter(cell => cell?.value >= 85)?.length;

    return {
      totalAnimals,
      averageHealth: averageHealth?.toFixed(1),
      totalAreas: heatmapData?.length,
      highRiskAreas,
      mediumRiskAreas,
      healthyAreas
    };
  }, [heatmapData]);

  const getHeatmapColor = (value) => {
    if (value >= 90) return 'bg-success';
    if (value >= 80) return 'bg-success/70';
    if (value >= 70) return 'bg-warning';
    if (value >= 60) return 'bg-warning/70';
    return 'bg-error';
  };

  const getHeatmapIntensity = (value) => {
    const intensity = Math.max(0.3, value / 100);
    return { opacity: intensity };
  };

  const viewOptions = [
    { id: 'health', label: 'Health Score', icon: 'Heart' },
    { id: 'temperature', label: 'Temperature', icon: 'Thermometer' },
    { id: 'activity', label: 'Activity Level', icon: 'Activity' }
  ];

  const handleCellClick = (cell) => {
    if (isInteractive) {
      setSelectedAnimal(cell);
      onAreaSelect?.(cell);
    }
  };

  const handleViewChange = (viewId) => {
    setSelectedView(viewId);
    setSelectedAnimal(null); // Clear selection when changing views
  };

  const toggleInteractivity = () => {
    setIsInteractive(prev => !prev);
  };

  const exportHeatmapData = () => {
    const exportData = {
      timestamp: new Date()?.toISOString(),
      view: selectedView,
      stats,
      areas: heatmapData,
      filters
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `heatmap-data-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement?.setAttribute('href', dataUri);
    linkElement?.setAttribute('download', exportFileDefaultName);
    linkElement?.click();
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Health Pattern Heatmap</h3>
          <p className="text-sm text-muted-foreground">
            Spatial distribution of animal health across farm areas
            {realTimeData && (
              <span className="ml-2 text-success">• Live Data</span>
            )}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex space-x-1">
            {viewOptions?.map((option) => (
              <Button
                key={option?.id}
                variant={selectedView === option?.id ? "default" : "outline"}
                size="sm"
                iconName={option?.icon}
                iconPosition="left"
                onClick={() => handleViewChange(option?.id)}
              >
                {option?.label}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            iconName={isInteractive ? "MousePointer" : "Mouse"}
            onClick={toggleInteractivity}
          >
            {isInteractive ? 'Interactive' : 'View Only'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={exportHeatmapData}
          >
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap Grid */}
        <div className="lg:col-span-2">
          <div className="bg-muted/20 rounded-lg p-4">
            <div className="grid grid-cols-4 gap-2 aspect-square max-w-md mx-auto">
              {heatmapData?.map((cell) => (
                <button
                  key={cell?.id}
                  onClick={() => handleCellClick(cell)}
                  disabled={!isInteractive}
                  className={`
                    relative rounded-lg border-2 transition-all duration-200 
                    ${isInteractive ? 'hover:scale-105 cursor-pointer' : 'cursor-default'}
                    ${selectedAnimal?.id === cell?.id ? 'border-primary ring-2 ring-primary/50' : 'border-transparent'}
                    ${getHeatmapColor(cell?.value)}
                  `}
                  style={getHeatmapIntensity(cell?.value)}
                  title={`${cell?.area}: ${cell?.value?.toFixed(1)} score, ${cell?.animals} animals`}
                >
                  <div className="aspect-square flex flex-col items-center justify-center p-2">
                    <span className="text-xs font-bold text-white">{cell?.value?.toFixed(0)}</span>
                    <span className="text-xs text-white/80">{cell?.animals}</span>
                  </div>
                  
                  {/* Pulse animation for critical areas */}
                  {cell?.value < 70 && realTimeData && (
                    <div className="absolute inset-0 rounded-lg border-2 border-error animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-error rounded"></div>
                <span className="text-xs text-muted-foreground">&lt;70</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-warning rounded"></div>
                <span className="text-xs text-muted-foreground">70-79</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-success/70 rounded"></div>
                <span className="text-xs text-muted-foreground">80-89</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-success rounded"></div>
                <span className="text-xs text-muted-foreground">90+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Area Details */}
        <div className="space-y-4">
          {selectedAnimal ? (
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">{selectedAnimal?.area}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setSelectedAnimal(null)}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Health Score</span>
                  <span className={`font-medium ${
                    selectedAnimal?.value >= 85 ? 'text-success' : 
                    selectedAnimal?.value >= 70 ? 'text-warning' : 'text-error'
                  }`}>
                    {selectedAnimal?.value?.toFixed(1)}/100
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Animals</span>
                  <span className="font-medium text-foreground">{selectedAnimal?.animals}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Area Type</span>
                  <span className="font-medium text-foreground capitalize">
                    {selectedAnimal?.type}
                  </span>
                </div>

                {selectedAnimal?.value < 70 && (
                  <div className="bg-error/20 border border-error/30 rounded-lg p-2 mt-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertTriangle" size={14} className="text-error" />
                      <span className="text-xs text-error font-medium">High Risk Area</span>
                    </div>
                    <p className="text-xs text-error/80 mt-1">Immediate attention required</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-border space-y-2">
                <Button variant="outline" size="sm" iconName="MapPin" fullWidth>
                  View on Map
                </Button>
                <Button variant="outline" size="sm" iconName="Users" fullWidth>
                  View Animals
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-muted/20 rounded-lg p-4 text-center">
              <Icon name="MousePointer" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {isInteractive 
                  ? 'Click on any area to view detailed information'
                  : 'Enable interactive mode to explore areas'
                }
              </p>
            </div>
          )}

          {/* Summary Stats */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Farm Overview</h4>
            
            <div className="bg-muted/20 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Average Health Score</span>
                <span className="font-medium text-success">{stats?.averageHealth}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Animals</span>
                <span className="font-medium text-foreground">{stats?.totalAnimals}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Areas Monitored</span>
                <span className="font-medium text-foreground">{stats?.totalAreas}</span>
              </div>
            </div>
            
            <div className="bg-muted/20 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">High Risk Areas</span>
                <span className="font-medium text-error">{stats?.highRiskAreas}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Medium Risk Areas</span>
                <span className="font-medium text-warning">{stats?.mediumRiskAreas}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Healthy Areas</span>
                <span className="font-medium text-success">{stats?.healthyAreas}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Info" size={14} />
            <span>
              {realTimeData 
                ? 'Heatmap updates in real-time' :'Heatmap updates every 30 minutes'
              }
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Grid" size={14} />
            <span>{stats?.totalAreas} areas monitored</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>
            {realTimeData ? 'Live updates' : 'Last updated: 12 min ago'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HealthHeatmap;