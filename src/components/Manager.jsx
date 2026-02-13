import React, { useState, useEffect, use } from 'react'
import { FaRegCopy } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {

    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [PasswordArray, setPasswordArray] = useState([]);
    const [toggle, setToggle] = useState(null);

    const getUserId = () => {
        let userId = localStorage.getItem("userId");

        if (!userId) {
            userId = crypto.randomUUID();
            localStorage.setItem("userId", userId);
        }

        return userId;
    }


    const getPasswords = async () => {
        const userId = getUserId()
        let req = await fetch(`https://passop-password-manager-d9n8.onrender.com/${userId}`)
        let passwords = await req.json()
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
        // let passwords = localStorage.getItem("passwords");
        // if (passwords) {
        //     setPasswordArray(JSON.parse(passwords));
        // }
    }, [])

    const hidePassword = (e) => {
        e.target.classList.add('hidden');
        e.target.nextElementSibling.classList.remove('hidden');
        e.target.previousElementSibling.type = 'text';
    }

    const showPassword = (e) => {
        e.target.classList.add('hidden');
        e.target.previousElementSibling.classList.remove('hidden');
        e.target.previousElementSibling.previousElementSibling.type = 'password';
    }

    const togglePassword = (index) => {
        setToggle(index === toggle ? null : index);
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    const savePassword = async () => {
        if (form.site === "" || form.username === "" || form.password === "") {
            toast.error('Please fill in all fields!', {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
            });
            return;
        }
        const userId = getUserId()
        setPasswordArray([...PasswordArray, form]);
        const passwordData = { ...form, userId }
        setform({ site: "", username: "", password: "" });
        toast.success("Password saved successfully!", {
            autoClose: 2000,
        })
        let res = await fetch("https://passop-password-manager-d9n8.onrender.com", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(passwordData) })

        // localStorage.setItem("passwords", JSON.stringify([...PasswordArray, form]));
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.info('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const handleDelete = async (index) => {
        const updatedPasswords = PasswordArray.filter((_, i) => i !== index);
        setPasswordArray(updatedPasswords);
        let res = fetch("https://passop-password-manager-d9n8.onrender.com", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify(setPasswordArray) })
        // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        toast.success("Password deleted!", {
            autoClose: 2000,
        })
    }

    const deleteAllPasswords = async () => {
        if (window.confirm("Do you want to delete all the passwords?")) {
            const userId = getUserId()
            let res = await fetch(`https://passop-password-manager-d9n8.onrender.com/all/${userId}`, { method: "DELETE" })
            setPasswordArray([])
            // localStorage.removeItem("passwords")
            toast.success("All passwords deleted!", {
                autoClose: 2000,
            })
        }
    }

    const handleEdit = (index) => {
        setform(PasswordArray[index]);
        const updatedPasswords = PasswordArray.filter((_, i) => i !== index);
        setPasswordArray(updatedPasswords);
        let res = fetch("https://passop-password-manager-d9n8.onrender.com", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify(setPasswordArray) })
    }

    return (<>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <div className="fixed inset-0 -z-10 min-h-screen w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#429f42cf_100%)]"></div>
        <div className='mx-auto bg-slate-300 md:min-h-[71vh] mt-24 md:w-1/2 w-10/12 flex flex-col items-center p-5 rounded-lg shadow-2xl transition-all mb-20 md:mb-0'>
            <h1 className='text-4xl font-bold'><span className='text-green-700'>&lt;</span>Pass<span className='text-green-700'>OP/&gt;</span></h1>
            <p className='text-green-900 mt-1'>Your own Password Manager</p>
            <div className='flex flex-col p-5 my-3 gap-5 items-center'>
                <div>
                    <input value={form.site} required onChange={handleChange} name="site" placeholder='Enter Website URL' className='rounded-full md:w-[36vw] w-[60vw] p-1 px-5 border-green-700 border pr-6' type="text" />
                </div>
                <div className='flex md:flex-row flex-col gap-5'>
                    <div>
                        <input value={form.username} onChange={handleChange} name="username" placeholder='Enter Username' className='rounded-full md:w-[17vw] w-[60vw] p-1 pr-6 px-5 border-green-700 border' type="text" />
                    </div>
                    <div className="relative">
                        <input value={form.password} onChange={handleChange} name="password" placeholder='Enter Password' className='rounded-full md:w-[17vw] w-[60vw] p-1 px-5 border-green-700 border pr-10 relative' type="password" />
                        <span className="material-symbols-outlined absolute right-3 top-[7px] cursor-pointer fill-black" onClick={hidePassword}>
                            visibility
                        </span>
                        <span className="material-symbols-outlined absolute right-3 top-[7px] cursor-pointer fill-black hidden" onClick={showPassword}>
                            visibility_off
                        </span>
                    </div>
                </div>
            </div>
            <div className='bg-green-700 hover:bg-green-800 active:bg-green-900 transition-all rounded-full p-2 px-3 text-white font-medium cursor-pointer'>
                <button className='flex items-center gap-1' onClick={savePassword}>Add Password <lord-icon
                    src="https://cdn.lordicon.com/zdfcfvwu.json"
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#ffffff">
                </lord-icon></button>
            </div>
            <div className="passwords flex flex-col items-center w-full my-2">
                <div className='flex items-end relative w-full justify-center'>
                    <h2 className='text-2xl font-semibold my-5 md:mb-7 mb-10'>Your Passwords</h2>
                    {PasswordArray.length !== 0 && <div className='text-red-700 hover:text-red-900 active:text-red-950 cursor-pointer md:my-3 my-2 absolute right-2' onClick={deleteAllPasswords}>Delete all passwords</div>}
                </div>
                {PasswordArray.length === 0 ? <div className='text-gray-500'>No passwords saved yet.</div> :
                    <table className='table-fixed w-full text-center rounded-lg overflow-hidden shadow-lg'>
                        <thead className='bg-green-700 text-white'>
                            <tr>
                                <th className='py-1 md:font-medium font-normal md:text-lg text-sm'>Website</th>
                                <th className='py-1 md:font-medium font-normal md:text-lg text-sm'>Username</th>
                                <th className='py-1 md:font-medium font-normal md:text-lg text-sm'>Password</th>
                                <th className='py-1 md:font-medium font-normal md:text-lg text-sm'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-[#5fb9824d]'>
                            {PasswordArray.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='py-2 relative md:text-base text-sm'>{<a href={item.site} target='_blank'><div className='w-full break-all whitespace-normal text-center px-2 pr-8 tracking-wider'>{item.site}</div>
                                        </a>}
                                            <div className='cursor-pointer absolute md:right-2 right-1 top-1/2 transform -translate-y-1/2 hover:bg-slate-400 active:bg-slate-500 rounded-full transition-all' onClick={() => { copyToClipboard(item.site) }}><FaRegCopy /></div>
                                        </td>
                                        <td className='py-2 relative md:text-base text-sm'><div className='w-full break-all whitespace-normal text-center px-2 pr-8 tracking-wider'>{item.username}</div>
                                            <div className='cursor-pointer absolute md:right-2 right-1 top-1/2 transform -translate-y-1/2 hover:bg-slate-400 active:bg-slate-500 rounded-full transition-all' onClick={() => { copyToClipboard(item.username) }}><FaRegCopy /></div>
                                        </td>
                                        <td className='py-2 relative md:text-base text-sm'><div className='w-full break-all whitespace-normal text-center px-2 pr-8 tracking-wider'>{toggle === index ? item.password : "*".repeat(item.password.length)}</div>
                                            <div className='cursor-pointer absolute md:right-4 right-4 top-1/2 transform -translate-y-1/2 hover:bg-slate-400 active:bg-slate-500 rounded-full transition-all' onClick={() => { copyToClipboard(item.password) }}><FaRegCopy /></div>
                                            <div>
                                                <span className="material-symbols-outlined absolute -right-5 text-xl top-1/2 transform -translate-y-1/2 cursor-pointer fill-black mr-3" onClick={() => togglePassword(index)}>
                                                    {toggle === index ? "visibility_off" : "visibility"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className='flex items-center justify-center my-auto py-2 gap-2'>
                                            <div>
                                                <button onClick={() => handleEdit(index)}><span className="material-symbols-outlined text-[20px] cursor-pointer hover:bg-slate-400 active:bg-slate-500 rounded-full transition-all p-1">
                                                    edit
                                                </span></button>
                                            </div>
                                            <div>
                                                <button onClick={() => handleDelete(index)}><script src="https://cdn.lordicon.com/lordicon.js"></script>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/xyfswyxf.json"
                                                        trigger="hover"
                                                        style={{
                                                            "width": "20px", "height": "20px", "cursor": "pointer",
                                                            "color": "black",
                                                            "padding": "1px",
                                                        }}>
                                                    </lord-icon></button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    </>
    )
}

export default Manager
