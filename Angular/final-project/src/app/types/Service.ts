export interface Service {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  ownerId: string;
}
export interface ServiceForPostReq {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  ownerId: string;
}
