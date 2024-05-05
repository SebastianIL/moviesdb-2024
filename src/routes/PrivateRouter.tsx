import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

const PrivateRouter = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <Outlet />
    </div>
  );
}

export default PrivateRouter;
