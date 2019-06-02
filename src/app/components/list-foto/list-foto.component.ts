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

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: 'No, cancela!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.service.deleteFoto(foto.id).subscribe(data => {
        });
        window.location.reload();
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your photo file is safe :)',
          'error'
        )
      }
    })
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
