import { Employee } from "./employee.model";

export class Activity {
    idActivity?: number;
	state?: string;
    estimatedDate?: Date;
    name?: string;
	employeeId?: Employee;
}