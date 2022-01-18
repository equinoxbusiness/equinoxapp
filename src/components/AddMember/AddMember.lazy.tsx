import React, { lazy, Suspense } from 'react';

const LazyAddMember = lazy(() => import('./AddMember'));

const AddMember = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAddMember {...props} />
  </Suspense>
);

export default AddMember;
