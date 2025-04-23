import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";

import { DetailsList, IColumn, DetailsListLayoutMode } from "@fluentui/react";

interface DummyData {
  id: number;
  name: string;
}

interface ListComponentControlProps {
  context: ComponentFramework.Context<IInputs>;
  notifyOutputChanged: () => void;
}

const ListComponentControl: React.FC<ListComponentControlProps> = ({
  context,
  notifyOutputChanged,
}) => {
  const dummyData: DummyData[] = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
  ];
  const columns: IColumn[] = [
    {
      key: "column1",
      name: "ID",
      fieldName: "id",
      minWidth: 50,
      maxWidth: 100,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Tên",
      fieldName: "name",
      minWidth: 150,
      maxWidth: 300,
      isResizable: true,
    },
  ];
  const title = context?.parameters?.sampleProperty.raw ?? "Unknown Title";
  const value = context?.parameters?.sampleText.raw ?? "Unknown Value";
  return (
    <div style={{ padding: "16px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h3 style={{ margin: 0 }}>Danh sách: {title}</h3>
        <p style={{ margin: 0 }}>Record ID: {value}</p>
      </div>

      <div style={{ width: "100%", margin: "0 auto" }}>
        <DetailsList
          items={dummyData}
          columns={columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
        />
      </div>
    </div>
  );
};

export default ListComponentControl;

// const MyVirtualControl: React.FC = () => {
//   // Dữ liệu giả
//   const dummyData: DummyData[] = [
//     { id: 1, name: "John Doe" },
//     { id: 2, name: "Jane Smith" },
//     { id: 3, name: "Alice Johnson" },
//     { id: 4, name: "Bob Brown" },
//   ];

//   return (
//     <div>
//       <h3>Danh sách Người Dùng</h3>
//       <ul>
//         {dummyData.map((item) => (
//           <li key={item.id}>
//             ID: {item.id} - Tên: {item.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyVirtualControl;
