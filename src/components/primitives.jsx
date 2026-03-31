import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";

export function Box({position = [0,0,0], args = [1,1,1], path=null, color = '#ffffff'}){
  const texture = path ? useLoader(TextureLoader, path) : null
  return(
    <mesh position = {position} receiveShadow> 
        <boxGeometry args={args}/>
        <meshStandardMaterial color = {color} map={texture} />
    </mesh>
  );
}

export function Sphere({position = [0,0,0], args = [1,32,32], path=null, color = '#ffffff'}){
  const texture = useLoader(TextureLoader, path);
  return(
    <mesh position = {position}>
        <sphereGeometry args={args}/>
        <meshStandardMaterial color={color} map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

export function Model({ position, rotation, scale, path=null, ref }) {
  const url = `${import.meta.env.BASE_URL}` + path;
  const gltf = useGLTF(url);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    })
  }, [gltf])

  return <primitive ref = {ref} object={gltf.scene} position={position} rotation={rotation} scale={scale} />;
}