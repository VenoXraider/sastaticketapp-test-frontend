const getToken = () => {
    if (typeof window !== 'undefined') {
        let authData = localStorage.getItem("test_app_token");
        if (authData) {
            authData = JSON.parse(authData);
            return authData.token;
        }
        return undefined;
    } else {
        return undefined;
    }
};

const getUser = () => {
    let authData = localStorage.getItem("test_app_user");
    if (authData) {
        authData = JSON.parse(authData);
        return authData.user;
    }
    return undefined;
};

const checkAthenticatedUser = () => {
    let authData = localStorage.getItem("test_app_user");
    if (authData) {
        return true;
    }
    return false;
};

const saveStorage = (user) => {
    let authUser = JSON.stringify({ user });
    let authToken = JSON.stringify({ token: user.accessToken });
    localStorage.setItem("test_app_user", authUser);
    localStorage.setItem("test_app_token", authToken);
};

const saveStorageMe = (user) => {
    let authUser = JSON.stringify({ user });
    localStorage.setItem("test_app_user", authUser);
};

const removeStorage = () => {
    localStorage.removeItem("test_app_user");
    localStorage.removeItem("test_app_token");
};

const refreshStorage = (user) => {
    let authData = localStorage.getItem("test_app_user");
    if (authData) {
        authData = JSON.parse(authData);
        authData.user = user;
        localStorage.setItem("test_app_user", JSON.stringify(authData));
        localStorage.setItem("test_app_token", JSON.stringify({
            token: user.accessToken
        }));
    }
};

export {
    getToken,
    getUser,
    checkAthenticatedUser,
    saveStorage,
    removeStorage,
    refreshStorage,
    saveStorageMe
}
