import { useState, useEffect } from "react";
import axios from "axios";

interface Schedule {
    slotId: string;
    startTime: number;
    endTime: number;
}

interface ApiResponse {
    code: number;
    responseTime: number;
    data: Schedule[];
    message: string | null;
}


export const useFetchSchedules = (branchId: string, startDate: number | null, endDate: number | null) => {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [isLoadingSchedules, setIsLoadingSchedules] = useState(false);
    const [schedulesError, setSchedulesError] = useState(null);

    useEffect(() => {
        const fetchSchedules = async () => {
            setIsLoadingSchedules(true);
            try {
                const response = await axios.get<ApiResponse>(`/api/v1/web/branch/availableSlots?branchId=${branchId}&startDate=${startDate}&endDate=${endDate}`);
                setSchedules(response.data.data);
            } catch (error: any) {
                setSchedulesError(error);
            } finally {
                setIsLoadingSchedules(false);
            }
        };

        fetchSchedules();
    }, [branchId, startDate, endDate]);

    return { schedules, isLoadingSchedules, schedulesError };
};
