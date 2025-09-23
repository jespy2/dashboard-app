'use client';

import { palette } from '@/lib/palette';
import {
  Card as MCard, Text, Title, type CardProps,
} from '@mantine/core';

export const CustomMCard = (props: CardProps) => {
  return (
    <MCard
      rounded='md'
      shadow='sm'
      style={{ backgroundColor: palette.cardBg }}
      {...props}
    />
  );
};

export type MCardContentProps = {
  label: string;
  value: number | string;
};

export const MCardContent = ({ label, value }: MCardContentProps) => {
  return (
    <div>
      <Text c={palette.textSecondary} size="sm">
        {label}
      </Text>
      <Title order={3} c={palette.textPrimary}>
        {value}
      </Title>
    </div>
  );
};
