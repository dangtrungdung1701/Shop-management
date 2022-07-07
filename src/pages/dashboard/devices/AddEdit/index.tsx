import React, { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";

import axiosClient from "common/utils/api";

import TableLayout from "layouts/Table";

import { useLoading } from "hooks/useLoading";

import { IDevice } from "typings";

import Firmware from "./Firmware";
import History from "./History";
import Details from "./Detail";

interface IConfigureDeviceProps extends RouteComponentProps {}
interface IParams {
  id: string;
  class: string;
}

const LOAD_DATA = "LOAD_DATA";

const ConfigureDevice: React.FC<IConfigureDeviceProps> = ({ location }) => {
  const params: IParams = useParams();

  const { startLoading, stopLoading, isLoading } = useLoading();

  const [device, setDevice] = useState<IDevice | null>(null);

  useEffect(() => {
    if (params?.id) {
      getDeviceService();
    }
  }, []);

  const getDeviceService = async () => {
    try {
      startLoading(LOAD_DATA);
      const res: any = await axiosClient.get(`/Device/${params?.id}`);
      if (res) {
        setDevice(res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading(LOAD_DATA);
    }
  };

  if (!device && !isLoading)
    return (
      <TableLayout>
        <div className="w-full h-30 flex items-center justify-center">
          Gặp lỗi khi tải dữ liệu
        </div>
      </TableLayout>
    );

  return (
    <>
      <Details editField={device!} level={params?.class} />
      {params?.id && (
        <>
          <Firmware editField={device!} />
          <History editField={device!} />
        </>
      )}
    </>
  );
};

export default ConfigureDevice;
