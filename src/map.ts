import "leaflet/dist/leaflet.css";
import leaflet from "leaflet";

const TILE_PATH = "satellite/{z}/{x}/{y}.png";
const MAP_EXTENT = [0, -8192, 8192, 0];
const TILE_EXTENT = [0, -8192, 8192, 0];
const maxZoom = 5;
const maxResolution = 0.25;
const minResolution = Math.pow(2, maxZoom + 1) * maxResolution;
const CRS = Object.assign(Object.assign({}, leaflet.CRS.Simple), {
  transformation: new leaflet.Transformation(
    1,
    -TILE_EXTENT[0],
    -1,
    TILE_EXTENT[3],
  ),
  scale: (r: any) => {
    return Math.pow(2, r) / minResolution;
  },
  zoom: (r: any) => {
    return Math.log(r * minResolution) / Math.LN2;
  },
});
const bounds: [number, number][] = [
  [MAP_EXTENT[3], MAP_EXTENT[2]],
  [MAP_EXTENT[1], MAP_EXTENT[0]],
];

const map = leaflet.map("map", { crs: CRS });

const gtaVIcon = leaflet.icon({
  iconUrl: "/gta_v_icon.svg",
  iconSize: [34, 34],
  iconAnchor: [16, 16],
  popupAnchor: [-5, -50],
});
let marker: leaflet.Marker | null = null;
const targetLocation = { lat: -5549.5, lng: 3170 };
leaflet.marker(targetLocation).addTo(map);

leaflet
  .tileLayer(TILE_PATH, {
    maxZoom,
    tileSize: 512,
    attribution: "",
    tms: !1,
    noWrap: !0,
  })
  .addTo(map);
map.fitBounds(bounds);

map.on("click", (ev) => {
  if (marker) {
    marker.setLatLng(ev.latlng);
  } else {
    marker = leaflet.marker(ev.latlng, { icon: gtaVIcon }).addTo(map);
  }
  calcDistance(ev.latlng);
});

function calcDistance(cords: { lat: number; lng: number }) {
  // Calculating the distance between the two points using the Pythagorean theorem
  const diffLng = cords.lng - targetLocation.lng;
  const diffLat = cords.lat - targetLocation.lat;
  const distance = Math.floor(Math.sqrt(diffLng * diffLng + diffLat * diffLat));
  const distanceKm = `${(distance / 1000).toFixed(1)} km`;

  console.log(distance >= 1000 ? distanceKm : `${distance} m`);
}
