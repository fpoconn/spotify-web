import {EventEmitter} from '@angular/core';
/**
 * Not currently used by dialog.  CLI compile issues where
 * compile fails unless this file is the last one changed.
 */
export interface DialogAction {
    id: string;
    text: string;
    disabled: boolean;
    action(): void ;

}