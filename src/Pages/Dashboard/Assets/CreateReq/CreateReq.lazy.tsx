import React, { lazy, Suspense } from 'react';

const LazyCreateReq = lazy(() => import('./CreateReq'));

const CreateReq = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCreateReq {...props} />
  </Suspense>
);

export default CreateReq;
