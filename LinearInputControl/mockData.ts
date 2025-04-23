export interface Stakeholder {
  id: string;
  name: string;
  role: string;
}

export const mockStakeholders: Stakeholder[] = [
  { id: "1", name: "Alice Johnson", role: "Decision Maker" },
  { id: "2", name: "Bob Smith", role: "Influencer" },
  { id: "3", name: "Charlie Nguyen", role: "Technical Expert" },
  { id: "4", name: "Diana Lee", role: "Approver" },
  { id: "5", name: "Ethan Tran", role: "End User" },
  { id: "6", name: "Fatima Patel", role: "Advisor" },
  // Thêm dữ liệu nếu muốn test paging
];
