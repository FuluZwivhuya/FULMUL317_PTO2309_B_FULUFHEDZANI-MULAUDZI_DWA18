// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project URL and public anon key
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
