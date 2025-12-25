const Service = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full gap-2 p-4 py-5" id="services">
                <h2 className="text-2xl font-semibold">OUR SERVICES</h2>
                <p className="w-[95vw] text-center">
                    We deliver complete digital transformation solutions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[95vw] md:w-[80vw] text-black">
                    {[
                        { title: "Promotional Video Production", desc: "Create high-quality promotional videos to showcase your brand, products or services." },
                        { title: "Reels & Short Video Production", desc: "Facebook Reels, TikTok & YouTube Shorts professionally produced to boost engagement." },
                        { title: "Film & Serial Dubbing", desc: "Professional dubbing services for films, serials, commercials and corporate videos." },
                        { title: "Video & Photo Shoot", desc: "Studio and outdoor video/photo shoots for events, brands, products and businesses." },
                        { title: "Video Editing Services", desc: "Clean, cinematic and professional editing for all kinds of video content." },
                        { title: "Audio Recording & Editing", desc: "Voiceover, narration, podcast and studio-quality audio recording & editing." },
                        { title: "Music Video & Intro Production", desc: "Creative music videos, intro videos and ad videos for brands and creators." },
                        { title: "Documentary Video Production", desc: "Complete documentary production including scripting, shooting and editing." }
                    ].map((service, idx) => (
                        <div key={idx} className="bg-blue-100 p-4 rounded-md text-center transform transition duration-500 ease-in-out hover:scale-105 cursor-pointer">
                            <h3 className="font-semibold text-lg">{service.title}</h3>
                            <p>{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default Service