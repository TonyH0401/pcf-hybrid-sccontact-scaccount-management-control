import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import {
  DetailsList,
  IColumn,
  DetailsListLayoutMode,
  SearchBox,
} from "@fluentui/react";

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
  // 2. State to hold the current search text
  const [searchText, setSearchText] = React.useState<string>("");

  const [scAccounts, setScAccounts] = React.useState<unknown[]>([]);
  React.useEffect(() => {
    const fetchScAccounts = async () => {
      try {
        const result = await context.webAPI.retrieveMultipleRecords(
          "crff8_scaccount",
          "?$select=crff8_scaccountnumber,crff8_scaccountname"
        );
        console.log("scaccount records:", result.entities);
        setScAccounts(result.entities);
      } catch (error) {
        console.log("NOOOOO");
        console.error("Error retrieving scaccount records:", error);
      }
    };

    fetchScAccounts();
  }, [context]);

  // 3. Compute filtered items whenever searchText changes
  const filteredItems = React.useMemo(() => {
    const term = searchText.trim().toLowerCase();
    if (!term) return scAccounts as unknown[];
    return (scAccounts as unknown[]).filter((item) => {
      const account = item as {
        crff8_scaccountnumber?: string;
        crff8_scaccountname?: string;
      };
      return (
        account.crff8_scaccountnumber?.toLowerCase().includes(term) || // 🔁 Match on name or number
        account.crff8_scaccountname?.toLowerCase().includes(term)
      );
    });
  }, [searchText, scAccounts]);

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "ID",
      fieldName: "crff8_scaccountnumber",
      minWidth: 50,
      maxWidth: 100,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Tên",
      fieldName: "crff8_scaccountname",
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

      <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto 12px" }}>
        <SearchBox
          placeholder="Tìm theo ID hoặc tên..."
          value={searchText}
          onChange={(_, newValue) => setSearchText(newValue || "")}
          underlined={false}
        />
      </div>

      <div style={{ width: "100%", margin: "0 auto" }}>
        <DetailsList
          items={filteredItems} // Instead of dummy value, it will load based on filteredItems
          columns={columns}
          setKey="filtered"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
        />
      </div>
    </div>
  );
};

export default ListComponentControl;
