import { lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import Loadable from '../layouts/full/shared/loadable/Loadable';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const Org = Loadable(lazy(() => import('../pages/orgchart')))
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../pages/signup/Register')));
const Login = Loadable(lazy(() => import('../pages/login/Login')));


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<FullLayout />} >
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/teams" element={<Org />} />
          <Route path="/invitations" element={<div></div>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sample-page" element={<SamplePage />} />
          <Route path="/icons" element={<Icons />} />
          <Route path="/ui/typography" element={<TypographyPage />} />
          <Route path="/ui/shadow" element={<Shadow />} />
          <Route path="*" element={<Navigate to="/auth/404" />} />
        </Route>
      </Route>
      <Route path="/auth" element={<BlankLayout />} >
        <Route path="404" element={<Error />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="/auth/404" />} />
      </Route>
    </Routes>)
}

export default Router