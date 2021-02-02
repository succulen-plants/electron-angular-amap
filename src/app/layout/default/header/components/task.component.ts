import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'header-task',
  template: `
    <div
      class="alain-default__nav-item"
      nz-dropdown
      [nzDropdownMenu]="taskMenu"
      nzTrigger="click"
      nzPlacement="bottomRight"
      (nzVisibleChange)="change()"
    >
      <nz-badge [nzDot]="true">
        <i nz-icon nzType="bell" class="alain-default__nav-item-icon"></i>
      </nz-badge>
    </div>
    <nz-dropdown-menu #taskMenu="nzDropdownMenu">
      <div nz-menu class="wd-lg">
        <div *ngIf="loading" class="mx-lg p-lg"><nz-spin></nz-spin></div>
        <nz-card *ngIf="!loading" [nzTitle]="cardTitle"  style="width:420px;"
                 nzBordered="false" class="ant-card__body-nopadding ">
          <ng-template #extra><i nz-icon nzType="plus"></i></ng-template>
          <ng-template #cardTitle >
            <i nz-icon nzType="bell" nzTheme="outline" class="text-primary-light " style=" font-size: 18px;"></i>
            <strong class="pl-md ">系统通知</strong>
          </ng-template>
          <div
            nz-row
            [nzType]="'flex'"
            [nzJustify]="'center'"
            [nzAlign]="'middle'"
            class="py-md px-sm bg-grey-lighter-h point"
            *ngFor="let item of list"
          >
            <div nz-col [nzSpan]="3" class="text-center" *ngIf="item.title === '定时任务'">
              <i nz-icon nzType="clock-circle" nzTheme="outline" style=" font-size: 16px;"></i>
            </div>
            <div nz-col [nzSpan]="3" class="text-center" *ngIf="item.title === '触发规则'">
              <i nz-icon nzType="bell" nzTheme="outline" style=" font-size: 16px;"></i>
            </div>
            <div nz-col [nzSpan]="15">
              <span class="mb0">{{item.content}}
              </span>
            </div>
            <div nz-col [nzSpan]="6">
              <span style="float: right;margin-right: 10%">{{item.date}}</span>
            </div>
          </div>
          <div nz-row>
            <div nz-col [nzSpan]="24" class="pt-md border-top-1 text-center text-grey point">
              <span class="text-primary-light"> 查看更多</span>
            </div>
          </div>
        </nz-card>
      </div>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderTaskComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  loading = true;
  // 推送list
  list = [
    {
      title: '定时任务',
      content: '每天上午6点定时路灯关灯已执行',
      date: new Date().getFullYear() + '/' + (new Date().getMonth()+1) + '/' +new Date().getDate(),
    },
    {
      title: '定时任务',
      content: '每天下午7点定时路灯开灯已执行',
      date: new Date().getFullYear() + '/' + (new Date().getMonth()+1) + '/' +new Date().getDate(),
    },
    {
      title: '定时任务',
      content: '每天上午8点定时路灯闪测已执行',
      date: new Date().getFullYear() + '/' + (new Date().getMonth()+1) + '/' +new Date().getDate(),
    },
    {
      title: '触发规则',
      content: '"井盖-HN-01"设备倾斜角度30度，触发规则已触发',
      date: new Date().getFullYear() + '/' + (new Date().getMonth()+1) + '/' +new Date().getDate(),
    },
  ];


  change() {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 500);
  }
}
