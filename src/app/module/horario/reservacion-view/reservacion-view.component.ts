import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReservacionService } from '../../../core/service/reservacion.service';
import { ResStore } from '../../../state-management/state.store';
import { ReservacionDto } from '../../../core/dto/reservacion.dto';
import { MatSort, Sort } from '@angular/material/sort';
import { PaginationFilterRequestDto } from '../../../core/dto/paginationFilterReq.dto';
import { PaginationDto } from '../../../core/dto/paginationDto';
@Component({
  selector: 'app-reservacion-view',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './reservacion-view.component.html',
  styleUrl: './reservacion-view.component.scss',
})
export class ReservacionViewComponent implements OnInit, AfterViewInit {
  store = inject(ResStore);
  displayedColumns: string[] = [
    'id',
    'empresaNombre',
    'horario',
    'acciones',
  ];
  dataSource = new MatTableDataSource<ReservacionDto>();
  paginationRequestDto: PaginationFilterRequestDto;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private reservacionService: ReservacionService) {
    this.paginationRequestDto = {
      page: 1,
      take: 10,
      order: 'ASC',
      sortBy: 'empresaNombre',
      filter: '',
      filterBy: '' 
    }
  }

  ngOnInit(): void {
    this.loadReservaciones();
  }

  loadReservaciones() {
    this.reservacionService.getReservacionesPagination(this.paginationRequestDto).subscribe({
      next: (res: PaginationDto<ReservacionDto>) => {
        this.dataSource.data = res.content;
        this.paginator.pageIndex = res.page;
        this.paginator.pageSize = res.take;
        this.paginator.length = res.totalItems;
      },

    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe((sort: Sort) => {
      this.paginationRequestDto.order = sort.direction.toUpperCase();
      this.loadReservaciones();
    })
  }

  //TODO Add buscador

  onPageChange(event: PageEvent) {
    this.paginationRequestDto.page = event.pageIndex;
    this.paginationRequestDto.take = event.pageSize;
    this.loadReservaciones();
  }

  generarReporte(){
    this.reservacionService.generateReportReservaciones(this.store.userData()?.id as number).subscribe({
      next: (blob: Blob) => {
        //TODO add method display pdf
      }
    })
  }
}
