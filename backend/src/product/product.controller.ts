import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { ParseJsonBodyInterceptor } from 'src/helpers/interceptors';
import { UpdateProductDto } from './dto/update-product.dto';
import { memoryStorage } from 'multer';
import { IVerifiedRequest } from 'src/interfaces';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: IVerifiedRequest) {
    return await this.productService.findAllProducts(req);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(
    FilesInterceptor('images', 10, { storage: memoryStorage() }),
    ParseJsonBodyInterceptor,
  )
  async createProduct(
    @Body() body: { data: CreateProductDto },
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: /image\/(jpeg|jpg|png)/ }),
        ],
      }),
    )
    images: Express.Multer.File[],
    @Request() req: IVerifiedRequest,
  ) {
    return await this.productService.createProduct(body.data, images, req);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, { storage: memoryStorage() }),
    ParseJsonBodyInterceptor,
  )
  async updateProduct(
    @Param('id') id: number,
    @Body() body: { data: UpdateProductDto },
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: /image\/(jpeg|jpg|png)/ }),
        ],
        fileIsRequired: false,
      }),
    )
    images: Express.Multer.File[],
    @Request() req: IVerifiedRequest,
  ) {
    return await this.productService.updateProduct(id, body.data, images, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProduct(
    @Param('id') id: number,
    @Request() req: IVerifiedRequest,
  ) {
    const product = await this.productService.deleteProduct(id, req);
    return {
      message: 'success',
      product,
    };
  }
}
