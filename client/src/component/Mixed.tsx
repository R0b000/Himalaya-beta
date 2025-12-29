import Photo from '../assets/Himalaya logo.png'

const Mixed = () => {
    const teamMembers = [
        {
            name: "Sanjeev Kingring",
            role: "CEO & Founder",
            desc: "Over 10 years of experience in digital marketing and video production. Drives innovation and creativity in all projects.",
        },
        {
            name: "John Doe",
            role: "Creative Director",
            desc: "Leads creative projects with a focus on impactful visual content. Inspires the team to push boundaries.",
        },
        {
            name: "Jane Smith",
            role: "Marketing Head",
            desc: "Expert in digital campaigns, SEO, and client engagement. Ensures strategies deliver measurable results.",
        }
    ];

    return (
        <>
            {/* WHY CHOOSE US */}
            <div className="flex flex-col items-center py-5 p-4 gap-2">
                <h2 className="text-2xl font-semibold">WHY CHOOSE US?</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[95vw] md:w-[80vw] text-black">
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

            {/* TEAM SECTION */}
            <div id="team" className="flex flex-col justify-center items-center p-4 py-5 gap-2 ">
                <h2 className="text-2xl font-bold">MEET THE TEAM</h2>
                <p className="text-center w-[90%] md:w-[70%] text-white">
                    Our creative professionals combine passion, skill, and experience to deliver exceptional results.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                    {teamMembers.map((member, idx) => (
                        <div
                            key={idx}
                            className="group bg-white p-2 rounded-2xl shadow-lg w-full max-w-sm cursor-pointer text-center transition duration-500 hover:scale-105 hover:shadow-xl justify-center py-5"
                        >
                            <div className="h-36 w-36 mx-auto">
                                <img src={Photo} alt="" />
                            </div>
                            <h3 className="font-bold text-base md:text-lg text-gray-800 group-hover:text-blue-500">{member.name}</h3>
                            <p className="font-semibold text-md md:text-lg text-gray-800">
                                {member.role}
                            </p>
                            <p className="text-gray-700 text-sm md:text-base">
                                {member.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>

            {/* TESTIMONIALS */}
            <div className="flex flex-col items-center p-4 py-5 gap-2 ">
                <h2 className="text-2xl font-semibold">WHAT OUR CLIENTS SAY</h2>

                <div className="flex flex-col md:flex-row gap-4 w-[95vw] text-black items-center justify-center">
                    <div className="bg-yellow-100 p-4 rounded-md w-auto h-auto flex-col items-center justify-center flex">
                        <p>“Amazing service! Their SEO boosted our sales by 40%.”</p>
                        <span className="font-semibold">— Raj, Ecommerce Owner</span>
                    </div>

                    <div className="bg-yellow-100 p-4 rounded-md w-auto h-auto flex-col items-center justify-center flex">
                        <p>“Professional team, great communication. Highly recommended!”</p>
                        <span className="font-semibold">— Sneha, Startup Founder</span>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Mixed