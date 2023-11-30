export interface Cat {
  catId: number
  microchip: number
  microChipNumber: string
  userIdMc: number
  catName: string
  breed: string
  color: string
  description: string
  dateLost: Date
  location: string
  catMissing: boolean
}

export interface NewCat {
  microchip: number
  microChipNumber: string
  userIdMc: number
  catName: string
  breed: string
  color: string
  description: string
  dateLost: Date
  location: string
  catMissing: boolean
}
