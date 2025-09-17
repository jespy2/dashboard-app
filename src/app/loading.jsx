'use client';

import { AppShell } from '@/components/shell/AppShell';
import { ChartSkeleton, KPISkeleton } from '@/components/ui/Skeletons';
import { SectionTitle } from '@/components/ui/Typography';

const Loading = () => {
  return (
    <AppShell>
      <SectionTitle>Loading dashboard...</SectionTitle>
      <div style={{ display: 'grid', gap: 16 }}>
        <KPISkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    </AppShell>
  );
};

export default Loading;
