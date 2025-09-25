import { memo } from "react";
import useTranslation from "../../../../../Shared/hooks/useTranslation";
import A from "../../../../shared/components/A/A";
import Line from "../../../../shared/components/Line/Line";
import Span from "../../../../shared/components/Span/Span";
import Info from "../../shared/components/Info/Info";
import { motion } from "framer-motion";
import { showToast } from "@components/UI/Toast";

function BookInfoComponent({ first_time }) {
  const { translation } = useTranslation();

  const showComingSoon = () => {
    showToast("Esta sección estará disponible en próximas actualizaciones", "info");
  };

  return (
    <Info>
      <Line />
      <A>
        <div onClick={() => window.location.href = `/usage`} className="relative">
          <motion.span
            animate={first_time ? { color: ["#ffffff", "#800080", "#ffffff"] } : {}}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          >
            {translation.ServiceMenu.use_instruction}
          </motion.span>
        </div>
      </A>
      <Line />
      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.thinks_to_know}.
          <div>
            (<Span>{translation.next}</Span>)
          </div>
        </div>
      </A>
      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.cautions}.
          <div>
            (<Span>{translation.next}</Span>)
          </div>
        </div>
      </A>
      <Line />
      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.security}.
          <div>
            (<Span>{translation.next}</Span>)
          </div>
        </div>
      </A>
      <Line />
      <A>
        <div onClick={() => window.location.href = `/services-examples`}>
          {translation.ServiceMenu.examples}
        </div>
      </A>
      <Line />
      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.demostration}.
          <div>
            (<Span>{translation.next}</Span>)
          </div>
        </div>
      </A>
      <Line />
      <A>
        <div onClick={showComingSoon}>
          {translation.ServiceMenu.glosary}.
          <div>
            (<Span>{translation.next}</Span>)
          </div>
        </div>
      </A>
      <Line />
    </Info>
  );
}

export default memo(BookInfoComponent);