"use client";
import React, { useMemo } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface Cell {
    cell_id: string;
    name: string;
    paragraphs: string[];
}
interface Node {
    node_id: string;
    name: string;
    cells: Cell[];
}
interface LobeData {
    nodes: Node[];
}
interface Lobe {
    id: string;
    title: string;
    color: string;
    position: [number, number, number];
}

interface DataNavigationProps {
    data: LobeData;
    activeLobe: Lobe;
    onCellClick: (cell: Cell) => void;
}

export default function DataNavigation({ data, activeLobe, onCellClick }: DataNavigationProps) {
    if (!data || !data.nodes) return null;

    const basePos = new THREE.Vector3().fromArray(activeLobe.position);
    const sortedNodes = useMemo(() => {
        return [...data.nodes].slice(0, 1000);
    }, [data.nodes]);

    return (
        <group position={basePos}>
            {sortedNodes.map((node, nodeIdx) => {
                const spiralRadius = 12;
                const verticalSpacing = 0.8;
                const rotationSpeed = 0.15;

                const angle = nodeIdx * rotationSpeed;
                const x = Math.cos(angle) * spiralRadius;
                const z = Math.sin(angle) * spiralRadius;
                const y = (nodeIdx - sortedNodes.length / 2) * verticalSpacing;

                return (
                    <group key={node.node_id} position={[x, y, z]}>
                        <mesh onClick={(e) => e.stopPropagation()}>
                            <octahedronGeometry args={[0.5, 0]} />
                            <meshStandardMaterial
                                color={activeLobe.color}
                                emissive={activeLobe.color}
                                emissiveIntensity={2}
                                wireframe
                            />
                        </mesh>

                        {(nodeIdx % 5 === 0) && (
                            <Text
                                position={[1.5, 0, 0]}
                                fontSize={0.4}
                                color="white"
                                maxWidth={5}
                                textAlign="left"
                                anchorX="left"
                                fillOpacity={0.7}
                            >
                                {node.name.substring(0, 50).toUpperCase()}
                            </Text>
                        )}

                        {node.cells.map((cell, cellIdx) => {
                            const cAngle = (cellIdx / node.cells.length) * Math.PI * 2;
                            const cRadius = 2.0;
                            const cx = Math.cos(cAngle) * cRadius;
                            const cy = Math.sin(cAngle) * cRadius;

                            return (
                                <mesh
                                    key={cell.cell_id}
                                    position={[cx, cy, 0]}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onCellClick(cell);
                                    }}
                                >
                                    <sphereGeometry args={[0.15, 8, 8]} />
                                    <meshBasicMaterial color="white" transparent opacity={0.6} />
                                </mesh>
                            );
                        })}
                    </group>
                );
            })}
        </group>
    );
}
