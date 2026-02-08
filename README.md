# The Calcutta Fitness - Gym Website

A modern, responsive gym website built with React, TypeScript, and Tailwind CSS. Features a complete membership management system, branch locator, fitness tools, and an interactive booking system.

![The Calcutta Fitness](https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=400&fit=crop)

## ✨ Features

### 🏋️ Core Features
- **Membership Management**: Complete enrollment flow with multiple membership tiers (Monthly, Quarterly, Annual)
- **Member Dashboard**: Personal dashboard with membership status, payment history, and profile management
- **Book Free Visit**: Interactive booking system to schedule gym visits with branch and time slot selection
- **Branch Locator**: 6 branches across Kolkata with detailed information and facilities
- **Fitness Tools**: BMI Calculator, Calorie Calculator, and One Rep Max Calculator
- **Responsive Design**: Fully responsive across all devices

### 🎨 Design Highlights
- Modern dark theme with vibrant red accents
- Smooth animations using Framer Motion
- Glassmorphism effects and gradient backgrounds
- Premium UI components from shadcn/ui
- Interactive hover effects and micro-animations

### 📱 Pages
- **Home**: Hero section, programs, pricing, testimonials, and CTA
- **Locations**: Interactive branch finder with map placeholders
- **Branch Details**: Individual branch pages with facilities and trainers
- **Membership Plans**: Detailed pricing and plan comparison
- **Book Visit**: Schedule free gym visits with branch/time selection
- **Fitness Tools**: Interactive calculators for fitness metrics
- **Member Dashboard**: Protected member area with profile and billing
- **Authentication**: Login and signup pages

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd thecalcuttafitness-main
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **State Management**: React Context API
- **Icons**: Lucide React
- **Form Handling**: React Hook Form (ready to integrate)
- **Data Fetching**: TanStack Query (React Query)

## 📁 Project Structure

```
thecalcuttafitness-main/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── CTABanner.tsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Home page
│   │   ├── Membership.tsx
│   │   ├── BookVisit.tsx
│   │   ├── Locations.tsx
│   │   ├── dashboard/      # Dashboard pages
│   │   └── ...
│   ├── context/            # React Context providers
│   │   └── AuthContext.tsx
│   ├── data/               # Static data
│   │   ├── branches.ts
│   │   └── plans.ts
│   ├── lib/                # Utility functions
│   ├── App.tsx             # Main app component
│   ├── index.css           # Global styles
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── .gitignore
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

## 🎯 Key Features Explained

### Authentication System
- Client-side authentication using Context API
- Protected routes for member dashboard
- Session persistence with localStorage
- Login/Signup flow with validation

### Membership System
- Three tier plans: Monthly (₹1,999), Quarterly (₹5,399), Annual (₹17,699)
- Complete enrollment flow with branch selection
- Payment confirmation page
- Membership data saved to user profile

### Book Free Visit
- Select from 6 gym branches
- Choose date (next 7 days available)
- Time slot selection (6 AM - 11 PM)
- Confirmation screen with booking details

### Member Dashboard
- Membership status and expiry tracking
- Payment history with transaction details
- Profile management
- Quick actions for renewals

## 🎨 Customization

### Colors
The color scheme is defined in `tailwind.config.ts`. Key colors:
- Primary (Red): `hsl(0 84.2% 60.2%)`
- Background: `hsl(222.2 84% 4.9%)`
- Foreground: `hsl(210 40% 98%)`

### Branches
Update branch information in `src/data/branches.ts`

### Membership Plans
Modify plans in `src/data/plans.ts`

## 📝 Environment Variables

Currently, the app uses mock data and doesn't require environment variables. For production:

```env
# Add these when integrating with a backend
VITE_API_URL=your_api_url
VITE_GOOGLE_MAPS_API_KEY=your_maps_key
```

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Real payment gateway (Razorpay/Stripe)
- [ ] Email notifications
- [ ] WhatsApp integration for bookings
- [ ] Google Maps integration
- [ ] Workout tracking features
- [ ] Class scheduling system
- [ ] Trainer booking system
- [ ] Progress photos and measurements
- [ ] Social features and community

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For any inquiries, please contact:
- Phone: +91 98765 43210
- Email: info@thecalcuttafitness.com

---

**Built with ❤️ for fitness enthusiasts in Kolkata**
