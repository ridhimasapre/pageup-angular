import { group, style } from '@angular/animations';
import { FormatWidth } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
// import { from } from 'rxjs';
import { arrayData, infoData, usertype } from './usertype';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {


  //  form by using FormControl,formgroup
  //?-> can be null ,! definately assigned a value
  public myRegister !: FormGroup<usertype>;

  constructor() {
    // TODO : initializd myRegister
    // ({
    //   email:new FormControl('',[Validators.required,Validators.email]),
    //   password:new FormControl('',[Validators.required,Validators.minLength(5)]),
    //   firstname:new FormControl('',[Validators.required]),
    //     lastname:new FormControl('',[Validators.required]),
    //   info:new FormGroup<infoData>({
    //     address:new FormControl('',[Validators.required]),
    //     pincode:new FormControl(null,[Validators.required,Validators.minLength(6)]),
    //   })
    // });
  }
  ngOnInit(): void {
    this.myRegister = new FormGroup<usertype>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      arr: new FormArray<FormGroup>([
        new FormGroup({
          sem: new FormControl(null),
          branch: new FormControl('')
        })
      ]),
      info: new FormGroup<infoData>({
        address: new FormControl('', [Validators.required]),
        pincode: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      })
    });

  }



  // public myRegister: FormGroup<usertype>
  // form Array 
  //  public skill=new FormArray([
  //     new FormControl('skill1'),
  //     new FormControl('skill2')
  //   ]);
  //  public detail=new FormArray([
  //     new FormControl('7',{validators:[]}),
  //     new FormControl('cs')
  //   ]);
  // form by using form builder  
  // public myRegister: FormGroup<usertype>

  // public myRegister = this.formbuilder.group({
  //   email: ['', [Validators.required, Validators.email]],
  //   password: ['', [Validators.required, Validators.minLength(5)]],
  //   firstname: ['', Validators.required],
  //   lastname: ['', Validators.required],


  //   skill:new FormArray([
  //     new FormControl('skill1'),
  //     new FormControl('skill2')
  //   ]),


  //   detail: new FormArray([
  //     this.formbuilder.group({
  //       sem: new FormControl(''),
  //       branch: new FormControl('')
  //     })
  //   ]),
  //   info: this.formbuilder.group({
  //     address: ['', Validators.required],
  //     pincode: ['', [Validators.required, Validators.minLength(6)]],
  //   })
  // })

  // get detail(): FormArray {
  //   return this.myRegister.get('detail') as FormArray;
  // }
  // //  new input created and push that array into currArray
  addDetail() {
    let currArr = this.myRegister.controls.arr;
    let moreDetail = new FormGroup<arrayData>({
      sem: new FormControl(null),
      branch: new FormControl('')
    });
    currArr.push(moreDetail);
    console.log(currArr);
    // const moreDetail = new FormGroup({
    //   sem: new FormControl(''),
    //   branch: new FormControl('')
    // });
    // this..push(moreDetail);
    // console.log(this.arr.value);
  }
  remove(i: number) {
    let arr = this.myRegister.get('arr') as FormArray;
    arr.removeAt(i);
  }
  onSubmit() {
    if (this.myRegister.valid) {
      // Store form data
      const registeredData = this.myRegister.value;
      console.log('Registered Data :', registeredData);
      // console.log(currArr.);

      // localStorage.setItem('registeredUser', JSON.stringify(registeredData));
      console.log('User registered successfully:', registeredData);

      // Reset form fields
      this.myRegister.reset();
    }

  }


  // get pass(){    //pass ye wla name he deta hai ngif condition me  
  //   return this.myRegister.get('password')
  // }
  get email() {
    return this.myRegister.get('email')
  }
  get firstname() {
    // return this.myRegister.get('info')?.get('firstname')
    return this.myRegister.get('firstname')
  }
  get surname() {
    return this.myRegister.get('lastname')
  }

  // get skill(){
  //   return this.myRegister.get('skill')
  // }
  get pin() {
    return this.myRegister.get('info')?.get('pincode')
  }
  lowercase = "hello"
}

