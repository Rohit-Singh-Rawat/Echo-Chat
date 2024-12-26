import BentoSection from '@/components/Home/BentoSection'
import { FeatureCards } from '@/components/Home/Features/FeatureCards'
import { Hero } from '@/components/Home/Hero'
import { NavBar } from '@/components/Home/NavBar'

const Page = () => {
  return (
    <div className="bg-white">
      <NavBar />
      <div className="container">
        <Hero />
        <BentoSection />
        <FeatureCards />
      </div>
      <div className="h-[200vh]">d</div>
    </div>
  )
}

export default Page
