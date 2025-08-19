import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface cardItem{
  id:number,
  name:string,
  price:number;
  quantity: number;
  imageUrl:string;

}

@Injectable({
  providedIn: 'root'
})

export class CardService {
private cartItems: cardItem[] = [];
private cartSubject = new BehaviorSubject<cardItem[]>([]);
cart$ = this.cartSubject.asObservable();

addToCard(item: cardItem) {
  const existing =this.cartItems.find(i => i.id === item.id);
  if (existing) {
    existing.quantity += item.quantity;
  }
  else{
    this.cartItems.push({...item});
  }
this.cartSubject.next(this.cartItems);
}  
removeFromCart(id: number){
  this.cartItems =this.cartItems.filter(i => i.id !==id);
  this.cartSubject.next(this.cartItems);
}
updateQuantity(id: number ,quantity: number){
  const item = this.cartItems.find(i => i.id === id);
  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) this.removeFromCart(id);
    else this.cartSubject.next(this.cartItems);
  }
}

  updateCart(cart: cardItem[]) {
    this.cartItems = [...cart];
    this.cartSubject.next(this.cartItems);
  }
clearCart(){
  this.cartItems = [];
  this.cartSubject.next(this.cartItems);
}
getTotal(){
  return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

}
