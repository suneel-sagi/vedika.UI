import { Component ,EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {
loadedFeature = 'active';

onNavigate(feature: string) {
  this.loadedFeature = feature;
}
}