import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Button } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { myPostBooking } from './api/postBooking';


export default function Review(
  this: any,
  props: {
    firstName: string,
    lastName: string,
    gender: string,
    selectedBranchId: string,
    selectedSchedule: number | null,
    selectedServices: string[],
    phone: string
  }
) {
  const { firstName, lastName, gender, selectedBranchId, selectedSchedule, selectedServices, phone } = props;

  const datas = [
    { name: '姓名', detail: lastName + firstName },
    { name: '聯絡電話', detail: phone },
    { name: '預約日期', detail: dayjs(selectedSchedule).format('YYYY 年 MM 月 DD 日') },
    { name: '預約時間', detail: dayjs(selectedSchedule).format('A h 點 m 分') },
    { name: '服務項目', detail: selectedServices.join(', ') },
  ];

  return (
    <React.Fragment>
        <Grid container alignItems="center" justifyContent="center">
          {datas.map((datas) => (
            <React.Fragment key={datas.name}>
              <Grid item md={3} xs={4}>
                <Typography gutterBottom>{datas.name}</Typography>
              </Grid>
              <Grid item md={7} xs={8}>
                <Typography gutterBottom>{datas.detail}</Typography>
              </Grid>
            </React.Fragment>
          ))}
      </Grid>
    </React.Fragment>
  );
}
