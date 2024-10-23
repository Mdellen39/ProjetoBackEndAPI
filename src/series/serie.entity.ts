// src/series/serie.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('series')
export class SerieEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nomeSerie: string;

    @Column()
    temporada: number;

    @Column()
    episodio: number;

    @Column()
    IDfilme: number; // Assuming IDfilme is an integer
}
