import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductionKPIHeader = () => {
  const kpiData = [
    {
      title: "Daily Production Volume",
      value: "2,847",
      unit: "liters",
      change: "+12.3%",
      changeType: "positive",
      icon: "Droplets",
      description: "Total milk production today"
    },
    {
      title: "Average Yield per Animal",
      value: "28.5",
      unit: "L/day",
      change: "+5.7%",
      changeType: "positive",
      icon: "TrendingUp",
      description: "Per animal daily average"
    },
    {
      title: "Quality Score",
      value: "94.2",
      unit: "/100",
      change: "+2.1%",
      changeType: "positive",
      icon: "Award",
      description: "Overall milk quality rating"
    },
    {
      title: "Production Efficiency",
      value: "87.4",
      unit: "%",
      change: "-1.2%",
      changeType: "negative",
      icon: "Zap",
      description: "Operational efficiency metric"
    },
    {
      title: "Revenue Impact",
      value: "$4,271",
      unit: "today",
      change: "+8.9%",
      changeType: "positive",
      icon: "DollarSign",
      description: "Daily revenue from production"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {kpiData?.map((kpi, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 hover:shadow-agricultural transition-agricultural">
          <div className="flex items-center justify-between mb-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              kpi?.changeType === 'positive' ? 'bg-success/10' : 'bg-warning/10'
            }`}>
              <Icon 
                name={kpi?.icon} 
                size={20} 
                className={kpi?.changeType === 'positive' ? 'text-success' : 'text-warning'} 
              />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              kpi?.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={kpi?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
              />
              <span>{kpi?.change}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">{kpi?.title}</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-foreground">{kpi?.value}</span>
              <span className="text-sm text-muted-foreground">{kpi?.unit}</span>
            </div>
            <p className="text-xs text-muted-foreground">{kpi?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductionKPIHeader;