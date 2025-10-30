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
        <div id="fundraiser-list">
            {fundraisers?.map((fundraiserData, key) => {
                return <FundraiserCard key={fundraiserData.id || key} fundraiserData={fundraiserData} />;

            })}
        </div>
    );

}

export default HomePage;