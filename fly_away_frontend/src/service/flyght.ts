import { api } from "../api/api";

export type FlyghtDatos = {
  id: number;
  airlineName: string;
  flightNumber: string;
  estDepartureTime: string;
  estArrivalTime: string;
  availableSeats: number;
};

export type FlyghtSearchParams = {
  airlineName?: string;
  flightNumber?: string;
  estDepartureTimeFrom?: string;
  estDepartureTimeTo?: string;
};

export type BookingDetail = {
  id: number;
  bookingDate: string;
  flightId: number;
  flightNumber: string;
  estDepartureTime: string;
  estArrivalTime: string;
  customerId: number;
  customerFirstName: string;
  customerLastName: string;
};

export function search(params: FlyghtSearchParams) {
  return api.get("/flights/search", { params });
}

export function bookFlight(flightId: number) {
  return api.post("/flights/book", { flightId });
}

export function getBooking(id: number) {
  return api.get(`/flights/book/${id}`);
}