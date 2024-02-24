import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <Link className="m-[5px]" to="/">Login</Link>
                <Link className="m-[5px]" to="/skills">My Skills</Link>
                <Link className="m-[5px]" to="/projects">My Projects</Link>
            </nav>
            <Outlet />
        </>
    )
};

export default Layout;