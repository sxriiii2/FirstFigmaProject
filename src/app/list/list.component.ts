// list.component.ts

import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AddComponent } from '../add/add.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users: any[] = [];
  selectedUser: any;
  userForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      address: [''],
      gender: [''],
      qualifications: this.fb.group({
        grade10: [false],
        grade12: [false],
        degree: [false]
      })
    });
  }

  ngOnInit() {
    this.userService.usersUpdated.subscribe((users: any[]) => {
      this.users = users;
    });
    this.users = this.userService.getUsers();
  }

  deleteUser(user: any) {
    this.userService.deleteUser(user.id);
    this.users = this.userService.getUsers();
  }

  openModal(user: any) {
    this.selectedUser = user;
    this.userForm.patchValue({
      name: user.name,
      address: user.address,
      gender: user.gender,
      qualifications: user.qualifications,
    });

    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeModal() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const updatedData = this.userForm.value;

      // Update the user data in the service
      this.userService.updateUser(updatedData);

      // Close the modal after submission
      this.closeModal();
    } else {
      this.userForm.markAllAsTouched();
    }
  }
  
  confirmUpdate() {
    // This function can be called to confirm the changes
    this.onSubmit();
  }
}






