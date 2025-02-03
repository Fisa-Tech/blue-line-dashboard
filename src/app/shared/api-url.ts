export const ApiUrls = {
  users: {
    getAll: '/users',
    login: '/users/login',
    inscription: '/membres/inscription',
    getOne: (id: string) => `/membres/${id}`
  },
  groups: {
    getAll: '/groupes/all',
    create: '/groupes/creation',
    getOne: (id: string) => `/groupes/${id}`
  },
  event: {
    getAll: '/events',
    create: '/events',
  },
  challenge: {
    getAll: '/challenges',
    create: '/challenges',
  },
  command: {
    create: '/commandes/passerCommande'
  },
  stats: {
    getActiveUsers: '/stats/activeUsers'
  }
}
