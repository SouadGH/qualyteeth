import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Feedback } from 'libs/shared/src/lib/feedback.entity';
import { FeedbackService } from 'apps/qualyteeth-dentist/src/app/services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  nbStars: number;
  comment: string;

  /**
   *
   */
  constructor(
    private modalCtrl: ModalController,
    private feedbackSvc: FeedbackService,
    private toastCtrl: ToastController
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
  turnOn(nbStars: number) {
    this.nbStars = nbStars;
  }

  /**
   *
   */
  setComment(e) {
    this.comment = e.detail.value;
  }

  /**
   *
   */
  disabled(): boolean {
    return this.nbStars == null && (this.comment == null || this.comment.trim() === '')
  }

  /**
   *
   */
  async save(): Promise<void> {

    const feedback: Feedback = {
      id: null,
      stars: this.nbStars,
      comment: this.comment
    }

    await this.feedbackSvc.saveFeedback(feedback);

    const toast = await this.toastCtrl.create({
      message: 'Merci pour votre feedback!',
      duration: 2000
    });
    await toast.present();
    await this.modalCtrl.dismiss();
  }

}
