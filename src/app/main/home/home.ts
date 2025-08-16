import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterModule],
  templateUrl: './home.html',
  standalone:true,
  styleUrl: './home.css',
})

export class Home {
 
constructor(private route :Router){

}
  goToProducts() {
    this.route.navigate(['/products/all']);
  }
}
