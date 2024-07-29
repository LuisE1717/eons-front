import { useEffect, useState } from "react";
import type { INotifications } from "../../domain/INotifications";
import Arrow from "../Arrow/Arrow";
import Fire from "../Types/Fire/Fire";
import { patchNotification } from "../../../../utils/api/userApi";
import Cookies from "js-cookie";
import NoValid from "../Types/NoValid/NoValid";
import Valid from "../Types/Valid/Valid";

interface Props {
  n: INotifications;
}

export default function Item({ n }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      patchNotification(Cookies.get("eons_token") || "", {
        id: n.id,
        state: true,
      });
    }
  }, [open]);

  return (
    <div
      className="hover:bg-slate-100 cursor-pointer flex items-start justify-between px-3 py-2"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start gap-x-2.5">
        <i className="" style={{ paddingTop: "2.5px" }}>
          { n.tipo == "essence" ?
            <Fire />
            :
            n.tipo == "validAcount"?
            <Valid/>
            :
            n.tipo == "notValidAcount"?
            <NoValid/>
            :
            <></>
          }
        </i>

        <div className="flex flex-col">
          <label>{n.nombre}</label>
          {open && <div className="mt-0">{n.descripcion}</div>}
        </div>
      </div>

      <i
        style={{
          transform: open ? "rotate(0deg)" : "rotate(-90deg)",
          paddingTop: "6px",
        }}
      >
        <Arrow />
      </i>
    </div>
  );
}
