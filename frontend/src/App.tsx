import { NavLink, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";

function Placeholder({ title }: { title: string }) {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-3 text-slate-500">
        This page is ready for the next feature.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-6 py-5">
          <span className="mr-auto text-lg font-bold text-indigo-600">
            AI Project Manager
          </span>
          {[
            { path: "/", label: "Dashboard" },
            { path: "/projects", label: "Projects" },
            { path: "/login", label: "Login" },
          ].map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? "font-semibold text-indigo-600"
                  : "text-slate-600 hover:text-indigo-600"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Placeholder title="Projects" />} />
        <Route path="/login" element={<Placeholder title="Login" />} />
      </Routes>
    </div>
  );
}
