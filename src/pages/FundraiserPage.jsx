import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useNavigate, Navigate } from "react-router-dom";
import deleteFundraiser from "../api/delete-fundraiser";
import useFundraiser from "../hooks/use-fundraiser";
import PledgeForm from "../components/PledgeForm";
import EditFundraiserForm from "../components/EditFundraiserForm";
import "./FundraiserPage.css";

function FundraiserPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { auth } = useAuth();
    const { fundraiser, isLoading, error, refetch } = useFundraiser(id);
    const [isEditing, setIsEditing] = useState(false);

    function handlePledgeCreated(newPledge) {
        refetch();
    }

    function handleUpdateSuccess() {
        setIsEditing(false);
        refetch();
    }

     if (isLoading) {
        return (<p>loading...</p>)
    }

    if (error) {
        if (error.message.includes("404")) {
            return <Navigate to="/not-found" replace />;
        }
        if (error.message.includes("403")) {
            return <Navigate to="/forbidden" replace />;
        }
        return (<p>{error.message}</p>)
    }

    if (!fundraiser) return null;

    const totalPledged = (fundraiser.pledges || []).reduce(
        (sum, p) => sum + Number(p.amount || 0),
        0
    );
    const goal = Number(fundraiser.goal ?? fundraiser.target ?? 0);
    const remaining = Math.max(0, goal - totalPledged);
    console.log("Auth state:", {
        authToken: auth?.token,
        authUserId: auth?.userId,
        authUserIdType: typeof auth?.userId
    });

    console.log("Fundraiser state:", {
        owner: fundraiser.owner,
        ownerType: typeof fundraiser.owner
    });

console.log("Equality check:", {
    strictEqual: fundraiser.owner === auth?.userId,
    looseEqual: fundraiser.owner == auth?.userId,
    values: `${fundraiser.owner} === ${auth?.userId}`
});
    const canEdit = auth?.token && (
        fundraiser.owner === auth.userId ||
        fundraiser.owner === Number(auth.userId)
    );

    console.log("Can edit?", canEdit, "owner:", fundraiser.owner, "auth:", auth);
    
    console.log("Updated fundraiser data:", fundraiser);

    return (
    <>
        <div>
            <h2>{fundraiser.title}</h2>
            <p className="fundraiser-creator">Created by: {fundraiser.owner_username || "Anonymous"}</p>
            <div className="fundraiser-container">
                <div className="fundraiser-image">
                    <img
                        src={fundraiser.image}
                        alt={fundraiser.title}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://i.imgur.com/4bPVW2e.png";
                        }}
                        style={{ maxWidth: '100%', height: 'auto', marginBottom: '1rem' }}
                    />
                </div>
                <div className="fundraiser-content">
                    <p>Created at: {fundraiser.date_created}</p>
                    <p>{`Status: ${fundraiser.is_open}`}</p>

                    {isEditing ? (
                        <EditFundraiserForm
                            fundraiser={fundraiser}
                            onUpdate={handleUpdateSuccess}
                            onCancel={() => setIsEditing(false)}
                        />
                    ) : (
                        <div className="fundraiser-details">
                            <div className="goal-section">
                                <p>Goal (hours): {goal}</p>
                                {canEdit && (
                                    <div className="fundraiser-actions">
                                        <button 
                                            onClick={() => setIsEditing(true)}
                                            className="edit-button"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={async () => {
                                                if (window.confirm('Are you sure you want to delete this fundraiser?')) {
                                                    try {
                                                        await deleteFundraiser(fundraiser.id);
                                                        navigate('/');
                                                    } catch (err) {
                                                        if (err.message.includes("403")) {
                                                            navigate('/forbidden');
                                                        } else if (err.message.includes("404")) {
                                                            navigate('/not-found');
                                                        } else {
                                                            alert('Failed to delete fundraiser: ' + err.message);
                                                        }
                                                    }
                                                }
                                            }}
                                            className="delete-button"
                                        >
                                            Delete Fundraiser
                                        </button>
                                    </div>
                                )}
                            </div>
                            <p>Pledged so far: {totalPledged} hours</p>
                            <p>Remaining: {remaining} hours</p>
                        </div>
                    )}
                </div>
            </div>

            <h3>Pledges:</h3>
            <ul>
                {(fundraiser.pledges || []).map((pledgeData, idx) => (
                    <li key={pledgeData.id ?? idx}>
                        {pledgeData.amount} hours{" "}
                        {pledgeData.anonymous ? "- anonymous" : `- from ${pledgeData.supporter_username ?? "supporter"}`}
                        {pledgeData.comment ? <div>{pledgeData.comment}</div> : null}
                    </li>
                ))}
            </ul>
            {fundraiser.is_open && remaining > 0 ? (
                <PledgeForm
                    fundraiserId={fundraiser.id}
                    remainingHours={remaining}
                    onPledgeCreated={handlePledgeCreated}
                    refetchFundraiser={refetch}
                />
            ) : (
                <div>{fundraiser.is_open ? "Goal reached" : "Fundraiser closed"}</div>
            )}
        </div>
    </>
);
}

export default FundraiserPage;