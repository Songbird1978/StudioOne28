import "./studio.css";
import useClients from "../../hooks/useClients.js";
import PageContainer from "../../components/pageContainer/pageContainer.js";

function Clients() {
    const { clients, loading, error } = useClients();

    if (loading) return <p>Loading…</p>;
    if (error) return <p>Error fetching clients.</p>;

    return (
        <PageContainer>
            <div>
                {clients.map((c) => (
                    <div key={c.id}>{c.names}</div>
                ))}
            </div>
        </PageContainer>
    );
}

export default Clients;
