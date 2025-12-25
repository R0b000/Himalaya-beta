import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { Empty } from 'antd';
import Service from './Service';
import Mixed from './Mixed';
import FAQ from './FAQ';
import Contact from './Contact';
import Banner from './Banner';

const Body = (data: any) => {
    return (
        <div className='flex flex-col w-full h-full'>
            <div className="flex flex-col w-full h-auto">
                <section className='flex snap-start min-h-screen gap-2 items-center justify-center'>
                    <Banner data={data}/>
                </section>

                {/* SERVICES */}
                <section className='flex flex-col snap-start min-h-screen gap-2 items-center justify-center'>
                    <Service />
                </section>

                <section className='flex flex-col snap-start gap-2 min-h-screen'>
                    <Mixed />
                </section>

                <section className='flex flex-col snap-start max-h-screen'>
                    {/* PORTFOLIO */}
                    <div id="portfolio" className="flex flex-col p-4 py-5 gap-2 items-center snap-start lg:min-h-full">
                        <h2 className="text-2xl font-semibold">PORTFOLIO</h2>

                        {data?.data?.videoData?.length > 0 &&
                            data?.data.videoData[0]?.secure_url ? (
                            <video
                                src={data?.data.videoData[0].secure_url}
                                autoPlay
                                muted
                                playsInline
                                loop
                                className="w-[95vw] lg:w-[80%] rounded-md border"
                            ></video>
                        ) : (
                            <div className="flex w-[95vw] lg:w-[80vw] h-[400px] md:h-[500px] lg:h-[500px] text-center text-gray-400 border bg-gray-50 border-gray-300 rounded-md items-center justify-center">
                                <Empty />
                            </div>
                        )}
                    </div>
                </section>

                <section className='flex flex-col gap-2 snap-start min-h-screen items-center justify-center'>
                    <FAQ/>
                </section>

                <section className='flex flex-col min-h-screen snap-start'>
                    <Contact/>
                </section>
            </div>

            {/* FOOTER */}
            <section className='flex flex-col items-center justify-center min-h-screen snap-start'>
                <div className="flex flex-col items-center justify-center w-full bg-gray-900 text-white py-6 gap-2 snap-start lg:min-h-full">
                    <p>© 2025 Himalaya Production. All rights reserved.</p>
                    <div className="flex gap-4 mt-2">
                        <a href="#" aria-label="Facebook">
                            <FaFacebook className="hover:text-blue-500 transition-all duration-700 text-xl md:text-2xl hover:animate-pulse" />
                        </a>
                        <a href="#" aria-label="Instagram">
                            <FaInstagram className="hover:text-pink-500 transition-all duration-700 text-xl md:text-2xl hover:animate-pulse" />
                        </a>
                        <a href="#" aria-label="Twitter">
                            <FaTwitter className="hover:text-blue-400 transition-all duration-700 text-xl md:text-2xl hover:animate-pulse" />
                        </a>
                    </div>
                    <p className="mt-2 text-sm">Designed and developed by Himalaya Production Team</p>
                </div>
            </section>
        </div>
    );
}

export default Body;
