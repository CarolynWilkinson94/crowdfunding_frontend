import { useState } from "react";
import postPledge from "../api/post-pledge";
import patchFundraiser from "../api/patch-fundraiser.js";
import { useAuth } from "../hooks/use-auth.js";

export default function PledgeForm({ fundraiserId, remainingHours, onPledgeCreated, refetchFundraiser }) {
    const { auth } = useAuth();
    const [hours, setHours] = useState("");
    const [comment, setComment] = useState("");
    const [anonymous, setAnonymous] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!fundraiserId) return null;


    // if (!fundraiser.is_open) return <div>This fundraiser is closed.</div>;
    if (remainingHours <= 0) return <div>Goal reached - thank you!</div>;

    if (!auth?.token) {
        return <p>Please log in to pledge your time.</p>;

    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        const parsed = Number(hours);
        if (!parsed || parsed <= 0) {
            setError("Please enter a number of hours greater than 0");
            return;
        }
        if (remainingHours && parsed > remainingHours) {
            setError(`You can pledge at most ${remainingHours} hours (remaining).`);
            return;
        }

     setLoading(true);
    try {
      const pledge = await postPledge({
        fundraiser_id: fundraiserId,
        amount: parsed,
        comment,
        anonymous,
      });

      onPledgeCreated?.(pledge);
      refetchFundraiser?.();

      setHours("");
      setComment("");
      setAnonymous(false);
    } catch (err) {
      setError(err.info?.message ?? err.message ?? "Error creating pledge");
      refetchFundraiser?.();
    } finally {
      setLoading(false);
    }
  }

    return (
        <form onSubmit={handleSubmit}>
      {error && <div role="alert" style={{ color: "crimson" }}>{error}</div>}
      <label>
        Hours
        <input
          type="number"
          min="0.5"
          step="0.5"
          value={hours}
          onChange={e => setHours(e.target.value)}
          required
        />
      </label>
      <label>Remaining: {remainingHours} hours</label>

      <label>
        Comment (optional)
        <textarea value={comment} onChange={e => setComment(e.target.value)} />
      </label>

      <label className="pledge-checkbox-label">
        <input type="checkbox" checked={anonymous} onChange={e => setAnonymous(e.target.checked)} />
        Pledge anonymously
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Pledging…" : "Pledge time"}
      </button>
    </form>
    );

}