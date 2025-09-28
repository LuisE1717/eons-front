import { useState } from "react";
import { toast } from "react-toastify";
import { postLogin, singUp } from "../../../../../../utils/api/userApi";
import { validMail } from "../../../../../../utils/validations";
import AppButton from "../../../../../../components/UI/Button/Button";
import { Session } from "auth-astro";
import useTranslation from "../../../../../Shared/hooks/useTranslation";
import { useNavigate } from "react-router-dom";

interface Props {
  button_login: string;
  button_singUp: string;
  login_switch: string;
  sing_up_switch: string;
  password_input_label: string;
  forget_pass: string;
  invalid_email_text: string;
  invalid_pass_text: string;
  text_loading: string;
  confirm_password_input_label: string;
  invalid_confirm_pass_text: string;
  session: Session;
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
  confirm_password_input_label,
  invalid_confirm_pass_text,
  session,
}: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const { translation } = useTranslation();
  const navigate = useNavigate();

  // Función para redirigir a verificación de email
  const redirectToEmailVerification = (email: string, message?: string) => {
    console.log('🔐 Redirecting to email verification for:', email);
    
    // Guardar datos en localStorage para la página de verificación
    localStorage.setItem('verification_email', email);
    localStorage.setItem('verification_required', 'true');
    localStorage.setItem('verification_message', message || 'Please verify your email address');
    
    // Redirigir a la página de verificación de email
    const verificationUrl = `/auth/email-verification/${email}`;
    window.location.href = verificationUrl;
  };

  // Función para manejar redirección desde la respuesta de la API
  const handleApiRedirect = (response: any) => {
    if (response.requiresVerification && response.redirectTo) {
      console.log('🔐 API requires verification, redirecting to:', response.redirectTo);
      
      // Usar la URL proporcionada por el backend
      window.location.href = response.redirectTo;
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validaciones básicas
    if (!validMail(email)) {
      setErrorEmail(invalid_email_text);
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorPassword(invalid_pass_text);
      setLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setErrorConfirmPassword(invalid_confirm_pass_text);
      setLoading(false);
      return;
    }

    try {
      let response;

      if (isLogin) {
        // 🔄 INTENTAR LOGIN
        response = await postLogin({ email, password, type: "mail" });
        
        // Manejar redirección a verificación
        if (handleApiRedirect(response)) {
          setLoading(false);
          return;
        }

        if (response.data?.accessToken) {
          // ✅ LOGIN EXITOSO
          toast.success("Login successful!");
          setTimeout(() => {
            window.location.href = "/services";
          }, 1000);
        } else {
          // 🔄 FALLBACK: REDIRIGIR A VERIFICACIÓN SI EL LOGIN FALLA
          console.log('🔐 Login failed, redirecting to verification');
          redirectToEmailVerification(email, 'Please verify your email address to continue');
        }
      } else {
        // 🔄 REGISTRO
        response = await singUp({ email, password, type: "mail" });
        
        // Manejar redirección a verificación
        if (handleApiRedirect(response)) {
          setLoading(false);
          return;
        }

        if (response.data?.accessToken) {
          // ✅ REGISTRO EXITOSO (usuario ya verificado)
          toast.success("Registration successful!");
          setTimeout(() => {
            window.location.href = "/services";
          }, 1000);
        } else {
          // 🔄 FALLBACK: REDIRIGIR A VERIFICACIÓN SI EL REGISTRO FALLA
          console.log('🔐 Registration failed, redirecting to verification');
          redirectToEmailVerification(email, 'Registration successful. Please verify your email address.');
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      
      // 🔄 MANEJO ROBUSTO DE ERRORES - SIEMPRE REDIRIGIR A VERIFICACIÓN
      if (error.response?.status === 401 || error.response?.status === 400 || error.response?.status === 409) {
        const errorMessage = error.response?.data?.message || 'An error occurred. Please verify your email address.';
        
        // Mostrar mensaje de error específico
        if (errorMessage.includes('already exists') || errorMessage.includes('ya existe')) {
          toast.info('An account with this email already exists. Please verify your email address.');
        } else {
          toast.info(errorMessage);
        }
        
        // 🔄 REDIRECCIÓN AUTOMÁTICA A VERIFICACIÓN EN CASO DE ERROR
        redirectToEmailVerification(email, errorMessage);
      } else {
        // Error de conexión u otro error
        toast.error(translation.fecth_error);
        
        // 🔄 REDIRECCIÓN DE FALLBACK A VERIFICACIÓN
        setTimeout(() => {
          redirectToEmailVerification(email, 'Connection error. Please verify your email address.');
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errorEmail && validMail(e.target.value)) {
      setErrorEmail("");
    }
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errorPassword && e.target.value.length >= 6) {
      setErrorPassword("");
    }
  };

  const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (errorConfirmPassword && e.target.value === password) {
      setErrorConfirmPassword("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
      <Input
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={handleChangeEmail}
        error={errorEmail}
        placeholder="example@email.com"
        required
      />

      <Input
        label={password_input_label}
        name="password"
        type="password"
        value={password}
        onChange={handleChangePassword}
        error={errorPassword}
        placeholder="••••••••"
        required
      />

      {!isLogin && (
        <Input
          label={confirm_password_input_label}
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
          error={errorConfirmPassword}
          placeholder="••••••••"
          required
        />
      )}

      {isLogin && (
        <a
          href="/auth/forget-password"
          className="text-blue-500 text-sm text-end -mt-2"
        >
          {forget_pass}
        </a>
      )}

      <AppButton loading={loading} disabled={loading} type="submit">
        {loading ? text_loading : isLogin ? button_login : button_singUp}
      </AppButton>

      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 text-sm"
        >
          {isLogin ? sing_up_switch : login_switch}
        </button>
      </div>
    </form>
  );
}