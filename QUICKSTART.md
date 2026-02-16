# Quick Start Guide - BEOC Digital Skills Portal

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies

```bash
cd beoc-portal
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

### Step 3: Open Browser

Navigate to [http://localhost:3000](http://localhost:3000)

That's it! You're running the BEOC Portal.

---

## 📝 Common Tasks

### Adding a New Word Module

**Example: Adding Word Module 2**

1. **Create content file** at `lib/content/word/module2.ts`:

```typescript
export const wordModule2 = {
  title: "Module 2: Advanced Formatting & Styles",
  description: "Master paragraph styles, themes, and advanced formatting options.",
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  practiceFiles: [
    {
      name: "Styles Practice Document.docx",
      url: "#download-styles-practice",
    },
  ],
  steps: [
    "Open Word and create a new document from a template.",
    "Apply different heading styles to organize your content.",
    // Add more steps...
  ],
  checklist: [
    "I can apply and modify paragraph styles.",
    "I understand how to use the Styles pane.",
    // Add more skills...
  ],
};
```

2. **Create module page** at `app/learning-paths/ms-office/word/module-2/page.tsx`:

```typescript
import ModuleTemplate from "@/components/ModuleTemplate";
import { wordModule2 } from "@/lib/content/word/module2";

export default function WordModule2Page() {
  return <ModuleTemplate {...wordModule2} />;
}
```

3. **Update Word overview page** at `app/learning-paths/ms-office/word/page.tsx`:

Change the Module 2 placeholder from "Coming Soon" to "Available" and make it a link:

```typescript
<Link href="/learning-paths/ms-office/word/module-2">
  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 card-hover">
    {/* Module 2 content */}
  </div>
</Link>
```

4. **Test it**: Navigate to the module in your browser

---

### Adding a Completely New Learning Path

**Example: Adding Cybersecurity Fundamentals**

1. **Create folder structure**:
```bash
mkdir -p app/learning-paths/cybersecurity/basics/module-1
```

2. **Create overview page** at `app/learning-paths/cybersecurity/page.tsx`:

```typescript
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export default function CybersecurityPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Cybersecurity Fundamentals
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Learn essential cybersecurity concepts and practices.
      </p>
      
      {/* Add course modules here */}
    </div>
  );
}
```

3. **Create content** at `lib/content/cybersecurity/module1.ts`:

```typescript
export const cyberModule1 = {
  title: "Module 1: Introduction to Cybersecurity",
  description: "Understand basic security concepts and threats.",
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
  practiceFiles: [],
  steps: [
    "Learn about common cyber threats.",
    // More steps...
  ],
  checklist: [
    "I understand basic security principles.",
    // More skills...
  ],
};
```

4. **Add to homepage** in `app/page.tsx`:

```typescript
<LearningCard
  title="Cybersecurity Fundamentals"
  description="Protect yourself and your organization from cyber threats."
  href="/learning-paths/cybersecurity"
  status="available"
  icon="🔐"
/>
```

5. **Add to navbar** in `components/Navbar.tsx`:

```typescript
<Link
  href="/learning-paths/cybersecurity"
  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors ${
    isActive("/learning-paths/cybersecurity")
      ? "bg-primary-100 text-primary-700"
      : "text-gray-700 hover:bg-gray-100"
  }`}
>
  Cybersecurity
</Link>
```

---

## 🎨 Customizing Styles

### Changing the Primary Color

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#f0f9ff',   // Lighter shades
    100: '#e0f2fe',
    // ... 
    600: '#0284c7',  // Main color - change this
    700: '#0369a1',  // Darker shades
    // ...
  }
}
```

### Adding a Custom Font

1. **Add font to layout** in `app/layout.tsx`:

```typescript
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: '--font-roboto',
});

// In the HTML:
<body className={`${roboto.variable} ...`}>
```

2. **Use in Tailwind** config:

```typescript
fontFamily: {
  sans: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
}
```

### Creating Custom Components

**Pattern to follow:**

```typescript
// components/MyComponent.tsx
interface MyComponentProps {
  title: string;
  description?: string;
}

export default function MyComponent({ 
  title, 
  description 
}: MyComponentProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
}
```

---

## 🐛 Debugging Tips

### Component Not Rendering?

1. Check the console for errors: `F12` in browser
2. Verify import paths are correct
3. Ensure TypeScript types match

### Styles Not Working?

1. Restart dev server: `Ctrl+C` then `npm run dev`
2. Check Tailwind class names are valid
3. Clear browser cache: `Ctrl+Shift+R`

### Module Content Not Showing?

1. Verify content file exports the module object
2. Check the import path in the page component
3. Ensure all required properties are present

---

## 📦 Building for Production

```bash
# Create optimized production build
npm run build

# Test production build locally
npm start

# Production will be at http://localhost:3000
```

---

## 🔧 Useful Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Update dependencies
npm update

# Check for security issues
npm audit
```

---

## 📚 File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `LearningCard.tsx`)
- **Pages**: `page.tsx` (Next.js convention)
- **Content**: `camelCase.ts` (e.g., `module1.ts`)
- **Folders**: `kebab-case` (e.g., `ms-office`, `word-module-1`)

---

## ✅ Checklist Before Committing

- [ ] Code compiles without errors: `npm run build`
- [ ] All pages load correctly
- [ ] Mobile responsive (test in browser DevTools)
- [ ] No console errors
- [ ] Content is accurate and complete
- [ ] Links work properly
- [ ] Images/videos load (if added)

---

## 🆘 Getting Help

**Common Issues:**

1. **Port 3000 already in use**: 
   - Kill the process or use a different port:
   - `npm run dev -- -p 3001`

2. **Module not found errors**:
   - Check import paths use `@/` for root imports
   - Verify file names and extensions

3. **Tailwind styles not applying**:
   - Restart dev server
   - Check `tailwind.config.ts` content paths

**Resources:**

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS Docs: https://tailwindcss.com/docs
- TypeScript Docs: https://www.typescriptlang.org/docs

---

## 🎯 Next Steps

1. **Add More Content**: Create modules 2-5 for Word
2. **Build Excel Course**: Follow same pattern as Word
3. **Add PowerPoint**: Similar structure
4. **Enhance UI**: Add animations, transitions
5. **Add Features**: Search, bookmarks, progress tracking

---

You're ready to build! Start with adding one module and expand from there. The architecture makes it easy to scale. 🚀
