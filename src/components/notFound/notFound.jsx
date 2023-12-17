import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getToken } from "../../services/storage";

const NotFound = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const back = (e) => {
        e.preventDefault();
        navigate('../');
    }
    const homePage = (e) => {
        e.preventDefault();
        if (user || getToken()) {
            navigate('/')
        } else {
            navigate('/')
        }
    }

    return (
        <div className="h-screen text-center flex justify-center items-center bg-violet-800">
            <div className="flex flex-col gap-4">
                <h1 className="text-9xl font-sans font-semibold text-white">404</h1>
                <p className="text-3xl font-sans font-semibold text-white">Page not found</p>
                <div className="flex flex-col gap-2">
                    <a href="/#" className="no-underline decoration-black bg-violet-500 rounded-md text-white p-3" onClick={(e) => back(e)}>Go Back</a>
                    <a href="/#" className="no-underline decoration-black bg-violet-500 text-white rounded-md p-3" onClick={(e) => homePage(e)}>Go to Home Page</a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;