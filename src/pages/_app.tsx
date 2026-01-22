import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import SplashScreen from '@components/SplashScreen';
import '@styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} duration={3000} />}
      <Component {...pageProps} />
    </>
  );
}
