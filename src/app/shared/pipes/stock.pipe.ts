import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stock'
})
export class StockPipe implements PipeTransform {

  transform(quantity:number,limit:number): string |null {
    if(quantity>limit){
      return null;

    }else if(quantity==50){
      return `out of stock`
    }
    else{
      return `only ${quantity} left`
    }
  }

}
