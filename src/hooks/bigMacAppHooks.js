import { useState, useEffect } from "react";
import PublicIp from "public-ip";

/**
 * Resolves the clients current public IP Address.
 */
export const useIPAddress = () => {
  const localStorageKey = "lastIpv4";
  const [ipv4, setIpv4] = useState();
  const [error, setError] = useState(null);
  const [previousIpv4] = useState(localStorage.getItem(localStorageKey));
  const isLoading = !ipv4 && !error;

  useEffect(() => {
    if (!ipv4 && !error) {
      PublicIp.v4()
        .then((v) => {
          setIpv4(v);
          localStorage.setItem(localStorageKey, v);
        })
        .catch((e) => setError(e));
    }
  }, [error, ipv4]);

  return { ipv4, isLoading, error, previousIpv4 };
};
