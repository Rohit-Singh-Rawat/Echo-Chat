'use client'
import { motion } from 'framer-motion'

import AnonymousMode from './Features/AnonymousMode'
import CustomControls from './Features/CustomControls'
import InstantRooms from './Features/InstantRooms'
import PrivacyFeature from './Features/PrivacyFeature'


const BentoSection = () => {
  return (
    <section className="py-24" id="features">
      <div className="container">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl">
            Everything you need for seamless chat
          </h2>
          <p className="mt-6 text-lg leading-8 text-black/60">
            Powerful features that make Echo the perfect choice for temporary
            conversations
          </p>
        </motion.div>

        <div className="mt-24 grid min-h-[500px] grid-rows-2 gap-6 sm:grid-cols-6">
          <InstantRooms />
          <PrivacyFeature />
          <AnonymousMode />
          <CustomControls />
        </div>
      </div>
    </section>
  )
}

export default BentoSection
