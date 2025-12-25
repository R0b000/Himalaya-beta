import { useEffect, useState } from "react"
import Body from "../../component/Body"
import Header from "../../component/Header"
import Logo from '../../assets/Himalaya logo.png'
import adminSvc from "../../service/admin.service"

const Homepage = () => {
    const [hidden, setHidden] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<any | null>(null)
    const isV1 = location.pathname.includes('v1');

    const oldData = {
        "imageData": [
            {
                "_id": "6941488c60bfae1f8b8774e4",
                "images": [
                    {
                        "public_id": "31087_8f1cd3b955_file-original",
                        "secure_url": "https://res.cloudinary.com/dr2och2cl/image/upload/v1765886092/31087_8f1cd3b955_file-original.jpg",
                        "_id": "6941488c60bfae1f8b8774e5"
                    },
                    {
                        "public_id": "31087_43fa8a9437_file-original",
                        "secure_url": "https://res.cloudinary.com/dr2och2cl/image/upload/v1765886092/31087_43fa8a9437_file-original.jpg",
                        "_id": "6941488c60bfae1f8b8774e6"
                    },
                    {
                        "public_id": "31087_059320f068_file-original",
                        "secure_url": "https://res.cloudinary.com/dr2och2cl/image/upload/v1765886092/31087_059320f068_file-original.jpg",
                        "_id": "6941488c60bfae1f8b8774e7"
                    },
                    {
                        "public_id": "licensed-image (1)",
                        "secure_url": "https://res.cloudinary.com/dr2och2cl/image/upload/v1765886092/licensed-image%20%281%29.jpg",
                        "_id": "6941488c60bfae1f8b8774e8"
                    },
                    {
                        "public_id": "licensed-image",
                        "secure_url": "https://res.cloudinary.com/dr2och2cl/image/upload/v1765886092/licensed-image.jpg",
                        "_id": "6941488c60bfae1f8b8774e9"
                    }
                ],
                "title": "try",
                "createdAt": "2025-12-16T11:54:52.790Z",
                "__v": 0
            }
        ],
        "videoData": [
            {
                "_id": "692d34cf47896aa323f26d00",
                "public_id": "BLACKPINK RosÃ© - 'Until I Found You' MV_Full-HD",
                "secure_url": "https://res.cloudinary.com/dxpjvhrbx/video/upload/v1764570316/BLACKPINK%20Ros%C3%83%C2%A9%20-%20%27Until%20I%20Found%20You%27%20MV_Full-HD.mp4",
                "title": "dsfas",
                "createdAt": "2025-12-01T06:25:19.838Z",
                "__v": 0
            },
            {
                "_id": "692eb788088b3c34ff03e5f7",
                "public_id": "Screen Recording 2025-07-15 213631",
                "secure_url": "https://res.cloudinary.com/dxpjvhrbx/video/upload/v1764669317/Screen%20Recording%202025-07-15%20213631.mp4",
                "title": "new video",
                "createdAt": "2025-12-02T09:55:20.632Z",
                "__v": 0
            }
        ]
    };

    useEffect(() => {
        if (isV1) {
            const fetchHomePageData = async () => {
                try {
                    const response = await adminSvc.homePageData();
                    setData(response.data.data);
                    oldData === response.data.data
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchHomePageData();
        } else {
            setData(oldData);
            setIsLoading(false);
        }
    }, [isV1]);

    const containerStyles = {
        fontFamily: 'Inter, sans-serif',
        minHeight: '100vh',
        backgroundColor: '#0d1223',
        backgroundImage: 'linear-gradient(135deg, #0d1223 0%, #1c2744 50%, #0d1223 100%)',
    };

    useEffect(() => {
        if (!isLoading) {
            const container = document.getElementById('scroll-container');
            if (!container) return;

            let isScrolling: any;
            const sections = Array.from(container.children) as HTMLElement[];

            let prev = container.scrollTop;

            const handleScroll = () => {
                let curr = container.scrollTop;

                if (curr > prev) setHidden(true);
                else setHidden(false)

                prev = curr;

                window.clearTimeout(isScrolling)

                isScrolling = setTimeout(() => {
                    const scrollPos = container.scrollTop;

                    //Find the closet section
                    let closet = sections[1];
                    let minDiff = Math.abs(scrollPos - sections[1].offsetTop);

                    sections.forEach((section) => {
                        const diff = Math.abs(scrollPos - section.offsetTop);
                        if (diff < minDiff) {
                            minDiff = diff;
                            closet = section;
                        }
                    })

                    const threshold = window.innerHeight * 0.3;
                    if (minDiff > threshold) {
                        container.scrollTo({
                            top: closet.offsetTop,
                            behavior: 'smooth'
                        })
                    }
                }, 100)
            }
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll)
        } else {
            return
        }
    }, [isLoading])

    return (
        <>
            {isLoading ?
                <div className="w-screen h-screen overflow-clip shrink-0 flex items-center justify-center">
                    <img src={Logo} alt="" className="w-[15%] md:w-[5%] animate-pulse" />
                </div>
                :
                <div id="home" style={containerStyles} className="flex flex-col w-full h-auto gap-2">
                    {!hidden &&
                        <div className="fixed top-2 flex w-full h-[8vh] rounded-md shrink-0 z-10 items-center justify-center">
                            <div className="flex md:w-[90%] items-center justify-center">
                                <Header />
                            </div>
                        </div>
                    }
                    <div id="scroll-container" className="flex flex-col w-full h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory">
                        <Body data={data} />
                    </div>

                </div>}
        </>
    )
}

export default Homepage