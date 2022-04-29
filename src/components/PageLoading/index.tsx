import { useLoading } from "hooks/useLoading";
import useStore from "zustand/store";
import { PageLoadingContainer, SpinnerContainer } from "./styles";

interface IPageLoadingProps {}

const PageLoading: React.FC<IPageLoadingProps> = props => {
  const { isLoading } = useLoading();
  const { isMobile, isExtendDrawer } = useStore();

  if (!isLoading) return null;

  return (
    <PageLoadingContainer
      className={`inset-0 ${
        isMobile ? "left-0" : isExtendDrawer ? "left-30" : "left-0"
      } top-6`}
    >
      <Spinner />
    </PageLoadingContainer>
  );
};

export default PageLoading;

const Spinner: React.FC<{}> = props => {
  return (
    <SpinnerContainer>
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </SpinnerContainer>
  );
};
