'use client'

import { motion } from 'framer-motion'

import AIIcon from '@/components/icons/AIIcon'
import BoltIcon from '@/components/icons/BoltIcon'
import ClickIcon from '@/components/icons/ClickIcon'
import ClockIcon from '@/components/icons/ClockIcon'
import OpenSourceIcon from '@/components/icons/OpenSourceIcon'
import PrivacyIcon from '@/components/icons/PrivacyIcon'
import ShieldLockIcon from '@/components/icons/ShieldLockIcon'
import VideoIcon from '@/components/icons/VideoIcon'

import { FeatureCard } from './FeatureCard'

export function FeatureCards() {
  const features = [
    {
      title: 'Real-time Collaboration',
      description: 'Connect and collaborate in real-time.',
      icon: <ClockIcon className="size-6 stroke-inherit" />,
      hoverColor: '#10B981',
    },
    {
      title: 'Secure Communication',
      description: 'End-to-end encryption for your conversations.',
      icon: <ShieldLockIcon className="size-6 stroke-inherit" />,
      hoverColor: '#6366F1',
    },
    {
      title: 'Easy to Use',
      description: 'Simple interface anyone can use.',
      icon: <ClickIcon className="size-6" />,
      hoverColor: '#F59E0B',
    },
    {
      title: 'Open Source',
      description: 'Free and open source. Built with transparency.',
      icon: <OpenSourceIcon className="size-6 stroke-inherit" />,
      hoverColor: '#059669',
    },
    {
      title: 'Video',
      description: 'Real-time video chat coming soon.',
      icon: <VideoIcon className="size-6 stroke-inherit" />,
      label: 'Coming Soon',
      hoverColor: '#EA580C',
    },
    {
      title: 'AI Chat',
      description: 'AI-powered conversations in development.',
      icon: <AIIcon className="size-6" />,
      label: 'Coming Soon',
      hoverColor: '#2563EB',
    },
    {
      title: 'Lightning Fast',
      description: 'Optimized for smooth performance.',
      icon: <BoltIcon className="size-6 stroke-inherit" />,
      hoverColor: '#D97706',
    },
    {
      title: 'Privacy First',
      description: 'Complete control over your data.',
      icon: <PrivacyIcon className="size-6 stroke-inherit" />,
      hoverColor: '#36454F',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mx-auto my-32 grid max-w-7xl grid-cols-1 px-6 lg:grid-cols-4"
    >
      {features.map((feature, index) => (
        <FeatureCard key={feature.title} {...feature} index={index} />
      ))}
    </motion.div>
  )
}
