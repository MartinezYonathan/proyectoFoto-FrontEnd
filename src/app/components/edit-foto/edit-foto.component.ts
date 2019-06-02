import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FotoService } from 'src/app/services/foto.service';
import { Foto } from 'src/app/model/foto';

@Component({
  selector: 'app-edit-foto',
  templateUrl: './edit-foto.component.html',
  styles: []
})
export class EditFotoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private service: FotoService) { }

  form: any = {};
  foto: Foto;
  fotoEditada: Foto;
  addForm: FormGroup;
  selectedFile: File = null;
  base64textString: string;
  cadena: String;

  ngOnInit() {
    this.foto = JSON.parse(localStorage.getItem('editFoto'));
    
    this.addForm = this.formBuilder.group({
      id: '',
      nombre: '',
      descripcion: '',
      foto: ''
    });

    this.form.nombre = this.foto.nombre;
    this.form.descripcion = this.foto.descripcion;
    this.base64textString = this.foto.foto;
  }

  onFileSelected(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.base64textString = 'data:image/jpg;base64,' + btoa(e.target.result);
  }

  onSubmit() {
      this.fotoEditada = new Foto(
        this.foto.id,
        this.form.nombre,
        this.form.descripcion,
        this.base64textString
      );
      this.service.updateFoto(this.fotoEditada)
      .subscribe(data => {
        this.router.navigate(['list-foto']);
      });
  }
}
