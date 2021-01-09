import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { PurchaseQuotationComponent } from "./purchase-quotation/purchase-quotation.component";
import { PurchaseVoucherItemRowComponent } from "./purchase-voucher-item-row/purchase-voucher-item-row.component";
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { VoucherSubItemComponent } from './voucher-sub-item/voucher-sub-item.component';
import { VoucherBillSundryComponent } from './voucher-bill-sundry/voucher-bill-sundry.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    PurchaseQuotationComponent,
    PurchaseVoucherItemRowComponent,
    ExpansionPanelComponent,
    VoucherSubItemComponent,
    VoucherBillSundryComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
