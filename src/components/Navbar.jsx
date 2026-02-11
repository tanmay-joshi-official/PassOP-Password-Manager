import React from 'react'
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className='fixed top-0 w-full flex justify-between items-center p-4 bg-gradient-to-r from-[#272525] from-20% via-[#3a5536] via-40% to-[#48a748] to-100% text-white z-50'>
            <div className="logo text-xl font-bold mx-3 cursor-pointer">
                <span className='text-green-400'>&lt;</span>Pass<span className='text-green-400'>OP/&gt;</span>
            </div>
            <a href="http://github.com/tanmay-joshi-official" target='_blank'><button className='flex items-center gap-2 text-md border rounded-full p-1 hover:bg-green-800 active:bg-green-900 bg-green-700 transition-all mx-3 font-medium px-2 py-1 hover:scale-[1.03]'><FaGithub className='text-2xl' />GitHub</button></a>
        </nav>
    )
}

export default Navbar