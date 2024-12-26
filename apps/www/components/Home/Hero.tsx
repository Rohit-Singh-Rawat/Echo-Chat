'use client'

import { GridPattern } from '@echo/ui/components/ui/GridPattern.tsx'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { FlaskIcon } from '../icons/animated/Flask'
import { Button } from '../shared/Button'

import Chatz from './Chatz'

export const Hero = () => {
  return (
    <section className="relative m-10 mt-20 space-y-10 overflow-hidden rounded-2xl bg-[#FAF9F8] p-10 py-28 shadow-inner">
      <div className="relative p-5">
        <GridPattern
          width={40}
          height={40}
          s
          className="absolute inset-0 stroke-neutral-200 opacity-50 [mask-image:radial-gradient(900px_circle_at_center,transparent,white)]"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              className="mx-auto mb-5 flex justify-center"
            >
              <span className="bg white flex-center gap-2 rounded-full border bg-gradient-to-b from-white via-white to-neutral-50 px-5 py-1 text-sm font-medium text-black/70">
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

            <h1 className="font-sans text-4xl font-medium tracking-tight text-neutral-900 sm:text-6xl">
              Real-Time Chat
              <span className="relative whitespace-nowrap">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 273 31"
                  fill="none"
                  className="fill-bluse-300/70 absolute left-4 top-[72%] h-[0.58em] w-full scale-75"
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
                <span className="relative"> Simplified </span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mt-10 max-w-2xl text-lg text-neutral-600"
            >
              Create instant chat rooms for quick collaboration and easy
              sharing. No signup needed - just seamless communication on demand.
            </motion.p>

            <motion.div
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex items-center justify-center gap-6"
            >
              <Link href="/signup">
                <Button className="transition-ease group relative overflow-hidden rounded-full bg-black px-8 py-4 font-normal text-white hover:scale-105 hover:shadow-xl">
                  Get started
                  <motion.div
                    className="absolute inset-0 -z-10 bg-neutral-700/30"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </Button>
              </Link>
              <Link href="/public">
                <Button className="text- group relative overflow-hidden rounded-full border-2 border-neutral-200 bg-white px-8 py-4 font-normal text-neutral-900 transition-all hover:scale-105 hover:border-neutral-300 hover:bg-neutral-50">
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
          <div className="bg-gradient-radial absolute left-1/2 top-1/4 size-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full from-blue-50 via-transparent to-transparent opacity-20 blur-3xl" />
          <div className="bg-gradient-radial absolute bottom-0 right-1/2 size-[800px] translate-x-1/2 translate-y-1/2 rounded-full from-blue-50 via-transparent to-transparent opacity-20 blur-3xl" />
        </div>
      </div>
      <div className="flex-center w-full">
        <Chatz />
      </div>
    </section>
  )
}
