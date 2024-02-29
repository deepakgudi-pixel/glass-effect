import React, { useRef } from 'react';
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';

export default function Model() {
    const { nodes, materials } = useGLTF("/medias/hex.glb");
    const { viewport } = useThree();
    const cube = useRef(null); // Initialize useRef with null
    
    useFrame(() => {
        if (cube.current) { // Check if cube.current is not null before accessing its properties
            cube.current.rotation.x += 0.01;
            cube.current.rotation.y += 0.01;
            cube.current.rotation.z += 0.01;
        }
    });

    const materialProps = useControls({
        thickness: { value: 0.01, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: { value: 1, min: 0, max: 1, step: 0.1 },
        ior: { value: 1, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.02, min: 0, max: 1 },
        backside: { value: true },
    });

    return (
        <group>
            <group scale={[20, 20, 20]}> {/* Scale down only the cube */}
            <mesh
            castShadow
            receiveShadow
            geometry={nodes.Material1.geometry}
            material={materials.lambert1}
            scale={10}
            ref={cube}
          >
            {/* <mesh {...nodes.Material1.geometry} position={[0, 0, 0]} ref={cube}> Assign ref={cube} to the mesh */}
             <MeshTransmissionMaterial {...materialProps} />
            </mesh>
            </group>
            <Text font={'/fonts/PPNeueMontreal-Bold.otf'} position={[0, 0, -1]} fontSize={1.5} color="white" anchorX="center" anchorY="middle">
                Frostbite studio
            </Text>
        </group>
    );
}
