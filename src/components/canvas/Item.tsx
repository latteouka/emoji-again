import vertex from "@/gl/glsl/item.vert";
import frag from "@/gl/glsl/item.frag";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

export default function Item() {
  const size = useThree((state) => state.size);
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.scale.set(size.width, size.height, 0);
  });
  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial vertexShader={vertex} fragmentShader={frag} transparent />
    </mesh>
  );
}
