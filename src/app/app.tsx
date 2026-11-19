import { MotionConfig } from 'motion/react'
import { event } from '@/lib/event'
import { ConfettiProvider } from '@/features/confetti'
import { Countdown } from '@/features/countdown'
import { Details } from '@/features/details'
import { GiftsSection } from '@/features/gifts'
import { Guess } from '@/features/guess'
import { IntroSection } from '@/features/intro'
import { Music } from '@/features/music'
import { PearlHero } from '@/features/pearl-hero'
import { Rsvp } from '@/features/rsvp'
import { ScheduleSection } from '@/features/schedule'
import { SiteFooter } from './site-footer'

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ConfettiProvider>
        <PearlHero />
        <main>
          <IntroSection />
          <Details />
          <Countdown />
          <Guess />
          <ScheduleSection items={event.schedule} />
          <GiftsSection gifts={event.gifts} />
          <Rsvp />
        </main>
        <SiteFooter />
        <Music />
      </ConfettiProvider>
    </MotionConfig>
  )
}
