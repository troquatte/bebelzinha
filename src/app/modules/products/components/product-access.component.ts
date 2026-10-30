import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SeoService } from '../../../core/seo.service';
import { ProductAccessService } from '../service/product-access.service';

@Component({
  selector: 'app-product-access',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-access.component.html',
  styleUrl: './product-access.component.scss',
})
export class ProductAccessComponent {
  readonly access = inject(ProductAccessService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly code = signal('');
  readonly busy = signal(false);
  readonly error = signal('');

  constructor() {
    inject(SeoService).update({ title: 'Acessar Refeição Resolvida | Bebelzinha',
      description: 'Informe seu código para acessar o Refeição Resolvida.', path: 'produtos/refeicao-resolvida/acessar' });
    void this.activateLink();
  }

  private async activateLink(): Promise<void> {
    const params = this.route.snapshot.queryParamMap;
    const code = params.get('codigo');
    if (code === null) {
      if (this.access.hasAccess()) await this.openProduct();
      return;
    }
    this.code.set(code.trim());
    this.busy.set(true);
    try {
      // Remove a chave da URL atual, inclusive quando ela estiver incorreta.
      const queryParams = { ...this.route.snapshot.queryParams };
      delete queryParams['codigo'];
      await this.router.navigate([], { relativeTo: this.route, queryParams, replaceUrl: true });
      if (this.access.hasAccess() || await this.access.unlock(code)) {
        await this.openProduct();
      } else {
        this.error.set('Esse link não liberou o acesso. Confira o código no seu material e digite abaixo.');
      }
    } catch {
      this.error.set('Não consegui abrir pelo link agora. Digite o código do seu material abaixo.');
    } finally { this.busy.set(false); }
  }

  async submit(event: Event): Promise<void> {
    event.preventDefault();
    if (this.busy()) return;
    this.error.set('');
    if (!/^\d{6}$/.test(this.code().trim())) {
      this.error.set('Digite os 6 números do seu código.');
      return;
    }
    this.busy.set(true);
    try {
      if (await this.access.unlock(this.code())) await this.openProduct();
      else this.error.set('Esse código não foi reconhecido. Confira os números e tente de novo.');
    } catch { this.error.set('Não consegui liberar o acesso agora. Tente novamente neste navegador.'); }
    finally { this.busy.set(false); }
  }

  async openProduct(): Promise<void> {
    const day = this.route.snapshot.queryParamMap.get('dia');
    await this.router.navigate(['/jantar-resolvido'], {
      queryParams: day && /^(?:[1-9]|1\d|2[0-2])$/.test(day) ? { dia: day } : {},
      replaceUrl: true,
    });
  }
}
