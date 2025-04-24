import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import {
  DetailsList,
  IColumn,
  DetailsListLayoutMode,
  SearchBox,
  Selection, SelectionMode,
  PrimaryButton,
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

// ============================================
// Functions Section (will soon be moved to a file)
// ============================================
// Fetch ScAccount Data
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
// Fetch ScContact Data where ScContact is NOT associated with ScAccount via association table
/* 
Originally, it was "Fetch ScContact Data where ScContact IS associated with ScAccount via association table", I changed operator from 'eq' to 'ne' but it didn't work,
it turned in to "Fetch ScContact Data where ScContact IS associated with OTHER ScAccount BUT NOT with the given ScAccount GUID via association table",
so I need to find another way which is this way below. 
 */
async function fetchScContactsDataAssociateNot(
  context: ComponentFramework.Context<IInputs>
) {
  try {
    const scAccountGUID = context.parameters.sampleText.raw;
    console.log(`ScAccount GUID Value: ${scAccountGUID}`);
    const fetchXML = `<fetch>
            <entity name='crff8_sccontact'>
              <attribute name='crff8_sccontactid' />
              <attribute name='crff8_sccontactnumber' />
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
    const result = await context.webAPI.retrieveMultipleRecords(
      "crff8_sccontact",
      `?fetchXml=${encodedFetchXML}`
    );
    console.log("sccontact associate not:", result.entities);
    return result.entities;
  } catch (error) {
    console.error("Error retrieving sccontact associate records:", error);
    return [];
  }
}

// ============================================
// Main Component Section (this is where the magic begin)
// ============================================
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
  const [scContacts, setScContacts] = React.useState<unknown[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [selection] = React.useState(
    new Selection({
      onSelectionChanged: () => {
        const selectedItems = selection.getSelection();
        if (selectedItems.length > 0) {
          console.log("Các dòng được chọn:");
          selectedItems.forEach((item, index) => {  
            console.log(`Row ${index + 1}:`, item);
          });
        } else {
          console.log("Không có dòng nào được chọn.");
        }
      },
    })
  );

  React.useEffect(() => {
    const loadData = async () => {
      const contacts = await fetchScContactsDataAssociateNot(context);
      setScContacts(contacts);
    };
    loadData();
    // const loadData = async () => {
    //   setIsLoading(true);
    //   const [account] = await Promise.all([
    //     fetchScAccountsData(context),
    //     fetchScContactsDataAssociateNot(context),
    //   ]);
    //   setScAccounts(account);
    //   setIsLoading(false);
    // };
    // loadData();
  }, [context]);

  // 3. Compute filtered items whenever searchText changes
  const filteredItems = React.useMemo(() => {
    const term = searchText.trim().toLowerCase();
    if (!term) return scContacts as unknown[];
    return (scContacts as unknown[]).filter((item) => {
      const contact = item as {
        crff8_sccontactnumber?: string;
        crff8_sccontactid?: string;
      };
      return (
        contact.crff8_sccontactnumber?.toLowerCase().includes(term) || // Match on name or number
        contact.crff8_sccontactid?.toLowerCase().includes(term)
      );
    });
  }, [searchText, scContacts]); // Dependency array, if any of these change, it trigger this, idk how to explain
  //Event handler for button
  // const handleGetSelectedId = () => {
  //   const selectedItems = selection.getSelection();
  //   if (selectedItems.length === 0) {
  //     alert("Vui lòng chọn một dòng.");
  //     return;
  //   }

  //   const selected = selectedItems[0] as { crff8_sccontactid: string };
  //   const selectedId = selected.crff8_sccontactid;
  //   console.log("Selected ID:", selectedId);
  //   alert(`ID được chọn: ${selectedId}`);
  // };

  // Define columns for DetailTable
  const columns: IColumn[] = [
    {
      key: "column1",
      name: "ID", // Display name
      fieldName: "crff8_sccontactnumber", // This is where the data is mapped based on the column name/logical name
      minWidth: 50,
      maxWidth: 100,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Tên",
      fieldName: "crff8_sccontactid", // This is where the data is mapped based on the column name/logical name
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
          selection={selection}
          selectionPreservedOnEmptyClick={true}
          selectionMode={SelectionMode.multiple}
        />
      </div>

      {/* Button */}
      {/* <div style={{ textAlign: "center", marginBottom: "12px" }}>
        <PrimaryButton
          text="Lấy ID từ dòng được chọn"
          onClick={handleGetSelectedId}
        />
      </div> */}
    </div>
  );
};

export default ListComponentControl;
