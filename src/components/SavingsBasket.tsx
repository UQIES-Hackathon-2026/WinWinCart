import { OrbitControls, RoundedBox } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  NoToneMapping,
  QuadraticBezierCurve3,
  Vector3,
  type Group,
} from 'three'

const LIME = '#91EF5B'
const FOREST = '#084E46'
const PAPER = '#FFFFFF'

const MILK_COUNT = 7
const DROP_STAGGER = 0.08
const LOCKED_POLAR = 1.05
const CANVAS_SIZE = 228

const HANDLE_POS = new QuadraticBezierCurve3(
  new Vector3(-0.52, 0.5, 0.6),
  new Vector3(0, 0.92, 0.98),
  new Vector3(0.52, 0.5, 0.6),
)

const HANDLE_NEG = new QuadraticBezierCurve3(
  new Vector3(-0.52, 0.5, -0.6),
  new Vector3(0, 0.92, -0.98),
  new Vector3(0.52, 0.5, -0.6),
)

function hash11(index: number, salt: number) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453
  return value - Math.floor(value)
}

function milkPose(index: number) {
  const slots: [number, number][] = [
    [-0.2, 0.11],
    [0.19, -0.1],
    [0.04, 0.16],
    [-0.12, -0.17],
    [0.21, 0.07],
    [-0.05, -0.05],
    [0.1, -0.12],
  ]
  const [sx, sz] = slots[index]
  return {
    x: sx + (hash11(index, 1) - 0.5) * 0.06,
    y: -0.22 + hash11(index, 3) * 0.1,
    z: sz + (hash11(index, 2) - 0.5) * 0.05,
    rotX: (hash11(index, 4) - 0.5) * 0.32,
    rotY: (hash11(index, 5) - 0.5) * 1.15,
    rotZ: (hash11(index, 6) - 0.5) * 0.28,
  }
}

function LimeMat() {
  return <meshLambertMaterial color={LIME} flatShading />
}

function BasketWall({
  width,
  slats,
  rotation,
  position,
}: {
  width: number
  slats: number
  rotation: [number, number, number]
  position: [number, number, number]
}) {
  const slatItems = Array.from({ length: slats }, (_, i) => {
    const t = slats === 1 ? 0.5 : i / (slats - 1)
    const x = (t - 0.5) * (width - 0.08)
    return (
      <mesh key={`slat-${i}`} position={[x, 0.02, 0]}>
        <boxGeometry args={[0.055, 0.92, 0.055]} />
        <LimeMat />
      </mesh>
    )
  })

  const rails = [-0.34, -0.06, 0.22].map((y, i) => (
    <mesh key={`rail-${i}`} position={[0, y, 0]}>
      <boxGeometry args={[width, 0.055, 0.055]} />
      <LimeMat />
    </mesh>
  ))

  return (
    <group position={position} rotation={rotation}>
      {slatItems}
      {rails}
    </group>
  )
}

function RoundedRectRim({
  width,
  depth,
  radius,
  tube,
  y,
}: {
  width: number
  depth: number
  radius: number
  tube: number
  y: number
}) {
  const hw = width / 2 - radius
  const hd = depth / 2 - radius
  const sideX = width - 2 * radius
  const sideZ = depth - 2 * radius

  return (
    <group>
      <mesh position={[0, y, depth / 2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[tube, tube, sideX, 8]} />
        <LimeMat />
      </mesh>
      <mesh position={[0, y, -depth / 2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[tube, tube, sideX, 8]} />
        <LimeMat />
      </mesh>
      <mesh position={[width / 2, y, 0]} rotation={[0, Math.PI / 2, Math.PI / 2]}>
        <cylinderGeometry args={[tube, tube, sideZ, 8]} />
        <LimeMat />
      </mesh>
      <mesh position={[-width / 2, y, 0]} rotation={[0, Math.PI / 2, Math.PI / 2]}>
        <cylinderGeometry args={[tube, tube, sideZ, 8]} />
        <LimeMat />
      </mesh>
      <mesh position={[hw, y, hd]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, tube, 8, 8, Math.PI / 2]} />
        <LimeMat />
      </mesh>
      <mesh position={[-hw, y, hd]} rotation={[Math.PI / 2, Math.PI / 2, 0]}>
        <torusGeometry args={[radius, tube, 8, 8, Math.PI / 2]} />
        <LimeMat />
      </mesh>
      <mesh position={[-hw, y, -hd]} rotation={[Math.PI / 2, Math.PI, 0]}>
        <torusGeometry args={[radius, tube, 8, 8, Math.PI / 2]} />
        <LimeMat />
      </mesh>
      <mesh position={[hw, y, -hd]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
        <torusGeometry args={[radius, tube, 8, 8, Math.PI / 2]} />
        <LimeMat />
      </mesh>
    </group>
  )
}

function LimeBasket() {
  const corners: [number, number][] = [
    [0.66, 0.43],
    [-0.66, 0.43],
    [0.66, -0.43],
    [-0.66, -0.43],
  ]

  return (
    <group>
      <mesh position={[0, -0.46, 0]}>
        <boxGeometry args={[1.38, 0.08, 0.92]} />
        <LimeMat />
      </mesh>

      {corners.map(([x, z]) => (
        <mesh key={`${x}:${z}`} position={[x, 0.02, z]}>
          <boxGeometry args={[0.07, 0.92, 0.07]} />
          <LimeMat />
        </mesh>
      ))}

      <BasketWall position={[0, 0, 0.46]} rotation={[0, 0, 0]} slats={7} width={1.38} />
      <BasketWall position={[0, 0, -0.46]} rotation={[0, Math.PI, 0]} slats={7} width={1.38} />
      <BasketWall position={[0.69, 0, 0]} rotation={[0, Math.PI / 2, 0]} slats={5} width={0.92} />
      <BasketWall position={[-0.69, 0, 0]} rotation={[0, -Math.PI / 2, 0]} slats={5} width={0.92} />

      <RoundedRectRim depth={1.18} radius={0.12} tube={0.055} width={1.74} y={0.5} />

      <mesh>
        <tubeGeometry args={[HANDLE_POS, 20, 0.038, 8, false]} />
        <LimeMat />
      </mesh>
      <mesh>
        <tubeGeometry args={[HANDLE_NEG, 20, 0.038, 8, false]} />
        <LimeMat />
      </mesh>
    </group>
  )
}

function MilkCarton() {
  return (
    <group>
      <RoundedBox args={[0.2, 0.36, 0.13]} position={[0, 0, 0]} radius={0.028} smoothness={3}>
        <meshLambertMaterial color={PAPER} />
      </RoundedBox>
      <mesh position={[0, 0.195, 0]}>
        <boxGeometry args={[0.2, 0.055, 0.13]} />
        <meshLambertMaterial color={FOREST} flatShading />
      </mesh>
    </group>
  )
}

function DroppingMilk({
  index,
  reducedMotion,
}: {
  index: number
  reducedMotion: boolean
}) {
  const pose = milkPose(index)
  const startY = reducedMotion ? pose.y : 2.55 + index * 0.16
  const group = useRef<Group>(null)
  const velocity = useRef(0)
  const y = useRef(startY)
  const origin = useRef<number | null>(null)

  useFrame((state, delta) => {
    const node = group.current
    if (!node || reducedMotion) return

    const dt = Math.min(delta, 0.04)
    if (origin.current === null) origin.current = state.clock.elapsedTime
    if (state.clock.elapsedTime - origin.current < index * DROP_STAGGER) {
      node.position.y = y.current
      return
    }

    const stiffness = 38
    const damping = 9.5
    const accel = (pose.y - y.current) * stiffness - velocity.current * damping
    velocity.current += accel * dt
    y.current += velocity.current * dt

    if (Math.abs(pose.y - y.current) < 0.002 && Math.abs(velocity.current) < 0.012) {
      y.current = pose.y
      velocity.current = 0
    }

    node.position.y = y.current
  })

  return (
    <group
      position={[pose.x, startY, pose.z]}
      ref={group}
      rotation={[pose.rotX, pose.rotY, pose.rotZ]}
    >
      <MilkCarton />
    </group>
  )
}

function AmbientControls({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <OrbitControls
      autoRotate={!reducedMotion}
      autoRotateSpeed={0.45}
      dampingFactor={0.08}
      enableDamping
      enablePan={false}
      enableZoom={false}
      maxPolarAngle={LOCKED_POLAR}
      minPolarAngle={LOCKED_POLAR}
      target={[0, 0.12, 0]}
    />
  )
}

function BasketScene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight intensity={1.15} position={[3.2, 6.4, 4.2]} />
      <group position={[0, -0.08, 0]}>
        <LimeBasket />
        {Array.from({ length: MILK_COUNT }, (_, index) => (
          <DroppingMilk index={index} key={index} reducedMotion={reducedMotion} />
        ))}
      </group>
      <AmbientControls reducedMotion={reducedMotion} />
    </>
  )
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'),
    )
  } catch {
    return false
  }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return reduced
}

type BoundaryProps = {
  children: ReactNode
  fallback: ReactNode
}

type BoundaryState = {
  failed: boolean
}

class WebGLErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false }

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true }
  }

  render() {
    if (this.state.failed) return this.props.fallback
    return this.props.children
  }
}

function BasketPlaceholder() {
  return (
    <div className="bg-paper" style={{ height: CANVAS_SIZE, width: CANVAS_SIZE }} />
  )
}

function BasketFallback({ summary }: { summary: string }) {
  return (
    <div
      className="flex items-center justify-center px-2"
      style={{ height: CANVAS_SIZE, width: CANVAS_SIZE }}
    >
      <p className="text-center text-xs text-mute">{summary}</p>
    </div>
  )
}

type SavingsBasketProps = {
  className?: string
  summary: string
}

export function SavingsBasket({ className = '', summary }: SavingsBasketProps) {
  const reducedMotion = usePrefersReducedMotion()
  const [webgl] = useState(() =>
    typeof window !== 'undefined' ? supportsWebGL() : true,
  )

  if (!webgl) {
    return <BasketFallback summary={summary} />
  }

  return (
    <div
      aria-label="Lime shopping basket with seven milk cartons"
      className={['touch-none', className].join(' ')}
      role="img"
      style={{ height: CANVAS_SIZE, width: CANVAS_SIZE }}
    >
      <WebGLErrorBoundary fallback={<BasketFallback summary={summary} />}>
        <Suspense fallback={<BasketPlaceholder />}>
          <Canvas
            aria-hidden
            camera={{ far: 40, fov: 32, near: 0.1, position: [2.55, 2.15, 3.35] }}
            dpr={[1, 2]}
            gl={{ alpha: true, antialias: true }}
            shadows={false}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0)
              gl.toneMapping = NoToneMapping
            }}
            style={{ background: 'transparent', height: '100%', width: '100%' }}
          >
            <BasketScene reducedMotion={reducedMotion} />
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>
    </div>
  )
}
