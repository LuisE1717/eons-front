import useList from "./hooks/useList";
import Card from "./components/Card/Card";
import Custom from "./components/Custom/Custom";
import { SECTION } from "./domain";
import Form from "./components/Form/Form";
import HeaderImage from "./components/HeaderImage/HeaderImage";
import Sections from "./components/Sections/Sections";
import Tropipay from "./components/Tropipay/Tropipay";
import Annunce from "./components/Tropipay/Annunce";
import Historial from "./components/Historial/Historial";

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
    loading,
  } = useList();

  return (
    <div className="flex flex-col w-full items-center px-6">
      <main className="flex flex-col max-w-[1100px] w-full">
        <div className="flex lg:flex-row flex-col-reverse items-center gap-x-10 gap-y-7 mb-10">
          <section className="flex flex-col w-full max-w-[700px]">
            <h4 className="text-center mb-10 text-secundary">Toda la Esencia que se compre será duplicada. Oferta disponible hasta la activación de los servicios pagos.</h4>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-4">
              {list.map((e) => (
                <Card
                  key={e.id}
                  essence={e}
                  handleClick={() => handleClick(e.id)}
                />
              ))}
            </div>

            {/* <Custom
              loading={loading}
              price={price}
              handleCustomPayment={handleCustomPayment}
              findCost={findCost}
            /> */}

            <Tropipay />

            <Annunce />
          </section>

          <HeaderImage />
        </div>

        <div className="flex w-full justify-center mb-10">
          {section === null && (
            <Sections handleChange={handleChangeSection} selected={section} />
          )}

          {section === SECTION.TRANSFER && <Form handleClose={handleClose} />}
          {section === SECTION.TRANSFER_HISTORIAL && (
            <Historial handleClose={handleClose} />
          )}
        </div>
      </main>
    </div>
  );
}
