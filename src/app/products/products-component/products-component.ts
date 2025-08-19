import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  viewChild,
} from '@angular/core';
import { ProductService } from '../../product-service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CardService } from '../../card-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-component',
  imports: [CommonModule, NgxSliderModule, FormsModule],
  templateUrl: './products-component.html',
  styleUrls: ['./products-component.css'],
})
export class ProductsComponentm implements OnInit {
  Products: any = [];
  quantity: number = 1;
  catgeory: string = '';
  welcomeMessage = '';
  selectedProduct: any;
  isAll: boolean = false;
  searchQuery: string = '';
  sliderOpen = false;
  
  defaultMin: number = 100;
  defaultMax: number = 800;

  // القيم الابتدائية
  minPrice: number = 100;
  maxPrice: number = 800;

  sectionNameMap = new Map([
    ['men', 'Men’s Section 👔✨'],
    ['women', 'Women’s Collection 👗💖'],
    ['kids', 'Kids’ World 🧒🎈'],
    ['all', 'Our Store 🛍️✨'],
  ]);

  categoryMap: { [key: string]: number } = {
    men: 6,
    women: 7,
    kids: 8,
  };
  @ViewChild('quickView') quickViewTemplate!: TemplateRef<any>;

  constructor(
    private ps: ProductService,
    private route: ActivatedRoute,
    private cs: CardService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.ps.currentSearch.subscribe((query) => {
      this.searchQuery = query.trim();
      this.loadProducts();
    });

    // change on path(category)
    this.route.paramMap.subscribe((params) => {
      this.catgeory = params.get('category') || '';
      this.loadProducts();
    });
  }

  // load data according to search or category
  loadProducts() {
    const categoryId = this.categoryMap[this.catgeory?.toLowerCase()] || 0;

    if (this.searchQuery !== '') {
  this.ps.getItemsBySearchQuery(this.searchQuery).subscribe({
    next: (res) => {
      this.Products = Array.isArray(res) ? res : (res?.items || []);
    },
    error: (err) => {
      this.Products = [];
    }
  });


    } else {
      if (this.catgeory === 'all') {
        this.ps.getAllItems().subscribe((res) => {
          this.Products = Array.isArray(res) ? res : res.items || [];
          this.isAll = true;
        });
      } else {
        this.ps.getItem(categoryId).subscribe((res) => {
          this.Products = Array.isArray(res) ? res : res.items || [];

        });
      }
    }

    // Welcome message
    this.welcomeMessage = `Welcome to the ${this.sectionNameMap.get(
      this.catgeory
    )} – Where style meets confidence 😎`;
  }
  addToCart(product: any) {
    const item = {
      id: product.ItemID,
      name: product.ItemArName,
      price: product.PriceLevel_Price,
      quantity: this.quantity,
      imageUrl: product.ImagePath,
    };

    this.cs.addToCard(item);
    this.quantity = 1; // Reset quantity after adding to cart
  }

  openQuickView(product: any) {
    this.selectedProduct = product;
    this.modalService.open(this.quickViewTemplate, {
      centered: true,
      size: 'lg',
    });
  }

  addToCartFromQuickView(product: any) {
    this.addToCart(product);
  }
  decreaseQuantity() {
    if (this.selectedProduct.quantity > 1) {
      this.quantity--;
    }
  }
  increaseQuantity() {
    this.quantity++;
  }
  options: Options = {
    floor: 0, // أقل قيمة
    ceil: 7000, // أعلى قيمة
    step: 50, // الخطوة
    translate: (value: number): string => {
      return '$' + value;
    },
  };
  

  openSlider() {
    this.sliderOpen = true;
  }
  closeSlider() {
    this.sliderOpen = false;
  }
  applyFilter() {
    this.Products = this.Products.filter((product: any) => {
      const price = product.PriceLevel_Price || 0;
      return price >= this.minPrice && price <= this.maxPrice;
    });
    this.closeSlider();
  }

  resetFilter() {
    this.minPrice = this.defaultMin;
    this.maxPrice = this.defaultMax;
  }
  
}
