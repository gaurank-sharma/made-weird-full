import { useEffect, useState } from 'react';
import { API_URL } from '../config/api';

// Small shared fetch hook — every section on this page just needs
// "give me the list from this endpoint" with a loading/empty state.
const useFetch = (path, fallback = []) => {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_URL}${path}`)
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        const key = Object.keys(json)[0];
        setData(json[key] ?? fallback);
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return { data, loading };
};

export default useFetch;
