import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveMap = () => {
  const [mapLayers, setMapLayers] = useState({
    animals: true,
    geofences: true,
    trails: false,
    heatmap: false
  });
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const mockAnimals = [
      {
        id: 'A247',
        name: 'Cow #A247',
        type: 'dairy_cow',
        status: 'alert',
        lat: 40.7128,
        lng: -74.0060,
        lastUpdate: new Date(Date.now() - 300000),
        health: 'critical',
        activity: 'low',
        temperature: 104.2,
        heartRate: 85,
        location: 'Pasture B'
      },
      {
        id: 'B012',
        name: 'Bull #B012',
        type: 'bull',
        status: 'warning',
        lat: 40.7589,
        lng: -73.9851,
        lastUpdate: new Date(Date.now() - 600000),
        health: 'good',
        activity: 'high',
        temperature: 101.5,
        heartRate: 72,
        location: 'North Boundary'
      },
      {
        id: 'C156',
        name: 'Cow #C156',
        type: 'dairy_cow',
        status: 'normal',
        lat: 40.7505,
        lng: -73.9934,
        lastUpdate: new Date(Date.now() - 900000),
        health: 'good',
        activity: 'medium',
        temperature: 101.8,
        heartRate: 68,
        location: 'Barn 2'
      },
      {
        id: 'D089',
        name: 'Cow #D089',
        type: 'dairy_cow',
        status: 'offline',
        lat: 40.7282,
        lng: -74.0776,
        lastUpdate: new Date(Date.now() - 1200000),
        health: 'unknown',
        activity: 'unknown',
        temperature: null,
        heartRate: null,
        location: 'Pasture A'
      },
      {
        id: 'E234',
        name: 'Heifer #E234',
        type: 'heifer',
        status: 'warning',
        lat: 40.7614,
        lng: -73.9776,
        lastUpdate: new Date(Date.now() - 1800000),
        health: 'monitoring',
        activity: 'medium',
        temperature: 102.1,
        heartRate: 78,
        location: 'Barn 1'
      }
    ];
    setAnimals(mockAnimals);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'alert': return 'bg-error';
      case 'warning': return 'bg-warning';
      case 'normal': return 'bg-success';
      case 'offline': return 'bg-muted-foreground';
      default: return 'bg-muted-foreground';
    }
  };

  const getAnimalIcon = (type) => {
    switch (type) {
      case 'dairy_cow': return 'Beef';
      case 'bull': return 'Beef';
      case 'heifer': return 'Beef';
      default: return 'MapPin';
    }
  };

  const toggleLayer = (layer) => {
    setMapLayers(prev => ({
      ...prev,
      [layer]: !prev?.[layer]
    }));
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const centerLat = 40.7505;
  const centerLng = -73.9934;

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Map" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Live Location Map</h2>
            <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
              {animals?.filter(a => a?.status !== 'offline')?.length} Online
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Maximize2" iconPosition="left">
              Fullscreen
            </Button>
            <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
              Refresh
            </Button>
          </div>
        </div>

        {/* Map Layer Controls */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(mapLayers)?.map(([layer, enabled]) => (
            <button
              key={layer}
              onClick={() => toggleLayer(layer)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-agricultural ${
                enabled
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {layer?.charAt(0)?.toUpperCase() + layer?.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 relative">
        {/* Google Maps Iframe */}
        <div className="absolute inset-0 rounded-b-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Farm Location Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${centerLat},${centerLng}&z=14&output=embed`}
            className="border-0"
          />
        </div>

        {/* Animal Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {animals?.map((animal, index) => (
            <div
              key={animal?.id}
              className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${20 + (index * 15)}%`,
                top: `${30 + (index * 10)}%`
              }}
              onClick={() => setSelectedAnimal(animal)}
            >
              <div className={`w-4 h-4 rounded-full ${getStatusColor(animal?.status)} border-2 border-white shadow-lg animate-pulse`} />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background text-foreground text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {animal?.name}
              </div>
            </div>
          ))}
        </div>

        {/* Animal Details Panel */}
        {selectedAnimal && (
          <div className="absolute top-4 right-4 bg-background border border-border rounded-lg p-4 shadow-agricultural-lg max-w-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">{selectedAnimal?.name}</h3>
              <button
                onClick={() => setSelectedAnimal(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  selectedAnimal?.status === 'alert' ? 'bg-error text-error-foreground' :
                  selectedAnimal?.status === 'warning' ? 'bg-warning text-warning-foreground' :
                  selectedAnimal?.status === 'normal' ? 'bg-success text-success-foreground' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {selectedAnimal?.status?.toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="text-foreground">{selectedAnimal?.location}</span>
              </div>
              
              {selectedAnimal?.temperature && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Temperature:</span>
                  <span className="text-foreground">{selectedAnimal?.temperature}°F</span>
                </div>
              )}
              
              {selectedAnimal?.heartRate && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Heart Rate:</span>
                  <span className="text-foreground">{selectedAnimal?.heartRate} BPM</span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Update:</span>
                <span className="text-foreground">{formatTimestamp(selectedAnimal?.lastUpdate)}</span>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <Button variant="outline" size="xs" iconName="Eye" iconPosition="left">
                Details
              </Button>
              <Button variant="outline" size="xs" iconName="MapPin" iconPosition="left">
                Track
              </Button>
            </div>
          </div>
        )}

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-background border border-border rounded-lg p-3 shadow-agricultural">
          <h4 className="text-sm font-medium text-foreground mb-2">Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-error" />
              <span className="text-muted-foreground">Critical Alert</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-muted-foreground">Warning</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-muted-foreground">Normal</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-muted-foreground" />
              <span className="text-muted-foreground">Offline</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;