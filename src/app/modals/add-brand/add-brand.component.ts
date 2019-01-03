import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CarsService } from 'src/app/services/car.service';

@Component({
  selector: 'add-brand-modal',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})

export class AddBrandModal implements OnInit {

  dbBrands;

  selectedBrands = [];
  brandsFipe = [];

  constructor(
    private dialogRef: MatDialogRef<AddBrandModal>,
    private carsService: CarsService,
    @Inject(MAT_DIALOG_DATA) public modalData
  ) { }

  ngOnInit() {
    this.refreshFipeBrands();
  }

  refreshFipeBrands() {
    this.carsService.getBrandsFipe().toPromise().then((retorno: any) => {
      this.brandsFipe = retorno;
    });
  }

  checkDiff() {
    array2.diff(array1);
  }

  closeDialog() {
    console.log('Clicked');
    this.dialogRef.close(this.selectedBrands);
  }

  selectBrand(brand, $event) {
    if ($event.checked == true) {
      delete brand.id;
      this.selectedBrands.push(brand);
    } else {
      for (let i = 0; i < this.selectedBrands.length; i++) {
        delete this.selectedBrands[i].id;
        if (this.selectedBrands[i].fipe_name == brand.fipe_name) {
          this.selectedBrands.splice(i, 1);
        }
      }
    }
  }
}
