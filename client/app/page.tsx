import { Suspense } from 'react';
import DashboardLayout from '@/components/dashboard/layout';
import DashboardLoading from '@/components/dashboard/loading';

export default function Home() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardLayout />
    </Suspense>
  );
}