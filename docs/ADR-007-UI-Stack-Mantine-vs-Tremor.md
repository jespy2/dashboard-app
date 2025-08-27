# ADR-007 — UI/Charts Stack: **Mantine (+@mantine/charts + Recharts Sankey)** vs **Tremor**

**Status:** Accepted  
**Date:** 2025-08-27  
**Owner:** James (FE, React/TS)

---

## Context

We’re building a React‑19 / Next‑15 dashboard that needs:

- A full component system (AppShell, cards, skeletons, theming)
- First‑party **Funnel** chart
- A **Sankey** view (with custom nodes/links)
- Clean theming via a central palette and minimal friction with React 19 / RSC

Tremor’s current npm package caused a peer‑dependency conflict in a React 19 app. Tremor also prescribes Tailwind. Mantine provides a full React component system with a charts package built on Recharts, which covers Funnel out of the box and lets us use Recharts’ `<Sankey />` directly.

---

## Decision

Adopt **Mantine Core + Hooks + @mantine/charts** as the primary UI & charting stack, and use **Recharts** directly for the **Sankey** view (option to swap Sankey to Nivo later if needed).

- **Funnel:** `@mantine/charts` `<FunnelChart />`
- **Sankey:** Recharts `<Sankey />` with custom node/link renderers
- **Theming:** Mantine theme + CSS variables mapped to our `palette.ts`
- **React 19:** Verified compatibility and ergonomics

---

## Options Considered

### A) Mantine (+ @mantine/charts + Recharts for Sankey) — **Chosen**

**Pros**
- React‑19 compatibility and good RSC story
- Built‑in **Funnel** component
- Charts are Recharts‑based → easy to add Recharts `<Sankey />`
- Strong component set (AppShell, inputs, overlays), clean TS APIs
- Theming via `createTheme` and CSS variables keeps palette centralized

**Cons / Risks**
- Slight mix of APIs (Mantine chart wrappers + direct Recharts for Sankey)
- Mantine theming differs from Tailwind utility tokens

### B) Tremor (@tremor/react)

**Pros**
- Polished dashboard primitives and Tailwind‑native styling
- Nice templates/“Blocks”

**Cons (for our constraints)**
- React‑19 peer‑dep conflict encountered during install
- Tailwind‑first approach; without the package (copy‑paste “Raw/Blocks”), we own more styling/maintenance

---

## Consequences

**Positive**
- Unblocked on React 19 with a supported UI library
- Funnel delivered by Mantine; Sankey delivered by Recharts (single runtime)
- Palette wired once and shared across components/charts

**Negative**
- Mixed chart API surface
- Potential future addition of a second chart runtime if we switch Sankey to Nivo for performance/features

---

## Implementation Plan

1. **Install**
   ```bash
   npm i @mantine/core @mantine/hooks @mantine/charts recharts
   # (project already includes lucide-react / clsx)
   ```

2. **Theming**
   - Keep `src/lib/palette.ts`:
     ```ts
     export const palette = {
       background: "#F9F9FB",
       cardBg: "#FFFFFF",
       textPrimary: "#2D2D2D",
       textSecondary: "#6C757D",
       accent: "#4B5EA3",
       accent2: "#2D9C8F",
       highlight: "#F2994A",
       graphBg: "#EFEFF3",
     } as const;
     ```
   - Map to Mantine using `createTheme` and a `MantineColorsTuple` for `brand`, and set CSS variables (e.g., `--mantine-color-body`, `--mantine-color-text`, `--mantine-color-anchor`).

3. **Global styles**
   - Import once in `app/layout.tsx`:
     ```tsx
     import "@mantine/core/styles.css";
     import "@mantine/charts/styles.css";
     ```

4. **Charts**
   - **Funnel:** `<FunnelChart />` (Mantine)
   - **Sankey:** `<Sankey />` (Recharts) with custom `node`/`link` renderers typed against Recharts’ Sankey types; guard for variations (`d` path vs `points[]`).

5. **Optional later swap**
   - If Recharts’ Sankey doesn’t meet needs, replace that single view with **Nivo Sankey** without touching the rest of the stack.

---

## Decision Drivers

- Works cleanly with **React 19** today
- **Feature fit:** first‑party Funnel + customizable Sankey
- **DX & theming:** centralized palette, typed components, minimal glue code
- Lower risk than waiting for peer‑dep updates in Tremor

---

## Alternatives (not chosen)

- **Tremor Raw / Blocks (copy‑paste):** avoids peer deps but increases long‑term maintenance (own CSS/classes).
- **shadcn/ui (+ Recharts):** Tailwind‑first primitives; requires assembling charts, theming, and layout more manually.

---

## Risks & Mitigations

- **Recharts Sankey API drift across minors:** Write tolerant renderers (support `d` or `points` or control‑point props); pin a stable minor if needed.
- **Design consistency:** Use `palette` across Mantine components and Recharts elements; validate light/dark modes.

---

## Outcome

Proceed with **Mantine + @mantine/charts** and **Recharts Sankey**. This satisfies dashboard requirements (Funnel & Sankey), aligns with our theming model, and avoids React‑19 peer‑dependency friction.
