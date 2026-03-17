---
name: use-mock-data-service
description: Guidance for using the MockDataService in this Angular app. Use when creating new components, features, or pages that need order or inventory demo data.
---

# Using MockDataService (Demo Data)

This project uses a single root-scoped mock service for all demo/stub data.
Never duplicate data inline in components — always inject the service.

## Key files

- `src/app/core/mock-data.service.ts` — the service (`providedIn: 'root'`)
- `src/app/core/order.model.ts` — shared interfaces (`Order`, `OrderDetail`, `InventoryItem`, `OwnerOption`, `OrderStatus`)

## How to inject into any standalone component

```typescript
import { inject } from '@angular/core';
import { MockDataService, OWNER_OPTIONS } from '../core/mock-data.service';
import type { Order, OrderDetail } from '../core/order.model';

export class MyComponent {
  private readonly mockData = inject(MockDataService);

  // Reactive list of all orders (Signal<Order[]>)
  readonly orders = this.mockData.orders;

  // Snapshot at construction time (plain array, won't react to future updates)
  private readonly allOrders: Order[] = this.mockData.orders();

  // Detail for a single order
  getDetail(id: number): OrderDetail | undefined {
    return this.mockData.getOrderDetail(id);
  }

  // Dropdown options for Owner/Creator selector
  readonly ownerOptions = OWNER_OPTIONS;
}
```

## Rules

- **Do not** add new data arrays inside components — add them to `mock-data.service.ts`.
- **Do not** add new interfaces inside components — add them to `order.model.ts`.
- The service is marked `// DEMO ONLY` — when real API endpoints are ready, replace `MockDataService` methods with HTTP calls; component code should not need to change.
- Use `inject()` (not constructor injection) per project standards.
- All public methods must have explicit return types (strict TypeScript).
