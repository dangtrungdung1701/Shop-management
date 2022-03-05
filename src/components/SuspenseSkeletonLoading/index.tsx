import { SuspenseSkeletonLoadingContainer } from "./styles";

interface ISuspenseSkeletonLoadingProps {}

const SuspenseSkeletonLoading: React.FC<
  ISuspenseSkeletonLoadingProps
> = props => {
  return <SuspenseSkeletonLoadingContainer></SuspenseSkeletonLoadingContainer>;
};

export default SuspenseSkeletonLoading;
