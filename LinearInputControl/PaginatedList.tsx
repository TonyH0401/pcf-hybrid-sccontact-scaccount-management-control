import * as React from "react";

interface Props {
  context: ComponentFramework.Context<unknown>;
}

const PAGE_SIZE = 10;
const PaginatedList: React.FC<Props> = ({ context }) => {
  const [data, setData] = React.useState<unknown[]>([]);
  const [page, setPage] = React.useState(1);

  const fetchData = async () => {
    const entityName ="";
    const skip = (page - 1) * PAGE_SIZE;

    // const url = `${context.webAPI?.getClientUrl()}/api/data/v9.2/${entityName}?$top=${PAGE_SIZE}&$skip=${skip}`;

    try {
      const response = await context.webAPI?.retrieveMultipleRecords(
        entityName!,
        `$top=${PAGE_SIZE}&$skip=${skip}`
      );
      setData(response.entities);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div>
      <ul>
        {data.map((record, index) => (
          <li key={index}>{JSON.stringify(record)}</li>
        ))}
      </ul>
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
};
export default PaginatedList;
