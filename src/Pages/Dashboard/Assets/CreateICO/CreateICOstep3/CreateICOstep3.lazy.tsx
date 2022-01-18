import React, { lazy, Suspense } from 'react';

const LazyCreateICOstep3 = lazy(() => import('./CreateICOstep3'));

const CreateICOstep3 = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCreateICOstep3 {...props} />
  </Suspense>
);

export default CreateICOstep3;
