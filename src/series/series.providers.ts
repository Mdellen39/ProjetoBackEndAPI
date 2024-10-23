// src/series/serie.providers.ts
import { SerieEntity } from "./serie.entity";
import { DataSource } from "typeorm";

export const serieProviders = [
    {
        provide: 'SERIE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(SerieEntity),
        inject: ['DATA_SOURCE'],
    },
];

