import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { LocalStorageService } from 'src/app/@core/services/local-storage.service';

const onBoardingProcessKey = 'onBoardingProcess';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: { [key: string]: any }[] = [];
  isDisplayDialog: boolean = false;
  dataEditable: any;

  constructor(
    private localStorageService: LocalStorageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const data = this.localStorageService.getItem(onBoardingProcessKey);
    if (Object.keys(data).length === 0) return;
    this.products = data;
  }

  openForm(data?: any) {
    this.dataEditable = data;
    this.isDisplayDialog = true;
  }

  storeData(data: any): void {
    this.localStorageService.setItem(onBoardingProcessKey, data);
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message:
        'Would you like to delete this process? Once you delete a process, you won’t be able to restore it again',
      header: 'Delete Confirmation',
      accept: () => {
        this.products.splice(this.products.indexOf(product, 1));
        this.storeData(this.products);
        // save data
        this.getData();
      },
    });
  }

  onClose(): void {
    this.isDisplayDialog = false;
    this.dataEditable = undefined;
  }

  onSave(data: any): void {
    if (this.dataEditable !== undefined) {
      this.editItem(data);
      return;
    }
    this.products.push(data);
    this.storeData(this.products);
    this.onClose();
  }

  private editItem(data: any) {
    let index = this.products.findIndex((item) => item['id'] === data.id);
    this.products[index] = data;
    this.products = Object.assign([], this.products);
    this.storeData(this.products);
    this.getData();
    this.onClose();
  }
}
