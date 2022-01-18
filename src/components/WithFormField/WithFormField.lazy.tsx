import React, { lazy, Suspense } from 'react';

const LazyWithFormField = lazy(() => import('./WithFormField'));

const WithFormField = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyWithFormField {...props} />
  </Suspense>
);

export default WithFormField;
