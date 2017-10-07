export class Food {
  constructor(
    public date: number,
    public description: string|null,
    public picture: string|null,
    public answers: number[],
  ) {}
}
