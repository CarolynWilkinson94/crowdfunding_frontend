import { useState, useEffect } from "react";
import getFundraiser from "../api/get-fundraiser";

export default function useFundraiser(fundraiserId) {
    const [fundraiser, setFundraiser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getFundraiser(fundraiserId)
        .then((fundraiser) => {
            setFundraiser(fundraiser);
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    }, [fundraiserId]);

    return { fundraiser, isLoading, error };
}