import BentoSection from '@/components/Home/BentoSection'
import ContactUs from '@/components/Home/ContactUs'
import { FeatureCards } from '@/components/Home/Features/FeatureCards'
import { Hero } from '@/components/Home/Hero'

const Page = () => {
  return (
    <div className="bg-white">
      <div className="container">
        <Hero />
        <BentoSection />
        <FeatureCards />
        <ContactUs />
      </div>
    </div>
  )
}

export default Page
