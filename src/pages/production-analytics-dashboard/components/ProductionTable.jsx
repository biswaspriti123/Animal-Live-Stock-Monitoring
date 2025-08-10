import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProductionTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'volume', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const productionData = [
    {
      id: "A001",
      name: "Bella",
      breed: "Holstein",
      volume: 32.5,
      fatContent: 3.8,
      proteinLevel: 3.2,
      qualityGrade: "A+",
      qualityScore: 96.2,
      lastMilked: "2025-08-08 06:30",
      status: "active",
      trend: "up"
    },
    {
      id: "A045",
      name: "Luna",
      breed: "Jersey",
      volume: 31.8,
      fatContent: 4.2,
      proteinLevel: 3.5,
      qualityGrade: "A+",
      qualityScore: 94.7,
      lastMilked: "2025-08-08 06:45",
      status: "active",
      trend: "up"
    },
    {
      id: "A023",
      name: "Daisy",
      breed: "Holstein",
      volume: 30.9,
      fatContent: 3.6,
      proteinLevel: 3.1,
      qualityGrade: "A",
      qualityScore: 95.1,
      lastMilked: "2025-08-08 07:00",
      status: "active",
      trend: "stable"
    },
    {
      id: "A067",
      name: "Rosie",
      breed: "Guernsey",
      volume: 29.4,
      fatContent: 4.5,
      proteinLevel: 3.7,
      qualityGrade: "A",
      qualityScore: 93.8,
      lastMilked: "2025-08-08 06:15",
      status: "active",
      trend: "down"
    },
    {
      id: "A089",
      name: "Molly",
      breed: "Brown Swiss",
      volume: 28.7,
      fatContent: 4.0,
      proteinLevel: 3.4,
      qualityGrade: "A",
      qualityScore: 92.4,
      lastMilked: "2025-08-08 07:15",
      status: "active",
      trend: "up"
    },
    {
      id: "A112",
      name: "Sophie",
      breed: "Holstein",
      volume: 27.3,
      fatContent: 3.5,
      proteinLevel: 3.0,
      qualityGrade: "B+",
      qualityScore: 89.6,
      lastMilked: "2025-08-08 06:00",
      status: "monitoring",
      trend: "down"
    },
    {
      id: "A134",
      name: "Ruby",
      breed: "Jersey",
      volume: 26.8,
      fatContent: 4.1,
      proteinLevel: 3.3,
      qualityGrade: "A",
      qualityScore: 91.2,
      lastMilked: "2025-08-08 07:30",
      status: "active",
      trend: "stable"
    },
    {
      id: "A156",
      name: "Chloe",
      breed: "Guernsey",
      volume: 25.9,
      fatContent: 4.3,
      proteinLevel: 3.6,
      qualityGrade: "B+",
      qualityScore: 88.7,
      lastMilked: "2025-08-08 06:45",
      status: "monitoring",
      trend: "up"
    },
    {
      id: "A178",
      name: "Emma",
      breed: "Brown Swiss",
      volume: 24.6,
      fatContent: 3.9,
      proteinLevel: 3.2,
      qualityGrade: "B+",
      qualityScore: 87.3,
      lastMilked: "2025-08-08 07:00",
      status: "active",
      trend: "stable"
    },
    {
      id: "A190",
      name: "Grace",
      breed: "Holstein",
      volume: 23.2,
      fatContent: 3.4,
      proteinLevel: 2.9,
      qualityGrade: "B",
      qualityScore: 85.1,
      lastMilked: "2025-08-08 06:30",
      status: "attention",
      trend: "down"
    }
  ];

  const getQualityColor = (grade) => {
    switch (grade) {
      case 'A+': return 'bg-success text-success-foreground';
      case 'A': return 'bg-accent text-accent-foreground';
      case 'B+': return 'bg-warning text-warning-foreground';
      case 'B': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'monitoring': return 'bg-warning/10 text-warning border-warning/20';
      case 'attention': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return { icon: "TrendingUp", color: "text-success" };
      case 'down': return { icon: "TrendingDown", color: "text-error" };
      default: return { icon: "Minus", color: "text-muted-foreground" };
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = productionData?.filter(animal =>
    animal?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    animal?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    animal?.breed?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const sortedData = [...filteredData]?.sort((a, b) => {
    if (sortConfig?.direction === 'asc') {
      return a?.[sortConfig?.key] > b?.[sortConfig?.key] ? 1 : -1;
    }
    return a?.[sortConfig?.key] < b?.[sortConfig?.key] ? 1 : -1;
  });

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData?.slice(startIndex, startIndex + itemsPerPage);

  const SortButton = ({ column, children }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center space-x-1 text-left font-medium text-foreground hover:text-primary transition-agricultural"
    >
      <span>{children}</span>
      <Icon 
        name={sortConfig?.key === column ? 
          (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 
          'ChevronsUpDown'
        } 
        size={14} 
      />
    </button>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Production Records</h2>
          <p className="text-sm text-muted-foreground">Individual animal performance data</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-64">
            <Input
              type="search"
              placeholder="Search animals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
          <Button variant="outline" iconName="Download">
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">
                <SortButton column="name">Animal</SortButton>
              </th>
              <th className="text-left py-3 px-4">
                <SortButton column="volume">Volume (L)</SortButton>
              </th>
              <th className="text-left py-3 px-4">
                <SortButton column="fatContent">Fat %</SortButton>
              </th>
              <th className="text-left py-3 px-4">
                <SortButton column="proteinLevel">Protein %</SortButton>
              </th>
              <th className="text-left py-3 px-4">
                <SortButton column="qualityScore">Quality</SortButton>
              </th>
              <th className="text-left py-3 px-4">
                <SortButton column="lastMilked">Last Milked</SortButton>
              </th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Trend</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((animal) => {
              const trendInfo = getTrendIcon(animal?.trend);
              
              return (
                <tr key={animal?.id} className="border-b border-border hover:bg-muted/30 transition-agricultural">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-foreground">{animal?.name}</div>
                      <div className="text-sm text-muted-foreground">#{animal?.id} • {animal?.breed}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-foreground">{animal?.volume}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-foreground">{animal?.fatContent}%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-foreground">{animal?.proteinLevel}%</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQualityColor(animal?.qualityGrade)}`}>
                        {animal?.qualityGrade}
                      </span>
                      <span className="text-sm text-muted-foreground">{animal?.qualityScore}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-muted-foreground">
                      {new Date(animal.lastMilked)?.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(animal?.status)}`}>
                      {animal?.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Icon name={trendInfo?.icon} size={16} className={trendInfo?.color} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData?.length)} of {sortedData?.length} animals
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              iconName="ChevronLeft"
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionTable;