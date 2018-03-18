import { Device } from '.'

let device

beforeEach(async () => {
  device = await Device.create({ name: 'test', type: 'test', ip: 'test', port: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = device.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(device.id)
    expect(view.name).toBe(device.name)
    expect(view.type).toBe(device.type)
    expect(view.ip).toBe(device.ip)
    expect(view.port).toBe(device.port)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = device.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(device.id)
    expect(view.name).toBe(device.name)
    expect(view.type).toBe(device.type)
    expect(view.ip).toBe(device.ip)
    expect(view.port).toBe(device.port)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
