# Zen Pomodoro - Modern Productivity Timer

A full-featured Pomodoro timer application built with Next.js 16, TypeScript, Firebase, and modern UI/UX design.

## Features

### 🍅 Core Timer Features
- **Customizable Timer**: Adjustable work, short break, and long break durations
- **Session Management**: Track work sessions with configurable break intervals
- **Visual Progress**: Beautiful circular progress indicators with gradient design
- **Sound Notifications**: Multiple notification sounds with volume control
- **Keyboard Shortcuts**: Space to start/pause, R to reset, S to skip
- **Minimize Mode**: Keep timer running in background while working

### 📋 Task Management
- **Project Organization**: Group tasks into projects with color coding
- **Subtask Support**: Create nested tasks up to 2 levels deep
- **Priority Levels**: Low, Medium, High, and Urgent priorities
- **Time Tracking**: Automatic time tracking from Pomodoro sessions
- **Task Statistics**: Progress tracking and completion analytics
- **Drag & Drop**: Reorder tasks and projects easily

### 🔐 Authentication System
- **Multiple Providers**: Email/password + OAuth (Google, GitHub, Apple, Microsoft)
- **Secure Implementation**: Firebase Authentication with proper security rules
- **Profile Management**: User profiles with avatars and statistics
- **Session Persistence**: Automatic login state management

### 🌍 Social Features
- **Friend System**: Send and receive friend requests
- **Leaderboards**: Competitive rankings by focus time, sessions, and streaks
- **Activity Feed**: Real-time updates from friends and community
- **Achievement System**: Unlock badges for productivity milestones
- **User Profiles**: Public profiles with stats and achievements

### 🎨 Modern UI/UX
- **Gradient Design**: Beautiful Linear.app-inspired gradient theme
- **Dark Mode**: Full dark/light mode support
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Sidebar Navigation**: Professional navigation with all features accessible
- **Micro-interactions**: Smooth animations and transitions

## 🛠 Technology Stack

### Frontend
- **Next.js 16**: App Router with server components
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS v4**: Modern utility-first CSS framework
- **React Hook Form**: Form management with validation
- **Zod**: Schema validation and type safety
- **Lucide React**: Beautiful icon library

### Backend & Services
- **Firebase Authentication**: Multi-provider auth system
- **Cloud Firestore**: NoSQL database for data persistence
- **Firebase Storage**: File storage for avatars and media
- **Cloud Functions**: Serverless functions for complex operations

### Development Tools
- **ESLint**: Code quality and consistency
- **TypeScript**: Static type checking
- **Turbopack**: Fast build tool from Next.js

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn package manager
- Firebase project (for production deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zen-pomodoro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication with Email/Password and OAuth providers
   - Set up Firestore database
   - Configure Firebase Storage
   - Copy configuration to `.env.local`:
     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
zen-pomodoro/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── auth/             # Authentication pages
│   │   ├── dashboard/          # Main dashboard
│   │   ├── timer/              # Timer page
│   │   ├── tasks/              # Task management
│   │   ├── community/          # Social features
│   │   ├── leaderboard/        # Rankings
│   │   ├── profile/            # User profiles
│   │   └── settings/           # App settings
│   ├── components/              # Reusable components
│   │   ├── auth/              # Authentication components
│   │   ├── layout/            # Layout components
│   │   ├── timer/             # Timer components
│   │   ├── tasks/              # Task management components
│   │   ├── social/             # Social features
│   │   ├── ui/                # Base UI components
│   │   └── dashboard/          # Dashboard specific components
│   ├── context/                # React contexts
│   │   ├── AuthContext.tsx     # Authentication state
│   │   └── TimerContext.tsx    # Timer state
│   ├── hooks/                  # Custom React hooks
│   │   ├── useTimer.ts         # Timer logic
│   │   ├── useTasks.ts         # Task management
│   │   └── useSocial.ts         # Social features
│   ├── lib/                    # Utility functions
│   │   ├── firebase.ts          # Firebase configuration
│   │   ├── auth.ts             # Auth utilities
│   │   ├── timerUtils.ts       # Timer helpers
│   │   └── utils.ts            # General utilities
│   └── types/                  # TypeScript type definitions
├── public/
│   └── sounds/               # Audio notification files
├── firestore.rules             # Database security rules
├── storage.rules               # File storage rules
└── package.json              # Dependencies and scripts
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Firebase Configuration

### Firestore Security Rules
- User-based access control
- Friend relationship validation
- Group membership verification
- Public profile access controls

### Storage Security Rules
- User-specific avatar folders
- Public read access for profile images
- Authenticated write access

## 📱 Features in Detail

### Timer System
- **Session Types**: Work (25m), Short Break (5m), Long Break (15m)
- **Custom Durations**: User-configurable session lengths
- **Auto-start**: Optional automatic session progression
- **Persistent State**: Timer state survives page refreshes
- **Browser Notifications**: Native desktop notifications

### Task Management
- **CRUD Operations**: Create, Read, Update, Delete tasks/projects
- **Hierarchical Structure**: Projects → Tasks → Subtasks
- **Progress Tracking**: Visual progress indicators and statistics
- **Timer Integration**: Assign tasks to active Pomodoro sessions

### Social Features
- **Real-time Updates**: Live friend status and activity
- **Competitive Elements**: Global and friends-only leaderboards
- **Achievement System**: Unlock badges for various accomplishments
- **Privacy Controls**: Granular privacy settings for profiles

## 🚀 Deployment

### Development
- Runs locally on `http://localhost:3000`
- Hot module replacement for fast development
- TypeScript error checking in real-time

### Production
- Optimized build with Turbopack
- Static site generation for fast loading
- Firebase hosting recommended
- Vercel deployment support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing-feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the excellent framework
- [Firebase](https://firebase.google.com/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for beautiful icons
- The open-source community for inspiration and contributions