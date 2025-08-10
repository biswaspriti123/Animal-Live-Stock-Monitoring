import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onSidebarToggle, sidebarOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState('normal');
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const navigationItems = [
    {
      label: 'Overview',
      path: '/livestock-overview-dashboard',
      icon: 'BarChart3',
      tooltip: 'Central monitoring hub for comprehensive livestock insights'
    },
    {
      label: 'Health',
      path: '/animal-health-monitoring-dashboard',
      icon: 'Heart',
      tooltip: 'Veterinary dashboard for health analysis and predictive insights'
    },
    {
      label: 'Production',
      path: '/production-analytics-dashboard',
      icon: 'TrendingUp',
      tooltip: 'Analytics for optimizing yield and business performance'
    },
    {
      label: 'Operations',
      path: '/real-time-operations-dashboard',
      icon: 'Activity',
      tooltip: 'Mission-critical command center for immediate response'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const getAlertColor = () => {
    switch (alertStatus) {
      case 'critical': return 'text-error';
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      default: return 'text-success';
    }
  };

  const getConnectionColor = () => {
    return connectionStatus === 'connected' ? 'text-success' : 'text-error';
  };

  const formatLastUpdate = () => {
    const now = new Date();
    const diff = Math.floor((now - lastUpdate) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <header className={`
      fixed top-0 right-0 z-[1000] bg-background border-b border-border
      transition-all duration-300 ease-in-out
      left-0
      ${sidebarOpen ? 'lg:left-80' : 'lg:left-16'} h-16
    `}>
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Sidebar Toggle & Logo */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSidebarToggle}
            iconName="Menu"
            className="lg:hidden"
          />
          
          <div className="flex items-center space-x-2 lg:hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground hidden sm:block">
              Animal Monitor
            </span>
          </div>
        </div>

        {/* Desktop Navigation - Hidden when sidebar is visible */}
        <nav className={`hidden lg:flex items-center space-x-1 ${sidebarOpen ? 'lg:hidden' : ''}`}>
          {navigationItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-agricultural ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={item?.tooltip}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Status Indicators & User Menu */}
        <div className="flex items-center space-x-4">
          {/* Connection Status */}
          <div 
            className="hidden md:flex items-center space-x-1 text-xs cursor-pointer"
            title={`Connection: ${connectionStatus} • Last update: ${formatLastUpdate()}`}
          >
            <div className={`w-2 h-2 rounded-full ${getConnectionColor()}`} />
            <span className="text-muted-foreground">Live</span>
          </div>

          {/* Alert Status */}
          <button
            className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-agricultural ${getAlertColor()}`}
            title="System alerts and notifications"
          >
            <Icon name="Bell" size={16} />
            <span className="hidden sm:inline">
              {alertStatus === 'critical' ? 'Critical' : 
               alertStatus === 'warning' ? 'Warning' : 'Normal'}
            </span>
          </button>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-agricultural"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-agricultural-lg z-[1010]">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">Farm Manager</p>
                  <p className="text-xs text-muted-foreground">admin@farm.com</p>
                </div>
                <div className="py-1">
                  <button className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-agricultural">
                    Settings
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-agricultural">
                    Help & Support
                  </button>
                  <hr className="my-1 border-border" />
                  <button className="w-full px-3 py-2 text-left text-sm text-error hover:bg-muted transition-agricultural">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-agricultural"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border z-[1020]">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => {
              const isActive = location?.pathname === item?.path;
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-agricultural ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </button>
              );
            })}
            
            {/* Mobile Status Indicators */}
            <div className="pt-4 mt-4 border-t border-border space-y-2">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-muted-foreground">Connection</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getConnectionColor()}`} />
                  <span className="text-xs text-muted-foreground">{connectionStatus}</span>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-muted-foreground">Alerts</span>
                <span className={`text-xs font-medium ${getAlertColor()}`}>
                  {alertStatus === 'critical' ? 'Critical' : 
                   alertStatus === 'warning' ? 'Warning' : 'Normal'}
                </span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;