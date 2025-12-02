import axiosConfig from "../config/AxiosConfig";
import type { LoginData } from "../module/Admin/admin.validation";

class AdminService {
    adminLogin = async (data: LoginData) => {
        console.log(data)
        const response = await axiosConfig.post('/admin/login', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(response.data)
        localStorage.setItem('accessToken', response.data.data.actualToken)
        localStorage.setItem('refreshToken', response.data.data.refreshToken)
        return response
    }

    uploadImage = async (data: FormData) => {
        const response = await axiosConfig.post('/admin/image', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response
    }

    uploadVideo = async (data: FormData) => {
        const response = await axiosConfig.post('/admin/video', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response
    }

    deleteVideo = async (id: string) => {
        const response = await axiosConfig.delete(`/admin/video/${id}`);
        return response
    }

    deleteImage = async (id: string) => {
        const response = await axiosConfig.delete(`/admin/image/${id}`);
        return response
    }

    dashboardData = async () => {
        const response = await axiosConfig.get('/admin/dashboard');
        return response;
    }

    homePageData = async () => {
        const response = await axiosConfig.get('/admin/home');
        return response;
    }
}

const adminSvc = new AdminService();

export default adminSvc