import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import { Model } from './primitives'
import { PLight, SLight } from "./lights";

export function Dalek(){
  const start = useRef(false);

  const modelRef = useRef(null);

  useEffect( () => {

    setTimeout( () => {
      start.current = true;
    }, Math.random() * 50000);

  }, []);

  useFrame( () => {
    if(start.current){
      modelRef.current.position.z += 0.01;

      if(modelRef.current.position.z >= 7){
        modelRef.current.position.z = -2;
        start.current = false;

        setTimeout( () => {
          start.current = true;
        }, Math.random() * 5000000);
      }
    }

  });

  return(
    <Model ref = {modelRef} path='/models/dalek/scene.gltf' position={[3.5,0.7, -3]}/>
  );
}

export function Tardis(){
  const lightRef = useRef(null);

  const intensity = useRef(0);
  const sum = useRef(0.01)

  useFrame( () => {
    if(!lightRef) return;
    
    if(intensity.current <= 0){
      sum.current = 0.01;
    }
    if(intensity.current >= 10){
      sum.current = -0.01;
    }

    intensity.current = intensity.current + sum.current;
    lightRef.current.intensity = intensity.current
  });

  return(
    <>
      <Model path='/models/tardis/scene.gltf' position={[-15.5,0.01, 1.75]} scale={1/57} rotation={[0,45,0]}/>
      <pointLight ref = {lightRef} position={[-15,3.25, 2.3]}  color = {'#a0c9f7'}/>
    </>
  );
}

export function Police(){
  const siren = useRef('blue');

  const blueSiren = useRef(null);
  const redSiren = useRef(null);

  const lastTime = useRef(0);

  useFrame( (_, delta) => {
    if(!siren.current || !blueSiren.current || !redSiren.current){
      return;
    }

    const currentTime = Date.now();

    if(currentTime - lastTime.current > 200 || lastTime.current == 0){

      siren.current = siren.current == 'blue' ? 'red' : 'blue';

      if(siren.current == 'blue'){
        blueSiren.current.visible = true;
        redSiren.current.visible = false; 
      }
      else{
        blueSiren.current.visible = false;
        redSiren.current.visible = true; 
      }

      lastTime.current = currentTime;
  }

  })

  return(
    <group position={[9.5, 0, -3]} rotation={[0, 30 * (Math.PI / 180),0]}>
        <PLight shadow-mapSize={[512, 512]} castShadow ref = {blueSiren} position={[-0.5,1.9,-0.29]} intensity={25} color = {'#4624da'}/>
        <PLight shadow-mapSize={[512, 512]} castShadow ref = {redSiren}  position={[0.5,1.9,-0.29]}   intensity={25} color = {'#da2424'}/>
        <Model path='/models/police_car/scene.gltf' position={[0.25,0,0]} />
    </group>
  );
}

export function Lamp(){
  const spotLightRef = useRef(null);

  const step = useRef(0);
  const time = useRef(0);
  const nextBlink = useRef((Math.random() * 15));

  useEffect( () => {
    spotLightRef.current.intensity = 800;
  }, []);


  useFrame( (_, delta) => {
    time.current = time.current + delta;
    const currentTime = time.current;

    if(currentTime >= nextBlink.current && step.current == 0){
      spotLightRef.current.intensity =  0;
      nextBlink.current = currentTime + 0.05;
      step.current = 1;
    }
    if(currentTime >= nextBlink.current && step.current == 1){
      spotLightRef.current.intensity =  800;
      nextBlink.current = currentTime + 0.075;
      step.current = 2;
    }
    if(currentTime >= nextBlink.current && step.current == 2){
      spotLightRef.current.intensity =  0;
      nextBlink.current = currentTime + 0.082;
      step.current = 3;
    }
    if(currentTime >= nextBlink.current && step.current == 3){
      spotLightRef.current.intensity =  800;
      nextBlink.current = (Math.random() * 60);
      step.current = 0;
      time.current = 0;
    }    
  });

  return(
    <SLight ref = {spotLightRef} shadow-bias={-0.0001} shadow-mapSize={[2048, 2048]} castShadow position={[-18,8, 7]}  target = {[-14, -3, 0]}  color = {'#fbfd92'} angle = {Math.PI/10} penumbra={0.25}/>
  );
}