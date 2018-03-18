import { success, notFound } from '../../services/response/'
import { Device } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Device.create(body)
    .then((device) => device.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Device.find(query, select, cursor)
    .then((devices) => devices.map((device) => device.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Device.findById(params.id)
    .then(notFound(res))
    .then((device) => device ? device.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Device.findById(params.id)
    .then(notFound(res))
    .then((device) => device ? Object.assign(device, body).save() : null)
    .then((device) => device ? device.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Device.findById(params.id)
    .then(notFound(res))
    .then((device) => device ? device.remove() : null)
    .then(success(res, 204))
    .catch(next)
