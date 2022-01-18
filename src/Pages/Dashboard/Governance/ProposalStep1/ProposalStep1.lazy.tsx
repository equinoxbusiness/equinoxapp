import React, { lazy, Suspense } from 'react';

const LazyProposalStep1 = lazy(() => import('./ProposalStep1'));

const ProposalStep1 = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProposalStep1 {...props} />
  </Suspense>
);

export default ProposalStep1;
