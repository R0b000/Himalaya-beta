import { AiOutlineMenu } from 'react-icons/ai'
import Logo from '../assets/Himalaya logo.png'
import { useState } from 'react'
import { Modal } from 'antd'

const Header = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false)

    return (
        <>
            {/* DESKTOP */}
            <div className='hidden md:block w-full h-full'>
                <div className='w-full h-full gap-2 items-center justify-center bg-black/30 flex rounded-md text-white md:px-10'>
                    <div className='flex md:w-[10%] lg:w-[5%] lg:ml-40 h-auto items-center justify-center'>
                        <img src={Logo} alt="" className='w-full h-full' />
                    </div>

                    <div className="flex gap-2 w-[95%] h-full items-center justify-center">
                        <ul className='flex lg:gap-25 gap-10'>
                            <a href="#home"><li className="cursor-pointer font-semibold">HOME</li></a>
                            <a href="#services"><li className="cursor-pointer font-semibold">SERVICES</li></a>
                            <a href="#team"><li className="cursor-pointer font-semibold">OUR TEAM</li></a>
                            <a href="#portfolio"><li className="cursor-pointer font-semibold">PORTFOLIOS</li></a>
                            <a href="#faq"><li className="cursor-pointer font-semibold">FAQ</li></a>
                            <a href="#contact"><li className="cursor-pointer font-semibold">CONTACT</li></a>
                        </ul>
                    </div>
                </div>
            </div>

            {/* MOBILE */}
            <div className='flex md:hidden bg-black/30 w-full h-full rounded-md items-center justify-center p-2 px-5 relative'>
                <AiOutlineMenu
                    onClick={() => setOpenMenu(true)}
                    size={30}
                    className='absolute left-3 text-[#1B3C80]'
                />
                <img src={Logo} alt="" className='w-[15%]' />
            </div>

            {/* MOBILE MODAL */}
            <Modal
                title='Menu'
                centered
                onCancel={() => setOpenMenu(false)}
                closable={true}
                open={openMenu}
                footer={null}
            >
                <ul className='flex flex-col lg:gap-25 gap-2'>
                    <a href="#home" onClick={() => setOpenMenu(false)}>
                        <li className="cursor-pointer font-semibold">HOME</li>
                    </a>
                    <a href="#services" onClick={() => setOpenMenu(false)}>
                        <li className="cursor-pointer font-semibold">SERVICES</li>
                    </a>
                    <a href="#team" onClick={() => setOpenMenu(false)}>
                        <li className="cursor-pointer font-semibold">OUR TEAM</li>
                    </a>
                    <a href="#portfolio" onClick={() => setOpenMenu(false)}>
                        <li className="cursor-pointer font-semibold">PORTFOLIOS</li>
                    </a>
                    <a href="#faq" onClick={() => setOpenMenu(false)}>
                        <li className="cursor-pointer font-semibold">FAQ</li>
                    </a>
                    <a href="#contact" onClick={() => setOpenMenu(false)}>
                        <li className="cursor-pointer font-semibold">CONTACT</li>
                    </a>
                </ul>
            </Modal>
        </>
    )
}

export default Header
