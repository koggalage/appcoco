import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HistoryUIService } from '../history-ui.service';
import { takeUntil } from 'rxjs/operators';
import { TreatmentDetailsResponse } from '../history-model';
import { TreatmentDataService } from 'src/app/treatment/treatment-data-service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.page.html',
  styleUrls: ['./history-details.page.scss'],
})
export class HistoryDetailsPage implements OnInit {

  public imageBaseUrl = environment.host + "UserImages/Treatment/";
  private ngUnsubscription = new Subject();
  public treatmentDetailsResponse = new TreatmentDetailsResponse();
  public ImageURLs = new Array<any>();
  public tbuid: number;

  public sliderOptions = {
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 2
  };

  constructor(
    private modalController: ModalController,
    private treatmentDataService: TreatmentDataService,
    private historyUIService: HistoryUIService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTbuid();
  }

  getTbuid() {
    this.historyUIService
      .getTduid()
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((tbuid: number) => {
        this.tbuid = tbuid;
        this.getDetailsByTbuid();
      });
  }

  getDetailsByTbuid() {
    this.treatmentDataService.getDailyUpdateByDate(this.tbuid)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((historyDetails: TreatmentDetailsResponse) => {

        console.log('historyDetails', historyDetails);


        this.treatmentDetailsResponse = historyDetails;
        this.ImageURLs = [];
        this.ImageURLs = historyDetails.TreatmentImageURLs;
        this.treatmentDetailsResponse.TreatmentImageURLs = [];

        if (this.ImageURLs) {
          this.ImageURLs.forEach(obj => {
            console.log('obj', obj);
            this.treatmentDetailsResponse.TreatmentImageURLs.push(this.imageBaseUrl + obj + '.jpg');
          });
        }
        console.log('this.ImageURLs 3', this.ImageURLs);
        //this.historyUIService.setSelectedHistory(historyDetails);


      });
  }

  onImageClick(img) {
    console.log('img', img);
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => modal.present());
  }

}
