import React, { lazy, Suspense } from 'react';

const LazyMembers = lazy(() => import('./Members'));

const Members = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMembers {...props} />
  </Suspense>
);

export default Members;
