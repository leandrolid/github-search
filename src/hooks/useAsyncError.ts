import { useCallback, useState } from 'react';

export const useAsyncError = () => {
  const [, setError] = useState();

  const setAsyncError = useCallback((e: Error) => {
    setError(() => {
      throw e;
    });
  },[setError]);

  return setAsyncError;
};