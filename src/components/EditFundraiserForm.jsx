import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import patchFundraiser from "../api/patch-fundraiser";

export default function EditFundraiserForm({ fundraiser, onUpdate, onCancel}) {
    const navigate = useNavigate();
    const [goal, setGoal] = useState(fundraiser.goal);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();

    if (!auth?.token) return null;
    if (fundraiser.owner !== auth.userId) return null;

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await patchFundraiser(fundraiser.id, { goal: Number(goal) });
            onUpdate();
        } catch (err) {
            if (err.message.includes("403")) {
                Navigate('/forbidden');
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
            <div>
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