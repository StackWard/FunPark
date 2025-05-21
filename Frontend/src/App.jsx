import { Route, Routes } from "react-router-dom";
import ClientApp from "./client/App";
import AdminApp from "./admin/App";

function App() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<ClientApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </>
  );
};

export default App;
