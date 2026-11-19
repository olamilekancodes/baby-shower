import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'
import { useFinePointer } from '@/hooks/use-fine-pointer'
import styles from './magnetic-button.module.css'

type CommonProps = {
  children: ReactNode
  variant?: 'ink' | 'outline'
}

type ButtonProps = CommonProps & {
  href?: undefined
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

type LinkProps = CommonProps & {
  href: string
}

export function MagneticButton(props: ButtonProps | LinkProps) {
  const finePointer = useFinePointer()
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 })

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!finePointer || reduce) return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 10)
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 8)
  }

  const onPointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  const className = `${styles.button} ${styles[props.variant ?? 'outline']}`
  const shared = { className, style: { x, y }, onPointerMove, onPointerLeave, whileTap: { scale: 0.97 } }

  if (props.href !== undefined) {
    return (
      <motion.a {...shared} href={props.href} target="_blank" rel="noopener noreferrer">
        {props.children}
      </motion.a>
    )
  }

  return (
    <motion.button {...shared} type={props.type ?? 'button'} disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </motion.button>
  )
}
