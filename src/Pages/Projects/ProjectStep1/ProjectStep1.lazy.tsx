import React, { lazy, Suspense } from 'react';

const LazyProjectStep1 = lazy(() => import('./ProjectStep1'));

const ProjectStep1 = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProjectStep1 {...props} />
  </Suspense>
);

export default ProjectStep1;
