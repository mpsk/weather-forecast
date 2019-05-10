import { useState, useEffect, DependencyList } from 'react';

export function useAsyncEffect(asyncFunc: () => Promise<any>, inputs: DependencyList = []) {
  const controller = new AbortController();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsLoading(true);
    }
    asyncFunc().finally(() => {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    });
    return () => controller.abort();
  }, [...inputs]);

  return {
    loading
  };
}

export function useAsyncFetchEffect<T = any>(asyncFunc: () => Promise<T | void>, inputs: DependencyList = []) {
  const controller = new AbortController();
  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (!loading) {
      setIsLoading(true);
    }
    asyncFunc()
      .then((data: T) => {
        setData(data);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });
    return () => controller.abort();
  }, [...inputs]);

  return {
    loading,
    data
  };
}
