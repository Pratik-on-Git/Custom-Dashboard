export type SessionUser = {
  fullName: string
  email: string
  imageUrl?: string
  initials: string
}

export type TeamLogo = 'command' | 'gallery' | 'waveform'

export type Team = {
  id: string
  name: string
  plan: string
  logo: TeamLogo
}
