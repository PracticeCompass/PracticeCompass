export const itemsList = [
  {
    text: "",
    img: "logo",
    id: 0,
    route: "/processclaims",
  },
  {
    text: "Claims Processing",
    icon: "k-i-menu",
    id: 1,
    selected: true,
    ["data-expanded"]: false,
    route: "/processclaims",
  },
  {
    text: "Generate Claims",
    icon: "k-i-inbox",
    id: 2,
    parentId: 1,
    route: "/processclaims/Generate Claims",
  },
  {
    text: "Rejections",
    icon: "k-i-inbox",
    id: 3,
    parentId: 1,
    route: "/processclaims/rejections",
  },
  {
    text: "Denials",
    icon: "k-i-inbox",
    id: 4,
    parentId: 1,
    route: "/processclaims/Denials",
  },
  {
    text: "Search",
    icon: "k-i-inbox",
    id: 5,
    parentId: 1,
    route: "/processclaims/search",
  },
  {
    text: "Patients Processing",
    icon: "k-i-menu",
    description: "Process Patients",
    id: 6,
    ["data-expanded"]: false,
    route: "/processpatients",
  },
  {
    text: "Patients",
    icon: "k-i-user",
    id: 7,
    parentId: 6,
    route: "/processpatients/patients",
  },
  {
    text: "More",
    icon: "k-i-inbox",
    id: 8,
    parentId: 6,
    route: "/processpatients/more",
  },

  {
    text: "Payments Processing",
    icon: "k-i-menu",
    id: 9,
    ["data-expanded"]: false,
    route: "/applypayments",
  },
  {
    text: "Plan",
    icon: "k-i-inbox",
    id: 10,
    parentId: 9,
    route: "/applypayments/insurancePayments",
  },
  {
    text: "Patient",
    icon: "k-i-inbox",
    id: 11,
    parentId: 9,
    route: "/applypayments/patientPayments",
  },
  {
    text: "ERA",
    icon: "k-i-inbox",
    id: 12,
    parentId: 9,
    route: "/applypayments/eraPayments",
  },
  {
    text: "Automation Tasks",
    icon: "k-i-menu",
    description: "Automation Tasks",
    id: 13,
    ["data-expanded"]: false,
    route: "/automationTasks",
  },
  {
    text: "Generate Claims",
    icon: "k-i-inbox",
    id: 14,
    parentId: 13,
    route: "/automationTasks/claims",
  },
  {
    text: "Parse ERA",
    icon: "k-i-inbox",
    id: 15,
    parentId: 13,
    route: "/automationTasks/era",
  },
  {
    text: "Lists",
    icon: "k-i-menu",
    description: "Lists",
    id: 16,
    ["data-expanded"]: false,
    route: "/lists/plan",
  },
  {
    text: "Plan",
    icon: "k-i-inbox",
    id: 17,
    parentId: 16,
    route: "/lists/plan",
  },
  {
    text: "Physicians",
    icon: "k-i-inbox",
    id: 18,
    parentId: 16,
    route: "/lists/physicians",
  },
  {
    text: "Lookups",
    icon: "k-i-inbox",
    id: 19,
    parentId: 16,
    route: "/lists/lookups",
  },
  {
    text: "Transactions",
    icon: "k-i-inbox",
    id: 20,
    parentId: 16,
    route: "/lists/transactions",
  },
  {
    text: "Document Manager",
    icon: "k-i-menu",
    description: "Document Manager",
    id: 21,
    ["data-expanded"]: false,
    route: "/documentManager",
  },
  {
    text: "Documents",
    icon: "k-i-inbox",
    id: 22,
    parentId: 21,
    route: "/documentManager",
  },
];
