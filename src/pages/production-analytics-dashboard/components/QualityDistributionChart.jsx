import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QualityDistributionChart = () => {
  const [viewMode, setViewMode] = useState('grade');

  const qualityGradeData = [
    { name: 'Grade A+', value: 45, count: 45, color: '#22c55e' },
    { name: 'Grade A', value: 32, count: 32, color: '#00d4aa' },
    { name: 'Grade B+', value: 18, count: 18, color: '#f59e0b' },
    { name: 'Grade B', value: 5, count: 5, color: '#ef4444' }
  ];

  const qualityRangeData = [
    { name: '95-100%', value: 28, count: 28, color: '#22c55e' },
    { name: '90-94%', value: 42, count: 42, color: '#00d4aa' },
    { name: '85-89%', value: 23, count: 23, color: '#f59e0b' },
    { name: '80-84%', value: 7, count: 7, color: '#ef4444' }
  ];

  const currentData = viewMode === 'grade' ? qualityGradeData : qualityRangeData;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-agricultural-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data?.color }}
            />
            <span className="font-medium text-foreground">{data?.name}</span>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">Animals: <span className="font-medium text-foreground">{data?.count}</span></p>
            <p className="text-muted-foreground">Percentage: <span className="font-medium text-foreground">{data?.value}%</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="500"
      >
        {`${(percent * 100)?.toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Quality Distribution</h2>
          <p className="text-sm text-muted-foreground">Milk quality breakdown</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grade' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('grade')}
          >
            Grade
          </Button>
          <Button
            variant={viewMode === 'range' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('range')}
          >
            Range
          </Button>
        </div>
      </div>
      <div className="h-64 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={currentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {currentData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {currentData?.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: item?.color }}
              />
              <div>
                <span className="font-medium text-foreground">{item?.name}</span>
                <p className="text-sm text-muted-foreground">{item?.count} animals</p>
              </div>
            </div>
            
            <div className="text-right">
              <span className="font-bold text-foreground">{item?.value}%</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Icon name="Award" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Premium Quality</span>
            </div>
            <p className="text-lg font-bold text-foreground">77%</p>
            <p className="text-xs text-muted-foreground">Grade A+ & A</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Icon name="Target" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Target Met</span>
            </div>
            <p className="text-lg font-bold text-foreground">92.3%</p>
            <p className="text-xs text-muted-foreground">Quality threshold</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityDistributionChart;