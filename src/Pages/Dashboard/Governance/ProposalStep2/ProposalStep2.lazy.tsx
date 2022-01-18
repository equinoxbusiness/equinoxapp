import React, { lazy, Suspense } from 'react';

const LazyProposalStep2 = lazy(() => import('./ProposalStep2'));

const ProposalStep2 = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProposalStep2 {...props} />
  </Suspense>
);

export default ProposalStep2;
