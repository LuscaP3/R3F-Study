import styles from './App.module.css'

import { Canvas } from '@react-three/fiber'

import { PerspectiveCamera } from '@react-three/drei'

import { DLight} from './components/lights.jsx'
import { Tardis, Dalek, Police, Lamp } from './components/objects.jsx'
import { Model } from './components/primitives.jsx'


function App() {
      

  return (
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[-25, 2.25, 0.75]} fov={30} onUpdate={(self) => self.lookAt(-15, 1.5, -0.25)} />
        <fog attach="fog" args={['#gray', 1, 80]} />

        <ambientLight intensity={5} color = {'#436680'}/>
        <DLight shadow-bias={-0.0001} shadow-mapSize={[2048, 2048]} castShadow position={[17,17,17]} intensity = {0.5} color = {'#bee7ff'} top={10} bottom={-10} left={20} right={-15}/>

        <Lamp />
        <Police/>
        <Tardis />
        <Dalek />
      
        <Model path='/models/alley/scene.gltf'/>
        <Model path='/models/sky_box/scene.gltf'/>
      </Canvas>
  )
}

export default App;