import { Object3D, Group, Points as ThreePoints, Material, Euler } from 'three';
import { ReactThreeFiber } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: ReactThreeFiber.Node<Group, typeof Group>;
      points: ReactThreeFiber.Node<ThreePoints, typeof ThreePoints>;
    }
  }
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    points: ThreePoints;
    group: Group;
  }
}

declare module '@react-three/drei' {
  export interface Points extends ThreePoints {
    rotation: Euler;
  }

  export interface PointsProps {
    ref?: React.Ref<Points>;
    positions: Float32Array;
    stride?: number;
    frustumCulled?: boolean;
    children?: React.ReactNode;
    rotation?: [number, number, number] | Euler;
  }

  export interface PointMaterialProps {
    transparent?: boolean;
    color?: string;
    size?: number;
    sizeAttenuation?: boolean;
    depthWrite?: boolean;
  }

  export const Points: React.ForwardRefExoticComponent<
    PointsProps & React.RefAttributes<Points>
  >;
  export const PointMaterial: React.ForwardRefExoticComponent<
    PointMaterialProps & React.RefAttributes<Material>
  >;
} 