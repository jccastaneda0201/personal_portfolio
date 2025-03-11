import { Component, inject } from '@angular/core';
import { ContactosService } from '../../services/contactos.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactosService = inject(ContactosService)
  Toaster = inject(ToastrService)

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl(''),
    asunto: new FormControl(''),
    mensaje: new FormControl(''),
  })

  async createContacto() {
    try {
      console.log(this.formulario.value);
      const contacto = await this.contactosService.create(this.formulario.value);

      this.Toaster.success('Mensaje enviado correctamente', 'in div', {
        timeOut: 3000, // Duración del mensaje
        positionClass: 'toast-bottom-right', // Posición en pantalla
        progressBar: true, // Barra de progreso
        easing: 'ease-in-out', // Animación
        closeButton: true, // Botón de cierre
      });
    } catch (error) {
      console.error('Error:', error);
      this.Toaster.error('Error al enviar el mensaje', 'in div', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
        easing: 'ease-in-out',
        closeButton: true,
      });
    }
  }
}
