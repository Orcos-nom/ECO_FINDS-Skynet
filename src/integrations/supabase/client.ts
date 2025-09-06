import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ppaxxazpxwafujteoswa.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYXh4YXpweHdhZnVqdGVvc3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMjQ3MTUsImV4cCI6MjA3MjcwMDcxNX0.6Ht-dA9bch4mKMEb4EFDJxU4jTwD2mpZBFgCdkov3dE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});