import {useEffect} from 'react';
import useAuth from '../firebase/useAuth';
import {useUser} from '../context/userContext';
import UserStack from './userStack';
import AuthStack from './authStack';

export default function AppNavigation() {
  const {user} = useAuth();
  const { getUserData} = useUser();
  useEffect(() => {
    getUserData();
  }, [user]);
  
  return user ? <UserStack /> : <AuthStack />;
}
