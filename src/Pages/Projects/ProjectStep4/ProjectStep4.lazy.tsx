import React, { lazy, Suspense } from 'react';

const LazyProjectStep4 = lazy(() => import('./ProjectStep4'));

const ProjectStep4 = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProjectStep4 {...props} />
  </Suspense>
);

export default ProjectStep4;
