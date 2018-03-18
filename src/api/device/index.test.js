import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Device } from '.'

const app = () => express(apiRoot, routes)

let device

beforeEach(async () => {
  device = await Device.create({})
})

test('POST /devices 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', type: 'test', ip: 'test', port: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.ip).toEqual('test')
  expect(body.port).toEqual('test')
})

test('POST /devices 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /devices 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /devices 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /devices/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${device.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(device.id)
})

test('GET /devices/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${device.id}`)
  expect(status).toBe(401)
})

test('GET /devices/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /devices/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${device.id}`)
    .send({ access_token: masterKey, name: 'test', type: 'test', ip: 'test', port: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(device.id)
  expect(body.name).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.ip).toEqual('test')
  expect(body.port).toEqual('test')
})

test('PUT /devices/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${device.id}`)
  expect(status).toBe(401)
})

test('PUT /devices/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', type: 'test', ip: 'test', port: 'test' })
  expect(status).toBe(404)
})

test('DELETE /devices/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${device.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /devices/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${device.id}`)
  expect(status).toBe(401)
})

test('DELETE /devices/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
