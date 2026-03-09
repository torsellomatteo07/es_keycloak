import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpesaService } from '../../services/spesa-service';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './docente.component.html'
})
export class DocenteComponent {
  private service = inject(SpesaService);
  voti = signal<any[]>([]);
  nuovoVoto = { nome: '', materia: '', voto: 0, username_studente: '' };

  ngOnInit() { this.caricaVoti(); }
  caricaVoti() { this.service.getVoti().subscribe(res => this.voti.set(res)); }

  salva() {
    this.service.aggiungiVoto(this.nuovoVoto).subscribe(() => {
      this.caricaVoti();
      this.nuovoVoto = { nome: '', materia: '', voto: 0, username_studente: '' };
    });
  }
}
