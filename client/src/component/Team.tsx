import Photo from '../assets/Himalaya logo.png'

const Team = () => {
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
        < div id="team" className="flex flex-col justify-center items-center p-4 py-5 gap-2 snap-start min-h-dvh" >
            <h2 className="text-2xl font-bold">MEET THE TEAM</h2>
            <p className="text-center w-[90%] md:w-[70%] text-white">
                Our creative professionals combine passion, skill, and experience to deliver exceptional results.
            </p>
            <div className="flex flex-col w-full gap-6 p-2 overflow-y-scroll h-[70vh]">
                {teamMembers.map((member, idx) => (
                    <div
                        key={idx}
                        className="group bg-white p-2 rounded-2xl shadow-lg w-full max-w-sm cursor-pointer text-center transition duration-500 hover:scale-105 hover:shadow-xl justify-center py-5"
                    >
                        <div className="h-20 w-20 mx-auto">
                            <img src={Photo} alt="" />
                        </div>
                        <h3 className="font-bold text-base text-gray-800 group-hover:text-blue-500">{member.name}</h3>
                        <p className="font-semibold text-md text-gray-800">
                            {member.role}
                        </p>
                        <p className="text-gray-700 text-sm md:text-base">
                            {member.desc}
                        </p>
                    </div>
                ))}
            </div>

        </div >
    )
}

export default Team;