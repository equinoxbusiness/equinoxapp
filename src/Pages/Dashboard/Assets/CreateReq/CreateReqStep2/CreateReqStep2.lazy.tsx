import React, { lazy, Suspense } from 'react';

const LazyCreateReqStep2 = lazy(() => import('./CreateReqStep2'));

const CreateReqStep2 = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCreateReqStep2 {...props} />
  </Suspense>
);

export default CreateReqStep2;
