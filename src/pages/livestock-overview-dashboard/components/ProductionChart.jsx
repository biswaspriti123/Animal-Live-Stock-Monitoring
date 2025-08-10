import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ProductionChart = () => {
  const [timeRange, setTimeRange] = useState('week');

  const weeklyData = [
    { day: 'Mon', production: 145, target: 150, efficiency: 96.7 },
    { day: 'Tue', production: 152, target: 150, efficiency: 101.3 },
    { day: 'Wed', production: 148, target: 150, efficiency: 98.7 },
    { day: 'Thu', production: 156, target: 150, efficiency: 104.0 },
    { day: 'Fri', production: 143, target: 150, efficiency: 95.3 },
    { day: 'Sat', production: 149, target: 150, efficiency: 99.3 },
    { day: 'Sun', production: 151, target: 150, efficiency: 100.7 }
  ];

  const monthlyData = [
    { day: 'Week 1', production: 1045, target: 1050, efficiency: 99.5 },
    { day: 'Week 2', production: 1062, target: 1050, efficiency: 101.1 },
    { day: 'Week 3', production: 1038, target: 1050, efficiency: 98.9 },
    { day: 'Week 4', production: 1055, target: 1050, efficiency: 100.5 }
  ];

  const currentData = timeRange === 'week' ? weeklyData : monthlyData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-agricultural-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}${entry?.name === 'Efficiency' ? '%' : 'L'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const totalProduction = currentData?.reduce((sum, item) => sum + item?.production, 0);
  const totalTarget = currentData?.reduce((sum, item) => sum + item?.target, 0);
  const overallEfficiency = ((totalProduction / totalTarget) * 100)?.toFixed(1);

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Milk Production</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex bg-muted rounded-md p-1">
              <button
                onClick={() => setTimeRange('week')}
                className={`px-3 py-1 text-xs rounded transition-agricultural ${
                  timeRange === 'week' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-3 py-1 text-xs rounded transition-agricultural ${
                  timeRange === 'month' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Month
              </button>
            </div>
            <button className="p-2 hover:bg-muted rounded-md transition-agricultural">
              <Icon name="Download" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="p-4">
        <div className="h-64" aria-label="Milk Production Bar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="day" 
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
              <Bar
                dataKey="target"
                fill="rgba(148, 163, 184, 0.3)"
                name="Target"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="production"
                fill="#339cff"
                name="Actual"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Production Stats */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Total Production</p>
            <p className="text-lg font-semibold text-foreground">{totalProduction?.toLocaleString()}L</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Target</p>
            <p className="text-lg font-semibold text-muted-foreground">{totalTarget?.toLocaleString()}L</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Efficiency</p>
            <p className={`text-lg font-semibold ${
              parseFloat(overallEfficiency) >= 100 ? 'text-success' : 
              parseFloat(overallEfficiency) >= 95 ? 'text-warning' : 'text-error'
            }`}>
              {overallEfficiency}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Avg per Animal</p>
            <p className="text-lg font-semibold text-accent">
              {(totalProduction / 5)?.toFixed(1)}L
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionChart;