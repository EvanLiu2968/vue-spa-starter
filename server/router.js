/*
 * router
 */
const fs = require('fs');
const path = require('path');

module.exports = app => {
  const { router, config } = app;

  router.get('/', async (ctx) => {
    await ctx.render('index', {})
  });
  router.get('/mobile', async (ctx) => {
    await ctx.render('mobile', {})
  });
  router.get('/print', async (ctx) => {
    await ctx.render('print', {})
  });

  // api control
  // api代理放在httpProxy
}
