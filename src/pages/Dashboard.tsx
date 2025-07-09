import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <main className="px-5 lg:px-15 md:px-8 py-8">
        <Outlet />
      </main>
    </>
  );
};

export default Dashboard;
