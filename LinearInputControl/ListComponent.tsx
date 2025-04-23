import * as React from "react";

interface DummyData {
  id: number;
  name: string;
}

const MyVirtualControl: React.FC = () => {
  // Dữ liệu giả
  const dummyData: DummyData[] = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
  ];

  return (
    <div>
      <h3>Danh sách Người Dùng</h3>
      <ul>
        {dummyData.map((item) => (
          <li key={item.id}>
            ID: {item.id} - Tên: {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyVirtualControl;
