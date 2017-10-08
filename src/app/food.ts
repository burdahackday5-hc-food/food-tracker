export class Food {
  constructor(
    public date: number,
    public description: string|null,
    public picture: string|null,
    public answers: number[],
  ) {}

  public energyValue?: number|null = null;
  public fat?: number|null = null;
  public sugar?: number|null = null;
  public salt?: number|null = null;
}
