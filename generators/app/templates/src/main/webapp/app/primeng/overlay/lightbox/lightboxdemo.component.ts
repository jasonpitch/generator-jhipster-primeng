import { Component, OnInit } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'jhi-lightbox',
    templateUrl: './lightboxdemo.component.html',
    styles: []
})
export class LightboxDemoComponent implements OnInit {
    images: any[];
    activeIndex = 0;

    ngOnInit() {
        this.images = [];
        this.images.push({source: '/content/primeng/assets/data/images/logos/primefaces.png',
            thumbnail: '/content/primeng/assets/data/images/logos/primefaces.png', title: 'PrimeFaces'});
        this.images.push({source: '/content/primeng/assets/data/images/logos/primeng.png',
            thumbnail: '/content/primeng/assets/data/images/logos/primeng.png', title: 'PrimeNG'});
        this.images.push({source: '/content/primeng/assets/data/images/logos/primereact.png',
            thumbnail: '/content/primeng/assets/data/images/logos/primereact.png', title: 'PrimeReact'});
        this.images.push({source: '/content/primeng/assets/data/images/logos/primeui.png',
            thumbnail: '/content/primeng/assets/data/images/logos/primeui.png', title: 'PrimeUI'});
    }

    onChangeStep(label: string) {
        this.messageService.add({severity: 'info', summary: label});
    }

    constructor(private messageService: MessageService) {
        this.images = [];
    }
}
