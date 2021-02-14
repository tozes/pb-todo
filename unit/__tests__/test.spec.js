const swclient = require(`../js/sw-client.js`);
const { matchers } = require("jest-json-schema");
expect.extend(matchers);

const schema = {
  properties: {
    name: { type: "string" },
    rotation_period: { type: "string" },
    orbital_period: { type: "string" },
    diameter: { type: "string" },
    climate: { type: "string" },
    gravity: { type: "string" },
    terrain: { type: "string" },
    surface_water: { type: "string" },
    population: { type: "string" },
    residents: { type: "array" },
    films: { type: "array" },
    created: { type: "string" },
    edited: { type: "string" },
    url: { type: "string" }
  }
};

describe(`Get all planets function`, () => {
  it(`Amount of planets is 60`, async () => {
    expect.assertions(1);
    const data = await swclient.getAllPlanets();
    expect(data.count).toEqual(60);
  });

  it(`Next page is #2`, async () => {
    expect.assertions(1);
    const data = await swclient.getAllPlanets();
    expect(data.next).toContain(`page=2`);
  });

  it(`Previous page is null`, async () => {
    expect.assertions(1);
    const data = await swclient.getAllPlanets();
    expect(data.previous).toBeNull();
  });

  it(`There are 10 planets per page`, async () => {
    expect.assertions(1);
    const data = await swclient.getAllPlanets();
    expect(data.results.length).toEqual(10);
  });

  it(`Each planet has a valid schema`, async () => {
    expect.assertions(10);
    const data = await swclient.getAllPlanets();
    data.results.forEach(planet => {
      expect(planet).toMatchSchema(schema);
    });
  });
});

describe(`Get planet function`, () => {
  it(`Passing ID number returns correct planet name`, async () => {
    expect.assertions(1);
    const data = await swclient.getPlanet(12);
    expect(data.name).toEqual(`Utapau`);
  });

  it(`Passing wrong ID number returns Not found message`, async () => {
    expect.assertions(1);
    const data = await swclient.getPlanet(`test`);
    expect(data.detail).toEqual("Not found");
  });

  it(`Passing any ID number returns Not found message`, async () => {
    expect.assertions(1);
    const data = await swclient.getPlanet();
    expect(data.detail).toEqual("Not found");
  });

  it(`Passing empty ID number returns undefined`, async () => {
    expect.assertions(1);
    const data = await swclient.getPlanet(" ");
    expect(data.detail).toEqual(undefined);
  });

  it(`A planet has a valid schema`, async () => {
    expect.assertions(1);
    const data = await swclient.getPlanet(23);
    expect(data).toMatchSchema(schema);
  });
});
