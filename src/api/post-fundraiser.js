async function postFundraiser(title, owner, description, image, target, is_open, date) {
    const url = `${import.meta.env.VITE_API_URL}/fundraisers/`;
    const token = window.localStorage.getItem("token");

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            ...(token ? { Authorization: `Token ${token}` } : {})

        },
        body: JSON.stringify({ title, description, goal, image, is_open, date})
    });

   if (!response.ok) {
        const fallbackError = `Error creating fundraiser.`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default postFundraiser;