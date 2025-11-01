import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard(props) {
  const { fundraiserData } = props;
  const fundraiserLink = `fundraiser/${fundraiserData.id}`;


const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = "https://i.imgur.com/4bPVW2e.png";
};

  return (
    <div className="fundraiser-card">
      <Link to={fundraiserLink} className="fundraiser-name">
        <img 
          src={fundraiserData.image}
          alt={fundraiserData.title}
          onError={handleImageError} 
          />
        <h3 >{fundraiserData.title}</h3>
      </Link>
    </div>
  );
}

export default FundraiserCard;