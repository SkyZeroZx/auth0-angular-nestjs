export interface UseCaseProxy {
	execute(...params: unknown[]): unknown;
}
