import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  userForm: FormGroup | null = null;
  imagePreview: string | null = null;
  selectedImage: string | ArrayBuffer | null = null;  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
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
      personalizedSkills: this.formBuilder.array([
        this.formBuilder.control('')
      ])
    });
  }

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Read the selected image as a base64 string
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        // Set the base64 image data in the form control
        this.userForm?.get('image')?.setValue(this.imagePreview);
      };
      reader.readAsDataURL(file);
    }
  }

  toggleSkillDisplay() {
    const skill = this.userForm?.get('skill')?.value;
    if (skill && skill.trim() !== '' && this.userForm) {
      const skillsArray = this.userForm.get('skills') as FormArray;
      skillsArray.push(this.formBuilder.control(skill));
    }
    this.userForm?.get('skill')?.setValue('');
  }

  addPersonalizedSkill() {
    const personalizedSkills = this.userForm?.get('personalizedSkills') as FormArray;
    personalizedSkills.push(this.formBuilder.control(''));
  }

  removePersonalizedSkill(index: number) {
    const personalizedSkills = this.userForm?.get('personalizedSkills') as FormArray;
    personalizedSkills.removeAt(index);
  }

  resetForm() {
    if (this.userForm) {
      this.userForm.reset();
      this.imagePreview = null;
      const skillsArray = this.userForm.get('skills') as FormArray;
      skillsArray.clear();
    }
  }

  onSubmit() {
    if (this.userForm) {
      const user = this.userForm.value;
      this.userService.addUser(user); // Add the user to the UserService
    }
  }

  togglePersonalizedSkillInput() {
    if (this.userForm) {
      const personalizedSkillsFormArray = this.userForm.get('personalizedSkills') as FormArray;

      const lastControlVisible = personalizedSkillsFormArray.length === 0 || personalizedSkillsFormArray.at(personalizedSkillsFormArray.length - 1).value !== '';

      if (lastControlVisible) {
        personalizedSkillsFormArray.push(this.formBuilder.control(''));
      } else {
        personalizedSkillsFormArray.removeAt(personalizedSkillsFormArray.length - 1);
      }
    }
  }

  get personalizedSkillsFormArray(): FormArray | null {
    return this.userForm?.get('personalizedSkills') as FormArray;
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        // Set the selectedImage with the data URL
        this.selectedImage = reader.result;
      };
    }
  }
  
}
