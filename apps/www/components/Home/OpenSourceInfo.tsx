import { CircleAlert, Github, GitPullRequest, Star } from 'lucide-react'
import Link from 'next/link'

import BlurFadeIn from '../ui/BlurFadeIn'
import LinkButton from '../ui/LinkButton'

import StripesBox from './StripesBox'

const GitHubFlowDiagram = () => {
  return (
    <div className="flex-center relative -my-6 scale-75 flex-col">
      <div className="flex items-center justify-center gap-8">
        <div className="-translate-x-2 rounded-xl border-2 border-neutral-200 bg-white p-2 shadow-lg transition-transform hover:-translate-y-1">
          <GitPullRequest />
        </div>
        <div className="rounded-xl border-2 border-neutral-200 bg-white p-2 shadow-lg transition-transform hover:-translate-y-1">
          <Star />
        </div>
        <div className="translate-x-2 rounded-xl border-2 border-neutral-200 bg-white p-2 shadow-lg transition-transform hover:-translate-y-1">
          <CircleAlert />
        </div>
      </div>
      <svg viewBox="0 0 128 55" className="">
        <path
          d="M64 0v25M8 0v8c0 8.837 7.163 16 16 16h24c8.837 0 16 7.163 16 16v15M120 0v8c0 8.837-7.163 16-16 16H80c-5.922 0-11.093 3.218-13.86 8"
          className="stroke-neutral-200"
          fill="none"
          strokeWidth="1.5"
          strokeDasharray="5,5"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="10;0"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      <div className="rounded-xl border-2 border-neutral-200 bg-white p-2 shadow-lg transition-transform hover:-translate-y-1">
        <Github className="text-gray-800" />
      </div>
    </div>
  )
}

const OpenSourceInfo = () => {
  return (
    <StripesBox>
      <div className="flex flex-col items-center space-y-5 p-10 px-32">
        <BlurFadeIn delay={0.1} blur={true}>
          <GitHubFlowDiagram />
        </BlurFadeIn>

        <BlurFadeIn delay={0.2} blur={true}>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
            Open Source Forever
          </h2>
        </BlurFadeIn>

        <BlurFadeIn delay={0.3} blur={true}>
          <p className="text-center text-gray-600">
            Echo codebase available on GitHub - we welcome your contributions,
            insights, and collaboration!
          </p>
        </BlurFadeIn>

        <BlurFadeIn delay={0.4} blur={true}>
          <LinkButton
            href="https://github.com/Rohit-Singh-Rawat/Echo-Chat"
            className="z-50"
          >
            <Github className="mr-2 size-4" />
            Star us on GitHub
          </LinkButton>
        </BlurFadeIn>
      </div>
    </StripesBox>
  )
}

export default OpenSourceInfo