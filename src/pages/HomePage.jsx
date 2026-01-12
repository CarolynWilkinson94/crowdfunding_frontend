import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";


function HomePage() {
    console.log('Homepage rendering');      
    const { fundraisers, isLoading, error } = useFundraisers();

    if (isLoading) {
        return (<p>loading...</p>)
    }

    if (error) {
        return (<p>{error.message}</p>)
    }

    return (
        <div>
            <h1>Tunes for Change</h1>
            <h3>Welcome to Tunes for Change!<br></br>
                Explore fundraisers below or head to the about page to learn more.
            </h3>
            
            <div id="fundraiser-list">
                {fundraisers?.map((fundraiserData, key) => {
                    return <FundraiserCard key={fundraiserData.id || key} fundraiserData={fundraiserData} />;
                })}
            </div>
        </div>
    );

}

export default HomePage;