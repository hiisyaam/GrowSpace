/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')
router
  .get('/register', [() => import('#controllers/Auth/registers_controller'), 'index'])
  .as('register.index')
router
  .post('/register', [() => import('#controllers/Auth/registers_controller'), 'store'])
  .as('register.store')
