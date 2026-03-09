import { Component, inject, signal } from '@angular/core';
import { SpesaService } from '../../services/spesa-service';

@Component({
  selector: 'app-studente',
  standalone: true,
  templateUrl: './studente.component.html'
})
export class StudenteComponent {
  private service = inject(SpesaService);
  voti = signal<any[]>([]);

  ngOnInit() {
    this.service.getVoti().subscribe(res => this.voti.set(res));
  }
}
