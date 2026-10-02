import { useEffect, useState } from "react";

const COUNTRIES_GEOJSON_URL =
  "https://unpkg.com/three-globe/example/hexed-polygons/ne_110m_admin_0_countries.geojson";

export function useCountriesGeoJSON() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(COUNTRIES_GEOJSON_URL)
      .then((res) => res.json())
      .then((data) => setCountries(data.features))
      .catch(() => setCountries([]));
  }, []);

  return countries;
}
