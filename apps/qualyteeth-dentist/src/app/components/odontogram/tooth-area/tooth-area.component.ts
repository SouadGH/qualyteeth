import { Component, Inject, Input, OnInit } from '@angular/core';
import { Tooth } from 'libs/shared/src/lib/tooth.entity';
import { ToothService } from 'apps/qualyteeth-dentist/src/app/services/tooth.service';
import { OdontogramComponent } from '../odontogram.component';

@Component({
  selector: 'app-odontogram-tooth-area',
  templateUrl: './tooth-area.component.html',
  styleUrls: ['./tooth-area.component.scss'],
})
export class OdontogramToothAreaComponent implements OnInit {

  @Input() tooth: Tooth & { selectedParts: Array<string> };
  @Input() editable: boolean;

  partOver: string;

  /**
   * 
   */
  constructor(
    private toothSvc: ToothService,
    @Inject(OdontogramComponent) private parent: OdontogramComponent) {
  }

  /**
   * 
   */
  ngOnInit() {
    this.tooth.selectedParts = new Array<string>();
  }

  /**
   * 
   */
  async select(e: MouseEvent, position: string): Promise<void> {
    e.stopImmediatePropagation();

    const idx = this.tooth.selectedParts.indexOf(position);
    if (idx > -1) {
      this.tooth.selectedParts.splice(idx, 1)
    } else {
      this.tooth.selectedParts.push(position)
    }

    for (const t of this.parent.teeth) {
      const idx = t.selectedParts.indexOf('z');
      if (idx > -1) {
        t.selectedParts.splice(idx, 1);
      }
    }

    this.toothSvc.toothSelectedParts.next(this.tooth);

    // if (this.parent.matFabMenu.isActive) {
    //   this.parent.matFabMenu.toggle();
    // }
  }

}
