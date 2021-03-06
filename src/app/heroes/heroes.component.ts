import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  // reserve constructor for simple initialization only
  constructor(private heroService: HeroService) { }

  // get data on ngOnInit
  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    // print response object
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    // if 'name' is not blank, will create a Hero obj without the id
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero) {
    // removes hero from list
    this.heroes = this.heroes.filter(h => h !== hero);
    // messages service in order to delete hero from "DB"
    // should subscribe, even if the response is not used
    // if not, the service will not send the delete request to the server!
    // An Observable does nothing until something subscribes!
    this.heroService.delete(hero).subscribe();
  }

}
