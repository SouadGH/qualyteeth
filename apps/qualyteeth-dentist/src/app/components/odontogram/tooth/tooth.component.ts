import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToothService } from 'apps/qualyteeth-dentist/src/app/services/tooth.service';
import { OdontogramComponent } from '../odontogram.component';
import { ToothDto } from 'libs/shared/src/lib/dto/tooth.dto';

@Component({
  selector: 'app-odontogram-tooth',
  templateUrl: './tooth.component.html',
  styleUrls: ['./tooth.component.scss'],
})
export class OdontogramToothComponent implements OnInit, AfterViewInit {

  @ViewChild('wd', { static: false }) wd: ElementRef;
  @ViewChild('wp', { static: false }) wp: ElementRef;
  @ViewChild('wm', { static: false }) wm: ElementRef;
  @ViewChild('c', { static: false }) c: ElementRef;

  @Input() tooth: ToothDto & { selectedParts: Array<string>, hasDiagnostic: boolean, hasTreatment: boolean };
  @Input() editable: boolean;
  partOver: string;

  /**
   * 
   */
  constructor(
    @Inject(OdontogramComponent) private parent: OdontogramComponent,
    private toothSvc: ToothService,
    public sanitizer: DomSanitizer,
    private renderer: Renderer2) {
  }

  /**
   * 
   */
  ngAfterViewInit(): void {
    this.initToothParts(this.wd, 'wd');
    this.initToothParts(this.wp, 'wp');
    this.initToothParts(this.wm, 'wm');
    this.initToothParts(this.c, 'c');
  }

  /**
   * 
   */
  private initToothParts(element: ElementRef, part: string): void {
    if (element == null) {
      return
    }

    this.renderer.addClass(element.nativeElement, 'focused-out')

    if (this.editable) {
      this.renderer.addClass(element.nativeElement, 'clickable')

      this.renderer.listen(element.nativeElement, 'click', ($event) => {
        this.select($event, part);
        if (this.tooth.selectedParts.includes(part)) {
          this.renderer.addClass(element.nativeElement, 'ondontogram-tooth-selected');
        } else {
          this.renderer.removeClass(element.nativeElement, 'ondontogram-tooth-selected');
        }
      })

      this.renderer.listen(element.nativeElement, 'mouseover', () => {
        this.partOver = part;
        this.renderer.addClass(element.nativeElement, 'focused-part')
      })

      this.renderer.listen(element.nativeElement, 'mouseleave', () => {
        this.partOver = null;
        this.renderer.removeClass(element.nativeElement, 'focused-part')
      })
    }

    if (this.tooth.hasDiagnostic) {
      this.renderer.setStyle(element.nativeElement, 'fill', '#007373');
    }
    else if (this.tooth.hasTreatment) {
      this.renderer.setStyle(element.nativeElement, 'fill', '#A52829');
    }

  }

  /**
   * 
   */
  public resetClasses(): void {
    if (this.c != null) {
      this.renderer.removeClass(this.c.nativeElement, 'ondontogram-tooth-selected');
    }
    if (this.wd != null) {
      this.renderer.removeClass(this.wd.nativeElement, 'ondontogram-tooth-selected');
    }
    if (this.wm != null) {
      this.renderer.removeClass(this.wm.nativeElement, 'ondontogram-tooth-selected');
    }
    if (this.wp != null) {
      this.renderer.removeClass(this.wp.nativeElement, 'ondontogram-tooth-selected');
    }
  }

  /**
   * 
   */
  ngOnInit() {
    this.tooth.selectedParts = new Array<string>();

    // const objElm = (this.test.nativeElement as HTMLObjectElement);
    // objElm.onload = () => {
    //   const paths = objElm.contentDocument.querySelectorAll('path');

    //   paths.forEach((path, index) => {
    //     console.log(`path:${index} , d=${path.getAttribute("d")}`);
    //   })

    // }
  }

  /**
   * 
   */
  select(e: MouseEvent, position: string): void {
    e.stopImmediatePropagation();

    const idx = this.tooth.selectedParts.indexOf(position);
    if (idx > -1) {
      this.tooth.selectedParts.splice(idx, 1)
    } else {
      this.tooth.selectedParts.push(position)
    }

    // console.log(this.tooth.selectedParts);

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
