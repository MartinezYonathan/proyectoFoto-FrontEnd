import { Component, OnInit } from '@angular/core';
import { FotoService } from 'src/app/services/foto.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Foto } from 'src/app/model/foto';

@Component({
  selector: 'app-add-foto',
  templateUrl: './add-foto.component.html',
  styles: []
})
export class AddFotoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private service: FotoService) { }

  form: any = {};
  foto: Foto;
  addForm: FormGroup;
  selectedFile: File = null;
  base64textString:string;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      foto: ['', Validators.required]
    });
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
    this.foto = new Foto(
      1,
      this.form.nombre,
      this.form.descripcion,
      this.base64textString
    );
    this.service.postFoto(this.foto)
      .subscribe(data => {
        this.router.navigate(['list-foto']);
      });
  }
}
