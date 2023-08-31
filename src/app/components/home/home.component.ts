import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { CmmService } from '../../services/cmm.service'
import { Cmm1Service } from '../../services/cmm1.service'
import { Cmm2Service } from '../../services/cmm2.service'
import { Archive } from '../../models/archive'
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { RecordsModalComponent } from './records-modal/records-modal.component';

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

  constructor(private dialog: MatDialog, private fb: FormBuilder, private viewportScroller: ViewportScroller, private cmmSvc: CmmService, private cmm1Svc: Cmm1Service, private cmm2Svc: Cmm2Service) { }

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

  buscarValores() {
    const startValue = this.myForm.get('start').value;
    const endValue = this.myForm.get('end').value;

    if (startValue && endValue) {
      const formattedStartDate = this.formatDatePush(startValue);
      const formattedEndDate = this.formatDatePush(endValue);

      // Verificar el rango de fechas
      const startDate = new Date(formattedStartDate);
      const endDate = new Date(formattedEndDate);
      const threeMonthsLater = new Date(startDate);
      threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

      if (endDate > threeMonthsLater) {
        Swal.fire({
          icon: 'error',
          title: 'Error en el rango de fechas',
          text: 'El rango de fechas no puede ser superior a 3 meses.'
        });
        return;
      }

      let cmmService: any; // Declarar la variable para el servicio apropiado
      if (this.cmmModal) {
        cmmService = this.cmmSvc;
      } else if (this.cmm1Modal) {
        cmmService = this.cmm1Svc;
      } else if (this.cmm2Modal) {
        cmmService = this.cmm2Svc;
      }

      if (cmmService) {
        cmmService.getRange(formattedStartDate, formattedEndDate).subscribe(res => {
          this.cmmDataArray = res.map(item => {
            return {
              ...item,
              formattedDateTime: this.formatDateToShow(item.formattedDateTime) // Aquí formateamos la fecha
            };
          });
          this.cmmDataArray = res.map(item => this.roundValuesToDecimal(item));
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Ambas fechas deben ser proporcionadas.'
      });
    }
  }

  OpenModal(formattedDateTime:string){
    formattedDateTime = formattedDateTime.replace(/\//g, '-');
    const cmmSelected = this.cmmModal ? '0': this.cmmModal ? '1' : '2';
    this.dialog.open(RecordsModalComponent, {
      height: '90vh',
      width: '90vw',
      data: { formattedDateTime, cmmSelected },
    })
  }

  // Agrega esta función para formatear la fecha
  formatDateToShow(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
          this.cmmSvc.getRange(this.getDates().sevenDaysAgo, this.getDates().currentDate).subscribe(res => {
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
          this.cmm1Svc.getRange(this.getDates().sevenDaysAgo, this.getDates().currentDate).subscribe(res => {
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
          this.cmm2Svc.getRange(this.getDates().sevenDaysAgo, this.getDates().currentDate).subscribe(res => {
            this.cmmDataArray = res
            console.log(res)
          })
          this.viewportScroller.scrollToAnchor('cmmData');
        }
        break;
    }
  }

}
