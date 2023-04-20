import { useState, useEffect } from "react";
import axios from "axios";

interface Service {
    serviceId: string;
    serviceName: string;
}

interface ApiResponse {
    code: number;
    responseTime: number;
    data: Service[];
    message: string | null;
}

export const useFetchServices = (branchId: string) => {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get<ApiResponse>(`/api/v1/web/branch/services?branchId=${branchId}`);
                setServices(response.data.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, []);

    return { services, isLoading, error };
};
