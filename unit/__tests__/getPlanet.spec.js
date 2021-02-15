const { getPlanet } = require("../js/sw-client.js");
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

describe("Get planet function", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("Endpoint with specific argument", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        name: "Utapau",
        rotation_period: "27",
        orbital_period: "351",
        diameter: "12900",
        climate: "temperate, arid, windy",
        gravity: "1 standard",
        terrain: "scrublands, savanna, canyons, sinkholes",
        surface_water: "0.9",
        population: "95000000",
        residents: ["http://swapi.dev/api/people/83/"],
        films: ["http://swapi.dev/api/films/6/"],
        created: "2014-12-10T12:49:01.491000Z",
        edited: "2014-12-20T20:58:18.439000Z",
        url: "http://swapi.dev/api/planets/12/"
      })
    );

    await getPlanet(1);
    expect(fetch).toHaveBeenCalledWith(`https://swapi.dev/api/planets/1`, {
      method: "GET"
    });
  });

  it("Fetch is made once", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        name: "Utapau",
        rotation_period: "27",
        orbital_period: "351",
        diameter: "12900",
        climate: "temperate, arid, windy",
        gravity: "1 standard",
        terrain: "scrublands, savanna, canyons, sinkholes",
        surface_water: "0.9",
        population: "95000000",
        residents: ["http://swapi.dev/api/people/83/"],
        films: ["http://swapi.dev/api/films/6/"],
        created: "2014-12-10T12:49:01.491000Z",
        edited: "2014-12-20T20:58:18.439000Z",
        url: "http://swapi.dev/api/planets/12/"
      })
    );
    await getPlanet(1);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it.only("Passing wrong ID number returns Not found message", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        detail: "Not found"
      })
    );
    const data = await getPlanet(`test`);
    expect(data.detail).toEqual("Not found");
  });

  it("A planet has a valid schema", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        name: "Utapau",
        rotation_period: "27",
        orbital_period: "351",
        diameter: "12900",
        climate: "temperate, arid, windy",
        gravity: "1 standard",
        terrain: "scrublands, savanna, canyons, sinkholes",
        surface_water: "0.9",
        population: "95000000",
        residents: ["http://swapi.dev/api/people/83/"],
        films: ["http://swapi.dev/api/films/6/"],
        created: "2014-12-10T12:49:01.491000Z",
        edited: "2014-12-20T20:58:18.439000Z",
        url: "http://swapi.dev/api/planets/12/"
      })
    );
    const data = await getPlanet(1);
    expect(data).toMatchSchema(schema);
  });
});
