import React, { lazy, Suspense } from 'react';

const LazyProjectStep5 = lazy(() => import('./ProjectStep5'));

const ProjectStep5 = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProjectStep5 {...props} />
  </Suspense>
);

export default ProjectStep5;
