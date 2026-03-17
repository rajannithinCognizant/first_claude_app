import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { PaginatorModule } from 'primeng/paginator';
import { DatePickerModule } from 'primeng/datepicker';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MockDataService, OWNER_OPTIONS } from '../core/mock-data.service';
import type { Order, OrderDetail } from '../core/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TagModule,
    PaginatorModule,
    DatePickerModule,
    IconFieldModule,
    InputIconModule,
    RouterLink
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  readonly Math = Math;

  private readonly mockData = inject(MockDataService);

  readonly ownerOptions = OWNER_OPTIONS;

  selectedOwner = 'owner';
  searchName = 'Nithin Rajan';
  searchQuery = signal('');
  startDate: Date | null = null;
  endDate: Date | null = null;
  currentPage = signal(0);
  rowsPerPage = signal(8);
  private expandedIds = new Set<number>();

  private readonly allOrders: Order[] = this.mockData.orders();

  filteredOrders = computed(() => {
    const q = this.searchQuery().toLowerCase();
    if (!q) return this.allOrders;
    return this.allOrders.filter(o =>
      o.orderName.toLowerCase().includes(q) ||
      o.advertiser.toLowerCase().includes(q) ||
      o.market.toLowerCase().includes(q)
    );
  });

  paginatedOrders = computed(() => {
    const start = this.currentPage() * this.rowsPerPage();
    return this.filteredOrders().slice(start, start + this.rowsPerPage());
  });

  totalRecords = computed(() => this.filteredOrders().length);

  getDetail(orderId: number): OrderDetail | undefined {
    return this.mockData.getOrderDetail(orderId);
  }

  toggleRow(orderId: number): void {
    if (this.expandedIds.has(orderId)) {
      this.expandedIds.delete(orderId);
    } else {
      this.expandedIds.add(orderId);
    }
    this.expandedIds = new Set(this.expandedIds);
  }

  isExpanded(orderId: number): boolean {
    return this.expandedIds.has(orderId);
  }

  onPageChange(event: any): void {
    this.currentPage.set(event.page);
    this.rowsPerPage.set(event.rows);
    this.expandedIds = new Set();
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'SuccessToAOS': return 'Success To AOS';
      default: return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'ActiveSchedule': return 'status-active';
      case 'Expired': return 'status-expired';
      case 'SuccessToAOS': return 'status-success';
      case 'Submitted': return 'status-submitted';
      default: return '';
    }
  }

  onGo(): void {}
  onExport(): void {}
}
