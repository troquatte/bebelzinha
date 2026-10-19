import { Injectable, signal } from '@angular/core';

import { CanalContent, CanalShort, CanalVideo } from '../interface/canal.models';

@Injectable({ providedIn: 'root' })
export class CanalService {
  private readonly channelUrlState = signal('');
  private readonly videosState = signal<CanalVideo[]>([]);
  private readonly shortsState = signal<CanalShort[]>([]);
  private readonly loadingState = signal(true);
  private readonly errorState = signal(false);

  readonly channelUrl = this.channelUrlState.asReadonly();
  readonly videos = this.videosState.asReadonly();
  readonly shorts = this.shortsState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();

  constructor() {
    void this.load();
  }

  private async load(): Promise<void> {
    try {
      const response = await fetch('content/canal/index.json');

      if (!response.ok) {
        throw new Error('Não foi possível carregar o conteúdo do canal.');
      }

      const content = (await response.json()) as CanalContent;

      this.channelUrlState.set(content.channelUrl ?? '');
      this.videosState.set(content.videos ?? []);
      this.shortsState.set(content.shorts ?? []);
    } catch {
      this.errorState.set(true);
    } finally {
      this.loadingState.set(false);
    }
  }
}
