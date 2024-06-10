import React from "react";
import useList from "./hooks/useList";
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import ListContainer from "../../../Shared/components/ListContainer/ListContainer";

export default function List() {
  const { list, handleClick } = useList();

  return (
    <ListContainer>
      <Header />

      <div className="flex flex-col sm:gap-y-4 gap-y-2.5">
        {list.map((e) => (
          <Card key={e.id} essence={e} handleClick={() => handleClick(e.id)} />
        ))}
      </div>
    </ListContainer>
  );
}
