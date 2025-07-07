import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { projectsApi, Project } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  addProject: (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateProject: (id: number, project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  getProject: (id: number) => Project | undefined;
  refreshProjects: () => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Load projects from Supabase on mount
  useEffect(() => {
    refreshProjects();
  }, []);

  const refreshProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsApi.getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast({
        title: "خطأ في تحميل المشاريع",
        description: "حدث خطأ أثناء تحميل المشاريع",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (newProject: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const addedProject = await projectsApi.addProject(newProject);
      setProjects(prev => [addedProject, ...prev]);
      toast({
        title: "تم إضافة المشروع",
        description: "تم إضافة المشروع الجديد بنجاح",
      });
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: "خطأ في إضافة المشروع",
        description: "حدث خطأ أثناء إضافة المشروع",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProject = async (id: number, updatedProject: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const updated = await projectsApi.updateProject(id, updatedProject);
      setProjects(prev => prev.map(project => 
        project.id === id ? updated : project
      ));
      toast({
        title: "تم تحديث المشروع",
        description: "تم تحديث بيانات المشروع بنجاح",
      });
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "خطأ في تحديث المشروع",
        description: "حدث خطأ أثناء تحديث المشروع",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteProject = async (id: number) => {
    try {
      await projectsApi.deleteProject(id);
      setProjects(prev => prev.filter(project => project.id !== id));
      toast({
        title: "تم حذف المشروع",
        description: "تم حذف المشروع بنجاح",
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "خطأ في حذف المشروع",
        description: "حدث خطأ أثناء حذف المشروع",
        variant: "destructive",
      });
      throw error;
    }
  };

  const getProject = (id: number) => {
    return projects.find(project => project.id === id);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      loading,
      addProject,
      updateProject,
      deleteProject,
      getProject,
      refreshProjects
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
