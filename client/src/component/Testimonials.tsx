const Testimonials = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 py-5 gap-2 h-full">
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
    )
}

export default Testimonials