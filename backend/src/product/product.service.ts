import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { ProductImage } from './entities/product-image.entity';
import { Size } from './entities/size.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateProductDto } from './dto/update-product.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { IVerifiedRequest } from 'src/interfaces';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Size) private sizeRepo: Repository<Size>,
    @InjectRepository(ProductImage)
    private productImageRepo: Repository<ProductImage>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findAllProducts(req: IVerifiedRequest) {
    const isAdmin = await this.isAdmin(req.user.id);
    if (!isAdmin) throw new UnauthorizedException('You are not allowed');

    return this.productRepo.find({
      relations: { categories: true, sizes: true, images: true },
    });
  }

  async createProduct(
    createProductDto: CreateProductDto,
    images: Express.Multer.File[],
    req: IVerifiedRequest,
  ) {
    const isAdmin = await this.isAdmin(req.user.id);
    if (!isAdmin) throw new UnauthorizedException('You are not allowed');

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

    const cloudImages = await Promise.all(
      images.map(async (image) => {
        return await this.cloudinaryService.uploadFile(image);
      }),
    );

    product.images = cloudImages.map((cloudImage) => {
      const productImage = new ProductImage();
      productImage.path = cloudImage.secure_url;
      return productImage;
    });

    product.user = await this.userRepo.findOne({ where: { id: req.user.id } });

    return await this.productRepo.save(product);
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
    images: Express.Multer.File[],
    req: IVerifiedRequest,
  ): Promise<Product> {
    const isAdmin = await this.isAdmin(req.user.id);
    if (!isAdmin) throw new UnauthorizedException('You are not allowed');

    const product = await this.productRepo.findOne({
      where: { id },
      relations: { categories: true, sizes: true, images: true },
    });

    if (!product) throw new BadRequestException(`Product id ${id} not found`);

    if (updateProductDto.name !== undefined)
      product.name = updateProductDto.name;
    if (updateProductDto.description !== undefined)
      product.description = updateProductDto.description;
    if (updateProductDto.price !== undefined)
      product.price = updateProductDto.price;
    if (updateProductDto.is_best_seller !== undefined)
      product.is_best_seller = updateProductDto.is_best_seller;
    if (updateProductDto.quantity !== undefined)
      product.quantity = updateProductDto.quantity;

    if (updateProductDto.categories) {
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
    }

    if (updateProductDto.sizes) {
      const sizes: Size[] = [];
      for (const sizeName of updateProductDto.sizes) {
        let size = await this.sizeRepo.findOne({ where: { name: sizeName } });
        if (!size) throw new BadRequestException(`Invalid size: ${sizeName}`);

        sizes.push(size);
      }
      product.sizes = sizes;
    }

    if (images && images.length > 0) {
      await this.productImageRepo.remove(product.images);

      const cloudImages = await Promise.all(
        images.map(async (image) => {
          return await this.cloudinaryService.uploadFile(image);
        }),
      );

      product.images = cloudImages.map((cloudImage) => {
        const productImage = new ProductImage();
        productImage.path = cloudImage.secure_url;
        return productImage;
      });
    }

    return await this.productRepo.save(product);
  }

  async deleteProduct(id: number, req: IVerifiedRequest): Promise<Product> {
    const isAdmin = await this.isAdmin(req.user.id);
    if (!isAdmin) throw new UnauthorizedException('You are not allowed');

    const product = await this.productRepo.findOne({
      where: { id },
      relations: { images: true },
    });
    if (!product) throw new BadRequestException(`Product id ${id} not found`);

    await this.productImageRepo.remove(product.images);
    return await this.productRepo.remove(product);
  }

  async isAdmin(userId: number): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    return user.role === 'admin';
  }
}
