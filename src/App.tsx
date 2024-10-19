import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import {store} from './store/store';
import MainNavigation from './navigation/MainNavigation';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
