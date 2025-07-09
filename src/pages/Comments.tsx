import Table from "../components/Table";
import { PiCaretUpDownThin } from "react-icons/pi";
import { PiCaretDownThin } from "react-icons/pi";
import { PiCaretUpThin } from "react-icons/pi";
import { useState, useEffect } from "react";
import { getComments } from "../api/comments";
import type { Comment } from "../utils/types/comments";
import { FaSearch } from "react-icons/fa";
import Pagination from "../components/Pagination";

function Comments() {
  const [comments, setComments] = useState<Comment[]>();
  const [originalData, setOriginalData] = useState<Comment[]>([]);
  const [sort, setSort] = useState<{ sortBy: string; order: string }>({
    sortBy: "id",
    order: "default",
  });
  const [itemsPerPage, setItemsPerPage] = useState(
    Number(localStorage.getItem("itemsPerPage")) || 10
  );
  const [currentPage, setCurrentPage] = useState(
    Number(localStorage.getItem("currentPage")) || 1
  );

  const [search, setSearch] = useState(
    localStorage.getItem("searchValue") || ""
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments();
      setComments(data.slice(startIndex, endIndex));
      setOriginalData(data);
    };
    fetchComments();
  }, [startIndex, endIndex]);

  const handlePageChange = (page: number): void => {
    setItemsPerPage(Number(page));
    setCurrentPage(1);
    setComments(originalData.slice(0, Number(page)));
    localStorage.setItem("itemsPerPage", String(page));
  };

  const handleCurrentPage = (page: number): void => {
    setCurrentPage(page);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setComments(originalData.slice(startIndex, endIndex));
    localStorage.setItem("currentPage", String(page));
  };

  const handleSearch = () => {
    if (search === "") {
      setComments(originalData.slice(startIndex, endIndex));
    } else {
      const filteredData = comments?.filter((comment) => {
        return (
          comment.name.toLowerCase().includes(search.toLowerCase()) ||
          comment.email.toLowerCase().includes(search.toLowerCase()) ||
          comment.body.toLowerCase().includes(search.toLowerCase())
        );
      });
      setComments(filteredData);
    }
  };
  const handleSort = (
    sort: { sortBy: string; order: string },
    data: Comment[]
  ) => {
    const sorted = [...data];

    if (
      sort.order === "default" &&
      (sort.sortBy === "name" ||
        sort.sortBy === "email" ||
        sort.sortBy === "id")
    ) {
      setComments(originalData.slice(startIndex, endIndex));
    } else {
      if (sort.sortBy === "name" || sort.sortBy === "email") {
        const sortType = sort.sortBy === "name" ? "name" : "email";
        if (sort.order === "asc") {
          sorted.sort((a, b) => a[sortType].localeCompare(b[sortType]));
        } else {
          sorted.sort((a, b) => b[sortType].localeCompare(a[sortType]));
        }
      } else if (sort.sortBy === "id") {
        if (sort.order === "asc") {
          sorted.sort((a, b) => Number(a.id) - Number(b.id));
        } else {
          sorted.sort((a, b) => Number(b.id) - Number(a.id));
        }
      }
      setComments(sorted);
      localStorage.setItem("sortBy", sort.sortBy);
      localStorage.setItem("order", sort.order);
    }

    const nextOrder =
      sort.order === "default"
        ? "asc"
        : sort.order === "asc"
        ? "desc"
        : "default";
    setSort({ ...sort, order: nextOrder });
  };
  return (
    <div>
      <title>Comments</title>
      <section className="flex items-center justify-between flex-wrap">
        <section>
          <button
            onClick={() => handleSort({ ...sort, sortBy: "id" }, comments!)}
            type="button"
            className=" text-[#272A4B] p-2 mr-2 text-sm rounded-md shadow-md mb-4 cursor-pointer"
          >
            Sort Post ID
            {sort.sortBy === "id" ? (
              sort.order === "asc" ? (
                <PiCaretUpThin className="ml-1 inline-block w-5 h-5" />
              ) : sort.order === "desc" ? (
                <PiCaretDownThin className="ml-1 inline-block w-5 h-5" />
              ) : (
                <PiCaretUpDownThin className="ml-1 inline-block w-5 h-5" />
              )
            ) : (
              <PiCaretUpDownThin className="ml-1 inline-block w-5 h-5" />
            )}
          </button>

          <button
            type="button"
            className=" text-[#272A4B] p-2 mr-2 text-sm rounded-md shadow-md mb-4"
            onClick={() => handleSort({ ...sort, sortBy: "name" }, comments!)}
          >
            Sort Name
            {sort.sortBy === "name" ? (
              sort.order === "asc" ? (
                <PiCaretUpThin className="ml-1 inline-block w-5 h-5" />
              ) : sort.order === "desc" ? (
                <PiCaretDownThin className="ml-1 inline-block w-5 h-5" />
              ) : (
                <PiCaretUpDownThin className="ml-1 inline-block w-5 h-5" />
              )
            ) : (
              <PiCaretUpDownThin className="ml-1 inline-block w-5 h-5" />
            )}
          </button>

          <button
            type="button"
            className=" text-[#272A4B] p-2 text-sm rounded-md shadow-md mb-4"
            onClick={() => handleSort({ ...sort, sortBy: "email" }, comments!)}
          >
            Sort Email
            {sort.sortBy === "email" ? (
              sort.order === "asc" ? (
                <PiCaretUpThin className="ml-1 inline-block w-5 h-5" />
              ) : sort.order === "desc" ? (
                <PiCaretDownThin className="ml-1 inline-block w-5 h-5" />
              ) : (
                <PiCaretUpDownThin className="ml-1 inline-block w-5 h-5" />
              )
            ) : (
              <PiCaretUpDownThin className="ml-1 inline-block w-5 h-5" />
            )}
          </button>
        </section>
        <section className="mb-4">
          <div className="flex items-center justify-center border border-gray-300 rounded shadow-md ">
            <FaSearch className="inline-block w-5 h-5 text-gray-300 mx-1" />
            <input
              type="search"
              placeholder="search name, email, comment"
              className="w-64 p-2  outline-none"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch();
              }}
            />
          </div>
        </section>
      </section>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Th>Post ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Comment</Table.Th>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {comments ? (
            comments.map((comment) => (
              <Table.Row key={comment.id}>
                <Table.Td>{comment.id}</Table.Td>
                <Table.Td>{comment.name}</Table.Td>
                <Table.Td>{comment.email}</Table.Td>
                <Table.Td className="col-span-3">{comment.body}</Table.Td>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Td>{""}</Table.Td>
              <Table.Td className="col-span-4 text-center">
                No Data Found
              </Table.Td>
              <Table.Td>{""}</Table.Td>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <section className="flex items-center justify-end mt-4">
        <Pagination
          totalItems={originalData ? originalData.length : 0}
          onPageChange={handlePageChange}
          onCurrentPage={handleCurrentPage}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </section>
    </div>
  );
}

export default Comments;
