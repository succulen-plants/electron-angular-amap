import { Component } from '@angular/core';

@Component({
  selector: 'header-logo',
  template: `
    <div class="alain-default__header-logo">
      <a [routerLink]="['/']" class="alain-default__header-logo-link">
        <!--<img-->
        <!--class="alain-default__header-logo-expanded"-->
        <!--src="/assets/img/sec-logo.png"-->
        <!--/>-->
        <span class="alain-default__header-logo-expanded">HXKJ</span>
        <span class="alain-default__header-logo-collapsed">HXKJ</span>
        <!--<img-->
        <!--class="alain-default__header-logo-collapsed"-->
        <!--src="./assets/dmp-logo.png"-->
        <!--alt="{{ settings.app.name }}"-->
        <!--style="max-height:30px;"-->
        <!--/>-->
      </a>
    </div>
  `,
  styles:[`
    a{color:#fff; font-size: 20px; }
    img{width: 85px; height: 32px;margin-left: 15px}
    .alain-default__header-logo{width: auto}
    span.alain-default__header-logo-expanded{
      margin-left: 15px;
      border-left: 1px solid rgba(255,255,255,0.3);
      padding-left: 15px;
    }
    .alain-default__header-logo-collapsed{
      margin-left: 15px;
    }

  `]
})
export class HeaderLogoComponent {
}
