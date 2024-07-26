import type { Session } from "@auth/core/types";
import OutlineInputReact from "../../../../../../components/UI/input/OutlineInputReact";
import { SECTIONS } from "../../domain";
import { LoginButton } from "./components/LoginButton/LoginButton";
import SectionButton from "./components/SectionButton/SectionButton";
import useContent from "./hooks/useContent";

interface Props {
  button_login: string;
  button_singUp: string;
  login_switch: string;
  sing_up_switch: string;
  password_input_label: string;
  forget_pass: string;
  invalid_email_text: string;
  invalid_pass_text: string;
  text_loading:string;
  session:Session|null;
}

export default function Content({
  button_login,
  button_singUp,
  login_switch,
  sing_up_switch,
  password_input_label,
  forget_pass,
  invalid_email_text,
  invalid_pass_text,
  text_loading,
  session
}: Props) {
  const {
    loading,
    validation_mail,
    validation_pass,
    handleChangeSection,
    handleSubmit,
    email,
    handleChangeEmail,
    handleChangePassword,
    password,
    section
  } = useContent(session);

  //console.log("req:",req)

  return (
    <>
      <div className="flex flex-col items-center">
        <img
          src="/pixelcut-export.webp"
          width={400}
          height={400}
          alt="login-image"
        />

        <div
          className="inline-flex rounded-full justify-around shadow-md shadow-black/5 bg-white/0 hover:bg-white/25 hover:bg-slate-100 my-4"
          style={{
            borderColor: "#e5e5e6",
            borderWidth: "1px",
          }}
        >
          <SectionButton
            handleClick={() => handleChangeSection(SECTIONS.LOGIN)}
            selected={section === SECTIONS.LOGIN}
            text={login_switch}
          />

          <SectionButton
            text={sing_up_switch}
            selected={section === SECTIONS.SIGN_UP}
            handleClick={() => handleChangeSection(SECTIONS.SIGN_UP)}
          />
        </div>
      </div>

      <form className="flex flex-col">
        <div className="flex flex-col gap-y-2">
          <OutlineInputReact
            loading={loading}
            setValue={handleChangeEmail}
            value={email}
            type={"text"}
            label="Email"
          />
          <label
            className={`${
              validation_mail || email == "" ? "hidden" : ""
            } ml-5 text-lg text-red-600`}
          >
            {invalid_email_text}
          </label>

          <OutlineInputReact
            loading={loading}
            setValue={handleChangePassword}
            value={password}
            type={"password"}
            label={password_input_label}
          />

          <label
            className={`${
              validation_pass || password == "" ? "hidden" : ""
            } ml-5 text-lg text-red-600`}
          >
            {invalid_pass_text}
          </label>
        </div>

        <div className="flex flex-col mt-8">
          <LoginButton
            handleSubmit={handleSubmit}
            text={section === SECTIONS.LOGIN ? button_login : button_singUp}
            loading={loading}
            text_loading={text_loading}
          />
        </div>
      </form>

      {SECTIONS.LOGIN === section && (
        <div className="flex flex-col mt-8 items-center">
          <a href="auth/forget-password">
          <span className="text-sm text-primary">{forget_pass}</span>
          </a>
        </div>
      )}
    </>
  );
}
