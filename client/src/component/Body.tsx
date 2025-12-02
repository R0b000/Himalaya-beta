import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import Telephone from '../assets/image.png'
import { useCallback, useEffect, useState } from 'react';
import adminSvc from '../service/admin.service';

const Body = () => {
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
    }, []);

    return (
        <>
            {!isLoading &&
                <div className="flex flex-col w-full h-auto gap-10">

                    {/* HERO SECTION */}
                    <div className="flex flex-col items-center justify-center text-center rounded-md  w-full py-12">
                        <h1 className="text-4xl font-bold">
                            Grow Your Business With Digital Power
                        </h1>
                        <p className="w-[80%] mt-3">
                            We help companies boost online visibility, increase sales, and build strong digital brands.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <a href="#contact">
                                <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
                                    Contact Us
                                </button>
                            </a>
                        </div>
                    </div>

                    {/* SERVICES */}
                    <div className="flex flex-col items-center w-full" id="services">
                        <h2 className="text-2xl font-semibold">OUR SERVICES</h2>
                        <p className="w-[80%] text-center mt-2">
                            We deliver complete digital transformation solutions.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-[80%] text-black">

                            <div className="bg-blue-100 p-4 rounded-md text-center">
                                <h3 className="font-semibold text-lg">Promotional Video Production</h3>
                                <p>Create high-quality promotional videos to showcase your brand, products or services.</p>
                            </div>

                            <div className="bg-blue-100 p-4 rounded-md text-center">
                                <h3 className="font-semibold text-lg">Reels & Short Video Production</h3>
                                <p>Facebook Reels, TikTok & YouTube Shorts professionally produced to boost engagement.</p>
                            </div>

                            <div className="bg-blue-100 p-4 rounded-md text-center">
                                <h3 className="font-semibold text-lg">Film & Serial Dubbing</h3>
                                <p>Professional dubbing services for films, serials, commercials and corporate videos.</p>
                            </div>

                            <div className="bg-blue-100 p-4 rounded-md text-center">
                                <h3 className="font-semibold text-lg">Video & Photo Shoot</h3>
                                <p>Studio and outdoor video/photo shoots for events, brands, products and businesses.</p>
                            </div>

                            <div className="bg-blue-100 p-4 rounded-md text-center">
                                <h3 className="font-semibold text-lg">Video Editing Services</h3>
                                <p>Clean, cinematic and professional editing for all kinds of video content.</p>
                            </div>

                            <div className="bg-blue-100 p-4 rounded-md text-center">
                                <h3 className="font-semibold text-lg">Audio Recording & Editing</h3>
                                <p>Voiceover, narration, podcast and studio-quality audio recording & editing.</p>
                            </div>

                            <div className="bg-blue-100 p-4 rounded-md text-center">
                                <h3 className="font-semibold text-lg">Music Video & Intro Production</h3>
                                <p>Creative music videos, intro videos and ad videos for brands and creators.</p>
                            </div>

                            <div className="bg-blue-100 p-4 rounded-md text-center">
                                <h3 className="font-semibold text-lg">Documentary Video Production</h3>
                                <p>Complete documentary production including scripting, shooting and editing.</p>
                            </div>

                        </div>
                    </div>

                    {/* WHY CHOOSE US */}
                    <div className="flex flex-col items-center mt-6">
                        <h2 className="text-2xl font-semibold">WHY CHOOSE US?</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-[80%] text-black">
                            <div className="bg-green-100 p-4 rounded-md text-center">
                                <h3 className="font-semibold">Result-Driven Strategy</h3>
                                <p>We focus on conversions, not just impressions.</p>
                            </div>

                            <div className="bg-green-100 p-4 rounded-md text-center">
                                <h3 className="font-semibold">Experienced Team</h3>
                                <p>Experts in marketing, design and development.</p>
                            </div>

                            <div className="bg-green-100 p-4 rounded-md text-center">
                                <h3 className="font-semibold">24/7 Support</h3>
                                <p>We provide dedicated customer support.</p>
                            </div>
                        </div>
                    </div>

                    {/* TEAM */}
                    <div id="team" className="flex flex-col justify-center items-center mt-6">
                        <h2 className="text-2xl font-semibold">MEET THE TEAM</h2>
                        <p className="text-center w-[80%] mt-2">Our creative professionals who power your success.</p>

                        <div className="flex gap-4 mt-4 flex-wrap justify-center">
                            {/* same team cards */}
                        </div>
                    </div>

                    {/* TESTIMONIALS */}
                    <div className="flex flex-col items-center mt-6">
                        <h2 className="text-2xl font-semibold">WHAT OUR CLIENTS SAY</h2>

                        <div className="flex flex-col md:flex-row gap-4 mt-4 w-[80%] text-black">
                            <div className="bg-yellow-100 p-4 rounded-md">
                                <p>“Amazing service! Their SEO boosted our sales by 40%.”</p>
                                <span className="font-semibold">— Raj, Ecommerce Owner</span>
                            </div>

                            <div className="bg-yellow-100 p-4 rounded-md">
                                <p>“Professional team, great communication. Highly recommended!”</p>
                                <span className="font-semibold">— Sneha, Startup Founder</span>
                            </div>
                        </div>
                    </div>

                    {/* PORTFOLIO */}
                    {/* PORTFOLIO */}
                    <div id="portfolio" className="flex flex-col mt-6 items-center">
                        <h2 className="text-2xl font-semibold mb-2">PORTFOLIO</h2>

                        {data?.data?.videoData?.length > 0 &&
                            data.data.videoData[0]?.secure_url ? (
                            <video
                                src={data.data.videoData[0].secure_url}
                                autoPlay
                                muted
                                playsInline
                                loop
                                className="lg:w-[80%] rounded-md"
                            ></video>
                        ) : (
                            <div className="w-[80%] py-10 text-center text-gray-400 border border-gray-300 rounded-md">
                                No video uploaded
                            </div>
                        )}
                    </div>

                    {/* FAQ */}
                    <div className="flex flex-col items-center mt-6 w-full" id="faq">
                        <h2 className="text-2xl font-semibold">FAQ</h2>

                        <div className="mt-4 w-[80%] flex flex-col gap-3 text-black">
                            <details className="bg-gray-100 p-3 rounded-md">
                                <summary className="font-semibold">How long does it take to see results?</summary>
                                <p className="mt-2">Most clients see improvements within 2–4 weeks.</p>
                            </details>

                            <details className="bg-gray-100 p-3 rounded-md">
                                <summary className="font-semibold">Do you offer custom packages?</summary>
                                <p className="mt-2">Yes, we build packages based on your needs.</p>
                            </details>
                        </div>
                    </div>

                    {/* CTA SECTION */}
                    <div className="flex flex-col items-center justify-center bg-blue-600 text-white py-8 mt-10">
                        <h2 className="text-2xl font-bold">Ready to Grow Your Business?</h2>
                        <button className="bg-white text-blue-600 px-5 py-2 rounded-md mt-4">
                            Get a Free Consultation
                        </button>
                    </div>

                    {/* CONTACT */}
                    <div id="contact" className="flex flex-col w-full items-center justify-center gap-4 p-4 mt-8">
                        <h2 className="text-2xl font-semibold">CONTACT</h2>

                        <div className="flex flex-col gap-3 text-base mt-2 items-center">
                            <div className="flex items-center gap-3"><FaPhoneAlt /><span>+977-9854041300</span></div>
                            <div className="flex flex-row items-center justify-center gap-3"><img src={Telephone} alt="" className='w-[1.7%]' /><span>01-5333233</span></div>
                            <div className="flex items-center gap-3"><FaEnvelope /><span>himalayaproduction44@gmai.com</span></div>
                            <div className="flex items-center gap-3"><FaMapMarkerAlt /><span>CTC Mall, Sundhara, Kathmandu</span></div>
                        </div>

                        <div className="flex gap-4 mt-4 text-xl">
                            <FaFacebook />
                            <FaInstagram />
                            <FaTwitter />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Body;
