import { Form, Input, Button, message, Space } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import type { LoginData } from './admin.validation';
import Logo from '../../assets/Himalaya logo.png'
import LoginSchema from './admin.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import adminSvc from '../../service/admin.service';

// Load Tailwind CSS for utility classes on the main layout
const containerStyles = {
    fontFamily: 'Inter, sans-serif',
    minHeight: '100vh',
    // Replicating the dark, themed background
    backgroundColor: '#0d1223',
    backgroundImage: 'linear-gradient(135deg, #0d1223 0%, #1c2744 50%, #0d1223 100%)',
};

// Custom styles for the card to match the dark theme and blur effect
const cardStyles = {
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Transparent white
    border: '1px solid rgba(255, 255, 255, 0.1)',
};

// Ant Design components have built-in styling, but we use Tailwind for the main layout

const AdminLogin = () => {
    const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(LoginSchema)
    });

    const onSubmit = async (data: LoginData) => {
        // Simulate an API call delay for login
        await new Promise(resolve => setTimeout(resolve, 1500));

        const response = await adminSvc.adminLogin(data)

        if (response.data.code === 200) {
            message.success('Login Successful! Redirecting to dashboard...');
            window.location.href = '/v1/admin/dashboard'; 
        } else {
            message.error("Invalid credentials.Please try again.")
        }
    };

    const handleRedirect = () => {
        message.info('Redirecting to the main Homepage...');
        // In a real application, you would redirect:
        window.location.href = '/';
    };

    return (
        <div style={containerStyles} className="flex items-center justify-center p-4">
            {/* Login Container Card */}
            <div
                style={cardStyles}
                className="w-full max-w-sm md:max-w-md p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl transition-all duration-300"
            >
                {/* Header Section */}
                <div className="text-center mb-8 w-full items-center justify-center flex flex-col">
                    <img src={Logo} alt="" className='w-[15vw] h-[15vw] md:w-[7vw] md:h-[7vw] lg:w-[5vw] lg:h-[5vw]' />
                    <h1 className="mt-4 text-3xl font-extrabold text-white">
                        Admin Access
                    </h1>
                    <p className="mt-2 text-sm text-gray-300">
                        Himalayan Audio & Video Production
                    </p>
                </div>

                {/* Ant Design Form integrated with react-hook-form */}
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Email/Username Input */}
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: 'Email or Username is required' }}
                        render={({ field }) => (
                            <Form.Item
                                label={<span className="text-gray-300">Email or Username</span>}
                                validateStatus={errors.email ? 'error' : ''}
                                help={errors.email ? errors.email.message : null}
                                className="mb-0" // Remove default vertical spacing of Form.Item
                            >
                                <Input
                                    {...field}
                                    placeholder="admin@himalayanproduction.com"
                                    size="large"
                                    // Custom styling overrides for dark theme appearance
                                    style={{
                                        backgroundColor: 'rgba(51, 65, 85, 0.5)',
                                        color: 'white',
                                        borderColor: '#475569'
                                    }}
                                />
                            </Form.Item>
                        )}
                    />

                    {/* Password Input */}
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters'
                            }
                        }}
                        render={({ field }) => (
                            <Form.Item
                                label={<span className="text-gray-300">Password</span>}
                                validateStatus={errors.password ? 'error' : ''}
                                help={errors.password ? errors.password.message : null}
                                className="mb-0" // Remove default vertical spacing of Form.Item
                            >
                                <Input.Password
                                    {...field}
                                    placeholder="••••••••"
                                    size="large"
                                    // Custom styling overrides for dark theme appearance
                                    style={{
                                        backgroundColor: 'rgba(51, 65, 85, 0.5)',
                                        color: 'white',
                                        borderColor: '#475569'
                                    }}
                                />
                            </Form.Item>
                        )}
                    />

                    {/* Actions (Buttons) */}
                    <Space direction="vertical" className="w-full pt-4">
                        {/* Primary Login Button (AntD type="primary") */}
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={isSubmitting}
                            className="w-full text-base font-semibold"
                            style={{ backgroundColor: '#3b82f6', borderColor: '#3b82f6', height: 'auto', padding: '10px 15px' }}
                        >
                            {isSubmitting ? 'Logging In...' : 'Secure Admin Login'}
                        </Button>

                        {/* Extra Homepage Button (AntD type="default" with custom colors) */}
                        <Button
                            type="default"
                            size="large"
                            onClick={handleRedirect}
                            className="w-full text-base font-medium"
                            style={{
                                backgroundColor: 'transparent',
                                color: '#60a5fa',
                                borderColor: '#3b82f6',
                                height: 'auto',
                                padding: '10px 15px'
                            }}
                        >
                            Go to Homepage
                        </Button>
                    </Space>

                    {/* Footer Link */}
                    <div className="mt-6 text-center">

                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AdminLogin;