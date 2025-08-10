import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const HealthDataGrid = () => {
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');

  const healthData = [
    {
      id: 'A001',
      name: 'Bessie',
      temperature: 101.2,
      heartRate: 72,
      activity: 85,
      milkYield: 28.5,
      healthScore: 92,
      status: 'healthy',
      timestamp: new Date(Date.now() - 300000),
      location: 'Pasture A'
    },
    {
      id: 'A002',
      name: 'Daisy',
      temperature: 103.1,
      heartRate: 85,
      activity: 65,
      milkYield: 24.2,
      healthScore: 78,
      status: 'warning',
      timestamp: new Date(Date.now() - 600000),
      location: 'Pasture B'
    },
    {
      id: 'A003',
      name: 'Molly',
      temperature: 100.8,
      heartRate: 68,
      activity: 90,
      milkYield: 31.2,
      healthScore: 95,
      status: 'healthy',
      timestamp: new Date(Date.now() - 900000),
      location: 'Pasture A'
    },
    {
      id: 'A004',
      name: 'Luna',
      temperature: 105.2,
      heartRate: 95,
      activity: 45,
      milkYield: 18.7,
      healthScore: 62,
      status: 'critical',
      timestamp: new Date(Date.now() - 1200000),
      location: 'Barn 1'
    },
    {
      id: 'A005',
      name: 'Charlie',
      temperature: 102.0,
      heartRate: 78,
      activity: 72,
      milkYield: 26.8,
      healthScore: 84,
      status: 'warning',
      timestamp: new Date(Date.now() - 1500000),
      location: 'Pasture C'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success bg-success/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'critical': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getHealthScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-error';
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...healthData]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];

    if (sortField === 'timestamp') {
      aValue = aValue?.getTime();
      bValue = bValue?.getTime();
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const formatTimestamp = (timestamp) => {
    return timestamp?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const SortableHeader = ({ field, children }) => (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-agricultural"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortField === field && (
          <Icon
            name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'}
            size={14}
          />
        )}
      </div>
    </th>
  );

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Recent Health Readings</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-agricultural">
              Export CSV
            </button>
            <button className="p-2 hover:bg-muted rounded-md transition-agricultural">
              <Icon name="RefreshCw" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <SortableHeader field="id">Animal ID</SortableHeader>
              <SortableHeader field="name">Name</SortableHeader>
              <SortableHeader field="temperature">Temp (°F)</SortableHeader>
              <SortableHeader field="heartRate">Heart Rate</SortableHeader>
              <SortableHeader field="activity">Activity %</SortableHeader>
              <SortableHeader field="milkYield">Milk (L)</SortableHeader>
              <SortableHeader field="healthScore">Health Score</SortableHeader>
              <SortableHeader field="status">Status</SortableHeader>
              <SortableHeader field="location">Location</SortableHeader>
              <SortableHeader field="timestamp">Last Update</SortableHeader>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedData?.map((animal) => (
              <tr key={animal?.id} className="hover:bg-muted/30 transition-agricultural">
                <td className="px-4 py-3 text-sm font-medium text-foreground">
                  {animal?.id}
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {animal?.name}
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  <span className={animal?.temperature > 102.5 ? 'text-error' : 'text-foreground'}>
                    {animal?.temperature}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  <span className={animal?.heartRate > 80 ? 'text-warning' : 'text-foreground'}>
                    {animal?.heartRate}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          animal?.activity >= 80 ? 'bg-success' :
                          animal?.activity >= 60 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${animal?.activity}%` }}
                      />
                    </div>
                    <span className="text-xs">{animal?.activity}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {animal?.milkYield}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`font-medium ${getHealthScoreColor(animal?.healthScore)}`}>
                    {animal?.healthScore}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(animal?.status)}`}>
                    {animal?.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {animal?.location}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {formatTimestamp(animal?.timestamp)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center space-x-1">
                    <button className="p-1 hover:bg-muted rounded transition-agricultural">
                      <Icon name="Eye" size={14} className="text-muted-foreground" />
                    </button>
                    <button className="p-1 hover:bg-muted rounded transition-agricultural">
                      <Icon name="Edit" size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {sortedData?.length} animals</span>
          <span>Last updated: {formatTimestamp(new Date())}</span>
        </div>
      </div>
    </div>
  );
};

export default HealthDataGrid;