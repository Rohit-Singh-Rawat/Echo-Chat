'use client'

import { cn } from '@echo/utils/src'
import { User } from 'lucide-react'
import Image from 'next/image'
import React, { forwardRef, useRef } from 'react'

import { EchoLoading } from '@/components/ui/EchoLoading'

import eren from '../../../public/images/eren.jpg'
import RohitSinghRawat from '../../../public/images/RohitSinghRawat.jpg'
import { AnimatedBeam } from '../../ui/AnimatedBeams'

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; shadow?: boolean }
>(({ className, children, shadow = true }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3',
        shadow && 'shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
        className
      )}
    >
      {children}
    </div>
  )
})

Circle.displayName = 'Circle'
export { Circle }

export function RealTimeDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex h-[300px] w-full items-center justify-center overflow-hidden px-5"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-6">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref} className="p-0.5">
            <Image
              src={eren}
              alt="Eren"
              width={32}
              height={32}
              className="size-full rounded-full object-cover"
            />
          </Circle>{' '}
          <Circle ref={div5Ref}>
            <User />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <User />
          </Circle>
          <Circle ref={div4Ref} className="size-16">
            <EchoLoading className="size-8" duration={5} />
          </Circle>
          <Circle ref={div6Ref} className="p-0.5">
            <Image
              src={RohitSinghRawat}
              alt="Rohit Singh Rawat"
              width={32}
              height={32}
              className="size-full rounded-full object-cover"
            />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <User />
          </Circle>
          <Circle ref={div7Ref}>
            <User />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={5}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={5}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={5}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={5}
        endYOffset={10}
        reverse
      />
    </div>
  )
}
