import { Suspense } from "react";

const Loadable = (Component: any) => (props: any) =>
(
  <Suspense>
    <Component {...props} />
  </Suspense>
);

export default Loadable;
