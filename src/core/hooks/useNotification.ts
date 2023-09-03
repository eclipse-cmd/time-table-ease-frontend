'use client';
import { NotificationType } from '@/core';
import { useEffect, useState } from 'react';

type UseNotificationProps = {
  message?: string;
  state?: boolean;
  type: NotificationType;
};

export const useNotification = (message?: '', state?: false, type: NotificationType = 'success') => {
  const [notification, setNotification] = useState<UseNotificationProps | null>(null);

  useEffect(() => {
    setNotification({ message, state, type });

    return () => setNotification(null);
  }, [message, state, type]);

  return { notification, setNotification };
};
