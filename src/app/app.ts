import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Home } from './main/home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet ,CommonModule,Header,Footer,Home],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('e-commerce');
 
}
