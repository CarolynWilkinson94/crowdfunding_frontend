import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard(props) {
  const { fundraiserData } = props;
  const fundraiserLink = `fundraiser/${fundraiserData.id}`;


const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = "https://private-user-images.githubusercontent.com/212821091/507528742-f385df44-dc76-4383-8494-da8a3f280511.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjE4MTYyNTYsIm5iZiI6MTc2MTgxNTk1NiwicGF0aCI6Ii8yMTI4MjEwOTEvNTA3NTI4NzQyLWYzODVkZjQ0LWRjNzYtNDM4My04NDk0LWRhOGEzZjI4MDUxMS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMDMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTAzMFQwOTE5MTZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT02NjNkODcwYmZlY2E0NjViZmY1NDk3OGRlN2FiYWQ0ZmE0YzEzOGZkM2MwZDkwZTRjOWRjZTg5MzRhZjYzNTYxJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.vap_4kUGypoVsTUOb_2PSSPpfmCMiK9AHjffYWttD4c";
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