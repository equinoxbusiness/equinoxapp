import React, { lazy, Suspense } from 'react';

const LazyCreateReqStep1 = lazy(() => import('./CreateReqStep1'));

const CreateReqStep1 = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCreateReqStep1 {...props} />
  </Suspense>
);

export default CreateReqStep1;
