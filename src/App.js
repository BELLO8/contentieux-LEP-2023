/* eslint-disable */

import React, { Suspense } from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// ** Router Import
import Router from "./router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={null}>
        <Router />
      </Suspense>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
