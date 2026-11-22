import axios from "axios"
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useAuthStore, type User } from "../store/useAuthStore";

async function fetchCurrentUser():Promise<User | null>{
    try{
      const { data } = await api.get("/auth/me");
      return data.user;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) return null;
      throw err;
    }
}

export function useSession() {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const { isPending, error, refetch } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
      return currentUser;
    },
    staleTime: Infinity,
    retry: false,
  });
  return { user, isPending, error, refetch };
}
