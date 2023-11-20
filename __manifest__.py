{
    'name':'OWL tutorial',
    'author':'Salem',
    'version': '1.2',
    'website':'www.odoo.com',
    'Summary':'Owl tutorial to do list',
    'installable': True,
    'application': True,
    # "depends":['mail'],
    'data':[
        'security/ir.model.access.csv',
        # 'data/sequence.xml',
        'views/todo_list.xml',
        # 'views/patient.xml',
        # 'views/doctor.xml',
            
    ],
     'assets': {
        'web.assets_backend': [
            'owl_tutorial/static/src/component/*/*.js',
            'owl_tutorial/static/src/component/*/*.xml',
            'owl_tutorial/static/src/component/*/*.scss',
        ],
          
    },
}