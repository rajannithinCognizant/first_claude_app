# Coding Standards

## Angular

- Use **standalone components** — no NgModules.
- Use **signals** (`signal`, `computed`, `effect`) for reactive state; avoid `BehaviorSubject` for simple component state.
- Prefer **Angular 17+ control flow** (`@if`, `@for`, `@switch`) over structural directives (`*ngIf`, `*ngFor`).
- Use `OnPush` change detection where possible; when using signals, rely on signal-based reactivity instead of manual `markForCheck`.
- Keep components **small and focused** — extract sub-components when a template exceeds ~100 lines.
- Name files consistently: `feature-name.component.ts`, `feature-name.service.ts`, `feature-name.model.ts`.
- Place interfaces/types in the same file as the component unless shared across multiple features; in that case, extract to a `*.model.ts` file.
- Use **`inject()`** for dependency injection in standalone components instead of constructor injection where practical.
- Do not use deprecated lifecycle hooks (`ngDoCheck` for side effects, etc.). Prefer `afterRender` / `afterNextRender` for DOM work.
- Avoid `::ng-deep` except for overriding third-party (PrimeNG) styles that cannot be customized through component APIs.

### PrimeNG

- Project uses **PrimeNG v20** (pinned) with `@primeng/themes` Aura preset — do not upgrade to v21 (incompatible with Angular 20).
- Always provide PrimeNG via `providePrimeNG()` and `provideAnimationsAsync()` in `app.config.ts`.
- Prefer PrimeNG component APIs over DOM manipulation.

## TypeScript / JavaScript

- Use **strict TypeScript** — no `any` unless unavoidable (e.g., PrimeNG event types); add a comment explaining why if used.
- Prefer `const` over `let`; never use `var`.
- Use **explicit return types** on public methods and functions.
- Prefer **named interfaces** over inline object types for anything used more than once.
- Avoid magic numbers/strings — extract to named constants.
- Use **optional chaining** (`?.`) and **nullish coalescing** (`??`) instead of verbose null checks.
- Write **pure functions** where possible; side effects should be isolated and explicit.
- No `console.log` left in committed code — use proper logging or remove debug statements.

## CSS

- Component styles go in the component's `.css` file (not global `styles.css`) unless truly global.
- Use Bootstrap utility classes (`d-flex`, `gap-*`, `mb-*`, etc.) for layout; avoid duplicating Bootstrap spacing/flex in custom CSS.
- Use CSS custom properties (variables) for repeated color values within a component.
- Avoid inline styles in templates; use CSS classes.

## General

- No commented-out code blocks in commits.
- Keep mock/stub data in the component file for now (no separate mock service needed until data grows beyond a single screen).
- Commits on `feature/*` branches; merge to `main` via PR.
