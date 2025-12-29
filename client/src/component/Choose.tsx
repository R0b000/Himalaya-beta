const Choose = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center py-5 p-4 gap-2 h-full">
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
        </>
    )
}

export default Choose