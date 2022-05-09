import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { EditClient } from "./pages/EditClient";
import { NewClient } from "./pages/NewClient";
import { Start } from "./pages/Start";
import ViewClient from "./pages/ViewClient";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clients" element={<Layout />}>
          <Route index element={<Start />} />
          <Route path="new" element={<NewClient />} />
          <Route path="edit/:id" element={<EditClient />} />
          <Route path=":id" element={<ViewClient />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
