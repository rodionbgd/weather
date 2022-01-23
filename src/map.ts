import { Coords, MapWebGL, MarkerWebGL } from "./types";

const mapElem = <HTMLDivElement>document.getElementById("map");
// const lastCity = "";
let marker: MarkerWebGL;
let map: MapWebGL;

export function createMarker(coords: Coords, city: string) {
  if (marker) {
    marker.setLatLng([coords.latitude, coords.longitude]);
    marker
      .bindPopup(`<h4 class="marker">${city}</h4>`, {
        closeButton: false,
      })
      .openPopup();
    return;
  }
  mapElem.style.overflow = "visible";
  marker = window.WE.marker([coords.latitude, coords.longitude]).addTo(map);
  marker
    .bindPopup(`<h4 class="marker">${city}</h4>`, {
      closeButton: false,
    })
    .openPopup();
}

export function flyToCity(coords: Coords) {
  if (!map) return;
  map.fitBounds([
    [coords.latitude - 90, coords.longitude - 90],
    [coords.latitude + 90, coords.longitude + 90],
  ]);
  map.panInsideBounds(
    [
      [coords.latitude - 89, coords.longitude - 89],
      [coords.latitude + 89, coords.longitude + 89],
    ],
    { heading: 1, tilt: 0, duration: 1.5 }
  );
}

export function initMap(coords: Coords) {
  const ZOOM = 1;
  const baselayer = window.WE.tileLayer(
    "https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg",
    {
      tileSize: 1024,
      bounds: [
        [-90, -180],
        [90, 180],
      ],
      minZoom: 0,
      maxZoom: 1,
      tms: true,
    }
  );
  if (!map) {
    map = window.WE.map("map", {
      center: [coords.latitude, coords.longitude],
      zoom: ZOOM,
      tilting: true,
      scrollWheelZoom: false,
    });
  }
  baselayer.addTo(map);
  map.setView([coords.latitude, coords.longitude], ZOOM);
}
