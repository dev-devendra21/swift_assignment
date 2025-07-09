import type { User } from "../utils/types/users";

export async function getUsersById(id: number = 1): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data: User = await res.json();
  return data;
}
