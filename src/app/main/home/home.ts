import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../product-service';


@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterModule],
  templateUrl: './home.html',
  standalone:true,
  styleUrl: './home.css',
})

export class Home  {
 latestProducts: any[] = [];

constructor(private route :Router, private productService:ProductService){

}


  goToProducts() {
    this.route.navigate(['/products/all']);
  }

}
