import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

/**
 * A splash screen component that displays an animated GIF when the app loads
 * @param onComplete - Callback function when splash screen animation completes
 * @param duration - Duration in milliseconds to show the splash screen (default: 3000ms)
 */
function SplashScreen({ onComplete, duration = 3000 }: SplashScreenProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <div className={`splash-screen ${!isVisible ? 'splash-screen-hidden' : ''}`}>
      <div className="splash-content">
        <Image
          src="/images/UI.gif"
          alt="Bogura-6"
          width={300}
          height={300}
          priority
          unoptimized
        />
      </div>
    </div>
  );
}

export default SplashScreen;
