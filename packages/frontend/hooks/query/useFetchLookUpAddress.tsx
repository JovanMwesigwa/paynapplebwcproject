import { getIdentifierPrefix } from "@/SocialConnect/utils";
import { LookupResponse } from "@/pages/api/socialconnect/lookup";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useFetchLookUpAddress = () => {
  const { data: session, status } = useSession();

  const request = async (identifier: string) => {
    try {
      const response = await fetch(
        `/api/socialconnect/lookup?${new URLSearchParams({
          handle: identifier,
          identifierType: getIdentifierPrefix(),
        })}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const lookupResponse: LookupResponse = await response.json();

      return lookupResponse.accounts.length > 0
        ? lookupResponse.accounts[0]
        : {};
    } catch (error) {
      console.error("Failed to fetch lookup address:", error);
      return {};
    }
  };

  const response = useQuery({
    queryKey: ["lookupAddress", session?.user?.name],
    // @ts-ignore
    queryFn: () => request(session.user?.name as string),
    enabled: !!session?.user?.name, // Only run the query if username is defined
    staleTime: 5 * 60 * 1000, // Optional: Adjust stale time as needed
  });

  return { ...response, session, status };
};

export default useFetchLookUpAddress;
