import { Injectable } from "@nestjs/common";

@Injectable()
export class DateService {
  private readonly THREE_WEEKS_IN_DAYS = 21;

  getThreeWeeksAgoISO() {
    const currentDate = new Date();
    const threeWeeksBefore = new Date(currentDate);
    threeWeeksBefore.setDate(currentDate.getDate() - this.THREE_WEEKS_IN_DAYS);
    return threeWeeksBefore.toISOString();
  }
}
