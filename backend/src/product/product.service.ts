import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { ProductImage } from './entities/product-image.entity';
import { Size } from './entities/size.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { IVerifiedRequest } from 'src/interfaces';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Size) private sizeRepo: Repository<Size>,
    @InjectRepository(ProductImage)
    private productImageRepo: Repository<ProductImage>,
  ) {}

  @UseGuards(AuthGuard)
  async findAll() {
    return this.productRepo.find({
      relations: { categories: true, sizes: true, images: true },
    });
  }

  async createProduct(
    createProductDto: CreateProductDto,
    images: Express.Multer.File[],
  ) {
    console.log(`🚀 ~ ProductService ~ images:`, images);

    const product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.price = createProductDto.price;
    product.is_best_seller = createProductDto.is_best_seller;
    product.quantity = createProductDto.quantity;

    const categories: Category[] = [];
    for (const categoryName of createProductDto.categories) {
      let category = await this.categoryRepo.findOne({
        where: { name: categoryName },
      });
      if (!category)
        throw new BadRequestException(`Invalid category: ${categoryName}`);

      categories.push(category);
    }
    product.categories = categories;

    const sizes: Size[] = [];
    for (const sizeName of createProductDto.sizes) {
      let size = await this.sizeRepo.findOne({ where: { name: sizeName } });
      if (!size) throw new BadRequestException(`Invalid size: ${sizeName}`);

      sizes.push(size);
    }
    product.sizes = sizes;

    product.images = images.map((image) => {
      const productImage = new ProductImage();
      productImage.path = image.path;
      return productImage;
    });

    return await this.productRepo.save(product);
  }

  async updateProduct(
    id: number,
    updateProductDto: CreateProductDto,
    images: Express.Multer.File[],
  ): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: { categories: true, sizes: true, images: true },
    });

    if (!product) throw new BadRequestException(`Product id ${id} not found`);

    product.name = updateProductDto.name;
    product.description = updateProductDto.description;
    product.price = updateProductDto.price;
    product.is_best_seller = updateProductDto.is_best_seller;
    product.quantity = updateProductDto.quantity;

    const categories: Category[] = [];
    for (const categoryName of updateProductDto.categories) {
      let category = await this.categoryRepo.findOne({
        where: { name: categoryName },
      });
      if (!category)
        throw new BadRequestException(`Invalid category: ${categoryName}`);

      categories.push(category);
    }
    product.categories = categories;

    const sizes: Size[] = [];
    for (const sizeName of updateProductDto.sizes) {
      let size = await this.sizeRepo.findOne({ where: { name: sizeName } });
      if (!size) throw new BadRequestException(`Invalid size: ${sizeName}`);

      sizes.push(size);
    }
    product.sizes = sizes;

    await this.productImageRepo.remove(product.images);
    product.images = images.map((image) => {
      const productImage = new ProductImage();
      productImage.path = image.path;
      return productImage;
    });

    return await this.productRepo.save(product);
  }

  async deleteProduct(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: { images: true },
    });
    if (!product) throw new BadRequestException(`Product id ${id} not found`);

    console.log(product.images);
    await this.productImageRepo.remove(product.images);

    return await this.productRepo.remove(product);
  }
}
