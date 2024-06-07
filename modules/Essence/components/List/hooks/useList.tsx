import React, { useEffect, useState } from "react";
import type { Essence } from "../interfaces";

export default function useList() {
  const [list, setList] = useState<Essence[]>([
    { id: "1", name: "Esencia 1", price: 23.4 },
    { id: "2", name: "Esencia 2", price: 23.4 },
    { id: "3", name: "Esencia 3", price: 23.4 },
    { id: "4", name: "Esencia 4", price: 23.4 },
    { id: "5", name: "Esencia 5", price: 23.4 },
  ]);

  function handleClick(id: string) {}

  return { list, handleClick };
}
