import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component1',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './component1.html',
  styleUrls: ['./component1.css'],
})
export class Component1 {

  // Cambiar nombre
  nombre: string = 'Juan';

  cambiarNombre() {
    this.nombre = this.nombre === 'Juan' ? 'Pedro' : 'Juan';
  }

  // Lista de tareas simple
  nuevaTarea: string = '';
  listaTareas: string[] = [];

  agregar() {
    if (this.nuevaTarea.trim() !== '') {
      this.listaTareas.push(this.nuevaTarea);
      this.nuevaTarea = '';
    }
  }

}