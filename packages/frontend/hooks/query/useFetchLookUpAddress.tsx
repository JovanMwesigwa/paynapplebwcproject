import { getIdentifierPrefix } from "@/SocialConnect/utils";
import { LookupResponse } from "@/pages/api/socialconnect/lookup";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useFetchLookUpAddress = () => {
  const { data: session, status } = useSession();

  const request = async (identifier: string) => {
    let response: Response = await fetch(
      `/api/socialconnect/lookup?${new URLSearchParams({
        handle: identifier,
        identifierType: getIdentifierPrefix(),
      })}`,
      {
        method: "GET",
      }
    );

    let lookupResponse: LookupResponse = await response.json();
    if (lookupResponse.accounts.length > 0) {
      return lookupResponse.accounts[0];
    }
  };

  const response = useQuery({
    // @ts-ignore
    queryKey: ["lookupAddress", session?.username],
    // @ts-ignore
    queryFn: () => request(session?.username as string),
    // @ts-ignore
    enabled: !!session?.username, // Only run the query if username is defined
  });

  return { ...response, session, status };
};

export default useFetchLookUpAddress;
