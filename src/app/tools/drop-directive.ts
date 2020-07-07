import { Directive, ElementRef, Output, EventEmitter, Renderer2 } from '@angular/core';

@Directive({
    selector: '[myDroppable]',
    host: {
        '(dragleave)': 'onDragLeave($event)',
        '(dragenter)' : 'onDragEnter($event)',
        '(dragover)': 'onDragOver($event)',
        '(drop)': 'handleDrop($event)'
    }
})
export class DropDirective {
    
    @Output() dropped: EventEmitter<any> = new EventEmitter();

    constructor(private renderer: Renderer2, private _elemenetRef: ElementRef) {}

    onDragOver(ev){

        this._elemenetRef.nativeElement.classList.add('drag-over');
        ev.dataTransfer.dropEffect = "copy";
        ev.preventDefault();
    }

    onDragEnter(ev){
        ev.dataTransfer.dropEffect = 'copy';
    }

    onDragLeave(ev){
        this.clearDropHint();
    }

    handleDrop(event){

        this.clearDropHint();
        let data = event.dataTransfer.getData('Text');
        this.dropped.emit(JSON.parse(data));

    }

    clearDropHint(){
        this._elemenetRef.nativeElement.classList.remove('drag-over');
    }
}