import { IRegion } from "typings";

const useGetLocation = (id: number, listLocation: IRegion[]) => {
  const location = listLocation.filter(item => item.id === id)[0];
  return location;
};

export default useGetLocation;
