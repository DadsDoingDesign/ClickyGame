# ClickyGame Authentication Plan

## Overview
This document outlines the implementation plan for adding user authentication to ClickyGame, allowing users to log in with Google or email/password, save their game progress, and continue from where they left off.

## Authentication Methods

### 1. Google OAuth Login
- Implement "Login with Google" button for quick and secure authentication
- Retrieve user profile information (name, email, profile picture) from Google
- Create or update user record in Supabase upon successful Google authentication

### 2. Email/Password Authentication
- Provide traditional email and password registration form
- Implement email verification (optional)
- Include password reset functionality
- Ensure secure password storage using Supabase's built-in security

## Implementation Steps

### 1. Supabase Configuration
- Set up Google OAuth provider in Supabase dashboard
  - Create Google OAuth credentials in Google Cloud Console
  - Configure redirect URLs and allowed domains
  - Add Google client ID and secret to Supabase
- Configure email/password authentication settings
  - Set up email templates for verification/password reset
  - Define password strength requirements

### 2. Frontend Components

#### Authentication Modal
- Create a modal component with tabs for:
  - Login (Google button + email/password form)
  - Registration (Google button + email/password form)
  - Password reset (email input form)
- Design responsive UI that matches the game's aesthetic
- Implement form validation for all input fields

#### User Profile Section
- Add user avatar and name display in the header
- Create dropdown menu with options:
  - View profile
  - Settings
  - Logout

#### Authentication State Management
- Use React Context to manage authentication state
- Store user session in local storage for persistence
- Implement loading states during authentication processes

### 3. Backend Integration

#### User Table Schema
```sql
CREATE TABLE users (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Game Progress Table Schema
```sql
CREATE TABLE game_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  theme TEXT DEFAULT 'default',
  unlocked_features JSONB DEFAULT '{}',
  last_played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Row Level Security Policies
- Set up RLS policies to ensure users can only access their own data
- Create public profiles for leaderboard visibility

### 4. Authentication Flow

#### Registration Process
1. User clicks "Sign Up" or "Login with Google"
2. For email/password:
   - User completes registration form
   - System validates input and creates account
   - Optional email verification
3. For Google:
   - User authorizes the application
   - System receives Google profile data
   - Create/update user record
4. Create initial game progress record for new user

#### Login Process
1. User enters credentials or clicks "Login with Google"
2. System authenticates and creates session
3. Retrieve user's game progress
4. Update UI to reflect authenticated state and game progress

#### Logout Process
1. User clicks "Logout"
2. Save current game progress to database
3. Clear session data and local storage
4. Return to unauthenticated state

### 5. Game State Management

#### Saving Game Progress
- Save game state (score, theme, unlocked features) to database when:
  - User logs out
  - User closes the browser/tab
  - Periodically during gameplay (every 30 seconds)

#### Loading Game Progress
- Load saved game state when user logs in
- Provide visual feedback during loading process
- Handle conflicts if local state differs from saved state

## UI/UX Considerations

### Authentication Modal Design
- Clean, minimal design consistent with game aesthetic
- Clear error messages for authentication failures
- Success notifications for completed actions
- Loading indicators during authentication processes

### User Feedback
- Toast notifications for login/logout events
- Visual indicators for authenticated state
- Confirmation dialogs for important actions (e.g., logout when progress might be lost)

## Security Considerations
- Implement CSRF protection
- Use HTTPS for all API requests
- Store tokens securely
- Apply proper validation for all user inputs
- Follow OAuth best practices for Google authentication

## Testing Plan
- Unit tests for authentication components
- Integration tests for authentication flows
- End-to-end tests for complete user journeys
- Security testing for authentication endpoints

## Future Enhancements
- Add additional OAuth providers (GitHub, Twitter, etc.)
- Implement two-factor authentication
- Add account linking (connect multiple auth methods to one account)
- Develop account settings page for profile management
