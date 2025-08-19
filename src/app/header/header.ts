 import { cardItem } from './../card-service';
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CardService } from '../card-service';
import { NgbCollapse } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product-service';



@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, NgbCollapse, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
    isDarkMode = false;

  showCart= false
 isScrolled = false;
 cartItems: cardItem[] = [];
 showLogin=false;
 totalItems = 0;
 searchQuery:any;
 isSearching = false;

 constructor(private cs: CardService , private router: Router, private ps: ProductService) {
   }
  ngOnInit(): void {
       const darkModeStored = localStorage.getItem('darkMode');
    this.isDarkMode = darkModeStored === 'true';
    this.updateBodyClass();

    this.cs.cart$.subscribe(items => {
      this.totalItems = this.cartItems.length
    });
    this.cs.cart$.subscribe(items => {
      this.cartItems = items;
      console.log('Cart items updated:', this.cartItems);
    });
  }
  
 @HostListener('window:scroll', [])
 onWindowScroll() {
   this.isScrolled = window.scrollY > 50;
  }
  userImageUrl: string | null = null;

   setUserImage(url: string) {
     this.userImageUrl = url;
   }

   showLoginFunction(){
    this.showLogin=true;
   }
   toggleCart() {
  this.showCart = !this.showCart;
}




increaseQuantity(item: cardItem) {
  item.quantity++;
  this.cs.updateCart(this.cartItems); 
}

decreaseQuantity(item: cardItem) {
  if (item.quantity > 1) {
    item.quantity--;
    this.cs.updateCart(this.cartItems);
  }
}

removeItem(item: cardItem) {
  this.cartItems = this.cartItems.filter(i => i.id !== item.id);
  this.cs.updateCart(this.cartItems);
}

clearCart() {
  this.cs.clearCart();
  this.showCart = false;
  this.totalItems = 0;
}


updateCart() {
  this.totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);

}

calculateSubtotal() {
  return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

checkout() {
    if (this.cartItems.length > 0) {
      this.router.navigate(['/checkout']);
    }
}

resetScroll() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
}
 onSearchInput() {
  const query = (this.searchQuery || '').trim();
  this.ps.updateSearch(query); 
}

onSearchClick() {
     this.isSearching=!this.isSearching;

   const trimmedQuery = this.searchQuery.trim();
    if (trimmedQuery !== '') {
      this.ps.updateSearch(trimmedQuery);

      
      this.router.navigate(['/products/all']);
    }
}
toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.updateBodyClass();
  }

  updateBodyClass() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

}