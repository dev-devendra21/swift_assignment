import { type Comment } from "../utils/types/comments";

export async function getComments(): Promise<Comment[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments");
  const data: Comment[] = await res.json();
  return data;
}
