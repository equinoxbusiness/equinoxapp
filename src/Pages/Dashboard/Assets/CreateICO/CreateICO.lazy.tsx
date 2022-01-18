import React, { lazy, Suspense } from 'react';

const LazyCreateICO = lazy(() => import('./CreateICO'));

const CreateICO = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCreateICO {...props} />
  </Suspense>
);

export default CreateICO;
