const Fav = require('./favs.model');
const User = require('../../auth/local/auth.model');

/**
 * @openapi
 * /api/favs:
 *  get:
 *   tags:
 *   - Favs
 *   security:
 *   - bearerAuth: []
 *   description: Get all favs
 *   responses:
 *     200:
 *      description: An array with all favs
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/allFavsResponse'
 *     401:
 *      description: Unauthorized
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/unauthorized'
 *     404:
 *      description: fav not found
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/favNotFound'
 *     500:
 *      description: Internal server error
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/serverError'
 */
const getAllFavshandler = async (req, res) => {
  const favs = await Fav.find({});

  if (!favs) {
    res.status(404).json({ failed: 'no favs found' });
  }
  res.status(200).json(favs);
};

/**
 * @openapi
 * /api/favs/{id}:
 *  get:
 *    tags:
 *    - Favs
 *    security:
 *    - bearerAuth: []
 *    description: Get a single fav
 *    summary: Get a single fav Summary
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the fav to get
 *      required: true
 *    responses:
 *     200:
 *      description: A single fav
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/favsResponse'
 *     401:
 *      description: Unauthorized
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/unauthorized'
 *     404:
 *      description: fav not found
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/favNotFound'
 *     500:
 *      description: Internal server error
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/serverError'
 */
const getSingleFavsHanlder = async (req, res) => {
  const { id } = req.params;

  try {
    const singleFav = await Fav.findById(id);

    if (singleFav) {
      return res.status(200).json(singleFav);
    }
    return res.status(404).json({ error: 'fav doesnt exist' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * @openapi
 * /api/favs/:
 *  post:
 *    tags:
 *    - Favs
 *    security:
 *    - bearerAuth: []
 *    description: Create a single fav
 *    summary: Create a single fav Summary
 *    requestBody:
 *     description: List of user object
 *     required: true
 *     content:
 *       application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/requestBodies/favsRequest'
 *    responses:
 *     200:
 *      description: fav created successfully
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/favsResponse'
 *     401:
 *      description: Unauthorized
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/unauthorized'
 *     404:
 *      description: fav not found
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/favNotFound'
 *     500:
 *      description: Internal server error
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/serverError'
 */
const createFavsHandlder = async (req, res) => {
  const favsData = req.body;
  const id = '631249ea701467900ea7433e';
  const user = await User.findById(id).populate('favs');

  // Check if user exists
  if (!user) {
    return res.status(404).json({ error: 'user not found' });
  }

  // Check if list name exists
  const userFavs = user.favs.map((fav) => fav.name)
    .includes(favsData.name);

  if (userFavs) {
    return res.status(400).json({ duplicate: "you can't create a list with the same name" });
  }

  try {
    const favsCreated = await Fav.create(favsData);
    await User.findByIdAndUpdate(user, {
      $push: { favs: favsCreated },
    });

    if (favsCreated) {
      return res.status(200).json({ created: 'fav successfully created' });
    }
    return res.status(500).json({ error: 'couldnt create favs' });
  } catch (error) {
    return console.log(error);
  }
};

/**
 * @openapi
 * /api/favs/{id}:
 *  delete:
 *    tags:
 *    - Favs
 *    security:
 *    - bearerAuth: []
 *    description: Delete a single fav
 *    summary: Delete a single fav Summary
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The id of the fav to delete
 *      required: true
 *    responses:
 *     200:
 *      description: fav successfully deleted
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/favsResponse'
 *     401:
 *      description: Unauthorized
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/unauthorized'
 *     404:
 *      description: fav not found
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/favNotFound'
 *     500:
 *      description: Internal server error
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/serverError'
 */
const deleteFavsHanlder = async (req, res) => {
  const { id } = req.params;

  try {
    const FavToDelete = await Fav.findByIdAndRemove(id);

    if (FavToDelete) {
      return res.status(200).json({ deleted: FavToDelete });
    }
    return res.status(404).json({ error: 'Fav not found' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  getAllFavshandler,
  getSingleFavsHanlder,
  createFavsHandlder,
  deleteFavsHanlder,
};
