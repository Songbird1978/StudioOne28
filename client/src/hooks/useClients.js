import { useState, useEffect } from "react";
import { fetchClients } from "../api/clientsApi.js";

export default function useClients() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchClients()
            .then((data) => {
                setClients(data.data);
                //console.log(
                   // "fetched clients data",
                  //  JSON.stringify(data, null, 2)
               // );
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { clients, loading, error };
}
