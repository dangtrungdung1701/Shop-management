import ErrorBoundary from "components/ErrorBoundary";

const withErrorBoundary =
  <T,>(Component: React.FC<T>) =>
  (props: T) => {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };

export default withErrorBoundary;
