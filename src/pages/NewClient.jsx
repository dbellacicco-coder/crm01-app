import React from "react";
import { FormContainer } from "../Components/FormContainer";

export const NewClient = () => {
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">New Client</h1>
      <p className="mt-3">Fill up the form to register a new client</p>
      <FormContainer />
    </>
  );
};
