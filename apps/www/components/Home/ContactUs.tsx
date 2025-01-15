import ContactForm from './ContactForm'
import OpenSourceInfo from './OpenSourceInfo'

const ContactUs = () => {
  return (
    <section
      className="flex w-full flex-col items-center px-5 py-16 max-lg:gap-5 md:px-20 lg:flex-row lg:justify-between lg:px-0 lg:py-32"
      id="contact"
    >
      <ContactForm />
      <OpenSourceInfo />
    </section>
  )
}

export default ContactUs
