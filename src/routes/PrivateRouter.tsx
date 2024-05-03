import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

const PrivateRouter = () =>{
    return (
        <>
        <Header />
        <Outlet />
        </>
    )
}

export default PrivateRouter;