import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';


export const drawRouteOnMap = async (pickup: any, dropoff: any, mapRef:any) => {
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup.lon},${pickup.lat};${dropoff.lon},${dropoff.lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

  const res = await fetch(url);
  const data = await res.json();
  const route = data.routes[0].geometry;

  if (!mapRef.current) return;

  // Remove old route if exists
  if (mapRef.current.getSource("route")) {
    mapRef.current.removeLayer("route");
    mapRef.current.removeSource("route");
  }

  //Adds a new GeoJSON source to the map
  mapRef.current.addSource("route", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: route,
    },
  });

  //Adds a line layer on top of the map using the source "route"
  mapRef.current.addLayer({
    id: "route",
    type: "line",
    source: "route",
    paint: {
      "line-color": "#000",
      "line-width": 5,
    },
  });

  // Fit the map view to the route
  const bounds = new mapboxgl.LngLatBounds();
  route.coordinates.forEach((c: any) => bounds.extend(c));
  mapRef.current.fitBounds(bounds, { padding: 40 });
};
