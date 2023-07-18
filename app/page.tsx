import React from "react";
import { useUser } from "@auth0/nextjs-auth0/dist/client/use-user";
import Login from "./components/Login";
import Recipes from "./components/SearchBar";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <h3>Login</h3>
      <Login />
      <Recipes />
    </>
  );
}
