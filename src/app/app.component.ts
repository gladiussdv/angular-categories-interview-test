import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ImagesConst} from './shared/consts/images.const';
import {NavMenuItem} from './shared/models/nav-menu-item';
import {AppRouteConst} from './shared/consts/app-route.const';
import {NavigationEnd, Router} from '@angular/router';
import {filter, map, Observable} from 'rxjs';
import {MatDrawerMode} from '@angular/material/sidenav';

enum MenuIcons {
  home = 'home',
  templates = 'list'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  logo = ImagesConst.LOGO;
  currentRoute$?: Observable<string>;
  navigationMenuList: NavMenuItem[] = [
    {
      title: 'Dashboard',
      url: `/${AppRouteConst.DASHBOARD}`,
      icon: MenuIcons.home
    },
    {
      title: 'Templates',
      url: `/${AppRouteConst.TEMPLATES}`,
      icon: MenuIcons.templates
    }
  ];

  sidenavOpened = false;
  sidenavMode: MatDrawerMode = 'side';

  constructor(private readonly router: Router) {}


  ngOnInit(): void {
    this.currentRoute$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => this.router.url)
    );
    this.handleResize();
  }

  openSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  @HostListener('window:resize', ['$event'])
  handleResize() {
    const windowWidth = window.innerWidth;
    if (windowWidth > 598) {
      this.sidenavOpened = true;
      this.sidenavMode = 'side';
    } else {
      this.sidenavOpened = false;
      this.sidenavMode = 'over';
    }
  }
}
