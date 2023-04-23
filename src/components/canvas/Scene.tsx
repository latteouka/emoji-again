import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  [x: string]: unknown;
};

function Scene(props: Props) {
  const { children, ...others } = props;
  return (
    <Canvas {...others}>
      <directionalLight intensity={0.75} />
      <ambientLight intensity={0.75} />
      <PersCamera />

      {children}
      <Preload all />
      <OrbitControls />
    </Canvas>
  );
}

export default Scene;

function PersCamera() {
  const size = useThree((state) => state.size);
  const ref = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (!ref.current) return;
    const perspective = 400;
    ref.current.fov =
      (180 * (2 * Math.atan(size.height / 2 / perspective))) / Math.PI;
    ref.current.aspect = size.width / size.height;
    ref.current.position.z = perspective;
    ref.current.updateProjectionMatrix();
  });
  return <PerspectiveCamera ref={ref} makeDefault />;
}
