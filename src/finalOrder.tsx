import React from 'react';
import { Button, Grid, ButtonGroup, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { AddToAppleCalendarButton, AddToGoogleCalendarButton } from './component/AddCalendar';

export default function AppointmentConfirmation(
    this: any,
    props: {
        firstName: string,
        lastName: string,
        appointmentStartTime: Date,
        appointmentEndTime: Date,
        appointmentScheduleName: string,
        appointmentLocation: string,
        appointmentDetails: string,
        phone: string,
        selectedServices: string[],
        selectedSchedule: number | null
    }
) {
    const { firstName, lastName, appointmentStartTime, appointmentEndTime, appointmentScheduleName, appointmentLocation, appointmentDetails, phone, selectedServices, selectedSchedule } = props;


    const datas = [
        { name: '姓名', detail: lastName + firstName },
        { name: '聯絡電話', detail: phone },
        { name: '預約日期', detail: dayjs(selectedSchedule).format('YYYY 年 MM 月 DD 日') },
        { name: '預約時間', detail: dayjs(selectedSchedule).format('A h 點 m 分') },
        { name: '服務項目', detail: selectedServices.join(', ') },
        { name: '店家位置', detail: '北屯區柳陽西街10號1樓(近崇德文心商圈)' },
    ];


    return (
        <Grid>
            {/* <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                預約完成
            </Typography> */}
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
            <br />

            <Grid container spacing={2} justifyContent="center">
                <Grid item md={5} xs={6}>
                    <ButtonGroup
                        sx={{ "& > button": { margin: "2px" } }}
                        fullWidth
                        variant="outlined"
                    >
                        <AddToGoogleCalendarButton
                            appointmentStartTime={appointmentStartTime}
                            appointmentEndTime={appointmentEndTime}
                            appointmentScheduleName={appointmentScheduleName}
                            appointmentLocation={appointmentLocation}
                            appointmentDetails={appointmentDetails}
                        />
                    </ButtonGroup>
                </Grid>
                <Grid item md={5} xs={6}>
                    <ButtonGroup
                        sx={{ "& > button": { margin: "2px" } }}
                        fullWidth
                        variant="outlined"
                    >
                        <AddToAppleCalendarButton
                            appointmentStartTime={appointmentStartTime}
                            appointmentEndTime={appointmentEndTime}
                            appointmentScheduleName={appointmentScheduleName}
                            appointmentLocation={appointmentLocation}
                            appointmentDetails={appointmentDetails}
                        />
                    </ButtonGroup>
                </Grid>
            </Grid>
            <br />

            <Grid container alignItems="center" justifyContent="center">
                <Grid item md={10} xs={12}>
                    <Typography gutterBottom>
                        小叮嚀事項：
                    </Typography>
                </Grid>
                <Grid item md={10} xs={12}>
                    <ol>
                        <li>
                            <Typography gutterBottom>前一週勿修整眉毛❌ <br />
                                眼皮盡量避免外力刺激 <br />
                                嘴唇可去角質，充足保濕</Typography>
                        </li>
                        <li>
                            <Typography gutterBottom>勿強光日曬以致皮膚敏感❌</Typography>
                        </li>
                        <li>
                            <Typography gutterBottom>前一晚忌飲酒❌</Typography>
                        </li>
                        <li>
                            <Typography gutterBottom>可帶妝前來🉑️</Typography>
                        </li>
                        <li>
                            <Typography gutterBottom>🅿️河邊車格、大德室內停車場</Typography>
                        </li>
                    </ol>
                </Grid>
            </Grid>
        </Grid>
    );
};
