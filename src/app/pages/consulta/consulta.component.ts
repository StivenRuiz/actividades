import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { Response } from 'src/app/models/utils/response.model';
import { ActivityService } from 'src/app/service/activity.service';
import * as moment from 'moment';
import { ActivityWithDays } from '../models/activityWithDays.model';

@Component({
  selector: 'consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  constructor(private activityService: ActivityService,
    private router: Router) {}

  public activitiesWithDays: Array<ActivityWithDays> = [];

  public messageResponse: any = "";

  ngOnInit() {
    this.loadActivities();
  }

  loadActivities() {
    this.activitiesWithDays = [];
    this.activityService.getActivities().subscribe(
      (response: Response<Activity>) => {
        if (response.data && response.data.length > 0) {
          this.createDayRetarded(response.data);
        }
      })
  }

  createDayRetarded(activities: Array<Activity>) {
    activities.forEach(activity => {
      let activityWithDay : ActivityWithDays = new ActivityWithDays();
      activityWithDay.activity = activity;
      activityWithDay.days = moment(new Date()).diff(moment(activity.estimatedDate), 'days');
      this.activitiesWithDays.push(activityWithDay);
    });
  }

  goToCreate(edit: boolean = false, activity?: Activity) {
    if (edit) localStorage.setItem('activityToEdit', JSON.stringify(activity));
    this.router.navigateByUrl("/creacion");
  }

  deleteActivity(idActivity: any) {
    this.activityService.deleteActivity(idActivity).subscribe(
      (response: Response<Activity>) => {
        if (response.ok) {
          this.messageResponse = response.message;
          this.loadActivities();
        }
      }
    )
  }
}
