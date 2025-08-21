import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BookOpen, Users, Settings, GraduationCap } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Inscrição em Eletivas",
    url: createPageUrl("Inscricao"),
    icon: BookOpen,
    description: "Para alunos se inscreverem"
  },
  {
    title: "Gerenciar Eletivas", 
    url: createPageUrl("Admin"),
    icon: Settings,
    description: "Painel administrativo"
  },
  {
    title: "Ver Inscrições",
    url: createPageUrl("Inscricoes"),
    icon: Users,
    description: "Visualizar todas as inscrições"
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <style>{`
          :root {
            --primary: 244 63% 54%;
            --primary-foreground: 0 0% 100%;
            --secondary: 259 100% 65%;
            --accent: 142 76% 36%;
            --muted: 220 14% 96%;
            --border: 220 13% 91%;
          }
        `}</style>

        <Sidebar className="border-r border-purple-100 bg-gradient-to-b from-purple-50 to-blue-50">
          <SidebarHeader className="border-b border-purple-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">EletivasEscola</h2>
                <p className="text-sm text-gray-600">Sistema de Inscrições</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                Navegação
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-purple-100 hover:text-purple-700 transition-all duration-300 rounded-xl mb-2 p-4 ${
                          location.pathname === item.url ? 'bg-purple-100 text-purple-700 shadow-sm' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <div>
                            <span className="font-medium">{item.title}</span>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col bg-gray-50">
          <header className="bg-white border-b border-gray-200 px-6 py-4 md:hidden shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
              <div className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-purple-600" />
                <h1 className="text-lg font-bold text-gray-900">EletivasEscola</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}