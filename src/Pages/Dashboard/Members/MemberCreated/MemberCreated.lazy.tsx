import React, { lazy, Suspense } from 'react';

const LazyMemberCreated = lazy(() => import('./MemberCreated'));

const MemberCreated = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMemberCreated {...props} />
  </Suspense>
);

export default MemberCreated;
