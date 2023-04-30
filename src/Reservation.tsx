import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import 'react-phone-input-2/lib/material.css'
import { Button, ButtonGroup } from '@mui/material';
import { useFetchSchedules } from './api/getAvailableSlots';
import { useFetchBusiness } from './api/getBusinessInfo';

import 'dayjs/locale/zh-tw'; // 引入中文語言設置

dayjs.locale('zh-tw'); // 設置 dayjs 的語言為中文

export default function Reservation(
  this: any,
  props: {
    date: Dayjs,
    setDate: React.Dispatch<React.SetStateAction<Dayjs>>,
    selectedBranchId: string,
    setSelectedBranchId: React.Dispatch<React.SetStateAction<string>>,
    selectedslotId: string,
    setSelectedslotId: React.Dispatch<React.SetStateAction<string>>,
    setSelectedSchedule: React.Dispatch<React.SetStateAction<number>>,
    setSelectedScheduleEndTime: React.Dispatch<React.SetStateAction<number>>,
  }
) {
  // const [date, setDate] = React.useState<Dayjs>(dayjs());
  const tomorrow = dayjs().add(1, 'day').startOf('day');
  const { business, isLoadingBusiness, businessError } = useFetchBusiness('e0136bde-602e-46b2-8a77-a553da947bba');
  const { date, setDate, selectedBranchId, setSelectedBranchId, selectedslotId, setSelectedslotId, setSelectedSchedule, setSelectedScheduleEndTime } = props;
  const [selectedBranchIndex, setSelectedBranchIndex] = React.useState(0);

  const generateBranchButtons = () => {

    const handleBranchButtonClick = (branchId: string) => {
      setSelectedBranchId(branchId);
    };
    if (isLoadingBusiness) {
      return <div>Loading...</div>;
    }

    // if (businessError) {
    //   return <div>Error: {businessError.message}</div>;
    // }

    if (business != null) {

      return business.branches.map((value, index) => (
        <Grid item key={value.branchId}>
          <ButtonGroup
            sx={{ "& > button": { margin: "2px" } }}
            fullWidth
            variant="outlined"
          >
            <Button
              onClick={() => {
                handleBranchButtonClick(value.branchId);
                setSelectedBranchIndex(index);
              }}
              variant={selectedBranchId === value.branchId ? 'contained' : 'outlined'}
            >
              {value.branchName}
            </Button>
          </ButtonGroup>
        </Grid>
      ));
    }

  };

    // const { schedules, isLoadingSchedules, schedulesError } = useFetchSchedules(selectedBranchId, startTime, endTime);
    const { schedules, isLoadingSchedules, schedulesError } = useFetchSchedules(selectedBranchId, date.startOf('day').valueOf(), date.endOf('day').valueOf());
  // const { schedules, isLoadingSchedules, schedulesError } = useFetchSchedules(selectedBranchId, 1681660800000, 1681743600000);

  const generateTimeButtons = () => {
    const handleScheduleButtonClick = (slotId: string, startTime: number, endTime: number) => {
      setSelectedslotId(slotId);
      setSelectedSchedule(startTime)
      setSelectedScheduleEndTime(endTime)
    };

    if (isLoadingSchedules) {
      return <div>Loading...</div>;
    }


    if (selectedBranchId == '') {
      return <div>請選擇分店</div>;
    }


    if (!schedules || schedules.length == 0) {
      // TODO 回到這一頁若沒選時間可以往下一步
      // setSelectedslotId('');
      return <div>無可預約時間</div>;
    }


    // TODO 
    if (businessError) {
      return <div>Error: 有問題</div>;
      // return <div>Error: {businessError.message}</div>;
    }

    return (
      <Grid container spacing={2}  justifyContent="center">
        {schedules.map((schedule) => (
          <Grid item xs={3} key={schedule.slotId}>
            <ButtonGroup
              sx={{ "& > button": { margin: "2px" } }}
              fullWidth
              variant="outlined"
            >
              <Button
                onClick={() => handleScheduleButtonClick(schedule.slotId, schedule.startTime, schedule.endTime)}
                variant={selectedslotId === schedule.slotId ? "contained" : "outlined"}
              >
                {dayjs(schedule.startTime).format('HH:mm')}
              </Button>
            </ButtonGroup>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <React.Fragment>
      <Grid item justifyContent="center">
        <Grid container spacing={0} justifyContent="center">
          {generateBranchButtons()}
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale={dayjs.locale()} sx={{ color: "#E72000" }}>
            <Grid container spacing={0} justifyContent="center">
              <Grid item xs={12}>
                <CalendarPicker
                  minDate={tomorrow}
                  date={date}
                  onChange={(newDate) => {
                      setDate(newDate as dayjs.Dayjs)
                    }
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={0} justifyContent="center">
              {generateTimeButtons()}
            </Grid>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
