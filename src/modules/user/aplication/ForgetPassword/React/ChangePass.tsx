import React, { useEffect, useState, type FC } from 'react'
import { validMail, validPass } from '../../../../../utils/validations';
import OutlineInputReact from '../../../../../components/UI/input/OutlineInputReact';
import Button from '../../ChangePassword/Button/Button';
import { postChangePass } from '../../../../../utils/api/userApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useChangePass from '../../Auth/components/Content/hooks/useChangePass';
import useTranslation from '../../../../Shared/hooks/useTranslation';

interface Props {
  i18:any
  token?:string;
  email?:string;
  currentLocale:string;
}

export default function ChangePassReact ({token,email,i18,currentLocale} : Props ) {
  const {
    loading,
    validation_pass,
    handleSubmit,
    handleChangePassword,
    handleChangeConfirmPassword,
    password,
    validation_confirm_pass,
    confirmPassword
  } = useChangePass({token,email});

  const {translation} = useTranslation()

return (
  <>
{/* <div className="">
        <OutlineInputReact
          loading={loading}
          setValue={setPass}
          value={pass}
          type={"password"}
          label={i18["ChangePassword"].label}
        />
        <label
          className={`${
            validation_pass || pass == "" ? "hidden" : ""
          } ml-5 text-lg text-red-600`}
        >
          {i18["Auth"].invalid_email_text}
        </label>
        </div> */}

        <div className="flex flex-col text-center w-full mb-10">

          <OutlineInputReact
            loading={loading}
            setValue={handleChangePassword}
            value={password}
            type={"password"}
            label={translation.ChangePassword.label}
            icon
          />

          <label
            className={`${
              validation_pass || password == "" ? "hidden" : ""
            } ml-5 text-lg text-red-600`}
          >
            {translation.Auth.invalid_pass_text}
          </label>

            <>
            <OutlineInputReact
              loading={loading}
              setValue={handleChangeConfirmPassword}
              value={confirmPassword}
              type={"password"}
              label={translation.Auth.confirm_password_input_label}
              icon
            />

            <label
            className={`${
              validation_confirm_pass ? "hidden" : ""
            } ml-5 text-lg text-red-600`}
            >
            {translation.Auth.invalid_confirm_pass_text}
            </label>
            </>
        </div>

        <Button
        loading={loading} 
        handleSubmit={handleSubmit}
        loading_text={i18["text_loading"]} 
        text={i18["ChangePassword"].send} />
        
        <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
        />
    </>
)
}