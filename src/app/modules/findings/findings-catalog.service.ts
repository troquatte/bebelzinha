import { Injectable, signal } from '@angular/core';

import { Finding, FindingContext } from './findings.models';

interface FindingManifest {
  findings: string[];
}

@Injectable({ providedIn: 'root' })
export class FindingsCatalog {
  private readonly findingState = signal<Finding[]>([]);
  private readonly loadingState = signal(true);
  private readonly errorState = signal(false);

  readonly findings = this.findingState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();

  constructor() {
    void this.load();
  }

  byContext(context: FindingContext): Finding[] {
    return this.findings().filter((finding) => finding.contexts.includes(context));
  }

  private async load(): Promise<void> {
    try {
      const manifestResponse = await fetch('content/findings/index.json');

      if (!manifestResponse.ok) {
        throw new Error('Não foi possível carregar os achadinhos.');
      }

      const manifest = (await manifestResponse.json()) as FindingManifest;
      const findings = await Promise.all(
        manifest.findings.map(async (slug) => {
          const response = await fetch(`content/findings/${slug}.json`);

          if (!response.ok) {
            throw new Error(`Não foi possível carregar o achadinho ${slug}.`);
          }

          return (await response.json()) as Finding;
        }),
      );

      this.findingState.set(findings.filter((finding) => finding.active));
    } catch {
      this.errorState.set(true);
    } finally {
      this.loadingState.set(false);
    }
  }
}
