// Page Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Roadmap from "./pages/Roadmap";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import ForEnterprise from "./pages/ForEnterprise";
import CourseDetail from "./pages/CourseDetail"; // Import the new page
import About from "./pages/About";
import Courses from "./pages/Courses";
import WorkshopDetail from "./pages/WorkshopDetail"; // <--- ADD THIS LINE

/**
 * 🔹 CENTRAL ROUTE CONFIGURATION
 */
export const routeConfig = [
    {
        path: "/about",
        label: "About Us",
        showInNav: true,
        title: "SETU | About Our Mission",
        description: "Learn more about our mission.",
        element: <About />,
        protected: false
    },
    {
        path: "/courses",
        label: "Courses",
        showInNav: true,
        title: "SETU | Courses | Browse our AI courses",
        description: "Browse our AI courses.",
        element: <Courses />,
        protected: false
    },
    {
        path: "/",
        label: "Home",
        showInNav: true,
        title: "SETU | Welcome to SETU - Your gateway to Data Science and AI.",
        description: "Welcome to SETU - Your gateway to Data Science and AI.",
        element: <Home />,
        protected: false
    },
    {
        path: "/login",
        label: "Login",
        showInNav: false,
        title: "SETU | Login",
        description: "Login to your SETU account.",
        element: <Login />,
        protected: false
    },
    {
        path: "/register",
        label: "Register",
        showInNav: false,
        title: "SETU | Register",
        description: "Create a new SETU account.",
        element: <Register />,
        protected: false
    },
    {
        path: "/roadmap",
        label: "Roadmap",
        showInNav: true,
        title: "SETU | Your AI | Follow our step-by-step roadmap to master AI",
        description: "Follow our step-by-step roadmap to master AI.",
        element: <Roadmap />,
        protected: false
    },
    {
        path: "/enterprise",
        label: "Enterprise",
        showInNav: true,
        title: "SETU | For Enterprise | SETU solutions for enterprise and businesses",
        description: "SETU solutions for enterprise and businesses.",
        element: <ForEnterprise />,
        protected: false
    },
    {
        path: "/profile",
        label: "My Profile",
        showInNav: true,
        title: "SETU | Dashboard",
        description: "Access your student courses and account settings.",
        element: <Profile />,
        protected: true,
        role: "user" // optional: specific role requirement
    },
    {
        path: "/course/:courseId", // Dynamic path
        label: "Course",
        showInNav: false,
        title: "SETU | Course", // Fallback title
        description: "Explore our specialized AI and Data courses.",
        element: <CourseDetail />,
        protected: false
    }, {
        path: "/workshop/:workshopId",
        label: "Workshop",
        showInNav: false,
        title: "SETU | Workshop",
        element: <WorkshopDetail />,
        protected: false
    },
    {
        path: "/admin",
        label: "Admin",
        showInNav: false,
        title: "SETU | Admin Dashboard",
        description: "Administrative access.",
        element: <Admin />,
        protected: true,
        role: "admin"
    }
];
