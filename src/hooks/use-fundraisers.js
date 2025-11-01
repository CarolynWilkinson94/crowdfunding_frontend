import { useState, useEffect } from 'react';
import getFundraisers from '../api/get-fundraisers';

export default function useFundraisers () {
    const [fundraisers, setFundraisers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        console.log('Starting fundraisers fetch');
        let mounted = true;

        getFundraisers()
        .then((data) => {
            if(mounted) {
                setFundraisers(data);
                setIsLoading(false);
            }
        })
        .catch((error) => {
            if (mounted) {
                setError(error);
                setIsLoading(false);
            }
        });

        return () => {
            mounted = false;
        };
    }, []);

    return {fundraisers, isLoading, error};
}