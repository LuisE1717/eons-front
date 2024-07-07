import { useState } from "react";
import { SECTION, type Transfer, type Essence } from "../domain";

export default function useList() {
  const [list, setList] = useState<Essence[]>([
    { id: "1", name: "Esencia 1", price: 23.4 },
    { id: "2", name: "Esencia 2", price: 23.4 },
    { id: "3", name: "Esencia 3", price: 23.4 },
    { id: "4", name: "Esencia 4", price: 23.4 },
    { id: "5", name: "Esencia 5", price: 23.4 },
  ]);

  const [transferList, setTransferList] = useState<Transfer[]>([
    { id: "1", count: 20, user: "Héctor", date: new Date() },
    { id: "2", count: 20, user: "Héctor", date: new Date() },
    { id: "3", count: 20, user: "Héctor", date: new Date() },
    { id: "4", count: 20, user: "Héctor", date: new Date() },
    { id: "5", count: 20, user: "Héctor", date: new Date() },
    { id: "6", count: 20, user: "Héctor", date: new Date() },
  ]);

  const [section, setSection] = useState(SECTION.BUY);

  function handleChangeSection(s: SECTION): void {
    setSection(s);
  }

  function handleClick(id: string) {}

  return { list, handleClick, section, handleChangeSection, transferList };
}
