import { useState } from "react";
import postFundraiser from "../api/post-fundraiser";
import { useNavigate } from "react-router-dom";

export default function CreateFundraiserPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        goal: "",
        image: "",
        is_open: true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function onChange(e) {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }

    async function onSubmit(e) {
        e.preventDefault();
        setError("");
        if (!form.title.trim()) return setError("Title is required");
        if (!form.description.trim()) return setError("Description is required.");
        const goal = Number(form.goal);
        if (!goal || goal <= 0) return setError("Goal must be a positive number.");

        setLoading(true);
        try {
            const created = await postFundraiser(
                form.title,
                null,
                form.description,
                form.image,
                form.goal,
                form.is_open,
                null
            );
            navigate(`/fundraiser/${created.id}`);

        } catch (err) {
            setError(err.info?.message ?? err.message ?? "Failed to create fundraiser.");
        } finally {
            setLoading(false);
        }
    }

    return (
    <main>
      <h1>Create fundraiser</h1>
      {error && <div role="alert">{String(error)}</div>}
      <form onSubmit={onSubmit}>
        <label>
          Title
          <input name="title" value={form.title} onChange={onChange} required />
        </label>
        <label>
          Description
          <textarea name="description" value={form.description} onChange={onChange} required />
        </label>
        <label>
          Goal (Hours)
          <input name="goal" type="number" value={form.goal} onChange={onChange} required />
        </label>
        <label>
          Image URL
          <input name="image" value={form.image} onChange={onChange} maxLength={500}/>
        </label>
        <label>
          Open for pledges
          <input name="is_open" type="checkbox" checked={form.is_open} onChange={onChange} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Creating…" : "Create fundraiser"}
        </button>
      </form>
    </main>
  );
    
}