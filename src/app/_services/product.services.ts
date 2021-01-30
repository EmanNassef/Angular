import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../_model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ProductService {
    private products: Product []; //= [
    //         {
    //           id:1,
    //           data: [{name: 'photo camera', description:'cameraaaaa'}], 
    //           price: 4000 , 
    //           discount: 500 , 
    //           category: {id:1, name:'Arts & Crafts'},
    //           imagesUrls: ['../../../../assets/img/desktop-device-1.png'],
    //         },
    //         {
    //           id:2,
    //           data: [{name: 'lap-top', description:'lappppppp-top'}], 
    //           price: 14000 , 
    //           discount: 1000 ,
    //           category: {id:2, name:'Automotive'},
    //           imagesUrls: ['../../../../assets/img/desktop-device-1.png'],
    //         },
    //         {
    //           id:3,
    //           data: [{name: 'mobile', description:'mobileeeeeeeee'}],  
    //           price: 7000 , 
    //           //discount: 500 , 
    //           category: {id:4, name:'Books'},
    //           imagesUrls: ['../../../../assets/img/desktop-device-1.png'],
    //         },
    //         {
    //           id:4,
    //           data: [{name: 'LCD TV', description:'LCcccccD TV'}], 
    //           price: 10000 , 
    //           discount: 1000 , 
    //           category: {id:5, name:'Eletronics'},
    //           imagesUrls: ['../../../../assets/img/desktop-device-1.png'],
    //         },
    //         {
    //           id:5,
    //           data: [{name: 'camera', description:'cameraaaaaaaaa'}],  
    //           price: 8000 , 
    //           discount: 700 ,
    //           category: {id:5, name:'Eletronics'}, 
    //           imagesUrls: ['../../../../assets/img/desktop-device-1.png'],
    //         },
    //         {
    //           id:6,
    //           data: [{name: 'TV', description:'TV jj'}], 
    //           price: 6000 , 
    //           // discount: 500 ,
    //           category: {id:8, name:'Health & Household'}, 
    //           imagesUrls: ['../../../../assets/img/desktop-device-1.png'],
    //         },
    //         {
    //           id:7,
    //           data: [{name: 'ipad', description:'ipaaaaaaad'}], 
    //           price: 15000 , 
    //           discount: 1000 , 
    //           category: {id:10, name:'Military Accessories'},
    //           imagesUrls: ['../../../../assets/img/desktop-device-1.png'],
    //         },
    //         {
    //           id:8,
    //           data: [{name: 'tablet', description:'tableeeeeeeeet'}], 
    //           price: 4000 , 
    //           discount: 500 , 
    //           category: {id:7, name:"Men's Fashion"},
    //           imagesUrls: ['../../../../assets/img/desktop-device-1.png'],
    //         },
    //         {
    //           id:9,
    //           data: [{name: 'LED TV', description:'LEeeeD TV'}], 
    //           price: 12000 , 
    //           // discount: 500 ,
    //           category: {id:9, name:'Home & Kitchen'}, 
    //           imagesUrls: ['../../../../assets/img/desktop-device-1.png'],
    //         },
    //         {
    //           id:10,
    //           data: [{name: 'lap-top new', description:'lap-top neeeeeew'}], 
    //           price: 14000 , 
    //           discount: 1000 , 
    //           category: {id:12, name:'Sports & Outdoors'},
    //           imagesUrls: ['../../../../assets/img/desktop-device-1.png'],
    //         },
    //         {
    //           id:11,
    //           data: [{name: 'mobile', description:'mobileeeeeeeeee'}], 
    //           price: 7000 , 
    //           //discount: 500 , 
    //           category: {id:5, name:'Eletronics'},
    //           imagesUrls: ['../../../../assets/img/desktop-device-1.png'],
    //         },
    //         {
    //           id:12,
    //           data: [{name: 'New LCD TV', description:'Neeeeew LCD TV'}], 
    //           price: 9000 , 
    //           // discount: 1000 ,
    //           category: {id:2, name:'Automotive'}, 
    //           imagesUrls: ['../../../../assets/img/desktop-device-1.png'],
    //         },
    //         {
    //           id:13,
    //           data: [{name: 'camera canon', description:'cameraaaaa canon'}], 
    //           price: 20000 , 
    //           discount: 1000 , 
    //           category: {id:11, name:'Movies & Television'},
    //           imagesUrls: ['../../../../assets/img/desktop-device-1.png'],
    //         },
    //         {
    //           id:14,
    //           data: [{name: 'New TV', description:'Neeeeeeeeew TV'}],  
    //           price: 7000 , 
    //           // discount: 500 ,
    //           category: {id:5, name:'Eletronics'}, 
    //           imagesUrls: ['../../../../assets/img/desktop-device-1.png'],
    //         },
    //         {
    //           id:15,
    //           data: [{name: 'New ipad', description:'Neeeeeeeeew ipad'}], 
    //           price: 12000 , 
    //           discount: 1000 , 
    //           category: {id:5, name:'Eletronics'},
    //           imagesUrls: ['../../../../assets/img/desktop-device-1.png'],
    //         },
    //         {
    //           id:16,
    //           data: [{name: 'New tablet', description:'Neeeeeew tablet'}], 
    //           price: 8000 , 
    //           // discount: 500 , 
    //           category: {id:4, name:'Books'},
    //           imagesUrls: ['../../../../assets/img/desktop-device-1.png'],
    //         },
    //         {
    //           id:17,
    //           data: [{name: 'phone', description:'phoneeeeee'}],
    //           price: 3000 , 
    //           discount: 500 , 
    //           category: {id:8, name:'Health & Household'},
    //           imagesUrls: ['../../../../assets/img/desktop-device-1.png'],
    //         },
          
    // ];
    productAdded = new EventEmitter<Product>();

    currentPage = 'listing';
    baseUrl = "https://mearn-stack-backend-test.herokuapp.com/";
    
    constructor(private httpClient: HttpClient){}


    getAllProducts(){
      return this.httpClient.get(`${this.baseUrl}product`);
  }
    // getAllProducts(): Product[]{
    //     return this.products.slice();
    // }

    getProductById(id: number):Product{
        return this.products.find(p => p.id === id);
    }

    addProduct(product: Product){
      let body = {
        discount : product.discount,
        price: product.price,
        imagesUrlss: product.imagesUrls,
        data: product.data,
        categoryId: product.category.id
      };
      const token = localStorage.getItem('token')
      const headers = new HttpHeaders({
        authorization: token
      })
      return this.httpClient.post(`${this.baseUrl}product/add`,body,{headers})
    //     const id = this.products.length;
    //     const newProduct: Product = {
    //        id,
    //        data: product.data, 
    //        price:product.price, 
    //        discount:product.discount, 
    //        imagesUrlss:product.imagesUrlss, 
    //        category: product.category, 
    //        paymentTypes: product.paymentTypes, 
    //        tags: product.tags
    //       };
    //     this.products.push(newProduct);
    //     console.log(this.products);
     }

    updateProduct(product: Product){
        const index = this.products.findIndex(p => p.id === product.id);

        this.products[index] = {
          id: product.id,
          data: product.data, 
          price:product.price, 
          discount:product.discount, 
          imagesUrls:product.imagesUrls, 
          category: product.category, 
          paymentTypes: product.paymentTypes, 
          tags: product.tags
         };
    }

    deleteProduct(id: number){
        const index = this.products.findIndex((p) => p.id === id);
        this.products.splice(index,1)
    }

    searchByName(productName:string){
      const prodName = productName.toLowerCase();
      return this.products.filter(p => p.data[0].name.toLowerCase().includes(prodName));
    }
}