'use client';

import { AppShell } from '@/components/shell/AppShell';
import { CustomMCard } from '@/components/ui/CustomMCard';
import {
  PageTitle, SectionText,
  SourceLinkText,
} from '@/components/ui/Typography';
// import { loadLODES } from '@/lib/contracts/sources';
import { Grid } from '@mantine/core';
import Link from 'next/link';

const deathsByStateURL = 'https://www.kff.org/state-health-policy-data/state-indicator/firearms-death-rate-per-100000/?activeTab=graph&currentTimeframe=0&startTimeframe=24&selectedDistributions=firearms-death-rate-per-100000&selectedRows=%7B%22wrapups%22:%7B%22united-states%22:%7B%7D%7D,%22states%22:%7B%22all%22:%7B%7D%7D%7D&sortModel=%7B%22colId%22:%222003__Firearms%20Death%20Rate%20per%20100,000%22,%22sort%22:%22desc%22%7D';

const injuriesByStateURL = 'https://www.rand.org/pubs/external_publications/EPA2431.html';

const stateLawsURL = 'https://www.rand.org/pubs/tools/TLA243-2-v3.html';

const Sources = () => {
  
  return (
    <AppShell>
      <div style={{ display: 'grid', gap: 16 }}>
        <PageTitle>Sources</PageTitle>
        <SectionText>Gun Violence in the USA</SectionText>
        <Grid>
          <Grid.Col span={12}>
            <CustomMCard p="md">
              <SourceLinkText >
                <span>Gun deaths by state from 1999 to 2023</span>
                <Link href={deathsByStateURL} target='_blank' className='text-blue-700 ml-16' >KFF</Link>
              </SourceLinkText>

              <SourceLinkText >
                <span>Injuries by state from 2000 to 2021</span>
                <Link href={injuriesByStateURL} target='_blank' className='text-blue-700 ml-16' >RAND</Link>
              </SourceLinkText>

              <SourceLinkText >
                <span>State gun laws from 1978 to 2024</span>
                <Link href={stateLawsURL} target='_blank' className='text-blue-700 ml-16' >RAND</Link>
              </SourceLinkText>
            </CustomMCard>
          </Grid.Col>
        </Grid>
      </div>
    </AppShell>
  );
};

export default Sources;
