import { Controller, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesService } from "./files.service";


@Controller('/files')
export class FilesController {
    constructor (private readonly fileService: FilesService){}

    @Post ()
    @UseInterceptors (FileInterceptor('arquivo', multerconfig))
    async uploadArquivo(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
        return this.fileService.salvarDados (file,req);
    }

    @Get(':imgid')
    async retornaArquivo(@Param('imgid') Image, @Res() res){
        let img = await this.fileService.localizar(image);
        return res.sendFile(img.URL,{root: './upload'})
    }

}