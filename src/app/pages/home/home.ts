import { Component } from '@angular/core';
import { HeroSection } from './hero-section/hero-section';
import { AboutUsSection } from './about-us-section/about-us-section';
import { WhyJoinSection } from './why-join-section/why-join-section';
import { WhoCanParticipateSection } from './who-can-participate-section/who-can-participate-section';
import { ProjectCategoriesSection } from './project-categories-section/project-categories-section';
import { TimelineSection } from './timeline-section/timeline-section';
import { JudigingSection } from './judiging-section/judiging-section';
import { NeedHelpSection } from './need-help-section/need-help-section';

@Component({
  selector: 'app-home',
  imports: [HeroSection, AboutUsSection, WhyJoinSection, WhoCanParticipateSection, ProjectCategoriesSection, TimelineSection, JudigingSection, NeedHelpSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
