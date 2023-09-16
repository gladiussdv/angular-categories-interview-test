import {Component, OnDestroy, OnInit} from '@angular/core';
import {TemplatesRouteConst} from '../../consts/templates-route.const';
import {filter, map, Observable, startWith, Subscription, tap} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {NavMenuItem} from '../../../shared/models/nav-menu-item';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CategoriesService} from '../../services/categories.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit, OnDestroy {
  form: FormGroup;
  currentRoute$?: Observable<string>;
  tabs: Omit<NavMenuItem, 'icon'>[] = [
    {
      title: 'My templates',
      url: `${TemplatesRouteConst.PUBLISHED}`
    },
    {
      title: 'Archived',
      url: `${TemplatesRouteConst.ARCHIVED}`
    }
  ];

  searchSubscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly categoriesService: CategoriesService
  ) {
    this.form = this.formBuilder.group({
      search: ['']
    });
    this.searchSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.currentRoute$ = this.router.events.pipe(
      startWith(null),
      filter(event => event == null || event instanceof NavigationEnd),
      map(event => this.router.url),
      tap(() => {
        const search = this.form?.getRawValue()?.search ?? '';
        this.refreshData(search);
      })
    );
    this.searchSubscription.add(
      this.form.valueChanges.subscribe(v => {
        const search = v?.search ?? '';
        this.refreshData(search);
      })
    );
  }

  refreshData (search: string) {
    if (this.router.url.endsWith(TemplatesRouteConst.PUBLISHED)) {
      this.categoriesService.findPublished(search);
    } else if(this.router.url.endsWith(TemplatesRouteConst.ARCHIVED)) {
      this.categoriesService.findArchived(search);
    }
  }

  ngOnDestroy(): void {
  }


}
