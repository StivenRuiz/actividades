import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { Employee } from 'src/app/models/employee.model';
import { Response } from 'src/app/models/utils/response.model';
import { ActivityService } from 'src/app/service/activity.service';

@Component({
  selector: 'creacion',
  templateUrl: './creacion.component.html',
  styleUrls: ['./creacion.component.css']
})
export class CreacionComponent implements OnInit {

  messageResponse: any = "";

  constructor(
    private activityForm: FormBuilder,
    private activityService: ActivityService,
    private router: Router
    ) {}

  public createActivity: FormGroup = this.activityForm.group({
    activity: ["", Validators.required],
    state: ["", Validators.required],
    estimatedDate: ["", Validators.required],
    employee: [null, Validators.required]
  });

  public employees: Array<Employee> = [];

  public states: Array<string> =[
    "PENDIENTE",
    "REALIZADO"
  ]

  private activityEdit: Activity = new Activity();

  public isEdit: boolean = false;

  get f(): { [key: string]: AbstractControl } {
    return this.createActivity.controls;
  }

  ngOnInit() {
    this.activityService.getEmployees().subscribe(
      (response: Response<Employee>) => {
        if (response.data && response.data.length > 0) {
          this.employees = response.data;
        }
      })
    let activityToEdit = localStorage.getItem('activityToEdit');
    if (activityToEdit) {
      this.editActivity(JSON.parse(activityToEdit));
    }
  }

  editActivity(activity: Activity){
    this.activityEdit = activity;
    this.isEdit = true;
    this.createActivity.controls['activity'].setValue(activity.name);
    this.createActivity.controls['activity'].disable();
    this.createActivity.controls['state'].setValue(activity.state);
    this.createActivity.controls['employee'].setValue(activity.employeeId)
    this.createActivity.controls['employee'].disable();
    this.createActivity.controls['estimatedDate'].setValue(activity.estimatedDate)
    this.createActivity.controls['estimatedDate'].disable();
  }

  goToCancel() {
    localStorage.clear();
    this.goToConsulta();
  }

  goToConsulta() {
    this.router.navigateByUrl("/consulta");
  }

  onSubmit() {
    let activity: Activity = new Activity();
    activity.name = this.createActivity.controls['activity'].value;
    activity.employeeId = this.createActivity.controls['employee'].value;
    activity.estimatedDate = this.createActivity.controls['estimatedDate'].value;
    if (this.isEdit) activity = this.activityEdit;
    activity.state = this.createActivity.controls['state'].value;
    this.activityService.postActivity(activity).subscribe((resp: Response<Activity>) => {
      if (resp.ok) {
        this.messageResponse = resp.message;
        localStorage.clear();
      }
    })
  }
}
