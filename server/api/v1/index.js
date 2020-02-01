/**
 * @param {object} app
 * @returns {object} undefine
 * @description function for handling routing
 */
const routes = app => {
  app.get('/', (request, response) =>
    response.status(200).json({
      success: true,
      message: 'Welcome to the SageAuthors'
    })
  );
};

export default routes;
