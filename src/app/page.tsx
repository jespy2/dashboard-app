'use client';

import { AppShell } from '@/components/shell/AppShell';
import {
  Card, KPI,
} from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Grid } from '@mantine/core';

const Page = () => {
  return (
    <AppShell>
      <div style={{ display: 'grid', gap: 16 }}>
        <SectionTitle>Overview</SectionTitle>
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card p="md">
              <KPI label="Regions Loaded" value="-" />
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card p="md">
              <KPI label="Commute Avg (min)" value="-" />
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card p="md">
              <KPI label="Housing Burden %" value="-" />
            </Card>
          </Grid.Col>
        </Grid>

        <SectionTitle>Getting Started</SectionTitle>
        <Card>
          <p className="text-sm opacity-80">
            UI shell is ready. Theme toggle persists. Next: connect sample data
            and render first charts
          </p>
        </Card>
      </div>
    </AppShell>
  );
};

export default Page;
