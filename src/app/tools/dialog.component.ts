import { Component, EventEmitter, Input } from '@angular/core';
import {DialogAction} from './dialog.action';

@Component({
    selector: 'spot-dialog',
    template: `
    <div class="dialog">
        <div class="dialog-content">
            <div class="dialog-header">
                <h4>{{title}}</h4>
            </div>
            <div class="dialog-body">{{message}}</div>
            <div class="dialog-footer">
                <button *ngFor="let action of actions" [disabled]="action.disabled" (click)="submitClicked(action)">{{action.text}}</button>
            </div>
        <div>
    </div>
    `
})
export class DialogComponent {

    @Input() title: string = "Dialog Title";
    @Input() message: string = "Message here!";
    close = new EventEmitter();
    actions: any [];

    submitClicked(action){
        action.action();
    }
}