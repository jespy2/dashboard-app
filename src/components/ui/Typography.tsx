'use client';

import { Text, Title } from '@mantine/core';
import { useInView } from 'react-intersection-observer';

type TextProps = {
  children: React.ReactNode;
};

export const PageTitle = ({ children }: TextProps) => {
  return (
    <Title className="sticky top-0 z-50" order={1}>
      {children}
    </Title>
  );
};

export const SectionTitle = ({ children }: TextProps) => {
  const { ref, entry } = useInView({
    threshold: Array.from({ length: 11 }, (_, i) => i / 10),
    triggerOnce: false,
  });
  const ratio = entry?.intersectionRatio ?? 0;

  return (
    <Title
      ref={ref}
      order={2}
      className="transition-all duration-500"
      style={{
        opacity: ratio,
        transform: `translateY(${20 - ratio * 20}px)`,
      }}
      mb="5"
    >
      {children}
    </Title>
  );
};

export const SectionSubTitle = ({ children }: TextProps) => {
  return <Title order={3}>{children}</Title>;
};

export const TimelineCardTitle = ({ children }: TextProps) => {
  return <Title order={4}>{children}</Title>;
};

export const SectionText = ({ children }: TextProps) => {
  const { ref, entry } = useInView({
    threshold: Array.from({ length: 11 }, (_, i) => i / 10),
    triggerOnce: false,
  });
  const ratio = entry?.intersectionRatio ?? 0;

  return (
    <div
      ref={ref}
      className="transition-all duration-500"
      style={{
        opacity: ratio,
        transform: `translateY(${20 - ratio * 20}px )`,
      }}
    >
      <Text size="md" mb="15">
        {children}
      </Text>
    </div>
  );
};

export const SourceLinkText = ({ children }: TextProps) => {
  return (
    <Text size="md" component="div" className="flex justify-start items-center">
      {children}
    </Text>
  );
};
