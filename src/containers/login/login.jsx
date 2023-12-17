import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { login } from "../../redux/slices/auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

  const onSuccess = (res) => {
    const payload = {
      firstname: res.profileObj.givenName,
      lastname: res.profileObj.familyName,
      username: res.profileObj.name,
      email: res.profileObj.email,
      profilePicture: res.profileObj.imageUrl,
      accessToken: res.accessToken
    }

    dispatch(login({
      data: payload
    })).then((res) => {
      // navigate("/")
    })

  }
  const onFailure = (err) => {
    console.log(err);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-700">
      <GoogleLogin
        clientId={CLIENT_ID}
        className="w-52 shadow-xl"
        buttonText="Google Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
};

export default Login;
