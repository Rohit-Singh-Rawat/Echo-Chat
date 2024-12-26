'use client'

import {
  ArrowRight,
  Blocks,
  Code2,
  Fingerprint,
  Lock,
  Share2,
  Users,
  Video,
  Bot,
  Github,
  Zap,
  Shield,
} from 'lucide-react'

import { FeatureCard } from './FeatureCard'

export function FeatureCards() {
  const features = [
    {
      title: 'Real-time Collaboration',
      description: 'Connect and collaborate in real-time.',
      icon: <Users className="size-6 text-gray-600" />,
    },
    {
      title: 'Secure Communication',
      description: 'End-to-end encryption for your conversations.',
      icon: <Lock className="size-6 text-gray-600" />,
    },
    {
      title: 'Easy to Use',
      description: 'Simple interface anyone can use.',
      icon: <Share2 className="size-6 text-gray-600" />,
    },
    {
      title: 'Open Source',
      description: 'Free and open source.',
      icon: <Github className="size-6 text-gray-600" />,
    },
    {
      title: 'Video Coming Soon',
      description: 'Real-time video chat coming soon.',
      icon: <Video className="size-6 text-gray-600" />,
    },
    {
      title: 'AI Chat Coming Soon',
      description: 'AI-powered conversations in development.',
      icon: <Bot className="size-6 text-gray-600" />,
    },
    {
      title: 'Lightning Fast',
      description: 'Optimized for smooth performance.',
      icon: <Zap className="size-6 text-gray-600" />,
    },
    {
      title: 'Privacy First',
      description: 'Complete control over your data.',
      icon: <Shield className="size-6 text-gray-600" />,
    },
  ]

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 lg:grid-cols-4">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  )
}
