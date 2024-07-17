import React, { useState } from "react";
import ListContainer from "../Shared/components/ListContainer/ListContainer";
import type { SwitchItem } from "../Shared/components/ListContainer/domain";
import { SECTIONS } from "./constants";
import Services from "./components/Services/Services";
import { type Service } from "./domain";
import Favorites from "./components/Favorites/Favorites";

export default function MyServices() {
  const [selected, setSelected] = useState<SECTIONS>(SECTIONS.SAVED);

  const [services, setServices] = useState<Service[]>([
    { id: 1, date: new Date(), name: "Servicio 1" },
    { id: 2, date: new Date(), name: "Servicio 2" },
    { id: 3, date: new Date(), name: "Servicio 3" },
    { id: 4, date: new Date(), name: "Servicio 4" },
    { id: 5, date: new Date(), name: "Servicio 5" },
    { id: 6, date: new Date(), name: "Servicio 6" },
  ]);

  function handleFavoriteService(id: number) {}

  function handleDeleteService(id: number) {}

  const items: SwitchItem[] = [
    {
      click: () => setSelected(SECTIONS.SAVED),
      selected: selected === SECTIONS.SAVED,
      text: "Servicios salvados",
    },
    {
      click: () => setSelected(SECTIONS.FAVORITES),
      selected: selected === SECTIONS.FAVORITES,
      text: "Favoritos",
    },
  ];

  return (
    <ListContainer items={items} image="/moon.png">
      {selected === SECTIONS.SAVED && (
        <Services
          handleDelete={handleDeleteService}
          handleFavorite={handleFavoriteService}
          services={services}
        />
      )}

      {selected === SECTIONS.FAVORITES && (
        <Favorites
          handleDelete={handleDeleteService}
          handleFavorite={handleFavoriteService}
          services={services}
        />
      )}
    </ListContainer>
  );
}
