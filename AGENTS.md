# Figma-to-React component contract

These requirements apply whenever a component is implemented or revised from a Figma design in this repository.

## Before component coding

- Load the applicable Figma design-to-code instructions.
- Call the Figma MCP tools `get_design_context`, `get_variable_defs`, and `get_screenshot` for the target node before editing component code.
- Treat the returned Figma context, variables, and screenshot as the source of truth.

## Naming

- Use the component name from the Figma `data-name` returned by `get_design_context`, not a token prefix.
- Convert the Figma name to PascalCase for the React component. Example: `Portfolio Hero` becomes `PortfolioHero`, even when its tokens begin with `portfolioHero/`.

## Tokens and modes

- Resolve Figma tokens with `getVariableByName` from `@src/design-tokens/figma-variables-resolver.js`.
- Always pass the component's `modes` object to `getVariableByName`.
- Token names are case-sensitive and are usually camelCase. Copy names exactly from Figma variable definitions.
- Do not replace Figma variables with invented literals when a matching variable exists.

## Component structure

- Maximize reuse of existing public components such as `Avatar`, `Badge`, and `MoneyValue`.
- Use semantic web elements and avoid unnecessary wrapper elements.
- Implement Figma slots as real React slots through `children` or named render props. Figma-only slot wrapper frames do not automatically require DOM wrappers.

## Mode cascade

- A component with slots must pass `modes` to every slot child with `cloneChildrenWithModes` from `src/utils/react-utils.ts`.
- Use `{cloneChildrenWithModes(children, modes)}` for `children` slots. The helper recursively injects modes and merges child-level overrides.
- Pass `modes` explicitly to every non-slot component child, for example `<Avatar modes={modes} />`.

## Exports

- Do not create per-component `index.ts` files.
- Add each public component to `src/components/index.ts` using this pattern:

```ts
export { default as ComponentName, type ComponentNameProps } from './ComponentName/ComponentName';
```

## API design

- Optimize the public props API for clear, ergonomic component consumption rather than mirroring incidental Figma frame structure.
- Prefer typed, composable props and accessible browser behavior.

## Stories

- Every story must accept Storybook args. Use `render: (args) => <Component {...args} />` so controls work for every story.
- The first named story export must be `Default` because generated documentation references `Stories.Default`.

## Final verification

- Run `yarn storybook-web`.
- Open Storybook in a browser, inspect the relevant stories and controls, and fix all runtime, visual, console, and interaction issues found.

