

# TCF Gym – Premium Red & Black Fitness Website

Inspired by the uploaded design reference, reimagined with a bold red (#DC2626) and black palette, Framer Motion animations, custom cursor effects, and smooth scroll interactions.

## New Dependency
- **framer-motion** – for scroll-triggered animations, page transitions, hover effects, and custom cursor

## Theme Setup
- Override CSS variables to a pure black background (`#0A0A0A`) with red accents (`#DC2626` / `#EF4444`)
- White and light gray text for contrast
- Red gradient highlights, glowing red accents on hover states
- Bold uppercase typography for headings

## Homepage Sections (Single Scrolling Page)

### 1. Custom Cursor Effect
- A glowing red dot cursor that follows the mouse with a trailing effect
- Cursor scales up on hovering interactive elements (buttons, cards, links)
- Hidden on mobile/touch devices

### 2. Sticky Navigation Bar
- Transparent on top, blurs to dark on scroll
- TCF Gym logo on left, nav links center (Home, About, Programs, Trainers, Pricing, Contact)
- "Join Now" red CTA button on right
- Mobile hamburger menu with slide-in drawer

### 3. Hero Section
- Full-viewport dark background with subtle gradient overlay
- Large bold headline with staggered text reveal animation (words animate in one by one)
- Subtext fades in after headline
- Two CTA buttons with red glow hover effects: "Get Started" and "Watch Video"
- Floating fitness stats badges that animate in from sides
- Subtle parallax background movement on scroll

### 4. About / Why TCF Section
- Split layout: left side has large image placeholder with red border accent, right side has text
- Animated counter stats (15K+ Members, 6 Branches, 50+ Trainers, 10+ Years)
- Numbers count up when scrolled into view
- Red accent line decorations

### 5. Programs / Classes Grid
- Section heading with red underline animation on scroll
- 6-8 program cards in a responsive grid (Strength, CrossFit, Zumba, Yoga, HIIT, Kickboxing, Cardio)
- Cards have dark background with image overlay, red gradient on hover
- Cards scale up slightly and reveal description on hover (Framer Motion)
- Each card shows: program name, short description, difficulty badge

### 6. Trainers Showcase
- Horizontal scrolling carousel or grid of trainer cards
- Cards with placeholder images, name, specialization, experience
- Red accent borders, hover lift animation
- "Top Trainer" badge with glow effect

### 7. Pricing Section
- 3 pricing tier cards (Monthly, Quarterly, Yearly) in a row
- Center card (recommended) is elevated with red glow border
- Features checklist with red checkmarks
- Hover: card lifts with shadow animation
- "Choose Plan" buttons with red fill animation on hover

### 8. Testimonials Section
- Dark cards with member quotes, star ratings in red
- Auto-scrolling carousel with pause on hover
- Quotation mark decorative elements in red

### 9. Branch Locations Preview
- Grid of branch cards with location name, address, key features
- "View All Branches" CTA linking to /branches page
- Cards animate in staggered on scroll

### 10. CTA / Contact Banner
- Full-width red gradient section
- Bold "Start Your Transformation Today" heading
- Email/phone input with "Book Free Trial" button
- Smooth fade-in animation

### 11. Footer
- Dark footer with TCF branding, quick links, social icons, contact info
- Red accent dividers
- "Back to top" smooth scroll button

## Animation & Interaction Details
- **Scroll-triggered reveals**: Every section fades/slides in when entering viewport using Framer Motion `useInView`
- **Smooth scrolling**: CSS `scroll-behavior: smooth` + Framer Motion scroll animations
- **Parallax layers**: Hero background moves at different speed than content
- **Staggered children**: Grid items animate in one after another with delay
- **Button hover effects**: Red glow, scale, and background fill transitions
- **Page load**: Subtle loading animation before hero reveals

## Additional Pages (Routes)
- `/branches` – Branch locator with embedded Google Map + branch cards
- `/programs` – Full programs listing with details
- `/trainers` – Trainer directory
- `/pricing` – Detailed pricing with FAQ accordion
- `/contact` – Contact forms, WhatsApp button, newsletter signup

These pages will be built after the homepage is complete, following the same red & black theme and animation style.

