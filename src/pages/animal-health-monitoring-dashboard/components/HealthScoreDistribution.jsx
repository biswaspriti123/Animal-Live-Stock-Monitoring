import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HealthScoreDistribution = ({ realTimeData, filters }) => {
  const [selectedView, setSelectedView] = useState('distribution');
  const [animationEnabled, setAnimationEnabled] = useState(true);

  // Generate data based on real-time updates or use static data
  const healthScoreData = useMemo(() => {
    if (realTimeData?.healthScoreDistribution) {
      return realTimeData?.healthScoreDistribution;
    }
    
    // Generate dynamic data based on current timestamp for demo
    const baseData = [
      { range: '90-100', count: 45, percentage: 32 },
      { range: '80-89', count: 52, percentage: 37 },
      { range: '70-79', count: 28, percentage: 20 },
      { range: '60-69', count: 12, percentage: 8 },
      { range: '<60', count: 4, percentage: 3 }
    ];

    // Add slight variations for real-time feel
    return baseData?.map(item => ({
      ...item,
      count: Math.max(1, item?.count + Math.floor((Math.random() - 0.5) * 6)),
      percentage: Math.max(1, item?.percentage + Math.floor((Math.random() - 0.5) * 4))
    }));
  }, [realTimeData]);

  const riskCategoryData = useMemo(() => {
    if (realTimeData?.riskCategories) {
      return realTimeData?.riskCategories;
    }

    return [
      { name: 'Low Risk', value: 97 + Math.floor((Math.random() - 0.5) * 8), color: '#22c55e' },
      { name: 'Medium Risk', value: 28 + Math.floor((Math.random() - 0.5) * 6), color: '#f59e0b' },
      { name: 'High Risk', value: 16 + Math.floor((Math.random() - 0.5) * 4), color: '#ef4444' }
    ];
  }, [realTimeData]);

  const totalAnimals = useMemo(() => {
    return healthScoreData?.reduce((sum, item) => sum + item?.count, 0);
  }, [healthScoreData]);

  const averageScore = useMemo(() => {
    const weightedSum = healthScoreData?.reduce((sum, item) => {
      const midRange = item?.range === '<60' ? 55 : 
                     item?.range === '60-69' ? 64.5 :
                     item?.range === '70-79' ? 74.5 :
                     item?.range === '80-89' ? 84.5 : 95;
      return sum + (midRange * item?.count);
    }, 0);
    
    return totalAnimals > 0 ? (weightedSum / totalAnimals)?.toFixed(1) : 84.2;
  }, [healthScoreData, totalAnimals]);

  const viewOptions = [
    { id: 'distribution', label: 'Distribution', icon: 'BarChart3' },
    { id: 'risk', label: 'Risk Analysis', icon: 'PieChart' },
    { id: 'trends', label: 'Trends', icon: 'TrendingUp' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-agricultural-lg">
          <p className="text-sm font-medium text-foreground">{`Score Range: ${label}`}</p>
          <p className="text-sm text-primary">{`Animals: ${payload?.[0]?.value}`}</p>
          <p className="text-sm text-muted-foreground">{`${payload?.[0]?.payload?.percentage}% of herd`}</p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const total = riskCategoryData?.reduce((sum, item) => sum + item?.value, 0);
      const percentage = ((payload?.[0]?.value / total) * 100)?.toFixed(1);
      
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-agricultural-lg">
          <p className="text-sm font-medium text-foreground">{payload?.[0]?.name}</p>
          <p className="text-sm" style={{ color: payload?.[0]?.payload?.color }}>
            {`${payload?.[0]?.value} animals (${percentage}%)`}
          </p>
        </div>
      );
    }
    return null;
  };

  const handleViewChange = (viewId) => {
    setSelectedView(viewId);
  };

  const toggleAnimation = () => {
    setAnimationEnabled(prev => !prev);
  };

  return (
    <div className="space-y-6">
      {/* Health Score Histogram */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Health Score Distribution</h3>
            <p className="text-sm text-muted-foreground">
              Current herd health overview
              {realTimeData && (
                <span className="ml-2 text-success">• Live Data</span>
              )}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={animationEnabled ? "default" : "outline"}
              size="sm"
              iconName={animationEnabled ? "Pause" : "Play"}
              onClick={toggleAnimation}
            />
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={healthScoreData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="range" 
                stroke="#94a3b8"
                fontSize={12}
              />
              <YAxis 
                stroke="#94a3b8"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                fill="#339cff"
                radius={[4, 4, 0, 0]}
                animationDuration={animationEnabled ? 1000 : 0}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Total Animals: <span className="text-foreground font-medium">{totalAnimals}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Average Score: <span className="text-success font-medium">{averageScore}</span>
          </div>
        </div>
      </div>
      {/* Risk Categorization */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Risk Categories</h3>
            <p className="text-sm text-muted-foreground">Health risk breakdown by severity</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {viewOptions?.map((option) => (
                <Button
                  key={option?.id}
                  variant={selectedView === option?.id ? "default" : "outline"}
                  size="sm"
                  iconName={option?.icon}
                  onClick={() => handleViewChange(option?.id)}
                >
                  {option?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {selectedView === 'risk' && (
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={animationEnabled ? 1000 : 0}
                >
                  {riskCategoryData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {selectedView === 'distribution' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {riskCategoryData?.map((category, index) => (
              <div key={index} className="bg-muted/20 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category?.color }}
                  ></div>
                  <span className="text-sm font-medium text-foreground">{category?.name}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{category?.value}</p>
                <p className="text-xs text-muted-foreground">
                  {((category?.value / totalAnimals) * 100)?.toFixed(1)}% of herd
                </p>
              </div>
            ))}
          </div>
        )}

        {selectedView === 'trends' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-muted/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Health Improvement</span>
                  <Icon name="TrendingUp" size={16} className="text-success" />
                </div>
                <p className="text-lg font-semibold text-success">+2.3%</p>
                <p className="text-xs text-muted-foreground">vs last week</p>
              </div>
              
              <div className="bg-muted/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Risk Reduction</span>
                  <Icon name="TrendingDown" size={16} className="text-success" />
                </div>
                <p className="text-lg font-semibold text-success">-1.8%</p>
                <p className="text-xs text-muted-foreground">High-risk animals</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3 mt-4">
          {riskCategoryData?.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category?.color }}
                ></div>
                <span className="text-sm font-medium text-foreground">{category?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-foreground font-medium">{category?.value}</span>
                <span className="text-xs text-muted-foreground">
                  ({Math.round((category?.value / totalAnimals) * 100)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <Icon name="Heart" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                {riskCategoryData?.find(c => c?.name === 'Low Risk')?.value || 97}
              </p>
              <p className="text-xs text-muted-foreground">Healthy Animals</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                {(riskCategoryData?.find(c => c?.name === 'Medium Risk')?.value || 28) + 
                 (riskCategoryData?.find(c => c?.name === 'High Risk')?.value || 16)}
              </p>
              <p className="text-xs text-muted-foreground">Need Attention</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthScoreDistribution;