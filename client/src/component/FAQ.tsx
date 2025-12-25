const FAQ = () => {
    return (
        <>
            {/* FAQ SECTION */}
            <div className="flex flex-col items-center py-5 p-4 w-full gap-2" id="faq">
                <h2 className="text-2xl font-semibold">FAQ</h2>
                <p className="text-center text-text w-[90%] md:w-[60%]">
                    This section answers common questions to help you understand our services,
                    pricing, and support process without needing to contact us directly.
                </p>
                <div className="w-[95vw] md:w-[80vw] flex flex-col gap-3 text-black">
                    {[
                        { q: "How long does it take to see results?", a: "Most clients see improvements within 2–4 weeks." },
                        { q: "Do you offer custom packages?", a: "Yes, we build packages based on your specific needs." },
                        { q: "What is your pricing model?", a: "We offer flexible pricing depending on project size and requirements." },
                        { q: "Do you provide after-service support?", a: "Yes, we provide 30 days of free support after project delivery." }
                    ].map((item, idx) => (
                        <details key={idx} className="bg-gray-100 p-3 rounded-md cursor-pointer">
                            <summary className="font-semibold">{item.q}</summary>
                            <p className="">{item.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </>
    )
}

export default FAQ