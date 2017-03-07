import {Component, OnInit, Input, Output, EventEmitter, OnChanges,ViewChild } from '@angular/core';
import {SearchService} from './services/search.service';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'spot-search-field',
    template: `
    <input #search autocomplete="nope" autocorrect="off" value="{{searchString}}" placeholder="Search" type="text" size="{{inputSize}}" [formControl]="searchTextControl">
    `,
    providers: [SearchService, FormsModule]
})
export class SearchComponent implements OnChanges {

    searchTextControl = new FormControl();
    @Output() resultEvent = new EventEmitter();
    @Input() searchString;
    @Input() isNavBar: boolean = false;
    inputSize : number;

    @ViewChild('search') vChild;

    constructor( private _searchService: SearchService){

       this.searchTextControl.valueChanges.debounceTime(1000).distinctUntilChanged()//this.searchTextControl.valueChanges
            .subscribe((st: string) => {
                this.resultEvent.emit({ s : st });
                if(this.isNavBar){
                    this.searchTextControl.reset();
                }
            });

    }

    ngOnChanges(){
        this.inputSize = this.isNavBar == true ? 30 : 60;
    }
    ngAfterViewInit(){
        if(!this.isNavBar){
            this.vChild.nativeElement.focus();

        }
    }
}