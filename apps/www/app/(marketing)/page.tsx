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
  Zap,
  Globe,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import EchoLogo from '@/components/icons/animated/EchoLogo'

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

const pulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

export default function EchoLanding() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/">
            <EchoLogo />
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <button className="rounded-full px-4 py-2 text-sm font-medium text-black transition-colors duration-300 hover:bg-gray-100">
                Sign In
              </button>
            </Link>
            <Link href="/register">
              <button className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-gray-800">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container relative mx-auto overflow-hidden px-4 pb-16 pt-32 text-center"
      >
        <motion.div
          animate={pulse}
          className="absolute inset-0 z-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-50"
        />
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative z-10"
        >
          <h1 className="mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl md:text-8xl">
            Echo
          </h1>
        </motion.div>
        <p className="relative z-10 mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-700 sm:text-2xl">
          Secure, ephemeral chat rooms for teams and individuals. Connect,
          collaborate, and let conversations fade naturally.
        </p>
        <div className="relative z-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-black px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-gray-800 sm:w-auto"
            >
              Start Chatting
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
          <Link href="/pricing">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex w-full items-center justify-center gap-2 rounded-full border-2 border-black bg-white px-8 py-4 font-medium text-black transition-all duration-300 hover:bg-gray-100 sm:w-auto"
            >
              View Pricing
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 mt-12"
        >
          <img
            src="/images/hero-mockup.png"
            alt="Echo App Mockup"
            className="mx-auto max-w-full rounded-lg shadow-2xl"
          />
        </motion.div>
      </motion.header>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        className="container mx-auto px-4 py-16"
      >
        <h2 className="mb-12 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl">
          Key Features
        </h2>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<MessageSquare className="size-8 text-black" />}
            title="Instant Creation"
            description="Create private rooms in seconds. No signup required."
          />
          <FeatureCard
            icon={<Clock className="size-8 text-black" />}
            title="Time-Bound Privacy"
            description="Rooms automatically expire after their set duration."
          />
          <FeatureCard
            icon={<Lock className="size-8 text-black" />}
            title="Zero Traces"
            description="Messages vanish completely after expiration."
          />
          <FeatureCard
            icon={<Users className="size-8 text-black" />}
            title="Team Collaboration"
            description="Perfect for quick team huddles and brainstorming sessions."
          />
          <FeatureCard
            icon={<Sparkles className="size-8 text-black" />}
            title="Premium Features"
            description="Extend room duration and increase participant limits."
          />
          <FeatureCard
            icon={<Shield className="size-8 text-black" />}
            title="Enterprise-Grade Security"
            description="End-to-end encryption and advanced security features."
          />
        </div>
      </motion.section>

      {/* Grid Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="bg-gradient-to-r from-gray-100 to-gray-200 py-24"
      >
        <div className="container mx-auto px-4">
          <h2 className="mb-12 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl">
            Why Choose Echo?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <GridItem
              icon={<Zap className="size-10 text-black" />}
              title="Lightning Fast"
              description="Create and join rooms instantly, no waiting required."
            />
            <GridItem
              icon={<Globe className="size-10 text-black" />}
              title="Global Reach"
              description="Connect with team members across the world seamlessly."
            />
            <GridItem
              icon={<Terminal className="size-10 text-black" />}
              title="Developer Friendly"
              description="Robust API for easy integration with your existing tools."
            />
            <GridItem
              icon={<Github className="size-10 text-black" />}
              title="Open Source"
              description="Contribute to our growing community of developers."
            />
            <GridItem
              icon={<Users className="size-10 text-black" />}
              title="Team-Oriented"
              description="Built with collaboration at its core."
            />
            <GridItem
              icon={<Shield className="size-10 text-black" />}
              title="Privacy First"
              description="Your data is yours. We ensure it stays that way."
            />
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="bg-black py-24 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
            Ready to elevate your team communication?
          </h2>
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group mx-auto flex items-center gap-2 rounded-full bg-white px-8 py-4 font-medium text-black transition-all duration-300 hover:bg-gray-200"
            >
              Get Started for Free
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-100 to-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>
            © 2024 Echo ·{' '}
            <Link href="/privacy" className="text-black hover:underline">
              Privacy Policy
            </Link>{' '}
            ·{' '}
            <Link href="/terms" className="text-black hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <div className="mb-4 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 p-3">
        {icon}
      </div>
      <h3 className="mb-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-xl font-semibold text-transparent">
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

function GridItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-black">{title}</h3>
      <p className="text-center text-gray-600">{description}</p>
    </motion.div>
  )
}
