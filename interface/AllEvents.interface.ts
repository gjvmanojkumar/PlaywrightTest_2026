export interface AllEvents {
  success: boolean
  data: Data[]
  pagination: Pagination
}

export interface Data {
  id: number
  title: string
  description: string
  category: string
  venue: string
  city: string
  eventDate: string
  price: number
  totalSeats: number
  availableSeats: number
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
}
