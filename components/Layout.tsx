import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Video, LogOut, Settings, Zap } from 'lucide-react';
import { MOCK_USER } from '../constants';
import { Button } from './ui/Button';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-background text-text">
      {/* Sidebar */}
      <aside className="w-64 border-r border-accent hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-accent">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Reactor Studio</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard">
            <Button 
              variant={isActive('/dashboard') ? 'secondary' : 'ghost'} 
              className="w-full justify-start" 
              icon={<LayoutDashboard className="w-4 h-4" />}
            >
              Dashboard
            </Button>
          </Link>
          <Link to="/create">
            <Button 
              variant={isActive('/create') ? 'secondary' : 'ghost'} 
              className="w-full justify-start" 
              icon={<PlusCircle className="w-4 h-4" />}
            >
              Nova Reação
            </Button>
          </Link>
           <Button 
              variant="ghost" 
              className="w-full justify-start text-muted" 
              icon={<Video className="w-4 h-4" />}
            >
              Minha Biblioteca
            </Button>
             <Button 
              variant="ghost" 
              className="w-full justify-start text-muted" 
              icon={<Settings className="w-4 h-4" />}
            >
              Configurações
            </Button>
        </nav>

        <div className="p-4 border-t border-accent">
          <div className="bg-card rounded-lg p-3 mb-4 border border-accent">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-muted">Plano Gratuito</span>
              <span className="text-xs text-white font-bold">{MOCK_USER.credits} créditos rest.</span>
            </div>
            <div className="w-full bg-accent rounded-full h-1.5">
              <div className="bg-success h-1.5 rounded-full w-[80%]"></div>
            </div>
            <button className="text-xs text-primary mt-2 hover:underline">Fazer Upgrade</button>
          </div>

          <div className="flex items-center gap-3 px-2">
            <img 
              src={MOCK_USER.avatarUrl} 
              alt="Usuário" 
              className="w-8 h-8 rounded-full border border-accent"
            />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{MOCK_USER.name}</p>
              <p className="text-xs text-muted truncate">{MOCK_USER.email}</p>
            </div>
            <button 
                onClick={() => navigate('/')}
                className="text-muted hover:text-white p-1"
                title="Sair"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header (Visible only on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur border-b border-accent flex items-center justify-between px-4 z-50">
         <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">Reactor</span>
          </Link>
          <Link to="/create">
            <Button size="sm" icon={<PlusCircle className="w-4 h-4" />}>Criar</Button>
          </Link>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="max-w-6xl mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};