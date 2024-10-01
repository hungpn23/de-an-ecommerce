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
import { storageConfig } from 'src/helpers/config';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    return await this.productService.findAllProducts();
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(
    FilesInterceptor('images', 10, { storage: storageConfig('products') }),
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
  ) {
    return await this.productService.createProduct(body.data, images);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, { storage: storageConfig('products') }),
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
      }),
    )
    images?: Express.Multer.File[],
  ) {
    return await this.productService.updateProduct(id, body.data, images || []);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    const product = await this.productService.deleteProduct(id);
    return {
      message: 'success',
      product,
    };
  }
}
