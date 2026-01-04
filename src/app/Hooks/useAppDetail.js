import { useState, useEffect } from 'react';

const useAppDetail = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppDetail = async () => {
      try {
        const response = await fetch('https://admin.bitfynance.com/api/app-detail');
        if (!response.ok) {
          throw new Error('Failed to fetch app details');
        }
        const result = await response.json();
        if (result.status === 'success') {
          setData(result.data);
        } else {
          throw new Error('API returned error status');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppDetail();
  }, []);

  return { data, loading, error };
};

export default useAppDetail;