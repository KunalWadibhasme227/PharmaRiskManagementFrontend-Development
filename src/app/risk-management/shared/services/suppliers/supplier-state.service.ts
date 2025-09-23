// supplier-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SupplierStateService {
  private selectedSupplier$ = new BehaviorSubject<any | null>(null);

  setSupplier(supplier: any) {
    this.selectedSupplier$.next(supplier);
  }

  getSupplier() {
    return this.selectedSupplier$.asObservable();
  }

  getCurrentSupplier() {
    return this.selectedSupplier$.value;
  }
}
