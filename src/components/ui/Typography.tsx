'use client';

import {
  Text,
  Title,
} from '@mantine/core';

type TextProps = {
  children: React.ReactNode;
};

export const PageTitle = ({ children }: TextProps) => {
  return <Title order={1}>{children}</Title>;
};

export const SectionTitle = ({ children }: TextProps) => {
  return <Title order={2} mb='5' >{children}</Title>;
};

export const SectionSubTitle = ({ children }: TextProps) => {
  return <Title order={3}>{children}</Title>;
};

export const TimelineCardTitle = ({ children }: TextProps) => {
  return <Title order={4}>{children}</Title>;
};

export const SectionText = ({ children }: TextProps) => {
  return <Text size='md' mb='15'>{children}</Text>;
};

export const SourceLinkText = ({ children }: TextProps) => {
  return <Text size='md' component='div' className='flex justify-start items-center'>{children}</Text>;
};