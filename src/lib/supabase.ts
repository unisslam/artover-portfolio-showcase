import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nryevntaonwzlyhimnee.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yeWV2bnRhb253emx5aGltbmVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MDY3MTksImV4cCI6MjA2NzQ4MjcxOX0.21s-PDrAmGlenqrO0hJwXEIDucSdtWdJBfB1_qPaUzw'

// Always create the client since we have fallback values
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  status: string;
  image: string; // الصورة الرئيسية للتوافق مع النسخة القديمة
  images?: string[]; // مصفوفة الصور الجديدة
  duration: string;
  team: string;
  client: string;
  year: string;
  features: string[];
  challenges: string;
  solution: string;
  demo_url?: string;
  github_url?: string;
  created_at?: string;
  updated_at?: string;
}

// Database operations
export const projectsApi = {
  // Get all projects
  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
    
    return data || [];
  },

  // Add new project
  async addProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding project:', error);
      throw error;
    }
    
    return data;
  },

  // Update project
  async updateProject(id: number, project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...project, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating project:', error);
      throw error;
    }
    
    return data;
  },

  // Delete project
  async deleteProject(id: number): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // Get single project
  async getProject(id: number): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching project:', error);
      return null;
    }
    
    return data;
  }
};
