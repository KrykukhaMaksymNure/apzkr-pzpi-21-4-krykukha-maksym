import { Button, Container, Link, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import authService from '../features/authService';
import useAuth from '../hooks/useAuth';
import { AuthResultDto, WatcherAuthResult, WatcherAuthResultDto } from '../interfaces/account';

const Login = () => {
  const { setAuth } = useAuth();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [watcherName, setWatcherName] = useState<string>('');
  const [watcherSurname, setWatcherSurname] = useState<string>('');

  const handleLogin = async () => {
    try {
      const result  =  await authService.signInWatcher(email, password,phone,watcherName,watcherSurname) as any;

      const {id, role} = result.watcher
      setAuth({id,role});
      saveToLocalStorage(id, role);
      navigate("/");
    } catch (error) {
      console.error('Error');
    }
  };

  const saveToLocalStorage = async (watcherId, role) => {
    localStorage.setItem('watcherId', watcherId!);
    localStorage.setItem('role', role!);
  }

  return (
    <div className="bg-light pb-5" style={{ minHeight: "100vh" }}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} style={{ padding: '30px', marginTop: '50px' }}>
          <Typography variant="h5" gutterBottom align="center">
            {t("signIn")}
          </Typography>
          <form>
            <TextField
              label={t("email")}
              variant="outlined"
              margin="normal"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label={t("password")}
              variant="outlined"
              margin="normal"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
            <TextField
              label="Phone"
              variant="outlined"
              margin="normal"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              label={t("watcherName")}
              variant="outlined"
              margin="normal"
              fullWidth
              value={watcherName}
              onChange={(e) => setWatcherName(e.target.value)}
            />
            <TextField
              label={t("watcherSurname")}
              variant="outlined"
              margin="normal"
              fullWidth
              value={watcherSurname}
              onChange={(e) => setWatcherSurname(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Link href="/sign-up">
              {t("createAccount")}
            </Link>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '20px' }}
              onClick={handleLogin}>
              {t("signIn")}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
