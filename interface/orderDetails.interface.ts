export interface orderDetails {
  data: Data
  message: string
}

export interface Data {
  _id: string
  orderById: string
  orderBy: string
  productOrderedId: string
  productName: string
  country: string
  productDescription: string
  productImage: string
  orderPrice: string
  __v: number
}
