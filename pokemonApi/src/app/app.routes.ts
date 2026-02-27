import { Routes } from '@angular/router';
import { PokemonComponent } from './component/component';

export const routes: Routes = [
  { path: '', component: PokemonComponent },
  { path: 'pokemon', component: PokemonComponent },
];
