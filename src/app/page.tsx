'use client';

// import { Timeline } from '@/components/charts/Timeline';
import { AppShell } from '@/components/shell/AppShell';
import { CustomMCard } from '@/components/ui/CustomMCard';
import { ScrollableTimeline } from '@/components/ui/ScrollableTimeline';
import {
  PageTitle, SectionText, SectionTitle,
} from '@/components/ui/Typography';
import { Grid } from '@mantine/core';

const timelineData = [
  {
    innovation: 'Helicopter MEDEVAC, the Golden Hour, and air medical EMS',
    theater: 'Korean War (first large‑scale helo medevac, 1951) → Vietnam War (systematized Golden Hour)',
    description: 'Rapid evacuation to definitive care; creation of tiered trauma systems and air medical transport models',
    militaryImplementationYear: 1951,
    usImplementationYear: 1975,
    outcomes: 'Faster evacuation linked with improved survival; foundational to modern U.S. trauma systems',
  },
  {
    innovation: 'Tranexamic acid (TXA) early use in trauma',
    theater: 'Adopted globally; informed by both civilian mega‑trial and battlefield experience (MATTERs)',
    description: 'Antifibrinolytic inhibits clot breakdown; give within 3 h (earlier is better)',
    militaryImplementationYear: 2010,
    usImplementationYear: 2012,
    outcomes: 'CRASH‑2: reduced all‑cause mortality (RR 0.91) with early dosing; best if < 3 hours from injury',
  },
  {
    innovation: 'Needle decompression site change (4th/5th ICS anterior‑axillary line)',
    theater: 'Iraq & Afghanistan (TCCC evidence review)',
    description: 'Move from 2nd ICS mid‑clavicular to lateral site to reduce failure from chest wall thickness and iatrogenic injury',
    militaryImplementationYear: 2012,
    usImplementationYear: 2012,
    outcomes: 'Guideline‑supported; improved success reported in implementation studies (protocol‑level evidence)',
  },
];

const Index = () => {
  return (
    <AppShell>
      <div style={{ display: 'grid', gap: 16 }}>
        <PageTitle>Gun Violence in the USA</PageTitle>
        <SectionText>Gun Violence in the USA</SectionText>
        <Grid>
          <Grid.Col span={12}>
            <CustomMCard p="md">
              <SectionTitle>BattleField Medical Innovations</SectionTitle>
              <SectionText>This text will describe what the significance is</SectionText>
              <ScrollableTimeline items={timelineData} />
              {/* <Timeline /> */}
            </CustomMCard>
          </Grid.Col>
        </Grid>
      </div>
    </AppShell>
  );
};

export default Index;
