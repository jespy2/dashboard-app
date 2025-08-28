import {
  ChartSkeleton, KPISkeleton,
} from '@/components/ui/Skeletons';
import { renderWithProviders } from '@/test/utils';
import { screen } from '@testing-library/react';

describe('Skeletons', () => {
  test('KPI skeleton renders three cards', () => {
    renderWithProviders(<KPISkeleton />);

    const skeletons = screen.getAllByText(
      (_, node) => node?.className?.includes('mantine-Skeleton') || false,
    );
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test('Chart skeleton renders chart area skeleton', () => {
    renderWithProviders(<ChartSkeleton height={200} />);

    const nodes = document.querySelectorAll('.mantine-Skeleton-root');
    expect(nodes.length).toBeGreaterThan(0);
  });
});
