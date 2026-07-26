# D2C Component Build

A React + TypeScript component library workspace for implementing approved Figma components and reviewing them in Storybook.

## Start locally

Use Node 22, then install and start the component workshop:

```bash
corepack enable
yarn install
yarn storybook-web
```

Storybook runs at [http://localhost:6006](http://localhost:6006).

## Useful commands

```bash
yarn storybook-web   # Interactive component development
yarn build-storybook # Static, shareable Storybook build
yarn typecheck       # TypeScript validation
yarn build           # ES/CJS library bundles and declarations
yarn check           # Full local verification
```

## Implementing a Figma component

Provide the exact Figma component or variant-set URL. Before changing component code, the agent will collect its design context, variable definitions, and screenshot, then follow the persistent rules in `AGENTS.md`.

Public components use this structure:

```text
src/components/ComponentName/
  ComponentName.tsx
  ComponentName.stories.tsx
  ComponentName.css
```

There is no per-component `index.ts`. Public exports belong in `src/components/index.ts`.

The Variable Visualizer export lives at `src/design-tokens/Zgredek playground-variables-full.json`, next to its supplied resolver. Components resolve exact token names through `getVariableByName(name, modes)`.

## Card

`Card` is exported from the package root and accepts `title`, `body`, `headingAs`, `modes`, and a real `children` slot. Import the library stylesheet alongside the component bundle:

```tsx
import { Card } from 'd2c-component-build';
import 'd2c-component-build/styles.css';

<Card
  title="Discount development"
  body="The deepest discounts land on May and August, besides Black Friday Deals."
  modes={{ 'Card / Output': 'Default' }}
/>
```

The supplied Figma variables resolve the Card font family to `Averta CY`. The commercial font files are not included in this repository; Storybook uses `Avenir Next` and then Arial as local fallbacks until licensed Averta CY webfont assets are provided.

## Share Storybook on GitHub Pages

The workflow in `.github/workflows/storybook-pages.yml` builds and publishes Storybook whenever `main` is pushed.

1. Create or connect a GitHub repository and push this project to `main`.
2. In the repository settings, open **Pages** and select **GitHub Actions** as the source if it is not selected already.
3. After the **Publish Storybook** action succeeds, GitHub displays the public Pages URL in the deployment summary.

For a repository named `my-components`, the URL is normally `https://YOUR-USER.github.io/my-components/`.
