import { FaArrowLeftLong } from "react-icons/fa6";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import type { User } from "../utils/types/users";
import { useEffect, useState } from "react";
import { getUsersById } from "../api/users";

const Profile = () => {
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    const fetchUserData = async () => {
      try {
        const data = await getUsersById();
        setUserData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error ?? "Something went wrong"}</div>;

  return (
    <>
      <title>Profile</title>
      <div className="min-h-screen">
        <h1 className="text-2xl font-semibold mb-4">
          <Link to="/comments">
            <FaArrowLeftLong className="inline-block mr-2" />
          </Link>
          Welcome, {userData?.name}
        </h1>
        <Card className="w-full h-auto md:h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)] ">
          <Card.Header
            initials={
              `${userData?.name.split(" ")[0][0]}${
                userData?.name.split(" ")[1][0]
              }` || ""
            }
            name={userData?.name ?? ""}
            email={userData?.email ?? ""}
          />

          <Card.Grid>
            <Card.Field label="User ID" value={userData?.id} />
            <Card.Field label="Name" value={userData?.name} />
            <Card.Field label="Email ID" value={userData?.email} />
            <Card.Field
              label="Address"
              value={`${userData?.address.street}, ${userData?.address.suite}, ${userData?.address.city}, ${userData?.address.zipcode}`}
            />
            <Card.Field label="Phone" value={userData?.phone} />
          </Card.Grid>
        </Card>
      </div>
    </>
  );
};

export default Profile;
