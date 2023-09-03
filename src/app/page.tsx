'use client';
import { PageLoader } from '@/components';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AppRoot() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/home');
    }, 1500);
  });

  return <PageLoader />;
}
