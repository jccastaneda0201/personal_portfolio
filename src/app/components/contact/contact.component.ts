import { Component, inject } from '@angular/core';
import { ContactosService } from '../../services/contactos.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactosService = inject(ContactosService)

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl(''),
    asunto: new FormControl(''),
    mensaje: new FormControl(''),
  })

  async createContacto() {
    try {
      console.log(this.formulario.value);
      await this.contactosService.create(this.formulario.value);

      // Resetear el formulario después del envío exitoso
      this.formulario.reset();

      // Mostrar alerta de éxito con SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado',
        text: 'Tu mensaje se ha enviado correctamente.',
        confirmButtonColor: '#3085d6',
      });

    } catch (error) {
      console.error('Error:', error);

      // Mostrar alerta de error con SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.',
        confirmButtonColor: '#d33',
      });
    }
  }
}

