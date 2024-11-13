'use client'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  MessageSquare,
  Clock,
  Lock,
  Users,
  Sparkles,
  Shield,
  Terminal,
  Github,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function EchoLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 text-black">
      {/* Hero Section */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto px-4 pb-16 pt-24 text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <h1 className="mb-6 bg-gradient-to-r from-black to-neutral-600 bg-clip-text text-8xl font-bold tracking-tight text-transparent">
            Echo
          </h1>
        </motion.div>
        <p className="mx-auto mb-8 max-w-2xl text-2xl leading-relaxed text-neutral-600">
          Ephemeral chat rooms for moments that matter. Connect, collaborate,
          and let conversations fade naturally into digital whispers.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/dashboard
          "
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 rounded-full border-2 border-black px-8 py-4 font-medium transition-colors duration-300 hover:bg-black hover:text-white"
            >
              Start Chatting
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
          <motion.a
            href="https://github.com/yourusername/echo"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 rounded-full border-2 border-neutral-300 px-8 py-4 font-medium text-neutral-700 transition-colors duration-300 hover:border-neutral-600 hover:bg-neutral-50"
          >
            <Github className="size-5" />
            Star on GitHub
          </motion.a>
        </div>
      </motion.header>

      {/* Features Bento Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        className="container mx-auto px-4 py-16"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Instant Creation */}
          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.02 }}
            className="group rounded-3xl border-2 border-neutral-200 bg-white p-8 transition-all duration-300 hover:border-black hover:shadow-lg"
          >
            <MessageSquare className="mb-6 size-10 transition-transform group-hover:scale-110" />
            <h3 className="mb-3 text-2xl font-semibold">Instant Creation</h3>
            <p className="leading-relaxed text-neutral-600">
              Create private rooms in seconds. No signup required. Share the
              link and start your conversation immediately.
            </p>
          </motion.div>

          {/* Time-Bound Privacy */}
          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.02 }}
            className="group rounded-3xl border-2 border-neutral-200 bg-white p-8 transition-all duration-300 hover:border-black hover:shadow-lg"
          >
            <Clock className="mb-6 size-10 transition-transform group-hover:scale-110" />
            <h3 className="mb-3 text-2xl font-semibold">Time-Bound Privacy</h3>
            <p className="leading-relaxed text-neutral-600">
              Rooms automatically expire after their set duration. Your
              conversations remain truly temporary.
            </p>
          </motion.div>

          {/* Zero Traces */}
          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.02 }}
            className="group rounded-3xl border-2 border-neutral-200 bg-white p-8 transition-all duration-300 hover:border-black hover:shadow-lg"
          >
            <Lock className="mb-6 size-10 transition-transform group-hover:scale-110" />
            <h3 className="mb-3 text-2xl font-semibold">Zero Traces</h3>
            <p className="leading-relaxed text-neutral-600">
              Messages vanish completely after expiration. No logs, no history,
              just pure ephemeral communication.
            </p>
          </motion.div>

          {/* Team Collaboration */}
          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.02 }}
            className="group rounded-3xl border-2 border-neutral-200 bg-white p-8 transition-all duration-300 hover:border-black hover:shadow-lg md:col-span-2"
          >
            <Users className="mb-6 size-10 transition-transform group-hover:scale-110" />
            <h3 className="mb-3 text-2xl font-semibold">Team Collaboration</h3>
            <p className="leading-relaxed text-neutral-600">
              Perfect for quick team huddles and brainstorming sessions. Share
              files, code snippets, and ideas in a space that encourages open
              discussion.
            </p>
          </motion.div>

          {/* Premium Features */}
          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.02 }}
            className="group rounded-3xl border-2 border-neutral-200 bg-white p-8 transition-all duration-300 hover:border-black hover:shadow-lg"
          >
            <Sparkles className="mb-6 size-10 transition-transform group-hover:scale-110" />
            <h3 className="mb-3 text-2xl font-semibold">Premium Features</h3>
            <p className="leading-relaxed text-neutral-600">
              Extend room duration, increase participant limits, and access
              advanced moderation tools.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Security Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        className="container mx-auto border-y border-neutral-200 bg-white px-4 py-16"
      >
        <div className="mx-auto max-w-4xl">
          <motion.div variants={fadeIn} className="mb-12 text-center">
            <h2 className="mb-4 bg-gradient-to-r from-black to-neutral-600 bg-clip-text text-4xl font-bold text-transparent">
              Security First
            </h2>
            <p className="text-lg text-neutral-600">
              Built with privacy and security at its core
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            <motion.div variants={fadeIn} className="text-center">
              <Shield className="mx-auto mb-4 size-8" />
              <h3 className="mb-2 font-semibold">End-to-End Encryption</h3>
              <p className="text-neutral-600">
                Messages are encrypted in transit and at rest
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="text-center">
              <Terminal className="mx-auto mb-4 size-8" />
              <h3 className="mb-2 font-semibold">Open Source</h3>
              <p className="text-neutral-600">
                Transparent, auditable codebase
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="text-center">
              <Lock className="mx-auto mb-4 size-8" />
              <h3 className="mb-2 font-semibold">No Data Storage</h3>
              <p className="text-neutral-600">Messages exist only in memory</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="container mx-auto px-4 py-24 text-center"
      >
        <h2 className="mb-6 text-3xl font-bold">
          Ready to start a conversation?
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group mx-auto flex items-center gap-2 rounded-full bg-black px-8 py-4 font-medium text-white transition-colors duration-300 hover:bg-neutral-800"
        >
          Create Free Room
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="container mx-auto border-t border-neutral-200 px-4 py-8 text-center"
      >
        <p className="text-sm text-neutral-500">
          © 2024 Echo · Privacy Policy · Terms of Service
        </p>
      </motion.footer>
    </div>
  )
}
