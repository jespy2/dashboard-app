'use client';

import { Title } from '@mantine/core';

type SectionTitleProps = {
  children: React.ReactNode;
};

export const SectionTitle = ({ children }: SectionTitleProps) => {
  return <Title order={2}>{children}</Title>;
};
