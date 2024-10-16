import { DatabaseModule } from "src/database/database.module";
import { Module } from "@nestjs/common";


@Module(
    {
        imports: [DatabaseModule],
        controllers: [FilmeController],
        providers: [...filesProviders,
            FilesService,]
        
    })

    export class FilesModule{ 

    }