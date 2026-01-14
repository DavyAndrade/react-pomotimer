import { ChartColumnBig, House, Settings, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { Heading, Text } from "../../ui";
import styles from "./Header.module.scss";

export default function Header() {
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
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <Heading as="h4" className={styles.logoHeading}>
            <Timer size={18} />
            Pomotimer
          </Heading>
        </Link>

        <nav className={styles.nav}>
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
    <Link to={href} className={styles.navItem}>
      {icon}
      <Text as="span" className={styles.navItemLabel}>
        {label}
      </Text>
    </Link>
  );
}
