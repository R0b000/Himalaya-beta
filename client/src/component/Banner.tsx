import { useEffect, useState } from 'react'
import { Empty } from 'antd'

const Banner = (data: any) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (!data.data.data?.imageData?.length) return;
        if (!data.data.data.imageData[0]?.images?.length) return;

        const interval = setInterval(() => {
            setCurrentIndex(prev =>
                prev === data.data.data.imageData[0].images.length - 1 ? 0 : prev + 1
            );
        }, 3000)

        return () => clearInterval(interval)
    }, [data])

    const images = data?.data?.data?.imageData?.[0]?.images || [];

    return (
        <>
            <div className={`relative snap-start flex w-full h-dvh overflow-hidden rounded-md border border-gray-300 drop-shadow-lg`}>
                {images.length > 0 ? (
                    <div className='flex min-w-full h-full duration-500' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {images.map((items: any, index: number) => (
                            <div key={index} className='flex min-w-full h-full items-center justify-center overflow-hidden'>
                                <img src={items.secure_url} alt="banner" className='object-cover h-dvh w-auto' />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-full w-full shrink-0 flex items-center justify-center text-gray-400 text-xl">
                        <Empty />
                    </div>
                )}

                <div className="flex absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 flex-col items-center justify-center text-center rounded-md w-full md:max-w-2xl xl:max-w-4xl py-5 gap-2 p-2 bg-yellow-200">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Grow Your Business With Digital Power
                    </h1>
                    <p className="w-full">
                        We help companies boost online visibility, increase sales, and build strong digital brands.
                    </p>
                    <div className="flex gap-4 w-auto h-full bg-blue-900 hover:bg-blue-950 hover:scale-105 duration-300 transition-all ease-in-out p-2 px-5 text-white font-semibold rounded-md cursor-pointer">
                        <a
                            href="#contact"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner