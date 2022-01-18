import React, { lazy, Suspense } from 'react';

const LazyProposalStep3 = lazy(() => import('./ProposalStep3'));

const ProposalStep3 = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProposalStep3 {...props} />
  </Suspense>
);

export default ProposalStep3;
