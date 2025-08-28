// src/test/utils.tsx
import { AppShell } from '@/components/shell/AppShell';
import Providers from '@/providers';
import { render, type RenderOptions } from '@testing-library/react';
import React from 'react';

type WrapperProps = { children: React.ReactNode };

// Minimal: providers only (fast default)
function AllProviders({ children }: WrapperProps) {
  return <Providers>{children}</Providers>;
}

// App-like: providers + AppShell (opt-in for layout-dependent tests)
function AllProvidersWithShell({ children }: WrapperProps) {
  return (
    <Providers>
      <AppShell>{children}</AppShell>
    </Providers>
  );
}

/** Default helper: fast, isolated */
export function renderWithProviders(
  ui: React.ReactElement,
  options?: RenderOptions,
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

/** Opt-in helper: realistic layout with AppShell */
export function renderWithAppShell(
  ui: React.ReactElement,
  options?: RenderOptions,
) {
  return render(ui, { wrapper: AllProvidersWithShell, ...options });
}
