import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isOpen, onToggle }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedSections, setExpandedSections] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/animal-health-monitoring-dashboard',
      description: 'Main overview and analytics'
    },
    {
      id: 'livestock-overview',
      label: 'Livestock Overview',
      icon: 'BarChart3',
      path: '/livestock-overview-dashboard',
      description: 'Comprehensive livestock insights'
    },
    {
      id: 'animal-profiles',
      label: 'Animal Profiles',
      icon: 'Users',
      path: '#',
      description: 'Individual animal records',
      hasSubmenu: true,
      submenu: [
        { label: 'All Animals', icon: 'List', path: '#' },
        { label: 'Add New Animal', icon: 'Plus', path: '#' },
        { label: 'Breeding Records', icon: 'Heart', path: '#' }
      ]
    },
    {
      id: 'live-location',
      label: 'Live Location',
      icon: 'MapPin',
      path: '#',
      description: 'Real-time animal tracking'
    },
    {
      id: 'health-monitoring',
      label: 'Health Monitoring',
      icon: 'Heart',
      path: '/animal-health-monitoring-dashboard',
      description: 'Veterinary health analysis'
    },
    {
      id: 'milk-reports',
      label: 'Milk Reports',
      icon: 'Droplets',
      path: '/production-analytics-dashboard',
      description: 'Production analytics and reports',
      hasSubmenu: true,
      submenu: [
        { label: 'Daily Production', icon: 'Calendar', path: '/production-analytics-dashboard' },
        { label: 'Quality Analysis', icon: 'Beaker', path: '#' },
        { label: 'Historical Trends', icon: 'TrendingUp', path: '#' }
      ]
    },
    {
      id: 'operations',
      label: 'Operations',
      icon: 'Activity',
      path: '/real-time-operations-dashboard',
      description: 'Real-time operations control'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      path: '#',
      description: 'Alerts and system messages',
      badge: '12'
    },
    {
      id: 'nutrition',
      label: 'Nutrition',
      icon: 'Apple',
      path: '#',
      description: 'Feed management and planning',
      hasSubmenu: true,
      submenu: [
        { label: 'Feed Schedule', icon: 'Clock', path: '#' },
        { label: 'Nutrition Analysis', icon: 'PieChart', path: '#' },
        { label: 'Feed Inventory', icon: 'Package', path: '#' }
      ]
    },
    {
      id: 'activity',
      label: 'Activity Log',
      icon: 'FileText',
      path: '#',
      description: 'System and user activity logs'
    },
    {
      id: 'export',
      label: 'Export & Reports',
      icon: 'Download',
      path: '#',
      description: 'Data export and reporting tools',
      hasSubmenu: true,
      submenu: [
        { label: 'Generate Report', icon: 'FileSpreadsheet', path: '#' },
        { label: 'Export Data', icon: 'Download', path: '#' },
        { label: 'Scheduled Reports', icon: 'Clock', path: '#' }
      ]
    }
  ];

  const settingsItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      path: '#',
      description: 'System configuration',
      hasSubmenu: true,
      submenu: [
        { label: 'General Settings', icon: 'Settings2', path: '#' },
        { label: 'User Management', icon: 'Users', path: '#' },
        { label: 'Alerts Config', icon: 'Bell', path: '#' },
        { label: 'Data Backup', icon: 'Database', path: '#' }
      ]
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: 'HelpCircle',
      path: '#',
      description: 'Documentation and support'
    }
  ];

  useEffect(() => {
    const currentPath = location?.pathname;
    const currentItem = navigationItems?.find(item => item?.path === currentPath);
    if (currentItem) {
      setActiveTab(currentItem?.id);
    }
  }, [location?.pathname]);

  const handleNavigation = (item) => {
    if (item?.path && item?.path !== '#') {
      navigate(item?.path);
      setActiveTab(item?.id);
    }
  };

  const toggleExpanded = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const renderNavigationItem = (item, isSubmenuItem = false) => {
    const isActive = activeTab === item?.id || location?.pathname === item?.path;
    const isExpanded = expandedSections?.[item?.id];

    return (
      <div key={item?.id} className={`${isSubmenuItem ? 'ml-6' : ''}`}>
        <div
          onClick={() => {
            if (item?.hasSubmenu) {
              toggleExpanded(item?.id);
            } else {
              handleNavigation(item);
            }
          }}
          className={`
            flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200
            ${isActive 
              ? 'bg-primary text-primary-foreground shadow-md' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }
            ${isSubmenuItem ? 'py-2 text-sm' : ''}
          `}
          title={isOpen ? '' : item?.description}
        >
          <div className="flex items-center space-x-3">
            <Icon 
              name={item?.icon} 
              size={isSubmenuItem ? 16 : 20} 
              color={isActive ? 'white' : 'currentColor'}
            />
            {isOpen && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${isSubmenuItem ? 'text-sm' : ''}`}>
                    {item?.label}
                  </span>
                  {item?.badge && (
                    <span className="px-2 py-1 text-xs bg-error text-error-foreground rounded-full">
                      {item?.badge}
                    </span>
                  )}
                </div>
                {!isSubmenuItem && (
                  <p className="text-xs opacity-75 truncate mt-1">
                    {item?.description}
                  </p>
                )}
              </div>
            )}
          </div>
          
          {isOpen && item?.hasSubmenu && (
            <Icon 
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
              size={16}
              color={isActive ? 'white' : 'currentColor'}
            />
          )}
        </div>

        {isOpen && item?.hasSubmenu && isExpanded && (
          <div className="mt-2 space-y-1">
            {item?.submenu?.map((subItem) => (
              <div
                key={subItem?.label}
                onClick={() => handleNavigation(subItem)}
                className="flex items-center space-x-3 p-2 ml-6 rounded-lg cursor-pointer transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Icon name={subItem?.icon} size={16} />
                <span className="text-sm">{subItem?.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[998] bg-black bg-opacity-50 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full z-[999] bg-card border-r border-border shadow-agricultural-lg
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-80' : 'w-16'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b border-border ${!isOpen ? 'justify-center' : ''}`}>
            {isOpen ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={20} color="white" />
                  </div>
                  <span className="text-lg font-semibold text-foreground">
                    Animal Monitor
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggle}
                  iconName="X"
                  className="lg:hidden"
                />
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                iconName="Menu"
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {/* Main Navigation */}
              <div className="space-y-1">
                {isOpen && (
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Navigation
                  </h3>
                )}
                {navigationItems?.map((item) => renderNavigationItem(item))}
              </div>

              {/* Settings Section */}
              <div className={`pt-4 ${isOpen ? 'border-t border-border' : ''}`}>
                {isOpen && (
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    System
                  </h3>
                )}
                {settingsItems?.map((item) => renderNavigationItem(item))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={`p-4 border-t border-border ${!isOpen ? 'hidden' : ''}`}>
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  Farm Manager
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  admin@farm.com
                </p>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">System Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-success">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Data Sync</span>
                <span className="text-muted-foreground">2 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;