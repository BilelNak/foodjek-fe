import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantsService } from '../restaurants.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allRestaurants: Restaurant[] = [];

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    console.log("entreing Restaurants module ..................... ");
    this.get();
  }
 
  get() {
    this.restaurantsService.get().subscribe((data) => {
      this.allRestaurants = data;
    });
  }

}