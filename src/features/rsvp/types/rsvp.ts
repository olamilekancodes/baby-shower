export type Attendance = 'yes' | 'no'

export type RsvpValues = {
  name: string
  email: string
  attendance: Attendance
  party: '1' | '2'
  note: string
}

export type RsvpStatus = 'idle' | 'sending' | 'sent' | 'error'

export const emptyRsvp: RsvpValues = {
  name: '',
  email: '',
  attendance: 'yes',
  party: '1',
  note: '',
}
