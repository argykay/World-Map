import React, { useState } from "react";
import { scaleQuantize } from "@visx/scale";
import { Mercator } from "@visx/geo";
import topology from "./world-topo.json";
import * as topojson from "topojson-client";
import styled from "styled-components";

export type GeoMercatorProps = {
  width: number;
  height: number;
  events?: boolean;
};

export interface FeatureShape {
  type: "Feature";
  id: string;
  geometry: { coordinates: [number, number][][]; type: "Polygon" };
  properties: { name: string };
}

// @ts-ignore
const world = topojson.feature(topology, topology.objects.units) as {
  features: FeatureShape[];
};

const color = scaleQuantize({
  domain: [
    Math.min(...world.features.map((f) => f.geometry.coordinates.length)),
    Math.max(...world.features.map((f) => f.geometry.coordinates.length)),
  ],
  range: ["#dbc6fa", "#c299fc", "#9041FF"],
});

export const background = "#fff";

function GeoMap({ width, height }: GeoMercatorProps) {
  const centerX = width / 2;
  const centerY = height / 2;

  const [countryName, setCountryName] = useState(null);

  return (
    <Wrapper>
      {countryName ? (
        <p>This country is {countryName}</p>
      ) : (
        <p>Hover over a country!</p>
      )}
      <svg width={width} height={width}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={0}
        />
        <Mercator<FeatureShape>
          data={world.features}
          translate={[centerX, centerY + 50]}
        >
          {(mercator) => (
            <g>
              {mercator.features.map(({ feature, path }, i) => (
                <Country
                  key={`map-feature-${i}`}
                  d={path || ""}
                  fill={color(feature.geometry.coordinates.length)}
                  strokeWidth={0.7}
                  onMouseEnter={() => setCountryName(feature.properties.name)}
                  onMouseLeave={() => setCountryName(null)}
                />
              ))}
            </g>
          )}
        </Mercator>
      </svg>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 700px;
  overflow: hidden;
  color: #2f3836;
  display: block;
`;

const Country = styled.path`
  pointer-events: all;
  stroke: #fff;
  &:hover {
    fill: #16d8a0;
  }
`;

export default GeoMap;
