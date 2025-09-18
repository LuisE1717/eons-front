import { memo } from "react";
import useTranslation from "../../../../../Shared/hooks/useTranslation";
import A from "../../../../shared/components/A/A";
import Line from "../../../../shared/components/Line/Line";
import Span from "../../../../shared/components/Span/Span";
import Info from "../../shared/components/Info/Info";
import { motion } from "framer-motion";

function BookInfoComponent({ first_time }) {
  const { translation } = useTranslation();

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
        <div>
          {translation.ServiceMenu.thinks_to_know}.
          <div>
            (<Span>{translation.next}</Span>)
          </div>
        </div>
      </A>
      <A>
        <div>
          {translation.ServiceMenu.cautions}.
          <div>
            (<Span>{translation.next}</Span>)
          </div>
        </div>
      </A>
      <Line />
      <A>
        <div>
          {translation.ServiceMenu.security}.
          <div>
            (<Span>{translation.next}</Span>)
          </div>
        </div>
      </A>
      <Line />
      <A>
        <div>
          {translation.ServiceMenu.examples}.
          <div>
            (<Span>{translation.next}</Span>)
          </div>
        </div>
      </A>
      <Line />
      <A>
        <div>
          {translation.ServiceMenu.demostration}.
          <div>
            (<Span>{translation.next}</Span>)
          </div>
        </div>
      </A>
      <Line />
      <A>
        <div>
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