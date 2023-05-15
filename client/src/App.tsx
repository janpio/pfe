import { CssBaseline, ThemeProvider } from '@mui/material';
import Router from './routes/Router';
import { baselightTheme } from "./theme/DefaultColors";
import { useEffect } from 'react';
import useAuthStore from './store';
import { ToastContainer } from 'react-toastify';
import { GenericResponse } from './features/api/types';


function App() {

  const store = useAuthStore()

  useEffect(() => {
    const user: GenericResponse | null = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      store.login(user.user, user.token)
    }
  }, []);

  const theme = baselightTheme;
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
        <ToastContainer autoClose={2000} />
      </ThemeProvider>
    </>
  );
}

export default App;
