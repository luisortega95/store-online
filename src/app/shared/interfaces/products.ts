export interface Products {
  id: string,
  name: string,
  description: string,
  details: [{
    hdmi: string,
    usb: string,
    usb_c: string,
    weight: string,
    screen: string,
    battery: string,
    connectivity: string,
    ram: string,
    disk: string,
    processor: string,
    graphic: string,
    so: string,
    images: Array<any>
  }
  ],
  price: number,
  imageUrl
    :
    string,
  quantity
    :
    number
}
