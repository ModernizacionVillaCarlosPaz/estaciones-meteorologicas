import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { CmmService } from '../../services/cmm.service'
import { Cmm1Service } from '../../services/cmm1.service'
import { Cmm2Service } from '../../services/cmm2.service'
import { Archive } from '../../models/archive'
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder, private viewportScroller: ViewportScroller, private cmmSvc: CmmService, private cmm1Svc: Cmm1Service, private cmm2Svc: Cmm2Service) { }

  myForm: FormGroup;

  cmm: boolean = true;
  cmm1: boolean = true;
  cmm2: boolean = true;

  cmmModal: boolean = false;
  cmm1Modal: boolean = false;
  cmm2Modal: boolean = false;
  modal: boolean = false;

  cmmLastData: Archive = {};
  cmm1LastData: Archive = {};
  cmm2LastData: Archive = {};

  cmmLoading: boolean = true;
  cmm1Loading: boolean = true;
  cmm2Loading: boolean = true;

  cmmDataArray: Archive[] = []

  backgroundColor: string = "00";



  ngOnInit(): void {
    this.myForm = this.fb.group({
      start: [''], // FormControl para la fecha de inicio
      end: ['']    // FormControl para la fecha de fin
    });
    this.backgroundColor = '19'//this.obtenerHoraActualCordoba()
    this.cmmSvc.getLast().subscribe(res => {
      this.cmmLastData = this.roundValuesToDecimal(res[0]);
      this.cmmLoading = false;
      console.log(this.cmmLastData)
    })
    this.cmm1Svc.getLast().subscribe(res => {
      this.cmm1LastData = this.roundValuesToDecimal(res[0]);
      this.cmm1Loading = false;
      console.log(this.cmm1LastData)
    })
    this.cmm2Svc.getLast().subscribe(res => {
      this.cmm2LastData = this.roundValuesToDecimal(res[0]);
      this.cmm2Loading = false;
      console.log(this.cmm2LastData)
    })

  }

  buscarValores() { //TODO NO SE MUESTRA PORQUE LAS FECHAS ESTAN INVERTIDAS
    const startValue = this.myForm.get('start').value;
    const endValue = this.myForm.get('end').value;

    if (startValue && endValue) {
      const formattedStartDate = this.formatDatePush(startValue);
      const formattedEndDate = this.formatDatePush(endValue);

      if (this.cmmModal) {
        this.cmmSvc.getRange(formattedStartDate, formattedEndDate).subscribe(res => {
          this.cmmDataArray = res
          console.log(res)
        })
      } else if (this.cmm1Modal) {
        this.cmm1Svc.getRange(formattedStartDate, formattedEndDate).subscribe(res => {
          this.cmmDataArray = res
          console.log(res)
        })
      } else if (this.cmm2Modal){
        this.cmm2Svc.getRange(formattedStartDate, formattedEndDate).subscribe(res => {
          this.cmmDataArray = res
          console.log(res)
        })
      }
    }
  }

  formatDatePush(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  roundValuesToDecimal(data: any): any {
    const roundedData = { ...data }; // Crear una copia del objeto para no modificar el original

    for (const key in roundedData) {
      if (typeof roundedData[key] === 'number') {
        roundedData[key] = Math.round(roundedData[key] * 10) / 10; // Redondear a un decimal
      }
    }

    return roundedData;
  }

  obtenerDireccionViento(grados) {
    var direcciones = ["Norte", "Noreste", "Este", "Sureste", "Sur", "Suroeste", "Oeste", "Noroeste"];
    var indice = Math.round(grados / 45) % 8;
    return direcciones[indice];
  }

  getDia(formattedDateTime: string): string {
    const diasSemana = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];
    const fecha = new Date(formattedDateTime);
    const diaSemana = diasSemana[fecha.getUTCDay()];
    const diaNumero = fecha.getUTCDate();
    return `${diaSemana} ${diaNumero}`;
  }

  getHora(formattedDateTime: string): string {
    const fecha = new Date(formattedDateTime);
    const hora = fecha.getUTCHours().toString().padStart(2, '0');
    const minutos = fecha.getUTCMinutes().toString().padStart(2, '0');
    return `${hora}:${minutos}`;
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

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getDates(): { currentDate: string; sevenDaysAgo: string } {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const currentDateFormatted = this.formatDate(today);
    const sevenDaysAgoFormatted = this.formatDate(sevenDaysAgo);

    return {
      currentDate: currentDateFormatted,
      sevenDaysAgo: sevenDaysAgoFormatted,
    };
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
          this.cmmSvc.getRange(this.getDates().currentDate, this.getDates().sevenDaysAgo).subscribe(res => {
            this.cmmDataArray = res
            console.log(res)
          })
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
          this.cmm1Svc.getRange(this.getDates().currentDate, this.getDates().sevenDaysAgo).subscribe(res => {
            this.cmmDataArray = res
            console.log(res)
          })
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
          this.cmm2Svc.getRange(this.getDates().currentDate, this.getDates().sevenDaysAgo).subscribe(res => {
            this.cmmDataArray = res
            console.log(res)
          })
          this.viewportScroller.scrollToAnchor('cmmData');
        }
        break;
    }
  }

}
