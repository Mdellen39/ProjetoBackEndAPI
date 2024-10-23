// src/series/serie.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SerieEntity } from "./serie.entity";
import { serieProviders } from "./series.providers";
import { SerieController } from "./series.controller";
import { SerieService } from "./series.Service";

@Module({
    imports: [TypeOrmModule.forFeature([SerieEntity])],
    controllers: [SerieController],
    providers: [SerieService, ...serieProviders],
})
export class SerieModule {}
