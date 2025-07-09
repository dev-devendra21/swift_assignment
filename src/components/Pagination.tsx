const itemsPerPageOptions = [10, 50, 100];

interface PaginationProps {
  totalItems: number;
  onPageChange: (page: number) => void;
  currentPage: number;
  itemsPerPage: number;
  onCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems = 100,
  onPageChange,
  currentPage,
  itemsPerPage,
  onCurrentPage,
}) => {
  const handleItemPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageChange(Number(e.target.value));
  };

  const handlePageChange = (page: number) => {
    onCurrentPage(page);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center gap-4 text-sm mt-4">
      <div>
        {startItem}-{endItem} of {totalItems} items
      </div>

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        &lt;
      </button>
      <p className="px-2 py-1 border rounded">{currentPage}</p>
      {currentPage < totalPages && (
        <p className="px-2 py-1">{currentPage + 1}</p>
      )}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        &gt;
      </button>

      <select
        value={itemsPerPage}
        onChange={handleItemPerPageChange}
        className="border px-2 py-1 rounded"
      >
        {itemsPerPageOptions.map((num) => (
          <option key={num} value={num}>
            {num} / Page
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
