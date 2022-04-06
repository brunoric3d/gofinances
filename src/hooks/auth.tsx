import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from "@react-native-async-storage/async-storage";


interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  userStorageLoading: boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

  const userStorageKey = '@GoFinances:user';

  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  async function signInWithGoogle() {
    try {
      const CLIENT_ID = process.env.CLIENT_ID;
      const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true });
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${params.access_token}`);
        const userInfo = await response.json();

        const user = {
          id: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          avatar: userInfo.picture
        };


        setUser(user);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(user));
      }


    } catch (err) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL],
      })

      if (credential) {

        const user = {
          id: credential.user,
          name: credential.fullName!.givenName!,
          email: credential.email!,
          avatar: `https://ui-avatars.com/api/?name=${credential.fullName}+${credential.fullName!.givenName!}`
        };

        setUser(user);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(user));
      }

    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }


  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(userStorageKey);

      if (userStorage) {
        setUser(JSON.parse(userStorage) as User);
      }
      setUserStorageLoading(false);
    }

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{
      user, signInWithGoogle, signInWithApple, signOut, userStorageLoading

    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

