import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alert from "./Alert";
import Spinner from "./Spinner";

export const FormContainer = ({ client, loading }) => {
  const navigateTo = useNavigate();
  {
    /* Validation Obj */
  }
  const newClientSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, "Name is too short")
      .max(15, "Name is too Long")
      .required("Client name is mandatory"),
    company: Yup.string().required("Company name is mandatory"),
    email: Yup.string()
      .email("Mail is not valid, myemail@example.com")
      .required("Email  is mandatory"),
    phone: Yup.number()
      .positive("Number is not valid")
      .integer("Number not valid")
      .typeError("Number is not valid"),
    notes: "",
  });

  // TODO finish submit function
  const handleSubmit = async (values) => {
    try {
      let response;
      if (client.id) {
        const url = `http://localhost:3600/clients/${client.id}`;
        response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("editing...");
      } else {
        // new client
        const url = "http://localhost:3600/clients";
        response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      await response.json();

      navigateTo("/clients");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="bg-white mt-10 px-5 py-10 rounded-md shadow-md 
            md:w-3/4 mx-auto"
    >
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {client?.name ? "Edit Client" : "Add Client"}
      </h1>
      {/* Creating the initial values */}
      <Formik
        initialValues={{
          name: client?.name ?? "",
          company: client?.company ?? "",
          email: client?.email ?? "",
          phone: client?.phone ?? "",
          notes: client?.notes ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={newClientSchema}
      >
        {/* touched : validate when clicking outside */}
        {({ errors, touched }) => {
          return loading ? (
            <Spinner />
          ) : (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">
                  Name:
                </label>
                <Field
                  id="name"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Client name"
                  name="name"
                />
                {errors.name && touched.name ? (
                  <Alert>{errors.name}</Alert>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="company">
                  Company name:
                </label>
                <Field
                  id="company"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Company name"
                  name="company"
                />
                {errors.company && touched.company ? (
                  <Alert>{errors.company}</Alert>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email:
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alert>{errors.email}</Alert>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="phone">
                  Phone number:
                </label>
                <Field
                  id="phone"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Client phone"
                  name="phone"
                />
                {errors.phone && touched.phone ? (
                  <Alert>{errors.phone}</Alert>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">
                  Notes:
                </label>
                <Field
                  as="textarea"
                  id="notes"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 h-30"
                  placeholder="Write a note..."
                  name="notes"
                />
              </div>
              <input
                type="submit"
                value={client?.name ? "Edit Cliente" : "Add Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

FormContainer.defaultProps = {
  client: {},
  loading: false,
};
