import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import * as apiClient from "../api-client";

type AppContext = {
  isLoggedIn: boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: () => apiClient.validateToken(),
    retry: false,
  });

  return <AppContext.Provider value={{ isLoggedIn: !isError }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context as AppContext;
};
