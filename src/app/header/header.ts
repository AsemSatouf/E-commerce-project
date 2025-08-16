import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardService } from '../card-service';



@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
 isScrolled = false;
 showLogin=false;
 totalItems = 0;

 constructor(private cs: CardService) {
   }
  ngOnInit(): void {
    this.cs.cart$.subscribe(items => {
      this.totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
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
}
