import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const HealthTrendChart = () => {
  const healthTrendData = [
    { time: '00:00', avgHealth: 88, temperature: 101.2, heartRate: 72 },
    { time: '04:00', avgHealth: 89, temperature: 100.8, heartRate: 70 },
    { time: '08:00', avgHealth: 92, temperature: 101.0, heartRate: 74 },
    { time: '12:00', avgHealth: 87, temperature: 102.1, heartRate: 78 },
    { time: '16:00', avgHealth: 85, temperature: 102.8, heartRate: 82 },
    { time: '20:00', avgHealth: 90, temperature: 101.5, heartRate: 75 },
    { time: '24:00', avgHealth: 91, temperature: 101.1, heartRate: 73 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-agricultural-lg">
          <p className="text-sm font-medium text-foreground mb-2">{`Time: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}${entry?.name === 'Avg Health Score' ? '' : 
                entry?.name === 'Temperature' ? '°F' : ' BPM'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Health Trends (24h)</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-muted-foreground">Health Score</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-warning rounded-full" />
                <span className="text-muted-foreground">Temperature</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <span className="text-muted-foreground">Heart Rate</span>
              </div>
            </div>
            <button className="p-2 hover:bg-muted rounded-md transition-agricultural">
              <Icon name="MoreHorizontal" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4">
        <div className="h-64" aria-label="Health Trends Line Chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={healthTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="avgHealth"
                stroke="#339cff"
                strokeWidth={2}
                dot={{ fill: '#339cff', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#339cff', strokeWidth: 2 }}
                name="Avg Health Score"
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
                name="Temperature"
              />
              <Line
                type="monotone"
                dataKey="heartRate"
                stroke="#00d4aa"
                strokeWidth={2}
                dot={{ fill: '#00d4aa', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#00d4aa', strokeWidth: 2 }}
                name="Heart Rate"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Avg Health Score</p>
            <p className="text-lg font-semibold text-success">89.2</p>
            <p className="text-xs text-success">+2.1% from yesterday</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg Temperature</p>
            <p className="text-lg font-semibold text-warning">101.6°F</p>
            <p className="text-xs text-warning">+0.3°F from yesterday</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg Heart Rate</p>
            <p className="text-lg font-semibold text-accent">75 BPM</p>
            <p className="text-xs text-accent">-1.2 BPM from yesterday</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTrendChart;