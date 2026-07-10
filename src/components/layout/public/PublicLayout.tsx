// src/components/layout/public/PublicLayout.tsx
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/public/layout/Header';
import { Footer } from '@/components/public/layout/Footer';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}