import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { NotificationService } from 'src/notification/notification.service';
import { topicNotificationInterface } from 'src/notification/interfaces/topic-notification.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private readonly notificationService:NotificationService
) { }
  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Check if a product with the same name already exists
    const {name} = createProductDto
    const existingProduct = await this.productRepository.findOne({
      where: { name },
    });

    if (existingProduct) {
      throw new BadRequestException('A product with this name already exists');
    }

    // Create a new product
    let product = new Product()
    Object.assign(product,createProductDto)
    let newProduct = this.productRepository.create(product);
    newProduct = await this.productRepository.save(newProduct);
    let notificationData:topicNotificationInterface = {body:"New Product Added",title:`${newProduct.name}`}

    await this.notificationService.sendPushToTopic(notificationData,'all-users')
    if(newProduct)
    return newProduct
  }

  async findAll():Promise<Product[]> {
    return this.productRepository.find()
  }

async findOne(id: number):Promise<Product> {
  let exsitingProduct = await this.productRepository.findOneBy({id})
  if(!exsitingProduct) throw new NotFoundException(`There  is no product with this  ${id}`)
    return exsitingProduct
}

async update(id: number, updateProductDto: UpdateProductDto):Promise<Product>  {
  let exsitingProduct = await this.productRepository.findOneBy({id})
  if(!exsitingProduct) throw new NotFoundException(`There is no product with this ${id}`)

Object.assign(exsitingProduct,updateProductDto)
  return  this.productRepository.save(exsitingProduct)
}

async remove(id: number) {
  let exsitingProduct = await this.productRepository.findOneBy({id})
  if(!exsitingProduct) throw new NotFoundException(`There is no product with this ${id}`)
  await this.productRepository.delete({id})

}
}
