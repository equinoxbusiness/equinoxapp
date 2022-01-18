import React, { lazy, Suspense } from 'react';

const LazyProjectStep2 = lazy(() => import('./ProjectStep2'));

const ProjectStep2 = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProjectStep2 {...props} />
  </Suspense>
);

export default ProjectStep2;
