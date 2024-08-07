import React from "react";

import AuthForm from "./AuthForm";
import { sendUserAuthRequest } from "../../api-helpers/api-helpers";

export const Auth = () => {
  const getData = (data) => {
    console.log(data);
    sendUserAuthRequest(data.inputs, data.signup)
      .then((res)=> console.log(res)) // return a promis
      .catch((err) => console.log(err));
  }
  return (
    <div>
    <AuthForm onSubmit={getData} isAdmin={false} />
  </div>
  );
};
