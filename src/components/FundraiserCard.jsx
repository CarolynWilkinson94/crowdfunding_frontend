import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard(props) {
  const { fundraiserData } = props;
  const fundraiserLink = `fundraiser/${fundraiserData.id}`;

  // Function to get relevant image based on fundraiser title/description
  const getRelevantImage = () => {
    const title = (fundraiserData.title || "").toLowerCase();
    const description = (fundraiserData.description || "").toLowerCase();
    const text = `${title} ${description}`;
    
    // Educational/Teaching
    if (text.includes('teach') || text.includes('education') || text.includes('tutor') || text.includes('lesson')) {
      return 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop&auto=format';
    }
    // Community/Volunteer
    if (text.includes('community') || text.includes('volunteer') || text.includes('help') || text.includes('support')) {
      return 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop&auto=format';
    }
    // Environmental
    if (text.includes('environment') || text.includes('clean') || text.includes('green') || text.includes('garden')) {
      return 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop&auto=format';
    }
    // Healthcare
    if (text.includes('health') || text.includes('medical') || text.includes('care') || text.includes('senior')) {
      return 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop&auto=format';
    }
    // Technology
    if (text.includes('tech') || text.includes('computer') || text.includes('digital') || text.includes('code')) {
      return 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop&auto=format';
    }
    // Arts/Creative
    if (text.includes('art') || text.includes('music') || text.includes('creative') || text.includes('paint')) {
      return 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop&auto=format';
    }
    // Food/Cooking
    if (text.includes('food') || text.includes('cook') || text.includes('meal') || text.includes('kitchen')) {
      return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop&auto=format';
    }
    // Sports/Fitness
    if (text.includes('sport') || text.includes('fitness') || text.includes('exercise') || text.includes('coach')) {
      return 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=400&h=250&fit=crop&auto=format';
    }
    // Default helping hands image
    return 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=250&fit=crop&auto=format';
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    // Fallback to a solid color placeholder if Unsplash fails
    e.target.src = `https://via.placeholder.com/400x250/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${encodeURIComponent(fundraiserData.title || 'TimeShare')}`;
  };

  return (
    <div className="fundraiser-card">
      <Link to={fundraiserLink} className="fundraiser-name">
        <div className="image-container">
          <img 
            src={fundraiserData.image || getRelevantImage()}
            alt={fundraiserData.title}
            onError={handleImageError} 
            />
          <div className="action-indicator"></div>
        </div>
        <div className="content-area">
          <h3>{fundraiserData.title}</h3>
          
          {/* Time-based progress bar */}
          <div className="fundraiser-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${Math.min(((fundraiserData.current_time || 0) / (fundraiserData.goal_time || 1)) * 100, 100)}%`}}
              ></div>
            </div>
          </div>
          
          <div className="fundraiser-amount">
            <span className="amount-raised">
              {formatTime(fundraiserData.current_time || 0)} donated
            </span>
            <span className="amount-goal">
              goal: {formatTime(fundraiserData.goal_time || 0)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );

  function formatTime(hours) {
    if (hours < 1) return `${Math.round(hours * 60)} min`;
    if (hours < 24) return `${Math.round(hours)} hrs`;
    const days = Math.floor(hours / 24);
    const remainingHours = Math.round(hours % 24);
    return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days} days`;
  }
}

export default FundraiserCard;