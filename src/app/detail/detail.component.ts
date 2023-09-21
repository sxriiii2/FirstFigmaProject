// detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  userForm: FormGroup;
  user: any; // Declare the user property
  formData: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService // Inject the UserService
  ) {
    this.userForm = this.formBuilder.group({
      name: [''],
      address: [''],
      gender: [''],
      education: this.formBuilder.group({
        grade10: [false],
        grade12: [false],
        degree: [false]
      }),
      phone: [''],
      image: [null],
      skill: [''],
      skills: this.formBuilder.array([]),
      personalizedSkills: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const name = params['name'];
      // Retrieve the user data by name from your service (userService, not formData)
      this.user = this.userService.getUserByName(name);
      
      if (this.user) {
        // Set the form values with the user's data
        this.userForm.patchValue(this.user); // Update formData to user
      }
      console.log(this.userForm)
    });
  }
}
