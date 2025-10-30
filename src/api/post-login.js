async function postLogin(username, password) {
    const tokenUrl = `${import.meta.env.VITE_API_URL}/api-token-auth/`;
    const tokenResponse = await fetch(tokenUrl, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
        }),
    });

    if (!tokenResponse.ok) {
        const fallbackError = `Error trying to login`;
        const data = await tokenResponse.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }
    
    const tokenData = await tokenResponse.json();

    return {
        token: tokenData.token,
        userId: tokenData.user_id
    };
}

export default postLogin;