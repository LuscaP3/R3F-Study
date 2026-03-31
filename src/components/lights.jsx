import { useHelper, OrthographicCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";

import * as THREE from 'three';


export function SLight({ref : externalRef, helper=false, target=[0,0,0], ...props}){
  const light = useRef(null);

  useEffect( () => {
    light.current.target.position.x = target[0];
    light.current.target.position.y = target[1];
    light.current.target.position.z = target[2];
    light.current.target.updateMatrixWorld();
  }, []);

  function setRefs(node){ 
    light.current = node; 
    if (typeof externalRef === "function"){
      externalRef(node);
    } 
    else if(externalRef){
      externalRef.current = node;
    }
  }

  if(helper){
    useHelper(light, THREE.SpotLightHelper, 'orange');
  }


  return(
    <spotLight ref = {setRefs} {...props}/>
  );
}

export function PLight({ref : externalRef, helper=false, ...props}){
  const light = useRef(null);

  function setRefs(node){ 
    light.current = node; 
    if (typeof externalRef === "function"){
      externalRef(node);
    } 
    else if(externalRef){
      externalRef.current = node;
    }
  }
  if(helper){
    useHelper(light, THREE.PointLightHelper, 1, 'orange');
  }

  return(
    <pointLight ref = {setRefs} {...props}/>
  );
}

export function DLight({ref : externalRef, helper=false, target=[0,0,0], left = 5, right = -5 , top = 5, bottom = -5, ...props}){
  const light = useRef(null);
  const shadow = useRef(null);

  useEffect( () => {
    light.current.target.position.x = target[0];
    light.current.target.position.y = target[1];
    light.current.target.position.z = target[2];
    light.current.target.updateMatrixWorld();
  }, []);

  function setRefs(node){ 
    light.current = node; 
    if (typeof externalRef === "function"){
      externalRef(node);
    } 
    else if(externalRef){
      externalRef.current = node;
    }
  }

  if(helper){
    useHelper(light, THREE.DirectionalLightHelper, 1, 'white');
    useHelper(shadow, THREE.CameraHelper);
  }

  return(
    <directionalLight ref = {setRefs} {...props}>
      <orthographicCamera attach={"shadow-camera"} ref = {shadow} top={top} bottom={bottom} left={left} right={right}/>
    </directionalLight>
  );
}
