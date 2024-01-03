import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories = [
    'Général',
    'Parondontologie',
    'Traitements Conservateurs',
    'Endodontie',
    'Chirurgie',
    'Orthodontie',
    'Technique dentaire'
  ]

  /**
   *
   */
  constructor(
    private modalCtrl: ModalController
  ) { }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async close(): Promise<void> {
    await this.modalCtrl.dismiss();
  }

  /**
   *
   */
  async select(category: string): Promise<void> {
    await this.modalCtrl.dismiss(category);
  }

}
