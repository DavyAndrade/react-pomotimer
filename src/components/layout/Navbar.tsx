import { ChartColumnBig, House, Settings, Timer } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navItems = [
    {
      label: "Início",
      href: "/",
      icon: <House size={20} />,
    },
    {
      label: "Estatísticas",
      href: "/statistics",
      icon: <ChartColumnBig size={20} />,
    },
    {
      label: "Configurações",
      href: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <header className="flex justify-center items-center w-full sticky top-0 left-0 z-50 px-4 bg-gray-800">
      <div className="flex w-full justify-between items-center gap-2 md:max-w-3xl py-6 border-b-2 border-gray-700">
        <Link
          to="/"
          className="text-blue-600 text-xl text-center font-bold flex justify-center items-center gap-1 hover:text-blue-500 transition-colors"
        >
          <Timer size={20} />
          <h2>Pomotimer</h2>
        </Link>

        <nav className="flex gap-3">
          {navItems.map((item) => (
            <NavigationItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </nav>
      </div>
    </header>
  );
}

interface NavigationItemProps {
  label: string;
  href: string;
  icon: React.ReactNode;
}

function NavigationItem({ label, href, icon }: NavigationItemProps) {
  return (
    <Link
      to={href}
      className="flex justify-center items-center gap-1 p-2 rounded-sm bg-gray-700/75 hover:bg-gray-700 hover:cursor-pointer transition-colors text-white"
    >
      {icon}
      <p className="text-md hidden text-center sm:block">{label}</p>
    </Link>
  );
}
