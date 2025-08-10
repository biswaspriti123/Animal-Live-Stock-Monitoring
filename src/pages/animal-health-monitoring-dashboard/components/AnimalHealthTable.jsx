import React, { useState, useEffect, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AnimalHealthTable = ({ filters = {}, onFiltersChange, onAnimalSelect, onExport, refreshTrigger }) => {
  const [searchTerm, setSearchTerm] = useState(filters?.searchTerm || '');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sync with parent filters
  useEffect(() => {
    setSearchTerm(filters?.searchTerm || '');
  }, [filters?.searchTerm]);

  // Enhanced mock data with more animals for pagination demo
  const animalHealthData = [
    {
      id: 'A001',
      name: 'Bella',
      breed: 'Holstein',
      age: '3.2 years',
      healthScore: 92,
      temperature: 38.2,
      heartRate: 72,
      activity: 85,
      status: 'healthy',
      lastCheckup: '2025-08-06',
      location: 'Pasture A',
      medications: ['Vitamin B12', 'Calcium Supplement'],
      notes: `Regular health monitoring shows excellent vital signs. Animal demonstrates normal feeding patterns and social behavior.`
    },
    {
      id: 'A002',
      name: 'Daisy',
      breed: 'Jersey',
      age: '2.8 years',
      healthScore: 76,
      temperature: 39.1,
      heartRate: 88,
      activity: 62,
      status: 'warning',
      lastCheckup: '2025-08-07',
      location: 'Barn 2',
      medications: ['Antibiotic Course', 'Anti-inflammatory'],
      notes: `Elevated temperature detected. Started on antibiotic treatment. Monitoring closely for improvement.`
    },
    {
      id: 'A003',
      name: 'Luna',
      breed: 'Angus',
      age: '4.1 years',
      healthScore: 58,
      temperature: 40.2,
      heartRate: 95,
      activity: 35,
      status: 'critical',
      lastCheckup: '2025-08-08',
      location: 'Isolation Unit',
      medications: ['Strong Antibiotic', 'Fever Reducer', 'IV Fluids'],
      notes: `Critical condition requiring immediate veterinary attention. High fever and lethargy observed.`
    },
    {
      id: 'A004',
      name: 'Rosie',
      breed: 'Holstein',
      age: '2.5 years',
      healthScore: 88,
      temperature: 38.5,
      heartRate: 75,
      activity: 78,
      status: 'healthy',
      lastCheckup: '2025-08-05',
      location: 'Pasture B',
      medications: ['Routine Vitamins'],
      notes: `Excellent health indicators across all parameters. Pregnancy confirmed - monitoring maternal health.`
    },
    {
      id: 'A005',
      name: 'Moo',
      breed: 'Guernsey',
      age: '5.2 years',
      healthScore: 82,
      temperature: 38.8,
      heartRate: 80,
      activity: 70,
      status: 'healthy',
      lastCheckup: '2025-08-04',
      location: 'Pasture A',
      medications: ['Joint Support', 'Digestive Aid'],
      notes: `Senior animal with good overall health. Minor joint stiffness managed with supplements.`
    },
    {
      id: 'A006',
      name: 'Cocoa',
      breed: 'Jersey',
      age: '1.8 years',
      healthScore: 94,
      temperature: 37.9,
      heartRate: 68,
      activity: 92,
      status: 'healthy',
      lastCheckup: '2025-08-08',
      location: 'Pasture A',
      medications: ['Growth Supplements'],
      notes: `Young and very active. Excellent growth rate and social integration with the herd.`
    }
  ];

  // Filtered and paginated data
  const filteredAndPaginatedData = useMemo(() => {
    let filtered = animalHealthData?.filter(animal => {
      const matchesSearch = animal?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           animal?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           animal?.breed?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      const matchesFilter = selectedFilter === 'all' || animal?.status === selectedFilter;
      const matchesBreed = !filters?.breed || animal?.breed?.toLowerCase() === filters?.breed?.toLowerCase();
      const matchesHealthStatus = !filters?.healthStatus || animal?.status === filters?.healthStatus;
      
      return matchesSearch && matchesFilter && matchesBreed && matchesHealthStatus;
    });

    // Apply sorting
    filtered = filtered?.sort((a, b) => {
      let aValue = a?.[sortField];
      let bValue = b?.[sortField];
      
      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filtered?.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: filtered?.length,
      totalPages: Math.ceil(filtered?.length / itemsPerPage)
    };
  }, [animalHealthData, searchTerm, selectedFilter, filters, sortField, sortDirection, currentPage, itemsPerPage]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success bg-success/20';
      case 'warning': return 'text-warning bg-warning/20';
      case 'critical': return 'text-error bg-error/20';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getHealthScoreColor = (score) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    onFiltersChange?.({ searchTerm: value });
    setCurrentPage(1); // Reset to first page when searching
  };

  const toggleRowExpansion = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(id)) {
      newExpanded?.delete(id);
    } else {
      newExpanded?.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleAnimalView = (animal) => {
    onAnimalSelect?.(animal);
  };

  const handleExportFiltered = () => {
    onExport?.(filteredAndPaginatedData?.data);
  };

  const filters_data = [
    { id: 'all', label: 'All Animals', count: animalHealthData?.length },
    { id: 'healthy', label: 'Healthy', count: animalHealthData?.filter(a => a?.status === 'healthy')?.length },
    { id: 'warning', label: 'Warning', count: animalHealthData?.filter(a => a?.status === 'warning')?.length },
    { id: 'critical', label: 'Critical', count: animalHealthData?.filter(a => a?.status === 'critical')?.length }
  ];

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Animal Health Records</h3>
            <p className="text-sm text-muted-foreground">
              Detailed health monitoring and veterinary data
              {refreshTrigger > 0 && (
                <span className="ml-2 text-success">• Recently updated</span>
              )}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Input
              type="search"
              placeholder="Search animals..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e?.target?.value)}
              className="w-full sm:w-64"
            />
            
            <Button 
              variant="outline" 
              iconName="Download" 
              iconPosition="left"
              onClick={handleExportFiltered}
            >
              Export ({filteredAndPaginatedData?.total})
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {filters_data?.map((filter) => (
            <Button
              key={filter?.id}
              variant={selectedFilter === filter?.id ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedFilter(filter?.id);
                setCurrentPage(1);
              }}
            >
              {filter?.label} ({filter?.count})
            </Button>
          ))}
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-foreground">
                <button 
                  onClick={() => handleSort('id')}
                  className="flex items-center space-x-1 hover:text-primary transition-agricultural"
                >
                  <span>Animal ID</span>
                  <Icon 
                    name={sortField === 'id' ? (sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown') : 'ArrowUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-foreground">
                <button 
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-primary transition-agricultural"
                >
                  <span>Name & Breed</span>
                  <Icon 
                    name={sortField === 'name' ? (sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown') : 'ArrowUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-foreground">
                <button 
                  onClick={() => handleSort('healthScore')}
                  className="flex items-center space-x-1 hover:text-primary transition-agricultural"
                >
                  <span>Health Score</span>
                  <Icon 
                    name={sortField === 'healthScore' ? (sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown') : 'ArrowUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Vital Signs</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">
                <button 
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-primary transition-agricultural"
                >
                  <span>Status</span>
                  <Icon 
                    name={sortField === 'status' ? (sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown') : 'ArrowUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Location</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndPaginatedData?.data?.map((animal) => (
              <React.Fragment key={animal?.id}>
                <tr className="border-b border-border hover:bg-muted/30 transition-agricultural">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleRowExpansion(animal?.id)}
                        className="text-muted-foreground hover:text-foreground transition-agricultural"
                      >
                        <Icon 
                          name={expandedRows?.has(animal?.id) ? "ChevronDown" : "ChevronRight"} 
                          size={16} 
                        />
                      </button>
                      <span className="font-medium text-foreground">{animal?.id}</span>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-foreground">{animal?.name}</p>
                      <p className="text-sm text-muted-foreground">{animal?.breed} • {animal?.age}</p>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className={`text-lg font-bold ${getHealthScoreColor(animal?.healthScore)}`}>
                        {animal?.healthScore}
                      </span>
                      <span className="text-sm text-muted-foreground">/100</span>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon name="Thermometer" size={14} className="text-error" />
                        <span className="text-foreground">{animal?.temperature}°C</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Heart" size={14} className="text-success" />
                        <span className="text-foreground">{animal?.heartRate} BPM</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Activity" size={14} className="text-warning" />
                        <span className="text-foreground">{animal?.activity}%</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(animal?.status)}`}>
                      {animal?.status}
                    </span>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-1 text-sm text-foreground">
                      <Icon name="MapPin" size={14} className="text-muted-foreground" />
                      <span>{animal?.location}</span>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        iconName="Eye"
                        onClick={() => handleAnimalView(animal)}
                      >
                        View
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Edit">
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
                
                {/* Expanded Row */}
                {expandedRows?.has(animal?.id) && (
                  <tr className="bg-muted/20 border-b border-border">
                    <td colSpan="7" className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-foreground mb-3">Medication History</h4>
                          <div className="space-y-2">
                            {animal?.medications?.map((med, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <Icon name="Pill" size={14} className="text-primary" />
                                <span className="text-foreground">{med}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground">
                              Last Checkup: <span className="text-foreground">{animal?.lastCheckup}</span>
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-foreground mb-3">Veterinary Notes</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {animal?.notes}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer with Pagination */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndPaginatedData?.total)} of {filteredAndPaginatedData?.total} animals
          </span>
          
          <div className="flex items-center space-x-2">
            {filteredAndPaginatedData?.totalPages > 1 && (
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ChevronLeft"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                />
                
                <span className="text-sm text-muted-foreground px-2">
                  Page {currentPage} of {filteredAndPaginatedData?.totalPages}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ChevronRight"
                  disabled={currentPage === filteredAndPaginatedData?.totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(filteredAndPaginatedData?.totalPages, prev + 1))}
                />
              </div>
            )}
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground ml-4">
              <Icon name="RefreshCw" size={14} />
              <span>Last updated: {refreshTrigger > 0 ? '0 min ago' : '5 min ago'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalHealthTable;