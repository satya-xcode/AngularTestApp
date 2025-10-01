import { Component, input, model, booleanAttribute } from '@angular/core';

@Component({
  selector: 'SliderComponent',
  standalone: true,
  template: `
    <div class="slider-card">
      <label>{{ label() }}</label>

      <input
        type="range"
        [min]="min()"
        [max]="max()"
        [value]="value()"
        (input)="onInput($event)"
        [disabled]="disabled()"
      />

      <span>Current: {{ value() }}</span>
    </div>
  `,
  styles: [`
    .slider-card {
      border: 1px solid #ddd;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 8px;
      max-width: 300px;
    }
    label {
      font-weight: bold;
      margin-right: 0.5rem;
    }
  `]
})
export class SliderComponent {
  // ✅ standard input with default
  value = model(0);   // model input enables [(value)] binding

  // ✅ required inputs
  min = input.required<number>();
  max = input.required<number>();

  // ✅ input with alias + transform
  label = input('Default Label', {
    alias: 'sliderLabel',
    transform: (s: string) => s.trim()
  });

  // ✅ boolean attribute transform (string → boolean)
  disabled = input(false, { transform: booleanAttribute });

  // update model value
  onInput(event: Event) {
    const el = event.target as HTMLInputElement;
    this.value.set(Number(el.value));
  }
}
