import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import SideBar from '../components/SideBar'

const queryClient = new QueryClient()
export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      {/* h-screen: Ensures the layout takes the full viewport height 
          flex: Places SideBar and Main side-by-side
      */}
      <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
        
        {/* Sidebar stays fixed to the left */}
        <SideBar />

        {/* Main content area:
           flex-1: Takes up all remaining width
           overflow-y-auto: Allows only this section to scroll
        */}
        <main className="flex-1 relative overflow-y-auto">
          <Outlet />
        </main>
        
      </div>
    </QueryClientProvider>
  ),
});