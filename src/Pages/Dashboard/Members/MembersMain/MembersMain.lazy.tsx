import React, { lazy, Suspense } from 'react';

const LazyMembersMain = lazy(() => import('./MembersMain'));

const MembersMain = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMembersMain {...props} />
  </Suspense>
);

export default MembersMain;
