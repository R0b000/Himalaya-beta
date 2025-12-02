import { useCallback, useEffect, useState } from 'react'
import adminSvc from '../service/admin.service'
import { Skeleton } from 'antd'

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [data, setData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchHomePageData = useCallback(async () => {
        try {
            const response = await adminSvc.homePageData();
            setData(response.data)
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchHomePageData()
    }, [])

    useEffect(() => {
        if (!data?.data?.imageData?.length) return;
        if (!data.data.imageData[0]?.images?.length) return;

        const interval = setInterval(() => {
            setCurrentIndex(prev =>
                prev === data.data.imageData[0].images.length - 1 ? 0 : prev + 1
            );
        }, 3000)

        return () => clearInterval(interval)
    }, [data])

    const images = data?.data?.imageData?.[0]?.images || [];

    return (
        <>
            {isLoading ?
                <div className='flex w-full h-full animate-pulse items-center justify-center'>
                    <Skeleton />
                </div>
                :
                <div className='relative w-full h-full shrink-0 overflow-hidden rounded-md bg-gray-50 border border-gray-300 drop-shadow-lg'>
                    {images.length > 0 ? (
                        <div className='flex w-full h-full duration-500' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {images.map((items: any, index: number) => (
                                <div key={index} className='shrink-0 w-full min-h-auto flex items-center justify-center'>
                                    <img src={items.secure_url} alt="" className='w-auto h-full' />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl">
                            No file uploaded
                        </div>
                    )}
                </div>
            }
        </>
    )
}

export default Banner