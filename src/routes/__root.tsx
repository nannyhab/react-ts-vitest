import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="text-center">
      <header className="bg-[#282c34] min-h-screen flex flex-col items-center text-white p-6">
        <h1 className="text-2xl font-semibold mb-4">CS Course Scheduler</h1>
        <Outlet />
      </header>
    </div>
  ),
});