import { useState } from "react";
import postFundraiser from "../api/post-fundraiser";
import { useNavigate } from "react-router-dom";
import "./CreateFundraiser.css";

const DEFAULT_IMAGE = "https://github.com/user-attachments/assets/f385df44-dc76-4383-8494-da8a3f280511";

export default function CreateFundraiserPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        goal: "",
        image: DEFAULT_IMAGE,
        is_open: true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function onChange(e) {
        const { name, value, type, checked } = e.target;
        if (name === "image" && !value.trim()) {
          setForm(prev => ({ ...prev, image: DEFAULT_IMAGE }));
          return;
        }
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
                form.image || DEFAULT_IMAGE,
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
        <div className="create-fundraiser-container">
            <div className="create-header">
                <h1 className="create-title">Create Fundraiser</h1>
                <p className="create-subtitle">Share your musical project with the community.</p>
            </div>
            
            {error && <div className="error-message" role="alert">{String(error)}</div>}
            
            <form className="fundraiser-form" onSubmit={onSubmit}>
                <div className="form-section">
                    <h2 className="section-title">Project Details</h2>
                    
                    <div className="form-group">
                        <label className="form-label">
                            Title <span className="required">*</span>
                        </label>
                        <input 
                            className="form-input"
                            name="title" 
                            value={form.title} 
                            onChange={onChange} 
                            required 
                            placeholder="Enter your project title"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">
                            Description <span className="required">*</span>
                        </label>
                        <textarea 
                            className="form-textarea"
                            name="description" 
                            value={form.description} 
                            onChange={onChange} 
                            required
                            placeholder="Describe your musical project..."
                        />
                    </div>
                    
                    <div className="form-row two-columns">
                        <div className="form-group">
                            <label className="form-label">
                                Goal (Hours) <span className="required">*</span>
                            </label>
                            <input 
                                className="form-input"
                                name="goal" 
                                type="number" 
                                value={form.goal} 
                                onChange={onChange} 
                                required
                                min="1"
                                placeholder="Number of hours needed"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">Image URL (optional)</label>
                            <input 
                                className="form-input"
                                name="image" 
                                value={form.image} 
                                onChange={onChange} 
                                maxLength={500} 
                                placeholder="Leave empty to use default image"
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label" style={{flexDirection: 'row', alignItems: 'center', gap: 'var(--space-3)'}}>
                            <input 
                                name="is_open" 
                                type="checkbox" 
                                checked={form.is_open} 
                                onChange={onChange} 
                            />
                            Open for pledges
                        </label>
                    </div>
                </div>
                
                <div className="form-actions">
                    <button 
                        className="btn-submit" 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? "Creating…" : "Create Fundraiser"}
                    </button>
                    <button 
                        className="btn-cancel" 
                        type="button" 
                        onClick={() => navigate('/')}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
    
}