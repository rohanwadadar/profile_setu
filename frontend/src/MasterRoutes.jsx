import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import ProtectedRoute from "./auth/ProtectedRoute";
import { routeConfig } from "./routeConfig.jsx";

/**
 * 🔹 PAGE MANAGER (SEO & UX)
 */
function PageManager() {
    const { pathname } = useLocation();

    useEffect(() => {
        // 1. Find the current route data from our config
        // Case-Insensitive Matching
        const current = routeConfig.find((route) => {
            const normalize = (p) => p.toLowerCase().replace(/\/$/, "") || "/";
            return normalize(route.path) === normalize(pathname);
        });

        // 2. Dynamic Tab Title
        if (current) {
            document.title = current.title;
        } else {
            document.title = "SETU | Empowering Learners";
        }

        // 3. Dynamic Meta Description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", current?.description || "SETU School of AI");
        }

        // 4. Scroll to Top
        window.scrollTo(0, 0);

    }, [pathname]);

    return null;
}

/**
 * 🔹 MAIN ROUTER COMPONENT
 */
export default function MasterRoutes() {
    return (
        <BrowserRouter>
            {/* Handles titles and scrolling behind the scenes */}
            <PageManager />

            {/* Wraps every page with our Layout */}
            <Layout>
                <Routes>
                    {/* Automatically generate all routes from the config array */}
                    {routeConfig.map((route) => {

                        // Decide what element to render (Protected vs Public)
                        let elementToRender = route.element;

                        if (route.protected) {
                            elementToRender = (
                                <ProtectedRoute role={route.role}>
                                    {route.element}
                                </ProtectedRoute>
                            );
                        }

                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={elementToRender}
                            />
                        );
                    })}

                    {/* 404 - Page Not Found (Catch-all) */}
                    <Route
                        path="*"
                        element={
                            <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
                                <h1 className="text-4xl font-bold mb-4">404</h1>
                                <p className="text-xl">Oops! The page you are looking for doesn't exist.</p>
                            </div>
                        }
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
