import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LivestockMap = () => {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [mapView, setMapView] = useState('satellite');

  const animalLocations = [
    {
      id: 'A001',
      name: 'Bessie',
      lat: 40.7128,
      lng: -74.0060,
      healthStatus: 'healthy',
      temperature: 101.2,
      heartRate: 72,
      activity: 'grazing'
    },
    {
      id: 'A002',
      name: 'Daisy',
      lat: 40.7130,
      lng: -74.0058,
      healthStatus: 'warning',
      temperature: 103.1,
      heartRate: 85,
      activity: 'resting'
    },
    {
      id: 'A003',
      name: 'Molly',
      lat: 40.7125,
      lng: -74.0062,
      healthStatus: 'healthy',
      temperature: 100.8,
      heartRate: 68,
      activity: 'walking'
    },
    {
      id: 'A004',
      name: 'Luna',
      lat: 40.7132,
      lng: -74.0055,
      healthStatus: 'critical',
      temperature: 105.2,
      heartRate: 95,
      activity: 'stationary'
    }
  ];

  const getHealthColor = (status) => {
    switch (status) {
      case 'healthy': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'critical': return 'bg-error';
      default: return 'bg-muted';
    }
  };

  const getHealthTextColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Live Animal Locations</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMapView(mapView === 'satellite' ? 'terrain' : 'satellite')}
              className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-agricultural"
            >
              {mapView === 'satellite' ? 'Terrain' : 'Satellite'}
            </button>
            <button className="p-2 hover:bg-muted rounded-md transition-agricultural">
              <Icon name="Maximize2" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96 bg-muted">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Farm Location Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7128,-74.0060&z=16&output=embed"
          className="absolute inset-0"
        />

        {/* Animal Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {animalLocations?.map((animal, index) => (
            <div
              key={animal?.id}
              className="absolute pointer-events-auto cursor-pointer"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + index * 10}%`
              }}
              onClick={() => setSelectedAnimal(animal)}
            >
              <div className={`w-4 h-4 ${getHealthColor(animal?.healthStatus)} rounded-full border-2 border-white shadow-lg animate-pulse`} />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background text-foreground text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {animal?.name} - {animal?.healthStatus}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border">
          <h4 className="text-xs font-medium text-foreground mb-2">Health Status</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span className="text-xs text-muted-foreground">Healthy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <span className="text-xs text-muted-foreground">Warning</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full" />
              <span className="text-xs text-muted-foreground">Critical</span>
            </div>
          </div>
        </div>
      </div>
      {/* Selected Animal Details */}
      {selectedAnimal && (
        <div className="p-4 border-t border-border bg-muted/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 ${getHealthColor(selectedAnimal?.healthStatus)} rounded-full`} />
              <h4 className="font-medium text-foreground">{selectedAnimal?.name} ({selectedAnimal?.id})</h4>
            </div>
            <button
              onClick={() => setSelectedAnimal(null)}
              className="p-1 hover:bg-muted rounded transition-agricultural"
            >
              <Icon name="X" size={16} className="text-muted-foreground" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Temperature</p>
              <p className="font-medium text-foreground">{selectedAnimal?.temperature}°F</p>
            </div>
            <div>
              <p className="text-muted-foreground">Heart Rate</p>
              <p className="font-medium text-foreground">{selectedAnimal?.heartRate} BPM</p>
            </div>
            <div>
              <p className="text-muted-foreground">Activity</p>
              <p className={`font-medium capitalize ${getHealthTextColor(selectedAnimal?.healthStatus)}`}>
                {selectedAnimal?.activity}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivestockMap;