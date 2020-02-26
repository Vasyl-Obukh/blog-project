import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArticlesService } from './articles.service';
import { CloudService } from '../cloud/cloud.service';
import { JsonParsePipe } from '../jsonParse.pipe';
import { mapData } from '../cloud/imageUrl';
import { CreateArticleDto } from './dto/create-article.dto';
import { Image } from '../cloud/interfaces/image.interface';

@Controller('articles')
export class ArticlesController {
    constructor(
        private readonly articlesService: ArticlesService,
        private readonly cloudService: CloudService,
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('thumbnailUrl'))
    async addArticle(
        @Body(new JsonParsePipe('categoriesId')) createArticleDto: CreateArticleDto,
        @UploadedFile() thumbnail,
    ) {
        const response: Readonly<Image> = await this.cloudService.uploadImage(thumbnail);
        return this.articlesService.add({ ...createArticleDto, thumbnailUrl: mapData(response) });
    }
}
