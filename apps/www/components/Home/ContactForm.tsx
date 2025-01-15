'use client'

import { Mail } from 'lucide-react'
import Link from 'next/link'

import BlurFadeIn from '../ui/BlurFadeIn'
import { EchoLoading } from '../ui/EchoLoading'
import LinkButton from '../ui/LinkButton'

import StripesBox from './StripesBox'

const ContactForm = () => {
  return (
    <StripesBox>
      <div className="flex flex-col items-center space-y-4 p-4 sm:space-y-5 sm:p-6 md:p-8 lg:p-10 xl:px-20">
        <BlurFadeIn delay={0.1} blur={true}>
          <div className="z-10 rounded-xl border-2 bg-white p-2 shadow-md">
            <EchoLoading className="size-4 sm:size-5" />
          </div>
        </BlurFadeIn>

        <BlurFadeIn delay={0.2} blur={true}>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Get in Touch
          </h2>
        </BlurFadeIn>

        <BlurFadeIn delay={0.3} blur={true}>
          <p className="text-center text-sm text-gray-600 sm:text-base">
            Have questions or feedback? I&apos;m here to help with any inquiries
            about Echo.
          </p>
        </BlurFadeIn>

        <BlurFadeIn delay={0.4} blur={true}>
          <div className="space-y-3 sm:space-y-4">
            <p className="text-xs text-gray-500 sm:text-sm">
              Let&apos;s build something amazing together
            </p>

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <LinkButton
                href="mailto:echochat.com@gmail.com"
                className="bg-primary hover:bg-primary/90 focus:ring-primary/20 inline-flex w-full items-center justify-center rounded-lg px-3 py-2 text-xs font-medium text-white transition-colors focus:outline-none focus:ring-2 sm:w-auto sm:px-4 sm:text-sm"
                variant={'primary'}
              >
                <Mail className="mr-2 size-3 sm:size-4" />
                Email Us
              </LinkButton>

              <LinkButton
                href="https://x.com/intent/follow?screen_name=Spacing_Whale"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#1DA1F2] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1DA1F2]/90 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]/20 sm:w-auto sm:px-4 sm:text-sm"
              >
                <svg viewBox="0 0 128 128" className="mr-2 size-3 sm:size-4">
                  <path
                    className="dark:invert"
                    d="M75.916 54.2 122.542 0h-11.05L71.008 47.06 38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303 89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086-39.42-56.386h16.972L65.19 53.824l4.954 7.086 41.353 59.15h-16.97L60.782 71.793Z"
                    style={{ strokeWidth: '0.104373' }}
                  />
                </svg>
                Twitter
              </LinkButton>
            </div>
          </div>
        </BlurFadeIn>

        <BlurFadeIn delay={0.5} blur={true}>
          <div className="mt-4 text-center text-xs text-gray-500 sm:mt-6 sm:text-sm">
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
