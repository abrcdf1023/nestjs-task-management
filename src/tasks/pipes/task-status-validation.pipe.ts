import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ]

  transform(value: any) {
    value.status = value.status.toUpperCase()    
    
    if (!this.isStatusValid(value.status)) {
      throw new BadRequestException(`"${value.status}" is an invalid status`)
    }

    return value
  }

  private isStatusValid(status:any) {
    const idx = this.allowedStatuses.indexOf(status)
    return idx !== -1
  }
}