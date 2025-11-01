import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import patchFundraiser from "../api/patch-fundraiser";
import "../pages/FundraiserPage.css";

export default function EditFundraiserForm({ fundraiser, onUpdate, onCancel}) {
    const navigate = useNavigate();
    const [goal, setGoal] = useState(fundraiser.goal);
    const [title, setTitle] = useState(fundraiser.title);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();

    if (!auth?.token) return null;
    if (fundraiser.owner !== auth.userId && fundraiser.owner !== Number(auth.userId)) return null;

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await patchFundraiser(fundraiser.id, { goal: Number(goal), title: title });
            onUpdate();
        } catch (err) {
            if (err.message.includes("403")) {
                navigate('/forbidden');
            } else {
            setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <label>
                Title:
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
            </label>
            <label>
                New Goal (hours):
                <input
                    type="number"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    min="0"
                    step="0.5"
                    required
                />
            </label>
            <div className="edit-form-buttons">
                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                </button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}