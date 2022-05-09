import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormContainer } from "../Components/FormContainer";

export const EditClient = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const getClientAPI = async () => {
      try {
        const url = `http://localhost:3600/clients/${id}`;
        // const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setClient(result);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setLoading(!loading);
      }, 2000);
    };
    getClientAPI();
  }, []);
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Edit Client</h1>
      <p className="mt-3">Start edit current client</p>
      {client.name ? (
        <FormContainer loading={loading} client={client} />
      ) : (
        <p>Cliente no exite</p>
      )}
    </>
  );
};
