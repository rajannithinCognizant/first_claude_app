import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';

interface AEOption { label: string; value: string; }

interface InventoryType { key: string; label: string; hasInfo: boolean; }

const ACCOUNT_EXECUTIVES: AEOption[] = [
  { label: 'Nithin Rajan', value: 'nithin' },
];

const INVENTORY_TYPES: InventoryType[] = [
  { key: 'audience_tv',           label: 'Audience (TV)',           hasInfo: false },
  { key: 'fixed_lines_tv',        label: 'Fixed Lines (TV)',        hasInfo: true  },
  { key: 'sports_bundle_tv',      label: 'Sports Bundle (TV)',      hasInfo: false },
  { key: 'streaming',             label: 'Streaming',               hasInfo: false },
  { key: 'streaming_live_sports', label: 'Streaming - Live Sports', hasInfo: true  },
  { key: 'audience_addressable',  label: 'AudienceAddressable',     hasInfo: true  },
];

@Component({
  selector: 'app-create-proposal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CheckboxModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
  ],
  templateUrl: './create-proposal.component.html',
  styleUrl: './create-proposal.component.css'
})
export class CreateProposalComponent {
  readonly accountExecutives: AEOption[] = ACCOUNT_EXECUTIVES;
  readonly inventoryTypes: InventoryType[] = INVENTORY_TYPES;

  proposalName = '';
  selectedAE = 'nithin';
  advertiserName = '';
  agency = 'No Agency';
  startDate: Date | null = null;
  endDate: Date | null = null;
  selectedInventory: string[] = [];
  markets = signal<string[]>(['Atlanta']);

  removeMarket(market: string): void {
    this.markets.update(list => list.filter(m => m !== market));
  }

  onNext(): void {}
}
