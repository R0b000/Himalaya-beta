import * as yup from 'yup'
import { type FC } from 'react'

export interface LoginData {
    email: string,
    password: string
}

const LoginSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is missing"),
    password: yup.string().required('Password is missing')
});

/** Interface for the statistical data block. */
export interface IDashboardStats {
    totalImages: number;
    totalVideos: number;
    lastLogin: string;
}
/** Configuration for the simulated message utility. */
export interface IMessageConfig {
    content: string;
    key?: string;
    duration?: number;
}

export interface IStatCardProps {
    title: string;
    value: number | string;
    icon: FC;
    color: string;
}

export interface UploadImageFormInputs {
    title: string;
    fileType: 'image';
    file: File[] | null;
}

export interface UploadVideoFormInputs {
    title: string;
    fileType: 'video';
    file: File[] | null;
}

export interface IUploadModalProps {
    open: boolean;
    onClose: () => void;
    onUploadSuccess: () => void;
}

export default LoginSchema