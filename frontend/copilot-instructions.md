# GitHub Copilot UI Instructions

# Existing Components First

Before creating any new UI component:

- Search the project for an existing component with similar functionality.
- Reuse it instead of recreating it.
- If extending a component, preserve its existing styling and API.
- Do not duplicate components with different visual styles.

Examples:

✓ Reuse existing Button
✓ Reuse existing Card
✓ Reuse existing Badge
✓ Reuse existing Table
✓ Reuse existing Input
✓ Reuse existing Modal

Do not create Button2, CustomCard, DashboardCardNew, etc., unless explicitly requested.

## Design System

This project already has a complete design system defined in `globals.css`.

Before generating any UI, always inspect `globals.css` and reuse its design tokens.

Do not introduce new design values unless explicitly requested.

---

# Typography

Only use the typography classes already defined in the project.

## Headings

Desktop Hero

text-h1-desktop

Mobile Hero

text-h1-mobile

Section Heading

text-h2-desktop

Card Heading

text-h3-desktop

## Body Text

Default paragraph

text-body-lg

Secondary text

text-body-sm

## Labels

Badges
Table Headers
Form Labels

text-label-caps

## Price

Always use

text-price-display

Never create custom font sizes like

text-5xl
text-4xl
text-xl
text-lg
text-sm

unless matching an existing component.

Never use

text-[18px]
text-[15px]
text-[22px]

---

# Font Family

Always use the global font.

Never change the font-family.

Do not import another font.

Never use

font-serif
font-mono

unless explicitly requested.

---

# Colors

Always use colors from the design system.

Preferred classes

bg-background
bg-surface
bg-surface-container
bg-surface-container-low
bg-surface-container-high
bg-primary
bg-primary-container
bg-secondary
bg-tertiary

Text

text-on-surface
text-on-surface-variant
text-primary
text-on-primary
text-outline

Borders

border-outline
border-outline-variant

Errors

text-error
bg-error-container

Never hardcode colors.

Never write

text-blue-500
bg-red-500
border-gray-300

Never use arbitrary hex colors.

---

# Border Radius

Only use

rounded-lg
rounded-xl
rounded-full

or CSS variables already defined.

Never invent

rounded-[6px]
rounded-[10px]
rounded-[20px]

---

# Shadows

Use existing shadows.

Prefer

data-card-shadow

Avoid creating new shadow utilities.

---

# Icons

Always use Material Symbols Outlined when the project uses icons.

Keep icon size consistent.

Default icon size:

24px

Use the existing icon styling.

---

# Layout

Containers should use the existing spacing variables.

Desktop

2rem horizontal padding

Mobile

1rem horizontal padding

Prefer

px-4

lg:px-8

when matching existing layouts.

---

# Spacing

Follow the spacing scale already used.

Small spacing

gap-1
gap-2

Medium spacing

gap-3
gap-4

Large spacing

gap-6
gap-8

Sections

gap-10
gap-12

Avoid arbitrary spacing.

Never generate

gap-[13px]
mt-[23px]
px-[27px]

unless it already exists.

---

# Components

Before generating a component:

Search for an existing implementation.

Reuse it whenever possible.

Never redesign an existing UI component.

This includes

Buttons

Cards

Tables

Dialogs

Sheets

Dropdowns

Forms

Navigation

Sidebar

Navbar

Statistics Cards

Dashboard Cards

---

# Forms

Inputs must visually match every other form.

Reuse

Input

Label

Error Message

Button

spacing

Do not create different form layouts.

---

# Buttons

Always reuse the project's existing button component.

Never manually recreate

hover colors

disabled styles

focus rings

padding

radius

font size

---

# Cards

Cards should always use

Surface colors

Rounded corners

Existing shadow

Consistent padding

Do not invent new card styles.

---

# Tables

All tables must follow the existing dashboard style.

Reuse

header typography

row height

hover state

border colors

padding

badge styling

---

# Responsive Design

Desktop-first components must also support mobile.

Reuse existing breakpoints.

Prefer

sm:

md:

lg:

xl:

Do not create custom media queries.

---

# Animations

Reuse existing animations.

Current project animation

animate-stats

Do not introduce new animation timing unless requested.

---

# Accessibility

Every interactive component must include

Keyboard navigation

Visible focus state

aria-label when necessary

disabled state

loading state

---

# Code Consistency

Before writing a new component:

1. Search for a similar component.
2. Match its spacing.
3. Match its typography.
4. Match its colors.
5. Match its border radius.
6. Match its padding.
7. Match its icon size.
8. Match its responsiveness.

Consistency is always preferred over creating a new style.

---

# When Unsure

If multiple examples exist:

Use the style that appears most frequently in the project.

Never introduce a new visual language.

The existing components and globals.css are the source of truth.

















# Feature-Based Folder Structure

This project follows a feature-based architecture.

Always place files inside their corresponding feature folder.

Example:

features/
└── auth/
    ├── api/
    ├── components/
    ├── hooks/
    ├── schemas/
    ├── services/
    ├── types/

Do not place feature-specific code outside its feature.

---

# Standard Feature Structure

Every feature should follow this structure when applicable.

features/
└── feature-name/
    ├── api/
    ├── components/
    ├── hooks/
    ├── schemas/
    ├── services/
    ├── types/

Create folders only when they are needed.

Do not create empty folders.

---

# Folder Responsibilities

## api/

Contains API request functions.

Examples

login.ts

register.ts

getUsers.ts

createCommodity.ts

No business logic.

No UI.

---

## services/

Contains business logic.

Examples

auth.service.ts

price.service.ts

dashboard.service.ts

Services may call API functions and transform data.

Do not perform HTTP requests directly inside components.

---

## hooks/

Contains custom React hooks.

Examples

useLogin.ts

useUsers.ts

useDashboard.ts

Hooks should manage state and side effects.

---

## schemas/

Contains validation schemas.

Examples

login.schema.ts

register.schema.ts

commodity.schema.ts

Use Zod for validation.

Do not place schemas inside components.

---

## types/

Contains feature-specific types and interfaces.

Examples

auth.types.ts

commodity.types.ts

dashboard.types.ts

Avoid duplicating shared types.

---

## components/

Contains reusable UI for the feature.

Examples

LoginForm.tsx

RegisterForm.tsx

UserCard.tsx

PriceTable.tsx

Components should focus only on presentation.

Avoid embedding API logic directly inside components.

---

# Shared Code

Only place code outside features if it is shared across multiple features.

Examples

components/
lib/
hooks/
types/
utils/

If code belongs to only one feature, keep it inside that feature.

---

# Import Rules

Prefer imports from within the same feature.

Avoid importing across unrelated features.

Shared logic should live in shared folders.

---

# Naming

Folders

lowercase

Example

auth

dashboard

users

commodities

Files

PascalCase for React components.

LoginForm.tsx

DashboardCard.tsx

camelCase or kebab-case for non-components, following the existing project convention.

Examples

login.schema.ts

auth.service.ts

useLogin.ts

---

# Component Responsibilities

Components should

Render UI

Receive props

Call hooks

Avoid

HTTP requests

Business logic

Data transformation

---

# API Layer

API functions should only

Send requests

Receive responses

Handle request configuration

Avoid UI logic.

---

# Service Layer

Services should

Transform API responses

Handle business rules

Map data

Coordinate feature workflows

---

# Hooks

Hooks should

Manage state

Manage loading

Manage errors

Call services

Expose clean data to components

---

# Consistency

Before creating a file

1. Search for an existing implementation.
2. Follow the same folder structure.
3. Match naming conventions.
4. Match code organization.
5. Reuse existing patterns instead of introducing new ones.

Never invent a new architecture if the project already has one.