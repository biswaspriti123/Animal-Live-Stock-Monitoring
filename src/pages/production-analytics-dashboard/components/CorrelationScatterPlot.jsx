import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CorrelationScatterPlot = () => {
  const [xAxis, setXAxis] = useState('feedIntake');
  const [yAxis, setYAxis] = useState('volume');
  const [showTrendLine, setShowTrendLine] = useState(true);

  const correlationData = [
    { id: "A001", name: "Bella", feedIntake: 22.5, healthScore: 96, volume: 32.5, efficiency: 92.1 },
    { id: "A045", name: "Luna", feedIntake: 21.8, healthScore: 94, volume: 31.8, efficiency: 89.3 },
    { id: "A023", name: "Daisy", feedIntake: 21.2, healthScore: 95, volume: 30.9, efficiency: 87.8 },
    { id: "A067", name: "Rosie", feedIntake: 20.8, healthScore: 93, volume: 29.4, efficiency: 85.6 },
    { id: "A089", name: "Molly", feedIntake: 20.1, healthScore: 92, volume: 28.7, efficiency: 84.2 },
    { id: "A112", name: "Sophie", feedIntake: 19.5, healthScore: 89, volume: 27.3, efficiency: 82.1 },
    { id: "A134", name: "Ruby", feedIntake: 19.2, healthScore: 91, volume: 26.8, efficiency: 83.4 },
    { id: "A156", name: "Chloe", feedIntake: 18.8, healthScore: 88, volume: 25.9, efficiency: 81.7 },
    { id: "A178", name: "Emma", feedIntake: 18.3, healthScore: 87, volume: 24.6, efficiency: 80.3 },
    { id: "A190", name: "Grace", feedIntake: 17.9, healthScore: 85, volume: 23.2, efficiency: 78.9 },
    { id: "A201", name: "Lily", feedIntake: 17.5, healthScore: 86, volume: 22.8, efficiency: 79.5 },
    { id: "A223", name: "Mia", feedIntake: 17.1, healthScore: 84, volume: 22.1, efficiency: 77.8 },
    { id: "A245", name: "Zoe", feedIntake: 16.8, healthScore: 83, volume: 21.5, efficiency: 76.4 },
    { id: "A267", name: "Ava", feedIntake: 16.4, healthScore: 82, volume: 20.9, efficiency: 75.2 },
    { id: "A289", name: "Ella", feedIntake: 16.0, healthScore: 81, volume: 20.3, efficiency: 74.1 }
  ];

  const axisOptions = [
    { key: 'feedIntake', label: 'Feed Intake (kg)', unit: 'kg' },
    { key: 'healthScore', label: 'Health Score', unit: 'score' },
    { key: 'volume', label: 'Milk Volume (L)', unit: 'L' },
    { key: 'efficiency', label: 'Efficiency (%)', unit: '%' }
  ];

  const getAxisLabel = (key) => {
    return axisOptions?.find(option => option?.key === key)?.label || key;
  };

  const getAxisUnit = (key) => {
    return axisOptions?.find(option => option?.key === key)?.unit || '';
  };

  const calculateCorrelation = () => {
    const xValues = correlationData?.map(d => d?.[xAxis]);
    const yValues = correlationData?.map(d => d?.[yAxis]);
    
    const n = xValues?.length;
    const sumX = xValues?.reduce((a, b) => a + b, 0);
    const sumY = yValues?.reduce((a, b) => a + b, 0);
    const sumXY = xValues?.reduce((sum, x, i) => sum + x * yValues?.[i], 0);
    const sumX2 = xValues?.reduce((sum, x) => sum + x * x, 0);
    const sumY2 = yValues?.reduce((sum, y) => sum + y * y, 0);
    
    const correlation = (n * sumXY - sumX * sumY) / 
      Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    return correlation;
  };

  const correlation = calculateCorrelation();

  const getCorrelationStrength = (r) => {
    const abs = Math.abs(r);
    if (abs >= 0.8) return { strength: 'Very Strong', color: 'text-success' };
    if (abs >= 0.6) return { strength: 'Strong', color: 'text-accent' };
    if (abs >= 0.4) return { strength: 'Moderate', color: 'text-warning' };
    if (abs >= 0.2) return { strength: 'Weak', color: 'text-error' };
    return { strength: 'Very Weak', color: 'text-muted-foreground' };
  };

  const correlationInfo = getCorrelationStrength(correlation);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-agricultural-lg">
          <div className="font-medium text-foreground mb-2">{data?.name} (#{data?.id})</div>
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">
              {getAxisLabel(xAxis)}: <span className="font-medium text-foreground">{data?.[xAxis]} {getAxisUnit(xAxis)}</span>
            </p>
            <p className="text-muted-foreground">
              {getAxisLabel(yAxis)}: <span className="font-medium text-foreground">{data?.[yAxis]} {getAxisUnit(yAxis)}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Correlation Analysis</h2>
          <p className="text-sm text-muted-foreground">Relationship between production factors</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">X-Axis:</span>
            <select 
              value={xAxis} 
              onChange={(e) => setXAxis(e?.target?.value)}
              className="bg-input border border-border rounded-md px-3 py-1 text-sm text-foreground"
            >
              {axisOptions?.map(option => (
                <option key={option?.key} value={option?.key}>{option?.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Y-Axis:</span>
            <select 
              value={yAxis} 
              onChange={(e) => setYAxis(e?.target?.value)}
              className="bg-input border border-border rounded-md px-3 py-1 text-sm text-foreground"
            >
              {axisOptions?.map(option => (
                <option key={option?.key} value={option?.key}>{option?.label}</option>
              ))}
            </select>
          </div>
          
          <Button
            variant={showTrendLine ? "default" : "outline"}
            size="sm"
            onClick={() => setShowTrendLine(!showTrendLine)}
            iconName="TrendingUp"
          >
            Trend Line
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  type="number" 
                  dataKey={xAxis}
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  label={{ value: getAxisLabel(xAxis), position: 'insideBottom', offset: -10, style: { textAnchor: 'middle' } }}
                />
                <YAxis 
                  type="number" 
                  dataKey={yAxis}
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  label={{ value: getAxisLabel(yAxis), angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                />
                <Tooltip content={<CustomTooltip />} />
                
                <Scatter 
                  data={correlationData} 
                  fill="#339cff"
                  fillOpacity={0.7}
                  stroke="#339cff"
                  strokeWidth={2}
                />
                
                {showTrendLine && correlation !== 0 && (
                  <ReferenceLine 
                    segment={[
                      { x: Math.min(...correlationData?.map(d => d?.[xAxis])), y: Math.min(...correlationData?.map(d => d?.[yAxis])) },
                      { x: Math.max(...correlationData?.map(d => d?.[xAxis])), y: Math.max(...correlationData?.map(d => d?.[yAxis])) }
                    ]}
                    stroke="#00d4aa" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                )}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="BarChart3" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Correlation</span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">
                {correlation?.toFixed(3)}
              </div>
              <div className={`text-sm font-medium ${correlationInfo?.color}`}>
                {correlationInfo?.strength}
              </div>
              <div className="text-xs text-muted-foreground">
                {correlation > 0 ? 'Positive' : correlation < 0 ? 'Negative' : 'No'} relationship
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} className="text-accent" />
              <span className="text-sm font-medium text-foreground">R² Value</span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">
                {(correlation * correlation)?.toFixed(3)}
              </div>
              <div className="text-xs text-muted-foreground">
                Variance explained
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Sample Size</span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">
                {correlationData?.length}
              </div>
              <div className="text-xs text-muted-foreground">
                Animals analyzed
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Strong Correlations</div>
            <div className="text-lg font-bold text-success">Feed → Volume</div>
            <div className="text-xs text-muted-foreground">r = 0.89</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Moderate Correlations</div>
            <div className="text-lg font-bold text-warning">Health → Efficiency</div>
            <div className="text-xs text-muted-foreground">r = 0.67</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Insights Available</div>
            <div className="text-lg font-bold text-primary">15 Factors</div>
            <div className="text-xs text-muted-foreground">Analyzed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrelationScatterPlot;