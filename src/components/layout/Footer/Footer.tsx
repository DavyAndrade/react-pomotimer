import { Heading } from "../../ui";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Heading as="h4">© 2025 Pomotimer</Heading>
      </div>
    </footer>
  );
}
