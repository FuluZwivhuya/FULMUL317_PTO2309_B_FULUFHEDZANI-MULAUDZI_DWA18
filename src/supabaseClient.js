import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vdyjxpavlatadrwzcudo.supabase.co';  // Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkeWp4cGF2bGF0YWRyd3pjdWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY1MTUyNTEsImV4cCI6MjA0MjA5MTI1MX0.-yw8u1VsNStHBrYE5RnHYpM-Mkib2mEtJ7qAdrL0Wmc';  // Public anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
