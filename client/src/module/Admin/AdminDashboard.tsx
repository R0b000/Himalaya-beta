import React, { useState, useEffect, useCallback, type FC, useRef } from 'react';
import { Button, Modal, message, Upload, Form, Select, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { AiOutlineAreaChart, AiOutlineDelete, AiOutlineFastForward, AiOutlineLayout, AiOutlineLogout, AiOutlineMuted, AiOutlinePauseCircle, AiOutlinePicture, AiOutlinePlayCircle, AiOutlineSound, AiOutlineUpload, AiOutlineVideoCamera } from 'react-icons/ai';
import type { IStatCardProps, IUploadModalProps, UploadImageFormInputs, UploadVideoFormInputs } from './admin.validation';
import adminSvc from '../../service/admin.service';
import type { RcFile } from 'antd/es/upload';

const { Dragger } = Upload;
const { Option } = Select;

const StatCard: FC<IStatCardProps> = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
        <div className="flex items-center space-x-4">
            <div className={`text-4xl ${color}`}>{<Icon />}</div>
            <div>
                <h5 className="text-sm font-medium text-gray-500 m-0">{title}</h5>
                <h2 className="text-3xl font-bold text-gray-800 m-0">{value}</h2>
            </div>
        </div>
    </div>
);

type UploadFormInputs = UploadImageFormInputs | UploadVideoFormInputs;

const UploadModal: FC<IUploadModalProps> = ({ open, onClose, onUploadSuccess }) => {

    const { handleSubmit, control, watch, reset, formState: { isSubmitting, errors } } = useForm<UploadFormInputs>({
        defaultValues: {
            title: '',
            fileType: 'image',
            file: [],
        }
    });

    const fileType = watch('fileType');
    const acceptedTypes = fileType === 'image' ? 'images' : 'video';

    const validateFile = (value: File[] | null) => {
        const fileArray = Array.isArray(value) ? value : [];

        if (fileArray.length === 0)
            return `Please select at least one ${fileType} file to upload.`;

        if (fileType === 'image' && fileArray.length > 10)
            return 'You can upload a maximum of 10 images at a time.';

        if (fileType === 'video' && fileArray.length > 1)
            return 'You can upload only 1 video at a time.';

        return true;
    };

    const onSubmit = async (data: UploadFormInputs) => {
        const filesToUpload = data.file;
        if (fileType === 'image') {
            if (!filesToUpload || filesToUpload.length === 0) return;
        } else {
            if (!filesToUpload) return;
        }

        const uploadType = data.fileType;
        const uploadMsgKey = 'uploadKey';

        const backendFieldName = uploadType === 'image' ? 'images' : 'video';

        let formData = new FormData();
        formData.append('title', data.title);
        filesToUpload.forEach(file => {
            formData.append(backendFieldName, file);
        });

        console.log('dfasdfas', ...formData.entries())

        try {
            let response;
            if (uploadType === 'image') {
                response = await adminSvc.uploadImage(formData);
            } else {
                response = await adminSvc.uploadVideo(formData);
            }

            if (response.status === 200) {
                message.success({
                    content: `${filesToUpload.length} ${uploadType} uploaded successfully!`,
                    key: uploadMsgKey,
                    duration: 3
                });
                reset();
                onClose();
                onUploadSuccess();
            } else {
                const errorMessage = (response as any)?.data?.message || 'Server error';
                message.error({
                    content: `Upload failed: ${errorMessage}`,
                    key: uploadMsgKey,
                    duration: 5
                });
            }
        } catch (error) {
            console.error(`Error uploading ${uploadType}:`, error);
            message.error({
                content: `Failed to upload ${uploadType}. Network error.`,
                key: uploadMsgKey,
                duration: 5
            });
        }
    };

    return (
        <Modal
            title="Upload New Media"
            open={open}
            onCancel={onClose}
            footer={null}
            destroyOnClose={true}
        >
            <Form
                layout="vertical"
                onFinish={handleSubmit(onSubmit)}
                className="mt-4"
            >
                {/* 1. File Type Selection */}
                <Controller
                    name="fileType"
                    control={control}
                    render={({ field }) => (
                        <Form.Item label="Media Type">
                            <Select
                                {...field}
                                style={{ width: 120 }}
                                disabled={isSubmitting}
                            >
                                <Option value="image">Image</Option>
                                <Option value="video">Video</Option>
                            </Select>
                        </Form.Item>
                    )}
                />

                {/* 2. Title Input Field */}
                <Controller
                    name="title"
                    control={control}
                    rules={{ required: 'Title is required' }}
                    render={({ field }) => (
                        <Form.Item
                            label="Title"
                            required
                            validateStatus={errors.title ? 'error' : ''}
                            help={errors.title ? errors.title.message : 'Enter a title for the uploaded file(s).'}
                        >
                            <Input
                                {...field}
                                placeholder={`Enter title for the ${fileType} upload`}
                                disabled={isSubmitting}
                            />
                        </Form.Item>
                    )}
                />

                {/* 3. File Upload Dragger */}
                <Controller
                    name="file"
                    control={control}
                    rules={{ validate: validateFile }}
                    render={({ field }) => {
                        const fileList = field.value
                            ? field.value.map((f, i) => ({
                                uid: `${f.name}-${i}`,
                                name: f.name,
                                status: 'done' as const,
                                originFileObj: f as unknown as RcFile,
                            }))
                            : [];

                        return (
                            <Form.Item
                                label="File Upload"
                                required
                                validateStatus={errors.file ? 'error' : ''}
                                help={errors.file ? errors.file.message : `Drag and drop or click to upload up to 10 ${fileType} files.`}
                            >
                                <Dragger
                                    multiple={fileType === "image"}
                                    maxCount={fileType === "image" ? 10 : 1}
                                    accept={acceptedTypes}
                                    beforeUpload={() => false}
                                    fileList={fileList}
                                    onChange={(info) => {
                                        const files = info.fileList.map(f => f.originFileObj as File);
                                        field.onChange(files);
                                    }}
                                    onRemove={(file) => {
                                        const updated = fileList.filter(f => f.uid !== file.uid);
                                        field.onChange(updated.map(f => f.originFileObj as File));
                                    }}
                                >
                                    <p className="ant-upload-drag-icon">
                                        {fileType === 'image'
                                            ? <AiOutlinePicture className="text-4xl text-blue-500" />
                                            : <AiOutlineVideoCamera className="text-4xl text-green-500" />}
                                    </p>
                                    <p className="ant-upload-text">Click or drag files to this area to upload</p>
                                    <p className="ant-upload-hint">
                                        Support for <strong>multiple</strong> {fileType} uploads.
                                    </p>
                                </Dragger>
                            </Form.Item>
                        );
                    }}
                />

                {/* 4. Submit Button */}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        className="w-full mt-4"
                    >
                        {isSubmitting ? 'Uploading...' : `Submit Upload`}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const VideoPlayer = ({ src }: { src: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [muted, setMuted] = useState(true);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const forward = () => {
        const video = videoRef.current;
        if (video) video.currentTime += 5; // forward 5 seconds
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (video) {
            video.muted = !video.muted;
            setMuted(video.muted);
        }
    };

    return (
        <div className="w-full flex flex-col ">
            <video
                ref={videoRef}
                src={src}
                className="w-auto h-auto object-cover bg-gray-200"
                muted={true}
                autoPlay
            ></video>

            {/* Controls */}
            <div className="flex items-center shrink-0 justify-around p-2 bg-gray-900 text-white">
                <button onClick={togglePlay}>
                    {isPlaying ? (
                        <AiOutlinePauseCircle size={26} />
                    ) : (
                        <AiOutlinePlayCircle size={26} />
                    )}
                </button>

                <button onClick={forward}>
                    <AiOutlineFastForward size={26} />
                </button>

                <button onClick={toggleMute}>
                    {muted ? (
                        <AiOutlineMuted size={26} />
                    ) : (
                        <AiOutlineSound size={26} />
                    )}
                </button>
            </div>
        </div>
    );
};

// --- Main Dashboard Component (Unchanged) ---
const AdminDashboard: FC = () => {
    // Initial state is strictly typed
    const [data, setData] = useState<any>({ images: [], videos: [], stats: { totalImages: 0, totalVideos: 0, lastLogin: 'N/A' } });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [confirmType, setConfirmType] = useState<'image' | 'video' | null>(null);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = 'https://placehold.co/400x300/D1D5DB/4B5563?text=Media+Error';
    };

    // --- Data Fetching ---
    const fetchDashboardData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await adminSvc.dashboardData();
            if (response && response?.data) {
                setData({
                    images: response.data.data.imageData || [],
                    videos: response.data.data.videoData || [],
                    stats: response.data.stats || { totalImages: 0, totalVideos: 0, lastLogin: 'N/A' },
                });
            }
            message.success('Dashboard data loaded successfully.');
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            message.error('Failed to load dashboard data. Check network and service.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        let token = localStorage.getItem('accessToken')

        if(!token) {
            window.location.href = '/admin'
        }
    }, [localStorage.getItem('accessToken')])

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    console.log(data)

    // --- Handlers ---
    const handleLogout = async () => {
        try {
            message.success('Logged out successfully.');
            // Simulate client-side token clearing and redirection
            setTimeout(() => {
                window.location.href = '/'
            }, 500);
            localStorage.clear();
        } catch (error) {
            console.error("Logout failed:", error);
            message.error('Logout failed.');
        }
    };

    const onDelete = async (type: 'image' | 'video', id: string) => {
        const loadingKey = 'delete' + id;
        message.loading({ content: `Deleting ${type}...`, key: loadingKey, duration: 0 });
        console.log(id)
        try {
            let response;
            if (type === 'image') {
                response = await adminSvc.deleteImage(id);
            } else {
                response = await adminSvc.deleteVideo(id);
            }

            if (response.status === 200) {
                message.success({ content: `${type} deleted successfully!`, key: loadingKey, duration: 3 });
                fetchDashboardData();
            } else {
                message.error({ content: `Failed to delete ${type}: ${response.data.message}`, key: loadingKey, duration: 3 });
            }
        } catch (error) {
            console.error(`Error deleting ${type}:`, error);
            message.error({ content: `Failed to delete ${type}.`, key: loadingKey, duration: 3 });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white px-6 py-4 border-b border-gray-200 shadow-md">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <div className="flex items-center space-x-2">
                        <AiOutlineAreaChart className="text-3xl text-blue-600" />
                        <h1 className="text-2xl font-bold m-0">
                            Admin <span className="text-blue-600">Panel</span>
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button
                            type="primary"
                            size="large"
                            icon={<AiOutlineUpload />}
                            onClick={() => setIsUploadModalOpen(true)}
                            className="flex items-center justify-center font-semibold"
                        >
                            Upload Media
                        </Button>
                        <Button
                            size="large"
                            danger
                            type="default"
                            icon={<AiOutlineLogout />}
                            onClick={handleLogout}
                            className="flex items-center justify-center font-semibold"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <main className="p-6">
                <div className="max-w-7xl mx-auto">
                    {isLoading ? (
                        <div className="text-center p-12">
                            <AiOutlineLayout className="inline-block animate-spin h-12 w-12 text-blue-600" />
                            <p className="mt-4 text-xl font-medium text-gray-700">Loading Dashboard...</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <StatCard title="Total Images" value={data.images.length} icon={AiOutlinePicture} color="text-blue-600" />
                                <StatCard title="Total Videos" value={data.videos.length} icon={AiOutlineVideoCamera} color="text-green-600" />
                                <StatCard title="Last Activity" value={data.stats.lastLogin} icon={AiOutlineLogout} color="text-yellow-600" />
                            </div>

                            <section>
                                <h2 className="text-2xl font-semibold mt-6 mb-4">Images ({data.images.length})</h2>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    {data.images.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                            {data.images.map((img: any) => (
                                                (img.images.map((item: any) => (
                                                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                                                        <div className="h-44 overflow-hidden flex items-center justify-center bg-gray-100">
                                                            <img
                                                                alt={item._id}
                                                                src={item.secure_url}
                                                                className="w-auto h-auto object-cover"
                                                                onError={handleImageError}
                                                            />
                                                        </div>
                                                        <div className="border-t p-2 flex justify-center">
                                                            <Button
                                                                type="link"
                                                                danger
                                                                icon={<AiOutlineDelete />}
                                                                onClick={() => {
                                                                    setConfirmType('image');
                                                                    setSelectedId(img._id);
                                                                    setIsConfirmOpen(true);
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )))
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-center py-6">No images found. Use the Upload button to add media.</p>
                                    )}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mt-6 mb-4">Vidoes ({data.videos.length})</h2>
                                <div className="p-6 h-auto rounded-lg shadow-md bg-white flex flex-col">
                                    {data.images.length > 0 ? (
                                        <div className="flex flex-col gap-6 w-auto h-full">
                                            {data.videos.map((img: any) => (
                                                <div className="bg-white h-full shrink-0 flex flex-col w-full rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                                                    <div className="h-full w-auto overflow-hidden flex items-center justify-center bg-gray-100">
                                                        <VideoPlayer src={img.secure_url} />
                                                    </div>
                                                    <div className="border-t p-2 flex justify-center">
                                                        <Button
                                                            type="link"
                                                            danger
                                                            icon={<AiOutlineDelete />}
                                                            onClick={() => {
                                                                setConfirmType('video');
                                                                setSelectedId(img._id);
                                                                setIsConfirmOpen(true);
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-center py-6">No video found. Use the Upload button to add media.</p>
                                    )}
                                </div>
                            </section>

                            <Modal
                                title="Confirm Deletion"
                                open={isConfirmOpen}
                                onCancel={() => setIsConfirmOpen(false)}
                                footer={[
                                    <Button key="back" onClick={() => setIsConfirmOpen(false)}>No</Button>,
                                    <Button
                                        key="submit"
                                        type="primary"
                                        danger
                                        onClick={() => {
                                            if (selectedId && confirmType) {
                                                onDelete(confirmType, selectedId);
                                            }
                                            setIsConfirmOpen(false);
                                        }}
                                    >
                                        Yes, Delete
                                    </Button>,
                                ]}
                            >
                                <p>Are you sure you want to delete this <strong>{confirmType}</strong>?</p>
                            </Modal>

                        </div>
                    )}
                </div>
            </main>

            <UploadModal
                open={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUploadSuccess={fetchDashboardData}
            />
        </div>
    );
};

export default AdminDashboard;