import { Component } from '@angular/core';
import { HeroSection } from './hero-section/hero-section';
import { AboutUsSection } from './about-us-section/about-us-section';

@Component({
  selector: 'app-home',
  imports: [HeroSection, AboutUsSection, ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
