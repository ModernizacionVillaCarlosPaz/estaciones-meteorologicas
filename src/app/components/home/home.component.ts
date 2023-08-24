import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { CmmService } from '../../services/cmm.service'

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_DATE_FORMATS,
    },
  ],
})
export class HomeComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller, private cmmSvc: CmmService) { }

  cmm: boolean = true;
  cmm1: boolean = true;
  cmm2: boolean = true;

  cmmModal: boolean = false;
  cmm1Modal: boolean = false;
  cmm2Modal: boolean = false;
  modal: boolean = false;


  backgroundColor: string = "00";



  ngOnInit(): void {
    this.backgroundColor = this.obtenerHoraActualCordoba()
    this.cmmSvc.getLast().subscribe(res => {
      console.log(res)
    })

  }

  obtenerHoraActualCordoba(): string {
    const fechaActual = new Date();
    const zonaHoraria = "America/Argentina/Cordoba";

    const opcionesFecha = {
      timeZone: zonaHoraria,
      hour: "numeric",
      hour12: false,
    } as Intl.DateTimeFormatOptions;

    const horaActual = fechaActual.toLocaleTimeString("es-AR", opcionesFecha);

    return horaActual;
  }

  isBackgroundColorInRange(): boolean {
    const numericValue = parseInt(this.backgroundColor, 10);
    return numericValue >= 17 ? true : (numericValue <= 9);
  }

  isOpenCmmData(modal: number) {
    switch (modal) {
      case 0:
        if (this.cmmModal) {
          this.cmmModal = false
          this.modal = false
        } else {
          this.cmmModal = true
          this.modal = true
          this.cmm1Modal = false
          this.cmm2Modal = false
          this.viewportScroller.scrollToAnchor('cmmData');
        }
        break;
      case 1:
        if (this.cmm1Modal) {
          this.cmm1Modal = false
          this.modal = false
        } else {
          this.cmm1Modal = true
          this.modal = true
          this.cmmModal = false
          this.cmm2Modal = false
          this.viewportScroller.scrollToAnchor('cmmData');
        }
        break;
      case 2:
        if (this.cmm2Modal) {
          this.cmm2Modal = false
          this.modal = false
        } else {
          this.cmm2Modal = true
          this.modal = true
          this.cmm1Modal = false
          this.cmmModal = false
          this.viewportScroller.scrollToAnchor('cmmData');
        }
        break;
    }
  }

}
