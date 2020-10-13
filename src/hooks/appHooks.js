import { useState, useEffect } from "react";
import PublicIp from "public-ip";
/**
 * Resolves the clients current public IP Address.
 * This hook also saves the current ip to local storage,
 * allowing for the possiblilty of offline use.
 */
export const useIPAddress = () => {
  const localStorageKey = "lastIpv4";
  const [ipv4, setIpv4] = useState();
  const [error, setError] = useState(null);
  const [previousIpv4] = useState(localStorage.getItem(localStorageKey));
  const isLoading = !ipv4 && !error;

  useEffect(() => {
    let isMounted = true;
    if (!ipv4 && !error) {
      PublicIp.v4()
        .then((v) => {
          if (isMounted) setIpv4(v);
          localStorage.setItem(localStorageKey, v);
        })
        .catch((e) => {
          if (isMounted) setError(e);
        });
    }

    return () => (isMounted = false);
  }, [error, ipv4]);

  return [ipv4, isLoading, error, previousIpv4];
};
