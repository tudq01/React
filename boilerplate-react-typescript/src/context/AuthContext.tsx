import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../config/firebase";

import User from "firebase"

export type AuthContextType = {
    currentUser:User.User;
}
export const AuthContext = createContext<AuthContextType|null >(null);

type Props = {
  children?: React.ReactNode;
};
export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User.User>(Object);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user: User.User | null) => {
      user && setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
