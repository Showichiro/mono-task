import { Link } from "@/components/common/Link";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] grid-cols-[250px_1fr]">
      <header className="col-span-2 bg-blue-500 p-4 text-white">Header</header>
      <aside className="bg-gray-200 p-4">
        <div>
          <Link to="/">to top</Link>
          <Link to="/test">to test</Link>
        </div>
      </aside>
      <main className="bg-white p-4">
        <Outlet />
      </main>
      <footer className="col-span-2 bg-blue-500 p-4 text-white">Footer</footer>
    </div>
  ),
});
