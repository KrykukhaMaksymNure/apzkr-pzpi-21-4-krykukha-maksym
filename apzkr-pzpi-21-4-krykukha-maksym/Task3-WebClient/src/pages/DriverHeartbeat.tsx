import {
    Box,
    Button,
    Collapse,
    Container,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SelectServicesModal from '../components/SelectServicesModal';
import { DriverInfoDto } from '../interfaces/account';
import driverService from '../features/driverService';

const DriverHeartbeat = () => {
  const { t } = useTranslation();
  const [drivers, setDrivers] = useState<DriverInfoDto[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchDrivers = async () =>{
    try{
      const response = await driverService.getDrivers()
      setDrivers(response)
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  }

  useEffect(() => {

    fetchDrivers();
  }, [drivers]);



  return (
    <Container>
      <Typography variant="h5" gutterBottom align="center" mt={3} mb={2}>
        {t("driverStatus")}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("driverId")}</TableCell>
              <TableCell>{t("driverName")}</TableCell>
              <TableCell>{t("driverSurname")}</TableCell>
              <TableCell>{t("averageMonthlyHeartbeat")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((driver) => (
              <React.Fragment key={driver.id}>
                <TableRow>
                  <TableCell>{driver.id}</TableCell>
                  <TableCell> {driver.driverName} </TableCell>
                  <TableCell> {driver.driverSurname} </TableCell>
                  <TableCell> {driver.averageMonthlyHeartbeat} </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SelectServicesModal open={isModalOpen} onClose={handleCloseModal} tripId={selectedTripId} />
    </Container>
  );
};

export default DriverHeartbeat;
