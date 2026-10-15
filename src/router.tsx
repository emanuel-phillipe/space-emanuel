import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import { RootLayout, WelcomeRoute } from './sections/RootLayout'
import Desktop_SobreMim from './widgets/Desktop_SobreMim'
import Desktop_Informacoes from './widgets/Desktop_Informacoes'
import Desktop_Formacoes from './widgets/Desktop_Formacoes'
import Desktop_Experiencia from './widgets/Desktop_Experiencia'
import Desktop_Curriculo from './widgets/Desktop_Curriculo'
import Desktop_Contato from './widgets/Desktop_Contato'

const rootRoute = createRootRoute({
  component: RootLayout,
})

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: WelcomeRoute,
})

export const sobreMimRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sobre-mim',
  component: Desktop_SobreMim,
})

export const informacoesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/informacoes',
  component: Desktop_Informacoes,
})

export const contatoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contato',
  component: Desktop_Contato,
})

export const formacoesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/formacoes',
  component: Desktop_Formacoes,
})

export const experienciaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/experiencia',
  component: Desktop_Experiencia,
})

export const curriculoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/curriculo',
  component: Desktop_Curriculo,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  sobreMimRoute,
  informacoesRoute,
  formacoesRoute,
  experienciaRoute,
  contatoRoute,
  curriculoRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
