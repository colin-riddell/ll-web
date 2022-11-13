import React, { ReactNode } from 'react';

import { setUser } from '../../features/user/userSlice'
import { useAppDispatch } from '../../app/hooks'
import { useUser } from "../../lib/useUser";
import AuthedNavJobseeker from './AuthedNavJobseeker';
import AuthedNavRecruiter from './AuthedNavRecruiter';


const AuthedNav = ({children}: {children: ReactNode}) => {
  const { user, isRecruiter, isJobseeker } = useUser();

  const dispatch = useAppDispatch()
  dispatch(setUser(user))

  if (isJobseeker) return <AuthedNavJobseeker>{children}</AuthedNavJobseeker>;
  if (isRecruiter) return <AuthedNavRecruiter />;

  return <p>Loading</p>

}

export default AuthedNav;