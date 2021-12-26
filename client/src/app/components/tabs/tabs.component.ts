import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    $('.menu .item').tab();
  }
}
