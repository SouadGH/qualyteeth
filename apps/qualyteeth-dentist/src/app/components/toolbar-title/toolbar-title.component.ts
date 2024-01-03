import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'toolbar-title',
  templateUrl: './toolbar-title.component.html',
  styleUrls: ['./toolbar-title.component.scss'],
})
export class ToolbarTitleComponent implements OnInit {

  @Input('imgName') imgName: string = 'banner.svg';

  constructor() { }

  ngOnInit() {}

}
