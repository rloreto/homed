import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Device, { schema } from './model'

const router = new Router()
const { name, type, ip, port } = schema.tree

/**
 * @api {post} /devices Create device
 * @apiName CreateDevice
 * @apiGroup Device
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Device's name.
 * @apiParam type Device's type.
 * @apiParam ip Device's ip.
 * @apiParam port Device's port.
 * @apiSuccess {Object} device Device's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Device not found.
 * @apiError 401 master access only.
 */
router.post('/',
  //master(),
  body({ name, type, ip, port }),
  create)

/**
 * @api {get} /devices Retrieve devices
 * @apiName RetrieveDevices
 * @apiGroup Device
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} devices List of devices.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  //master(),
  query({
    name: {
      type: String,
      paths: ['name'],
      operator: '$eq'
    },
    type: {
      type: String,
      paths: ['type'],
      operator: '$eq'
    }
  }),
  index)

/**
 * @api {get} /devices/:id Retrieve device
 * @apiName RetrieveDevice
 * @apiGroup Device
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} device Device's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Device not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  //master(),
  show)

/**
 * @api {put} /devices/:id Update device
 * @apiName UpdateDevice
 * @apiGroup Device
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Device's name.
 * @apiParam type Device's type.
 * @apiParam ip Device's ip.
 * @apiParam port Device's port.
 * @apiSuccess {Object} device Device's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Device not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  //master(),
  body({ name, type, ip, port }),
  update)

/**
 * @api {delete} /devices/:id Delete device
 * @apiName DeleteDevice
 * @apiGroup Device
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Device not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  //master(),
  destroy)

export default router
