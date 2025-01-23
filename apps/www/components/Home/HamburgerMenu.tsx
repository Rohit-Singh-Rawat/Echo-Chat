import React from 'react'

import Hamburger from '../icons/Hamburger'

const HamburgerMenu = ({
  className,
  isOpen,
  setIsOpen,
}: {
  className?: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) => {
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <button
      className={`outline-none lg:hidden ${className}`}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
      aria-haspopup="true"
      onClick={toggleMenu}
      type="button"
    >
      <div
        className={`hamburger-icon pl-5 ${isOpen ? 'open' : ''}`}
        role="presentation"
      >
        <Hamburger
          className="size-5 stroke-black dark:stroke-white"
          isOpen={isOpen}
        />
      </div>
    </button>
  )
}

export default HamburgerMenu
