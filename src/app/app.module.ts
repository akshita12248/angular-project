import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { PurchaseQuotationComponent } from "./purchase-quotation/purchase-quotation.component";
import { PurchaseVoucherItemRowComponent } from "./purchase-voucher-item-row/purchase-voucher-item-row.component";

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
    PurchaseVoucherItemRowComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
