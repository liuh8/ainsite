import Navbar from './Navbar';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();
  const isHome = router.pathname === '/';

  return (
    <>
      {!isHome && <Navbar />}
      <main className={!isHome ? 'pt-16' : ''}>
        {children}
      </main>
    </>
  );
};

export default Layout;