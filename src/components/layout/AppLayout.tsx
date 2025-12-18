import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';

export const AppLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-background">
      <AppHeader />
      <div className="flex-1 flex overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-enterprise-surface">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
