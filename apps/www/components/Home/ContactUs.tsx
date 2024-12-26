import ContactForm from './ContactForm'
import OpenSourceInfo from './OpenSourceInfo'

const ContactUs = () => {
  return (
    <section className="flex justify-between py-32" id="contact">
      <ContactForm />
      <OpenSourceInfo />
    </section>
  )
}

export default ContactUs
