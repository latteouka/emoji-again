import { useRef, forwardRef } from "react";
import { mergeRefs } from "react-merge-refs";

interface Props {
  children: React.ReactNode;
}

const Layout = forwardRef<HTMLDivElement, Props>(({ children }: Props, ref) => {
  const localRef = useRef();
  return (
    <div
      ref={mergeRefs([ref, localRef])}
      className="dom absolute left-0 top-0 z-10 h-screen w-screen overflow-hidden"
    >
      {children}
    </div>
  );
});
Layout.displayName = "Layout";

export default Layout;
