'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Load notifications from localStorage on mount
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      const parsedNotifications = JSON.parse(savedNotifications);
      setNotifications(parsedNotifications);
      setUnreadCount(parsedNotifications.filter(n => !n.read).length);
    } else {
      // Initialize with some sample notifications
      const sampleNotifications = [
        {
          id: 1,
          title: 'Welcome to Golden Tag!',
          message: 'Thank you for joining us. Explore our premium corporate gifts collection.',
          type: 'welcome',
          read: false,
          timestamp: new Date().toISOString(),
          icon: '🎉'
        },
        {
          id: 2,
          title: 'New Products Available',
          message: 'Check out our latest collection of eco-friendly corporate gifts.',
          type: 'product',
          read: false,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          icon: '🆕'
        },
        {
          id: 3,
          title: 'Special Offer',
          message: 'Get 20% off on bulk orders over $1000. Limited time offer!',
          type: 'offer',
          read: true,
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          icon: '💰'
        }
      ];
      setNotifications(sampleNotifications);
      setUnreadCount(2);
      localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
    }
  }, []);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      read: false,
      timestamp: new Date().toISOString()
    };
    
    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    setUnreadCount(prev => prev + 1);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const markAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    );
    
    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.filter(n => !n.read).length);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const deleteNotification = (notificationId) => {
    const notification = notifications.find(n => n.id === notificationId);
    const updatedNotifications = notifications.filter(n => n.id !== notificationId);
    
    setNotifications(updatedNotifications);
    if (notification && !notification.read) {
      setUnreadCount(prev => prev - 1);
    }
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem('notifications');
  };

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
