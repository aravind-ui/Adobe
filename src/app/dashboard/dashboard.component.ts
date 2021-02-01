import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { Cart } from '../cart/state/cart.model';
import { CartQuery } from '../cart/state/cart.query';
import { CartService } from '../cart/state/cart.service';
import { ApiService } from '../core/services';
import { AlertDialogService } from '../shared/alert-dialog/alert-dialog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  productsList =
    {
      items: [
        {
          name: "Samsung Series 4",
          image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
          price: {
            actual: 13999,
            display: 22500
          },
          discount: 37
        },
        {
          name: "Samsung Super 6",
          image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
          price: {
            actual: 35999,
            display: 66900
          },
          discount: 46
        },
        {
          name: "Samsung The Frame",
          image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
          price: {
            actual: 84999,
            display: 133900
          },
          discount: 36
        },
        {
          name: "Thomson B9 Pro",
          image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
          price: {
            actual: 9999,
            display: 16999
          },
          discount: 41
        },
        {
          name: "LG Ultra HD",
          image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
          price: {
            actual: 39990,
            display: 79990
          },
          discount: 50
        },
        {
          name: "Vu Ready LED TV",
          image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
          price: {
            actual: 7999,
            display: 17e3
          },
          discount: 52
        },
        {
          name: "Koryo Android TV",
          image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
          price: {
            actual: 55999,
            display: 199990
          },
          discount: 71
        },
        {
          name: "Micromax LED Smart",
          image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
          price: {
            actual: 9999,
            display: 27990
          },
          discount: 64
        }
      ]
    }

  constructor(
    private apiService: ApiService,
    private addToCardSerive: CartService,
    private checkInCart: CartQuery,
    private snackbar: MatSnackBar,
    private alert: AlertDialogService
  ) { }

  ngOnInit(): void {

  }


  addToCart(item: any, i:number) {
    // debugger;
    const allData = this.checkInCart.getAll();
    if (allData.length > 0) {
      const checkParticularItem = allData.filter(data => data.id === i);
      console.log('checkParticularItem', checkParticularItem);
      if (checkParticularItem.length > 0) {
        const itemIncrement = checkParticularItem[0].noOfItems + 1;
        this.addToCardSerive.update(item.id, { noOfItems: itemIncrement });
        this.snackbar.open('Item added to cart');
        this.emitValue();
      } else {
        this.addNewItemToCart(item, i);
      }

    } else {
      this.addNewItemToCart(item, i);
    }
  }

  addNewItemToCart(item: any, i:number) {
    const addingItem: Cart = {
      id: i,
      productName: item.name,
      unitPrice: item.price.actual,
      noOfItems: 1
    }
    this.addToCardSerive.add(addingItem);
    this.emitValue();
    this.snackbar.open('Item added to cart.', 'Success', { duration: 200 });
  }

  emitValue() {
    this.apiService.setServiceMessageFn();
  }

}
