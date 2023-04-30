import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WebAppBar from './WebAppBar';
import Reservation from './Reservation';
import PersonalInfo from './PersonalInfo';
import Review from './Review';
import FinalOrder from './finalOrder';
import { Grid } from '@mui/material';
import CustomSnackbar from './component/CustomSnackbar';
import dayjs, { Dayjs } from 'dayjs';
import { myPostBooking } from './api/postBooking';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme({
  palette: {
    primary: {
      main: "#FFC1C1", // 将主色调更改为红色
    },
  },
});

const studioName = '那窩美學 Nawoo'
const location = '台中市北屯區柳陽西街10號'


export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = ['選擇時段', '聯絡資訊', '確認資訊', '預約完成'];

  const [alertMsg, setAlertMsg] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [selectedSlotId, setSelectedSlotId] = React.useState<string>('');
  const [selectedSchedule, setSelectedSchedule] = React.useState<number>(0);
  const [selectedScheduleEndTime, setSelectedScheduleEndTime] = React.useState<number>(0);
  const [selectedBranchId, setSelectedBranchId] = React.useState('');
  const [date, setDate] = React.useState<Dayjs>(dayjs());
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [gender, setGender] = React.useState('1');
  const [countryCode, setCountryCode] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [note, setNote] = React.useState<string>('');
  const [selectedServices, setSelectedServices] = React.useState(['']);
  const [selectedServicesId, setSelectedServicesId] = React.useState(['']);

  const [appointmentDetails, setAppointmentDetails] = React.useState({
    scheduleName: '',
    startTime: new Date(),
    endTime: new Date(),
    location: '',
    details: '',
  });

  const sendOrder = () => {
    // 在這裡執行提交邏輯
    const bookingData = {
      "branchId": selectedBranchId,
      "slotId": selectedSlotId,
      "serviceIds": selectedServicesId,
      "firstName": firstName,
      "lastName": lastName,
      "gender": gender,
      "mobileCountryCode": countryCode,
      "mobile": phone,
      "note": note
    }
    console.log('request: ', bookingData)
    const response = myPostBooking(bookingData);
    console.log('response: ', response)


  };



  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <Reservation
          date={date}
          setDate={setDate}
          selectedBranchId={selectedBranchId}
          setSelectedBranchId={setSelectedBranchId}
          selectedslotId={selectedSlotId}
          setSelectedslotId={setSelectedSlotId}
          setSelectedSchedule={setSelectedSchedule}
          setSelectedScheduleEndTime={setSelectedScheduleEndTime}
        />;
      case 1:
        return <PersonalInfo
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          gender={gender}
          setGender={setGender}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          selectedServicesId={selectedServicesId}
          setSelectedServicesId={setSelectedServicesId}
          phone={phone}
          setPhone={setPhone}
          setCounrtryCode={setCountryCode}
          note={note}
          setNote={setNote}
        />;
      case 2:
        return <Review
          firstName={firstName}
          lastName={lastName}
          gender={gender}
          selectedBranchId={selectedBranchId}
          selectedSchedule={selectedSchedule}
          selectedServices={selectedServices}
          phone={phone}
        />;
      case 3:
        return <Grid item xs={12} sm={6}>
          <FinalOrder
            firstName={firstName}
            lastName={lastName}
            appointmentScheduleName={appointmentDetails.scheduleName}
            appointmentStartTime={appointmentDetails.startTime}
            appointmentEndTime={appointmentDetails.endTime}
            appointmentLocation={appointmentDetails.location}
            appointmentDetails={appointmentDetails.details}
            selectedServices={selectedServices}
            selectedSchedule={selectedSchedule}
            selectedScheduleEndTime={selectedScheduleEndTime}
            phone={phone}
          />
        </Grid>
      default:
        throw new Error('Unknown step');
    }
  }
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 2) {
      setAppointmentDetails({
        ...appointmentDetails, // 将原来的值复制一份
        scheduleName: studioName, // 更新 name 属性的值
        startTime: new Date(selectedSchedule),
        endTime: new Date(selectedScheduleEndTime),
        location: location,
        details: selectedServices.join(', '),
      });
    }

  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const checkNext = () => {

    if (activeStep === 0 && (!selectedBranchId || !selectedSlotId || !selectedSchedule)) {
      setAlertMsg('請完成以上資訊')
      setSnackbarOpen(true);
    } else if (activeStep === 1 && (!selectedServices || !phone || !firstName || !lastName || !gender)) {
      setAlertMsg('請完成以上資訊')
      setSnackbarOpen(true);
    } else if (activeStep === 2) {
      sendOrder()
      handleNext();
    } else {
      handleNext();
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WebAppBar />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            {studioName}
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length - 1 ? (
            <React.Fragment>
              {getStepContent(activeStep)}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button
                    onClick={handleBack}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    上一步
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={checkNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 2 ? '確認預約' : '下一步'}
                </Button>
              </Box>
            </React.Fragment>
          )}
          <CustomSnackbar
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            message={alertMsg}
            severity="error"
            autoHideDuration={3000}
          />
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
