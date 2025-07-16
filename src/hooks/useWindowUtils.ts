import { useEffect, useState } from 'react';

export const useWindowUtils = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return {
    isClient,
    performance: isClient ? window.performance : null,
    navigator: isClient ? window.navigator : null,
  };
}; 