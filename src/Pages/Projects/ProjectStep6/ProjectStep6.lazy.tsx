import React, { lazy, Suspense } from 'react';

const LazyProjectStep6 = lazy(() => import('./ProjectStep6'));

const ProjectStep6 = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProjectStep6 {...props} />
  </Suspense>
);

export default ProjectStep6;
