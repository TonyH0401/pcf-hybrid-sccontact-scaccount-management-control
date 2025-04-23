import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";

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
  const title = context?.parameters?.sampleProperty.raw ?? "Unknown Title"
  const Value = context?.parameters?.samplenNumber.raw ?? 100
  return (
    <div>
      <h3>Danh sách {title}</h3>
      <p>
        Record ID: {Value}
      </p>
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
