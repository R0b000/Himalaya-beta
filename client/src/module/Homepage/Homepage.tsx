import { useEffect, useState } from "react"
import Banner from "../../component/Banner"
import Body from "../../component/Body"
import Header from "../../component/Header"
import Logo from '../../assets/Himalaya logo.png'

const Homepage = () => {
    const [hidden, setHidden] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const containerStyles = {
        fontFamily: 'Inter, sans-serif',
        minHeight: '100vh',
        // Replicating the dark, themed background
        backgroundColor: '#0d1223',
        backgroundImage: 'linear-gradient(135deg, #0d1223 0%, #1c2744 50%, #0d1223 100%)',
    };

    useEffect(() => {
        let prev = window.scrollY;

        const handleScroll = () => {
            let curr = window.scrollY;

            if (curr > prev) setHidden(true);
            else setHidden(false)

            prev = curr;
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer)
    })

    return (
        <>
            {isLoading ?
                <div className="w-screen h-screen overflow-clip shrink-0 flex items-center justify-center">
                    <img src={Logo} alt="" className="w-[15%] md:w-[5%] animate-pulse" />
                </div>
                :
                <div id="home" style={containerStyles} className="flex flex-col w-full h-auto p-2 gap-2 ">
                    {!hidden &&
                        <div className="fixed top-2 flex w-[96%] md:w-[90%]  h-[8vh] rounded-md shrink-0 z-10">
                            <Header />
                        </div>
                    }
                    <div className="flex flex-col w-full h-full items-center justify-center">
                        <div className="flex flex-col mt-[10vh] lg:w-[80vw] lg:h-[85vh] md:h-[50vh] p-2 rounded-md relative h-[30vh] overflow-clip">
                            <Banner />
                        </div>
                        <div className="flex w-full h-auto text-white">
                            <Body />
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default Homepage