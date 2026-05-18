
import React, { useEffect } from 'react';
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { loginRequest } from '../../auth.config';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './../../redux/store';
import { apiPost } from '../../utils/axiosInstance';
import { setCredentials } from '../../redux/authSlice';

const Home: React.FC = () => {

    const { instance } = useMsal();
    const dispatch = useDispatch();
    const { username, role }= useSelector(
        (state: RootState) => state.auth
    )

    const handleLogin = async () => {
        try {
            await instance.loginRedirect(loginRequest)
        } catch (e) {
            console.error('Login failed', e)
        }
    }

    const handleLogout = async () => {
        try {
            await instance.logoutRedirect()
        } catch (e) {
            console.error('Logout failed', e)
        }
    }

  useEffect(() => {
    
    const loginCallBack =  {
        successCallback: (data: any) => {
            dispatch(setCredentials({
                accessToken: data.token,
                role: role,
                username: username
            }))
        },
        failureCallback: (error: any) => {
            console.error('Login failed', error)
        }
    }

    if(username){
            apiPost('/api/auth/login', {"username":"user",
     "password":"password"}, loginCallBack) 
    }
  }, [username])


    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the S-Insurance</h1>
                    <AuthenticatedTemplate>
                        <button className=' hover:bg-gray-700 hover:text-white font-bold py-2 px-4 rounded' onClick={handleLogout}> Logout</button>
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>
                        <button className=' hover:bg-gray-700 hover:text-white font-bold py-2 px-4 rounded' onClick={handleLogin}>Login</button>
                    </UnauthenticatedTemplate>
                </div>
            </div>
        </>
    )


}

export default Home;