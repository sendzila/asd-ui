# @sendzila/ui

The design system for **data-dense developer tools** — dense tables, mono data
idioms, status systems, hairline aesthetics. Built for and battle-tested by
the [Sendzila](https://sendzila.com) dashboard; usable by anyone.

```bash
npm install @sendzila/ui
```

## What makes it different

- **Doctrine, not just components.** The kit ships written discipline: the
  four-state rule (every data surface renders exactly one of skeleton → error
  → empty → data), layout-true skeletons that shift nothing when data lands,
  recoverable-in-place errors, first-run empty states that teach.
- **Token-contract theming.** Components consume token *names*
  (`--color-brand`, `--color-edge`, `--radius-control`…); redefine the values
  and the whole system reskins. A neutral default theme ships in the box
  (`@sendzila/ui/default-theme.css`).
- **No locked strings.** Every user-facing string is a prop — localize in any
  framework, any language.
- **A11y as a floor, not a feature.** WCAG 2.2 AA: real tablist/radiogroup
  semantics, keyboard paths for everything, `prefers-reduced-motion`
  respected.

## Use

```tsx
import { Button, Tabs, TableSkeleton, ErrorState } from "@sendzila/ui";
import "@sendzila/ui/default-theme.css"; // or your own token values
import "@sendzila/ui/ui.css";
```

Tailwind v4 consumers: add `@source` for the package so utilities compile:

```css
@source "../node_modules/@sendzila/ui/src";
```

## Component workshop

```bash
npx ladle serve   # in the package — every component has a story
```

## Contributing

This repository is the source of truth — issues and pull requests land here
directly. The Sendzila dashboard consumes released versions like any other
user (the best kind of dogfooding).

## License

MIT — see [LICENSE](LICENSE).
