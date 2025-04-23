import React, { useState } from "react";
import { mockStakeholders, Stakeholder } from "./mockData";

const PAGE_SIZE = 3;

export const StakeholderList = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);

  const filtered = mockStakeholders.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-2">
      <input
        className="border px-2 py-1 rounded w-full mb-2"
        placeholder="Search stakeholders..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <ul className="space-y-2">
        {paginated.map(s => (
          <li key={s.id} className="flex items-center gap-2 border p-2 rounded">
            <input
              type="checkbox"
              checked={selectedIds.includes(s.id)}
              onChange={() => toggleSelect(s.id)}
            />
            <div>
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-gray-500">{s.role}</div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex justify-between items-center">
        <button
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>
        <span>Page {page + 1}</span>
        <button
          onClick={() =>
            setPage(p =>
              (p + 1) * PAGE_SIZE < filtered.length ? p + 1 : p
            )
          }
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StakeholderList;