import React, { lazy, Suspense } from 'react';

const LazyCreateICOstep2 = lazy(() => import('./CreateICOstep2'));

const CreateICOstep2 = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCreateICOstep2 {...props} />
  </Suspense>
);

export default CreateICOstep2;
