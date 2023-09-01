import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CmmService } from '../../../services/cmm.service'
import { Cmm1Service } from '../../../services/cmm1.service'
import { Cmm2Service } from '../../../services/cmm2.service'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-records-modal',
  templateUrl: './records-modal.component.html',
  styleUrls: ['./records-modal.component.css']
})
export class RecordsModalComponent implements OnInit {

  displayedColumns: string[] = [
    'hora',
    'temperatura',
    'humedad',
    'presion',
    'lluvia',
    'puntoDeRocio',
    'sensacionTermica',
    'velocidadViento',
    'direccionViento',
  ];

  dataSource = new MatTableDataSource();
  originalData = []; // Initialize as an empty array
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cmmSvc: CmmService,
    private cmm1Svc: Cmm1Service,
    private cmm2Svc: Cmm2Service
  ) {}

  ngOnInit(): void {
    switch (this.data.cmmSelected) {
      case "0":
        this.cmmSvc.getDay(this.data.formattedDateTime).subscribe(res => {
          this.originalData = res;
          this.updatePaginator();
        });
        break;
      case "1":
        this.cmm1Svc.getDay(this.data.formattedDateTime).subscribe(res => {
          this.originalData = res;
          this.updatePaginator();
        });
        break;
      case "2":
        this.cmm2Svc.getDay(this.data.formattedDateTime).subscribe(res => {
          this.originalData = res;
          this.updatePaginator();
        });
        break;
    }
  }

  updatePaginator() {
    this.dataSource.data = this.originalData.slice(0, this.paginator.pageSize);
    this.paginator.length = this.originalData.length;
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource.data = this.originalData.slice(startIndex, endIndex);
  }

  obtenerDireccionViento(grados) {
    var direcciones = ["Norte", "Noreste", "Este", "Sureste", "Sur", "Suroeste", "Oeste", "Noroeste"];
    var indice = Math.round(grados / 45) % 8;
    return direcciones[indice];
  }

}
