import mongoose, { Schema } from 'mongoose'

const deviceSchema = new Schema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  ip: {
    type: String
  },
  port: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

deviceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      type: this.type,
      ip: this.ip,
      port: this.port,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Device', deviceSchema)

export const schema = model.schema
export default model
