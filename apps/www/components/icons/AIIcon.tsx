import React from 'react'

interface AIIconProps {
  className?: string
}

const AIIcon: React.FC<AIIconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`icon icon-tabler icons-tabler-outline icon-tabler-ai scale-125 ${className}`}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M8 16v-6a2 2 0 1 1 4 0v6" />
    <path d="M8 13h4" />
    <path d="M16 8v8" />
  </svg>
)

export default AIIcon
