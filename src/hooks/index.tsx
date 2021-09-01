import React, {createContext, ReactNode, useContext, useState, useEffect} from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dataKey } from '~/utils/dataKey';

interface AuthProviderProps {
  children: ReactNode,
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}
interface AuthContextData {
 user: User;
 signInWithGoogle(): Promise<void>;
 signInWithApple(): Promise<void>;
 signOut(): Promise<void>;
 userLoadingUserStorage:  boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

export const AuthContext = createContext({} as AuthContextData);
const {CLIENT_ID} = process.env;
const {REDIRECT_URI} = process.env;

const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState({} as User);
  const [userLoadingUserStorage, setUserLoadingStorage] = useState(true);

  const signInWithGoogle = async() => {
    try { 
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      const {params, type} =  await AuthSession.startAsync({authUrl}) as AuthorizationResponse;
      if(type === 'success'){
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();
        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture
        };
        setUser(userLogged);
        await AsyncStorage.setItem(dataKey.user, JSON.stringify(userLogged));
      }

    } catch (error) {
      throw new Error(error);      
    }
  }

   const signInWithApple = async() => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });

      if(credential){
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}`;
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo,
        };
        setUser(userLogged);
        await AsyncStorage.setItem(dataKey.user, JSON.stringify(userLogged));
      }

    } catch (error) {
       throw new Error(error);
        
    }
  }

  const signOut = async() => {
  setUser({} as User);
  await AsyncStorage.removeItem(dataKey.user);
 }

useEffect(() => {
  const loadStorageUserData = async() => {
    const userStorage = await AsyncStorage.getItem(dataKey.user);
    if(userStorage){
      const userLogged = JSON.parse(userStorage) as User;
      setUser(userLogged);
    }
    setUserLoadingStorage(false);
  }
  loadStorageUserData();  
}, [setUser])  


  return(
    <AuthContext.Provider value={{
      user, 
      signInWithGoogle,
      signInWithApple,
      signOut,
      userLoadingUserStorage,
       }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}

export {AuthProvider, useAuth}



