import { useState, useEffect } from "react";
import axios from "axios";

interface Branch {
  branchId: string;
  branchName: string;
  fullMobile: string;
  email: string | null;
  postcode: number;
  country: string;
  state: string;
  city: string;
  address: string;
  geoLocation: string;
  businessHours: {
    Mon: string;
    Tue: string;
    Wed: string;
    Thu: string;
    Fri: string;
    Sat: string;
    Sun: string;
  };
}

interface Business {
  businessId: string;
  businessName: string;
  introduction: string;
  branches: Branch[];
}

interface ApiResponse {
  code: number;
  responseTime: number;
  data: Business;
  message: string | null;
}

export const useFetchBusiness = (businessId: string) => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoadingBusiness, setIsLoadingBusiness] = useState(false);
  const [businessError, setBusinessError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      setIsLoadingBusiness(true);
      try {
        const response = await axios.get<ApiResponse>(`/api/v1/web/businessInfo?businessId=${businessId}`);
        setBusiness(response.data.data);
      } catch (error: any) {
        setBusinessError(error.message);
      } finally {
        setIsLoadingBusiness(false);
      }
    };

    fetchBusiness();
  }, [businessId]);

  return { business, isLoadingBusiness, businessError };
};


