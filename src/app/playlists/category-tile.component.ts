import { Component, Input } from '@angular/core';

@Component({
    selector: 'spot-category-tile',
    template: `
    <div *ngIf="category" class="large-tile">
    
          <div *ngIf="category.icons[0]">
            <img *ngIf="category.icons[0].url" src="{{category.icons[0].url}}"/>
          </div>  
        
        <h5 class="white-overlay">{{category.name}}</h5>
  </div>

`
})

export class CategoryTileComponent{

    @Input() category: any;

    constructor() {}

}