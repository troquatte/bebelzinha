import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { CUTTER_PRODUCTS, SHOPEE_STORE_URL } from '../data/cutter-products';
import { CuttersComponent } from './cutters.component';

describe('CuttersComponent conversion tracking', () => {
  let harness: RouterTestingHarness;
  let component: CuttersComponent;
  const pixel = vi.fn<NonNullable<typeof window.fbq>>();
  let originalPixel: typeof window.fbq;

  beforeEach(async () => {
    originalPixel = window.fbq;
    pixel.mockReset();
    window.fbq = pixel;
    await TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'cortadores', component: CuttersComponent }])],
    }).compileComponents();
    harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl(
      '/cortadores?utm_source=instagram&utm_campaign=meio&utm_content=amanda',
      CuttersComponent,
    );
    await Promise.resolve();
  });

  afterEach(() => { window.fbq = originalPixel; });

  it('tracks the landing PageView once and does not convert a visit', () => {
    const views = pixel.mock.calls.filter(([command, name]) => command === 'track' && name === 'PageView');
    expect(views).toHaveLength(1);
    expect(views[0][2]?.['page_path']).toContain('/cortadores');
    expect(pixel.mock.calls.some(([, name]) => name === 'clickShopee' || name === 'Lead')).toBe(false);
  });

  it('shows all five models and real store destinations while individual links are pending', () => {
    const links = harness.routeNativeElement!.querySelectorAll<HTMLAnchorElement>('.cutters__product a');
    expect(links).toHaveLength(5);
    links.forEach(link => {
      expect(link.href).toBe(SHOPEE_STORE_URL);
      expect(link.target).toBe('_blank');
      expect(link.rel).toContain('noopener');
    });
  });

  it('sends exactly one named conversion on a product button, with attribution', () => {
    pixel.mockClear();
    const link = harness.routeNativeElement!.querySelector<HTMLAnchorElement>('.cutters__product a')!;
    link.addEventListener('click', event => event.preventDefault(), { once: true });
    link.click();
    expect(pixel).toHaveBeenCalledExactlyOnceWith('trackCustom', 'clickShopee', expect.objectContaining({
      content_id: 'gratidao-cliente', placement: 'product', destination_type: 'store',
      destination_url: SHOPEE_STORE_URL, utm_source: 'instagram', utm_campaign: 'meio',
      utm_content: 'amanda', conversion_step: 'shopee_outbound_click',
    }));
  });

  it('uses the individual product destination when configured', () => {
    pixel.mockClear();
    const product = { ...CUTTER_PRODUCTS[0], shopeeUrl: ' https://shopee.com.br/product/123/456 ' };
    expect(component.productUrl(product)).toBe('https://shopee.com.br/product/123/456');
    component.onShopeeClick(product, 'product');
    expect(pixel).toHaveBeenCalledExactlyOnceWith('trackCustom', 'clickShopee', expect.objectContaining({
      destination_type: 'product', destination_url: 'https://shopee.com.br/product/123/456',
    }));
  });

  it('identifies the full-catalogue button separately', () => {
    pixel.mockClear();
    component.onShopeeClick(null, 'footer');
    expect(pixel).toHaveBeenCalledExactlyOnceWith('trackCustom', 'clickShopee', expect.objectContaining({
      content_id: 'catalogo', placement: 'footer', destination_url: SHOPEE_STORE_URL,
    }));
  });

  it('does not count internal navigation and remains usable without the pixel', () => {
    pixel.mockClear();
    const link = harness.routeNativeElement!.querySelector<HTMLAnchorElement>('.cutters__copy a')!;
    link.addEventListener('click', event => event.preventDefault(), { once: true });
    link.click();
    expect(pixel).not.toHaveBeenCalled();
    window.fbq = undefined;
    expect(() => component.onShopeeClick(CUTTER_PRODUCTS[0], 'product')).not.toThrow();
  });
});
