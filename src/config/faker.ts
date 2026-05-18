import { faker } from "@faker-js/faker";


export type ApiTile = {
  id: number;
  baseUrl: string;
  tile: string;
  description: string;
  applicationId: number ;
  applicationName: string ;
  environmentId: number ;
  environmentName: string ;
  sectionId: number ;
  sectionName: string ;
};

export const getApiTiles = (count = 20) => {
  return Array.from({ length: count }).map((_, index) => {
    const hasAppContext = faker.number.int({ min: 1, max: 100 }) <= 70;

    return {
      id: index + 1,
      baseUrl: faker.internet.url(),
      tile: faker.helpers.slugify(faker.word.words(2)),
      description: faker.lorem.sentence(),

      applicationId: hasAppContext ? faker.number.int({ min: 1, max: 10 }) : null,
      applicationName: hasAppContext
        ? faker.helpers.arrayElement(["App1", "App2", "App3", "App4", "App5", "App6", "App7", "App8", "App9", "App10"])
        : null,

      environmentId: hasAppContext ? faker.number.int({ min: 1, max: 3 }) : null,
      environmentName: hasAppContext
        ? faker.helpers.arrayElement(["DEV", "QA", "PROD"])
        : null,

      sectionId: hasAppContext ? 1 : null,
      sectionName: hasAppContext ? "Dashboard" : null,
    };
  });
};