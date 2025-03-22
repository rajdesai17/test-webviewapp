# React + Supabase + TailwindCSS Web App

A modern web application built with React, Supabase, and TailwindCSS that provides user authentication and profile management.

## Features

- User authentication (sign up, sign in, sign out)
- Profile management
- Responsive design with TailwindCSS
- Protected routes
- TypeScript support

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account and project

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Supabase project and get your project URL and anon key

4. Create a `.env` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Create the following table in your Supabase database:
   ```sql
   create table profiles (
     id uuid references auth.users on delete cascade,
     email text,
     full_name text,
     avatar_url text,
     updated_at timestamp with time zone,
     primary key (id)
   );
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Visit `http://localhost:5173` in your browser
2. Sign up for a new account
3. Sign in with your credentials
4. View and manage your profile in the dashboard

## Mobile App Setup

To convert this web app into a mobile app using React Native and Expo WebView:

1. Create a new Expo project:
   ```bash
   npx create-expo-app mobileapp
   cd mobileapp
   ```

2. Install required dependencies:
   ```bash
   npm install react-native-webview
   ```

3. Replace the contents of `App.js` with:
   ```javascript
   import { WebView } from 'react-native-webview';

   export default function App() {
     return (
       <WebView
         source={{ uri: 'YOUR_DEPLOYED_WEB_APP_URL' }}
         style={{ flex: 1 }}
       />
     );
   }
   ```

4. Start the Expo development server:
   ```bash
   npx expo start
   ```

## Deployment

1. Build the web app:
   ```bash
   npm run build
   ```

2. Deploy to Vercel:
   ```bash
   npm install -g vercel
   vercel
   ```

## License

MIT
