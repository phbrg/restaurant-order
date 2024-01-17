import { Component } from '@angular/core';
import { CardComponent } from "./card/card.component";

@Component({
    selector: 'app-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
    imports: [CardComponent]
})
export class MenuComponent {

}
