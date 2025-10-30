async function postPledge({ fundraiser_id, amount, comment = "", anonymous = false }) {
const url = `${import.meta.env.VITE_API_URL}/pledges/`;
const token = window.localStorage.getItem("token");

const headers = { "Content-Type": "application/json" };
if (token) headers.Authorization = `Token ${token}`;

const response = await fetch(url, {
method: "POST",
headers,
body: JSON.stringify({
fundraiser: fundraiser_id,
amount,
comment,
anonymous,
}),
});

if (!response.ok) {
    let data = null;
    try {
        data = await response.json();
    } catch (e) {

    }
    const msg = data?.detail ?? data?.message ?? `Failed to create pledge (${response.status})`;
    const err = new Error(msg);
    err.info = data;
    err.status = response.status;
    throw err;
}

return await response.json();
}

export default postPledge;