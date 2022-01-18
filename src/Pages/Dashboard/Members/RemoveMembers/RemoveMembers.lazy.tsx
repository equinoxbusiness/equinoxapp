import React, { lazy, Suspense } from 'react';

const LazyRemoveMembers = lazy(() => import('./RemoveMembers'));

const RemoveMembers = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRemoveMembers {...props} />
  </Suspense>
);

export default RemoveMembers;
