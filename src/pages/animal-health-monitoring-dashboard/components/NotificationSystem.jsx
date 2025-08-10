import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationSystem = ({ notifications = [], onRemove }) => {
  useEffect(() => {
    notifications?.forEach(notification => {
      if (notification?.duration && notification?.duration > 0) {
        const timer = setTimeout(() => {
          onRemove?.(notification?.id);
        }, notification?.duration);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, onRemove]);

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'border-success bg-success/10';
      case 'error': return 'border-error bg-error/10';
      case 'warning': return 'border-warning bg-warning/10';
      case 'info': return 'border-primary bg-primary/10';
      default: return 'border-border bg-card';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  if (!notifications?.length) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications?.map((notification) => (
          <motion.div
            key={notification?.id}
            initial={{ opacity: 0, x: 300, scale: 0.3 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className={`border rounded-lg p-4 shadow-lg ${getNotificationColor(notification?.type)}`}
          >
            <div className="flex items-start space-x-3">
              <Icon 
                name={getNotificationIcon(notification?.type)} 
                size={20} 
                className={getIconColor(notification?.type)} 
              />
              
              <div className="flex-1 min-w-0">
                {notification?.title && (
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    {notification?.title}
                  </h4>
                )}
                <p className="text-sm text-foreground">
                  {notification?.message}
                </p>
                {notification?.timestamp && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(notification?.timestamp)?.toLocaleTimeString()}
                  </p>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => onRemove?.(notification?.id)}
                className="flex-shrink-0 -mr-1 -mt-1"
              />
            </div>

            {/* Progress bar for timed notifications */}
            {notification?.duration && notification?.duration > 0 && (
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: notification?.duration / 1000, ease: 'linear' }}
                className="h-1 bg-current opacity-30 rounded-full mt-3"
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;