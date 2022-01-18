import React, { lazy, Suspense } from 'react';

const LazyAddMembers = lazy(() => import('./AddMembers'));

const AddMembers = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAddMembers {...props} />
  </Suspense>
);

export default AddMembers;
