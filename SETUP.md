# MovaVendorApp Setup Guide

This guide will help you set up the MovaVendorApp project with Supabase integration.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- A Supabase account and project

## Environment Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd mova-platform
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Supabase

1. Go to [Supabase](https://supabase.com) and create a new project
2. Once your project is created, go to **Settings > API**
3. Copy the following values:
   - **Project URL**
   - **anon public key**
   - **service_role secret key** (keep this secure!)

### 4. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and replace the placeholder values with your actual Supabase credentials:

   ```env
   # Replace these with your actual Supabase project credentials
   EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
   ```

### 5. Database Setup

You'll need to create the following tables in your Supabase database:

#### Vendors Table
```sql
CREATE TABLE vendors (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  company_name TEXT,
  address TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Cars Table
```sql
CREATE TABLE cars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  color TEXT NOT NULL,
  license_plate TEXT NOT NULL UNIQUE,
  daily_rate DECIMAL(10,2) NOT NULL,
  is_available BOOLEAN DEFAULT true,
  features TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Bookings Table
```sql
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'active', 'completed', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Customers Table
```sql
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  license_number TEXT,
  address TEXT,
  rating DECIMAL(2,1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 6. Row Level Security (RLS) Setup

Enable RLS on all tables:

```sql
-- Enable RLS on all tables
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Vendors can only access their own data
CREATE POLICY "Vendors can view own profile" ON vendors
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Vendors can update own profile" ON vendors
  FOR UPDATE USING (auth.uid() = id);

-- Cars policies
CREATE POLICY "Vendors can manage own cars" ON cars
  FOR ALL USING (auth.uid() = vendor_id);

-- Bookings policies
CREATE POLICY "Vendors can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = vendor_id);

CREATE POLICY "Vendors can update own bookings" ON bookings
  FOR UPDATE USING (auth.uid() = vendor_id);
```

## Running the Application

### Development Mode

```bash
# Start the Expo development server
npx expo start

# Or use npm/yarn
npm start
yarn start
```

### Building for Production

```bash
# Build for Android
npx expo build:android

# Build for iOS (requires macOS)
npx expo build:ios
```

## Project Structure

```
MovaVendorApp/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # App screens
│   ├── navigation/       # Navigation setup
│   ├── services/         # API services (Supabase)
│   ├── utils/            # Helper functions
│   ├── types/            # TypeScript type definitions
│   └── config/           # Environment configuration
├── .env                  # Environment variables (create from .env.example)
├── .env.example          # Environment variables template
└── SETUP.md              # This setup guide
```

## Important Notes

### Security

- **Never commit your `.env` file** to version control
- The `SUPABASE_SERVICE_ROLE_KEY` should only be used in secure server-side contexts
- Always use the `EXPO_PUBLIC_SUPABASE_ANON_KEY` for client-side operations

### Environment Variables

- Variables prefixed with `EXPO_PUBLIC_` are accessible in client-side code
- Variables without this prefix are only available in server-side contexts
- Make sure to restart your development server after changing environment variables

### Troubleshooting

1. **"Supabase is not configured" error**: Check your `.env` file and ensure all required variables are set
2. **Database connection issues**: Verify your Supabase project URL and API keys
3. **Build errors**: Make sure all dependencies are installed and environment variables are properly configured

## Next Steps

1. Set up your Supabase project and configure the environment variables
2. Create the database tables using the provided SQL scripts
3. Set up Row Level Security policies
4. Test the application in development mode
5. Customize the app according to your specific requirements

For more information about Supabase, visit the [official documentation](https://supabase.com/docs).
