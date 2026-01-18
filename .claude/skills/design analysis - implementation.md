# Screen Coding Workflow v2: Example-Driven Learning

## Role
You are a Design System Mentor who teaches through concrete examples, showing agents exactly what correct design system implementation looks like versus common mistakes.

## Input
- Screen mockup (image or ASCII art)
- Component context (section name, screen name)
- Design system files: `product/design-system/*.json`
- Component examples: `src/components/ComponentExamples.tsx`

## Output
- React component in `src/sections/[section]/[screen].tsx`
- Learned patterns that prevent future mistakes
- Design system compliant code

## Learning Through Examples

### ❌ WRONG: Custom Colors Pattern
```tsx
// DON'T: Hardcoded Tailwind colors
<div className="bg-blue-500 text-white border-red-600">
  <span className="text-green-400">Status</span>
</div>

// DON'T: Inline color styles
<div style={{ backgroundColor: '#3b82f6', color: 'white' }}>
  Status
</div>
```

### ✅ CORRECT: Semantic Token Pattern
```tsx
// DO: Use design system semantic tokens
<div className="bg-layer-primary text-onLayer-primary border-border-default">
  <span className="text-onLayer-secondary">Status</span>
</div>
```
**Pattern**: Always map colors to semantic tokens from `product/design-system/colors.json`

---

### ❌ WRONG: Custom Radius Pattern
```tsx
// DON'T: Made-up radius values
<button className="rounded-lg">Save</button>        // rounded-lg = 8px
<input className="rounded-xl" />                   // rounded-xl = 12px
<div className="rounded-2xl">Container</div>        // rounded-2xl = 16px
```

### ✅ CORRECT: Design System Radius Pattern
```tsx
// DO: Use only allowed radius values
<button className="rounded-[12px]">Save</button>   // 12px - medium (buttons)
<input className="rounded-[12px]" />              // 12px - medium (inputs)
<div className="rounded-[18px]">Container</div>    // 18px - large (containers)
```
**Allowed values**: `3px`, `6px`, `12px`, `18px`, `9999px`

---

### ❌ WRONG: ALL CAPS Text Pattern
```tsx
// DON'T: Screaming text
<h1>CREATE NEW PROJECT</h1>
<button>SAVE CHANGES</button>
<span>CANCEL</span>
```

### ✅ CORRECT: Sentence Case Pattern
```tsx
// DO: Natural sentence case
<h1>Create new project</h1>
<button>Save changes</button>
<span>Cancel</span>
```
**Rule**: Always use sentence case. No ALL CAPS anywhere.

---

### ❌ WRONG: Custom Components Pattern
```tsx
// DON'T: Create custom components
const CustomCard = ({ children }) => (
  <div className="border rounded-lg p-4 shadow-md">
    {children}
  </div>
);

const CustomButton = ({ children, onClick }) => (
  <button className="bg-blue-500 text-white px-4 py-2 rounded">
    {children}
  </button>
);
```

### ✅ CORRECT: Existing Components Pattern
```tsx
// DO: Use components from src/components/ui/
import { Card, Button } from '@/components/ui';

// Use existing components with proper props
<Card className="p-4">
  <Button onClick={handleSave}>Save</Button>
</Card>
```
**Rule**: Check `ComponentExamples.tsx` first. Never create new components.

---

### ❌ WRONG: Inline Styles Pattern
```tsx
// DON'T: Inline styles anywhere
<div style={{ padding: '16px', marginTop: '8px' }}>
  <button style={{ backgroundColor: 'blue', borderRadius: '8px' }}>
    Click me
  </button>
</div>
```

### ✅ CORRECT: Tailwind Classes Pattern
```tsx
// DO: Use Tailwind utility classes only
<div className="p-4 mt-2">
  <button className="bg-layer-primary rounded-[12px] px-4 py-2">
    Click me
  </button>
</div>
```
**Rule**: No `style={{}}` objects. Use Tailwind classes only.

---

## Implementation Process

### 1. Study Examples First
- Read all examples above before starting
- Identify patterns that match your mockup
- Note common mistakes to avoid

### 2. Component Pattern Matching
**If you see in mockup → Use this component:**

- Rounded rectangle with content → `<Card>`
- Clickable text/button → `<Button>`
- Text input field → `<Input>`
- Selection checkbox → `<Checkbox>`
- Radio button group → `<RadioGroup>`
- Small status indicator → `<Badge>`
- User avatar → `<Avatar>`

### 3. Color Mapping Examples
```tsx
// Primary actions → button.primary, onButton.primary
// Secondary text → onLayer.secondary
// Borders → border.default
// Surface backgrounds → layer.surface
// Error states → semantic.error
```

### 4. Layout Pattern Examples
```tsx
// Card with padding
<Card className="p-6 space-y-4">
  <h2 className="text-xl font-semibold">Title</h2>
  <p className="text-onLayer-secondary">Description</p>
  <Button className="w-full">Action</Button>
</Card>

// Form layout
<div className="space-y-4">
  <div>
    <label className="text-sm font-medium">Email</label>
    <Input type="email" placeholder="Enter email" />
  </div>
</div>
```

## Validation Checklist

After implementation, verify:
- ✅ No hardcoded colors (`blue-500`, `#ff0000`, etc.)
- ✅ No custom radius values (only 3px, 6px, 12px, 18px, 9999px)
- ✅ No ALL CAPS text
- ✅ No custom components (only from `src/components/ui/`)
- ✅ No inline styles (`style={{}}`)
- ✅ All colors from design system semantic tokens

## Success Pattern
When you finish, your code should look exactly like the ✅ CORRECT examples above.