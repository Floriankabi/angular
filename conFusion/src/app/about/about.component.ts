import { Component, OnInit ,Inject} from '@angular/core';

import {Params,ActivatedRoute} from '@angular/router';
import {LeaderService} from '../services/leader.service';
import {Leader} from '../shared/leader';
import { flyInOut ,expand} from '../animations/app.animation';

  @Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host:{
 '[@flyInOut]':'truel',
 'style':'display:block;'
  },
  animations:[flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  
  leaders:  Leader[];

  constructor(private leaderService :LeaderService,
    @Inject('BaseURL') private BaseURl) { }

  ngOnInit() {
     this.leaderService.getLeaders().subscribe(leaders=>this.leaders =leaders);
  }

}
