export interface eventHubLoginResponse {
  success: boolean
  token: string
  user: User
}

export interface User {
  id: number
  email: string
}