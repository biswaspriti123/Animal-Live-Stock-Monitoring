import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VitalSignsChart = ({ realTimeData, filters, onFiltersChange }) => {
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [dateRange, setDateRange] = useState(filters?.dateRange || '7d');
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [chartData, setChartData] = useState([]);

  // Update date range when filters change
  useEffect(() => {
    if (filters?.dateRange !== dateRange) {
      setDateRange(filters?.dateRange || '7d');
    }
  }, [filters?.dateRange, dateRange]);

  // Generate or use real-time data
  useEffect(() => {
    const data = realTimeData?.vitalSigns || [
      { time: '00:00', temperature: 38.2, heartRate: 72, activity: 45 },
      { time: '04:00', temperature: 37.8, heartRate: 68, activity: 12 },
      { time: '08:00', temperature: 38.5, heartRate: 85, activity: 78 },
      { time: '12:00', temperature: 39.1, heartRate: 92, activity: 65 },
      { time: '16:00', temperature: 38.7, heartRate: 88, activity: 82 },
      { time: '20:00', temperature: 38.3, heartRate: 75, activity: 58 },
      { time: '24:00', temperature: 37.9, heartRate: 70, activity: 35 }
    ];
    setChartData(data);
  }, [realTimeData]);

  const metrics = [
    { id: 'all', label: 'All Metrics', color: '#339cff' },
    { id: 'temperature', label: 'Temperature', color: '#ef4444' },
    { id: 'heartRate', label: 'Heart Rate', color: '#22c55e' },
    { id: 'activity', label: 'Activity', color: '#f59e0b' }
  ];

  const dateRanges = [
    { id: '24h', label: '24H' },
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' },
    { id: '90d', label: '90D' }
  ];

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    onFiltersChange?.({ dateRange: range });
  };

  const handleMetricChange = (metric) => {
    setSelectedMetric(metric);
  };

  const toggleAutoRefresh = () => {
    setIsAutoRefresh(prev => !prev);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-agricultural-lg">
          <p className="text-sm font-medium text-foreground mb-2">{`Time: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value?.toFixed(1)}${entry?.name === 'Temperature' ? '°C' : entry?.name === 'Heart Rate' ? ' BPM' : '%'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Vital Signs Monitoring</h3>
          <p className="text-sm text-muted-foreground">
            Real-time tracking of critical health parameters
            {realTimeData && (
              <span className="ml-2 text-success">• Live Data</span>
            )}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex space-x-1">
            {dateRanges?.map((range) => (
              <Button
                key={range?.id}
                variant={dateRange === range?.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleDateRangeChange(range?.id)}
              >
                {range?.label}
              </Button>
            ))}
          </div>
          
          <div className="flex space-x-1">
            {metrics?.map((metric) => (
              <Button
                key={metric?.id}
                variant={selectedMetric === metric?.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleMetricChange(metric?.id)}
              >
                {metric?.label}
              </Button>
            ))}
          </div>
          
          <Button
            variant={isAutoRefresh ? "default" : "outline"}
            size="sm"
            iconName={isAutoRefresh ? "Pause" : "Play"}
            onClick={toggleAutoRefresh}
          >
            {isAutoRefresh ? 'Pause' : 'Resume'}
          </Button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="#94a3b8"
              fontSize={12}
            />
            <YAxis 
              stroke="#94a3b8"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Dynamic threshold lines based on current data */}
            {selectedMetric === 'all' || selectedMetric === 'temperature' ? (
              <>
                <ReferenceLine y={39.5} stroke="#ef4444" strokeDasharray="5 5" label="High Temp Threshold" />
                <ReferenceLine y={37.0} stroke="#339cff" strokeDasharray="5 5" label="Low Temp Threshold" />
              </>
            ) : null}
            
            {selectedMetric === 'all' || selectedMetric === 'heartRate' ? (
              <>
                <ReferenceLine y={95} stroke="#ef4444" strokeDasharray="5 5" label="High HR Threshold" />
                <ReferenceLine y={60} stroke="#339cff" strokeDasharray="5 5" label="Low HR Threshold" />
              </>
            ) : null}
            
            {(selectedMetric === 'all' || selectedMetric === 'temperature') && (
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
                name="Temperature"
              />
            )}
            
            {(selectedMetric === 'all' || selectedMetric === 'heartRate') && (
              <Line
                type="monotone"
                dataKey="heartRate"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
                name="Heart Rate"
              />
            )}
            
            {(selectedMetric === 'all' || selectedMetric === 'activity') && (
              <Line
                type="monotone"
                dataKey="activity"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
                name="Activity"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Normal Range</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <span>Warning</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-error rounded-full"></div>
            <span>Critical</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>
              {realTimeData ? 'Live updates' : 'Last updated: 2 min ago'}
            </span>
          </div>
          
          {isAutoRefresh && (
            <div className="flex items-center space-x-1 text-xs text-success">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>Auto-refresh active</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VitalSignsChart;