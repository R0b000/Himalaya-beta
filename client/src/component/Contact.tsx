import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaTty } from "react-icons/fa"

const Contact = () => {
    return (
        <>
            {/* CONTACT */}
            <div id="contact" className="flex flex-col w-full h-full items-center justify-center py-10 gap-2">
                <div className='flex flex-col w-full gap-2 items-center justify-center'>
                    <h2 className="text-2xl font-semibold">CONTACT</h2>
                    <div className="flex flex-col md:flex-row w-full xl:w-[50vw] md:w-[70vw] justify-evenly text-base items-center">
                        <div className="flex hover:text-blue-500 transition items-center gap-3"><FaPhoneAlt /><span>+977-9854041300</span></div>
                        <div className="flex hover:text-blue-500 transition flex-row items-center justify-center gap-3"><FaTty /><span>01-5333233</span></div>
                        <div className="flex hover:text-blue-500 transition items-center gap-3"><FaEnvelope /><span>himalayaproduction44@gmail.com</span></div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center text-white w-full h-[350px] md:h-[500px] xl:h-[600px] gap-2">
                    <div className="flex hover:text-blue-500 transition items-center gap-3"><FaMapMarkerAlt /><span>CTC Mall, Sundhara, Kathmandu</span></div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d15175.017775906535!2d85.30919602530362!3d27.698639128536236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDQxJzUyLjMiTiA4NcKwMTgnNDUuMCJF!5e0!3m2!1sen!2snp!4v1766061712711!5m2!1sen!2snp"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className='w-full h-full'
                    ></iframe>
                </div>
            </div>
        </>
    )
}

export default Contact