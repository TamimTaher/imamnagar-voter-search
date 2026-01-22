import Link from 'next/link';
import Image from 'next/image';
import NavBar from '@components/NavBar';
import styles from '@styles/Header.module.css';

/**
 * It returns a header element with a logo, a title, and a navigation bar
 * @returns A JSX element
 */
function Header(): JSX.Element {
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <div className="h-16">
          <Link href="/">
            <Image src="/icons/BD.png" alt="Bogura-6" width={36} height={36} />
          </Link>
        </div>
      </div>
      <div className={styles.name}>
        <Link href="/">Bogura-6</Link>
      </div>
      <div className={styles.small}>
        <div className={styles.smallCat}>
          <Link href="/" aria-label="Bogura-6">
            <Image src="/icons/BD.png" alt="Bogura-6" width={64} height={64} />
          </Link>
        </div>
      </div>
      {/* NAVIGATION BAR */}
      <NavBar />
    </header>
  );
}

export default Header;
