import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import 'react-phone-input-2/lib/material.css'
import { MuiTelInput } from 'mui-tel-input'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Snackbar, Alert, Radio, FormLabel, RadioGroup } from '@mui/material';
import { useFetchServices } from "./api/getService";
import CustomSnackbar from './component/CustomSnackbar';

export default function Reservation(
  this: any,
  props: {
    firstName: string,
    setFirstName: React.Dispatch<React.SetStateAction<string>>,
    lastName: string,
    setLastName: React.Dispatch<React.SetStateAction<string>>,
    gender: string,
    setGender: React.Dispatch<React.SetStateAction<string>>,
    selectedServices: string[],
    setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>,
    setSelectedServicesId: React.Dispatch<React.SetStateAction<string[]>>,
    phone: string,
    setPhone: React.Dispatch<React.SetStateAction<string>>,
  }
) {
  const { firstName, setFirstName, lastName, setLastName, gender, setGender, selectedServices, setSelectedServices, phone, setPhone } = props;

  const { services, isLoading, error } = useFetchServices('41475937-7bf8-4f8f-b06b-ef714b165c68');

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState('');
  const handleAddService = () => {
    if (selectedServices.length >= 2) { // 若服務項目已經有兩個，則不進行新增操作
      setAlertMsg('已達單次服務上限')
      setSnackbarOpen(true);
      return;
    }
    setSelectedServices([...selectedServices, '']); // 新增一個空的服務項目
  };

  const handleDeleteService = (index: number) => {
    if (selectedServices.length < 2) { // 若服務項目僅剩一個或沒有，則不允許刪除
      setAlertMsg('請至少選擇一項服務')
      setSnackbarOpen(true);
      return;
    }
    const newServices = [...selectedServices];
    newServices.splice(index, 1); // 刪除指定位置的服務項目
    setSelectedServices(newServices);
  };

  const handleChangeService = (index: number, event: React.ChangeEvent<{ value: string }>) => {
    const newServices = [...selectedServices];
    newServices[index] = event.target.value; // 更新指定位置的服務項目的值  
    setSelectedServices(newServices);
  };


  const handleGenderChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setGender(event.target.value);
  };

  // const countryCode = phoneNumber.match(/^\+\d+/)?.[0]; // 使用正則表達式提取國碼部分
  // const otherDigits = phoneNumber.replace(/^\+\d+/, '').trim(); // 移除國碼部分後的其他數字

  return (

    <React.Fragment>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6} md={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="姓"
            fullWidth
            // autoComplete="given-name"
            variant="outlined"
            size="small"
            value={lastName} // 將 lastName 綁定到 TextField 的 value 屬性
            onChange={(event) => setLastName(event.target.value)} // 設定 onChange 處理函數，調用 setLastName 來更新 lastName
          />

        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="名"
            fullWidth
            // autoComplete="family-name"
            variant="outlined"
            size="small"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} container alignItems="center">
          <FormControl component="fieldset">
            <RadioGroup row aria-label="gender" name="gender" value={gender} onChange={handleGenderChange}>
              <FormControlLabel value="1" control={<Radio size="small" />} label="先生" />
              <FormControlLabel value="2" control={<Radio size="small" />} label="小姐" />
              <FormControlLabel value="3" control={<Radio size="small" />} label="其他" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <MuiTelInput
            size="small"
            variant="outlined"
            defaultCountry="TW"
            onlyCountries={['TW', 'JP']}
            value={phone}
            onChange={(myPhone) => setPhone(myPhone)}
            style={{ width: '100%' }} />
        </Grid>

        <Grid item container spacing={2} xs={12} md={12}>
          <CustomSnackbar
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            message={alertMsg}
            severity="error"
            autoHideDuration={3000}
          />

          {selectedServices.map((service, index) => (
            <Grid item container spacing={2} xs={12} md={12} key={index} alignItems="center">
              <Grid item md={10} xs={9}>
                <FormControl fullWidth size="small">
                  <InputLabel id={`service-label-${index}`}>服務項目</InputLabel>
                  <Select
                    labelId={`service-label-${index}`}
                    value={service}
                    label="服務項目"
                    onChange={(event) => {
                      handleChangeService(index, event as React.ChangeEvent<{ value: string }>)
                    }}
                  >
                    {services.map((service) => (
                      <MenuItem key={service.serviceId} value={service.serviceName}>
                        {service.serviceName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={1} xs={1}>
                <IconButton onClick={() => handleDeleteService(index)}>
                  <DeleteIcon />
                </IconButton>
                {/* <Button variant="outlined" onClick={() => handleDeleteService(index)}>-</Button> */}
              </Grid>
              <Grid item md={1} xs={1}>
                <IconButton onClick={() => handleAddService()}>
                  <AddIcon />
                </IconButton>
                {/* <Button variant="contained" onClick={handleAddService}>+</Button> */}
              </Grid>
            </Grid>
          ))}

        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            id="note"
            name="note"
            label="備註(想對店家說的話)"
            fullWidth
            // autoComplete="shipping address-line1"
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
    </React.Fragment >
  );
}
