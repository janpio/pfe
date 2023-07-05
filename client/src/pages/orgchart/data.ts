import { Node } from "./types";
const employees: Array<Node> = [
  {
    id: 1,
    name: "immeuble",
    parentId: "",
    imageUrl: 'https://www.ab-engineering.fr/wp-content/uploads/2016/01/The-Stadthaus-un-immeuble-en-bois-de-9-%C3%A9tages-%C3%A0-Londres.jpg'
  },
  {
    id: 2,
    parentId: 1,
    name: "Etage 1",
    imageUrl: "https://www.signaletique.biz/25946-large_default/plaque-1er-etage-carre-alu-brosse.jpg"
  },
  {
    id: 3,
    parentId: 1,
    name: "Etage 2",
    imageUrl: "https://www.signaletique.biz/25937-large_default/plaque-2eme-etage-carre-alu-brosse.jpg"
  },
  {
    id: 4,
    parentId: 1,
    name: "Etage 3",
    imageUrl: "https://www.signaletique.biz/25928-large_default/plaque-3eme-etage-carre-alu-brosse.jpg"
  },

  {
    id: 5,
    parentId: 2,
    name: "Salle droite",
    imageUrl: "https://www.signaletique-pro.fr/media/catalog/product/cache/90e6888e0e5c2cbadf121e0c3f9bbad3/1/6/169-salle-informatique-700px.jpg"
  },
  {
    id: 6,
    parentId: 2,
    name: "Salle gauche",
    imageUrl: "https://www.signaletique-pro.fr/media/catalog/product/cache/90e6888e0e5c2cbadf121e0c3f9bbad3/1/6/169-salle-informatique-700px.jpg"
  },
  {
    id: 7,
    parentId: 5,
    name: "Equipe Marketing",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg",
    team: "",
  },
  {
    id: 8,
    parentId: 5,
    name: "Equipe Development",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg",
    team: "",

  },

  {
    id: 9,
    parentId: 7,
    name: "John",
    role: "Team Leader",
    phone: "99887766",
    email: "employee@email.com",
    location: "LA Branch",
    department: "",
    description: "Marketing",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 10,
    parentId: 7,
    name: "Mohamed",
    role: "Team Leader",
    phone: "99887766",
    email: "employee@email.com",
    location: "LA Branch",
    department: "Marketing",
    imageUrl: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: 50,
    parentId: 10,
    name: "Paul",
    role: "Developer",
    phone: "99887766",
    email: "employee@email.com",
    location: "LA Branch",
    department: "Marketing",
    imageUrl: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: 11,
    parentId: 9,
    name: "Paul",
    role: "Developer",
    phone: "99887766",
    email: "employee@email.com",
    location: "LA Branch",
    department: "Marketing",
    imageUrl: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: 12,
    parentId: 9,
    name: "Tony",
    role: "Lead",
    phone: "99887766",
    email: "employee@email.com",
    location: "LA Branch",
    department: "Marketing",
    imageUrl: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    id: 13,
    parentId: 9,
    name: "Tony",
    role: "Lead",
    phone: "99887766",
    email: "employee@email.com",
    location: "LA Branch",
    department: "Marketing",
    imageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
  }, {
    id: 14,
    parentId: 9,
    name: "Tony",
    role: "Lead",
    phone: "99887766",
    email: "employee@email.com",
    location: "LA Branch",
    department: "Marketing",
    imageUrl: "https://randomuser.me/api/portraits/men/11.jpg",
  }, {
    id: 15,
    parentId: 9,
    name: "Tony",
    role: "Lead",
    phone: "99887766",
    email: "employee@email.com",
    location: "LA Branch",
    department: "Marketing",
    imageUrl: "https://randomuser.me/api/portraits/men/12.jpg",
  },

];
export default employees;
