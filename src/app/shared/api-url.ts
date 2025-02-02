export const ApiUrls = {
  users: {
    getAll: '/membres/all',
    login: '/users/login',
    inscription: '/membres/inscription',
    getOne: (id: string) => `/membres/${id}`
  },
  groups: {
    getAll: '/groupes/all',
    create: '/groupes/creation',
    getOne: (id: string) => `/groupes/${id}`
  },
  material: {
    getAll: '/materiels/all',
    create: '/materiels/ajout'
  },
  command: {
    create: '/commandes/passerCommande'
  },
  stats: {
    getActiveUsers: '/stats/activeUsers'
  }
}
