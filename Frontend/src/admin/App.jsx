import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminRoute from "./AdminRoute";
import Dashboard from "./pages/dashboard";
import PageNotFound from "./pages/PageNotFound";
import Orders from "./pages/Orders";
import Tickets from "./pages/Tickets";
import { Toaster } from "react-hot-toast";
import AppProviders from "./providers/AppProviders";
import Form from "./components/shared/Form";

function AdminApp() {
    return (
        <>
            <Routes>
                <Route path="login" element={<Login />} />

                <Route element={<AdminRoute />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={
                        <AppProviders>
                            <Dashboard />
                            <Form />
                        </AppProviders>
                    }>
                        <Route index element={<Orders />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="tickets" element={<Tickets />} />
                    </Route>
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Toaster position="top-center" reverseOrder={false} />

        </>
    );
};

export default AdminApp;
