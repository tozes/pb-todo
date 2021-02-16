const { getAllPlanets } = require("../js/sw-client.js");
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

describe("Get all planets function", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("Endpoint is correct", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        count: 3,
        next: "http://swapi.dev/api/planets/?page=2",
        previous: null,
        results: [
          {
            name: "Luis Guillon",
            rotation_period: "23",
            orbital_period: "304",
            diameter: "10465",
            climate: "arid",
            gravity: "1 standard",
            terrain: "desert",
            surface_water: "1",
            population: "200000",
            residents: [
              "http://swapi.dev/api/people/1/",
              "http://swapi.dev/api/people/2/",
              "http://swapi.dev/api/people/4/",
              "http://swapi.dev/api/people/6/",
              "http://swapi.dev/api/people/7/",
              "http://swapi.dev/api/people/8/",
              "http://swapi.dev/api/people/9/",
              "http://swapi.dev/api/people/11/",
              "http://swapi.dev/api/people/43/",
              "http://swapi.dev/api/people/62/"
            ],
            films: [
              "http://swapi.dev/api/films/1/",
              "http://swapi.dev/api/films/3/",
              "http://swapi.dev/api/films/4/",
              "http://swapi.dev/api/films/5/",
              "http://swapi.dev/api/films/6/"
            ],
            created: "2014-12-09T13:50:49.641000Z",
            edited: "2014-12-20T20:58:18.411000Z",
            url: "http://swapi.dev/api/planets/1/"
          },
          {
            name: "Alderaan",
            rotation_period: "24",
            orbital_period: "364",
            diameter: "12500",
            climate: "temperate",
            gravity: "1 standard",
            terrain: "grasslands, mountains",
            surface_water: "40",
            population: "2000000000",
            residents: [
              "http://swapi.dev/api/people/5/",
              "http://swapi.dev/api/people/68/",
              "http://swapi.dev/api/people/81/"
            ],
            films: [
              "http://swapi.dev/api/films/1/",
              "http://swapi.dev/api/films/6/"
            ],
            created: "2014-12-10T11:35:48.479000Z",
            edited: "2014-12-20T20:58:18.420000Z",
            url: "http://swapi.dev/api/planets/2/"
          },
          {
            name: "Yavin IV",
            rotation_period: "24",
            orbital_period: "4818",
            diameter: "10200",
            climate: "temperate, tropical",
            gravity: "1 standard",
            terrain: "jungle, rainforests",
            surface_water: "8",
            population: "1000",
            residents: [],
            films: ["http://swapi.dev/api/films/1/"],
            created: "2014-12-10T11:37:19.144000Z",
            edited: "2014-12-20T20:58:18.421000Z",
            url: "http://swapi.dev/api/planets/3/"
          }
        ]
      })
    );
    await getAllPlanets();
    expect(fetch).toHaveBeenCalledWith(`https://swapi.dev/api/planets`, {
      method: "GET"
    });
  });

  it("Next page is #2", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        count: 3,
        next: "http://swapi.dev/api/planets/?page=2",
        previous: null,
        results: [
          {
            name: "Luis Guillon",
            rotation_period: "23",
            orbital_period: "304",
            diameter: "10465",
            climate: "arid",
            gravity: "1 standard",
            terrain: "desert",
            surface_water: "1",
            population: "200000",
            residents: [
              "http://swapi.dev/api/people/1/",
              "http://swapi.dev/api/people/2/",
              "http://swapi.dev/api/people/4/",
              "http://swapi.dev/api/people/6/",
              "http://swapi.dev/api/people/7/",
              "http://swapi.dev/api/people/8/",
              "http://swapi.dev/api/people/9/",
              "http://swapi.dev/api/people/11/",
              "http://swapi.dev/api/people/43/",
              "http://swapi.dev/api/people/62/"
            ],
            films: [
              "http://swapi.dev/api/films/1/",
              "http://swapi.dev/api/films/3/",
              "http://swapi.dev/api/films/4/",
              "http://swapi.dev/api/films/5/",
              "http://swapi.dev/api/films/6/"
            ],
            created: "2014-12-09T13:50:49.641000Z",
            edited: "2014-12-20T20:58:18.411000Z",
            url: "http://swapi.dev/api/planets/1/"
          },
          {
            name: "Alderaan",
            rotation_period: "24",
            orbital_period: "364",
            diameter: "12500",
            climate: "temperate",
            gravity: "1 standard",
            terrain: "grasslands, mountains",
            surface_water: "40",
            population: "2000000000",
            residents: [
              "http://swapi.dev/api/people/5/",
              "http://swapi.dev/api/people/68/",
              "http://swapi.dev/api/people/81/"
            ],
            films: [
              "http://swapi.dev/api/films/1/",
              "http://swapi.dev/api/films/6/"
            ],
            created: "2014-12-10T11:35:48.479000Z",
            edited: "2014-12-20T20:58:18.420000Z",
            url: "http://swapi.dev/api/planets/2/"
          },
          {
            name: "Yavin IV",
            rotation_period: "24",
            orbital_period: "4818",
            diameter: "10200",
            climate: "temperate, tropical",
            gravity: "1 standard",
            terrain: "jungle, rainforests",
            surface_water: "8",
            population: "1000",
            residents: [],
            films: ["http://swapi.dev/api/films/1/"],
            created: "2014-12-10T11:37:19.144000Z",
            edited: "2014-12-20T20:58:18.421000Z",
            url: "http://swapi.dev/api/planets/3/"
          }
        ]
      })
    );
    const data = await getAllPlanets();
    expect(data.next).toContain("page=2");
  });

  it("Previous page is null", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        count: 3,
        next: "http://swapi.dev/api/planets/?page=2",
        previous: null,
        results: [
          {
            name: "Luis Guillon",
            rotation_period: "23",
            orbital_period: "304",
            diameter: "10465",
            climate: "arid",
            gravity: "1 standard",
            terrain: "desert",
            surface_water: "1",
            population: "200000",
            residents: [
              "http://swapi.dev/api/people/1/",
              "http://swapi.dev/api/people/2/",
              "http://swapi.dev/api/people/4/",
              "http://swapi.dev/api/people/6/",
              "http://swapi.dev/api/people/7/",
              "http://swapi.dev/api/people/8/",
              "http://swapi.dev/api/people/9/",
              "http://swapi.dev/api/people/11/",
              "http://swapi.dev/api/people/43/",
              "http://swapi.dev/api/people/62/"
            ],
            films: [
              "http://swapi.dev/api/films/1/",
              "http://swapi.dev/api/films/3/",
              "http://swapi.dev/api/films/4/",
              "http://swapi.dev/api/films/5/",
              "http://swapi.dev/api/films/6/"
            ],
            created: "2014-12-09T13:50:49.641000Z",
            edited: "2014-12-20T20:58:18.411000Z",
            url: "http://swapi.dev/api/planets/1/"
          },
          {
            name: "Alderaan",
            rotation_period: "24",
            orbital_period: "364",
            diameter: "12500",
            climate: "temperate",
            gravity: "1 standard",
            terrain: "grasslands, mountains",
            surface_water: "40",
            population: "2000000000",
            residents: [
              "http://swapi.dev/api/people/5/",
              "http://swapi.dev/api/people/68/",
              "http://swapi.dev/api/people/81/"
            ],
            films: [
              "http://swapi.dev/api/films/1/",
              "http://swapi.dev/api/films/6/"
            ],
            created: "2014-12-10T11:35:48.479000Z",
            edited: "2014-12-20T20:58:18.420000Z",
            url: "http://swapi.dev/api/planets/2/"
          },
          {
            name: "Yavin IV",
            rotation_period: "24",
            orbital_period: "4818",
            diameter: "10200",
            climate: "temperate, tropical",
            gravity: "1 standard",
            terrain: "jungle, rainforests",
            surface_water: "8",
            population: "1000",
            residents: [],
            films: ["http://swapi.dev/api/films/1/"],
            created: "2014-12-10T11:37:19.144000Z",
            edited: "2014-12-20T20:58:18.421000Z",
            url: "http://swapi.dev/api/planets/3/"
          }
        ]
      })
    );
    const data = await getAllPlanets();
    expect(data.previous).toBeNull();
  });

  it("There are 3 planets per page", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        count: 3,
        next: "http://swapi.dev/api/planets/?page=2",
        previous: null,
        results: [
          {
            name: "Luis Guillon",
            rotation_period: "23",
            orbital_period: "304",
            diameter: "10465",
            climate: "arid",
            gravity: "1 standard",
            terrain: "desert",
            surface_water: "1",
            population: "200000",
            residents: [
              "http://swapi.dev/api/people/1/",
              "http://swapi.dev/api/people/2/",
              "http://swapi.dev/api/people/4/",
              "http://swapi.dev/api/people/6/",
              "http://swapi.dev/api/people/7/",
              "http://swapi.dev/api/people/8/",
              "http://swapi.dev/api/people/9/",
              "http://swapi.dev/api/people/11/",
              "http://swapi.dev/api/people/43/",
              "http://swapi.dev/api/people/62/"
            ],
            films: [
              "http://swapi.dev/api/films/1/",
              "http://swapi.dev/api/films/3/",
              "http://swapi.dev/api/films/4/",
              "http://swapi.dev/api/films/5/",
              "http://swapi.dev/api/films/6/"
            ],
            created: "2014-12-09T13:50:49.641000Z",
            edited: "2014-12-20T20:58:18.411000Z",
            url: "http://swapi.dev/api/planets/1/"
          },
          {
            name: "Alderaan",
            rotation_period: "24",
            orbital_period: "364",
            diameter: "12500",
            climate: "temperate",
            gravity: "1 standard",
            terrain: "grasslands, mountains",
            surface_water: "40",
            population: "2000000000",
            residents: [
              "http://swapi.dev/api/people/5/",
              "http://swapi.dev/api/people/68/",
              "http://swapi.dev/api/people/81/"
            ],
            films: [
              "http://swapi.dev/api/films/1/",
              "http://swapi.dev/api/films/6/"
            ],
            created: "2014-12-10T11:35:48.479000Z",
            edited: "2014-12-20T20:58:18.420000Z",
            url: "http://swapi.dev/api/planets/2/"
          },
          {
            name: "Yavin IV",
            rotation_period: "24",
            orbital_period: "4818",
            diameter: "10200",
            climate: "temperate, tropical",
            gravity: "1 standard",
            terrain: "jungle, rainforests",
            surface_water: "8",
            population: "1000",
            residents: [],
            films: ["http://swapi.dev/api/films/1/"],
            created: "2014-12-10T11:37:19.144000Z",
            edited: "2014-12-20T20:58:18.421000Z",
            url: "http://swapi.dev/api/planets/3/"
          }
        ]
      })
    );
    const data = await getAllPlanets();
    expect(data.results.length).toEqual(3);
  });

  it("Each planet has a valid schema", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        count: 3,
        next: "http://swapi.dev/api/planets/?page=2",
        previous: null,
        results: [
          {
            name: "Luis Guillon",
            rotation_period: "23",
            orbital_period: "304",
            diameter: "10465",
            climate: "arid",
            gravity: "1 standard",
            terrain: "desert",
            surface_water: "1",
            population: "200000",
            residents: [
              "http://swapi.dev/api/people/1/",
              "http://swapi.dev/api/people/2/",
              "http://swapi.dev/api/people/4/",
              "http://swapi.dev/api/people/6/",
              "http://swapi.dev/api/people/7/",
              "http://swapi.dev/api/people/8/",
              "http://swapi.dev/api/people/9/",
              "http://swapi.dev/api/people/11/",
              "http://swapi.dev/api/people/43/",
              "http://swapi.dev/api/people/62/"
            ],
            films: [
              "http://swapi.dev/api/films/1/",
              "http://swapi.dev/api/films/3/",
              "http://swapi.dev/api/films/4/",
              "http://swapi.dev/api/films/5/",
              "http://swapi.dev/api/films/6/"
            ],
            created: "2014-12-09T13:50:49.641000Z",
            edited: "2014-12-20T20:58:18.411000Z",
            url: "http://swapi.dev/api/planets/1/"
          },
          {
            name: "Alderaan",
            rotation_period: "24",
            orbital_period: "364",
            diameter: "12500",
            climate: "temperate",
            gravity: "1 standard",
            terrain: "grasslands, mountains",
            surface_water: "40",
            population: "2000000000",
            residents: [
              "http://swapi.dev/api/people/5/",
              "http://swapi.dev/api/people/68/",
              "http://swapi.dev/api/people/81/"
            ],
            films: [
              "http://swapi.dev/api/films/1/",
              "http://swapi.dev/api/films/6/"
            ],
            created: "2014-12-10T11:35:48.479000Z",
            edited: "2014-12-20T20:58:18.420000Z",
            url: "http://swapi.dev/api/planets/2/"
          },
          {
            name: "Yavin IV",
            rotation_period: "24",
            orbital_period: "4818",
            diameter: "10200",
            climate: "temperate, tropical",
            gravity: "1 standard",
            terrain: "jungle, rainforests",
            surface_water: "8",
            population: "1000",
            residents: [],
            films: ["http://swapi.dev/api/films/1/"],
            created: "2014-12-10T11:37:19.144000Z",
            edited: "2014-12-20T20:58:18.421000Z",
            url: "http://swapi.dev/api/planets/3/"
          }
        ]
      })
    );
    const data = await getAllPlanets();
    data.results.forEach(planet => {
      expect(planet).toMatchSchema(schema);
    });
  });

  it("Catches errors", async () => {
    fetch.mockReject(`Api doesn't want to work`);
    try {
      await getAllPlanets();
    } catch (error) {
      expect(error).toEqual(`Api doesn't want to work`);
    }
  });

  it("Fetch is made once", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        count: 3,
        next: "http://swapi.dev/api/planets/?page=2",
        previous: null,
        results: [
          {
            name: "Luis Guillon",
            rotation_period: "23",
            orbital_period: "304",
            diameter: "10465",
            climate: "arid",
            gravity: "1 standard",
            terrain: "desert",
            surface_water: "1",
            population: "200000",
            residents: [
              "http://swapi.dev/api/people/1/",
              "http://swapi.dev/api/people/2/",
              "http://swapi.dev/api/people/4/",
              "http://swapi.dev/api/people/6/",
              "http://swapi.dev/api/people/7/",
              "http://swapi.dev/api/people/8/",
              "http://swapi.dev/api/people/9/",
              "http://swapi.dev/api/people/11/",
              "http://swapi.dev/api/people/43/",
              "http://swapi.dev/api/people/62/"
            ],
            films: [
              "http://swapi.dev/api/films/1/",
              "http://swapi.dev/api/films/3/",
              "http://swapi.dev/api/films/4/",
              "http://swapi.dev/api/films/5/",
              "http://swapi.dev/api/films/6/"
            ],
            created: "2014-12-09T13:50:49.641000Z",
            edited: "2014-12-20T20:58:18.411000Z",
            url: "http://swapi.dev/api/planets/1/"
          },
          {
            name: "Alderaan",
            rotation_period: "24",
            orbital_period: "364",
            diameter: "12500",
            climate: "temperate",
            gravity: "1 standard",
            terrain: "grasslands, mountains",
            surface_water: "40",
            population: "2000000000",
            residents: [
              "http://swapi.dev/api/people/5/",
              "http://swapi.dev/api/people/68/",
              "http://swapi.dev/api/people/81/"
            ],
            films: [
              "http://swapi.dev/api/films/1/",
              "http://swapi.dev/api/films/6/"
            ],
            created: "2014-12-10T11:35:48.479000Z",
            edited: "2014-12-20T20:58:18.420000Z",
            url: "http://swapi.dev/api/planets/2/"
          },
          {
            name: "Yavin IV",
            rotation_period: "24",
            orbital_period: "4818",
            diameter: "10200",
            climate: "temperate, tropical",
            gravity: "1 standard",
            terrain: "jungle, rainforests",
            surface_water: "8",
            population: "1000",
            residents: [],
            films: ["http://swapi.dev/api/films/1/"],
            created: "2014-12-10T11:37:19.144000Z",
            edited: "2014-12-20T20:58:18.421000Z",
            url: "http://swapi.dev/api/planets/3/"
          }
        ]
      })
    );
    await getAllPlanets();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe("Get planet function", () => {
  beforeEach(() => {
    // fetch.resetMocks();
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

  it("Passing wrong ID number returns Not found message", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        detail: "Not found"
      })
    );
    const data = await getPlanet("test");
    expect(data.detail).toEqual("Not found");
  });

  it("Passing no ID number returns Not found message", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        detail: "Not found"
      })
    );
    const data = await getPlanet();
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
