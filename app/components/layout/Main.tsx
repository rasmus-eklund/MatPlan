import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const Main: FC<Props> = ({ children }) => {
  return <main className="bg-c4 p-5 grow overflow-y-auto">{children}</main>;
};

export default Main;
