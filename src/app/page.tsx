'use client';

import { AppShell } from '@/components/shell/AppShell';
import {
  CustomMCard, KPI,
} from '@/components/ui/CustomMCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Grid } from '@mantine/core';

const Page = () => {
  return (
    <AppShell>
      <div style={{ display: 'grid', gap: 16 }}>
        <SectionTitle>Overview</SectionTitle>
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <CustomMCard p="md">
              <KPI label="Regions Loaded" value="-" />
            </CustomMCard>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <CustomMCard p="md">
              <KPI label="Commute Avg (min)" value="-" />
            </CustomMCard>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <CustomMCard p="md">
              <KPI label="Housing Burden %" value="-" />
            </CustomMCard>
          </Grid.Col>
        </Grid>

        <SectionTitle>Getting Started</SectionTitle>
        <CustomMCard>
          <p className="text-sm opacity-80">
            UI shell is ready. Theme toggle persists. Next: connect sample data
            and render first charts
          </p>
        </CustomMCard>
      </div>
    </AppShell>
  );
};

export default Page;
