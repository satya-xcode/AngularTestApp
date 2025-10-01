import { Component, signal } from "@angular/core";
import { SliderComponent } from "../../components/input/SliderComponent";
import { CardComponent } from "../../components/input/CardComponent";
import { BannerComponent } from "../../components/input/BannerComponent";
import { CounterComponent } from "../../components/input/CounterComponent";
import { ProfilePicComponent } from "../../components/input/ProfilePicComponent";
import { StatusComponent } from "../../components/input/StatusComponent";
import { BoxComponent } from "../../components/input/BoxComponent";
import { UserCardComponent } from "../../components/input/UserCardComponent";
import { ButtonComponent } from "../../components/input/ButtonComponent";
import { NgClass } from "@angular/common";

@Component({
  selector: "InputPropertiesPage",
  standalone: true,
  imports: [
    NgClass,
    SliderComponent,
    CardComponent,
    BannerComponent,
    CounterComponent,
    ProfilePicComponent,
    StatusComponent,
    BoxComponent,
    UserCardComponent,
    ButtonComponent,
  ],
  template: `
    <div class="container my-5">
      <div class="row g-4">

        <!-- Slider Demo -->
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-header fw-bold">Slider Demo</div>
            <div class="card-body">
              <SliderComponent
                [min]="0"
                [max]="100"
                [(value)]="volume"
                [sliderLabel]="'Volume Sound'"
              ></SliderComponent>
              <p class="mt-2">Volume: {{ volume() }}</p>
            </div>
          </div>
        </div>

        <!-- Brightness Slider -->
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-header fw-bold">Configurable Input</div>
            <div class="card-body">
              <SliderComponent
                [min]="0"
                [max]="50"
                [(value)]="brightness"
                [sliderLabel]="'Brightness'"
                [disabled]="isDisabled"
              ></SliderComponent>
              <p class="mt-2">Brightness: {{ brightness() }}</p>
              <button class="btn btn-outline-primary btn-sm mt-2" (click)="toggleDisabled()">
                Toggle Disable
              </button>
            </div>
          </div>
        </div>

        <!-- Button -->
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-header fw-bold">Button Component</div>
            <div class="card-body">
              <app-button [label]="'Save'" [disabled]="false"></app-button>
            </div>
          </div>
        </div>

        <!-- UserCard -->
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-header fw-bold">Data Display</div>
            <div class="card-body">
              <app-user-card [name]="'Satya'" [age]="22"></app-user-card>
            </div>
          </div>
        </div>

        <!-- Box -->
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-header fw-bold">Styling / Customization</div>
            <div class="card-body">
              <app-box [bgColor]="'#f8f9fa'" [padding]="15">
                <p>This is inside a custom box</p>
              </app-box>
            </div>
          </div>
        </div>

        <!-- Status -->
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-header fw-bold">Parent-controlled Status</div>
            <div class="card-body">
              <app-status [status]="userStatus()"></app-status>
              <div class="mt-2">
                <button
                  class="btn"
                  [ngClass]="userStatus() === 'online' ? 'btn-danger' : 'btn-success'"
                  (click)="toggleStatus()"
                >
                  {{ userStatus() === 'online' ? 'Go Offline' : 'Go Online' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ProfilePic -->
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-header fw-bold">Required Inputs</div>
            <div class="card-body">
              <app-profile-pic [src]="'https://via.placeholder.com/100'"></app-profile-pic>
            </div>
          </div>
        </div>

        <!-- Counter -->
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-header fw-bold">Two-way Binding (Model)</div>
            <div class="card-body">
              <app-counter [(count)]="parentCount"></app-counter>
              <p class="mt-2">Parent count: {{ parentCount }}</p>
            </div>
          </div>
        </div>

        <!-- Card -->
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-header fw-bold">Aliased Input</div>
            <div class="card-body">
              <app-card [cardTitle]="'Analytics'">Metrics content goes here</app-card>
            </div>
          </div>
        </div>

        <!-- Banner -->
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-header fw-bold">Input Transform</div>
            <div class="card-body">
              <app-banner [isVisible]="true"></app-banner>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
})
export class InputPropertiesPage {
  // Signals for sliders, counter, and status
  parentCount = 5;
  volume = signal(25);
  brightness = signal(10);
  isDisabled = false;
  userStatus = signal<'online' | 'offline'>('offline');

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  toggleStatus() {
    this.userStatus.set(this.userStatus() === 'online' ? 'offline' : 'online');
  }
}
