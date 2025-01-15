'use client'

import GridPattern from '@echo/ui/components/ui/GridPattern.tsx'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { FlaskIcon } from '../icons/animated/Flask'
import { Button } from '../shared/Button'

import Chatz from './Chatz'

export const Hero = () => {
  return (
    <section className="relative mx-2 mt-16 space-y-6 overflow-hidden rounded-2xl bg-[#FAF9F8] p-2 py-10 shadow-inner sm:mx-10 sm:mt-20 sm:space-y-10 sm:p-10 sm:py-20">
      <div className="relative p-3 sm:p-5">
        <GridPattern
          width={40}
          height={40}
          s
          className="absolute inset-0 stroke-neutral-200 opacity-50 [mask-image:radial-gradient(900px_circle_at_center,transparent,white)]"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-4 flex justify-center sm:mb-5"
            >
              <span className="bg white flex-center gap-2 rounded-full border bg-gradient-to-b from-white via-white to-neutral-50 px-3 py-1 text-xs font-medium text-black/70 sm:px-5 sm:text-sm">
                <FlaskIcon />{' '}
                <motion.p
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #6a0dad, #000,#6a0dad)',
                    backgroundSize: '200% 100%',
                    backgroundPosition: '0% 0%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 0%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 5,
                    ease: 'linear',
                  }}
                >
                  Beta Now Live
                </motion.p>
              </span>
            </motion.div>

            <h1 className="font-sans text-3xl font-medium tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Real-Time
              <span className="relative whitespace-nowrap">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 273 31"
                  fill="none"
                  className="absolute left-3 top-[67%] h-[0.58em] w-full scale-75"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 1.25,
                      ease: 'easeInOut',
                      delay: 0.5,
                    }}
                    stroke="#facc15"
                    strokeWidth={'3'}
                    d="M1 20.5C108 -6.50001 137.5 0.500026 134.5 6.50009C131.5 12.5001 107.5 25 102 27.0001C96.5 37.0001 211.036 14.8961 272 27.0001"
                  />
                </svg>
                <span className="relative"> Chat Rooms </span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mt-6 max-w-2xl px-1 text-base text-neutral-600 sm:mt-10 sm:px-4 sm:text-lg"
            >
              Create instant chat rooms for quick collaboration and easy
              sharing. No signup needed - just seamless communication on demand.
            </motion.p>

            <motion.div
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-col items-center justify-center gap-4 px-4 sm:mt-10 sm:flex-row sm:gap-6"
            >
              <Link href="/register" className="w-full sm:w-auto">
                <Button className="transition-ease group relative w-full overflow-hidden rounded-full bg-black px-4 py-2 font-normal text-white hover:scale-105 hover:shadow-xl sm:px-6 sm:py-3">
                  Get started
                  <motion.div
                    className="absolute inset-0 -z-10 bg-neutral-700/30"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </Button>
              </Link>
              <Link href="/room/public" className="w-full sm:w-auto">
                <Button className="text- group relative w-full overflow-hidden rounded-full border-2 border-neutral-200 bg-white px-4 py-2 font-normal text-neutral-900 transition-all hover:scale-105 hover:border-neutral-300 hover:bg-neutral-50 sm:px-6 sm:py-3">
                  Join public
                  <motion.div
                    className="absolute inset-0 -z-10 bg-neutral-100/50"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="bg-gradient-radial absolute left-1/2 top-1/4 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full from-blue-50 via-transparent to-transparent opacity-20 blur-3xl sm:size-[1000px]" />
          <div className="bg-gradient-radial absolute bottom-0 right-1/2 size-[400px] translate-x-1/2 translate-y-1/2 rounded-full from-blue-50 via-transparent to-transparent opacity-20 blur-3xl sm:size-[800px]" />
        </div>
      </div>
      <div className="flex-center w-full">
        <Chatz />
      </div>
    </section>
  )
}
