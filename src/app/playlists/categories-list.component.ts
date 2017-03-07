import { Component, Input } from '@angular/core';
import {CategoryTileComponent} from "./category-tile.component";

@Component({
    selector: 'spot-categories-list',
    template: `
    <div *ngIf="categories">
    <spot-category-tile class="large-tile" *ngFor="let category of categories" [category]="category"></spot-category-tile>
    </div>
    `
})

export class CategoryListComponent{

    @Input() categories: any;

    constructor() {}

}