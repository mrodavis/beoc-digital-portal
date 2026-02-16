# BEOC Portal - Architecture Documentation

## System Architecture

### Overview
The BEOC Digital Skills Portal is built as a static, content-driven educational platform using Next.js 15's App Router. The architecture prioritizes scalability, maintainability, and ease of content management.

## Core Design Principles

### 1. Component-Based Architecture
- **Reusable Components**: All UI elements are modular and reusable
- **Template Pattern**: ModuleTemplate component serves all learning modules
- **Composition**: Components compose together to build complex pages

### 2. Content Separation
- **Content as Data**: All course content lives in `/lib/content/` as TypeScript files
- **Type Safety**: TypeScript interfaces ensure content structure consistency
- **Easy Updates**: Content changes don't require component modifications

### 3. File-Based Routing
- **App Router**: Leverages Next.js 15 App Router for intuitive routing
- **Nested Layouts**: Shared layouts reduce code duplication
- **Dynamic Segments**: Ready for future dynamic routes

## Directory Structure Explained

### `/app` - Application Pages
```
app/
├── layout.tsx          # Root layout (navbar, footer, global styles)
├── page.tsx            # Homepage
├── globals.css         # Global CSS and Tailwind directives
└── learning-paths/     # All learning content
    ├── ms-office/      # Office suite section
    │   ├── page.tsx    # Office overview
    │   ├── word/       # Word application
    │   ├── excel/      # Excel application
    │   └── powerpoint/ # PowerPoint application
    └── certification/  # Certification prep
```

**Key Patterns:**
- Each `page.tsx` represents a route
- Nested folders create URL hierarchy
- Shared layouts cascade down the tree

### `/components` - Reusable UI Components

```
components/
├── Navbar.tsx          # Main navigation bar
├── Footer.tsx          # Site footer
├── LearningCard.tsx    # Course selection cards
├── ModuleTemplate.tsx  # Module content template
└── SectionHeader.tsx   # Consistent section headings
```

**Component Guidelines:**
- Keep components focused on single responsibility
- Use TypeScript interfaces for props
- Make components as generic as possible
- Include proper accessibility attributes

### `/lib/content` - Course Content

```
lib/content/
└── word/
    ├── module1.ts      # Word Module 1 content
    ├── module2.ts      # Word Module 2 content (future)
    └── ...
```

**Content Structure:**
```typescript
export const moduleN = {
  title: string,
  description: string,
  videoUrl: string,
  practiceFiles: Array<{name: string, url: string}>,
  steps: string[],
  checklist: string[]
}
```

## Component Deep Dive

### ModuleTemplate Component

**Purpose**: Provides consistent layout for all learning modules

**Features:**
- Video embed section
- Downloadable practice files
- Numbered guided practice steps
- Interactive skill checklist
- Navigation between modules

**Usage Pattern:**
```typescript
import ModuleTemplate from "@/components/ModuleTemplate";
import { wordModule1 } from "@/lib/content/word/module1";

export default function Module1Page() {
  return <ModuleTemplate {...wordModule1} />;
}
```

**Why This Works:**
- Ensures visual consistency across all modules
- Content creators only write content, not UI
- Easy to update all modules by modifying one template
- Type safety prevents content structure errors

### LearningCard Component

**Purpose**: Displays course/module options with status

**Status Types:**
- `available`: Green badge, clickable, full interaction
- `coming-soon`: Amber badge, non-clickable, disabled state

**Conditional Rendering:**
```typescript
{isAvailable ? (
  <Link href={href}><CardContent /></Link>
) : (
  <CardContent />
)}
```

## Styling System

### Tailwind CSS Strategy

**Utility-First Approach:**
- Most styling done with Tailwind utilities
- Custom utilities defined in `globals.css`
- Component-specific styles scoped to components

**Custom Utilities:**
```css
.card-hover {
  @apply transition-all duration-300 hover:shadow-xl hover:-translate-y-1;
}

.btn-primary {
  @apply bg-primary-600 text-white px-6 py-3 rounded-lg 
         font-medium hover:bg-primary-700 transition-colors;
}
```

**Color System:**
- Primary: Blue palette (brand color)
- Accent: Amber (highlights, CTAs)
- Semantic: Green (success), Red (errors), Gray (neutrals)

### Responsive Design

**Breakpoints:**
- Mobile: Default (< 640px)
- Tablet: `md:` (>= 768px)
- Desktop: `lg:` (>= 1024px)
- Wide: `xl:` (>= 1280px)

**Pattern:**
```tsx
className="text-4xl md:text-5xl"  // Smaller on mobile, larger on desktop
className="grid md:grid-cols-2"   // Stack on mobile, 2 cols on tablet+
```

## Navigation System

### Navbar Component

**Features:**
- Active route highlighting
- Responsive menu (abbreviated labels on mobile)
- Sticky positioning
- Smooth transitions

**Active State Logic:**
```typescript
const isActive = (path: string) => pathname.startsWith(path);
```

**Why `startsWith`:**
- Highlights parent route when viewing child pages
- Example: Both `/learning-paths/ms-office` and 
  `/learning-paths/ms-office/word` highlight "Microsoft Office"

## Future Scalability

### Phase 2: Adding New Content

**To Add a New Module:**

1. Create content file:
```typescript
// lib/content/word/module2.ts
export const wordModule2 = {
  title: "Advanced Formatting",
  description: "...",
  videoUrl: "...",
  practiceFiles: [...],
  steps: [...],
  checklist: [...]
};
```

2. Create page:
```typescript
// app/learning-paths/ms-office/word/module-2/page.tsx
import ModuleTemplate from "@/components/ModuleTemplate";
import { wordModule2 } from "@/lib/content/word/module2";

export default function Module2Page() {
  return <ModuleTemplate {...wordModule2} />;
}
```

3. Update parent page to link to new module

**To Add a New Application (e.g., Access):**

1. Create folder: `app/learning-paths/ms-office/access/`
2. Add overview page: `page.tsx`
3. Add modules: `module-1/page.tsx`, etc.
4. Update Office overview page with new card
5. Create content files in `lib/content/access/`

**To Add a New Learning Path (e.g., Cybersecurity):**

1. Create: `app/learning-paths/cybersecurity/`
2. Add structure similar to `ms-office`
3. Update homepage with new LearningCard
4. Add to Navbar navigation
5. Create content library in `lib/content/cybersecurity/`

### Phase 3: Database Integration

**When Adding Database:**

1. Content stays in `/lib/content` as seed data
2. Add database layer in `/lib/db`
3. Create API routes in `/app/api`
4. Update components to fetch from API
5. Add loading states and error handling

**Recommended Structure:**
```
lib/
├── content/      # Static content (seed data)
├── db/           # Database client & schema
└── api/          # API helper functions

app/
└── api/          # API routes
    ├── modules/
    ├── progress/
    └── users/
```

### Phase 4: Authentication

**Integration Points:**

1. Wrap app in auth provider (layout.tsx)
2. Protect routes with middleware
3. Add user profile pages
4. Track progress per user
5. Persist state in database

## Performance Optimization

### Current Optimizations

1. **Static Generation**: All pages are statically generated
2. **Font Optimization**: Using Next.js font optimization
3. **Image Optimization**: Ready for Next.js Image component
4. **Code Splitting**: Automatic with App Router

### Future Optimizations

1. **Lazy Loading**: Load video embeds on scroll
2. **Caching**: Cache API responses
3. **CDN**: Serve static assets from CDN
4. **Bundle Analysis**: Monitor and optimize bundle size

## Accessibility

### Current Features

1. **Semantic HTML**: Proper heading hierarchy
2. **Color Contrast**: WCAG AA compliant
3. **Keyboard Navigation**: All interactive elements accessible
4. **Focus States**: Visible focus indicators
5. **Screen Reader**: Descriptive labels and ARIA attributes

### Best Practices

```tsx
// Good: Semantic button
<button onClick={handleClick}>Click me</button>

// Bad: Generic div
<div onClick={handleClick}>Click me</div>

// Good: Descriptive link
<Link href="/word">Start Word 2019 Course</Link>

// Bad: Vague link
<Link href="/word">Click here</Link>
```

## Testing Strategy (Future)

### Unit Tests
- Component rendering
- Prop handling
- Conditional logic

### Integration Tests
- Navigation flows
- Form submissions
- API interactions

### E2E Tests
- Complete user journeys
- Module completion flows
- Cross-browser compatibility

## Deployment

### Build Process

```bash
npm run build    # Creates production build
npm start        # Serves production build
```

### Deployment Platforms

**Recommended: Vercel**
- Native Next.js support
- Automatic deployments
- Edge network
- Analytics

**Alternative: Netlify, AWS Amplify**
- Both support Next.js
- Similar feature sets
- Different pricing models

### Environment Variables

```
# .env.local (not committed)
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgres://...
```

## Maintenance

### Regular Tasks

1. **Content Updates**: Edit files in `/lib/content`
2. **Dependency Updates**: `npm update`
3. **Security Patches**: Monitor npm audit
4. **Performance Monitoring**: Check Core Web Vitals

### Version Control

**Branch Strategy:**
- `main`: Production code
- `develop`: Integration branch
- `feature/*`: Feature branches
- `content/*`: Content-only updates

**Commit Messages:**
```
feat: Add Excel Module 1
fix: Correct navigation active state
content: Update Word Module 1 checklist
style: Improve mobile responsiveness
docs: Update README with deployment info
```

## Troubleshooting

### Common Issues

**Issue: Styles not applying**
- Solution: Run `npm run build` to regenerate Tailwind
- Check class names are valid Tailwind utilities

**Issue: Module not displaying**
- Solution: Verify content file exports match interface
- Check import path in page component

**Issue: Navigation not working**
- Solution: Ensure `href` paths match folder structure
- Verify `Link` component is imported from `next/link`

## Conclusion

This architecture provides:
- ✅ Easy content management
- ✅ Consistent user experience
- ✅ Scalable structure
- ✅ Type-safe development
- ✅ Future-proof design

The modular approach ensures new content and features can be added without major refactoring while maintaining code quality and user experience.
