import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductionLeaderboard = () => {
  const [sortBy, setSortBy] = useState('volume');
  const [timeframe, setTimeframe] = useState('today');

  const leaderboardData = [
    {
      id: "A001",
      name: "Bella",
      breed: "Holstein",
      volume: 32.5,
      quality: 96.2,
      efficiency: 92.1,
      rank: 1,
      trend: "up",
      avatar: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: "A045",
      name: "Luna",
      breed: "Jersey",
      volume: 31.8,
      quality: 94.7,
      efficiency: 89.3,
      rank: 2,
      trend: "up",
      avatar: "https://images.unsplash.com/photo-1518594023904-1f430b9d4b84?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: "A023",
      name: "Daisy",
      breed: "Holstein",
      volume: 30.9,
      quality: 95.1,
      efficiency: 87.8,
      rank: 3,
      trend: "stable",
      avatar: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: "A067",
      name: "Rosie",
      breed: "Guernsey",
      volume: 29.4,
      quality: 93.8,
      efficiency: 85.6,
      rank: 4,
      trend: "down",
      avatar: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: "A089",
      name: "Molly",
      breed: "Brown Swiss",
      volume: 28.7,
      quality: 92.4,
      efficiency: 84.2,
      rank: 5,
      trend: "up",
      avatar: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return { icon: "Trophy", color: "text-yellow-500" };
      case 2: return { icon: "Medal", color: "text-gray-400" };
      case 3: return { icon: "Award", color: "text-amber-600" };
      default: return { icon: "Circle", color: "text-muted-foreground" };
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return { icon: "TrendingUp", color: "text-success" };
      case 'down': return { icon: "TrendingDown", color: "text-error" };
      default: return { icon: "Minus", color: "text-muted-foreground" };
    }
  };

  const sortedData = [...leaderboardData]?.sort((a, b) => {
    switch (sortBy) {
      case 'volume': return b?.volume - a?.volume;
      case 'quality': return b?.quality - a?.quality;
      case 'efficiency': return b?.efficiency - a?.efficiency;
      default: return a?.rank - b?.rank;
    }
  });

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Top Performers</h2>
          <p className="text-sm text-muted-foreground">Production leaderboard</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={timeframe === 'today' ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeframe('today')}
          >
            Today
          </Button>
          <Button
            variant={timeframe === 'week' ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeframe('week')}
          >
            Week
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <div className="flex items-center space-x-1">
          {[
            { key: 'volume', label: 'Volume' },
            { key: 'quality', label: 'Quality' },
            { key: 'efficiency', label: 'Efficiency' }
          ]?.map((option) => (
            <Button
              key={option?.key}
              variant={sortBy === option?.key ? "default" : "ghost"}
              size="sm"
              onClick={() => setSortBy(option?.key)}
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {sortedData?.map((animal, index) => {
          const rankInfo = getRankIcon(animal?.rank);
          const trendInfo = getTrendIcon(animal?.trend);
          
          return (
            <div key={animal?.id} className="grid grid-cols-[auto,1fr,auto] items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-agricultural">
              <div className="flex items-center space-x-3 shrink-0">
                <div className="flex items-center justify-center w-8 h-8">
                  <Icon name={rankInfo?.icon} size={20} className={rankInfo?.color} />
                </div>
                
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <img 
                    src={animal?.avatar} 
                    alt={animal?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-2 mb-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{animal?.name}</h3>
                  <span className="text-xs text-muted-foreground shrink-0">#{animal?.id}</span>
                  <Icon name={trendInfo?.icon} size={14} className={`${trendInfo?.color} shrink-0`} />
                </div>
                <p className="text-sm text-muted-foreground truncate">{animal?.breed}</p>
              </div>
              <div className="ml-auto grid grid-cols-3 gap-4 text-sm text-right w-[240px] sm:w-[280px] md:w-[320px]">
                <div>
                  <p className="font-medium text-foreground whitespace-nowrap">{animal?.volume}L</p>
                  <p className="text-xs text-muted-foreground">Volume</p>
                </div>
                <div>
                  <p className="font-medium text-foreground whitespace-nowrap">{animal?.quality}%</p>
                  <p className="text-xs text-muted-foreground">Quality</p>
                </div>
                <div>
                  <p className="font-medium text-foreground whitespace-nowrap">{animal?.efficiency}%</p>
                  <p className="text-xs text-muted-foreground">Efficiency</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="Eye">
          View All Animals
        </Button>
      </div>
    </div>
  );
};

export default ProductionLeaderboard;