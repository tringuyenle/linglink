"use client"
import axios, { AxiosInstance } from 'axios';
import {deleteCookie, getCookie, setCookie } from 'cookies-next';

const createAxiosInstance = (): AxiosInstance => {
    let accessToken = getCookie('accessToken');
    let refreshToken = getCookie('refreshToken');
    const instance = axios.create({
        baseURL: 'http://localhost:3000/api/v1',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    // Thêm interceptor cho yêu cầu
    instance.interceptors.request.use(
        async (config) => {
            // Thêm accessToken vào headers của yêu cầu
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Thêm interceptor cho phản hồi
    instance.interceptors.response.use(
        (response) => {
            // Nếu muốn thêm xử lý cho phản hồi, bạn có thể thực hiện ở đây
            return response;
        },
        async (error) => {
            // Nếu lỗi là do access token hết hạn (401 Unauthorized)
            if (error.response && error.response.status === 401) {
                // Thử làm mới access token
                try {
                    const refreshResponse = await axios.post('http://localhost:3000/api/v1/auth/refresh', { refreshToken });
                    const newAccessToken = refreshResponse.data.access_token;

                    // Lưu access token mới vào headers và local storage
                    instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
                    setCookie("accessToken", newAccessToken)

                    // Gửi lại yêu cầu gốc với access token mới
                    const originalRequest = error.config;
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(originalRequest);
                } catch (refreshError) {
                    // Nếu làm mới token thất bại, chuyển người dùng đến trang đăng nhập hoặc thực hiện xử lý khác
                    // Ví dụ: chuyển hướng đến trang đăng nhập
                    deleteCookie("accessToken")
                    deleteCookie("refreshToken")
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }

            // Nếu không phải lỗi 401 hoặc không thể làm mới token, trả về lỗi nguyên thủy
            return Promise.reject(error);
        }
    );

    return instance;
};

export default createAxiosInstance;
