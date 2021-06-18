const fetch = require("node-fetch");
const planetsEndpoint = "https://swapi.dev/api/planets";

const getAllPlanets = async () => {
  const response = await fetch(planetsEndpoint, {
    method: "GET"
  }).catch(error => {
    console.log(`Failed to get planets: ${error}`);
    throw error;
  });

  const planets = await response.json();

  return planets;
};

const getPlanet = async planetId => {
  const response = await fetch(`${planetsEndpoint}/${planetId}`, {
    method: "GET"
  }).catch(error => {
    console.log(`Failed to get planet: ${error}`);
    throw error;
  });

  const planets = await response.json();

  return planets;
};

module.exports = { getAllPlanets, getPlanet };
