# IEEE Leaderboard

A real-time leaderboard application for IEEE quiz events, displaying participant rankings, scores, and progress in real-time.

## 📋 Overview

The IEEE Leaderboard is a modern web application designed to display live leaderboard data for quiz competitions. It provides an engaging interface with real-time updates, contestant search functionality, department filtering, and a visual podium display for the top performers.

**Key Features:**

- 🏆 Real-time leaderboard updates from Google Sheets
- 🔍 Search participants by name
- 🏢 Filter by department
- 🎖️ Podium display for top 3 participants
- 📊 Score tracking and percentage calculations
- 📱 Responsive design with Tailwind CSS
- ⚡ Fast performance with Vite build tool
- 🔐 Secure backend with Supabase
- 📑 Google Sheets integration with automatic sync
- 🔄 Real-time data synchronization via Google Apps Script

## 🏗️ Project Architecture

### Tech Stack

**Frontend:**

- **React 18.3** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

**Backend:**

- **Supabase** - PostgreSQL database + serverless functions
- **Deno** - Runtime for serverless functions
- **Google Apps Script** - Real-time sync from Google Sheets

**Data Source:**

- **Google Sheets** - Live data management
- **Google Cloud** - Service account for authentication

**Development:**

- **ESLint** - Code quality
- **PostCSS** - CSS processing
- **TypeScript** - Type checking

### Project Structure

```
IEEE Leaderboard/
├── src/
│   ├── components/
│   │   ├── Header.tsx           # App header component
│   │   ├── Podium.tsx           # Top 3 podium display
│   │   ├── LeaderboardRow.tsx   # Individual row component
│   │   ├── SearchBar.tsx        # Search functionality
│   │   ├── ProgressBar.tsx      # Score progress display
│   │   └── LoadingSkeleton.tsx  # Loading state
│   ├── lib/
│   │   └── googleSheets.ts      # Leaderboard data service
│   ├── App.tsx                  # Main application
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── supabase/
│   ├── functions/
│   │   └── get-leaderboard/     # Serverless function
│   │       └── index.ts         # Function implementation
│   └── migrations/
│       └── 20251025112839_create_leaderboard_tables.sql  # Database schema
├── scripts/
│   ├── test-connection.mjs      # Connection testing script
│   └── validate-sheets.mjs      # Validation script
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS config
├── tsconfig.json                # TypeScript config
└── package.json                 # Project dependencies
```

## 🚀 Features

### 1. **Real-time Leaderboard**

- Displays participants ranked by score
- Secondary sorting by time taken
- Automatic updates every 5 seconds
- Real-time sync when Google Sheets data changes
- Updates automatically via Google Apps Script trigger

### 2. **Podium Display**

- Visual representation of top 3 participants
- Medal icons (🥇, 🥈, 🥉)
- Names and scores highlighted

### 3. **Search & Filter**

- Search by participant name
- Filter by department
- Combined filtering for precise results

### 4. **Participant Information**

- Rank position
- Name
- Score out of maximum points (200)
- Percentage completion
- Department
- Status indicator

### 5. **Responsive Design**

- Mobile-friendly interface
- Adaptive layout
- Touch-friendly interactions

## 📊 Database Schema

### `participants` Table

| Column          | Type        | Description                  |
| --------------- | ----------- | ---------------------------- |
| `id`            | uuid        | Unique identifier            |
| `name`          | text        | Participant's name           |
| `score`         | integer     | Current quiz score           |
| `time_taken`    | integer     | Time taken in seconds        |
| `attempts`      | integer     | Number of attempts           |
| `department`    | text        | Department/category          |
| `rank`          | integer     | Current rank position        |
| `previous_rank` | integer     | Previous rank for animations |
| `created_at`    | timestamptz | Registration timestamp       |
| `updated_at`    | timestamptz | Last update timestamp        |

## 🔧 Setup & Installation

### Prerequisites

- Node.js 16+
- npm or yarn
- Supabase account
- Environment variables configured

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd "IEEE Leaderboard"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   VITE_GOOGLE_SPREADSHEET_ID=your_spreadsheet_id
   VITE_GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
   ```

4. **Set up Google Sheets Integration**
   - Create a Google Sheet with columns: `registration_number`, `name`, `score`, `time_taken`, `department`
   - Share the sheet with your service account email (Editor access)
   - Note the Spreadsheet ID from the URL
   - Create Google Apps Script to sync data (see Google Sheets Sync Setup below)

5. **Deploy Supabase functions**

   ```bash
   supabase link --project-ref your_project_ref
   supabase functions deploy get-leaderboard
   ```

6. **Configure Supabase RLS Policies**
   - Go to Supabase Dashboard → Authentication → Policies
   - Add policies for `participants` table:
     - **INSERT**: Allow `anon` role (for syncing from Google Sheets)
     - **UPDATE**: Allow `anon` role (for upsert operations)
     - **SELECT**: Allow public access (for leaderboard display)

7. **Run the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📝 Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint code quality checks
- **`npm run typecheck`** - Check TypeScript types

## 🔌 API Endpoints

### GET `/functions/v1/get-leaderboard`

Retrieves the current leaderboard data.

**Response:**

```json
{
  "participants": [
    {
      "id": "uuid",
      "uid": "registration_number",
      "rank": 1,
      "name": "John Doe",
      "score": 180,
      "maxPoints": 200,
      "percentage": 90,
      "status": "active",
      "department": "Engineering",
      "time_taken": 300
    }
  ],
  "lastSync": "2025-10-25T12:00:00Z",
  "totalParticipants": 50
}
```

## 🎯 Component Descriptions

### Header Component

Displays the application title and current update status.

### Podium Component

Shows the top 3 participants with medals and highlighted scores.

### LeaderboardRow Component

Renders individual participant entries with rank, name, score, and progress bar.

### SearchBar Component

Allows users to search participants by name and filter by department.

### ProgressBar Component

Visual indicator showing score percentage relative to maximum points.

### LoadingSkeleton Component

Skeleton loader shown while data is being fetched.

## 🔄 Data Flow & Real-Time Sync

### Google Sheets → Supabase Sync

1. **User edits Google Sheet** (score, name, department, etc.)
2. **Google Apps Script `onEdit()` trigger fires automatically**
3. **Script reads all data from Google Sheet**
4. **Data is sent to Supabase via REST API** (upsert operation)
5. **Supabase updates or inserts records** in `participants` table
6. **RLS policies allow anonymous sync** (via anon key)

### Frontend Data Display

1. **Initial Load**: App fetches leaderboard data from Supabase function
2. **Polling**: Refreshes data every 5 seconds
3. **Real-time Updates**: Displays the latest data from Supabase
4. **Filtering**: Client-side search and department filtering
5. **Rendering**: Components display sorted and filtered data in real-time

### Sync Mechanism Details

- **Trigger**: Google Apps Script `onEdit()` function
- **Frequency**: Automatic on every cell edit
- **Conflict Resolution**: `on_conflict=registration_number` (upsert)
- **Authentication**: Supabase ANON_KEY with RLS policies
- **Data Format**: All sheet columns mapped to database columns

## 🛡️ Security

- **Row Level Security (RLS)** on `participants` table
- **Anonymous INSERT/UPDATE** policies for sync operations
- **Public SELECT** for leaderboard read access
- **Service Account** credentials stored securely in environment
- **Environment variables** for all sensitive data (API keys, private keys)
- **CORS headers** configured for API endpoints
- **No direct database access** from frontend (via Supabase function)

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚦 Performance Optimizations

- Vite's fast build and HMR
- Efficient React component rendering
- CSS pruning with Tailwind
- Optimized database queries with indexes
- Debounced search functionality

## � Google Sheets Sync Setup

### Step 1: Create Google Apps Script

1. Open your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Replace the code with the sync script
4. Save the project

### Step 2: Configure Script Constants

Update these in the Apps Script:

```javascript
const SUPABASE_URL = "https://your-project.supabase.co";
const SUPABASE_KEY = "your_anon_key";
const TABLE_NAME = "participants";
```

### Step 3: Set Up Auto-Sync Trigger

1. In Apps Script, select `setupTrigger` from dropdown
2. Click **Run** button
3. Authorize when prompted
4. Trigger will activate automatically on sheet edits

### Step 4: Test the Sync

1. Edit any cell in Google Sheet
2. Wait 2-3 seconds
3. Check Supabase Table Editor
4. Data should be synced automatically! ✅

---

## 🐛 Troubleshooting

### Google Sheets Sync Issues

| Problem                     | Solution                                             |
| --------------------------- | ---------------------------------------------------- |
| Data not syncing            | Run `syncDataToSupabase()` manually from Apps Script |
| Authentication errors (401) | Check SUPABASE_KEY and RLS policies (allow anon)     |
| Duplicate key errors (409)  | Ensure `on_conflict=registration_number` parameter   |
| No trigger fires            | Run `setupTrigger()` again to recreate trigger       |

### Connection Issues

- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`
- Check network connectivity
- Review browser console for errors
- Confirm Supabase project is active

### Data Not Updating in App

- Check Supabase function logs
- Verify data exists in `participants` table
- Ensure polling is working (check network tab)
- Try refreshing browser (Ctrl+Shift+R)

### Build Errors

- Clear `node_modules` and reinstall: `npm install`
- Check TypeScript configuration: `npm run typecheck`
- Review ESLint errors: `npm run lint`

## 📈 Future Enhancements

- WebSocket subscriptions for instant updates
- Multi-event leaderboard support
- User authentication and profile pages
- Historical leaderboard data archive
- CSV/Excel export functionality
- Mobile app version (React Native)
- Advanced analytics dashboard
- Live chat during event
- Announcement/notification system
- Multiple quiz support

## 📄 License

This project is part of the IEEE organization initiatives.

## 👥 Support

For issues or questions:

1. Check the troubleshooting section
2. Review component documentation
3. Contact the development team

## 📝 Sample Dataset for Testing

Use this sample data to test the complete setup:

| registration_number | name            | score | time_taken | department |
| ------------------- | --------------- | ----- | ---------- | ---------- |
| 2301289485          | Tanmay Kumar    | 180   | 245        | CSE-AIML   |
| 2301289480          | Swadhin Patel   | 165   | 320        | CSE-AIML   |
| 2301289486          | Tanushree Singh | 150   | 290        | CSE-AIML   |
| 2301298765          | Arjun Verma     | 145   | 310        | CST        |
| 2301298734          | Priya Sharma    | 140   | 340        | CST        |
| 2301208945          | Rohan Desai     | 130   | 360        | IT         |
| 2301208956          | Neha Gupta      | 125   | 380        | IT         |
| 2301208967          | Aditya Singh    | 120   | 390        | ECE        |
| 2301208978          | Divya Patel     | 115   | 410        | ECE        |
| 2301208989          | Vikram Rao      | 110   | 430        | MECH       |

### Testing Checklist

- ✅ Add sample data to Google Sheet
- ✅ Run sync (Script runs automatically)
- ✅ Verify data in Supabase Table Editor
- ✅ Run leaderboard app: `npm run dev`
- ✅ Check podium display (top 3 participants)
- ✅ Test search functionality
- ✅ Test department filtering
- ✅ Edit a score in Google Sheet
- ✅ Verify automatic sync to Supabase
- ✅ Confirm leaderboard updates in real-time

---

**Last Updated:** February 17, 2026  
**Setup Status:** ✅ Google Sheets Integration Complete  
**Real-Time Sync:** ✅ Active and Tested
"# Synapse-Leaderboard" 
