import React, { type Dispatch, type SetStateAction } from "react";

interface Props {
  type: string;
  label: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
  loading: boolean;
}

const OutlineInputReact: React.FC<Props> = ({
  type,
  label,
  setValue,
  value,
  loading,
}) => {
  return (
    <div className="form">
      {/* Aplica el estilo form */}
      <input
        disabled={loading}
        type={type}
        value={value}
        onInput={(e) => setValue(e.currentTarget.value)}
        name="text"
        autoComplete="off"
        required
      />
      <label htmlFor="text" className="label-name">
        {" "}
        {/* Aplica múltiples clases */}
        <span className="content-name">{label}</span>
      </label>
    </div>
  );
};

export default OutlineInputReact;
