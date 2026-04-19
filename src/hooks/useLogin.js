import { useContext } from 'react'
import { LoginContext } from '../context/login-context'

export const useLogin = () => useContext(LoginContext)
