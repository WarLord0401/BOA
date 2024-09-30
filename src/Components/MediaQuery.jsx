import { useEffect, useState } from 'react';

const useMediaQuery = query => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // Define the listener function
    const listener = event => {
      setMatches(event.matches);
    };

    // Use addEventListener instead of addListener
    mediaQueryList.addEventListener('change', listener);

    return () => {
      // Cleanup: remove the listener on component unmount
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
