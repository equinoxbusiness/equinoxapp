import React, { lazy, Suspense } from 'react';

const LazyProjectStep3 = lazy(() => import('./ProjectStep3'));

const ProjectStep3 = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProjectStep3 {...props} />
  </Suspense>
);

export default ProjectStep3;
