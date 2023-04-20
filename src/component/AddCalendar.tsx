import React from 'react';
import { Button, Grid } from '@mui/material';

type AddToAppleCalendarButtonProps = {
    appointmentStartTime: Date;
    appointmentEndTime: Date;
    appointmentScheduleName: string;
    appointmentLocation: string;
    appointmentDetails: string;
};

const AddToAppleCalendarButton: React.FC<AddToAppleCalendarButtonProps> = ({
    appointmentStartTime,
    appointmentEndTime,
    appointmentScheduleName,
    appointmentLocation,
    appointmentDetails,
}) => {
    const formattedStartTime = appointmentStartTime.toISOString().replace(/-|:|\.\d+/g, '');
    const formattedEndTime = appointmentEndTime.toISOString().replace(/-|:|\.\d+/g, '');

    const calendarUrl = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formattedStartTime}
DTEND:${formattedEndTime}
SUMMARY:${appointmentScheduleName}
LOCATION:${appointmentLocation}
DESCRIPTION:${appointmentDetails}
END:VEVENT
END:VCALENDAR`;

    return (
        <Button size="small" variant="contained" color="primary" href={calendarUrl} download={`${appointmentScheduleName}.ics`}>
            加入 Apple 日曆
        </Button>
    );
};


type AddToGoogleCalendarButtonProps = {
    appointmentStartTime: Date;
    appointmentEndTime: Date;
    appointmentScheduleName: string;
    appointmentLocation: string;
    appointmentDetails: string;
};

const AddToGoogleCalendarButton: React.FC<AddToGoogleCalendarButtonProps> = ({
    appointmentStartTime,
    appointmentEndTime,
    appointmentScheduleName,
    appointmentLocation,
    appointmentDetails,
}) => {
    const formattedStartTime = appointmentStartTime.toISOString().replace(/-|:|\.\d+/g, '');
    const formattedEndTime = appointmentEndTime.toISOString().replace(/-|:|\.\d+/g, '');

    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${appointmentScheduleName}&dates=${formattedStartTime}/${formattedEndTime}&details=${appointmentDetails}&location=${appointmentLocation}`;

    return (
        <Button size="small" variant="contained" color="primary" href={calendarUrl} target="_blank" rel="noopener noreferrer">
            加入 Google 日曆
        </Button>
    );
};


export { AddToAppleCalendarButton, AddToGoogleCalendarButton };


