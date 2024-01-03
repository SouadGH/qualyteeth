// https://www.medesy.it/it/product-category/laboratorio/

import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ToolbarMenuComponent } from 'apps/qualyteeth-dentist/src/app/components/toolbar-menu/toolbar-menu.component';
import { CategoriesPage } from './categories/categories.page';

interface MarketPlaceItem {
  category: string,
  name: string
}

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss'],
})
export class MarketplacePage implements OnInit {

  private allItems: Array<MarketPlaceItem> = [
    { category: 'Pailles aspiration', name: 'Aspirateur chirurgique MM2.5' },
    { category: 'Pailles aspiration', name: 'Aspirateur chirurgique MM3' },
    { category: 'Pailles aspiration', name: 'Aspirateur chirurgique MM4' },
    { category: 'Pailles aspiration', name: 'Paille aspiration Frazier MM2' },
    { category: 'Cuillères alvéolaires', name: 'Cuillère Hemingway N.0' },
    { category: 'Cuillères alvéolaires', name: 'Cuillère Hemingway N.1' },
  ]

  items: Array<MarketPlaceItem> = new Array<MarketPlaceItem>();

  customPopoverOptions: any = {
    // header: 'Filtre',
    subHeader: 'Selectionnez le type de produit',
    // message: 'Only select your dominant hair color'
  };

  /**
   *
   */
  constructor(
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController
  ) { }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  ionViewDidEnter() {
    this.items = [...this.allItems];
  }

  /**
   *
   */
  search(e) {
    this.items = [...this.allItems];
    if (!e || !e.detail || !e.detail.value || e.detail.value === '') {
      return;
    }
    const v = e.detail.value.toLowerCase();
    this.items = this.items.filter(e => e.category.toLowerCase().indexOf(v) > -1 || e.name.toLowerCase().indexOf(v) > -1);
  }

  /**
   *
   */
  segmentChanged(e) {
    // const category = 
    // this.items = [...this.allItems];
    // this.items = this.items.filter(i => i.category.in)
  }

  /**
   *
   */
  async pop(ev: any): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: ToolbarMenuComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  /**
   *
   */
  async toCategories(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: CategoriesPage,
    });
    await modal.present();
    modal.onDidDismiss().then(category => {
      console.log(category)
    })
  }

}
