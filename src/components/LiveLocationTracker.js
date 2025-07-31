import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../App.css";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function LocationMarker({ setAddress }) {
  const [position, setPosition] = useState(null);

  const fetchAddress = async (lat, lon) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
      const data = await res.json();
      const display = data.display_name || "Unknown location";
      setAddress(display);

      // Autofill area name in SafetyRating section
      const safetyInput = document.getElementById("safetyAreaInput");
      if (safetyInput) safetyInput.value = display;
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  };

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      fetchAddress(e.latlng.lat, e.latlng.lng);
    },
    locationfound(e) {
      setPosition(e.latlng);
      fetchAddress(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : <Marker position={position} />;
}

function MapLocation() {
  const [center, setCenter] = useState([28.6139, 77.209]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter([latitude, longitude]);
      },
      (err) => console.warn("Geolocation error:", err),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className="card">
      <h3>📍 Select or Tap Location on Map</h3>
      <div style={{ height: "300px", borderRadius: "10px", overflow: "hidden" }}>
        <MapContainer center={center} zoom={15} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker setAddress={setAddress} />
        </MapContainer>
      </div>
      <input
        id="areaNameInput"
        className="input"
        type="text"
        placeholder="Selected area name will appear here"
        style={{ marginTop: "1rem" }}
        value={address}
        readOnly
      />
    </div>
  );
}

export default MapLocation;