import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../services/address.service'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  standalone: true,
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddressFormComponent implements OnInit {
  addressForm!: FormGroup;
  addressId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.addressId = +id;
        this.addressService.getAddressById(this.addressId).subscribe(address => {
          this.addressForm.patchValue(address);
        });
      }
    });
  }

  submitForm() {
    if (this.addressForm.valid) {
      if (this.addressId) {
        this.addressService.updateAddress(this.addressId, this.addressForm.value).subscribe(() => {
          this.router.navigate(['/addresses']);
        });
      } else {
        this.addressService.addAddress(this.addressForm.value).subscribe(() => {
          this.router.navigate(['/addresses']);
        });
      }
    }
  }
}