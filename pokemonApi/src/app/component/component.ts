import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Pokemon } from '../service/api.service';

@Component({
  selector: 'app-component',
  imports: [CommonModule],
  templateUrl: './component.html',
  styleUrl: './component.css',
})
export class PokemonComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  loading: boolean = false;
  error: string = '';
  currentPage: number = 0;
  limit: number = 20;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Solo cargar la primera página (20 pokémones)
    this.currentPage = 0;
    this.loadPokemon();
  }

  loadPokemon(): void {
    this.loading = true;
    this.error = '';
    const offset = this.currentPage * this.limit;

    this.apiService.getPokemonList(this.limit, offset).subscribe({
      next: (response) => {
        const names = response.results.map(p => p.name);
        this.loadPokemonDetails(names);
      },
      error: (err) => {
        this.error = 'Error loading pokemon';
        this.loading = false;
        console.error(err);
      },
    });
  }

  private loadPokemonDetails(names: string[]): void {
    this.pokemonList = [];
    names.forEach((name) => {
      this.apiService.getPokemonByName(name).subscribe({
        next: (pokemon) => {
          this.pokemonList.push(pokemon);
          if (this.pokemonList.length === names.length) {
            this.loading = false;
          }
        },
        error: (err) => {
          console.error(`Error loading ${name}:`, err);
        },
      });
    });
  }

  getTypeNames(pokemon: Pokemon): string {
    return pokemon.types.map(t => t.type.name).join('/');
  }

  nextPage(): void {
    // Paginación deshabilitada - solo página 1
  }

  previousPage(): void {
    // Paginación deshabilitada - solo página 1
  }
}
