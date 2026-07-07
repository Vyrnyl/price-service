# GitHub Copilot Instructions

## General Principles

- Follow the existing project architecture and coding patterns before introducing new ones.
- Prioritize consistency over creativity.
- Reuse existing implementations whenever possible.
- Before creating a new component, hook, service, or utility, search the project for a similar implementation.
- Do not duplicate functionality that already exists.

---

# Design System

`globals.css` is the single source of truth for the application's design system.

Always reuse existing:

- Typography
- Colors
- Spacing
- Border radius
- Shadows
- Animations
- Font family

Do not introduce new design values unless explicitly requested.

Never hardcode:

- Colors
- Font sizes
- Border radius
- Spacing
- Shadows

Avoid arbitrary Tailwind classes such as:

```tsx
text-[17px]
p-[13px]
rounded-[10px]
bg-[#004ac6]
```

Reuse existing utilities and theme tokens instead.

---

# Typography

Always use the typography utilities already defined in `globals.css`.

Examples:

- `text-h1-desktop`
- `text-h1-mobile`
- `text-h2-desktop`
- `text-h3-desktop`
- `text-body-lg`
- `text-body-sm`
- `text-label-caps`
- `text-price-display`

Do not introduce custom typography scales.

---

# Colors

Always use the project's theme colors.

Examples:

- `bg-background`
- `bg-surface`
- `bg-primary`
- `text-primary`
- `text-on-surface`
- `text-on-surface-variant`
- `border-outline`
- `border-outline-variant`

Never use Tailwind color palettes or hardcoded hex values unless requested.

---

# Spacing

Reuse the spacing scale already used throughout the project.

Avoid arbitrary spacing values.

Maintain consistent:

- padding
- margin
- gap
- section spacing

---

# Components

Always reuse existing UI components before creating new ones.

Examples:

- Button
- Card
- Input
- Modal
- Dialog
- Badge
- Table
- Dropdown
- Sheet

Do not recreate an existing component with a different design.

---

# Component Organization

Components should be:

- Small
- Focused
- Easy to understand
- Easy to test
- Easy to reuse

Avoid creating large files containing hundreds of lines of JSX.

Split complex components into smaller components.

Example:

```
DashboardPage
├── DashboardHeader
├── StatisticsSection
│   ├── StatisticCard
│   └── StatisticGrid
├── CommodityTable
├── RecentActivity
└── Pagination
```

Each component should have a single responsibility.

---

# Component Responsibilities

UI components should only:

- Render UI
- Receive props
- Handle UI interactions

Avoid putting inside components:

- API requests
- Business logic
- Data transformation
- Validation logic

Move those responsibilities to hooks or services.

---

# Feature-Based Architecture

Every feature should remain self-contained.

Example:

```
features/
└── auth/
    ├── api/
    ├── components/
    ├── hooks/
    ├── schemas/
    ├── services/
    ├── types/
```

Only create folders that are actually needed.

---

# Folder Responsibilities

## api/

Contains HTTP requests only.

Examples:

- login.ts
- register.ts
- getUsers.ts

No UI logic.

No business logic.

---

## services/

Contains business logic.

Examples:

- auth.service.ts
- commodity.service.ts

Responsibilities:

- Transform API responses
- Business rules
- Feature workflows

---

## hooks/

Contains reusable React hooks.

Examples:

- useLogin.ts
- useUsers.ts
- useDashboard.ts

Responsibilities:

- State management
- Loading state
- Error handling
- Calling services

---

## schemas/

Contains validation schemas.

Prefer Zod.

Examples:

- login.schema.ts
- register.schema.ts

---

## types/

Contains feature-specific TypeScript types.

Examples:

- auth.types.ts
- commodity.types.ts

---

## components/

Contains reusable UI components for that feature.

Examples:

- LoginForm.tsx
- UserCard.tsx
- CommodityTable.tsx

---

# Shared Code

Only place code outside `features` if it is shared by multiple features.

Examples:

```
components/
hooks/
lib/
utils/
types/
constants/
```

Feature-specific code should remain inside its feature folder.

---

# Naming Conventions

Folders:

- lowercase

Examples:

```
auth
dashboard
commodities
users
```

React components:

- PascalCase

Examples:

```
LoginForm.tsx
DashboardCard.tsx
```

Hooks:

```
useLogin.ts
useDashboard.ts
```

Schemas:

```
login.schema.ts
commodity.schema.ts
```

Services:

```
auth.service.ts
dashboard.service.ts
```

Types:

```
auth.types.ts
dashboard.types.ts
```

---

# Imports

Prefer importing from the same feature.

Avoid unnecessary cross-feature dependencies.

Extract truly shared code into shared directories.

---

# Responsive Design

Follow the project's existing responsive patterns.

Prefer existing breakpoints:

- sm
- md
- lg
- xl

Do not introduce custom media queries unless necessary.

---

# Accessibility

Interactive components should support:

- Keyboard navigation
- Focus states
- Disabled states
- Loading states
- Appropriate `aria-*` attributes

---

# Consistency Checklist

Before generating code:

- Search for similar implementations.
- Match existing folder structure.
- Match naming conventions.
- Match typography.
- Match spacing.
- Match colors.
- Match border radius.
- Match responsiveness.
- Reuse components whenever possible.
- Keep components small and maintainable.
- Keep business logic outside UI components.
- Follow the project's architecture instead of creating new patterns.

When unsure, always follow the style that is already used most frequently in the project.