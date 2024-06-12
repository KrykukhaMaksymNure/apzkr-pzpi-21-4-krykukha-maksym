import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import authService from '../features/authService';
import useAuth from '../hooks/useAuth';
import { AuthResultDto, WatcherAuthResult, WatcherAuthResultDto } from '../interfaces/account';
import { Roles, WatcherRoles } from '../interfaces/enums';

const SignUp = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState(1);
  const [role, setRole] = useState(WatcherRoles.None);
  const [watcherName, setWatcherName] = useState('');
  const [watcherSurname, setWatcherSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      let result: WatcherAuthResult = { id: '', role: '' };
      if (role === WatcherRoles.Watcher) {
        result = await authService.signUpWatcher(email, password, watcherName, watcherSurname, phone) as any
      }

      setAuth(result);
      saveToLocalStorage(result.id, result.role);
      navigate("/");
    } catch (error) {
      console.error('Error');
    }
  };

  const saveToLocalStorage = async (watcherId, role) => {
    localStorage.setItem('watcherId', watcherId!);
    localStorage.setItem('role', role!);
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleRoleSelection = (selectedRole: WatcherRoles) => {
    setRole(selectedRole);
    handleNext();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Typography variant="h5" gutterBottom align="center" mb={2}>
              {t("createAccount")}
            </Typography>
            <Box display="flex" justifyContent="center" flexDirection="column" gap="15px" mb={2} px={10}>
              <Button variant="contained" color="primary" onClick={() => handleRoleSelection(WatcherRoles.Watcher)}>
                {t("watcher")}
              </Button>
            </Box>
            <Box display="flex" justifyContent="center" flexDirection="column" gap="15px" mb={3} px={10}>
              <Typography variant="h6" align="center">
                {t("alreadyRegistered")}
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/login">
                {t("logIn")}
              </Button>
            </Box>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h5" gutterBottom align="center" mb={2}>
              {t("enterName")}
            </Typography>
            <Box display="flex" flexDirection="column" gap="15px" mb={3} px={3}>
              <TextField
                label={t("watcherName")}
                variant="outlined"
                fullWidth
                value={watcherName}
                onChange={(e) => setWatcherName(e.target.value)}
              />
              <TextField
                label={t("watcherSurname")}
                variant="outlined"
                fullWidth
                value={watcherSurname}
                onChange={(e) => setWatcherSurname(e.target.value)}
              />
              <TextField
                label={t("phone")}
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" flexDirection="row" mb={3} px={3}>
              <Button variant="outlined" color="primary" onClick={handleBack}>
                {t("back")}
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {t("next")}
              </Button>
            </Box>
          </>
        );
      case 3:
        return (
          <>
            <Typography variant="h5" gutterBottom align="center" mb={2}>
              {t("enterEmailAndPassword")}
            </Typography>
            <Box display="flex" flexDirection="column" gap="15px" mb={3} px={3}>
              <TextField
                label={t("email")}
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label={t("password")}
                variant="outlined"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" flexDirection="row" mb={3} px={3}>
              <Button variant="outlined" color="primary" onClick={handleBack}>
                {t("back")}
              </Button>
              <Button variant="contained" color="primary" onClick={handleSignUp}>
                {t("signUp")}
              </Button>
            </Box>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        {renderStep()}
      </Paper>
    </Container>
  );
};

export default SignUp;