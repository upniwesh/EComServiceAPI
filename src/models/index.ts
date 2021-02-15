import {Model, Table, Column, ForeignKey, BelongsTo} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column  name: string;  
  @Column  email: string;
  @Column  phoneNo: string;
  @Column  address : string;  
  @Column password : string;
}

@Table
export class Product extends Model<Product> {
    @Column productName: string;        
    @Column productDescription?: string;        
    @Column productPrice: string;    
    @Column productLaunchedYear: number; 
}

@Table
export class Order extends Model<Order> {    
    @ForeignKey(()=> User)
    @Column  userId : number;
    @BelongsTo(() => User) user : User;
    @ForeignKey(()=> Product)
    @Column  productId : number;
    @BelongsTo(() => Product) product : Product;   
    @Column productQuantity: number;        
    @Column orderDate : Date
}
