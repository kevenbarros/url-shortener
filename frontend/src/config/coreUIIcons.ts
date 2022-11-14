import { cilClone, cilTrash, cilXCircle } from "@coreui/icons";

const icons = {
  cilTrash,
  cilClone,
  cilXCircle,
};

export const registerCoreUIIcons = (app: any) => {
  app.provide("icons", icons);
};
