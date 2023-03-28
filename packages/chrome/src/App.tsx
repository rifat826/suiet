import { useRoutes } from 'react-router-dom';
import './App.scss';
import routesConfig from './routes';
import './styles/react-toastify.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-tabs/style/react-tabs.css';
import ErrorBoundary from './components/ErrorBoundary';
import { useEffect, useMemo } from 'react';
import message from './components/message';
import { ToastContainer } from 'react-toastify';
import {
  ContextFeatureFlags,
  useAutoLoadFeatureFlags,
} from './hooks/useFeatureFlags';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import { fieldPolicyForTransactions } from './pages/TransactionFlow/hooks/useTransactionListForHistory';
function App() {
  const routes = useRoutes(routesConfig);
  const featureFlags = useAutoLoadFeatureFlags();
  const appContext = useSelector((state: RootState) => state.appContext);
  useEffect(() => {
    const handleError = (event: PromiseRejectionEvent) => {
      console.error('catch unhandledrejection:', event);
      event.promise.catch((e) => {
        message.error(e.message);
      });
      event.preventDefault();
    };
    window.addEventListener('unhandledrejection', handleError);
    return () => {
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  const client = useMemo(
    () =>
      new ApolloClient({
        cache: new InMemoryCache({
          typePolicies: {
            Query: {
              fields: {
                ...fieldPolicyForTransactions(),
              },
            },
          },
        }),
        uri: `https://${appContext.networkId}.suiet.app/query`,
      }),
    [appContext.networkId]
  );
  return (
    <div className="app">
      <ErrorBoundary>
        <ContextFeatureFlags.Provider value={featureFlags}>
          <ApolloProvider client={client}>{routes}</ApolloProvider>
        </ContextFeatureFlags.Provider>
        <ToastContainer />
      </ErrorBoundary>
    </div>
  );
}

export default App;
