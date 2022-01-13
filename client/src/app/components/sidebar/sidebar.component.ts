import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Page } from 'src/app/models/enums.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})

export class SidebarComponent implements OnInit {

  PageEnum = Page;
  id: Page = Page.Main;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {}

  onClick(e: any) {
    this.id = e.target.id;
    this.commonService.sideBarItemClicked.emit(this.id);
  }
}
