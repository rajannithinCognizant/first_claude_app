import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  istDate = signal(this.getTodayDate());
  istTime = signal(this.getCurrentTime());

  private getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  private getCurrentTime(): string {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  estResult = computed(() => {
    const dateStr = this.istDate();
    const timeStr = this.istTime();
    if (!dateStr || !timeStr) return null;

    // IST is UTC+5:30, EST is UTC-5:00 (standard) / EDT UTC-4:00 (daylight)
    // Offset difference: IST to EST = -10:30 (standard) or -9:30 (daylight)
    const [hours, minutes] = timeStr.split(':').map(Number);
    const [year, month, day] = dateStr.split('-').map(Number);

    // Create a Date object treating input as IST (UTC+5:30)
    const istOffsetMinutes = 5 * 60 + 30;
    const totalMinutesFromMidnight = hours * 60 + minutes;
    const utcMinutes = totalMinutesFromMidnight - istOffsetMinutes;

    const utcDate = new Date(Date.UTC(year, month - 1, day));
    utcDate.setUTCMinutes(utcDate.getUTCMinutes() + utcMinutes);

    // Determine if EST or EDT applies based on US DST rules
    const isDST = this.isUSDST(utcDate);
    const estOffsetMinutes = isDST ? -4 * 60 : -5 * 60;

    const estDate = new Date(utcDate.getTime() + estOffsetMinutes * 60 * 1000);

    return {
      date: estDate.toISOString().split('T')[0],
      time: this.formatTime(estDate.getUTCHours(), estDate.getUTCMinutes()),
      time12: this.formatTime12(estDate.getUTCHours(), estDate.getUTCMinutes()),
      timezone: isDST ? 'EDT (UTC-4)' : 'EST (UTC-5)',
      utcTime: this.formatTime(utcDate.getUTCHours(), utcDate.getUTCMinutes()),
    };
  });

  private isUSDST(utcDate: Date): boolean {
    // US DST: Second Sunday of March to First Sunday of November
    const year = utcDate.getUTCFullYear();

    const dstStart = this.getNthSundayOfMonth(year, 2, 2); // 2nd Sunday of March
    const dstEnd = this.getNthSundayOfMonth(year, 10, 1);  // 1st Sunday of November

    // DST starts at 2am EST (7am UTC), ends at 2am EDT (6am UTC)
    const dstStartUTC = new Date(Date.UTC(year, 2, dstStart, 7));
    const dstEndUTC = new Date(Date.UTC(year, 10, dstEnd, 6));

    return utcDate >= dstStartUTC && utcDate < dstEndUTC;
  }

  private getNthSundayOfMonth(year: number, month: number, n: number): number {
    const firstDay = new Date(Date.UTC(year, month, 1));
    const firstSunday = (7 - firstDay.getUTCDay()) % 7;
    return 1 + firstSunday + (n - 1) * 7;
  }

  private formatTime(hours: number, minutes: number): string {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  private formatTime12(hours: number, minutes: number): string {
    const period = hours >= 12 ? 'PM' : 'AM';
    const h = hours % 12 || 12;
    return `${String(h).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
  }

  onDateChange(value: string) {
    this.istDate.set(value);
  }

  onTimeChange(value: string) {
    this.istTime.set(value);
  }

  setCurrentTime() {
    this.istDate.set(this.getTodayDate());
    this.istTime.set(this.getCurrentTime());
  }
}
