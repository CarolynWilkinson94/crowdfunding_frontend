export default async function patchFundraiser(fundraiserId, data) {
    const url = `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}/`;
    const token = window.localStorage.getItem("token");

    const response = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Token ${token}` } : {}),

        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errData = await response.json().catch(() => null);
        const err = new Error(errData?.detail ?? `Failed to update fundraiser (${response.status})`);
        err.info = errData;
        throw err;
    }

    return response.json();
}