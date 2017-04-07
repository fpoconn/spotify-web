import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CategoryTileComponent} from "./category-tile.component";

@Component({
    selector: 'spot-categories-list',
    template: `
    <div *ngIf="categories">
    <spot-category-tile class="large-tile" *ngFor="let category of categories" [category]="category" (click)="selectCategory(category)"></spot-category-tile>
    </div>
    `
})

export class CategoryListComponent{

    @Input() categories: any;
    @Output() selectEvent = new EventEmitter();


    constructor() {}

    selectCategory(category){

        this.selectEvent.emit(category);

    }

}