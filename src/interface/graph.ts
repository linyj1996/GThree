export interface IFlexible {
  [key: string]: any
}

export const IRendererService = Symbol('IRendererService')
export interface IRendererService {
  init(): void
}