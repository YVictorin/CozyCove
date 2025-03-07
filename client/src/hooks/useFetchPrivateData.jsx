import { useState, useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAxiosPrivate from "./useAxiosPrivate";

const useFetchPrivateData = (endpoint) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const refresh = useRefreshToken();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get(endpoint, {
                    signal: controller.signal
                });
                if (isMounted) {
                    setData(response.data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [endpoint, axiosPrivate]);

    return { data, error, refresh };
};

export default useFetchPrivateData;

// Example usage: Fetching user account details with authentication
// const { data, error, refresh } = useFetchPrivateData('/api/secretInfo');
