import React from "react";
import { RouteComponentProps, useParams } from "react-router";

import Firmware from "./Firmware";
import History from "./History";
import Details from "./Detail";

interface IConfigureDeviceProps extends RouteComponentProps {}
interface IParams {
  id: string;
}
const ConfigureDevice: React.FC<IConfigureDeviceProps> = ({ location }) => {
  const params: IParams = useParams();

  return (
    <>
      <Details id={params?.id} />
      {params?.id && (
        <>
          <Firmware />
          <History />
        </>
      )}
    </>
  );
};

export default ConfigureDevice;
