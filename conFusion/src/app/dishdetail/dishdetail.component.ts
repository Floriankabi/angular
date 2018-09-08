import { Component, OnInit,inject, Inject} from '@angular/core';

import {Params,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Dish } from '../shared/dish'
import {DishService} from '../services/dish.service'
import { switchMap } from 'rxjs/operators';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Feedback,ContactType} from '../shared/feadback';
import {Comment} from '../shared/comment';
import { trigger, state, style, animate, transition, animation } from '@angular/animations';
import {vidibility,flyInOut,expand} from '../animations/app.animation';

import 'rxjs/add/operator/switchMap'
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host:{
    '[@flyInOut]':'truel',
    'style':'display:block;'
     },
     animations:[flyInOut(),
      vidibility(),
      expand(),
    ]

})
export class DishdetailComponent implements OnInit {

  DishDetailsForm: FormGroup;
  feedback: Feedback;
  dish:Dish;
  dishcopy =null;
  newdish:Dish
  dishIds:number[];
  prev: number;
  next:number;
  dishComments:Comment;
  errMess : string;
  visibility ='shown';
  constructor(
    private dishservice : DishService,
    private route :ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURl,
  ) 
  { 
    this.createForm();
  }
  formErrors ={
    'author':'',
    'comment':'',
    'slider':'',
    
  };
    
  validationMessages = {
    'author': {
      'required':'First Name is required.',
      'minlength':'First Name must be at least 2 characters long.',
      'maxlength':'FirstName cannot be more than 25 characters long.'
    },
    'comment': {
      'required':'Last Name is required.',
      'minlength':'Last Name must be at least 2 characters long.',
      'maxlength':'Last Name cannot be more than 25 characters long.'
    },
    'slider': {
    },
   
  };

  ngOnInit() {
    this.dishservice.getDishIds()
    .subscribe(dishIds =>this.dishIds = dishIds);
     
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess);
  }
    setPrevNext(dishId: number) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }
  createForm (): void {
      this.DishDetailsForm = this.fb.group({
      author: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      comment: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(255)]],
      slider : '',
      });
      this.DishDetailsForm.valueChanges.subscribe(data => this.onValueChanged(data))
      this.onValueChanged();
    } 
    onValueChanged(data?: any) {
      if (!this.DishDetailsForm) { return; }
      const form = this.DishDetailsForm;
      for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
          // clear previous error message (if any)
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }
  onSubmit() {
      this.feedback = this.DishDetailsForm.value;
      this.dishComments =new Comment;
      this.dishComments.comment =this.DishDetailsForm.value.comment;
      this.dishComments.rating =this.DishDetailsForm.value.slider;
      this.dishComments.author =this.DishDetailsForm.value.author;
      
      this.dishComments.date = Date.now().toString();
      this.dishcopy.comments.push(this.dishComments);
      this.dishcopy.save().subscribe(dish =>this.dish =dish);
      this.dishservice.postDish(this.dish);
      console.log(this.feedback);
      this.DishDetailsForm.reset({
        author: '',
        comment: '',
        slider : 5,
      });
      
    }
   
    
}

