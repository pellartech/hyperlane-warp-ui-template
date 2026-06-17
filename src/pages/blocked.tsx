import { ErrorBoundary } from '../components/errors/ErrorBoundary';
import { forceSSR } from '../utils/forceSSR';

export { forceSSR as getServerSideProps };

export default function Page() {
  return (
    <ErrorBoundary>
      {(() => {
        throw new Error('Your region has been blocked from accessing this service');
      })()}
    </ErrorBoundary>
  );
}
