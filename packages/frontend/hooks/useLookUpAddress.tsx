import { useState, useCallback } from "react";

const useLookUpAddress = (
  lookupAddress: (username: string) => Promise<any>,
  session: any
) => {
  const [odisRegistedAddresses, setOdisRegistedAddresses] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLookupAddress = useCallback(async () => {
    setLoading(true);
    try {
      const addresses = await lookupAddress(session?.username);
      setLoading(false);
      if (addresses) {
        setOdisRegistedAddresses(addresses);
      } else {
        setOdisRegistedAddresses("");
      }
    } catch (err: any) {
      setError(err.message || "Error fetching address information");
      setLoading(false);
    }
  }, [lookupAddress, session]);

  return { odisRegistedAddresses, loading, error, getLookupAddress };
};

export default useLookUpAddress;
