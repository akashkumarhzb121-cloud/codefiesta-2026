import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { FocusAreas } from '@/components/focus-areas'
import { About } from '@/components/about'
import { Prizes } from '@/components/prizes'
import { Gallery } from '@/components/gallery'
import { ProblemStatements } from '@/components/problem-statements'
import { Faq } from '@/components/faq'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FocusAreas />
        <About />
        <Prizes />
        <Gallery />
        <ProblemStatements />
        <Faq />
      </main>
      <SiteFooter />
    </>
  )
}
