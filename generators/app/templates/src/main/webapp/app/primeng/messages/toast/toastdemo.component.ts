import { Component, OnInit } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import {MenuItem, Message} from 'primeng/components/common/api';

@Component({
    selector: 'jhi-toast',
    templateUrl: './toastdemo.component.html',
    styles: []
})
export class ToastDemoComponent implements OnInit {
    messages: Message[] = [];
    msgs: Message[] = [];
    activeIndex = 0;

    constructor(private messageService: MessageService) {}

    showSuccess() {
        this.messageService.add({severity:'success', summary: 'Success Message', detail:'Order submitted'});
    }

    showInfo() {
        this.messageService.add({severity:'info', summary: 'Info Message', detail:'PrimeNG rocks'});
    }

    showWarn() {
        this.messageService.add({severity:'warn', summary: 'Warn Message', detail:'There are unsaved changes'});
    }

    showError() {
        this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
    }

    showCustom() {
        this.messageService.add({key: 'custom', severity:'info', summary: 'Custom Toast', detail:'With a Gradient'});
    }

    showTopLeft() {
        this.messageService.add({key: 'tl', severity:'info', summary: 'Success Message', detail:'Order submitted'});
    }

    showTopCenter() {
        this.messageService.add({key: 'tc', severity:'warn', summary: 'Info Message', detail:'PrimeNG rocks'});
    }

    showConfirm() {
        this.messageService.clear();
        this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
    }

    showMultiple() {
        this.messageService.addAll([
            {severity:'info', summary:'Message 1', detail:'PrimeNG rocks'},
            {severity:'info', summary:'Message 2', detail:'PrimeUI rocks'},
            {severity:'info', summary:'Message 3', detail:'PrimeFaces rocks'}
        ]);
    }

    onConfirm() {
        this.messageService.clear('c');
    }

    onReject() {
        this.messageService.clear('c');
    }

    clear() {
        this.messageService.clear();
    }

}
