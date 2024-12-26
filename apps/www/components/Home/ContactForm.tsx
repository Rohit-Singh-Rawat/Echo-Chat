'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Twitter } from 'lucide-react'
import Link from 'next/link'

import BlurFadeIn from '../ui/BlurFadeIn'
import { EchoLoading } from '../ui/EchoLoading'
import LinkButton from '../ui/LinkButton'

import StripesBox from './StripesBox'

const ContactForm = () => {
  return (
    <StripesBox>
      <div className="flex flex-col items-center space-y-5 p-10 px-20">
        <BlurFadeIn delay={0.1} blur={true}>
          <div className="z-10 rounded-xl border-2 bg-white p-2 shadow-md">
            <EchoLoading className="size-5" />
          </div>
        </BlurFadeIn>

        <BlurFadeIn delay={0.2} blur={true}>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
            Get in Touch
          </h2>
        </BlurFadeIn>

        <BlurFadeIn delay={0.3} blur={true}>
          <p className="text-center text-gray-600">
            Have questions or feedback? I&apos;m here to help with any inquiries
            about Echo.
          </p>
        </BlurFadeIn>

        <BlurFadeIn delay={0.4} blur={true}>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Let&apos;s build something amazing together
            </p>

            <div className="flex gap-4">
              <LinkButton
                href="mailto:echochat.com@gmail.com"
                className="bg-primary hover:bg-primary/90 focus:ring-primary/20 inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2"
                variant={'primary'}
              >
                <Mail className="mr-2 size-4" />
                Email Us
              </LinkButton>

              <LinkButton
                href="https://x.com/intent/follow?screen_name=Spacing_Whale"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-[#1DA1F2] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1DA1F2]/90 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]/20"
              >
                <Twitter className="mr-2 size-4" />
                Twitter
              </LinkButton>
            </div>
          </div>
        </BlurFadeIn>

        <BlurFadeIn delay={0.5} blur={true}>
          <div className="mt-6 text-center text-sm text-gray-500">
            For technical issues, please visit our
            <Link
              href="https://github.com/Rohit-Singh-Rawat/Echo-Chat/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary ml-1 hover:underline"
            >
              GitHub Issues
            </Link>
          </div>
        </BlurFadeIn>
      </div>
    </StripesBox>
  )
}

export default ContactForm
