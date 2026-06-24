import { useEffect, useState } from "react";
import {
  bookFlight,
  getBooking,
  search,
  type BookingDetail,
  type FlyghtDatos,
} from "../service/flyght";

function getErrorMessage(err: any, fallback: string) {
  return err.response?.data?.detail || err.response?.data?.message || fallback;
}

function getFlightItems(data: any): FlyghtDatos[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

export default function FlySearch() {
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const [flightNumber, setFlightNumber] = useState("");
  const [airlineName, setAirlineName] = useState("");
  const [departureFrom, setDepartureFrom] = useState("");
  const [departureTo, setDepartureTo] = useState("");

  const [flights, setFlights] = useState<FlyghtDatos[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [bookingDetail, setBookingDetail] = useState<BookingDetail | null>(null);

  useEffect(() => {
    const loadFlights = async () => {
      try {
        const response = await search({});
        setFlights(getFlightItems(response.data));
      } catch (err: any) {
        setError(getErrorMessage(err, "Error al cargar vuelos."));
      }
    };

    loadFlights();
  }, []);

  const toISO = (value: string) => {
    if (!value) return undefined;
    return new Date(value).toISOString();
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setBookingSuccess("");
    setBookingError("");
    setBookingDetail(null);
    setSearched(true);

    try {
      const response = await search({
        flightNumber: flightNumber || undefined,
        airlineName: airlineName || undefined,
        estDepartureTimeFrom: toISO(departureFrom),
        estDepartureTimeTo: toISO(departureTo),
      });

      setFlights(getFlightItems(response.data));
    } catch (err: any) {
      setFlights([]);
      setError(getErrorMessage(err, "Error al buscar vuelos."));
    }
  };

  const handleBook = async (flight: FlyghtDatos) => {
    setBookingSuccess("");
    setBookingError("");
    setBookingDetail(null);

    if (!isAuthenticated) {
      setBookingError("Debes iniciar sesion para reservar.");
      return;
    }

    try {
      const response = await bookFlight(flight.id);
      const bookingId = response.data.id;
      const savedBookings = JSON.parse(localStorage.getItem("bookingInfo") || "[]");

      savedBookings.push({
        bookingId,
        airlineName: flight.airlineName,
      });

      localStorage.setItem("bookingInfo", JSON.stringify(savedBookings));
      setBookingSuccess(`Reserva creada correctamente. ID: ${bookingId}`);

      const detailResponse = await getBooking(bookingId);
      setBookingDetail(detailResponse.data);
    } catch (err: any) {
      setBookingError(getErrorMessage(err, "Error al reservar el vuelo."));
    }
  };

  return (
    <section className="panel">
      <h2>Busqueda de vuelos</h2>

      <form onSubmit={handleSearch} className="search-form">
        <div>
          <label>Numero de vuelo</label>
          <input
            type="text"
            placeholder="LA123"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
          />
        </div>

        <div>
          <label>Aerolinea</label>
          <input
            type="text"
            placeholder="LATAM"
            value={airlineName}
            onChange={(e) => setAirlineName(e.target.value)}
          />
        </div>

        <div>
          <label>Salida desde</label>
          <input
            type="datetime-local"
            value={departureFrom}
            onChange={(e) => setDepartureFrom(e.target.value)}
          />
        </div>

        <div>
          <label>Salida hasta</label>
          <input
            type="datetime-local"
            value={departureTo}
            onChange={(e) => setDepartureTo(e.target.value)}
          />
        </div>

        <button type="submit">Buscar</button>
      </form>

      {error && <p className="message error">{error}</p>}

      {searched && flights.length === 0 && !error && (
        <p className="empty-state">No se encontraron vuelos con esos filtros.</p>
      )}

      {flights.length > 0 && (
        <div className="table-wrap flights-scroll">
          <table>
            <thead>
              <tr>
                <th>Numero</th>
                <th>Aerolinea</th>
                <th>Salida</th>
                <th>Llegada</th>
                <th>Asientos</th>
                <th>Accion</th>
              </tr>
            </thead>

            <tbody>
              {flights.map((flight) => (
                <tr key={flight.id}>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.airlineName}</td>
                  <td>{new Date(flight.estDepartureTime).toLocaleString()}</td>
                  <td>{new Date(flight.estArrivalTime).toLocaleString()}</td>
                  <td>{flight.availableSeats}</td>
                  <td>
                    <button
                      type="button"
                      disabled={!isAuthenticated}
                      onClick={() => handleBook(flight)}
                    >
                      Reservar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isAuthenticated && (
        <p className="empty-state">Inicia sesion para reservar un vuelo.</p>
      )}

      {bookingError && <p className="message error">{bookingError}</p>}
      {bookingSuccess && <p className="message success">{bookingSuccess}</p>}

      {bookingDetail && (
        <section className="booking-detail">
          <h3>Detalle de reserva</h3>
          <p>ID reserva: {bookingDetail.id}</p>
          <p>Vuelo: {bookingDetail.flightNumber}</p>
          <p>Salida: {new Date(bookingDetail.estDepartureTime).toLocaleString()}</p>
          <p>Llegada: {new Date(bookingDetail.estArrivalTime).toLocaleString()}</p>
          <p>
            Cliente: {bookingDetail.customerFirstName} {bookingDetail.customerLastName}
          </p>
        </section>
      )}
    </section>
  );
}
