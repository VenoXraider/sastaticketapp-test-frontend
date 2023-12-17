import React, { useState } from 'react';
import "./layout.scss";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../buttons/primary";
import { useNavigate, Outlet } from 'react-router-dom';
import { expandSideBar, collapseSideBar } from '../../redux/slices/sidebar';
import { FaHome, FaBars } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { GoogleLogout } from 'react-google-login';
import { logout } from '../../redux/slices/auth';

const Layout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const sideBarExpanded = useSelector((state) => state.sidebar.expanded);
    const [selected, setSelected] = useState('menu_id_1');
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;


    const updatesSideBarState = () => {
        if (sideBarExpanded) {
            dispatch(collapseSideBar())
        } else {
            dispatch(expandSideBar())
        }
    }

    const nagivateMenu = (e) => {
        window.scrollTo(0, 0);
        setSelected(e.id)
        navigate(e.route);
    }

    const logoutHandler = () => {
        dispatch(logout());
    }

    const NAV_MENU = [
        {
            id: 'menu_id_1',
            name: "Dashboard",
            route: '/test/dashboard',
            iconOpen: <FaHome />,
            iconClosed: <FaHome size={24} />,
            disabled: false
        },
    ]

    return (
        <div className='w-screen h-screen flex'>
            <div className={`${sideBarExpanded ? 'hidden' : 'block'} w-80 bg-gray-900 py-10 px-5 flex flex-col justify-between h-screen transition-all duration-100 ease-in-out`}>
                <div className='h-auto'>
                    <div className='text-white text-center text-lg font-extrabold tracking-widest'>
                        <span className='text-2xl text-[#0a549b]'>S</span>asta <span className='text-2xl text-[#0a549b]'>T</span>icket
                    </div>

                    <div className='pt-10'>
                        {NAV_MENU.map((e) => (
                            <PrimaryButton
                                title={e.name}
                                left={true}
                                disabled={e.disabled}
                                onClick={() => nagivateMenu(e)}
                                style={{ border: selected === e.id ? '2px solid white' : 'none' }}
                                wfull={true}
                                icon={e.iconOpen}
                            />
                        ))}

                    </div>
                </div>

                <GoogleLogout
                    clientId={CLIENT_ID}
                    className='googleLogoutButton'
                    buttonText='Logout'
                    onLogoutSuccess={logoutHandler}
                />
            </div>
            <div className='w-full h-screen overflow-y-scroll bg-gray-50 py-10 px-5'>
                <div className='pb-5 flex justify-between'>
                    <FaBars size={28} cursor="pointer" color='black' onClick={updatesSideBarState} />

                    <div className='flex justify-between items-center gap-2'>
                        <img src={user?.profilePicture} className='w-8 h-8 rounded-full' alt="User Profile" />
                        <div className='capitalize text-md text-black font-bold'>{user?.username}</div>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
