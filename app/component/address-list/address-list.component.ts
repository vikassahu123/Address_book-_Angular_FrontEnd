// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// interface Address {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;

// }

// @Component({
//   selector: 'app-address-list',
//   imports: [CommonModule, RouterModule],
//   templateUrl: './address-list.component.html',
//   styleUrls: ['./address-list.component.scss']
// })

// export class AddressListComponent {
//   addresses : Address[] = [
//     { id: 1, name: 'Sonu Sharma', email: 'sonusharmaworkspacegmail.com', phone: '2849785875' },
//     { id: 2, name: 'Saurabh Sharma', email: 'saurabhsince21st@gmail.com', phone: '987-654-3210' }
//   ];
//   deleteAddress(id: number){
//     this.addresses= this.addresses.filter(address => address.id !== id);
//   }

// }

import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service'; 
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-address-list',
  standalone: true,
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss'],
  imports: [RouterModule, CommonModule, MatButtonModule, MatTableModule, MatIconModule, MatCardModule]
})
export class AddressListComponent implements OnInit {
  addresses: any[] = [];

  constructor(private addressService: AddressService) {}

  ngOnInit() {
    this.addressService.getAddresses().subscribe((data) => {
      console.log('Fetched addresses:', data);
      this.addresses = data;
    });
  }

  loadAddresses() {
    this.addressService.getAddresses().subscribe((data) => {
      this.addresses = data;
    });
  }

  deleteAddress(id: number) {
    console.log('Deleting address with ID:', id);
    if (!id) {
      console.error('Invalid ID:', id);
      return;
    }

    this.addressService.deleteAddress(id).subscribe(() => {
      this.loadAddresses();
    }, error => {
      console.error('Error deleting address:', error);
    });
  }



}
