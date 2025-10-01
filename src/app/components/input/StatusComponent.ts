import { NgClass } from '@angular/common';
import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-status',
  standalone: true,
  template: `
    <div class="d-flex align-items-center">
      <h6 class="m-1">Status:</h6>
      <span class="badge" [ngClass]="badgeClass()">
        {{ status() }}
      </span>
    </div>
  `,
  imports: [NgClass],
})
export class StatusComponent {
  // Allowed statuses
  status = input<'online' | 'offline'>('offline');

  // Map status → Bootstrap class
  badgeClass = computed(() => {
    return this.status() === 'online' ? 'bg-success' : 'bg-danger';
  });
}
