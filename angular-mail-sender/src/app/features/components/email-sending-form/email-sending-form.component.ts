import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-email-sending-form',
  templateUrl: './email-sending-form.component.html',
  styleUrls: ['./email-sending-form.component.scss']
})
export class EmailSendingFormComponent implements OnInit{
  
  
  ngOnInit(): void {
    initFlowbite()
  }

}
