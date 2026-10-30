export interface DinnerDay {
  readonly id: string;
  readonly day: number;
  readonly isMock?: boolean;
  readonly title: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly contentRevision?: string;
  readonly stepsRevision?: string;
  readonly extraMinutes?: number;
  readonly description?: string;
  readonly validationNote?: string;
  readonly videoStatus?: 'pending';
  readonly equipment?: readonly string[];
  readonly storage?: readonly { title: string; text: string }[];
  readonly sources?: readonly { title: string; url: string }[];
  readonly minutes: number;
  readonly servings: number;
  readonly ingredients: readonly { id: string; label: string; extraLabel?: string; shopping?: boolean }[];
  readonly steps: readonly string[];
  readonly tip: string;
}
