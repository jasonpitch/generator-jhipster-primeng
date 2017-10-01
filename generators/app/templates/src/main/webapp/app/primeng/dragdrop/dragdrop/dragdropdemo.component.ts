import { Component, OnInit } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import {DocumentService} from './service/document.service.ts';
import {Document} from './service/document.ts';

@Component({
    selector: 'jhi-dragdrop',
    templateUrl: './dragdropdemo.component.html',
    styles: []
})
export class DragdropDemoComponent implements OnInit {
    availableDocs: Document[];
    deletedDocs: Document[];
    draggedDoc: Document;

    constructor(private docService: DocumentService) {
    }

    ngOnInit() {
        this.deletedDocs = [];
        this.docService.getDocuments().subscribe((docs: Document[]) => this.availableDocs = docs);
    }

    dragStart(event: any, doc: Document) {
        this.draggedDoc = doc;
    }

    drop(event: any) {
        if (this.draggedDoc) {
            // add draggable element to the deleted documents list
            this.deletedDocs = [...this.deletedDocs, this.draggedDoc];
            // remove draggable element from the available documents list
            this.availableDocs = this.availableDocs.filter((e: Document) => e.id !== this.draggedDoc.id);
            this.draggedDoc = null;
        }
    }

    dragEnd(event: any) {
        this.draggedDoc = null;
    }
}
