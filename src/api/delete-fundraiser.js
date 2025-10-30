async function deleteFundraiser(fundraiserId) {
    const url = `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}/`;
    const token = window.localStorage.getItem("token");

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to delete fundraiser (${response.status})`);
    }

    return true;
}

export default deleteFundraiser;