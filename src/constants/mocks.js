export const documentsList = [
  {
    document_code: 1234,
    name: 'Teste2',
    archiving_date: '2024-04-18T00:00:00.000Z',
    doc_type_id: 2,
    client_id: 1,
    nature_id: 2,
    location_id: 2,
    employee_id: 1,
  },
  {
    document_code: 12345,
    name: 'Teste2',
    archiving_date: '2024-04-18T00:00:00.000Z',
    doc_type_id: 2,
    nature_id: 2,
    client_id: 1,
    location_id: 2,
    employee_id: 1,
  },
  {
    document_code: 123,
    name: 'Teste',
    archiving_date: '2024-04-16T00:00:00.000Z',
    doc_type_id: 2,
    client_id: 1,
    nature_id: 2,
    location_id: 2,
    employee_id: 1,
  },
];

export const documentNatureList = [
  {
    id: 1,
    nature: 'teste',
  },
  {
    id: 2,
    nature: 'teste2',
  },
];

export const clientsList = [
  {
    id: 1,
    name: 'Joaozinho',
    personType: 'F',
    cpfCnpj: '01234567890',
  },
  {
    id: 2,
    name: 'Empresa Ltda',
    personType: 'J',
    cpfCnpj: '01234567890',
  },
];

export const documentTypeList = [
  {
    id: 1,
    archiving_time: 5,
    doc_type: 'teste',
  },
  {
    id: 2,
    archiving_time: 5,
    doc_type: 'teste2',
  },
];

export const documentLocalList = [
  {
    id: 2,
    doc_location: 'teste',
    nature: {
      id: 2,
      nature: 'teste',
    },
  },
  {
    id: 2,
    doc_location: 'teste',
    nature: {
      id: 2,
      nature: 'teste',
    },
  },
  {
    id: 2,
    doc_location: 'teste',
    nature: {
      id: 2,
      nature: 'teste',
    },
  },
];

export const permissionsList = [
  {
    id: 2,
    permission: 'teste2',
  },
  {
    id: 3,
    permission: 'teste3',
  },
];

export const roleList = [
  {
    id: 3,
    role: 'teste',
  },
  {
    id: 4,
    role: 'teste2',
  },
];

export const userList = [
  {
    id: 1,
    email: 'teste@email.com',
    username: 'teste',
    name: 'teste testado',
    role_id: 3,
  },
  {
    id: 2,
    email: 'teste2@email.com',
    username: 'teste2',
    name: 'teste2',
    role_id: 4,
  },
];
