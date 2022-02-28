import { useLoading } from "hooks/useLoading";
import { PageLoadingContainer, SpinnerContainer } from "./styles";

interface IPageLoadingProps {}

const PageLoading: React.FC<IPageLoadingProps> = props => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <PageLoadingContainer>
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
