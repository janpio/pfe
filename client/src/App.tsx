import { CssBaseline, ThemeProvider } from '@mui/material';
import Router from './routes/Router';
import { baselightTheme } from "./theme/DefaultColors";
import { useEffect } from 'react';
import { useStore } from './state/store';
import { User } from './state/authSlice';
import { ToastContainer } from 'react-toastify';
import { GenericResponse } from './features/api/types';

function App() {

  const login = useStore((state: any) => state.login)
  const setTeammates = useStore((state: any) => state.setTeammates)


  useEffect(() => {
    const user: GenericResponse | null = JSON.parse(localStorage.getItem("user") || "null");
    const teammates: Array<User> | null = JSON.parse(localStorage.getItem("teammates") || "null");

    if (user) {
      login(user.user, user.token)
    }
    if (teammates) {
      setTeammates(teammates)
    }
  }, []);

  const theme = baselightTheme;
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
        <ToastContainer autoClose={1500} />
      </ThemeProvider>
    </>
  );
}

export default App;
