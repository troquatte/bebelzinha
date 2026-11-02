import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-recipe-tools',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './recipe-tools.component.scss',
  template: `
    <section class="tools" aria-labelledby="recipe-tools-title">
      <h3 id="recipe-tools-title">Utensílios que ajudam</h3>
      <p>Use o que você já tem. Estas serão sugestões opcionais.</p>
      <div class="tools-grid">
        <div><span class="material-symbols-outlined" aria-hidden="true">inventory_2</span><strong>Potes com tampa</strong><span>Para separar porções</span></div>
        <div><span class="material-symbols-outlined" aria-hidden="true">grid_view</span><strong>Formas para porcionar</strong><span>Quando fizer sentido no preparo</span></div>
        <div><span class="material-symbols-outlined" aria-hidden="true">sell</span><strong>Etiquetas</strong><span>Para identificar o que guardou</span></div>
      </div>
      <span class="tools-note">Espaço reservado para sugestões de afiliados da Shopee, sem produtos ou links de compra por enquanto.</span>
    </section>
  `,
})
export class RecipeToolsComponent {}
