import { useEffect, useState } from "react";

import axiosClient from "common/utils/api";

import { useBreadcrumb } from "hooks/useBreadcrumb";

import { ISummary } from "typings";

import useStore from "zustand/store";

import Statistic from "./Statistic";
import Device from "./Device";

import {
  DashboardContainer,
  DashboardTitle,
  ListStatistics,
  NonBreadcrumb,
  DevicesStatistics,
  DevicesTitle,
} from "./styles";

const Overview: React.FC = () => {
  const { currentUser } = useStore();
  const [data, setData] = useState<ISummary>();

  useBreadcrumb([]);

  useEffect(() => {
    getRegion();
  }, []);

  const getRegion = async () => {
    try {
      const rs: any = await axiosClient.get(
        `/Region/${currentUser?.userInfo?.region?.id}`,
      );
      if (rs) {
        setData(rs.summary);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <DashboardContainer>
      <NonBreadcrumb>Xin chào</NonBreadcrumb>
      <DashboardTitle>{currentUser.userInfo.displayName}</DashboardTitle>
      <ListStatistics>
        <Statistic title="Tổng người dùng" data={data?.totalUsers} />
        <Statistic title="Tổng thiết bị" data={data?.totalDevices} />
        <Statistic title="Tổng bài viết" data={data?.totalPosts} />
      </ListStatistics>
      <DevicesTitle>Thống kê thiết bị</DevicesTitle>

      <DevicesStatistics>
        <Device
          icon="overview/tick-circle"
          title="Hoạt động"
          data={data?.totalConnectedDevices}
        />
        <Device
          icon="overview/info-circle"
          title="Mất kết nối"
          data={data?.totalDisconnectedDevices}
        />
        <Device
          icon="overview/volume-high"
          title="Đang phát"
          data={data?.totalPlayingDevices}
        />
        <Device
          icon="overview/volume-slash"
          title="Đang nghỉ"
          data={data?.totalStoppedDevices}
        />
      </DevicesStatistics>
    </DashboardContainer>
  );
};

export default Overview;
