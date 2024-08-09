import useList from "./hooks/useList";
import Card from "./components/Card/Card";
import Custom from "./components/Custom/Custom";
import { SECTION } from "./domain";
import Form from "./components/Form/Form";
import HeaderImage from "./components/HeaderImage/HeaderImage";
import Sections from "./components/Sections/Sections";
import Tropipay from "./components/Tropipay/Tropipay";

export default function List() {
  const {
    list,
    handleClick,
    handleChangeSection,
    section,
    transferList,
    price,
    findCost,
    handleCustomPayment,
    handleClose,
  } = useList();

  return (
    <div className="flex flex-col w-full items-center px-6">
      <main className="flex flex-col max-w-[1100px] w-full">
        <div className="flex lg:flex-row flex-col-reverse items-center gap-x-10 gap-y-7 mb-10">
          <section className="flex flex-col w-full max-w-[700px]">
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-4">
              {list.map((e) => (
                <Card
                  key={e.id}
                  essence={e}
                  handleClick={() => handleClick(e.id)}
                />
              ))}
            </div>

            <Custom
              price={price}
              handleCustomPayment={handleCustomPayment}
              findCost={findCost}
            />

            <Tropipay/>

          </section>

          <HeaderImage />
        </div>

        <div className="flex w-full justify-center mb-10">
          {section === null && (
            <Sections handleChange={handleChangeSection} selected={section} />
          )}

          {section === SECTION.TRANSFER && <Form handleClose={handleClose} />}
        </div>
      </main>
    </div>
  );
}
