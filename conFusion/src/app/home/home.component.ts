import { Component, OnInit ,Inject} from '@angular/core';

import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionService} from '../services/promotion.service';
import {LeaderService} from '../services/leader.service';
import {Leader} from '../shared/leader';
import { flyInOut ,expand} from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host:{
 '[@flyInOut]':'truel',
 'style':'display:block;'
  },
  animations:[flyInOut(),
    expand()
  ]

})
export class HomeComponent implements OnInit {
dish:Dish
promotion :Promotion;
leader: Leader;
dishErrMess : string ; 
  constructor(private dishservice : DishService,
    private promptionservice:PromotionService,
    private leaderService :LeaderService,
    @Inject('BaseURL') private BaseURL,
  ) { }

  ngOnInit() {
     this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,errmess => this.dishErrMess = <any>errmess);
     this.promptionservice.getFeaturedPromotion().subscribe(promotion =>this.promotion = promotion);
     this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader); 
  }

}
