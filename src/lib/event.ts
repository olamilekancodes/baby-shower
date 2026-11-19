export type DetailRow = {
  label: string
  value: string
  note: string
  withVenueActions?: boolean
}

export type ScheduleItem = {
  time: string
  label: string
  title: string
  detail: string
}

export type Gift = {
  icon: 'book' | 'letter' | 'heart'
  title: string
  detail: string
}

export const event = {
  startsAt: '2027-03-13T13:00:00+01:00',
  dateLong: 'Saturday, 13 March 2027',
  facts: ['Saturday 13 March 2027', '1:00 pm', 'Ikoyi, Lagos'],
  footerDate: '13 · 03 · 2027 · Lagos',
  rsvpBy: '27 February',
  venue: {
    name: 'The Garden Room',
    address: '21 Alexander Avenue, Ikoyi, Lagos',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Alexander%20Avenue%20Ikoyi%20Lagos',
  },
  details: [
    { label: 'Date', value: 'Saturday, 13 March 2027', note: 'An afternoon to remember' },
    { label: 'Time', value: '1:00 pm to 5:00 pm', note: 'Arrive from 12:45. We begin at 1:15.' },
    { label: 'Place', value: 'The Garden Room', note: '21 Alexander Avenue, Ikoyi, Lagos', withVenueActions: true },
    { label: 'Dress', value: 'Soft pinks & blues', note: 'Garden smart. Comfortable shoes for the lawn.' },
  ] as DetailRow[],
  schedule: [
    { time: '13:00', label: '1:00 pm', title: 'Welcome', detail: 'Iced tea and something sparkling on the lawn' },
    { time: '13:30', label: '1:30 pm', title: 'Letters to the baby', detail: 'A few words for them to read one day' },
    { time: '14:30', label: '2:30 pm', title: 'Garden lunch', detail: 'A long table and plenty to share' },
    { time: '15:30', label: '3:30 pm', title: 'Gifts & good wishes', detail: 'Advice, stories and a few happy tears' },
    { time: '16:30', label: '4:30 pm', title: 'Cake', detail: 'Pink inside or blue inside? Only the baker knows' },
  ] as ScheduleItem[],
  gifts: [
    { icon: 'book', title: 'A favourite book', detail: 'With a note inside the cover for the baby to find later.' },
    { icon: 'letter', title: 'A letter', detail: 'Advice, hopes or a memory. We will keep every one.' },
    { icon: 'heart', title: 'The everyday things', detail: 'Muslins, vests and nappies are always welcome.' },
  ] as Gift[],
} as const
