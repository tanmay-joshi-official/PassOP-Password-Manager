import React from 'react'

const Footer = () => {
    return (
        <footer className='md:relative w-full fixed bottom-0 flex flex-col items-center py-1 backdrop-blur-2xl gap-1 mt-5'>
            <div className="logo text-xl font-bold mx-3 cursor-pointer">
                <span className='text-green-800'>&lt;</span>Pass<span className='text-green-800'>OP/&gt;</span>
            </div>
            <div className='mb-1'>
                Made with <span className='text-red-500 border-black border'>❤</span> By <a className='hover:underline text-red-950' href="http://github.com/tanmay-joshi-official" target='_blank'>Tanmay Joshi</a>
            </div>
        </footer>
    )
}


export default Footer

