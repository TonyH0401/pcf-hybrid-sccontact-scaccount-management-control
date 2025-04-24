import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import {
  DetailsList,
  IColumn,
  DetailsListLayoutMode,
  SearchBox,
} from "@fluentui/react";

// Declare DummyData entity (to be deleted)
interface DummyData {
  id: number;
  name: string;
}

// Used for passing data using context keyword
// https://youtu.be/R1hTz-T5feQ?si=JAccsVjHru1K8hZl.
// https://chatgpt.com/c/680890cf-ab18-8010-ad6e-d31757052e66. Scroll to the way top
interface ListComponentControlProps {
  context: ComponentFramework.Context<IInputs>;
  notifyOutputChanged: () => void;
}

// Fetch ScAccount
async function fetchScAccountsData(
  context: ComponentFramework.Context<IInputs>
) {
  try {
    const result = await context.webAPI.retrieveMultipleRecords(
      "crff8_scaccount",
      "?$select=crff8_scaccountnumber,crff8_scaccountname"
    );
    console.log("scaccount records:", result.entities);
    return result.entities;
  } catch (error) {
    console.log("NOOOOO");
    console.error("Error retrieving scaccount records:", error);
    return [];
  }
}

async function fetchScContactsDataAssociated(context:ComponentFramework.Context<IInputs>) {
  try {
    const scAccountGUID = context.parameters.sampleText.raw;
    console.log(`GUIDE Value: ${scAccountGUID}`)
    const fetchXML = 
          `<fetch>
            <entity name='crff8_sccontact'>
              <link-entity name='crff8_sccontact_crff8_scaccount'
                          from='crff8_sccontactid'
                          to='crff8_sccontactid'
                          link-type='outer'
                          alias='link'>
                <filter type='and'>
                  <condition attribute='crff8_scaccountid' operator='eq' value='${scAccountGUID}' />
                </filter>
              </link-entity>
              <filter type='and'>
                <condition entityname='link' attribute='crff8_scaccountid' operator='null' />
              </filter>
            </entity>
          </fetch>`;
    const encodedFetchXML = encodeURIComponent(fetchXML);
    const result = await context.webAPI.retrieveMultipleRecords("crff8_sccontact", `?fetchXml=${encodedFetchXML}`)
    console.log("sccontact associate not equal:", result.entities)
  } catch (error) {
    console.error("Error retrieving sccontact associate records:", error);
    return []
  }
}

// This is where the magic begin
const ListComponentControl: React.FC<ListComponentControlProps> = ({
  context,
  notifyOutputChanged,
}) => {
  // Initialize dummy data with data (to be deleted)
  const dummyData: DummyData[] = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
  ];
  // Initialize "state" to hold and set/change value
  const [searchText, setSearchText] = React.useState<string>(""); // State to hold "searchText" and "setSearchText", no initial value
  const [scAccounts, setScAccounts] = React.useState<unknown[]>([]); // State to hold "scAccounts" and "setScAccounts", no initial value
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    // const loadData = async () => {
    //   const accounts = await fetchScAccountsData(context);
    //   setScAccounts(accounts);
    // };
    // loadData();
    const loadData = async () => {
      setIsLoading(true);
      const [account] = await Promise.all([fetchScAccountsData(context), fetchScContactsDataAssociated(context)]);
      setScAccounts(account);
      setIsLoading(false)
    };
    loadData();
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
        account.crff8_scaccountnumber?.toLowerCase().includes(term) || // Match on name or number
        account.crff8_scaccountname?.toLowerCase().includes(term)
      );
    });
  }, [searchText, scAccounts]); // Dependency array, if any of these change, it trigger this, idk how to explain

  // Define columns for DetailTable
  const columns: IColumn[] = [
    {
      key: "column1",
      name: "ID", // Display name
      fieldName: "crff8_scaccountnumber", // This is where the data is mapped based on the column name/logical name
      minWidth: 50,
      maxWidth: 100,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Tên",
      fieldName: "crff8_scaccountname", // This is where the data is mapped based on the column name/logical name
      minWidth: 150,
      maxWidth: 300,
      isResizable: true,
    },
  ];

  const title = context?.parameters?.sampleProperty.raw ?? "Unknown Title";
  const value = context?.parameters?.sampleText.raw ?? "Unknown Value";

  return (
    //
    <div style={{ padding: "16px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h3 style={{ margin: 0 }}>Danh sách: {title}</h3>
        <p style={{ margin: 0 }}>Record ID: {value}</p>
      </div>

      <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto 12px" }}>
        <SearchBox
          placeholder="Tìm theo ID hoặc tên..."
          value={searchText} // This is for displaying UI only
          onChange={(_, newValue) => setSearchText(newValue || "")} // When the user change any values, it will update searchText
          underlined={false}
        />
      </div>

      <div style={{ width: "100%", margin: "0 auto" }}>
        <DetailsList
          items={filteredItems} // Instead of dummy value, it will load based on filteredItems from the search
          columns={columns} // Used to columns we defined before
          setKey="filtered"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
        />
      </div>
    </div>
  );
};

export default ListComponentControl;
