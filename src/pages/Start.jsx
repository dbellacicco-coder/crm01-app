import { useEffect, useState } from "react";
import Client from "../Components/Client";

export const Start = () => {
  const [clients, setClients] = useState([]);

  const handleDelete = async (id) => {
    const confirmed = confirm("Would you like to delete this client?");

    if (confirmed) {
      try {
        const url = `http://localhost:3600/clients/${id}`;
        const response = await fetch(url, {
          method: "DELETE",
        });
        await response.json();
        const clientArray = clients.filter((client) => client.id !== id);
        setClients(clientArray);
      } catch (error) {}
    }
    console.log("deleting", id);
  };

  useEffect(() => {
    const getClientsFromAPI = async () => {
      try {
        const url = "http://localhost:3600/clients";
        const response = await fetch(url);
        const result = await response.json();
        setClients(result);
      } catch (err) {
        console.log(err);
      }
    };
    getClientsFromAPI();
  }, []);

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clients</h1>
      <p className="mt-3">Clients Manager Panel</p>
      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Company</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <Client
              key={client.id}
              client={client}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
