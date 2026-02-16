# BEOC Digital Skills Portal

A scalable educational web platform built with Next.js 15 (App Router), TypeScript, and Tailwind CSS for the Brooklyn Educational Opportunity Center.

## 🎯 Project Overview

Version 1.0 - Static Content Phase

This platform serves as a structured, modular Microsoft Office 2019 learning portal designed to expand into cybersecurity, networking, and AI literacy training.

### Current Features

- **Microsoft Office 2019 Learning Path**
  - Word 2019 (Module 1 available, Modules 2-5 planned)
  - Excel 2019 (Coming Soon)
  - PowerPoint 2019 (Coming Soon)
- **Certification Preparation**
  - Microsoft Office Specialist (MOS) exam information
  - Study tips and resources
- **Responsive Design**
  - Mobile-first approach
  - Clean academic aesthetic
  - Professional and accessible

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Merriweather (display), System fonts (body)

## 📁 Project Structure

```
beoc-portal/
├── app/
│   ├── layout.tsx                    # Root layout with navbar & footer
│   ├── page.tsx                      # Homepage
│   ├── globals.css                   # Global styles & Tailwind directives
│   └── learning-paths/
│       ├── ms-office/
│       │   ├── page.tsx             # Office suite overview
│       │   ├── word/
│       │   │   ├── page.tsx         # Word modules list
│       │   │   └── module-1/
│       │   │       └── page.tsx     # Module 1 content
│       │   ├── excel/
│       │   │   └── page.tsx         # Excel placeholder
│       │   └── powerpoint/
│       │       └── page.tsx         # PowerPoint placeholder
│       └── certification/
│           └── page.tsx              # Certification prep
├── components/
│   ├── Navbar.tsx                    # Main navigation
│   ├── Footer.tsx                    # Site footer
│   ├── LearningCard.tsx              # Course card component
│   ├── ModuleTemplate.tsx            # Reusable module layout
│   └── SectionHeader.tsx             # Section heading component
├── lib/
│   └── content/
│       └── word/
│           └── module1.ts            # Word Module 1 content
└── public/                           # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd beoc-portal
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📚 Content Structure

### Adding New Modules

1. Create content file in `lib/content/[application]/moduleN.ts`:

```typescript
export const wordModule2 = {
  title: "Module Title",
  description: "Module description",
  videoUrl: "https://youtube.com/embed/...",
  practiceFiles: [
    { name: "File Name.docx", url: "#download-link" }
  ],
  steps: [
    "Step 1 instructions",
    "Step 2 instructions"
  ],
  checklist: [
    "Skill 1 description",
    "Skill 2 description"
  ]
};
```

2. Create page in `app/learning-paths/ms-office/[app]/module-N/page.tsx`:

```typescript
import ModuleTemplate from "@/components/ModuleTemplate";
import { wordModule2 } from "@/lib/content/word/module2";

export default function Module2Page() {
  return <ModuleTemplate {...wordModule2} />;
}
```

### Adding New Learning Paths

1. Create folder structure: `app/learning-paths/[new-path]/`
2. Add overview page: `page.tsx`
3. Add modules as subdirectories
4. Update navigation in `components/Navbar.tsx`
5. Add card on homepage in `app/page.tsx`

## 🎨 Design System

### Colors

- **Primary**: Blue (#2563eb, #3b82f6)
  - Used for: CTAs, active states, key UI elements
- **Accent**: Amber (#f59e0b, #fbbf24)
  - Used for: Coming soon badges, warnings
- **Success**: Green (#059669, #10b981)
  - Used for: Available status, completions
- **Gray Scale**: Tailwind's default gray palette
  - Used for: Text, backgrounds, borders

### Typography

- **Headings**: Merriweather (serif, bold)
- **Body**: System font stack (sans-serif)
- **Scale**: 
  - H1: 3xl-5xl (mobile-desktop)
  - H2: 2xl-3xl
  - H3: xl-2xl
  - Body: base

### Components

All components are built with:
- Responsive design (mobile-first)
- Hover states and transitions
- Proper semantic HTML
- Accessibility considerations

## 🔄 Scalability Plan

### Phase 2: User Features
- User authentication
- Progress tracking
- Bookmarking
- Notes and annotations

### Phase 3: Database Integration
- User profiles
- Completion certificates
- Quiz system
- Analytics dashboard

### Phase 4: Additional Content
- Cybersecurity fundamentals
- Networking basics
- AI literacy modules
- Industry-specific tracks

## 📝 Component Documentation

### ModuleTemplate

Reusable component for all learning modules.

**Props:**
- `title`: string - Module title
- `description`: string - Module overview
- `videoUrl`: string - YouTube embed URL
- `practiceFiles`: Array<{name: string, url: string}>
- `steps`: string[] - Guided practice steps
- `checklist`: string[] - Skills to master

### LearningCard

Card component for learning path selection.

**Props:**
- `title`: string - Course title
- `description`: string - Course description
- `href`: string - Link destination
- `status`: "available" | "coming-soon"
- `icon`: string - Emoji or icon

## 🧪 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow Next.js App Router conventions
- Use functional components with hooks
- Keep components focused and reusable

### File Naming
- Components: PascalCase (e.g., `ModuleTemplate.tsx`)
- Pages: lowercase with hyphens (e.g., `module-1/page.tsx`)
- Content: camelCase (e.g., `module1.ts`)

### Best Practices
- Mobile-first responsive design
- Semantic HTML elements
- Accessible components (ARIA labels, keyboard navigation)
- Performance optimization (lazy loading, code splitting)

## 📄 License

Copyright © 2026 Brooklyn Educational Opportunity Center

## 🤝 Support

For questions or support, please contact your BEOC program coordinator.

---

Built with ❤️ for BEOC learners
