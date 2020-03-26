import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalRef:BsModalRef
  
  constructor(private modalService:BsModalService) { }
  openModal(template:TemplateRef<any>){
    this.modalRef=this.modalService.show(template)
  }
  
  ngOnInit(): void {
  }

}
