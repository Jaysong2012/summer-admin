import Layout from '../../views/layout/Layout'

const systemRouter = {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Develop Example',
    meta: {
        title: 'DevelopExample',
        icon: 'example'
    },
    children: [
        {
            path: 'table',
            name: 'Table',
            component: () => import('../../views/table/index'),
            meta: { title: 'Table'}
        },
        {
            path: 'complex_table',
            component: () => import('../../views/table/complexTable'),
            name: 'ComplexTable',
            meta: { title: 'complexTable' }
        }
    ]
};

export default systemRouter
