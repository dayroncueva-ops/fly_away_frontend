import { useEffect, useState } from "react";
import { getBooking, type BookingDetail } from "../service/flyght";

type SavedBooking = {
  bookingId: number;
  airlineName: string;
};

export default function MyBookings() {
  const [bookings, setBookings] = useState<(BookingDetail & { airlineName: string })[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Debes iniciar sesion para ver tus reservas.");
        return;
      }

      const savedBookings: SavedBooking[] = JSON.parse(
        localStorage.getItem("bookingInfo") || "[]",
      );

      if (savedBookings.length === 0) {
        return;
      }

      try {
        const responses = await Promise.all(
          savedBookings.map((item) => getBooking(item.bookingId)),
        );

        const data = responses.map((response, index) => ({
          ...response.data,
          airlineName: savedBookings[index].airlineName,
        }));

        setBookings(data);
      } catch (err: any) {
        const message = err.response?.data?.detail || "Error al cargar reservas.";
        setError(message);
      }
    };

    loadBookings();
  }, []);

  return (
    <section className="panel">
      <h2>Mis reservas</h2>

      {error && <p className="message error">{error}</p>}

      {!error && bookings.length === 0 && (
        <p className="empty-state">No tienes reservas guardadas.</p>
      )}

      {bookings.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID reserva</th>
                <th>Numero de vuelo</th>
                <th>Aerolinea</th>
                <th>Fecha de salida</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.flightNumber}</td>
                  <td>{booking.airlineName}</td>
                  <td>{new Date(booking.estDepartureTime).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
