import routes from './routes';
function Module_to_tree(list) {
  var listId = Object.keys(list).map(function (key) {
    return list[key].parentId;
  });
  var map = {}, node, roots = [], i;
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    if (listId.includes(list[i].id)) {
      list[i].children = []; // initialize the children
    }
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId !== null) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
export default {
  items: Module_to_tree(routes.filter(el => (el.url) && el.url !== null))
};
//  items: [
  //   {
  //     name: 'Dashboard',
  //     url: '/dashboard',
  //     icon: 'icon-speedometer',
  //     badge: {
  //       variant: 'info',
  //       text: 'NEW',
  //     },
  //   },
  //   {
  //     name: 'Category',
  //     url: '/Category',
  //     icon: 'icon-speedometer',
  //     badge: {
  //       variant: 'info',
  //     },
  //   },
  //   {
  //     title: true,
  //     name: 'Theme',
  //     wrapper: {            
  //       element: '',       
  //       attributes: {}      
  //     },
  //     class: ''            
  //   },
  //   {
  //     name: 'Colors',
  //     url: '/theme/colors',
  //     icon: 'icon-drop',
  //   },
  //   {
  //     name: 'Typography',
  //     url: '/theme/typography',
  //     icon: 'icon-pencil',
  //   },
  //   {
  //     title: true,
  //     name: 'Components',
  //     wrapper: {
  //       element: '',
  //       attributes: {},
  //     },
  //   },
  //   {
  //     name: 'Base',
  //     url: '/base',
  //     icon: 'icon-puzzle',
  //     children: [
  //       {
  //         name: 'Breadcrumbs',
  //         url: '/base/breadcrumbs',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Cards',
  //         url: '/base/cards',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Carousels',
  //         url: '/base/carousels',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Collapses',
  //         url: '/base/collapses',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Dropdowns',
  //         url: '/base/dropdowns',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Forms',
  //         url: '/base/forms',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Jumbotrons',
  //         url: '/base/jumbotrons',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'List groups',
  //         url: '/base/list-groups',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Navs',
  //         url: '/base/navs',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Paginations',
  //         url: '/base/paginations',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Popovers',
  //         url: '/base/popovers',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Progress Bar',
  //         url: '/base/progress-bar',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Switches',
  //         url: '/base/switches',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Tables',
  //         url: '/base/tables',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Tabs',
  //         url: '/base/tabs',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Tooltips',
  //         url: '/base/tooltips',
  //         icon: 'icon-puzzle',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Buttons',
  //     url: '/buttons',
  //     icon: 'icon-cursor',
  //     children: [
  //       {
  //         name: 'Buttons',
  //         url: '/buttons/buttons',
  //         icon: 'icon-cursor',
  //       },
  //       {
  //         name: 'Button dropdowns',
  //         url: '/buttons/button-dropdowns',
  //         icon: 'icon-cursor',
  //       },
  //       {
  //         name: 'Button groups',
  //         url: '/buttons/button-groups',
  //         icon: 'icon-cursor',
  //       },
  //       {
  //         name: 'Brand Buttons',
  //         url: '/buttons/brand-buttons',
  //         icon: 'icon-cursor',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Charts',
  //     url: '/charts',
  //     icon: 'icon-pie-chart',
  //   },
  //   {
  //     name: 'Icons',
  //     url: '/icons',
  //     icon: 'icon-star',
  //     children: [
  //       {
  //         name: 'CoreUI Icons',
  //         url: '/icons/coreui-icons',
  //         icon: 'icon-star',
  //         badge: {
  //           variant: 'info',
  //           text: 'NEW',
  //         },
  //       },
  //       {
  //         name: 'Flags',
  //         url: '/icons/flags',
  //         icon: 'icon-star',
  //       },
  //       {
  //         name: 'Font Awesome',
  //         url: '/icons/font-awesome',
  //         icon: 'icon-star',
  //         badge: {
  //           variant: 'secondary',
  //           text: '4.7',
  //         },
  //       },
  //       {
  //         name: 'Simple Line Icons',
  //         url: '/icons/simple-line-icons',
  //         icon: 'icon-star',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Notifications',
  //     url: '/notifications',
  //     icon: 'icon-bell',
  //     children: [
  //       {
  //         name: 'Alerts',
  //         url: '/notifications/alerts',
  //         icon: 'icon-bell',
  //       },
  //       {
  //         name: 'Badges',
  //         url: '/notifications/badges',
  //         icon: 'icon-bell',
  //       },
  //       {
  //         name: 'Modals',
  //         url: '/notifications/modals',
  //         icon: 'icon-bell',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Widgets',
  //     url: '/widgets',
  //     icon: 'icon-calculator',
  //     badge: {
  //       variant: 'info',
  //       text: 'NEW',
  //     },
  //   },
  //   {
  //     divider: true,
  //   },
  //   {
  //     title: true,
  //     name: 'Extras',
  //   },
  //   {
  //     name: 'Pages',
  //     url: '/pages',
  //     icon: 'icon-star',
  //     children: [
  //       {
  //         name: 'Login',
  //         url: '/login',
  //         icon: 'icon-star',
  //       },
  //       {
  //         name: 'Register',
  //         url: '/register',
  //         icon: 'icon-star',
  //       },
  //       {
  //         name: 'Error 404',
  //         url: '/404',
  //         icon: 'icon-star',
  //       },
  //       {
  //         name: 'Error 500',
  //         url: '/500',
  //         icon: 'icon-star',
  //       },
  //     ],
  //   },

  // ],

