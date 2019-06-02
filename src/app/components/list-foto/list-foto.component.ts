import { Component, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Foto } from 'src/app/model/foto';
import { FotoService } from 'src/app/services/foto.service';

@Component({
  selector: 'app-list-foto',
  templateUrl: './list-foto.component.html',
  styles: []
})


export class ListFotoComponent implements OnInit {
  fotos: Foto[];
  base64textString = [];

  constructor(private router: Router, private service: FotoService) { }

  ngOnInit() {
    this.service.getFoto().subscribe(data => (this.fotos = data,
      console.log(data)
    ));
  }

  deleteFoto(foto: Foto): void {
  }

  editFoto(foto: Foto): void {
    localStorage.removeItem('editFoto');
    localStorage.setItem('editFoto', JSON.stringify(foto));
    this.router.navigate(['edit-foto']);
  }

  addFoto(): void {
    this.router.navigate(['add-foto']);
  }

}
