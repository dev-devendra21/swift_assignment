import { Link } from "react-router-dom";
import { getUsersById } from "../api/users";
import logo from "../assets/img/logo.svg";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUsersById();
      setUser(data.name);
    };
    fetchUser();
  }, []);
  return (
    <header className="px-5 lg:px-15 md:px-8 flex items-center justify-between bg-[#272A4B]">
      <section>
        <img
          src={logo}
          alt="company logo"
          className="w-25 h-25"
          loading="lazy"
        />
      </section>
      <section className="flex items-center justify-between gap-2">
        <Link to="/profile">
          <div className="w-12 h-12 rounded-full justify-center items-center flex font-bold text-[#272A4B] bg-[#f2f2f2]">
            {user === ""
              ? "JD"
              : user?.split(" ")[0][0] + user?.split(" ")[1][0]}
          </div>
        </Link>
        <h1 className="text-[#f2f2f2]">{user ?? "John Doe"}</h1>
      </section>
    </header>
  );
};

export default Navbar;
