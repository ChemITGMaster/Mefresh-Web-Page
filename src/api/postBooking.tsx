import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import axios, { AxiosResponse } from 'axios';

interface PostData {
    branchId: string;
    slotId: string;
    serviceIds: string[];
    firstName: string;
    lastName: string;
    gender: string;
    mobileCountryCode: string;
    mobile: string;
    note: string;
}

// export const usePostBooking = async (postData: PostData) => {
//     alert('ssss')
//     useEffect(() => {
//         const postBooking = async () => {
//             try {
//                 const response: AxiosResponse = await axios.post('/api/v1/web/book', postData);
//                 console.log('Post created:', response.data);
//                 return response; // 返回請求回應物件
//             } catch (error: any) {
//                 console.error('Failed to create post:', error);
//                 throw error; // 拋出錯誤
//             }
//         };

//         postBooking();
//     }, []);
// };
export const myPostBooking = async (postData: PostData) => {
    alert()
    try {
        const response: AxiosResponse = await axios.post('/api/v1/web/book', postData);
        console.log('Post created:', response.data);
        return response; // 返回請求回應物件
    } catch (error: any) {
        console.error('Failed to create post:', error);
        throw error; // 拋出錯誤
    }
};