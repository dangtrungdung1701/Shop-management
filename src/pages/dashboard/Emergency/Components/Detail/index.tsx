import React, { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";

import useStore from "zustand/store";
import { IEmergencyPrograms } from "typings";

import axiosClient from "common/utils/api";

import Info from "./Info";
import DeviceList from "./DeviceList";

import { useRedirect } from "hooks/useRedirect";

const ROLE = "EmergencyOperator";

interface IEmergencyDetailProps extends RouteComponentProps {}

interface IParams {
  id: string;
  type: string;
}

const EmergencyDetail: React.FC<IEmergencyDetailProps> = () => {
  const params: IParams = useParams();
  const { id } = params;

  const { currentUser } = useStore();
  const redirect = useRedirect();

  const [detailEmergency, setDetailEmergency] = useState<IEmergencyPrograms>();

  useEffect(() => {
    id && getEmergencyDetail(id);
  }, [id]);

  const getEmergencyDetail = async (id: string) => {
    try {
      const res: IEmergencyPrograms = await axiosClient.get(
        `/EmergencyProgram/${id}`,
      );
      if (res) {
        setDetailEmergency(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Info editField={detailEmergency} />
      <DeviceList editField={detailEmergency?.devices} />
    </>
  );
};

export default EmergencyDetail;
