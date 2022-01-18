import React, { lazy, Suspense } from 'react';

const LazyCreateICOstep1 = lazy(() => import('./CreateICOstep1'));

const CreateICOstep1 = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCreateICOstep1 {...props} />
  </Suspense>
);

export default CreateICOstep1;
