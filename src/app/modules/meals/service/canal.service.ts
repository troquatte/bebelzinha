import { Injectable, signal } from '@angular/core';
import channelContent from '../../../../../public/content/canal/index.json';
import { CanalContent, CanalShort, CanalVideo } from '../interface/canal.models';

// A mesma fonte local alimenta o HTML do build e a hidratação no navegador.
const content: CanalContent = channelContent;

@Injectable({ providedIn: 'root' })
export class CanalService {
  private readonly channelUrlState = signal(content.channelUrl ?? '');
  private readonly videosState = signal<CanalVideo[]>(content.videos ?? []);
  private readonly shortsState = signal<CanalShort[]>(content.shorts ?? []);
  private readonly loadingState = signal(false);
  private readonly errorState = signal(false);

  readonly channelUrl = this.channelUrlState.asReadonly();
  readonly videos = this.videosState.asReadonly();
  readonly shorts = this.shortsState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();
}
