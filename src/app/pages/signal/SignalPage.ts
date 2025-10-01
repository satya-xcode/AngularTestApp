import { Component, signal, computed, effect } from "@angular/core";
import { FormsModule } from "@angular/forms";

interface NetworkConfig {
  hostname: string;
  ipAddress: string;
  subnetMask: string;
  gateway: string;
}

@Component({
  selector: 'signal-page',
  template: `
    <div class="container mt-5 p-4 border rounded shadow-sm bg-light">
      <h1 class="mb-4 text-primary">Signal Input Examples</h1>

      <!-- 1. Basic Input with (input) event -->
      <div class="card mb-4">
        <div class="card-header">
          <h5>1. Basic Input Binding</h5>
        </div>
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-4">
              <label class="form-label fw-semibold">Network Name:</label>
            </div>
            <div class="col-md-8">
              <input
                type="text"
                class="form-control"
                [value]="network()"
                (input)="onNetworkInput($event)"
                placeholder="Enter network name"
              />
            </div>
          </div>
          <div class="mt-2">
            <span class="badge bg-primary">Current Value: {{ network() }}</span>
          </div>
        </div>
      </div>

      <!-- 2. Two-way Binding with ngModel -->
      <div class="card mb-4">
        <div class="card-header">
          <h5>2. Two-way Binding with ngModel</h5>
        </div>
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-4">
              <label class="form-label fw-semibold">Network Stage:</label>
            </div>
            <div class="col-md-8">
              <input
                type="text"
                class="form-control"
                [(ngModel)]="networkModel"
                (ngModelChange)="onNetworkModelChange()"
                placeholder="Enter network stage"
              />
            </div>
          </div>
          <div class="mt-2">
            <span class="badge bg-success">Model Value: {{ networkModel }}</span>
          </div>
        </div>
      </div>

      <!-- 3. Debounced Input -->
      <div class="card mb-4">
        <div class="card-header">
          <h5>3. Debounced Input (300ms)</h5>
        </div>
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-4">
              <label class="form-label fw-semibold">Search:</label>
            </div>
            <div class="col-md-8">
              <input
                type="text"
                class="form-control"
                [value]="searchQuery()"
                (input)="onSearchInput($event)"
                placeholder="Type to search..."
              />
            </div>
          </div>
          <div class="mt-2">
            <span class="badge bg-info">Debounced: {{ debouncedSearch() }}</span>
          </div>
        </div>
      </div>

      <!-- 4. Numeric Input with Validation -->
      <div class="card mb-4">
        <div class="card-header">
          <h5>4. Numeric Input with Validation</h5>
        </div>
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-4">
              <label class="form-label fw-semibold">Port Number (1-65535):</label>
            </div>
            <div class="col-md-8">
              <input
                type="number"
                class="form-control"
                [class.is-invalid]="!portValid()"
                [value]="port()"
                (input)="onPortInput($event)"
                placeholder="Enter port number"
                min="1"
                max="65535"
              />
              @if (!portValid()) {
                <div class="invalid-feedback">
                  Port must be between 1 and 65535
                </div>
              }
            </div>
          </div>
          <div class="mt-2">
            <span 
              class="badge" 
              [class.bg-success]="portValid()" 
              [class.bg-danger]="!portValid()"
            >
              Port: {{ port() }} 
              @if (portValid()) {
                (Valid)
              } @else {
                (Invalid)
              }
            </span>
          </div>
        </div>
      </div>

      <!-- 5. Checkbox Input -->
      <div class="card mb-4">
        <div class="card-header">
          <h5>5. Checkbox Input</h5>
        </div>
        <div class="card-body">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              [checked]="isEnabled()"
              (change)="onEnabledChange($event)"
              id="enableCheckbox"
            />
            <label class="form-check-label fw-semibold" for="enableCheckbox">
              Enable Network Features
            </label>
          </div>
         <div class="mt-2">
            <span class="badge" [class.bg-success]="isEnabled()" [class.bg-secondary]="!isEnabled()">
              Status: {{ isEnabled() ? 'Enabled' : 'Disabled' }}
            </span>
          </div>
        </div>
      </div>

      <!-- 6. Select Dropdown -->
      <div class="card mb-4">
        <div class="card-header">
          <h5>6. Select Dropdown</h5>
        </div>
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-4">
              <label class="form-label fw-semibold">Protocol:</label>
            </div>
            <div class="col-md-8">
              <select 
                class="form-select" 
                [value]="selectedProtocol()"
                (change)="onProtocolChange($event)"
              >
                <option value="">Select a protocol</option>
                @for (protocol of protocols(); track protocol) {
                  <option [value]="protocol">{{ protocol }}</option>
                }
              </select>
            </div>
          </div>
          <div class="mt-2">
            <span class="badge bg-dark">
              Selected: 
              @if (selectedProtocol()) {
                {{ selectedProtocol() }}
              } @else {
                None
              }
            </span>
          </div>
        </div>
      </div>

      <!-- 7. Multiple Inputs with Form Object -->
      <div class="card mb-4">
        <div class="card-header">
          <h5>7. Network Configuration Form</h5>
        </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Hostname</label>
              <input
                type="text"
                class="form-control"
                [value]="networkConfig().hostname"
                (input)="onConfigInput('hostname', $event)"
                placeholder="Enter hostname"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">IP Address</label>
              <input
                type="text"
                class="form-control"
                [value]="networkConfig().ipAddress"
                (input)="onConfigInput('ipAddress', $event)"
                placeholder="Enter IP address"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Subnet Mask</label>
              <input
                type="text"
                class="form-control"
                [value]="networkConfig().subnetMask"
                (input)="onConfigInput('subnetMask', $event)"
                placeholder="Enter subnet mask"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Gateway</label>
              <input
                type="text"
                class="form-control"
                [value]="networkConfig().gateway"
                (input)="onConfigInput('gateway', $event)"
                placeholder="Enter gateway"
              />
            </div>
          </div>
          <div class="mt-3">
            <pre class="bg-dark text-light p-3 rounded">{{ networkConfig() }}</pre>
          </div>
        </div>
      </div>

      <!-- Computed Values Display -->
      <div class="card">
        <div class="card-header">
          <h5>Computed Values</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between">
                  <span>Network Length:</span>
                  <span class="badge bg-primary">{{ networkLength() }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Uppercase Network:</span>
                  <span class="badge bg-success">{{ uppercaseNetwork() }}</span>
                </li>
               <li class="list-group-item d-flex justify-content-between">
                  <span>Is Localhost:</span>
                  <span class="badge" [class]="isLocalhost() ? 'bg-warning text-dark' : 'bg-secondary'">
                    {{ isLocalhost() ? 'Yes' : 'No' }}
                  </span>
                </li>
              </ul>
            </div>
            <div class="col-md-6">
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between">
                  <span>Config Valid:</span>
                  <span 
                    class="badge" 
                    [class]="isConfigValid() ? 'bg-success' : 'bg-danger'"
                  >
                     {{ isConfigValid() ? 'Valid' : 'Invalid' }}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Total Changes:</span>
                  <span class="badge bg-info">{{ changeCount() }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Network History with @for -->
      <div class="card mt-4">
        <div class="card-header">
          <h5>Network History</h5>
        </div>
        <div class="card-body">
          @if (networkHistory().length > 0) {
            <ul class="list-group">
              @for (history of networkHistory(); track history; let i = $index) {
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  {{ history }}
                  <button class="btn btn-sm btn-outline-danger" (click)="removeFromHistory(i)">
                    Remove
                  </button>
                </li>
              }
            </ul>
          } @else {
            <p class="text-muted">No history yet. Start typing to see changes.</p>
          }
        </div>
      </div>

      <!-- Reset Button -->
      <div class="mt-4">
        <button class="btn btn-warning" (click)="resetAll()">Reset All</button>
      </div>
    </div>
  `,
  imports: [FormsModule] // Only FormsModule and JsonPipe needed
})
export class SignalPage {
  // Basic signals
  network = signal('sooraj');
  networkModel = 'sooraj';
  searchQuery = signal('');
  debouncedSearch = signal('');
  port = signal(8080);
  isEnabled = signal(true);
  selectedProtocol = signal('');
  protocols = signal(['HTTP', 'HTTPS', 'TCP', 'UDP', 'WebSocket']);
  changeCount = signal(0);
  networkHistory = signal<string[]>([]);

  // Form object signal with proper typing
  networkConfig = signal<NetworkConfig>({
    hostname: 'localhost',
    ipAddress: '192.168.1.1',
    subnetMask: '255.255.255.0',
    gateway: '192.168.1.254'
  });

  // Computed signals
  networkLength = computed(() => this.network().length);
  uppercaseNetwork = computed(() => this.network().toUpperCase());
  portValid = computed(() => {
    const portValue = this.port();
    return portValue >= 1 && portValue <= 65535;
  });
  isLocalhost = computed(() => this.network().toLowerCase().includes('localhost'));
  isConfigValid = computed(() => {
    const config = this.networkConfig();
    return config.hostname.length > 0 && 
           config.ipAddress.length > 0 && 
           config.subnetMask.length > 0;
  });

  private debounceTimer: any;

  constructor() {
    // Effect to demonstrate side effects
    effect(() => {
      console.log('Network changed to:', this.network());
      console.log('Network config:', this.networkConfig());
    });
  }

  // Input handlers
  onNetworkInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.network.set(value);
    this.addToHistory(value);
    this.incrementChangeCount();
  }

  onNetworkModelChange(): void {
    this.network.set(this.networkModel);
    this.addToHistory(this.networkModel);
    this.incrementChangeCount();
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
    
    // Debounce implementation
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.debouncedSearch.set(input.value);
    }, 300);
  }

  onPortInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const portValue = parseInt(input.value) || 0;
    this.port.set(portValue);
    this.incrementChangeCount();
  }

  onEnabledChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isEnabled.set(input.checked);
    this.incrementChangeCount();
  }

  onProtocolChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedProtocol.set(select.value);
    this.incrementChangeCount();
  }

  // Fixed config input handler
  onConfigInput(field: keyof NetworkConfig, event: Event): void {
    const input = event.target as HTMLInputElement;
    
    this.networkConfig.update(config => ({
      ...config,
      [field]: input.value
    }));
    
    this.incrementChangeCount();
  }

  // History management
  private addToHistory(value: string): void {
    this.networkHistory.update(history => {
      // Avoid duplicates in a row
      if (history.length > 0 && history[history.length - 1] === value) {
        return history;
      }
      return [...history, value];
    });
  }

  removeFromHistory(index: number): void {
    this.networkHistory.update(history => 
      history.filter((_, i) => i !== index)
    );
  }

  private incrementChangeCount(): void {
    this.changeCount.update(count => count + 1);
  }

  // Utility methods
  resetAll(): void {
    this.network.set('sooraj');
    this.networkModel = 'sooraj';
    this.searchQuery.set('');
    this.debouncedSearch.set('');
    this.port.set(8080);
    this.isEnabled.set(true);
    this.selectedProtocol.set('');
    this.networkConfig.set({
      hostname: 'localhost',
      ipAddress: '192.168.1.1',
      subnetMask: '255.255.255.0',
      gateway: '192.168.1.254'
    });
    this.changeCount.set(0);
    this.networkHistory.set([]);
  }
}