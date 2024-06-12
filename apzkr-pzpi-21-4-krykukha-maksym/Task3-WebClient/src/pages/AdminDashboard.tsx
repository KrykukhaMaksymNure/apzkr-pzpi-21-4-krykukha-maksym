import { Alert, Box, Button, Container, Divider, Paper, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams, GridRowSelectionModel, GridValueFormatterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CarEditToolbar from '../components/CarEditToolbar';
import CarLocationModal from '../components/CarLocationModal';
import EditToolbar from '../components/EditToolbar';
import EditableDataGrid from '../components/EditableDataGrid';
import addressService from '../features/addressService';
import authService from '../features/authService';
import carService from '../features/carService';
import certificateService from '../features/certificateService';
import dataService from '../features/dataService';
import tripService from '../features/tripService';
import userService from '../features/userService';
import useAuth from '../hooks/useAuth';
import useStatusConverter from '../hooks/useStatusConverter';
import { AddressDto } from '../interfaces/address';
import { CertificateInfoDto } from '../interfaces/certificate';
import { CarStatus } from '../interfaces/enums';
import { GridAccident, GridCar, GridDriver, GridDriverCar, GridService, GridTrip, GridUser, GridWatcher } from '../interfaces/grid';
import { ServiceInfoDto } from '../interfaces/service';
import watcherService from '../features/watcherService';
import driverService from '../features/driverService';
import driverCarService from '../features/driverCarService';
import accidentService from '../features/accidentService';
import databaseService from '../features/databaseService';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const [watchers, setWatchers] = useState<GridWatcher[]>();
  const [drivers, setDrivers] = useState<GridDriver[]>();
  const [driverCars, setDriverCars] = useState<GridDriverCar[]>();
  const [accidents, setAccidents] = useState<GridAccident[]>();
  const [selectedCar, setSelectedCar] = useState<GridCar>();

  const handleExportData = async () => {
    try {
      const response = await databaseService.exportDatabase();

      const link = document.createElement('a');
      const blob = new Blob([response]);

      link.href = window.URL.createObjectURL(blob);
      link.download = 'database.tar';
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error exporting data', error);
    }
  };

  const handleImportDatabase = async (file: File) => {
    if (file == null) {
      return;
    }
    try {
      const response = await databaseService.importDatabase(file);
      setSaveStatus('success');
    } catch (error) {
      console.error('Error importing database:', error);
      setSaveStatus('error');
    }
  }

  const handleSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
    const selectedCarId = rowSelectionModel.at(0);
    setSelectedCar(cars?.find((car) => car.id === selectedCarId))
  }

  useEffect(() => {
    const fetchWatchers = async () => {
      try {
        const response = await watcherService.getWatchers();
        setWatchers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    const fetchDrivers = async () => {
      try {
        const response = await driverService.getDrivers();
        setDrivers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    const fetchDriverCars = async () => {
      try {
        const response = await driverCarService.getDriverCars();
        setDriverCars(response);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    const fetchAccidents = async () => {
      try {
        const response = await accidentService.getAccidents();
        setAccidents(response);
      } catch (error) {
        console.error('Error fetching accidents:', error);
      }
    };

    fetchWatchers();
    fetchDrivers();
    fetchDriverCars();
    fetchAccidents();
  }, [auth.id])

  useEffect(() => {
    const fetchCertificate = async () => {
    }

    fetchCertificate();
  }, [auth.id])

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSaveStatus(null);
  };

  const saveChanges = async () => {
    try {
      for (const watcher of watchers){
        watcherService.updateWatcher(
          watcher.id,
          watcher.email,
          watcher.phone,
          watcher.watcherName,
          watcher.watcherSurname
        )
      }
      for (const driver of drivers){
        driverService.updateDriver(
          driver.id,
          driver.email,
          driver.phone,
          driver.driverName ,
          driver.driverSurname
        )
      }
      for (const driverCar of driverCars){
        driverCarService.updateDriverCar(
          driverCar.id,
          driverCar.model,
          driverCar.year,
        )
      }
      for (const accident of accidents){
        console.log(accident)
        accidentService.updateAccident(
          accident.id,
          accident.reason,
          accident.place,
          accident.description
        )
      }

      setSaveStatus('success');
    } catch (error) {
      console.error('Error:', error);
      setSaveStatus('error');
    }
  };

  const watcherColumns: GridColDef[] = [
    { field: 'id', headerName: t("watcherId"), width: 170, editable: true },
    { field: 'email', headerName: t("email"), width: 170, editable: true },
    { field: 'watcherName', headerName: t("watcherName"), width: 170, editable: true },
    { field: 'watcherSurname', headerName: t("watcherSurname"), width: 170, editable: true },
    { field: 'phone', headerName: t("phone"), width: 170, editable: true },
    { field: 'role', headerName: t("role"), width: 100, editable: true }
  ];
  const driverColumns: GridColDef[] = [
    { field: 'id', headerName: t("driverId"), width: 170, editable: true },
    { field: 'driverName', headerName: t("driverName"), width: 170, editable: true },
    { field: 'driverSurname', headerName: t("driverSurname"), width: 170, editable: true },
    { field: 'phone', headerName: t("phone"), width: 170, editable: true },
    { field: 'averageMonthlyHeartbeat', headerName: t("averageMonthlyHeartbeat"), width: 170, editable: true },
    { field: 'watcherId', headerName: t("watcherId"), width: 170, editable: true },
    { field: 'email', headerName: t("email"), width: 170, editable: true },
  ];
  const driverCarColumns: GridColDef[] = [
    { field: 'id', headerName: t("carId"), width: 170, editable: true },
    { field: 'model', headerName: t("model"), width: 170, editable: true },
    { field: 'year', headerName: t("year"), width: 170, editable: true },
    { field: 'driverId', headerName: t("driverId"), width: 170, editable: true },
  ];
  const accidentColumns: GridColDef[] = [
    { field: 'id', headerName: t("accidentId"), width: 170, editable: true },
    { field: 'reason', headerName: t("reason"), width: 170, editable: true },
    { field: 'place', headerName: t("place"), width: 170, editable: true },
    { field: 'description', headerName: t("description"), width: 170, editable: true },
  ];



  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom align="center" mt={3} mb={2}>
        {t("adminDashboard")}
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', paddingBottom: '20px' }}>
        <Box mb={2} display="flex" flexDirection="column">
          <Typography variant="h6" gutterBottom mb={2}>
            {t("exportImportData")}
          </Typography>
          <Box mb={2} display="flex" flexDirection="row" gap="20px">
            <Button variant="contained" color="primary" onClick={handleExportData}>
              {t("exportDatabase")}
            </Button>
            <Button
              variant="contained"
              component="label"
            >
              {t("importDatabase")}
              <input
                type="file"
                hidden
                onChange={(event) => handleImportDatabase(event.target.files[0])}
              />
            </Button>
          </Box>
        </Box>
        <Divider />
        <Typography variant="h6" gutterBottom mt={2} mb={2}>
          {t("watchers")}
        </Typography>
        <EditableDataGrid
          toolbar={EditToolbar}
          toolbarProps={{
            setModal: setIsModalOpen,
            rows: watchers || [],
            setRows: setWatchers
          }}
          rows={watchers || []}
          setRows={setWatchers}
          initialColumns={watcherColumns}
        />
        <Divider />
        <Typography variant="h6" gutterBottom mt={2} mb={2}>
          {t("drivers")}
        </Typography>
        <EditableDataGrid
          toolbar={EditToolbar}
          toolbarProps={{
            setModal: setIsModalOpen,
            rows: drivers || [],
            setRows: setDrivers
          }}
          rows={drivers || []}
          setRows={setDrivers}
          initialColumns={driverColumns}
        />
        <Divider />
        <Typography variant="h6" gutterBottom mt={2} mb={2}>
          {t("driverCars")}
        </Typography>
        <EditableDataGrid
          toolbar={EditToolbar}
          toolbarProps={{
            setModal: setIsModalOpen,
            rows: driverCars || [],
            setRows: setDriverCars
          }}
          rows={driverCars || []}
          setRows={setDriverCars}
          initialColumns={driverCarColumns}
        />
        <Divider />
        <Typography variant="h6" gutterBottom mt={2} mb={2}>
          {t("accidents")}
        </Typography>
        <EditableDataGrid
          toolbar={EditToolbar}
          toolbarProps={{
            setModal: setIsModalOpen,
            rows: accidents || [],
            setRows: setAccidents
          }}
          rows={accidents || []}
          setRows={setAccidents}
          initialColumns={accidentColumns}
        />
        <Divider />

        <Box sx={{ mt: 4 }} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" onClick={saveChanges}>
            {t("saveChanges")}
          </Button>
          <Snackbar
            open={saveStatus !== null}
            autoHideDuration={5000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              elevation={6}
              variant="filled"
              severity={(saveStatus === 'success' || saveStatus === null) ? 'success' : 'error'}
              onClose={handleCloseSnackbar}
            >
              {saveStatus === 'success' || saveStatus === null
                ? t("changesSaved")
                : t("errorSavingChanges")
              }
            </Alert>
          </Snackbar>
        </Box>
      </Paper>
      <CarLocationModal open={isModalOpen} handleClose={handleCloseModal} selectedCar={selectedCar} />
    </Container>
  );
};

export default AdminDashboard;