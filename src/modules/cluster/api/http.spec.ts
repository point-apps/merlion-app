import { describe, expect, it } from 'vitest'
import { useHttpCluster } from './http'

describe('sidebar menu store', () => {
  it('readAll() should return data clusters', () => {
    const httpCluster = useHttpCluster()
    const result = httpCluster.readAll()

    expect(result).toHaveProperty('clusters')
  })
})
