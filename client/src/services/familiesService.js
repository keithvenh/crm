import { fetchAll } from "./fetchAll";

export const FamiliesService = {
  all: fetchAll({apiRoute: 'families'})
}