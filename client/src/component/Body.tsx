import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { Empty } from 'antd';
import Service from './Service';
import Mixed from './Mixed';
import FAQ from './FAQ';
import Contact from './Contact';
import Banner from './Banner';
import Choose from './Choose';
import Team from './Team';
import Testimonials from './Testimonials';

const Body = (data: any) => {
    return (
        <>
            <section className='flex snap-start min-h-dvh gap-2 items-center justify-center'>
                <Banner data={data} />
            </section>

            {/* SERVICES */}
            <section className='flex flex-col snap-start min-h-dvh gap-2 items-center justify-center'>
                <Service />
            </section>

            <section className='flex-col snap-start gap-2 md:min-h-dvh items-center justify-center hidden md:block'>
                <Mixed />
            </section>

            <section className='flex flex-col snap-start gap-2 min-h-dvh items-center justify-center md:hidden py-10'>
                <Choose />
            </section>

            <section className='flex flex-col snap-start gap-2 min-h-dvh items-center justify-center md:hidden py-10'>
                <Team />
            </section>

            <section className='flex flex-col snap-start gap-2 min-h-dvh items-center justify-center md:hidden py-10'>
                <Testimonials />
            </section>

            <section className='flex flex-col snap-start min-h-dvh items-center justify-center'>
                {/* PORTFOLIO */}
                <div id="portfolio" className="flex flex-col p-4 py-5 gap-2 items-center">
                    <h2 className="text-2xl font-semibold">PORTFOLIO</h2>

                    {data?.data?.videoData?.length > 0 &&
                        data?.data.videoData[0]?.secure_url ? (
                        <video
                            src={data?.data.videoData[0].secure_url}
                            autoPlay
                            muted
                            playsInline
                            loop
                            className="w-[95vw] xl:w-[80%] rounded-md border"
                        ></video>
                    ) : (
                        <div className="flex w-[95vw] xl:w-[80vw] h-[400px] md:h-[500px] xl:h-[500px] text-center text-gray-400 border bg-gray-50 border-gray-300 rounded-md items-center justify-center">
                            <Empty />
                        </div>
                    )}
                </div>
            </section>

            <section className='flex flex-col gap-2 snap-start min-h-dvh items-center justify-center'>
                <FAQ />
            </section>

            <section className='flex flex-col min-h-dvh snap-start items-center justify-center'>
                <Contact />
            </section>

            {/* FOOTER */}
            <section className='flex flex-col items-center justify-center min-h-dvh snap-start'>
                <div className="flex flex-col items-center justify-center w-full bg-gray-900 text-white py-6 gap-2 snap-start xl:min-h-full">
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
        </>
    );
}

export default Body;
