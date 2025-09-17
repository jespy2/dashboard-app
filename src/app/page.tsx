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
    outcome: 'Faster evacuation linked with improved survival; foundational to modern U.S. trauma systems',
  },
  {
    innovation: 'Tranexamic acid (TXA) early use in trauma',
    theater: 'Adopted globally; informed by both civilian mega‑trial and battlefield experience (MATTERs)',
    description: 'Antifibrinolytic inhibits clot breakdown; give within 3 h (earlier is better)',
    militaryImplementationYear: 2010,
    usImplementationYear: 2012,
    outcome: 'CRASH‑2: reduced all‑cause mortality (RR 0.91) with early dosing; best if < 3 hours from injury',
  },
  {
    innovation: 'Needle decompression site change (4th/5th ICS anterior‑axillary line)',
    theater: 'Iraq & Afghanistan (TCCC evidence review)',
    description: 'Move from 2nd ICS mid‑clavicular to lateral site to reduce failure from chest wall thickness and iatrogenic injury',
    militaryImplementationYear: 2012,
    usImplementationYear: 2012,
    outcome: 'Guideline‑supported; improved success reported in implementation studies (protocol‑level evidence)',
  },
  {
    innovation: 'REBOA (Resuscitative Endovascular Balloon Occlusion of the Aorta)',
    theater: 'Iraq & Afghanistan (renewed interest building on earlier concepts)',
    description: 'Temporary balloon occlusion to control non‑compressible torso hemorrhage while expediting definitive control',
    militaryImplementationYear: 2010,
    usImplementationYear: 2012,
    outcome: 'Mixed; feasibility 68–100% prehospital in select series; survival to discharge reported but technique remains selective',
  },
  {
    innovation: 'Modern tourniquets (e.g., CAT) + universal tourniquet training',
    theater: 'Iraq & Afghanistan (GWOT)',
    description: 'Temporary balloon occlusion to control non‑compressible torso hemorrhage while expediting definitive control',
    militaryImplementationYear: 2005,
    usImplementationYear: 2015,
    outcome: 'Military: clear survival benefit and low morbidity (Kragh 2008); Civilian: systematic reviews show effectiveness with few complications; Boston Marathon analysis documented effective use',
  },
  {
    innovation: 'Hemostatic dressings (kaolin-impregnated gauze; QuikClot Combat Gauze)',
    theater: 'Iraq & Afghanistan (GWOT)',
    description: 'Kaolin accelerates clotting; gauze format allows wound packing for junctional/irregular wounds',
    militaryImplementationYear: 2008,
    usImplementationYear: 2015,
    outcome: 'Prehospital multicenter civilian study: QCG 89% effective; minimal morbidity (Leonard 2016); additional early civilian series support benefit',
  },
  {
    innovation: 'Damage Control Resuscitation (DCR) & balanced transfusion (1:1:1)',
    theater: 'Iraq & Afghanistan (GWOT)',
    description: 'Early hemostatic resuscitation with plasma/platelets/RBCs ~1:1:1, minimal crystalloids; focus on stopping bleeding fast',
    militaryImplementationYear: 2008,
    usImplementationYear: 2015,
    outcome: 'PROPPR: no diff in 24h/30d all‑cause mortality, but higher hemostasis and fewer deaths from exsanguination at 24h in 1:1:1 group',
  },
  {
    innovation: 'Public bleeding‑control movement (Stop the Bleed)',
    theater: 'Lessons from GWOT TCCC applied to civilians',
    description: 'Train bystanders to apply pressure, pack wounds with hemostatic gauze, and use tourniquets before EMS arrival',
    militaryImplementationYear: 1996,
    usImplementationYear: 2015,
    outcome: 'Programmatic; widespread training and kit deployment; evidence extrapolated from military & civilian hemorrhage control studies',
  },
  {
    innovation: 'Prehospital low‑titer O whole blood (LTOWB) & WFWB concepts',
    theater: 'Iraq & Afghanistan (GWOT)',
    description: 'Use of whole blood early to restore oxygen‑carrying capacity and hemostasis',
    militaryImplementationYear: 2010,
    usImplementationYear: 2016,
    outcome: 'Civilian single‑center registry 2015–2019: prehospital LTOWB associated with lower early mortality in hemorrhagic shock',
  },
  {
    innovation: 'Prehospital plasma transfusion',
    theater: 'Derived from DCR experience in GWOT',
    description: 'Give thawed plasma before hospital to correct coagulopathy and reduce bleeding',
    militaryImplementationYear: 2010,
    usImplementationYear: 2018,
    outcome: 'PAMPer: lower 30‑day mortality (23.2% vs 33.0%); benefit greatest with transport >20 min (post‑hoc)',
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
            <CustomMCard h='15%' p="lg">
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
