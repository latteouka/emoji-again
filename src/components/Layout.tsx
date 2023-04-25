import type { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="flex h-screen w-full justify-center overflow-hidden">
      <div className="flex h-full w-full flex-col border-x text-slate-300 md:max-w-2xl">
        {props.children}
      </div>
    </div>
  );
};
export default Layout;
