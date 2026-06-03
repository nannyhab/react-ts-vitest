import { createRootRoute, Outlet } from "@tanstack/react-router";
import Banner from "../components/Banner";

export const Route = createRootRoute({
  component: () => (
    <div className="text-center">
      <Banner title="CS Course Scheduler" />
      <main className="bg-[#282c34] min-h-screen text-white">
        <Outlet />
      </main>
    </div>
  ),
});