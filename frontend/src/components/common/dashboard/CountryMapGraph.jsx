import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { geoEquirectangular } from "d3-geo";

const CountryMapGraph = ({ userData }) => {
  const [selectedCountry, setSelectedCountry] = useState();
  const [isMapLoaded, setIsMapLoaded] = useState(false); // Add this line

  const colorScale = scaleQuantize()
    .domain([0, Math.max(...Object.values(userData))])
    .range([
      "#ffedea",
      "#ffcec5",
      "#ffad9f",
      "#ff8a75",
      "#ff5533",
      "#e2492d",
      "#be3d26",
      "#9a311f",
      "#782618",
    ]);

  const projection = geoEquirectangular().scale(125).center([40, 0]);

  // Simulate the map loading by using the useEffect hook
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 3000); // Adjust timeout as needed based on your observation of map loading times

    return () => clearTimeout(timer);
  }, []); // This effect runs once on mount

  console.log(selectedCountry)

const geoUrl =
  "/topo-json.json";
  return (
    <>
    {/* {isMapLoaded && ( */}
      <>
      <ComposableMap projection={projection} height={400}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.properties.ISO_A3 !== "ATA")
              .map((geo) => {
                const countryCode = geo.properties.name;
                const value = userData[countryCode];
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    className="geoCountry"
                    onMouseEnter={() => setSelectedCountry(countryCode)}
                    onMouseLeave={() => {
                      if (selectedCountry === countryCode) {
                        setSelectedCountry();
                      }
                    }}
                    fill={value ? colorScale(value) : "#5CB86B"}
                  />
                );
              })
          }
        </Geographies>
      </ComposableMap>
          {/* <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap> */}
      {selectedCountry && (
        <div className="geo-info-panel">
          {selectedCountry} : {userData[selectedCountry] ?? 0} IP Addresses
        </div>
      )}
      </>
    {/* )} */}
    </>
  );
};

export default CountryMapGraph;
