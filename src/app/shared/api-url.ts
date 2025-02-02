export const ApiUrls = {
  members: {
    getAll: '/membres/all',
    login: '/membres/login',
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
  }
}
