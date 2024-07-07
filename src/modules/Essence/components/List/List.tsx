import useList from "./hooks/useList";
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import ListContainer from "../../../Shared/components/ListContainer/ListContainer";
import Custom from "./components/Custom/Custom";
import Sections from "./components/Sections/Sections";
import { SECTION } from "./domain";
import TransferCard from "./components/TransferCard/TransferCard";
import Form from "./components/Form/Form";

export default function List() {
  const { list, handleClick, handleChangeSection, section, transferList } =
    useList();

  return (
    <ListContainer>
      <Header />

      <Sections handleChange={handleChangeSection} selected={section} />

      {section === SECTION.BUY && (
        <div className="flex flex-col sm:gap-y-4 gap-y-2.5">
          {list.map((e) => (
            <Card
              key={e.id}
              essence={e}
              handleClick={() => handleClick(e.id)}
            />
          ))}

          <Custom />
        </div>
      )}

      {section === SECTION.TRANSFER && (
        <div className="flex flex-col sm:gap-y-4 gap-y-2.5">
          <Form />

          {transferList.map((t) => (
            <TransferCard key={t.id} transfer={t} />
          ))}
        </div>
      )}
    </ListContainer>
  );
}
