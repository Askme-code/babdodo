'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  LogOut,
  Mountain,
  Car,
  Ship,
  Newspaper,
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { useAuth, useUser } from '@/firebase';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isUserLoading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, isUserLoading, router, pathname]);

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/admin/login');
  };

  if (isUserLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!user && pathname !== '/admin/login') {
    return null; // Don't render layout if redirecting
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }


  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
             <div className="flex items-center gap-2">
                <Logo />
                <SidebarTrigger className="ml-auto" />
             </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/admin" legacyBehavior passHref>
                  <SidebarMenuButton as="a" isActive={pathname === '/admin'} tooltip={{children: 'Dashboard'}}>
                    <Home />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/safaris" legacyBehavior passHref>
                  <SidebarMenuButton as="a" isActive={pathname === '/admin/safaris'} tooltip={{children: 'Safaris'}}>
                    <Mountain />
                    <span>Safaris</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/tours" legacyBehavior passHref>
                  <SidebarMenuButton as="a" isActive={pathname === '/admin/tours'} tooltip={{children: 'Tours'}}>
                    <Ship />
                    <span>Tours</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/transfers" legacyBehavior passHref>
                  <SidebarMenuButton as="a" isActive={pathname === '/admin/transfers'} tooltip={{children: 'Transfers'}}>
                    <Car />
                    <span>Transfers</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/posts" legacyBehavior passHref>
                  <SidebarMenuButton as="a" isActive={pathname === '/admin/posts'} tooltip={{children: 'Blog Posts'}}>
                    <Newspaper />
                    <span>Blog Posts</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photoURL || `https://picsum.photos/seed/admin-avatar/100/100`} />
                    <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'A'}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm group-data-[collapsible=icon]:hidden">
                    <span className="font-semibold">Admin</span>
                    <span className="text-muted-foreground">{user?.email}</span>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto group-data-[collapsible=icon]:mx-auto" onClick={handleSignOut}>
                    <LogOut />
                </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <main className="p-4 sm:p-6 lg:p-8 flex-1 bg-muted/40">
                {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
