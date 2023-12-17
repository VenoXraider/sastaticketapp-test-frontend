import React, { useEffect, useState } from 'react';
import './App.scss';
import Navigation from './navigation/navigation';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import PreLoader from './components/preLoader/preLoader';
import { getToken } from "./services/storage";
import { gapi } from 'gapi-script';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const userStatus = useSelector((state) => state.auth.status);
  const [isLoading, setIsLoading] = useState(true);
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: ""
      })
    }
    gapi.load('client:auth2', start);
  });

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate('/');
      setIsLoading(false);
    } else {
      setIsLoading(false);
      const urlPrefix = location.pathname.split('/')[1];
      if (urlPrefix === 'test') {
        navigate('/login');
      }
    }
  }, []);

  useEffect(() => {
    if (userStatus === 'succeeded' || userStatus === 'failed') {
      setIsLoading(false);
    }
  })

  useEffect(() => {
    if (userStatus === 'succeeded') {
      if (!user) {
        const urlPrefix = location.pathname.split('/')[1];
        if (urlPrefix === 'test') {
          navigate('/login');
        } else {
          navigate(location.pathname);
        }
      } else {
        const urlPrefix = location.pathname.split('/')[1];
        if (urlPrefix !== 'test') {
          navigate('/test/dashboard');
        } else {
          if (location.search) {
            navigate(`${location.pathname}${location.search}`);
          } else {
            navigate(location.pathname);
          }
        }
      }
    } else if (userStatus === 'failed') {
      navigate('/login');
    }
  }, [user]);


  return (
    <>
      {
        isLoading ? (
          <PreLoader />
        ) : (
          <Navigation />
        )
      }
    </>
  )
}

export default App;
