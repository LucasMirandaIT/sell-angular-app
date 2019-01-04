import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { CarsService } from 'src/app/services/car.service';
import { MatDialog } from '@angular/material';
import { AddBrandModal } from 'src/app/modals/add-brand/add-brand.component';

@Component({
  selector: 'app-adm-area',
  templateUrl: './adm-area.component.html',
  styleUrls: ['./adm-area.component.scss']
})
export class AdmAreaComponent implements OnInit {

  users: User[];
  usersToAproove: User[];

  brandsDB;

  constructor(private profileService: ProfileService, private toastr: ToastrService, private carsService: CarsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.users = [];
    this.refreshUsers();
    this.getBrandsDB();
  }

  refreshUsers() {
    this.profileService.getUsersToAproove().toPromise().then((retorno: any) => {
      this.usersToAproove = retorno;
    });
    this.profileService.getUsers().toPromise().then((retorno: any) => {
      this.users = retorno;
    })
  }

  userAproove(user, action) {
    if (action == 'accept') {
      this.profileService.aprooveDeleteById(user._id).toPromise().then((retorno: any) => {
        this.profileService.aprooveCreateUser(user).toPromise().then((createRetorno: any) => {
          this.toastr.success('Usuário aprovado com sucesso', 'Sucesso!');
          this.refreshUsers();
        }).catch((err: any) => {
          this.toastr.error('Erro na aprovação do Usuário, solicite uma nova criação', 'Erro!');
        });
      }).catch((err: any) => {
        this.toastr.error('Erro na aprovação do Usuário, tente novamente', 'Erro!');
      });
    } else {
      this.profileService.aprooveDeleteById(user._id).toPromise().then((retorno: any) => {
        this.toastr.success('Usuário reprovado com sucesso', 'Sucesso!');
        this.refreshUsers();
      }).catch((err: any) => {
        this.toastr.error('Erro na reprovação do Usuário, tente novamente', 'Erro!');
      });
    }
  }

  getBrandsDB() {
    this.carsService.getBrandsDB().toPromise().then((retorno) => {
      this.brandsDB = retorno;
    });
  }

  openAddBrandModal() {
    const dialogRef = this.dialog.open(AddBrandModal, {
      width: '60%',
      height: '80%',
      data: {dbBrands: this.brandsDB}
    })
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        console.log('CLOSED MODAL');
        this.addNewBrand(result);
      }
    });
  }

  addNewBrand(newBrand) {
    for (let i = 0; i < this.brandsDB.length; i++) {
      for (let j = 0; j < newBrand.length; j++) {
        if(this.brandsDB[i].fipe_name === newBrand[j].fipe_name) {
          newBrand.splice(j, 1) //remove o item da posição "i" do array
        }        
      }
    }
    // for (let i = 0; i < newBrand.length; i++) {
    //   this.brandsDB.push(newBrand[i]);
    // }
    this.carsService.addDBBrand(newBrand).toPromise().then((retorno) => {
      this.toastr.success('Marcas adicionadas com sucesso!', 'Sucesso!');
      this.refreshBrandsList();
    });
    // this.carsService.addDBBrand(newBrand).toPromise().then((retorno)=> {
    // })
  }

  removeBrandFromDB(brand) {
    this.carsService.removeDBBrand(brand).toPromise().then((retorno: any) => {
      this.toastr.success(`Marca ${brand.fipe_name} deletada com sucesso!`, 'Sucesso!');
      this.refreshBrandsList();
    })
  }

  refreshBrandsList() {
    this.carsService.getBrandsDB().toPromise().then((retorno) => {
      this.brandsDB = retorno;
    });
  }


}
