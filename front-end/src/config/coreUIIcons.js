import {
  cilClone,
  cilTrash,
} from "@coreui/icons";

const icons = {
  cilTrash,
  cilClone
};

export function registerCoreUIIcons(app) {
  app.provide("icons", icons);
}
