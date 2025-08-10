import React, { useState } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Button from '../../../components/ui/Button';

const ProductionChart = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [viewType, setViewType] = useState('combined');

  const chartData = [
    { date: '08/01', volume: 2650, quality: 92.5, efficiency: 85.2, animals: 95 },
    { date: '08/02', volume: 2720, quality: 94.1, efficiency: 87.8, animals: 96 },
    { date: '08/03', volume: 2580, quality: 91.8, efficiency: 84.6, animals: 94 },
    { date: '08/04', volume: 2890, quality: 95.2, efficiency: 89.1, animals: 98 },
    { date: '08/05', volume: 2750, quality: 93.7, efficiency: 86.9, animals: 97 },
    { date: '08/06', volume: 2820, quality: 94.8, efficiency: 88.3, animals: 99 },
    { date: '08/07', volume: 2680, quality: 92.9, efficiency: 85.7, animals: 96 },
    { date: '08/08', volume: 2847, quality: 94.2, efficiency: 87.4, animals: 100 }
  ];

  const timeRangeOptions = [
    { value: '7days', label: '7 Days' },
    { value: '30days', label: '30 Days' },
    { value: '90days', label: '90 Days' },
    { value: '1year', label: '1 Year' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-agricultural-lg">
          <p className="text-sm font-medium text-foreground mb-2">{`Date: ${label}`}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-foreground">
                {entry?.name === 'Volume' ? `${entry?.value}L` : 
                 entry?.name === 'Quality' ? `${entry?.value}%` :
                 entry?.name === 'Efficiency' ? `${entry?.value}%` : entry?.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Production Analytics</h2>
          <p className="text-sm text-muted-foreground">Volume trends with quality overlay</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {timeRangeOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={timeRange === option?.value ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(option?.value)}
              >
                {option?.label}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewType === 'combined' ? "default" : "outline"}
              size="sm"
              iconName="BarChart3"
              onClick={() => setViewType('combined')}
            >
              Combined
            </Button>
            <Button
              variant={viewType === 'separate' ? "default" : "outline"}
              size="sm"
              iconName="LineChart"
              onClick={() => setViewType('separate')}
            >
              Separate
            </Button>
          </div>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              yAxisId="left"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              label={{ value: 'Volume (L)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              label={{ value: 'Quality (%)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            <Bar 
              yAxisId="left"
              dataKey="volume" 
              name="Volume"
              fill="#339cff" 
              radius={[2, 2, 0, 0]}
              opacity={0.8}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="quality" 
              name="Quality"
              stroke="#00d4aa" 
              strokeWidth={3}
              dot={{ fill: '#00d4aa', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#00d4aa', strokeWidth: 2 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="efficiency" 
              name="Efficiency"
              stroke="#f59e0b" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-sm font-medium text-foreground">Avg Volume</span>
          </div>
          <p className="text-lg font-bold text-foreground">2,742L</p>
          <p className="text-xs text-muted-foreground">Daily average</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-accent rounded-full" />
            <span className="text-sm font-medium text-foreground">Avg Quality</span>
          </div>
          <p className="text-lg font-bold text-foreground">93.7%</p>
          <p className="text-xs text-muted-foreground">Quality score</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-warning rounded-full" />
            <span className="text-sm font-medium text-foreground">Avg Efficiency</span>
          </div>
          <p className="text-lg font-bold text-foreground">86.9%</p>
          <p className="text-xs text-muted-foreground">Production efficiency</p>
        </div>
      </div>
    </div>
  );
};

export default ProductionChart;