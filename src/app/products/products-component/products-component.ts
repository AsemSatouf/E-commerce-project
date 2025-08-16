import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../product-service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CardService } from '../../card-service';

@Component({
  selector: 'app-products-component',
  imports: [CommonModule],
  templateUrl: './products-component.html',
  styleUrls: ['./products-component.css'],
  // changeDetection: ChangeDetectionStrategy.Default // or omit it since default is Default
})
export class ProductsComponentm implements OnInit {
  Products: any = [];
  catgeory: string = '';
  welcomeMessage = '';


  sectionNameMap= new Map([
   ['men', 'Men’s Section 👔✨'],
    ['women', 'Women’s Collection 👗💖'],
    ['kids', 'Kids’ World 🧒🎈'],
    ['all','Our Store 🛍️✨']
  ]);

  categoryMap: { [key: string]: number } = {
    men: 6,
    women: 7,
    kids: 8,
  };

  constructor(private ps: ProductService, private route: ActivatedRoute , private cs: CardService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.catgeory = params.get('category') || '';
      const categoryId = this.categoryMap[this.catgeory.toLowerCase()] || 0;

      this.ps.getItem(categoryId).subscribe((res) => {
        this.Products = res.items;
      });
      this.welcomeMessage = `Welcome to the ${
        this.sectionNameMap.get(this.catgeory)
      } – Where style meets confidence 😎`;
    });
  
  }
  addToCart(product: any) {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl
    };
    this.cs.addToCard(item);
    console.log('Added to cart:', item);
   
  }

  quickView(product: any) {
    console.log('Quick view', product);
    // هنا تفتح مودال أو صفحة عرض سريع للمنتج
  }
}
