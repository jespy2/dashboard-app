'use client';

import { palette } from '@/lib/palette';
import {
  Card, Group, Skeleton,
} from '@mantine/core';

export const KPISkeleton = () => {
  const row = [0, 1, 2];

  return (
    <Group grow gap="md">
      {row.map((index) => (
        <Card
          key={index}
          radius="xl"
          shadow="sm"
          p="md"
          style={{ backgroundColor: palette.cardBg }}
        >
          <Skeleton height={24} mb="xs" />
          <Skeleton height={28} />
        </Card>
      ))}
    </Group>
  );
};

export type ChartSkeletonProps = {
  height?: number;
};

export const ChartSkeleton = ({ height = 320 }: ChartSkeletonProps) => {
  return (
    <Card
      radius="xl"
      shadow="sm"
      p="md"
      h={height}
      style={{ backgroundColor: palette.cardBg }}
    >
      <Group justify="space-between" mb="sm">
        <Skeleton height={20} width="30%" />
        <Skeleton height={32} width={96} />
      </Group>
    </Card>
  );
};
